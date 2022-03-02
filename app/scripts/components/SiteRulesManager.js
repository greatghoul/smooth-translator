Ractive.components.SiteRulesManager = Ractive.extend({
  data () {
    return {
      q: "",
      ruleMap: {},
      ruleList: [],
    }
  },
  ruleMapToList (ruleMap) {
    return Object.entries(ruleMap).map(([site, enabled]) => ({ site, enabled }))
                 .sort((a, b) => a.site.localeCompare(b.site))
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
    <input type="search" value="{{ q }}" placeholder="按照域名搜索..." />
    <ul>
      {{#each ruleList as rule:index }}
        <SiteRule rule="{{ rule }}" index="{{ index }}" q={{q}} />
      {{/each}}
    </ul>
  `,
  css: `
    input[type=search] {
      width: 100%;
      margin-bottom: 5px;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `
})
