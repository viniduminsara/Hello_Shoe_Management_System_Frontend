import validator from "validator/es";

$(document).ready(function() {

    const customerName = $('#customer_name');
    const customerAddress = $('#customer_address');
    const customerContact = $('#customer_contact');
    const customerEmail = $('#customer_email');
    const customerDob = $('#customer_dob');

    // Event delegation for dynamically added button
    $('#saveBtn').on('click', function() {
        let nameVal = customerName.val();
        let addressVal = customerAddress.val();
        let contactVal = customerContact.val();
        let emailVal = customerEmail.val();
        let dobVal = customerDob.val();
        let genderVal = $('input[name="customer_gender"]:checked').length > 0 ? $('input[name="customer_gender"]:checked').attr('aria-label') : '';

        removeCustomerValidationError();

        // Validation checks
        let errors = [];

        if (!validator.isLength(nameVal, { min: 2, max: 50 })) {
            errors.push('Name must be between 2 and 50 characters');
            $('#customer_name_error').text('Name must be between 2 and 50 characters');
            customerName.addClass('input-error');
        }
        if (!validator.isEmail(emailVal)) {
            errors.push('Invalid email format');
            $('#customer_email_error').text('Invalid email format');
            customerEmail.addClass('input-error');
        }
        if (!validator.isLength(addressVal, { min: 5, max: 100 })) {
            errors.push('Address must be between 5 and 100 characters');
            $('#customer_address_error').text('Address must be between 5 and 100 characters');
            customerAddress.addClass('input-error');
        }
        if (!validator.isMobilePhone(contactVal, 'any', { strictMode: false })) {
            errors.push('Invalid contact number');
            $('#customer_contact_error').text('Invalid contact number');
            customerContact.addClass('input-error');
        }
        if (!validator.isDate(dobVal)){
            errors.push('Invalid dob');
            $('#customer_dob_error').text('Invalid dob');
            customerDob.addClass('input-error');
        }
        if (validator.isEmpty(genderVal)){
            errors.push('Please select gender');
            $('#customer_gender_error').text('Please select gender');
        }

        if (errors.length > 0) {
            console.error('Validation errors:', errors);
            return;
        }

        console.log('Name:', nameVal);
        console.log('Address:', addressVal);
        console.log('Contact:', contactVal);
        console.log('Email:', emailVal);
        console.log('DOB:', dobVal);
        console.log('Gender:', genderVal);
    });

    function removeCustomerValidationError(){
        const inputs = [customerName, customerAddress, customerContact, customerEmail, customerEmail, customerDob];
        const errorLabels = [$('#customer_name_error'), $('#customer_email_error'), $('#customer_address_error'), $('#customer_contact_error'), $('#customer_dob_error'), $('#customer_gender_error')];

        inputs.forEach(input => input.removeClass('input-error'));
        errorLabels.forEach(errorLabel => errorLabel.text(''));
    }
});



