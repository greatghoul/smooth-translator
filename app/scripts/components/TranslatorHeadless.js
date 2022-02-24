const TranslatorHeadless = Ractive.extend({
  data () {
    return {
      resultTimeout: null,
      results: []
    }
  },
  on: {
    init () {
      const message = { type: "get-settings", keys: "resultTimeout" }
      chrome.runtime.sendMessage(message, data => this.set(data))
    },
    translate (context, source) {
      const results = this.get("results")
      if (!results.find(x => x.source === source)) {
        this.unshift("results", { source, translation: "正在翻译...", status: "pending" })
      }
    },
    closeResult (context) {
      const result = context.component.get("result")
      const index = this.get("results").findIndex(x => x.source === result.source)
      this.splice("results", index, 1)
    }
  },
  template: `
    <div translator-headless>
      {{#each results as result }}
        <ResultToast
          result={{ result }}
          resultTimeout={{ resultTimeout }}
          on-close="closeResult"
        />
      {{/each}}
    </div>
  `,
  css: `
    [translator-headless] {
      font-size: 14px;
      font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
      position: fixed;
      z-index: 2147483647;
      width: 250px;
      right: 15px;
      top: 35px;
      max-height: calc(100% - 40px);
      overflow: auto;
      padding-right: 5px;
    }

    [translator-headless]::-webkit-scrollbar {
      display: none;
      width: 0px;
    }
  `
})
