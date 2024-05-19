import {EMPLOYEE_URL, INVENTORY_URL} from "./apiUrls.js";

export function saveInventory(formData, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: INVENTORY_URL,
        data: formData,
        contentType: false,
        processData: false,
        success: function () {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}