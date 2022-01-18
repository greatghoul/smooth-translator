import Ractive from "/scripts/libs/ractive.mjs"

import Translator from "/scripts//components/Translator.js"

import { getSettings } from "/scripts/modules/settings.js"

Ractive({
  components: {
    Translator,
  },
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