Ractive.components.OptionsApp = Ractive.extend({
  data () {
    return {
      settings: null
    }
  },
  on: {
    settingsChanged (context, fieldName, fieldValue) {
      const settings = this.get("settings")
      const updatedSettings = { ...settings, [fieldName]: fieldValue }
      this.set("settings", updatedSettings)
      chrome.runtime.sendMessage({ type: "set-settings", settings: updatedSettings })
    },
  },
  template: `
    <FieldSet legend="划词翻译结果显示时长">
      <TimeoutSlider
        value={{ settings.resultTimeout }}
        on-change="settingsChanged"
      />
    </FieldSet>

    <FieldSet legend="启用/禁用页面划词翻译">
      <SiteRulesManager
        ruleMap="{{ settings.siteRules }}"
        on-change="settingsChanged"
      />
    </FieldSet>
  `
})
