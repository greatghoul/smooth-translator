export default {
  data() {
    return {
      options: Object.assign({}, defaults),
    };
  },
  methods: {
    initOptions() {
      storage.addChangeListener(() => this.loadOptions());
      storage.getAll().then(options => console.log(options));
      return this.loadOptions();
    },
    loadOptions() {
      return storage.getAll().then(options => this.options = options);
    },
    updateOption(name, value) {
      this.options[name] = value;
      storage.set(name, value);
    },
    saveRule(rule) {
      this.options.siteRules[rule.site] = rule.enabled
      this.updateOption('siteRules', this.options.siteRules);
    },
    removeRule(rule) {
      _.remove(this.options.siteRules, { site: rule.site });
      this.updateOption('siteRules', this.options.siteRules);
    }
  },
};
