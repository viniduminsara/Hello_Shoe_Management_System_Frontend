import {SUPPLIER_URL} from "./apiUrls.js";
import {getValidatedToken} from "../util/validateToken.js";

export function saveSupplier(supplier, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'POST',
                url: SUPPLIER_URL,
                contentType: 'application/json',
                data: JSON.stringify(supplier),
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

export function getAllSuppliers(onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: SUPPLIER_URL,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (suppliers){
                    onSuccess(suppliers);
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

export function getSupplierById(supplierId, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: `${SUPPLIER_URL}/${supplierId}`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (supplier){
                    onSuccess(supplier);
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

export function updateSupplier(supplierId, supplier, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'PUT',
                url: `${SUPPLIER_URL}/${supplierId}`,
                contentType: 'application/json',
                data: JSON.stringify(supplier),
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

export function deleteSupplier(supplierId, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'DELETE',
                url: `${SUPPLIER_URL}/${supplierId}`,
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