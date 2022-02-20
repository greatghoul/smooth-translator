const DEFAULT_SETTINGS = {
  // 最后一次查询的内容
  current: "",

  // 页面划词结果显示时间
  notifyTimeout: 5,

  // 划词翻译在各个网站上是否开启
  siteRules: {
    '*': true
  },
}


const getSettings = (callback) => {
  chrome.storage.sync.get(null, settings => {
    callback(Object.assign(DEFAULT_SETTINGS, settings))
  })
}
