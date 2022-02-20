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
    result.closed = true
    this.set({ result })

    this.detach()
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
    <ractive on-mouseover="mouseOver" on-mouseout="mouseOut">
      <a href="javascript:;" class="close" on-click="closeClicked">&times;</a>
      <Result result={{result}} theme="dark" />
    </ractive>
    {{/unless}}
  `,
  css: `
    ractive {
      display: block;
      max-width: 250px;
      min-width: 150px;
      line-height: 1.5;
      font-size: 14px;
      margin-bottom: 5px;
      border-radius: 5px;
      box-shadow: 3px 3px 3px #000000;
      opacity: 0.9;
    }
  
    ractive a.close {
      float: right;
      text-decoration: none;
      margin-right: 5px;
      font-size: .8em;
      color: #cecece;
    }

    ractive a.close:hover {
      color: #ffffff;
    }
  `
})
