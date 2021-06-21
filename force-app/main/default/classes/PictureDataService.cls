public with sharing class PictureDataService {
    @AuraEnabled(Cacheable=true)
    public static List<Picture__c> getPictures() {
        return [SELECT Artist__r.Name,Artist__r.Id,Image_Path__c,Name,Price__c FROM Picture__c];
    }
}