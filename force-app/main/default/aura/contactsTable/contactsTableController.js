({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Contact Name', fieldName: 'Name', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'phone'},
            {label: 'Email', fieldName: 'Email', type: 'email'},
            {
                type: 'action', typeAttributes: {
                    rowActions: [
                        {label: 'Edit', name: 'edit_contact'},

                    ], menuAlignment: 'right'
                }
            }
        ]);
    },
    handleSelectAccount: function (component, event, helper) {
        let account = event.getParam("account");

        helper.getContacts(component, account.Id);
        component.set("v.accountId", account.Id)
    },
    reloadData: function (component, event, helper) {
        helper.getContacts(component, component.get("v.accountId"));
    },
    handleRowAction: function (cmp, event, helper) {

        let action = event.getParam('action');
        let row = event.getParam('row');
        switch (action.name) {
            case 'edit_contact':
                helper.editContact(cmp, row.Id);
        }

    }
});