// Content script runs on every webpage visited

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.from === 'popup') {
        if (msg.subject === 'increase') {
            increaseKey();
        } else if (msg.subject === 'decrease') {
            decreaseKey();
        } else if (msg.subject === 'reset') {
            resetKey();
        } else if (msg.subject === 'keySelect') {
            selectKey(msg.data);
        } else if (msg.subject === 'getTabInfo') {
            sendResponse({
                offset: offset,
                keySelect: keySelect
            });
        }
    }
});
