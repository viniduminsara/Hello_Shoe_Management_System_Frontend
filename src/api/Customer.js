import {CUSTOMER_URL} from "./apiUrls.js";

export function saveCustomer(customer, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: CUSTOMER_URL,
        contentType: 'application/json',
        data: JSON.stringify(customer),
        success: function (res) {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}

// export function getAllCustomers(onSuccess, onError){
//     $.ajax({
//         type: 'GET',
//         url: CUSTOMER_URL,
//
//     })
// }