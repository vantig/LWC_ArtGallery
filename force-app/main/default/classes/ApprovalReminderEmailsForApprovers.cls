global class ApprovalReminderEmailsForApprovers implements Database.Batchable<SObject> {

    private final String TARGET_TYPE = 'Account';
    private final String TARGET_STATUS = 'Pending';

    private Map<SObject, Set<SObject>>recipientTargetsMap = new Map<SObject, Set<SObject>>();

    global Database.QueryLocator start(Database.BatchableContext context) {
        return Database.getQueryLocator([
                SELECT TargetObject.Id,TargetObject.Name, (SELECT Actor.EMAIL, Actor.NAME FROM Workitems)
                FROM ProcessInstance
                WHERE IsDeleted = FALSE AND TargetObject.Type = :TARGET_TYPE
                AND Status = :TARGET_STATUS
        ]);
    }
    global void execute(Database.BatchableContext context, List<SObject> batch) {


        List<Messaging.SingleEmailMessage>emailMessages = new List<Messaging.SingleEmailMessage>();

        for (SObject batchItem : batch) {
            ProcessInstance processInst = (ProcessInstance) batchItem;
            for (ProcessInstanceWorkitem workItem : processInst.Workitems) {
                addRecordInRecipientTargetsMap(processInst.TargetObject, workItem.Actor);
            }
        }
        for (SObject mapKey : recipientTargetsMap.keySet()) {
            Messaging.SingleEmailMessage mail = createEmail(mapKey, recipientTargetsMap.get(mapKey));
            emailMessages.add(mail);

        }
        Messaging.reserveSingleEmailCapacity(1);
        Messaging.sendEmail(emailMessages);
    }

    global void finish(Database.BatchableContext context) {
    }

    private void addRecordInRecipientTargetsMap(SObject TargetObject, SObject actor) {

        if (recipientTargetsMap.containsKey(actor)) {

            Set<SObject>targets = recipientTargetsMap.get(actor);
            targets.add(TargetObject);
            recipientTargetsMap.put(actor, targets);

        } else {

            recipientTargetsMap.put(actor, new Set<SObject>{
                    TargetObject
            });

        }
    }
    private Messaging.SingleEmailMessage createEmail(SObject actor, Set<SObject>targets) {

        String body;
        Integer count = 1;
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[]{
                (String) actor.get('Email')
        });
        email.setOrgWideEmailAddressId(system.Label.OrgWideEmail);
        email.setSubject('Approval Process');
        body = '<div>You have active approval processes. Please review and make a decision:</div><br/>';
        for (SObject target : targets) {
            body += count + '. ' + target.get('Name') + ' ' + Url.getSalesforceBaseUrl().toExternalForm() + '/' + target.get('Id') + ' ' + actor.get('Name') + '<br/>';
            count++;
        }
        email.setHtmlBody(body);
        return email;
    }

}