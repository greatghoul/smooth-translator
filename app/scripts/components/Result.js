Ractive.components.Result = Ractive.extend({
  data: {
    result: null,
    showSource: null,
  },
  template: `
    <div result status="{{ result.status }}">
      {{#showSource}}
        <h6 source title="{{ result.source }}">{{ result.source }}</h6>
      {{/showSource}}
      {{#result.translation}}
        <div translation>
          {{#result.phonetic}}
            <pre phonetic>{{ result.phonetic }}</pre>
          {{/result.phonetic}}

          {{{ result.translation }}}
        </div>
      {{/result.translation}}
    </div>
  `,
  css: `
    [result] {
      padding: 3px 5px;
      font-size: 13px;
    }

    [result][status=success],
    [result][status=pending] {
      background: #DDEADD;
      color: #2B3F29;
    }
    
    [result][status=failure] {
      background: #fff3c8;
      color: #888888;
    }

    [source] {
      font-size: 1em;
      margin: 0 0 5px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    [phonetic] {
      margin: 0 0 5px 0;
      padding: 0;
      font-size: 0.9em;
      color: #58afb1;
    }

    [translation] {
      overflow-y: auto;
      max-height: 200px;
      
    }
    [translation]::-webkit-scrollbar{
      width:5px;
      background-color:#ddeadd;
    }
    [translation]::-webkit-scrollbar:horizontal{
      height:5px;
    }
    [translation]::-webkit-scrollbar-track{
      border:1px #ddeadd solid;
      border-radius:5px;
      -webkit-box-shadow:0 0 6px #ddeadd inset;
    }
    [translation]::-webkit-scrollbar-thumb{
      background-color:#c1c8c1;
      border:1px solid #c1c8c1;
      border-radius:5px;
    }
    [translation]::-webkit-scrollbar-thumb:hover{
      background-color:#c1c8c1;
      border:1px solid #c1c8c1;
    }
    [translation]::-webkit-scrollbar-thumb:active{
      background-color:#c1c8c1;
      border:1px solid #c1c8c1;
    }
  
    [translation] p {
      margin: 0;
      padding: 0;
    }

    [translation] p + p {
      margin-top: 0.3em;
    }
  `
})
