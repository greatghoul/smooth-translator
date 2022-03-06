Ractive.components.Checkbox = Ractive.extend({
  data () {
    return {
      label: "",
      checked: false
    }
  },
  on: {
    handleChange () {
      this.fire("change", this.get("checked"))
    }
  },
  template: `
    <label checkbox title="{{ label }}">
      <input type="checkbox" on-change="handleChange" checked="{{checked}}" />
      <span>{{ label }}</span>
    </label>  
  `,
  css: `
    label[checkbox] {
      display: flex;
      align-items: center;
    }
    label[checkbox] input[type=checkbox] {
      line-height: normal;
      margin-right: 5px;
    }
    label[checkbox] span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0px;
    }
  `
})
