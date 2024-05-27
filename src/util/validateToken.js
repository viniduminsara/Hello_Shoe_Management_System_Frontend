import {jwtDecode} from "jwt-decode";
import {refresh} from "../api/Auth.js";
import {showToast} from "./toast.js";

export function getValidatedToken(onSuccess, onError) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken || refreshToken) {
        if (isTokenExpired(accessToken)) {
            refresh(
                refreshToken,
                function (res) {
                    const tokens = res.token.split(' : ');
                    localStorage.setItem('accessToken', tokens[0]);
                    localStorage.setItem('refreshToken', tokens[1]);
                    onSuccess(tokens[0]); // Call the callback with the new access token
                },
                function (err) {
                    console.error(err);
                    showToast('error', 'Please check your connection');
                    onError(err); // Call the callback with the error
                }
            );
        } else {
            onSuccess(accessToken); // Call the callback with the existing valid token
        }
    }
}

export function isTokenExpired(token) {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
}
