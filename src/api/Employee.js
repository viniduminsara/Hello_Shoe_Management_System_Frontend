import {EMPLOYEE_URL} from "./apiUrls.js";
import {getValidatedToken} from "../util/validateToken.js";

export function saveEmployee(formData, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'POST',
                url: EMPLOYEE_URL,
                data: formData,
                contentType: false,
                processData: false,
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

export function  getAllEmployees(onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: EMPLOYEE_URL,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (employees) {
                    onSuccess(employees);
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

export function getEmployeeById(employeeId, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: `${EMPLOYEE_URL}/${employeeId}`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (employee) {
                    onSuccess(employee);
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

export function updateEmployee(employeeId, formData, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'PUT',
                url: `${EMPLOYEE_URL}/${employeeId}`,
                data: formData,
                contentType: false,
                processData: false,
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

export function deleteEmployee(employeeId, onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'DELETE',
                url: `${EMPLOYEE_URL}/${employeeId}`,
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