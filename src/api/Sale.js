import {SALE_URL} from "./apiUrls.js";

export function saveSale(sale, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: SALE_URL,
        contentType: 'application/json',
        data: JSON.stringify(sale),
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        success: function () {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}