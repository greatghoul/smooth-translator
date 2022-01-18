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

export const getSettings = (callback) => {
  chrome.storage.sync.get(null, settings => {
    callback(Object.assign(DEFAULT_SETTINGS, settings))
  })
}

const waitUntil = (escapeFn, options = {}) => {
  const { timeout, interval } = Object.assign({ timeout: 3000, interval: 10 }, options)

  return Promise.new((resolve, reject) => {
    let timeoutTimer, intervalTimer

    const clearTimeouts = () => {
      timeoutTimer && clearTimeout(timeoutTimer)
      intervalTimer && clearTimeout(intervalTimer)
    }
    
    intervalTimer = setInterval(() => {
      try {
        const escapeResult = escapeFn()
        if (escapeResult) {
          clearTimeouts()
          resolve()
        }
      } catch (e) {
        clearTimeouts()
        reject(`Failed calling escape function. ${e}`)
      }
    }, interval)

    timeoutTimer = setTimeout(() => {
      clearTimeouts()
      reject(`wait timeout after ${timeout} seconds`)
    }, timeout)
  })
}