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

// Update popup whenever opened
updatePopup();