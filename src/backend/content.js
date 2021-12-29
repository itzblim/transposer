// Content script runs on every webpage visited

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.from === 'popup') {
        if (msg.subject === 'increase') {
            increaseKey();
        } else if (msg.subject === 'decrease') {
            decreaseKey();
        } else if (msg.subject === 'reset') {
            resetKey();
        } else if (msg.subject === 'keySelect') {
            selectKey(msg.key);
        }
    }
});

// Listens for updates to storage and tells popup to update itself
chrome.storage.onChanged.addListener(function (changes, namespace) {
    chrome.runtime.sendMessage({
        subject: 'update'
    }, function (response) {
        console.log(response.subject);
    });
});
