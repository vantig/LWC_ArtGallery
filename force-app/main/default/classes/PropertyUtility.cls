public class PropertyUtility {
    public static void newListedProperties(){
        List<Property__c>newPropList=[select name,Broker__r.Email__c,days_on_market__c from property__c  where Days_On_Market__c < 31];
        for(Property__c prop:newPropList){
            system.debug( prop.name+':'+ prop.Broker__r.Email__c);
        }
    }
}