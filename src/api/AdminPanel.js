import {PANEL_URL} from "./apiUrls.js";
import {getValidatedToken} from "../util/validateToken.js";

export function getAdminPanelData(onSuccess, onError){
    getValidatedToken(
        function (accessToken){
            $.ajax({
                type: 'GET',
                url: PANEL_URL,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                success: function (data){
                    onSuccess(data);
                },
                error: function (err){
                    onError(err);
                }
            })
        },
        function (err){
            console.error(err)
        }
    );
}