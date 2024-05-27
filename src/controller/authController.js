import {showToast} from "../util/toast.js";
import {signin, signup} from "../api/Auth.js";
import {jwtDecode} from "jwt-decode";
import {getEmployeeData} from "./navigationController.js";

const login_email = $('#login_email');
const login_password = $('#login_password');
const signup_email = $('#signup_email');
const signup_password = $('#signup_password');

$('#login_btn').on('click', function (){
    const email = login_email.val();
    const password = login_password.val();

    if (!email){
        showToast('info', 'Please enter the email');
        return;
    }

    if (!password){
        showToast('info', 'Please enter the password');
        return;
    }

    const data = {
        email: email,
        password: password,
    }
    signin(
        data,
        function (res){
            const tokens = res.token.split(' : ');

            localStorage.setItem('accessToken', tokens[0]);
            localStorage.setItem('refreshToken', tokens[1]);

            const decoded = jwtDecode(tokens[0]);
            getEmployeeData(decoded.employeeId);

            $('#login').css('display','none');
            $('.drawer').removeClass('hidden');
            $('#dashboard').css('display', 'block');
        },
        function (err){
            if (err.status === 403) {
                showToast('error', 'invalid username or password');
            }
        }
    )
});

$('#signup_btn').on('click', function (){
    const email = signup_email.val();
    const password = signup_password.val();

    if (!email){
        showToast('info', 'Please enter the email');
        return;
    }

    if (!password){
        showToast('info', 'Please enter the password');
        return;
    }

    const data = {
        email: email,
        password: password,
    }

    signup(
        data,
        function (res){
            const tokens = res.token.split(' : ');

            localStorage.setItem('accessToken', tokens[0]);
            localStorage.setItem('refreshToken', tokens[1]);

            const decoded = jwtDecode(tokens[0]);
            getEmployeeData(decoded.employeeId);

            $('#signup').css('display','none');
            $('.drawer').removeClass('hidden');
            $('#dashboard').css('display', 'block');
        },
        function (err){
            if (err.status === 403) {
                showToast('error', 'invalid username or password');
            }
        }
    )
})

$('#signup_link').on('click', function (){
    $('#login').css('display', 'none');
    $('#signup').css('display', 'block');
});

$('#login_link').on('click', function (){
    $('#login').css('display', 'block');
    $('#signup').css('display', 'none');
});