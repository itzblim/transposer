// Sends messages from the background
function sendMessage(subject) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'background', subject: subject});
    });
  }

chrome.commands.onCommand.addListener((command) => {
    sendMessage(command);
});
