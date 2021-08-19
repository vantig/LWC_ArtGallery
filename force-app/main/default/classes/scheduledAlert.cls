/**
 * Created by igordeychik on 8/19/2021.
 */

public with sharing class scheduledAlert implements Schedulable {
    public void execute(SchedulableContext SC) {
        final String OpportunityEmailTemplateName = 'ApprovalRemind';
        List<Account>objectsForRemind = [
                SELECT Id,Owner.Email,Owner.Id
                FROM Account
                WHERE Id IN (
                        SELECT TargetObjectId
                        FROM ProcessInstance
                        WHERE Status = 'Pending'
                        AND IsDeleted = FALSE AND SystemModstamp < TODAY
                )
        ];

        EmailTemplate emailTemplate = [SELECT Id, Body, Subject FROM EmailTemplate WHERE DeveloperName = :OpportunityEmailTemplateName];
        List<Messaging.SingleEmailMessage>emailMessages = new List<Messaging.SingleEmailMessage>();
        List<Contact>contacts = new List<Contact>();

        for (Account acc : objectsForRemind) {
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setTemplateId(emailTemplate.Id);
            mail.setSaveAsActivity(false);
            mail.setUseSignature(false);
            mail.setBccSender(false);
            mail.setWhatId(acc.Id);
            mail.setToAddresses(new List<String>{
                    acc.Owner.Email
            });
            emailMessages.add(mail);
        }

        // Enter your record Id whose merge field you want to add in template
        Messaging.sendEmail(emailMessages);
    }
}