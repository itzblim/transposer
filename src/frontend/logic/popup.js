let increaseButton = document.getElementById("increaseButton");
let decreaseButton = document.getElementById("decreaseButton");

// Increase button listener
increaseButton.addEventListener("click", async () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: 'increase'},
            callback => {console.log('popup -> content, increase. callback: ' + callback)});
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
            callback => {console.log('popup -> content, decrease. callback: ' + callback)});
      });
});
