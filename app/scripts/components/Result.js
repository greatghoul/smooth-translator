import Ractive from "/scripts/libs/ractive.mjs"

export default Ractive.extend({
  data: {
    result: null,
    theme: null,
  },
  template: `
    <div class="result">
      <h6 class="text" v-if="result.text">{{ result.text }}</h6>
      <pre class="phonetic" v-if="result.phonetic">{{ result.phonetic }}</pre>
      <div class="translation" v-html="result.translation"></div>
    </div>
  `,
  css: `
    .result {
      padding: 3px 5px;
    }

    .phonetic {
      margin: 0 0 5px 0;
    }
    
    h6, code, pre {
      border: none;
      background: none;
      color: inherit;
      padding: 0;
      margin: 0;
      text-transform: none;
      font-size: 14px;
      line-height: 20px;
      white-space: normal;
    }
    
    .text {
      margin-bottom: 5px;
      font-weight: 600;
    }
  
    .phonetic {
      padding-top: 5px !important;
      padding-bottom: 10px !important;
      color: #58afb1;
    }
  
    .translation {
      overflow-y: auto;
      max-height: 200px;
    }

    .translation .additional {
      color: #aaa !important;
      font-size: 0.9em !important;
      margin-top: 5px !important;
      padding-bottom: 5px !important;
    }

    .theme-dark.status-success,
    .theme-dark.status-pending {
      background: #336721;
      color: #EDF8ED;
    }
    
    .theme-dark.status-failure {
      background: #FFF299;
      color: #888888;
    }
    
    .theme-light.status-success,
    .theme-light.status-pending {
      background: #DDEADD;
      color: #2B3F29;
    }
    
    .theme-light.status-failure {
      background: #fff3c8;
      color: #888888;
    }
  `
})
