import {PANEL_URL} from "./apiUrls.js";
import {getValidatedToken} from "../util/validateToken.js";

export function getAdminPanelData(onSuccess, onError){
    $.ajax({
        type: 'GET',
        url: PANEL_URL,
        headers: {
            'Authorization': `Bearer ${getValidatedToken()}`
        },
        success: function (data){
            onSuccess(data);
        },
        error: function (err){
            onError(err);
        }
    })
}