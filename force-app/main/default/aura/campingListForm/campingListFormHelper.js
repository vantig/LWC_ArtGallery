({
    createItem: function (component, item){
        let event = component.getEvent("addItem");
        event.setParams({ "item": item });
        event.fire();
        component.set("v.newItem", {
            'sobjectType': 'Camping_Item__c',
            'Name': '',
            'Quantity__c': 0,
            'Price__c': 0.00,
            'Packed__c': false
        });
    }
});