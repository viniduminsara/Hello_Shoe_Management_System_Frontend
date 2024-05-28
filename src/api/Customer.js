import {CUSTOMER_URL} from "./apiUrls.js";
import {getValidatedToken} from "../util/validateToken.js";

export function saveCustomer(customer, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'POST',
                url: CUSTOMER_URL,
                contentType: 'application/json',
                data: JSON.stringify(customer),
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

export function getAllCustomers(onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: CUSTOMER_URL,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (customers){
                    onSuccess(customers);
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

export function getCustomerById(customerId, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: `${CUSTOMER_URL}/${customerId}`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (customer){
                    onSuccess(customer);
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

export function updateCustomer(customerId, customer, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'PUT',
                url: `${CUSTOMER_URL}/${customerId}`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                contentType: 'application/json',
                data: JSON.stringify(customer),
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

export function deleteCustomer(customerId, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'DELETE',
                url: `${CUSTOMER_URL}/${customerId}`,
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

export function getCustomerByContact(contact, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: `${CUSTOMER_URL}/contact?contact=${contact}`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (customer){
                    onSuccess(customer);
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