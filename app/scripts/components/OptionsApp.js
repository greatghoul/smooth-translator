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
    handleForceTranslateChange (context, checked) {
      this.fire("settingsChanged", "forceTranslate", checked)
    }
  },
  template: `
    <FieldSet legend="划词翻译结果显示时长">
      <TimeoutSlider
        value={{ settings.resultTimeout }}
        on-change="settingsChanged"
      />
    </FieldSet>

    <FieldSet legend="强制划词翻译">
      <Checkbox
        label="按住 Alt 键，在网页中选择文本，可以强制进行翻译"
        checked="{{settings.forceTranslate}}"
        on-change="handleForceTranslateChange"
      />
      <p class="hint"><strong>小技巧：</strong>你可以按住 Alt 键来选择超链接中的文本而不触发链接</p>
    </FieldSet>

    <FieldSet legend="启用/禁用页面划词翻译">
      <SiteRulesManager
        ruleMap="{{ settings.siteRules }}"
        on-change="settingsChanged"
      />
    </FieldSet>
  `,
  css: `
    .hint {
      color: #888;
      font-size: 0.9em;
      margin: 5px;
    }
  `
})
