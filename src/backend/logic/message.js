// Send a message from the content script to the popup script
function sendMessage(subject) {
    chrome.runtime.sendMessage({
        from: 'content',
        subject: subject,
    });
}

function requestPopupUpdate() {
    sendMessage('updatePopup');
}
