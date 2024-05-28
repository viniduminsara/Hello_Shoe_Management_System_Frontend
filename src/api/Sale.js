import {SALE_URL} from "./apiUrls.js";
import {getValidatedToken} from "../util/validateToken.js";

export function saveSale(sale, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'POST',
                url: SALE_URL,
                contentType: 'application/json',
                data: JSON.stringify(sale),
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function () {
                    onSuccess();
                },
                error: function (err) {
                    onError(err);
                }
            })
        },
        function (err){
            console.error(err)
        }
    );
}

export function getAllOrders(onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: SALE_URL,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (orders){
                    onSuccess(orders);
                },
                error: function (err){
                    onError(err);
                }
            })
        },
        function (err){
            console.error(err)
        }
    );
}