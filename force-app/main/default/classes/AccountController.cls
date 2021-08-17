public with sharing class AccountController {
    @AuraEnabled
    public static List<Account> getAccounts() {
     return  [SELECT Id, Name ,Phone  FROM Account];
    }
}