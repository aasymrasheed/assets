class AjaxHelper {
    static async request(url, data = {}, method = 'POST', headers = {}) {
        try {
            // Set default headers
            const defaultHeaders = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json',
                ...headers
            };

            const config = {
                method: method,
                headers: defaultHeaders,
                body: method !== 'GET' ? JSON.stringify(data) : null
            };

            if (method === 'GET' && Object.keys(data).length > 0) {
                const params = new URLSearchParams(data).toString();
                url += '?' + params;
            }

            const response = await fetch(url, config);
            const result = await response.json();

            return {
                success: response.ok,
                status: response.status,
                data: result,
                response: response
            };

        } catch (error) {
            return {
                success: false,
                status: 0,
                data: null,
                error: error.message
            };
        }
    }

    static showToast(message, type = 'info') {
        if (typeof toastr !== 'undefined') {
            toastr[type](message);
        } else {
            alert(`${type.toUpperCase()}: ${message}`);
        }
    }
}