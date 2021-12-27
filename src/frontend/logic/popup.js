let increaseButton = document.getElementById("increaseButton");
let decreaseButton = document.getElementById("decreaseButton");
let offsetButton = document.getElementById("offsetButton");
let resetButton = document.getElementById("resetButton");
let keySelector = document.getElementById("keySelector");

function updatePopup() {
  chrome.storage.sync.get(['offset'], function(result) {
    offsetButton.innerHTML = result.offset > 0
      ? '+' + result.offset
      : result.offset;
  });
  chrome.storage.sync.get(['keySelect'], function(result) {
    keySelector.value = result.keySelect;
  });
}

function sendMessage(subject, key = 'undefined') {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: subject, key: key},
        callback => {});
  });
}

// Increase button listener
increaseButton.addEventListener("click", async () => {
    sendMessage('increase');
});

// Decrease button listener
decreaseButton.addEventListener("click", async () => {
  sendMessage('decrease');
});

// Reset button listener
resetButton.addEventListener("click", async () => {
  sendMessage('reset');
});

// Key selector listener
keySelector.addEventListener("change", async () => {
  sendMessage('keySelect', parseInt(keySelector.value));
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.subject == 'update') {
    updatePopup();
    sendResponse({
      subject: "Popup updated"
    }); 
  } else if (message.subject == 'removeDefaultSelector') {
    keySelector.remove(0);
  }
});

// Update popup whenever reopened
updatePopup();