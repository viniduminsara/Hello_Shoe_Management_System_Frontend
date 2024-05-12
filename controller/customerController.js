$(document).ready(function() {
    // Event delegation for dynamically added button
    $('#saveBtn').on('click', function() {
        let name = $('#customer_name').val();
        let address = $('#customer_address').val();
        let contact = $('#customer_contact').val();
        let email = $('#customer_email').val();
        let dob = $('#customer_dob').val();
        let gender = $('input[name="customer_gender"]:checked').length > 0 ? $('input[name="customer_gender"]:checked').attr('aria-label') : '';

        console.log('Name:', name);
        console.log('Address:', address);
        console.log('Contact:', contact);
        console.log('Email:', email);
        console.log('DOB:', dob);
        console.log('Gender:', gender);
    });
});
