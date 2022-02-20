import { translate } from "/scripts/modules/translator-client.js"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Reiceived message: ", JSON.stringify(message))
  if (message.type === "translate") {
    message.source && translate(message.source).then(sendResponse)
  }

  return true
})
