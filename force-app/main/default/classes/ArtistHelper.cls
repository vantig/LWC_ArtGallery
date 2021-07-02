public with sharing class ArtistHelper {
    @AuraEnabled
    public static List<String> createContactWithUser(Contact con) {
        try {
            insert con;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        String userId;
        try {
            userId = UserController.createUser(con.Id);
        } catch (Exception ex) {
            delete con;
            throw new AuraHandledException(ex.getMessage());
        }
        return  new List<String>{con.Id,userId};
    }
}