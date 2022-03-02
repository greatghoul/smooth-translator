Ractive({
  data: {
    settings: null
  },
  target: "#app",
  template: `
    {{#settings}}
      <Translator settings="{{settings}}" />
    {{/settings}}
  `,
  oninit () {
    chrome.runtime.sendMessage({ type: "get-settings" }, settings => this.set({ settings }))
  }
})
