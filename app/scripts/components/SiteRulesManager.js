Ractive.components.SiteRulesManager = Ractive.extend({
  data () {
    return {
      ruleMap: {},
      ruleList: [],
    }
  },
  ruleMapToList (ruleMap) {
    return Object.entries(ruleMap).map(([site, enabled]) => ({ site, enabled }))
  },
  ruleListToMap (ruleList) {
    const entries = this.get("ruleList").map(({ site, enabled }) => [site, enabled])
    return Object.fromEntries(entries)
  },
  on: {
    init () {
      const ruleList = this.ruleMapToList(this.get("ruleMap"))
      this.set({ ruleList })
    },
    handleChange () {
      const ruleMap = this.ruleListToMap(this.get("ruleList"))
      this.set({ ruleMap })
      this.fire("change", "siteRules", ruleMap)
    },
    "SiteRule.change": function (context) {
      this.fire("handleChange")
    },
    "SiteRule.remove": function (context, index) {
      this.splice("ruleList", index, 1)
      this.fire("handleChange")
    },
  },
  template: `
    <table>
      <thead>
        <tr>
          <th>启用</th>
          <th>网站</th>
          <th>删除</th>
        </tr>
      </thead>
      <tbody>
        {{#each ruleList as rule:index }}
          <SiteRule rule="{{ rule }}" index="{{ index }}" />
        {{/each}}
      </tbody>
    </table>
  `,
  css: `
    table {
      width: 100%;
      border-collapse: collapse;
    }

    tr {
      height: 2.5em;
    }
    tr:hover {
      background-color: #eee;
    }

    th {
      text-align: left;
      background-color: #ddd;
    }
    th:first-of-type,
    th:last-of-type {
      width: 3em;
    }

    th,
    td {
      padding-left: 1em;
      padding-right: 1em;
    }
  `
})
