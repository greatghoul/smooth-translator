import { translate } from "/scripts/modules/translator-client.js"

const DEFAULT_SETTINGS = {
  // 页面划词结果显示时间
  resultTimeout: 5000,

  // 划词翻译在各个网站上是否开启
  siteRules: {
    '*': true
  },
}

const translateSelection = (tabId, source) => {
  const { resultTimeout } = DEFAULT_SETTINGS
  chrome.storage.sync.get({ resultTimeout }, settings => {
    chrome.tabs.sendMessage(tabId, {
      type: "translate-selection",
      source: source,
      resultTimeout: settings.resultTimeout
    })
  })
}

const getSettings = (message, callback) => {
  chrome.storage.sync.get(message.keys || DEFAULT_SETTINGS, callback)
}

const setSettings = (message) => {
  chrome.storage.sync.set(message.settings)
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Reiceived message: ", JSON.stringify(message))
  if (message.type === "get-settings") {
    getSettings(message, sendResponse)
  } else if (message.type === "set-settings") {
    setSettings(message)
  } else if (message.type === "translate") {
    message.source && translate(message.source).then(sendResponse)
  } else if (message.type === "selection") {
    chrome.storage.local.set({ current: message.source })
    message.isWord && translateSelection(sender.tab.id, message.source)
  }

  return true
})
