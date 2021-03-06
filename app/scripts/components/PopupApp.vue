<template>
  <div id="app" v-cloak>
    <loader v-if="loading" />
    <div class="translator">
      <section class="input-box">
        <textarea
          autofocus
          placeholder="输入文字进行翻译 ..."
          rows="3"
          ref="source"
          v-model.trim="source"
          @keydown.esc.prevent.stop="escape"
          @keydown.enter="translate"></textarea>
      </section>

      <div class="result-wrapper">
        <result :result="result" theme="light" v-if="result"></result>
      </div>

      <footer>
        <a href="#" title="偏好设定" class="btn-settings" @click="settings">
          <icon name="cog" />
        </a>

        <label :class="{ enabled: rule.enabled }" v-if="rule">
          <input type="checkbox"
                 v-model="rule.enabled"
                 @change="saveRule(rule)" />
          在 <span class="site" :title="rule.site">{{ rule.site }}</span> 启用划词翻译
        </label>
      </footer>
    </div>
  </div>
</template>

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
  data() {
    return {
      source: '',
      result: null,
      loading: false,
      rule: null
    }
  },
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
