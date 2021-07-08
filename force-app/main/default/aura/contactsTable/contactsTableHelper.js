({
    getContacts: function (component, id) {
        let action = component.get("c.getContacts");
        action.setParams({
            "accountId": id
        });
        action.setCallback(this, function (response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.contacts", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
});