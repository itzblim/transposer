let increaseButton = document.getElementById("increaseButton");
let decreaseButton = document.getElementById("decreaseButton");
let offsetButton = document.getElementById("offsetButton");
let resetButton = document.getElementById("resetButton");
let keySelector = document.getElementById("keySelector");

// Increase button listener
increaseButton.addEventListener("click", async () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'increase'},
            callback => {offsetButton.innerHTML = callback});
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
            callback => {offsetButton.innerHTML = callback});
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
          callback => {offsetButton.innerHTML = callback});
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
          this.value,
          {from: 'popup', subject: 'keySelect'},
          callback => {offsetButton.innerHTML = callback});
    });
});