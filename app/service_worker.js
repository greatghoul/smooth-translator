import { translate } from "/scripts/modules/translator.js"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Reiceived message: ", JSON.stringify(message))
  if (message.type === "translate") {
    translate(message.text).then(result => sendResponse(result))
  }

  return true
})
