public with sharing class ContactController {
    @AuraEnabled
    public static List<Contact> getContacts(Id accountId) {
        return [SELECT Id, Name, Phone, Email FROM Contact WHERE Account.Id = :accountId];
    }
}