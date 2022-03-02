Ractive.components.SiteRule = Ractive.extend({
  data () {
    return {
      rule: null,
      index: null
    }
  },
  computed: {
    global () {
      return this.get("rule").site === "*"
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
    <tr>
      <td>
        <label>
          <input type="checkbox" checked={{ rule.enabled }} on-change="handleChange" />
        </label>
      </td>
      <td>
        {{#if global}}
          默认
        {{else}}
          {{ rule.site }}
        {{/if}}
      </td>
      <td>
        {{#unless global}}
          <button type="link" on-click="handleRemove">&times;</button>
        {{/unless}}
      </td>
    </tr>
  `,
  css: `
    label {
      display: block;
    }
  `
})
