Ractive.components.Translator = Ractive.extend({
  data: {
    source: "",
    result: null,
  },
  on: {
    handleSettings () {
      openExtensionPage("pages/options.html")
    },
    handleTranslate (context) {
      if (context.event.key === "Enter") {
        console.log("Searching", this.get("source"))
        context.event.preventDefault()
      }
    }
  },
  template: `
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

/*
        <label :class="{ enabled: rule.enabled }" v-if="rule">
          <input type="checkbox" checked="rule.enabled"
                  @change="saveRule(rule)" />
          在 <span class="site" :title="rule.site">{{ rule.site }}</span> 启用划词翻译
        </label>

<script>
import _ from 'lodash'
import URL from 'url-parse'
import OptionsLoader from '../mixins/options-loader'
import Loader from './Loader.vue'
import Result from './Result.vue'
import { openExtensionPage } from '../helpers/utils'
import { getActiveTab } from '../helpers/tabs'

export default {
  mixins: [OptionsLoader],
  created() {
    this.initOptions().then(() => {
      getActiveTab(tab => this.initRule(tab.hostname))
    })
    chrome.runtime.sendMessage({ type: 'current' }, current => {
      this.source = current
      setTimeout(this.focus, 300)
    })
  },
  computed: {
    translation() {
      return this.result.translation || '未找到释义'
    }
  },
  methods: {
    initRule(site) {
      const rule = { site }
      if (site in this.options.siteRules) {
        rule.enabled = this.options.siteRules[site]
      } else {
        rule.enabled = this.options.siteRules['*']
      }
      this.rule = rule;
    },
    focus() {
      this.$nextTick(() => this.$refs.source.select())
    },
    escape() {
      if (this.source) {
        this.reset()
      } else {
        this.exit()
      }
    },
    reset() {
      this.source = ''
      this.result = null
    },
    exit() {
      window.close()
    },
    settings() {
      openExtensionPage('pages/options.html')
      this.exit()
    },
    translate: _.debounce(function() {
      const message = {
        type: 'translate',
        text: this.source,
        from: 'popup'
      }

      this.loading = true
      chrome.runtime.sendMessage(message, (result) => {
        this.result = result
        this.loading = false
      })
    }, 300),
  },
  watch: {
    source() {
      if (this.source) {
        this.translate()
      } else {
        this.reset()
      }
    },
  },
  components: {
    Loader,
    Result
  },
}
</script>
*/