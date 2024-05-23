import {EMPLOYEE_URL} from "./apiUrls.js";

export function saveEmployee(formData, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: EMPLOYEE_URL,
        data: formData,
        contentType: false,
        processData: false,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        success: function () {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function  getAllEmployees(onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: EMPLOYEE_URL,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        success: function (employees) {
            onSuccess(employees);
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function getEmployeeById(employeeId, onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: `${EMPLOYEE_URL}/${employeeId}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        success: function (employee) {
            onSuccess(employee);
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function updateEmployee(employeeId, formData, onSuccess, onError){
    $.ajax({
        type: 'PUT',
        url: `${EMPLOYEE_URL}/${employeeId}`,
        data: formData,
        contentType: false,
        processData: false,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        success: function () {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function deleteEmployee(employeeId, onSuccess, onError){
    $.ajax({
        type: 'DELETE',
        url: `${EMPLOYEE_URL}/${employeeId}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        success: function () {
            onSuccess();
        },
        error: function (err) {
            onError(err);
        }
    })
}