import validator from "validator/es";
import SupplierModel from "../model/SupplierModel.js";
import {deleteSupplier, getAllSuppliers, getSupplierById, saveSupplier, updateSupplier} from "../api/Supplier.js";
import {showToast} from "../util/toast.js";
import {loadInventorySuppliers} from "./inventoryController.js";


const supplierName = $('#supplier_name');
const supplierAddress = $('#supplier_address');
const supplierContact1 = $('#supplier_contact1');
const supplierContact2 = $('#supplier_contact2');
const supplierEmail = $('#supplier_email');
const supplierCategory = $('#supplier_category');

let currentSupplierId;

export function loadAllSuppliers(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.accessRole === 'ADMIN'){
        $('#add_supplier_btn').removeClass('hidden');
    }else {
        $('#add_supplier_btn').addClass('hidden');
    }
    getAllSuppliers(
        function (suppliers){
            $('#supplier_table tbody').empty();
            suppliers.map((supplier, index) => {
                $('#supplier_table tbody').append(
                    `<tr>
                            <th>${index + 1}</th>
                            <td>${supplier.supplierName}</td>
                            <td>${supplier.supplierCategory}</td>
                            <td>${supplier.email}</td>
                            <td>
                                <div class="block my-1">${supplier.contact1}</div>
                                <div class="block my-1">${supplier.contact2}</div>
                            </td>
                            <td>${supplier.address}</td>
                            ${(user.accessRole === 'ADMIN') ? `
                            <th>
                                <button class="btn btn-square btn-sm text-primary mr-2 edit-supplier-btn"
                                    data-supplier-id="${supplier.supplierId}">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                    </svg>
                                </button>
                                <button class="btn btn-square btn-sm text-primary delete-supplier-btn"
                                    data-supplier-id="${supplier.supplierId}">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>
                                </button>
                            </th>` : '' }
                        </tr>`
                )
            });
        },
        function (err){
            console.error('Error loading suppliers:', err);
            showToast('error','Error loading suppliers!');
        }
    )
}

$('#supplierSaveBtn').on('click', function (){
    let nameVal = supplierName.val().trim();
    let addressVal = supplierAddress.val().trim();
    let contact1Val = supplierContact1.val().trim();
    let contact2Val = supplierContact2.val().trim();
    let emailVal = supplierEmail.val().trim();
    let categoryVal = supplierCategory.val();

    removeSupplerValidationError();

    let errors = [];

    if (!validator.isLength(nameVal, {min: 2, max: 50})) {
        errors.push('Name must be between 2 and 50 characters');
        $('#supplier_name_error').text('Name must be between 2 and 50 characters');
    }
    if (!validator.isEmail(emailVal)) {
        errors.push('Invalid email format');
        $('#supplier_email_error').text('Invalid email format');
    }
    if (!validator.isLength(addressVal, {min: 5, max: 100})) {
        errors.push('Address must be between 5 and 100 characters');
        $('#supplier_address_error').text('Address must be between 5 and 100 characters');
    }
    if (!validator.isMobilePhone(contact1Val, 'any', {strictMode: true})) {
        errors.push('Invalid contact number');
        $('#supplier_contact1_error').text('Invalid contact number');
    }
    if (!validator.isMobilePhone(contact2Val, 'any', {strictMode: true})) {
        errors.push('Invalid contact number');
        $('#supplier_contact2_error').text('Invalid contact number');
    }
    if (!categoryVal){
        errors.push('Please select category');
        $('#supplier_category_error').text('Please select category');
    }

    if (errors.length > 0){
        return;
    }

    const supplier = new SupplierModel(nameVal,addressVal,contact1Val,contact2Val,emailVal,categoryVal);

    if ($('#supplierSaveBtn').text() === 'Save') {
        saveSupplier(supplier,
            function () {
                new_supplier_form.close();
                loadAllSuppliers();
                showToast('success', 'Supplier saved successfully!');
                clearSupplierInputs();
                loadInventorySuppliers();
            },
            function (error) {
                console.error('Error saving supplier:', error);
                showToast('error', 'Error saving supplier!');
                clearSupplierInputs();
            }
        )
    }else {
        updateSupplier(currentSupplierId, supplier,
            function () {
                loadAllSuppliers();
                new_supplier_form.close();
                showToast('success','Supplier updated successfully!');
                clearSupplierInputs();
                loadInventorySuppliers();
            },
            function (error) {
                console.error('Error updating supplier:', error);
                showToast('error','Error updating supplier!');
                clearSupplierInputs();
            }
        )
    }
});

function changeToEditSupplierModal(supplierId){
    getSupplierById(supplierId,
        function (supplier){
            new_supplier_form.showModal();
            currentSupplierId = supplier.supplierId;

            supplierName.val(supplier.supplierName);
            supplierEmail.val(supplier.email);
            supplierAddress.val(supplier.address);
            supplierContact1.val(supplier.contact1);
            supplierContact2.val(supplier.contact2);
            supplierCategory.val(supplier.supplierCategory);
        },
        function (err){
            console.error('Error fetching customer:', err);
            showToast('error','Error loading suppliers!');
        }
    )
}

$(document).on('click', '.edit-supplier-btn', function () {
    let supplierId = $(this).attr('data-supplier-id');
    $('#new_supplier_form .modal-box h1').text('Edit Supplier');
    $('#supplierSaveBtn').text('Update');
    changeToEditSupplierModal(supplierId);
});


$(document).on('click', '#add_supplier_btn',function() {
    $('#new_supplier_form .modal-box h1').text('Add Supplier');
    $('#supplierSaveBtn').text('Save');

    clearSupplierInputs();
    new_supplier_form.showModal();
});

$(document).on('click', '.delete-supplier-btn', function () {
    let supplierId = $(this).attr('data-supplier-id');

    deleteSupplier(supplierId,
        function (){
            loadAllSuppliers();
            showToast('success','Supplier deleted successfully!');
            loadInventorySuppliers();
        },
        function (err){
            console.error('Error deleting supplier:', err);
            showToast('error','Error deleting supplier!');
        }
    )
});

function removeSupplerValidationError(){
    const errorLabels = [
        $('#supplier_name_error'),
        $('#supplier_address_error'),
        $('#supplier_contact1_error'),
        $('#supplier_contact2_error'),
        $('#supplier_email_error'),
        $('#supplier_category_error')
    ];

    errorLabels.forEach(errorLabel => errorLabel.text(''));
}

function clearSupplierInputs(){
    supplierName.val('');
    supplierEmail.val('');
    supplierAddress.val('');
    supplierContact1.val('');
    supplierContact2.val('');
    supplierCategory.val('');
}