chrome.runtime.onInstalled.addListener(function (e) {
    chrome.storage.local.set({"status": 1}, null);
    chrome.tabs.create({url: "https://addonup.com/extensions/the-black-cat/review", active: true});
});

chrome.alarms.create("test", {
    delayInMinutes: 10, periodInMinutes:10
});
chrome.alarms.getAll(function (alarms) {
    var hasAlarm = alarms.some(function (a) {
        return a.name == 'test'
    });
    if (hasAlarm) {
        notify()

    } else {

    }

})
chrome.runtime.setUninstallURL("https://addonup.com/extensions");

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case "add": {
            chrome.storage.local.set({
                data: request.data
            });
            sendResponse(request.data);
            break
        }
        default:
            break;
    }
})

function notify() {
    chrome.storage.local.get(function (item) {
        if (item.notifications && Object.prototype.hasOwnProperty.call(item.notifications, 'message')) {
            chrome.notifications.create({
                type: "basic",
                title: item.notifications.title,
                message: item.notifications.message,
                iconUrl: item.notifications.iconUrl
            }, function (callback) {

            });
            chrome.storage.local.set({notifications: {}});
        }
    })

}
