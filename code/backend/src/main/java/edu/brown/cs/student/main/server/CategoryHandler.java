package edu.brown.cs.student.main.server;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.JsonDataException;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.main.types.Item;
import edu.brown.cs.student.main.types.ItemCollection;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import kotlin.Pair;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * This BroadbandHandler class handles a /broadband request to our server. It is constructed with a
 * CensusSource, which can be a mock source or a real ACS source, and a CacheBuilder provided by the
 * caller, Server. Depending on the CacheBuilder passed, the handler's handle method gets the query
 * params state and county and either finds the corresponding broadband access in the cache, or
 * queries the CensusSource, or returns either a success or failure serialized object.
 *
 * <p>Not that if a developer does not want to use a cache, they should pass null as the
 * CacheBuilder parameter in the structure. Otherwise, they should pass a CacheBuilder with their
 * desired attributes (eviction rules, size, etc.).
 *
 * @author sarahridley juliazdzilowska
 * @version 1.0
 */
public class CategoryHandler implements Route {

  private List<Item> masterItems;
  private final Optional<LoadingCache<Pair<String, String>, Object>> cache;

  /**
   * Constructor for the BroadbandHandler class.
   *
   * @param source a CensusSource object that the handle method with query for broadband information
   * @param cacheBuilder a CacheBuilder that the handle method will query for cached responses and
   *     store new responses in, or if cacheBuilder is null, no cache will be used
   */
  public CategoryHandler(CacheBuilder cacheBuilder) {
    if (cacheBuilder == null) {
      this.cache = Optional.empty();
    } else {
      LoadingCache<Pair<String, String>, Object> loadingCache =
          cacheBuilder.build(
              new CacheLoader<Pair<String, String>, Object>() {
                @Override
                public Object load(Pair<String, String> categories) {
                  String category = categories.component1();
                  String subcategory = categories.component2();
                  return handleCacheMiss(category, subcategory);
                }
              });
      this.cache = Optional.of(loadingCache);
    }
  }

  /**
   * Method that handles a /broadband request to our Server. Given a request and response, returns a
   * failure or success response object. Uses the cache if the cacheBuilder passed to the
   * constructor was not null.
   *
   * @param request the Request object passed by the client, should contain request parameters state
   *     and county
   * @param response the Response object that we do not use
   * @return success or failure response object with json information from the source
   */
  @Override
  public Object handle(Request request, Response response) {
    //handler items
    // Load master items from JSON using Moshi
    String jsonFilePath = "/data/items/masteritems.json";
    try {
      String json = new String(Files.readAllBytes(Paths.get(jsonFilePath)));
      Moshi moshi = new Moshi.Builder().build();
      JsonAdapter<ItemCollection> itemAdapter = moshi.adapter(ItemCollection.class);
      this.masterItems = itemAdapter.fromJson(json).getItemList();
      String category = request.queryParams("category");
      String subcategory = request.queryParams("subcategory");
      if (category == null) {
        return new CategoryFailureResponse(
            "error_bad_request", "Required parameter missing: category")
            .serialize();
      }
      if (cache.isEmpty()) {
        return handleCacheMiss(category, subcategory);
      }
      return cache.get().get(new Pair<>(category, subcategory));
    } catch (IOException | JsonDataException e) {
      return new CategoryFailureResponse("error_bad_request",
          "Error loading master items list from JSON").serialize();
    } catch (Exception e) {
      return new CategoryFailureResponse("error_bad_request", e.getMessage()).serialize();
    }
  }

  /**
   * Method that handles the Server's request in the case that the request state and county
   * broadband information was not found in the cache. Returns an object representing a success or
   * failure response.
   *
   * @param state the state request parameter passed by client
   * @param county the county request parameter passed by client
   * @return success or failure response object with json information from the source
   */
  private Object handleCacheMiss(String category, String subcategory) {
    Date today = new Date();
    Long now = today.getTime();
    String dateTimeFormatted = new SimpleDateFormat("MM/dd/yyyy HH:mm").format(now);
    try {
      List<Item> categoryList = getCategoryItems(category, subcategory);
      return new CategorySuccessResponse(category, subcategory, dateTimeFormatted, categoryList)
          .serialize();
    } catch (Exception e) {
      return new CategoryFailureResponse("error_bad_request", e.getMessage()).serialize();
    }
  }

  private List<Item> getCategoryItems(String category, String subcategory) {
    List<Item> categoryList = new ArrayList<>();
    if(subcategory != null) {
      for (Item item : this.masterItems) {
        if(category == item.getCategory() && subcategory == item.getSubcategory()) {
          categoryList.add(item);
        }
      }
    }
    else {
      for (Item item : this.masterItems) {
        if(category == item.getCategory()) {
          categoryList.add(item);
        }
      }
    }
    return categoryList;
  }

  /**
   * A record representing a failed call to the /broadband handler, containing a result with an
   * error code and an error message with more information.
   *
   * @param result the String containing an error code
   * @param error_message the String containing a more specific error message
   */
  public record CategoryFailureResponse(String result, String error_message) {
    /**
     * This method serializes a failure response object.
     *
     * @return this failure response object, serialized as Json
     */
    String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(CategoryHandler.CategoryFailureResponse.class).toJson(this);
    }
  }

  /**
   * A record representing a successful call to the /broadband handler, containing a result of
   * success, as well as the state, county, date_time, and broadband data information.
   *
   * @param result the String "success"
   * @param state the String state passed as a query parameter to handle
   * @param county the String county passed as a query parameter to handle
   * @param date_time the String date and time of the query to get the broadband_data
   * @param broadband_access_percent the CensusData containing a Double representing broadband
   *     access in the given state and county according to the source
   */
  public record CategorySuccessResponse(
      String result,
      String category,
      String subcategory,
      String date_time,
      List<Item> categoryList) {
    /**
     * The constructor for the BroadbandSuccessResponse class.
     *
     * @param state the String state query parameter given
     * @param county the String county query parameter given
     * @param date_time the String representing the date and time that the broadband data returned
     *     was accessed from the source
     * @param broadband_access_percent the CensusData object containing a Double representing
     *     broadband access in the given state and county from the source
     */
    public CategorySuccessResponse(
        String category, String subcategory, String date_time, List<Item> categoryList) {
      this("success", category, subcategory, date_time, categoryList);
    }

    /**
     * This method serializes a success response object.
     *
     * @return this success response object, serialized as Json
     */
    public String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(CategoryHandler.CategorySuccessResponse.class).toJson(this);
    }
  }

  /**
   * Gets all elements stored in the cache. If no CacheBuilder has been provided (caching disabled),
   * returns an empty list.
   *
   * @return a list of cached elements
   */
  public List<Object> getCache() {
    List<Object> cachedElements = new ArrayList<>();
    if (cache.isPresent()) {
      Map<Pair<String, String>, Object> cacheMap = cache.get().asMap();
      cachedElements.addAll(cacheMap.values());
    }
    return cachedElements;
  }
}
