Ractive({
  target: "#app",
  template: `
    {{#settings}}
      <Translator settings={{ settings }} />
    {{/settings}}
  `,
  data: {
    settings: null,
  },
  oninit () {
    getSettings(settings => {
      this.set("settings", settings)
    })
  },
})
