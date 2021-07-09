({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Account Name', fieldName: 'Name', type: 'text'},
            {label: 'Phone ', fieldName: 'Phone', type: 'phone'},
            {
                type: 'action', typeAttributes: {
                    rowActions: [
                        {label: 'Show Contacts', name: 'show_contacts'},

                    ], menuAlignment: 'right'
                }
            }
        ]);
        helper.getData(cmp);
    },
    handleRowAction: function (cmp, event, helper) {
        let action = event.getParam('action');
        let row = event.getParam('row');
        switch (action.name) {
            case 'show_contacts':
                helper.showContacts(cmp, row);
        }
    },
    reloadData: function (cmp, event, helper) {
        helper.getData(cmp);
    }
})