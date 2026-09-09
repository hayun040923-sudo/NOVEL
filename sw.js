self.addEventListener("install", (event) => {
    console.log("NOVEL Service Worker 설치 완료");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("NOVEL Service Worker 활성화 완료");
    event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
    let data = {};

    try {
        data = event.data ? event.data.json() : {};
    } catch (error) {
        data = {
            title: "NOVEL",
            body: event.data ? event.data.text() : "새로운 알림이 있습니다."
        };
    }

    const title = data.title || "NOVEL";

    const options = {
        body: data.body || "새로운 알림이 있습니다.",
        icon: data.icon || "favicon.ico",
        badge: data.badge || "favicon.ico",
        data: {
            url: data.url || "/"
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const url = event.notification.data?.url || "/";

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clientList) => {
            for (const client of clientList) {
                if ("focus" in client) {
                    client.navigate(url);
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});