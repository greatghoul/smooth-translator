const DEFAULT_SETTINGS = {
  // 页面划词结果显示时间
  notifyTimeout: 5,

  // 划词翻译在各个网站上是否开启
  siteRules: {
    '*': true
  },
}

const textStripe = text => {
  return (text || "").replace(/(^\s+|\s+$)/, "")
}

const openExtensionPage = filename => {
  const url = chrome.extension.getURL(filename)

  chrome.tabs.query({}, function(tabs) {
    var tab = tabs.find(tab => tab.url === url)

    if (tab) {
      chrome.tabs.reload(tab.id)
      chrome.tabs.update(tab.id, { highlighted: true })
    } else {
      chrome.tabs.create({ url: url })
    }
  })
}

const dispatchMessage = mapping => {
  chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      const handler = mapping[message.type]
      if (typeof handler === "function") {
        handler(message, sender, sendResponse)
      }

      return true
    }
  )
}

const getSettings = (key, callback) => {
  chrome.storage.sync.get("settings", result => {
    callback(Object.assign(DEFAULT_SETTINGS, result["settings"]))
  })
}
