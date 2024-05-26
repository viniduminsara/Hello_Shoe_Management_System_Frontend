import {CUSTOMER_URL} from "./apiUrls.js";
import {getValidatedToken} from "../util/validateToken.js";

export function saveCustomer(customer, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: CUSTOMER_URL,
        contentType: 'application/json',
        data: JSON.stringify(customer),
        headers: {
            'Authorization': `Bearer ${getValidatedToken()}`
        },
        success: function (res) {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function getAllCustomers(onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: CUSTOMER_URL,
        headers: {
            'Authorization': `Bearer ${getValidatedToken()}`
        },
        success: function (customers){
            onSuccess(customers);
        },
        error: function (err){
            onError(err);
        }
    })
}

export function getCustomerById(customerId, onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: `${CUSTOMER_URL}/${customerId}`,
        headers: {
            'Authorization': `Bearer ${getValidatedToken()}`
        },
        success: function (customer){
            onSuccess(customer);
        },
        error: function (err){
            onError(err);
        }
    })
}

export function updateCustomer(customerId, customer, onSuccess, onError){
    $.ajax({
        type: 'PUT',
        url: `${CUSTOMER_URL}/${customerId}`,
        headers: {
            'Authorization': `Bearer ${getValidatedToken()}`
        },
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

export function deleteCustomer(customerId, onSuccess, onError){
    $.ajax({
        type: 'DELETE',
        url: `${CUSTOMER_URL}/${customerId}`,
        headers: {
            'Authorization': `Bearer ${getValidatedToken()}`
        },
        success: function (res) {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}