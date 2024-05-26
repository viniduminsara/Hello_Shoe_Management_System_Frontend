import {CUSTOMER_URL, PANEL_URL} from "./apiUrls.js";

export function getAdminPanelData(onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: PANEL_URL,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        success: function (data){
            onSuccess(data);
        },
        error: function (err){
            onError(err);
        }
    })
}