Ractive.components.FormGroup = Ractive.extend({
  data () {
    return {
      label: ""
    }
  },
  template: `
    <div form-group>
      <label>{{ label }}</label>
      <div>
        {{ yield }}
      </div>
    </div>
  `,
  css: `
    [form-group] {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #f0f0f0;    
    }

    [form-group]:last-child {
      border-bottom: 0;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    [form-group] label {
      margin: 3px 0;
      float: left;
      width: 200px;
      font-weight: bold;
      font-size: 1.1em;
    }

    [form-group] > div {
      margin-left: 200px;
    }

    [form-group] > div > .hint {
      color: #aaa;
      margin-top: 10px;
      margin-bottom: 0;
    }
  `
})
