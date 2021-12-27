let increaseButton = document.getElementById("increaseButton");
let decreaseButton = document.getElementById("decreaseButton");
let offsetButton = document.getElementById("offsetButton");
let resetButton = document.getElementById("resetButton");
let keySelector = document.getElementById("keySelector");

function updatePopup() {
  chrome.storage.sync.get(['offset'], function(result) {
    offsetButton.innerHTML = result.offset;
  });
  chrome.storage.sync.get(['keySelect'], function(result) {
    keySelector.value = result.keySelect;
  });
}

// Update popup whenever reopened
updatePopup();

// Increase button listener
increaseButton.addEventListener("click", async () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'increase'},
            callback => {});
      });
});

// Decrease button listener
decreaseButton.addEventListener("click", async () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'decrease'},
            callback => {});
      });
});

// Reset button listener
resetButton.addEventListener("click", async () => {
  chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup', subject: 'reset'},
          callback => {});
    });
});

// Key selector listener
keySelector.addEventListener("change", async () => {
  chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup', subject: 'keySelect', key: parseInt(keySelector.value)},
          callback => {});
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  updatePopup();
  sendResponse({
      data: "Popup updated"
  }); 
});
