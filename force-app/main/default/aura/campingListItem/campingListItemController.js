({
    clickPacked: function (component, event, helper) {
        console.log(event.getSource().get("v.checked"));
        component.set("v.item.Packed__c", event.getSource().get("v.checked"));
    },
})