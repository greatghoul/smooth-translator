import Ractive from "/scripts/libs/ractive.mjs"

import Loader from "/scripts/components/Loader.js"
import Result from "/scripts/components/Result.js"
import SettingsIcon from "/scripts/components/SettingsIcon.js"

import { openExtensionPage } from "/scripts/modules/extension.js"
import { parseDictResult } from "/scripts/modules/translator-parser.js"
import { strip, isWord } from "/scripts/modules/text.js"

export default Ractive.extend({
  components: {
    Loader,
    Result,
    SettingsIcon,
  },
  data: {
    settings: null,
    source: "",
    result: null,
  },
  on: {
    handleSettings () {
      openExtensionPage("pages/options.html")
    },
    handleTranslate (context) {
      if (context.event.key !== "Enter") return
      context.event.preventDefault()

      const source = strip(this.get("source"))
      this.set("loading", true)
      chrome.runtime.sendMessage({
        type: "translate",
        from: "popup",
        isWord: isWord(source),
        source: source,
      }, html => {
        const result = parseDictResult(source, html)
        this.set({ result, loading: false })
      })
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
        on-keypress="handleTranslate"
      ></textarea>
    </header>

    <main>
      {{#result}}
        <Result result="{{ result }}" theme="light" />
      {{/result}} 
    </main>

    <footer>
      <a href="#" title="偏好设定" class="btn-settings" on-click="handleSettings">
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
