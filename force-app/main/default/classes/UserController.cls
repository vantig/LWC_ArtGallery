public with sharing class UserController {
    @AuraEnabled //makes method available to Lightning components (both Lightning web components and Aura components)
    public static Id createUser(Id contactId) {
        Contact contact = [SELECT LastName,FirstName,Email,Phone,Birthdate FROM Contact WHERE Id = :contactId];
        Organization organization = [SELECT Name FROM Organization];
        Profile profileId = [SELECT Id FROM Profile WHERE Name = 'Artist User' LIMIT 1];
        User usr = new User(
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Alias = contact.LastName,
                Email = contact.Email,
                Username = contact.LastName + organization.Name + contact.Email,
                ProfileId = profileId.Id,
                TimeZoneSidKey = 'GMT',
                LanguageLocaleKey = 'en_US',
                EmailEncodingKey = 'UTF-8',
                LocaleSidKey = 'en_US'
        );
        if (usr.Alias.length() > 8) {
            usr.Alias = usr.Alias.substring(0, 8);
        }
        usr.Username = usr.Username.replace(' ', '');
        insert usr;
        return usr.Id;
    }
}