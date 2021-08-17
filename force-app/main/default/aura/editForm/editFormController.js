({
    doInit: function (component, event, helper) {


    },
    handleSubmitForm: function (component) {
        let event = $A.get("e.c:submitForm");
        event.fire();
        console.log("submit fire");
    }
});