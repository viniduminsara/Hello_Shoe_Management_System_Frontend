import {SALE_URL} from "./apiUrls.js";
import {getValidatedToken} from "../util/validateToken.js";

export function saveSale(sale, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: SALE_URL,
        contentType: 'application/json',
        data: JSON.stringify(sale),
        headers: {
            'Authorization': `Bearer ${getValidatedToken()}`
        },
        success: function () {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}