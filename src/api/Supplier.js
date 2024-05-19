import {SUPPLIER_URL} from "./apiUrls.js";

export function saveSupplier(supplier, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: SUPPLIER_URL,
        contentType: 'application/json',
        data: JSON.stringify(supplier),
        success: function (res) {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function getAllSuppliers(onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: SUPPLIER_URL,
        success: function (suppliers){
            onSuccess(suppliers);
        },
        error: function (err){
            onError(err);
        }
    })
}

export function getSupplierById(supplierId, onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: `${SUPPLIER_URL}/${supplierId}`,
        success: function (supplier){
            onSuccess(supplier);
        },
        error: function (err){
            onError(err);
        }
    })
}

export function updateSupplier(supplierId, supplier, onSuccess, onError){
    $.ajax({
        type: 'PUT',
        url: `${SUPPLIER_URL}/${supplierId}`,
        contentType: 'application/json',
        data: JSON.stringify(supplier),
        success: function () {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function deleteSupplier(supplierId, onSuccess, onError){
    $.ajax({
        type: 'DELETE',
        url: `${SUPPLIER_URL}/${supplierId}`,
        success: function () {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}