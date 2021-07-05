({
    clickCreateItem: function(component, event, helper) {
        var validItem = component.find('itemform').reduce(function (validSoFar, inputItem) {
            // Displays error messages for invalid fields
            inputItem.showHelpMessageIfInvalid();
            return validSoFar && inputItem.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validItem){
            // Create the new item
            var newItem = component.get("v.newItem");
            console.log("Add item: " + JSON.stringify(newItem));
            //helper.createItem(component, newItem);
        }

        var theItems = component.get("v.items");
        theItems.push(newItem);
        component.set("v.items", theItems);

    }

})