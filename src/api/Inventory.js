import {INVENTORY_URL} from "./apiUrls.js";
import {getValidatedToken} from "../util/validateToken.js";

export function saveInventory(formData, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'POST',
                url: INVENTORY_URL,
                data: formData,
                contentType: false,
                processData: false,
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

export function getAllInventories(onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: INVENTORY_URL,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (inventories) {
                    onSuccess(inventories);
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

export function getInventoryById(inventoryId, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: `${INVENTORY_URL}/${inventoryId}`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (inventory) {
                    onSuccess(inventory);
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

export function updateInventory(inventoryId, formData, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'PUT',
                url: `${INVENTORY_URL}/${inventoryId}`,
                data: formData,
                contentType: false,
                processData: false,
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

export function deleteInventory(inventoryId, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'DELETE',
                url: `${INVENTORY_URL}/${inventoryId}`,
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

export function getSortedInventories(sortBy, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: `${INVENTORY_URL}/sort?sortBy=${sortBy}`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (inventories) {
                    onSuccess(inventories);
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