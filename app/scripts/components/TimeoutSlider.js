Ractive.components.TimeoutSlider = Ractive.extend({
  data () {
    return {
      value: 0
    }
  },
  computed: {
    seconds () {
      return this.get("value") / 1000
    }
  },
  on: {
    changeValue () {
      this.fire("change", "resultTimeout", this.get("value"))  
    }
  },
  template: `
    <div timeout-slider>
      <input
        type="range"
        min="0"
        max="15000"
        step="1000"
        value="{{ value }}"
        on-change="changeValue"
      />
      <span class="label label-info">{{ seconds }} 秒</span>
    </div>
  `
})
