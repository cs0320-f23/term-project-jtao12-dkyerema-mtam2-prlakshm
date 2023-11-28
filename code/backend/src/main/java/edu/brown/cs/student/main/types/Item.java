package edu.brown.cs.student.main.types;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class Item {
  private String title;
  private String description;
  private String category;
  private String subcategory;
  private double price;

  private Account seller;
  private List<String> photoFilenames;
  private String timestamp;

  // Constructor
  public Item(String title, String description, String category, String subcategory, double price, Account seller, List<String> photoFilenames) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.subcategory = subcategory;
    this.price = price;
    this.seller = seller;
    this.photoFilenames = new ArrayList<>(photoFilenames);
    Date today = new Date();
    Long now = today.getTime();
    this.timestamp = new SimpleDateFormat("MM/dd/yyyy HH:mm").format(now);
  }

  // Getters
  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public String getCategory() {
    return category;
  }

  public String getSubcategory() {
    return subcategory;
  }

  public double getPrice() {
    return price;
  }

  public Account getSeller() {
    return seller;
  }

  public List<String> getPhotoFilenames() {
    return Collections.unmodifiableList(photoFilenames); // use Collections to prevent external modification
  }

  public String getTimestamp() {
    return timestamp;
  }

  // Setters
  public void setTitle(String title) {
    this.title = title;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public void setSubcategory(String subcategory) {
    this.subcategory = subcategory;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  // Setters for photo filenames
  public void setPhotoFilenames(List<String> photoFilenames) {
    this.photoFilenames = new ArrayList<>(photoFilenames);
  }

  public void addPhotoFilename(String newPhoto) {
    this.photoFilenames.add(newPhoto);
  }

  public void deletePhotoFilename(String oldPhoto) {
    this.photoFilenames.remove(oldPhoto);
  }

  // Note: No setter for timestamp or seller to ensure it remains unchangeable

  public String getItemDetails() {
    return title + " " + description + " " + category + " " +
        subcategory + " " + price + " " + seller.getUsername();
  }
  @Override
  public String toString() {
    return "Item{" +
        "title='" + title + '\'' +
        ", description='" + description + '\'' +
        ", category='" + category + '\'' +
        ", subcategory='" + subcategory + '\'' +
        ", price=" + price +
        ", seller=" + seller +
        ", photoFilenames=" + photoFilenames +
        ", timestamp=" + timestamp +
        '}';
  }
}
