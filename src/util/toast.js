export function showToast(type, message) {
    const toast = $('#toast');

    if (type) {
        const successAlert = `
                <div role="alert" class="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>${message}</span>
                </div>
            `;
        const errorAlert = `
                <div role="alert" class="alert alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>${message}</span>
                </div>
            `;
        const infoAlert = `
                <div role="alert" class="alert alert-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>${message}</span>
                </div>
            `;

        if (type === 'success'){
            toast.html(successAlert);
        }else if (type === 'error'){
            toast.html(errorAlert);
        }else if (type === 'info'){
            toast.html(infoAlert);
        }
        toast.removeClass('hidden');

        // Hide the toast after timeout milliseconds
        setTimeout(() => {
            toast.addClass('hidden');
        }, 3000);
    }
}