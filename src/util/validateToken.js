import {jwtDecode} from "jwt-decode";
import {refresh} from "../api/Auth.js";
import {showToast} from "./toast.js";

export function getValidatedToken(){
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken || refreshToken) {
        if (isTokenExpired(accessToken)) {
            refresh(
                refreshToken,
                function (res){
                    const tokens = res.token.split(' : ');
                    localStorage.setItem('accessToken', tokens[0]);
                    localStorage.setItem('refreshToken', tokens[1]);
                    return tokens[0];
                },
                function (err){
                    console.error(err);
                    showToast('error', 'Please check your connection');
                }
            )
        } else {
            return accessToken;
        }
    }
}

export function isTokenExpired(token) {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
}