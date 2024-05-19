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

export function getAllInventories(onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: INVENTORY_URL,
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
        success: function () {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}