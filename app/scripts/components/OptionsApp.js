Ractive.components.OptionsApp = Ractive.extend({
  data () {
    return {
      settings: {}
    }
  },
  on: {
    init () {
      chrome.runtime.sendMessage({ type: "get-settings" }, settings => this.set({ settings }))
    },
    settingsChanged (context, fieldName, fieldValue) {
      const settings = this.get("settings")
      const updatedSettings = { ...settings, [fieldName]: fieldValue }
      this.set("settings", updatedSettings)
      chrome.runtime.sendMessage({ type: "set-settings", settings: updatedSettings })
    },
  },
  computed: {
    settingsText () {
      return JSON.stringify(this.get("settings"))
    }
  },
  template: `
    <div class="board">
      <div class="board-header">
        <strong class="title">
          <img src="/images/icon-128.png" width="36" height="36" /> 偏好设定
        </strong>
      </div>

      <div class="board-content">
        <form class="form-horizontal" role="form">
          <FormGroup label="划词翻译结果显示时长">
            <TimeoutSlider
              value={{ settings.resultTimeout }}
              on-change="settingsChanged"
            />
          </FormGroup>
        </form>
      </div>

      <pre>{{ settingsText }}</pre>
    </div>
  `,
  css: `
    .board {
      width: 65%;
      min-width: 800px;
      margin: 60px auto;
      background: #fff;
    }
    .board .board-header {
      background: #fafafa url('../../images/bg.png');
      background-size: 30%;
      border-bottom: 1px solid #eee;
      padding: 10px 30px;
    }
    .board .board-header .title {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 30px;
      line-height: 48px;
      display: inline-block;
    }
    .board .board-header img {
      vertical-align: middle;
    }
    .board-content {
      padding: 30px;
    }
  
  `
})
