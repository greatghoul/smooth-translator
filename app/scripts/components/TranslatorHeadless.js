const TranslatorHeadless = Ractive.extend({
  data () {
    return {
      results: []
    }
  },
  translate (source) {
    const results = this.get("results")
    if (!results.find(x => x.source === source)) {
      results.push({ source, translation: "正在翻译...", status: "pending" })
      this.set({ results })  
    }
  },
  template: `
    <div translator-headless>
      {{#each results as result }}
        <ResultToast result={{ result }} />
      {{/each}}
    </div>
  `,
  css: `
    div {
      all: initial;
    }
    div * {
      all: revert;
    }

    [translator-headless] {
      font-size: 14px;
      font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
      position: fixed;
      z-index: 2147483647;
      width: 250px;
      right: 15px;
      top: 35px;
      max-height: calc(100% - 40px);
      overflow: auto;
      padding-right: 5px;
    }

    [translator-headless]::-webkit-scrollbar {
      display: none;
      width: 0px;
    }
  `
})


// export default {
//   mixins: [OptionsLoader],
//   data() {
//     return {
//       results: [],
//     };
//   },
//   methods: {
//     translate(text) {
//       if (this.findIndex(text) == -1) {
//         this.results.push({
//           text: text,
//           status: 'pending',
//           show: true
//         });
//       }
//     },
//     removeResult(text) {
//       this.results.splice(this.findIndex(text), 1);
//     },
//     findIndex(text) {
//       return _.findIndex(this.results, { text });
//     }
//   },
//   components: {
//     ResultToast,
//   },

// }
