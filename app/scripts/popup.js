const template = `
  {{#if loading}}
    <Loader />
  {{else}}
    <Translator />
  {{/if}}  
`
Ractive({
  target: "#app",
  template: template,
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