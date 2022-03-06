import { translate } from "/scripts/modules/translator-client.js"

const DEFAULT_SETTINGS = {
  // 页面划词结果显示时间
  resultTimeout: 5000,

  // 强制划词翻译
  forceTranslate: true,

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

const getSettings = (keys, callback) => {
  chrome.storage.sync.get(keys || DEFAULT_SETTINGS, callback)
}

const setSettings = settings => {
  chrome.storage.sync.set(settings)
}

const getHostname = url => {
  const { hostname, protocol } = new URL(url)
  if (/^https?:$/.test(protocol)) {
    return hostname
  } else {
    return null
  }
}

const getCurrentRule = callback => {
  getSettings(null, ({ siteRules }) => {
    chrome.tabs.query({ active: true }, tabs => {
      const hostname = getHostname(tabs[0].url)
      if (!hostname) {
        callback(null)
        return
      }

      if (hostname in siteRules) {
        callback({ site: hostname, enabled: siteRules[hostname] })
      } else {
        callback({ site: hostname, enabled: siteRules["*"] })
      }
    })
  }) 
}

const setCurrentSource = source => {
  chrome.storage.local.set({ currentSource: source })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Reiceived message: ", JSON.stringify(message))
  if (message.type === "get-settings") {
    getSettings(message.keys, sendResponse)
  } else if (message.type === "set-settings") {
    setSettings(message.settings)
  } else if (message.type === "translate") {
    message.source && translate(message.source).then(sendResponse)
  } else if (message.type === "selection") {
    setCurrentSource(message.source)
    getCurrentRule(siteRule => {
      if (message.force || (siteRule && siteRule.enabled && message.isWord)) {
        translateSelection(sender.tab.id, message.source)
      }
    })
  } else if (message.type === "set-current-source") {
    setCurrentSource(message.source)
  } else if (message.type === "get-current-rule") {
    getCurrentRule(siteRule => sendResponse(siteRule))
  }

  return true
})
