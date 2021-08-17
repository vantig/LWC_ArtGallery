public with sharing class DocumentController {
    public static Id uploadNewDocument(String recordId, String contentFile, String fileName) {
        contentFile = EncodingUtil.urlDecode(contentFile, 'UTF-8');
        ContentVersion contentVersion = new ContentVersion(
                PathOnClient = fileName,
                Title = fileName,
                VersionData = EncodingUtil.base64Decode(contentFile)
        );
        insert contentVersion;
        Id documentId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:contentVersion.Id].ContentDocumentId;

        ContentDocumentLink contentDocumentLink = new ContentDocumentLink(
                ContentDocumentId = documentId,
                LinkedEntityId = recordId,
                ShareType = 'I',
                Visibility = 'AllUsers'
        );
        insert contentDocumentLink;
        return contentVersion.Id;
    }
}