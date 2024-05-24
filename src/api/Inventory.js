import {INVENTORY_URL} from "./apiUrls.js";

export function saveInventory(formData, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: INVENTORY_URL,
        data: formData,
        contentType: false,
        processData: false,
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

export function getAllInventories(onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: INVENTORY_URL,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        success: function (inventories) {
            onSuccess(inventories);
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function getInventoryById(inventoryId, onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: `${INVENTORY_URL}/${inventoryId}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        success: function (inventory) {
            onSuccess(inventory);
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function updateInventory(inventoryId, formData, onSuccess, onError){
    $.ajax({
        type: 'PUT',
        url: `${INVENTORY_URL}/${inventoryId}`,
        data: formData,
        contentType: false,
        processData: false,
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

export function deleteInventory(inventoryId, onSuccess, onError){
    $.ajax({
        type: 'DELETE',
        url: `${INVENTORY_URL}/${inventoryId}`,
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

export function getSortedInventories(sortBy, onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: `${INVENTORY_URL}/sort?sortBy=${sortBy}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        success: function (inventories) {
            onSuccess(inventories);
        },
        error: function (err) {
            onError(err);
        }
    })
}