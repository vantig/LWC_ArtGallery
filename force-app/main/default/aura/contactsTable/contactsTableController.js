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
        console.log("handle!");
        let account = event.getParam("account");
        helper.getContacts(component, account.Id);

    },
    handleRowAction: function (cmp, event, helper) {
        console.log('action');
    }
});