let increaseButton = document.getElementById("increaseButton");
let decreaseButton = document.getElementById("decreaseButton");
let offsetButton = document.getElementById("offsetButton");
let resetButton = document.getElementById("resetButton");
let keySelector = document.getElementById("keySelector");

// Updates the popup
function updatePopup() {
  sendMessage(
    'getTabInfo',
    'undefined',
    function(callback) {
      offsetButton.innerHTML = callback.offset > 0
      ? '+' + callback.offset
      : callback.offset;
      keySelector.value = callback.keySelect;
    });
}

// Sends messages from the popup
function sendMessage(subject, data = 'undefined',callbackFunction = callback => {updatePopup();}) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: subject, data: data},
        callbackFunction);
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

// Update listener
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.subject == 'removeDefaultSelector') {
    keySelector.remove(0);
  }
});

// Update popup whenever reopened
updatePopup();