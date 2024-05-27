import validator from "validator/es";
import {deleteEmployee, getAllEmployees, getEmployeeById, saveEmployee, updateEmployee} from "../api/Employee.js";
import {showToast} from "../util/toast.js";

const employeeName = $('#employee_name');
const employeeDesignation = $('#employee_designation');
const employeeCivilState = $('#employee_civilState');
const employeeAddress = $('#employee_address');
const employeeContact = $('#employee_contact');
const employeeEmail = $('#employee_email');
const employeeGuardian = $('#employee_guardian');
const employeeEmergencyContact = $('#employee_emergencyContact');
const employeeJoinedDate = $('#employee_joinedDate');
const employeeDob = $('#employee_dob');
const employeeProfilePic = $('#employee_profilePic');
const employeeMale = $('#employee_male');
const employeeFemale = $('#employee_female');

const employeeFormBtn = $('#employeeSaveBtn');

let currentEmployeeId;

export function loadAllEmployees() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.accessRole === 'ADMIN'){
        $('#add_employee_btn').removeClass('hidden');
    }else {
        $('#add_employee_btn').addClass('hidden');
    }

    getAllEmployees(
        function (employees) {
            $('#employee_table tbody').empty();
            employees.map((employee, index) => {
                $('#employee_table tbody').append(
                    `<tr>
                        <th>${index + 1}</th>
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12">
                                        <img src="data:image/jpeg;base64,${employee.profilePic}" alt="Profile picture"/>
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">${employee.name}</div>
                                    <div class="text-sm opacity-50">${employee.designation}</div>
                                </div>
                            </div>
                        </td>
                        <td>${employee.email}</td>
                        <td>${employee.contact}</td>
                        <td>${employee.joinedDate}</td>
                        <td>${employee.address}</td>
                        ${(user.accessRole === 'ADMIN') ? `
                        <td class="flex justify-around">
                            <button class="btn btn-square btn-sm text-primary mr-2 edit-employee-btn" 
                                data-employee-id="${employee.employeeId}">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                </svg>
                            </button>
                            <button class="btn btn-square btn-sm text-primary delete-employee-btn" 
                                data-employee-id="${employee.employeeId}">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                </svg>
                            </button>
                        </td>
                        ` : ''}
                    </tr>`
                );
            })
        },
        function (err) {
            console.error('Error loading employees:', err);
            showToast('error', 'Error loading employees!');
        }
    )
}


$('#employeeForm').submit(function (e) {
        e.preventDefault();

        removeEmployeeValidationError();
        const formData = new FormData(this);

        // Validation checks
        let errors = [];

        if (!validator.isLength(formData.get('name'), {min: 2, max: 50})) {
            errors.push('Name must be between 2 and 50 characters');
            $('#employee_name_error').text('Name must be between 2 and 50 characters');
        }
        if (validator.isEmpty(formData.get('designation'))) {
            errors.push('Please enter the designation');
            $('#employee_designation_error').text('Please enter the designation');
        }
        if (validator.isEmpty(formData.get('civilState'))) {
            errors.push('Please enter the Civil State');
            $('#employee_civilState_error').text('Please enter the Civil State');
        }
        if (!validator.isLength(formData.get('address'), {min: 5, max: 100})) {
            errors.push('Address must be between 5 and 100 characters');
            $('#employee_address_error').text('Address must be between 5 and 100 characters');
        }
        if (!validator.isMobilePhone(formData.get('contact'), 'any', {strictMode: false})) {
            errors.push('Invalid contact number');
            $('#employee_contact_error').text('Invalid contact number');
        }
        if (!validator.isEmail(formData.get('email'))) {
            errors.push('Invalid email format');
            $('#employee_email_error').text('Invalid email format');
        }
        if (validator.isEmpty(formData.get('guardian'))) {
            errors.push('Please enter the guardian name');
            $('#employee_guardian_error').text('Please enter the guardian name');
        }
        if (!validator.isMobilePhone(formData.get('emergencyContact'), 'any', {strictMode: false})) {
            errors.push('Invalid emergency contact number');
            $('#employee_emergencyContact_error').text('Invalid emergency contact number');
        }
        if (!validator.isDate(formData.get('joinedDate'))) {
            errors.push('Invalid joinedDate');
            $('#employee_joinedDate_error').text('Invalid joinedDate');
        }
        if (!validator.isDate(formData.get('dob'))) {
            errors.push('Invalid dob');
            $('#employee_dob_error').text('Invalid dob');
        }
        if (!formData.get('gender')) {
            errors.push('Please select gender');
            $('#employee_gender_error').text('Please select gender');
        }
        if (!formData.get('accessRole')) {
            errors.push('Please select access role');
            $('#employee_accessRole_error').text('Please select access role');
        }
        if (employeeFormBtn.text() === 'Save') {
            if (validator.isEmpty(formData.get('profilePicture').name)) {
                errors.push('Please select a profile picture');
                $('#employee_profilePic_error').text('Please select a profile picture');
            }
        }

        if (errors.length > 0) {
            return;
        }
        if (employeeFormBtn.text() === 'Save') {
            saveEmployee(formData,
                function () {
                    loadAllEmployees();
                    new_employee_form.close();
                    showToast('success', 'Employee saved successfully!');
                },
                function (error) {
                    console.error('Error saving employee:', error);
                    showToast('error', 'Error saving employee!');
                }
            );
        } else if (employeeFormBtn.text() === 'Update') {
            updateEmployee(currentEmployeeId, formData,
                function () {
                    loadAllEmployees();
                    new_employee_form.close();
                    showToast('success', 'Employee updated successfully!');
                },
                function (error) {
                    console.error('Error updating employee:', error);
                    showToast('error', 'Error updating customer!');
                }
            );
        }
    }
);

function changeToEditEmployeeModal(employeeId) {
    getEmployeeById(employeeId,
        function (employee) {
            currentEmployeeId = employee.employeeId;

            employeeName.val(employee.name);
            employeeDesignation.val(employee.designation);
            employeeCivilState.val(employee.civilState);
            employeeAddress.val(employee.address);
            employeeContact.val(employee.contact);
            employeeEmail.val(employee.email);
            employeeGuardian.val(employee.guardian);
            employeeEmergencyContact.val(employee.emergencyContact);
            employeeJoinedDate.val(employee.joinedDate);
            employeeDob.val(employee.dob);

            if (employee.gender === 'FEMALE') {
                employeeMale.removeAttr('checked');
                employeeFemale.attr('checked', 'checked');
            } else if (employee.gender === 'MALE') {
                employeeFemale.removeAttr('checked');
                employeeMale.attr('checked', 'checked');
            }

            new_employee_form.showModal()

        },
        function (error) {
            console.error('Error fetching employee:', error);
            showToast('error', 'Error fetching customer!');
        }
    );
}

$(document).on('click', '.edit-employee-btn', function () {
    const employeeId = $(this).attr('data-employee-id');
    $('#new_employee_form .modal-box h1').text('Edit Employee');
    $('#employeeSaveBtn').text('Update');
    employeeProfilePic.addClass('hidden');
    changeToEditEmployeeModal(employeeId);
});

$(document).on('click', '.delete-employee-btn', function () {
    const employeeId = $(this).attr('data-employee-id');

    deleteEmployee(employeeId,
        function (){
            loadAllEmployees();
            showToast('success','Employee deleted successfully!');
        },
        function (err){
            console.error('Error updating customer:', err);
            showToast('error','Error deleting employee!');
        }
    )
});

$(document).on('click', '#add_employee_btn', function () {
    $('#new_employee_form .modal-box h1').text('Add Employee');
    $('#employeeSaveBtn').text('Save');
    employeeProfilePic.removeClass('hidden');

    employeeName.val('');
    employeeDesignation.val('');
    employeeCivilState.val('');
    employeeAddress.val('');
    employeeContact.val('');
    employeeEmail.val('');
    employeeGuardian.val('');
    employeeEmergencyContact.val('');
    employeeJoinedDate.val('');
    employeeDob.val('');
    employeeMale.removeAttr('checked');
    employeeFemale.removeAttr('checked');

    new_employee_form.showModal()
});

function removeEmployeeValidationError() {
    const errorLabels = [
        $('#employee_name_error'),
        $('#employee_designation_error'),
        $('#employee_civilState_error'),
        $('#employee_address_error'),
        $('#employee_contact_error'),
        $('#employee_email_error'),
        $('#employee_guardian_error'),
        $('#employee_emergencyContact_error'),
        $('#employee_joinedDate_error'),
        $('#employee_dob_error'),
        $('#employee_profilePic_error'),
        $('#employee_gender_error'),
    ];
    errorLabels.forEach(errorLabel => errorLabel.text(''));
}