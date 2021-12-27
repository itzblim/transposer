// Content script runs on every webpage visited

// Reset offset to 0 for every new webpage visit
chrome.storage.sync.set({offset: 0}, function() {
    console.log('Offset is set to ' + 0);
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if (msg.from === 'popup') {
        if (msg.subject === 'increase') {
            replaceChords(1);
            response(offset);
        } else if (msg.subject === 'decrease') {
            replaceChords(-1);
            response(offset);
        } else if (msg.subject === 'reset') {
            replaceChords(-offset);
            response(offset);
        } else {
            response('unknown');
        }
    } else {
        response('unknown');
    }
});
