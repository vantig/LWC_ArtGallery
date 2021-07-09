({
    handleEditRecord: function (component, event, helper) {
        let recId = event.getParam("recordId");
        $A.createComponent("c:editForm", {id: recId},
            function (content, status) {
                if (status === "SUCCESS") {
                    console.log("component");
                    helper.createModal(component, "Edit Contact", content)
                }
            });
    },
    handleSubmitForm: function (component, event, helper) {
        console.log("handleSubmitForm");
        helper.closeModal(component);
    }
})