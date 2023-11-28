package edu.brown.cs.student.main.types;

import java.util.Collections;
import java.util.List;

public class ItemCollection {

  private final List<Item> itemList;

  public ItemCollection(List<Item> itemList) {
    this.itemList = itemList;
  }

  public List<Item> getItemList() {
    return Collections.unmodifiableList(this.itemList);
  }
}
