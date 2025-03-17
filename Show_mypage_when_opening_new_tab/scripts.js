async function getSavedUrl() {
    console.log("getSavedUrl");
    let result = "";
    const defaults = {
      url: ""
    };

    result = (await chrome.storage.sync.get(defaults))["url"];
    console.log("getSavedUrl: " + result);
    return result;
}

async function onNewTab(tab) {
    console.log("onNewTab");
    const url = await getSavedUrl();
    console.log("onNewTab(url): " + url);
    console.dir(tab);
    let newTabUrl = "";
    if (tab.pendingUrl) {
        console.log("onNewTab(tab.pendingUrl): " + tab.pendingUrl);
        newTabUrl = tab.pendingUrl;
    } else {
        console.log("onNewTab(tab.url): " + tab.url);
        newTabUrl = tab.url;
    }
    if (url != "") {
        if ((newTabUrl == "edge://newtab/") || (newTabUrl == "chrome://newtab/")) {
            chrome.tabs.update(
                tab.id,
                { url: url},
            );
        }
    }
}

chrome.tabs.onCreated.addListener(onNewTab);

