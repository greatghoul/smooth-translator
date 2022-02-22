Ractive.components.ResultToast = Ractive.extend({
  data () {
    return {
      timer: null,
      result: {}
    }
  },
  oninit () {
    this.handleTranslate()
  },
  handleClose () {
    this.clearTimer()

    const result = this.get("result")
    // result.closed = true
    this.set({ result })
  },
  startTimer () {
    const timer = setTimeout(() => {
      this.handleClose()
    }, 5000)
  },
  clearTimer () {
    const timer = this.get("timer")
    clearTimeout(timer)
  },
  handleTranslate () {
    let result = this.get("result")
    chrome.runtime.sendMessage({ type: "translate", source: result.source, from: "page" }, html => {
      result = parseTranslatorResult(result.source, html)
      this.set({ result })
      this.startTimer()
    })
  },
  on: {
    mouseOver () {
      this.clearTimer()
    },
    mouseOut () {
      this.startTimer()
    },
    closeClicked () {
      this.handleClose()
    }
  },
  template: `
    {{#unless result.closed }}
      <div result-toast on-mouseover="mouseOver" on-mouseout="mouseOut">
        <a href="javascript:;" on-click="closeClicked">&times;</a>
        <Result result={{result}} />
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
