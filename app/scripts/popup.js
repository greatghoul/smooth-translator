Ractive({
  data: {
    settings: null,
    hostname: null,
  },
  target: "#app",
  template: `
    {{#settings}}
      <Translator settings="{{settings}}" hostname="{{hostname}}" />
    {{/settings}}
  `,
  getHostname (url) {
    const { hostname, protocol } = new URL(url)
    if (/^https?:$/.test(protocol)) {
      return hostname
    } else {
      return null
    }
  },
  oninit () {
    chrome.runtime.sendMessage({ type: "get-settings" }, settings => {
      chrome.tabs.query({ active: true }, tabs => {
        const hostname = this.getHostname(tabs[0].url)
        this.set({ settings, hostname })
      })
    })
    
  }
})
