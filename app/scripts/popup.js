Ractive({
  data: {
    settings: null,
    currentRule: null,
  },
  target: "#app",
  template: `
    {{#settings}}
      <Translator settings="{{settings}}" currentRule="{{currentRule}}" />
    {{/settings}}
  `,

  oninit () {
    chrome.runtime.sendMessage({ type: "get-settings" }, settings => this.set({ settings }))
    chrome.runtime.sendMessage({ type: "get-current-rule" }, currentRule => this.set({ currentRule }))
  }
})
