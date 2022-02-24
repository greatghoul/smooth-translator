Ractive.components.Translator = Ractive.extend({
  data () {
    return {
      settings: {},
      source: "",
      result: null,  
    }
  },
  on: {
    init () {
      chrome.runtime.sendMessage({ type: "get-settings" }, settings => this.set({ settings }))
      chrome.storage.local.get({ current: "" }, ({ current }) => {
        this.set({ source: current })
        this.handleTranslate()
      })
    },
    settingClicked () {
      chrome.runtime.openOptionsPage()
    },
    sourceChanged (context) {
      if (context.event.key !== "Enter") return

      context.event.preventDefault()
      
      chrome.runtime.sendMessage({ type: 'selection', source: this.get("source") })
      this.handleTranslate()      
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
        <Result result="{{ result }}" theme="light" />
      {{/result}} 
    </main>

    <footer>
      <a href="#" title="偏好设定" class="btn-settings" on-click="settingClicked">
        <SettingsIcon />
      </a>
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
    }

    footer .btn-settings {
      float: right;
    }

    footer label {
      font-size: 0.9em;
      color: gray;
      user-select: none;
    }

    footer label.enabled {
      color: green;
    }

    footer label input[type="checkbox] {
      margin: 0;
    }
    
    footer label .site {
      font-style: italic;
      font-weight: bold;
      font-size: .9em;
      display: inline-block;
      vertical-align: bottom;
      max-width: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `
})
