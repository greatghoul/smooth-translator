Ractive.components.SiteRule = Ractive.extend({
  data () {
    return {
      rule: null,
      index: null,
      q: null
    }
  },
  computed: {
    global () {
      return this.get("rule.site") === "*"
    },
    match () {
      const site = this.get("rule.site")
      return site === "*" || site.indexOf(this.get("q")) != -1
    },
    label () {
      return this.get("global") ? "默认" : this.get("rule").site
    }
  },
  on: {
    handleRemove () {
      this.fire("remove", this.get("index"))
    },
    handleChange () {
      this.fire("change")
    }
  },
  template: `
    {{#if match}}
      <li>
        <Checkbox
          label="{{ label }}"
          checked="{{ rule.enabled }}"
          on-change="handleChange"
        />
        {{#unless global}}
          <button type="link" on-click="handleRemove">&times;</button>
        {{/unless}}
      </li>
    {{/if}}
  `,
  css: `
    li {
      padding-left: 0.5em;
      padding-right: 0.5em;
      height: 2.8em;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    li:hover {
      background-color: #eee;
    }

    button {
      margin-left: 5px;
    }

    Label {
      width: 300px;
    }
  `
})
