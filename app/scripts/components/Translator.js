Ractive.components.Translator = Ractive.extend({
  data () {
    return {
      settings: null,
      hostname: null,
      hostopen: null,
      source: "",
      result: null,
    }
  },
  loadCurrent () {
    chrome.storage.local.get({ current: "" }, ({ current }) => {
      this.set({ source: current })
      this.handleTranslate()
    })
  },
  loadRule () {
    const hostname = this.get("hostname")
    if (!hostname) return

    const siteRules = this.get("settings.siteRules")
    if (hostname in siteRules) {
      this.set("hostopen", siteRules[hostname])
    } else {
      this.set("hostopen", siteRules["*"])
    }
  },
  handleTranslate () {
    const source = strip(this.get("source"))
    this.set("loading", true)
    chrome.runtime.sendMessage({ type: "translate", from: "popup", source: source }, html => {
      const result = parseTranslatorResult(source, html)
      this.set({ result, loading: false })
    })
  },
  on: {
    init () {
      this.loadCurrent()
      this.loadRule()
    },
    settingClicked () {
      chrome.runtime.openOptionsPage()
    },
    sourceChanged (context) {
      if (context.event.key !== "Enter") return

      context.event.preventDefault()
      
      chrome.runtime.sendMessage({ type: 'selection', source: this.get("source") })
      this.handleTranslate()      
    },
    toggleSiteRule () {
      const settings = this.get("settings")
      const hostname = this.get("hostname")
      const hostopen = this.get("hostopen")

      settings.siteRules[hostname] = hostopen
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
        on-keypress="sourceChanged"
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
      
      {{#hostname}}
        <label class-enabled="hostopen" title="在 {{ hostname }} 启用划词翻译">
          <input type="checkbox" checked="{{ hostopen }}" on-change="toggleSiteRule" />
          {{ hostname }}
        </label>
      {{/hostname}}
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
