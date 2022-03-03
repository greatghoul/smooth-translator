Ractive.components.Translator = Ractive.extend({
  data () {
    return {
      settings: null,
      currentRule: null,
      source: "",
      result: null,
    }
  },
  loadCurrentSource () {
    chrome.storage.local.get({ currentSource: "" }, ({ currentSource }) => {
      this.set({ source: currentSource })
      this.handleTranslate()
    })
  },
  handleTranslate () {
    const source = strip(this.get("source"))
    this.set("loading", true)
    chrome.runtime.sendMessage({ type: "translate", from: "popup", source: source }, html => {
      const result = parseTranslatorResult(source, html)
      this.set({ result, loading: false })
    })
  },
  setCurrentSource (source) {
    chrome.runtime.sendMessage({ type: "set-current-source", source: source })
  },
  on: {
    init () {
      this.loadCurrentSource()
    },
    settingClicked () {
      chrome.runtime.openOptionsPage()
    },
    sourceChanged (context) {
      const event = context.event
      const source = strip(this.get("source"))

      // clear textarea on pressing escape key
      if (event.key === "Escape" && source) {
        event.preventDefault()
        this.set({ source: "" })
        this.setCurrentSource("")
        return
      }

      // accept line break on pressing shift + enter
      if (event.key === "Enter" && event.shiftKey) {
        return
      }

      // submit translation on pressing enter
      if (event.key === "Enter") {
        event.preventDefault()
        this.setCurrentSource(source)
        this.handleTranslate()  
      }
    },
    toggleCurrentRule () {
      const settings = this.get("settings")
      const currentRule = this.get("currentRule")

      settings.siteRules[currentRule.site] = currentRule.enabled
      this.set({ settings })

      chrome.runtime.sendMessage({ type: "set-settings", settings: settings })
    }
  },
  template: `
    {{#loading}}
      <Loader />
    {{/loading}}
    
    <header>
      <textarea
        autofocus
        placeholder="输入文字进行翻译 ..."
        rows="3"
        value="{{ source }}"
        on-keydown="sourceChanged"
      ></textarea>
    </header>

    <main>
      {{#result}}
        <Result result="{{ result }}" compact />
      {{/result}}
    </main>

    <footer>
      <a href="#" title="偏好设定" class="btn-settings" on-click="settingClicked">
        <SettingsIcon />
      </a>
      
      {{#if currentRule}}
        <label class-enabled="currentRule.enabled" title="在 {{ currentRule.site }} 启用划词翻译">
          <input type="checkbox" checked="{{ currentRule.enabled }}" on-change="toggleCurrentRule" />
          {{ currentRule.site }}
        </label>
      {{/if}}
    </footer>
  `,
  css: `
    header {
      padding: 5px 5px 2px 5px;;
    }

    header textarea {
      -webkit-appearance: textfield;
      border: 1px inset #e0e0e0;
      background-color: #fefbf5;
      resize: none;
      font-size: 12px;
      line-height: 1.2em;
      color: #888;
      width: 100%;
      margin: 0;
      font-weight: bold;
      box-sizing: border-box;
    }

    header textarea:active,
    header textarea:focus {
      outline: none;
      background-color: #ffffd4;
    }
    
    main {
      padding: 0px 5px !important;
    }
    
    footer {
      height: 24px;
      line-height: 24px;
      padding: 0 5px;
      margin-top: 5px;
    }

    footer .btn-settings {
      float: right;
    }

    footer label {
      display: block;
      margin-right: 30px;
      color: gray;
      user-select: none;
      font-style: italic;
      font-weight: 400;
      font-size: 0.9em;
      vertical-align: bottom;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    footer label.enabled {
      color: green;
    }

    footer label input {
      vertical-align: text-top;
    }
  `
})
