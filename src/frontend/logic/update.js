// Variables to access elements of popup
const increaseButton = document.getElementById("increaseButton");
const decreaseButton = document.getElementById("decreaseButton");
const offsetButton = document.getElementById("offsetButton");
const resetButton = document.getElementById("resetButton");
const keySelector = document.getElementById("keySelector");

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

// Check if default option is shown
function isOptionShown() {
  return keySelector.options.length > 12;
}

// Show default option
function showOption() {
  if (!isOptionShown()) {
    const newOption = document.createElement('option');
    newOption.value = -1;
    newOption.innerHTML = 'Current key:';
    keySelector.addEventListener(newOption, 0);
  }
}

// Hide default option
function hideOption() {
  if (isOptionShown()) {
    keySelector.remove(0);
  }
}

// Updates the popup
function updatePopup() {
  sendMessage(
    'getTabInfo',
    'undefined',
    function(callback) {
      offsetButton.innerHTML = callback.offset > 0
      ? '+' + callback.offset
      : callback.offset;
      if (callback.keySelect == -1) {
        showOption();
      } else {
        hideOption();
      }
      keySelector.value = callback.keySelect;
    });
}