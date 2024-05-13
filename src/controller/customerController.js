import validator from "validator/es";

$(document).ready(function() {
    // Event delegation for dynamically added button
    $('#saveBtn').on('click', function() {
        let name = $('#customer_name').val();
        let address = $('#customer_address').val();
        let contact = $('#customer_contact').val();
        let email = $('#customer_email').val();
        let dob = $('#customer_dob').val();
        let gender = $('input[name="customer_gender"]:checked').length > 0 ? $('input[name="customer_gender"]:checked').attr('aria-label') : '';

        // Validation checks
        let errors = [];

        if (!validator.isLength(name, { min: 2, max: 50 })) {
            errors.push('Name must be between 2 and 50 characters');
            showToast('Name must be between 2 and 50 characters');
        }
        if (!validator.isEmail(email)) {
            errors.push('Invalid email format');
        }
        if (!validator.isLength(address, { min: 5, max: 100 })) {
            errors.push('Address must be between 5 and 100 characters');
        }
        if (!validator.isMobilePhone(contact, 'any', { strictMode: false })) {
            errors.push('Invalid contact number');
        }
        if (!validator.isDate(dob)){
            errors.push('Invalid dob');
        }
        if (validator.isEmpty(gender)){
            errors.push('Please select gender');
        }

        if (errors.length > 0) {
            console.error('Validation errors:', errors);
            return;
        }

        console.log('Name:', name);
        console.log('Address:', address);
        console.log('Contact:', contact);
        console.log('Email:', email);
        console.log('DOB:', dob);
        console.log('Gender:', gender);
    });
});

function showToast(message, duration = 3000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';

    const alert = document.createElement('div');
    alert.className = 'alert alert-info';
    alert.textContent = message;
    toast.appendChild(alert);

    // Append toast to container
    const toastContainer = document.getElementById('toastContainer');
    toastContainer.appendChild(toast);

    // // Automatically remove toast after duration
    setTimeout(() => {
        toast.remove();
    }, duration);
}

