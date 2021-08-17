public inherited sharing class LWCExampleController {

    @AuraEnabled(Cacheable = true)
    public static List<OppTableIItem__c> getRecords(Id recordId) {
        System.debug([
                SELECT Id, Price__c, Count__c
                FROM OppTableIItem__c
                WHERE Opportunity__c = :recordId
                LIMIT 10
        ]);
        return [
                SELECT Id, Price__c, Count__c
                FROM OppTableIItem__c
                WHERE Opportunity__c = :recordId
                LIMIT 10
        ];

    }
}