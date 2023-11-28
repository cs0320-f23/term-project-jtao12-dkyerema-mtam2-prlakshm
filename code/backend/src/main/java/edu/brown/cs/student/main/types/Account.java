package edu.brown.cs.student.main.types;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Account {
  private String username;
  private String email;
  private String bio;
  private List<Item> currentListings;
  private List<Item> pastListings;
  private List<Item> purchasedItems;
  private String profilePhotoFilename;
  private Map<String, String> contactInformation;

  // Constructor
  public Account(String username, String email, String bio, String profilePhotoFilename, Map<String, String> contactInformation) {
    this.username = username;
    this.email = email;
    this.bio = bio;
    this.currentListings = new ArrayList<>();
    this.pastListings = new ArrayList<>();
    this.purchasedItems = new ArrayList<>();
    this.profilePhotoFilename = profilePhotoFilename;
    this.contactInformation = new HashMap<>(contactInformation);
  }

  // Getters
  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public String getBio() {
    return bio;
  }

  public List<Item> getCurrentListings() {
    return new ArrayList<>(currentListings); // Return a copy to prevent external modification
  }

  public List<Item> getPastListings() {
    return new ArrayList<>(pastListings); // Return a copy to prevent external modification
  }

  public List<Item> getPurchasedItems() {
    return new ArrayList<>(purchasedItems); // Return a copy to prevent external modification
  }

  public String getProfilePhotoFilename() {
    return profilePhotoFilename;
  }

  public Map<String, String> getContactInformation() {
    return Collections.unmodifiableMap(contactInformation); // use Collections to prevent external modification
  }

  // Setters
  public void setUsername(String username) {
    this.username = username;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setBio(String bio) {
    this.bio = bio;
  }

  // Setter for current listings
  public void setCurrentListings(List<Item> currentListings) {
    this.currentListings = new ArrayList<>(currentListings);
  }

  public void addListing(Item newListing) {
    this.currentListings.add(newListing);
  }

  public void removeListing(Item soldListing) {
    this.currentListings.remove(soldListing);
    this.pastListings.add(soldListing);
  }

  // Setter for past listings
  public void setPastListings(List<Item> pastListings) {
    this.pastListings = new ArrayList<>(pastListings);
  }

  public void removePastListing(Item timedOutListing) {
    this.pastListings.remove(timedOutListing);
  }

  // Setter for purchased items
  public void setPurchasedItems(List<Item> purchasedItems) {
    this.purchasedItems = new ArrayList<>(purchasedItems);
  }

  public void addPurchasedItem(Item newItem) {
    this.purchasedItems.add(newItem);
  }

  public void setProfilePhotoFilename(String profilePhotoFilename) {
    this.profilePhotoFilename = profilePhotoFilename;
  }

  // Setter for contact information
  public void setContactInformation(HashMap<String, String> contactInformation) {
    this.contactInformation = new HashMap<>(contactInformation);
  }

  public void addContactInformation(String contactKey, String contactValue) {
    this.contactInformation.put(contactKey, contactValue);
  }

  public void removeContactInformation(String oldContactKey) {
    this.contactInformation.remove(oldContactKey);
  }

  @Override
  public String toString() {
    return "Account{" +
        "username='" + username + '\'' +
        ", email='" + email + '\'' +
        ", bio='" + bio + '\'' +
        ", currentListings=" + currentListings +
        ", pastListings=" + pastListings +
        ", purchasedItems=" + purchasedItems +
        ", profilePhotoFilename='" + profilePhotoFilename + '\'' +
        ", contactInformation=" + contactInformation +
        '}';
  }
}