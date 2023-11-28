package edu.brown.cs.student.main.types;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AccountCollection {
  private final Map<String, Account> accountMap;

  public AccountCollection(Map<String, Account> accountMap) {
    this.accountMap = accountMap;
  }

  public Map<String, Account> getAccountMap() {
    return Collections.unmodifiableMap(this.accountMap);
  }

}
