({
    getData: function (cmp) {
        let action = cmp.get('c.getAccounts');
        action.setCallback(this, $A.getCallback(function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set('v.data', response.getReturnValue());
            } else if (state === "ERROR") {
                let errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    showContacts: function (cmp, row) {
        let event = $A.get("e.c:selectAccount");
        event.setParam("account", row);
        event.fire();
        console.log(JSON.stringify(row));
    }

})