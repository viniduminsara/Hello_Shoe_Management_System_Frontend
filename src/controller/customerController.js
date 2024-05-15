import validator from "validator/es";
import CustomerModel from "../model/CustomerModel.js";
import {deleteCustomer, getAllCustomers, getCustomerById, saveCustomer, updateCustomer} from "../api/Customer.js";
import {showToast} from "../util/toast.js";

const customerName = $('#customer_name');
const customerAddress = $('#customer_address');
const customerContact = $('#customer_contact');
const customerEmail = $('#customer_email');
const customerDob = $('#customer_dob');
const customerMale = $('#customer_male');
const customerFemale = $('#customer_female');

let currentCustomerId;

function loadAllCustomers() {
    getAllCustomers(
        function (customers) {
            $('#customer_table tbody').empty();
            customers.map((customer, index) => {
                let rowHtml =
                    `<tr>
                            <th>${index + 1}</th>
                            <td>${customer.name}</td>
                            <td>${customer.email}</td>
                            <td>${customer.contact}</td>  
                            <td>${customer.address}</td>  
                            <td>${customer.joinedDate}</td>  
                            <td class="flex justify-around">
                                <button class="btn btn-square btn-sm text-primary mr-2 edit-customer-btn"
                                        data-customer-id="${customer.customerId}">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                    </svg>
                                </button>
                                <button class="btn btn-square btn-sm text-primary delete-customer-btn"
                                        data-customer-id="${customer.customerId}">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                    </svg>
                                </button>
                            </td>  
                        </tr>`;
                $('#customer_table tbody').append(rowHtml);
            });
        },
        function (err) {
            console.error('Error loading customer:', err);
        })
}

loadAllCustomers();

// Event delegation for dynamically added button
$('#customerSaveBtn').on('click', function () {
    let nameVal = customerName.val().trim();
    let addressVal = customerAddress.val().trim();
    let contactVal = customerContact.val().trim();
    let emailVal = customerEmail.val().trim();
    let dobVal = customerDob.val();
    let genderVal = $('input[name="customer_gender"]:checked').length > 0 ? $('input[name="customer_gender"]:checked').attr('aria-label') : '';

    removeCustomerValidationError();

    // Validation checks
    let errors = [];

    if (!validator.isLength(nameVal, {min: 2, max: 50})) {
        errors.push('Name must be between 2 and 50 characters');
        $('#customer_name_error').text('Name must be between 2 and 50 characters');
        customerName.addClass('input-error');
    }
    if (!validator.isEmail(emailVal)) {
        errors.push('Invalid email format');
        $('#customer_email_error').text('Invalid email format');
        customerEmail.addClass('input-error');
    }
    if (!validator.isLength(addressVal, {min: 5, max: 100})) {
        errors.push('Address must be between 5 and 100 characters');
        $('#customer_address_error').text('Address must be between 5 and 100 characters');
        customerAddress.addClass('input-error');
    }
    if (!validator.isMobilePhone(contactVal, 'any', {strictMode: false})) {
        errors.push('Invalid contact number');
        $('#customer_contact_error').text('Invalid contact number');
        customerContact.addClass('input-error');
    }
    if (!validator.isDate(dobVal)) {
        errors.push('Invalid dob');
        $('#customer_dob_error').text('Invalid dob');
        customerDob.addClass('input-error');
    }
    if (validator.isEmpty(genderVal)) {
        errors.push('Please select gender');
        $('#customer_gender_error').text('Please select gender');
    }

    if (errors.length > 0) {
        return;
    }

    const customer = new CustomerModel(nameVal, genderVal.toUpperCase(), dobVal, addressVal, contactVal, emailVal);

    if ($('#customerSaveBtn').text() === 'Save'){
        saveCustomer(customer,
            function () {
                loadAllCustomers();
                new_customer_form.close();
                showToast('success','Customer saved successfully!');
            },
            function (error) {
                console.error('Error saving customer:', error);
                showToast('error','Error saving customer!');
            }
        );
    }else {
        updateCustomer(currentCustomerId, customer,
            function () {
                loadAllCustomers();
                new_customer_form.close();
                showToast('success','Customer updated successfully!');
            },
            function (error) {
                console.error('Error updating customer:', error);
                showToast('error','Error updating customer!');
            }
        )
    }

});

function changeToEditCustomerModal(customerId) {

    getCustomerById(customerId,
        function (customer) {
            new_customer_form.showModal();
            currentCustomerId = customer.customerId;

            customerName.val(customer.name);
            customerEmail.val(customer.email);
            customerContact.val(customer.contact);
            customerAddress.val(customer.address);
            customerDob.val(customer.dob);
            console.log(customer.gender)
            if (customer.gender === 'FEMALE'){
                customerMale.removeAttr('checked');
                customerFemale.attr('checked', 'checked');
            }else if (customer.gender === 'MALE'){
                customerFemale.removeAttr('checked');
                customerMale.attr('checked', 'checked');
            }
        },
        function (error) {
            console.error('Error fetching customer:', error);
        }
    );
}

$(document).on('click', '.edit-customer-btn', function () {
    let customerId = $(this).attr('data-customer-id');
    $('#new_customer_form .modal-box h1').text('Edit Customer');
    $('#customerSaveBtn').text('Update');
    changeToEditCustomerModal(customerId);
});

$(document).on('click', '.delete-customer-btn', function () {
    let customerId = $(this).attr('data-customer-id');

    deleteCustomer(customerId,
        function (){
            loadAllCustomers();
            showToast('success','Customer deleted successfully!');
        },
        function (err){
            console.error('Error updating customer:', err);
            showToast('error','Error deleting customer!');
        }
    )
});

function removeCustomerValidationError() {
    const inputs = [customerName, customerAddress, customerContact, customerEmail, customerEmail, customerDob];
    const errorLabels = [$('#customer_name_error'), $('#customer_email_error'), $('#customer_address_error'), $('#customer_contact_error'), $('#customer_dob_error'), $('#customer_gender_error')];

    inputs.forEach(input => input.removeClass('input-error'));
    errorLabels.forEach(errorLabel => errorLabel.text(''));
}


$(document).on('click', '#add_customer_btn',function() {
    $('#new_customer_form .modal-box h1').text('Add Customer');
    $('#customerSaveBtn').text('Save');

    customerName.val('');
    customerEmail.val('');
    customerContact.val('');
    customerAddress.val('');
    customerDob.val('');
    customerMale.removeAttr('checked');
    customerFemale.removeAttr('checked');

    new_customer_form.showModal()
});




