Ractive({
  target: "#app",
  template: '<Translator settings={{ settings }} loading={{ loading }} />',
  data: {
    settings: DEFAULT_SETTINGS,
    loading: true,
  },
  oninit () {
    chrome.storage.sync.get("settings", result => {
      this.set("settings", Object.assign(DEFAULT_SETTINGS, result.settings))
      this.set("loading", false)
    })
  },

    //   getActiveTab(tab => this.initRule(tab.hostname))
    // })
    // chrome.runtime.sendMessage({ type: 'current' }, current => {
    //   this.source = current
    //   setTimeout(this.focus, 300)
    // })
})