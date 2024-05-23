import {AUTH_URL} from "./apiUrls.js";

export function signin(data, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: `${AUTH_URL}/signin`,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            onSuccess(res);
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function signup(data, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: `${AUTH_URL}/signup`,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            onSuccess(res);
        },
        error: function (err) {
            onError(err);
        }
    })
}

export function refresh(refreshToken, onSuccess, onError){
    $.ajax({
        type: 'POST',
        url: `${AUTH_URL}/refresh?refreshToken=${refreshToken}`,
        success: function (res) {
            onSuccess(res);
        },
        error: function (err) {
            onError(err);
        }
    })
}