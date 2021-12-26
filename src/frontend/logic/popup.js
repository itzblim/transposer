let increaseButton = document.getElementById("increaseButton");
let decreaseButton = document.getElementById("decreaseButton");
let offsetButton = document.getElementById("offsetButton");

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
