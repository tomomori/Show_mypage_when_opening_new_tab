async function getSavedUrl() {
    console.log("getSavedUrl");
    var result = "";
    var defaults = {
      url: ""
    };

    result = (await chrome.storage.sync.get(defaults))["url"];
    console.log("getSavedUrl: " + result);
    return result;
}

async function showOption() {
    console.log('showOption');
    let input = document.getElementById("url");
    input.value = await getSavedUrl();
}

function onBtnGooglClick(e) {
    let input = document.getElementById("url");
    input.value = "https://www.google.com/";
}

function onBtnBlankClick(e) {
    let input = document.getElementById("url");
    input.value = "";
}

function onBtnSaveClick(e) {
    console.log("onBtnSaveClick");
    let input = document.getElementById("url");
    console.log("input.value:" + input.value);
    let options = {
      url: input.value
    };
    chrome.storage.sync.set(options, function(){});
    window.close();
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
    document.getElementById('btnGoogle').addEventListener('click', onBtnGooglClick);
    document.getElementById('btnBlank').addEventListener('click', onBtnBlankClick);
    document.getElementById('btnSave').addEventListener('click', onBtnSaveClick);
    showOption();
});
