Ractive.components.ResultToast = Ractive.extend({
  data () {
    return {
      timer: null,
      result: {}
    }
  },
  startTimer () {
    const timer = setTimeout(() => this.fire("close"), 5000)
    this.set("timer", timer)
  },
  clearTimer () {
    const timer = this.get("timer")
    clearTimeout(timer)
    this.set("timer", null)
  },
  on: {
    init () {
      let result = this.get("result")
      chrome.runtime.sendMessage({ type: "translate", source: result.source, from: "page" }, html => {
        result = parseTranslatorResult(result.source, html)
        this.set({ result })
        this.startTimer()
      })
    },
    active () {
      this.clearTimer()
    },
    inactive () {
      this.startTimer()
    },
    close () {
      this.clearTimer()
    }
  },
  template: `
    {{#unless result.closed }}
      <div result-toast on-mouseover="active" on-mouseout="inactive">
        <a href="javascript:;" on-click="close">&times;</a>
        <Result result={{result}} showSource />
      </div>
    {{/unless}}
  `,
  css: `
    [result-toast] {
      display: block;
      max-width: 250px;
      min-width: 150px;
      line-height: 1.5;
      font-size: 14px;
      margin-bottom: 8px;
      box-shadow: 1px 1px 2px 0 #0000007a;
    }
  
    [result-toast] > a {  
      float: right;
      margin-right: 5px;
      color: #555;
      text-decoration: none;
      font-size: .8em;
    }

    [result-toast] a:hover {
      color: #000;
    }
  `
})
