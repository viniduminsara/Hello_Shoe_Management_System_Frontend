import {SUPPLIER_URL} from "./apiUrls.js";

export function saveSupplier(supplier, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: SUPPLIER_URL,
        contentType: 'application/json',
        data: JSON.stringify(supplier),
        success: function (res) {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}