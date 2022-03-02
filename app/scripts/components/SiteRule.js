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
        <label>
          <input type="checkbox" checked={{ rule.enabled }} on-change="handleChange" />
          {{#if global}}
            默认
          {{else}}
            {{ rule.site }}
          {{/if}}
        </label>
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

    label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 300px;
    }

    label input[type=checkbox] {
      margin: 0 5px 0 0;
      vertical-align: bottom;
    }
  `
})
