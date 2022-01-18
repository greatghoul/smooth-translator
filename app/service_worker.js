chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "translate") {
    translate(message.text).then(result => sendResponse(result))
  }

  return true
})
