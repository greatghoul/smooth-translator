const TranslatorHeadless = Ractive.extend({
  data () {
    return {
      results: []
    }
  },
  translate (source) {
    const results = this.get("results")
    results.push({ source, translation: "正在翻译...", status: "pending" })
    this.set({ results })
  },
  template: `
    <main>
      {{#each results as result }}
        <ResultToast result={{ result }} />
      {{/each}}
    </main>
  `,
  css: `
    main {
      position: fixed;
      z-index: 2147483647;
      width: 250px;
      right: 15px;
      top: 35px;
      max-height: calc(100% - 40px);
      overflow: auto;
    }

    main::-webkit-scrollbar {
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
