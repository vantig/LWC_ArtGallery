public with sharing class PictureController {
    @AuraEnabled
    public static String createPicture(Picture__c picture, String file, String fileName) {
        String pictureId;
        try {
            insert picture;
            pictureId = picture.Id;
            DocumentController.uploadNewDocument(pictureId,file,fileName);
        } catch (Exception ex) {
            Database.delete(picture, false);
            throw new AuraHandledException(ex.getMessage());
        }
        return pictureId;
    }
}