new Ractive({
  data: {
    settings: null,
  },
  target: "#app",
  template: `
    {{#settings}}
      <OptionsApp settings="{{ settings }}" />
    {{/settings}}
  `,
  oninit () {
    chrome.runtime.sendMessage({ type: "get-settings" }, settings => this.set({ settings }))
  }
})
