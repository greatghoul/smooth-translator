import { translate } from "/scripts/modules/translator-client.js"

const setCurrent = current => {
  chrome.storage.sync.set({ current })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Reiceived message: ", JSON.stringify(message))
  if (message.type === "translate") {
    message.source && translate(message.source).then(sendResponse)
  } else if (message.type === "selection") {
    setCurrent(message.source)
    if (message.isWord) {
      chrome.tabs.sendMessage(sender.tab.id, { type: "translate-selection", source: message.source })
    }
  }

  return true
})
