import Ractive from "/scripts/libs/ractive.mjs"

export default Ractive.extend({
  data: {
    result: null,
    theme: null,
  },
  template: `
    <div class="result theme-{{ theme }} status-{{ result.status }}">
      {{#result.phonetic}}<pre class="phonetic">{{ result.phonetic }}</pre>{{/result.phonetic}}
      {{#result.translation}}<div class="translation">{{{ result.translation }}}</div>{{/result.translation}}
    </div>
  `,
  css: `
    .result {
      padding: 3px 5px;
    }

    .phonetic {
      margin: 0 0 5px 0;
      padding: 0;
      font-size: 0.9em;
      color: #58afb1;
    }
  
    .translation {
      overflow-y: auto;
      max-height: 200px;
    }

    .translation p {
      margin: 0;
      padding: 0;
    }

    .translation p + p {
      margin-top: 0.3em;
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
