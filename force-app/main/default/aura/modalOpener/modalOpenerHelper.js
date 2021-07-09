({
    createModal: function (component, head, body) {
        component.find('overlayLib').showCustomModal({
            header: head,
            body: body,
        }).then(function (overlay) {
            // cache the overlay into the component
            component._overlay = overlay;
        });
        console.log("helper");
    },
    closeModal: function (component) {
        component._overlay.close();
    }
});