import validator from "validator/es";
import SupplierModel from "../model/SupplierModel.js";
import {saveSupplier} from "../api/Supplier.js";
import {showToast} from "../util/toast.js";


const supplierName = $('#supplier_name');
const supplierAddress = $('#supplier_address');
const supplierContact1 = $('#supplier_contact1');
const supplierContact2 = $('#supplier_contact2');
const supplierEmail = $('#supplier_email');
const supplierCategory = $('#supplier_category');

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
        errors.push('Please select gender');
        $('#supplier_category_error').text('Please select category');
    }

    if (errors.length > 0){
        return;
    }

    const supplier = new SupplierModel(nameVal,addressVal,contact1Val,contact2Val,emailVal,categoryVal);

    saveSupplier(supplier,
        function () {
            new_supplier_form.close();
            showToast('success','Supplier saved successfully!');
            clearSupplierInputs();
        },
        function (error) {
            console.error('Error saving supplier:', error);
            showToast('error','Error saving supplier!');
            clearSupplierInputs();
        }
    )
});


$(document).on('click', '#add_supplier_btn',function() {
    new_supplier_form.showModal();
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