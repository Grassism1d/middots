$(function(){
    $.switcher();
});

var btn = document.getElementById("mainBtn");
var domainBtn = document.getElementById("domainBtn");
var blText = document.getElementById("bl-text");

var hostname = function(a) {
    a = a.replace("www.", "");
    var b = a.indexOf("//") + 2;
    if (1 < b) {
        var c = a.indexOf("/", b);
        return 0 < c ? a.substring(b, c) : (c = a.indexOf("?", b), 0 < c ? a.substring(b, c) : a.substring(b))
    }
    return a
};

function disable() {
    $("#logo").attr("src", "img/popup-disabled.svg");
    $("body").css("background", "#747474");
}

function enable() {
    $("#logo").attr("src", "img/popup-enabled.svg");
    $("body").css("background", "#21232C");
}

$("#custom-color").change(function(e) {
    chrome.storage.local.get("status", function(result) {
        if (result.status == 1) {
            chrome.storage.local.set({"status": 0}, null);

            $(".custom-switch").toggleClass("day");
            $("body").toggleClass("day");
            disable();
        } else {
            chrome.storage.local.set({"status": 1}, null);
            $(".custom-switch").toggleClass("day");
            $("body").toggleClass("day");
            enable();
        }
    });
});

domainBtn.addEventListener("click", function() {
    chrome.storage.local.get(['blacklist'], function(result) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (result.blacklist === undefined) {
                chrome.storage.local.set({"blacklist": [hostname(tabs[0].url)]}, null);
                domainBtn.innerHTML = '<i class="fa fa-paw" aria-hidden="true"></i> <img class="claws" src="img/claws.png"> ' + chrome.i18n.getMessage("removeFromBlacklist");
                $("body").toggleClass("inBlocklist");
            
            } else {
                var blacklist = result.blacklist;
                if (blacklist.indexOf(hostname(tabs[0].url)) > -1) {
                    blacklist = blacklist.filter(function(value, index, arr) {
                        return value !== hostname(tabs[0].url);
                    });
                    chrome.storage.local.set({"blacklist": blacklist}, null);
                    domainBtn.innerHTML = '<i class="fa fa-paw" aria-hidden="true"></i> <img class="claws" src="img/claws.png"> ' + chrome.i18n.getMessage("addToBlacklist");
                    $("body").toggleClass("inBlocklist");
                } else {
                    blacklist.push(hostname(tabs[0].url));
                    chrome.storage.local.set({"blacklist": blacklist}, null);
                    domainBtn.innerHTML = '<i class="fa fa-paw" aria-hidden="true"></i> <img class="claws" src="img/claws.png"> ' + chrome.i18n.getMessage("removeFromBlacklist");
                    $("body").toggleClass("inBlocklist");
                }
            }
        });
    });
});


chrome.storage.local.get("status", function(result) {
    if (result.status == 1) {
        enable();
    } else {
        $(".custom-switch").toggleClass("day");
        $("body").toggleClass("day");
        $("#custom-color").prop("checked", false);

        disable();
    }
});

chrome.storage.local.get("tint", function(result) {
    if (result.tint == 1) {
        $("#yellow-checkbox").prop("checked", true);
    }
});

$("#yellow-checkbox").change(function(e) {
    if (e.target.checked === true) {
        chrome.storage.local.set({"tint": true}, null);
    } else {
        chrome.storage.local.set({"tint": false}, null);
    }
});


chrome.storage.local.get(['blacklist'], function(result) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (result.blacklist === undefined) {
            domainBtn.innerHTML = '<i class="fa fa-paw" aria-hidden="true"></i> <img class="claws" src="img/claws.png"> ' + chrome.i18n.getMessage("addToBlacklist");
        } else {
            var blacklist = result.blacklist;
            if (blacklist.indexOf(hostname(tabs[0].url)) > -1) {
                domainBtn.innerHTML = '<i class="fa fa-paw" aria-hidden="true"></i> <img class="claws" src="img/claws.png"> ' + chrome.i18n.getMessage("removeFromBlacklist");
                $("body").toggleClass("inBlocklist");
            } else {
                domainBtn.innerHTML = '<i class="fa fa-paw" aria-hidden="true"></i> <img class="claws" src="img/claws.png"> ' + chrome.i18n.getMessage("addToBlacklist");
            }
        }
    });
});