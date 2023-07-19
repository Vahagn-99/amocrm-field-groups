export function oauthModal(url) {
    return new Promise((resolve, reject) => {
        const win = window.open(url, '_blank', 'width=800,height=600')
        window.addEventListener('message', function (event) {
            if (event.origin !== "https://widgets-api.dicitech.com")
                return;
            if (event.data === "closed") {
                resolve();
            }
        }, false);
    })
}

export function goTo(href, data = []) {
    window.location.href = href;
}