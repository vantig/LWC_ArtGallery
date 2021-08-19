global class ApprovalReminderEmails implements Database.Batchable<sObject>, Database.Stateful {
    static final string OpportunityEmailTemplateName = 'Approval_Opportunity_Reminder';
    global Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id, TargetObject.Name, TargetObjectID, TargetObject.Type, (SELECT Id, ActorID, Actor.email, Actor.Name FROM WorkItems) FROM ProcessInstance WHERE Status = \'Pending\' AND IsDeleted = False AND SystemModStamp < Today';

        return Database.getQueryLocator(query);
    }
    global void execute(Database.BatchableContext BC, List<SObject> scope) {
        for (SObject s : scope) {
            ProcessInstance PI = (ProcessInstance) s;
            for (ProcessInstanceWorkitem WI : PI.Workitems) {
                ApprovalReminderEmails.SendReminderEmail(PI.TargetObject.Id, PI.TargetObject.Type, WI.ActorId, WI.Actor.Email, WI.Actor.Name, PI.TargetObject.Name);
            }
        }

    }
    global void finish(Database.BatchableContext info) {
    }
    private static void SendReminderEmail(Id TargetID, String TargetObjectType, Id ActorID, String ActorEmailAddress, string ActorName, string TargetDesc) {
        id EmailTemplateID;
        system.debug('TargetObjectType = ' + TargetObjectType);
        if (TargetObjectType == 'Opportunity') {
            EmailTemplateID = FindEmailTemplateIDByDeveloperName(OpportunityEmailTemplateName);
        }
        Messaging.reserveSingleEmailCapacity(1);
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[]{
                ActorEmailAddress
        };

        if (EmailTemplateID != null) {
            email.setTemplateId(EmailTemplateID);
            email.setTargetObjectId(ActorID);
            email.setWhatId(TargetID);
        }

    }
}