({
    clickCreateItem: function (component, event, helper) {
        let validItem = component.find('campingform').reduce(function (validSoFar, inputItem) {
            // Displays error messages for invalid fields
            inputItem.showHelpMessageIfInvalid();
            return validSoFar && inputItem.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if (validItem) {
            // Create the new item
            let newItem = component.get("v.newItem");
            helper.createItem(component, newItem);

        } else {
            component.set("v.newItem", {
                'sobjectType': 'Camping_Item__c',
                'Name': '',
                'Quantity__c': 0,
                'Price__c': 0.00,
                'Packed__c': false
            });
        }


    }
});