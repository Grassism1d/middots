chrome.storage.sync.get(
    function (result) {
        document.getElementById("storage").innerText = JSON.stringify(result, null, 2);
    });

document.getElementById("useragent").innerText = navigator.userAgent






