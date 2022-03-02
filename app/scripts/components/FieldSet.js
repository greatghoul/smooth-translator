Ractive.components.FieldSet = Ractive.extend({
  data () {
    return {
      caption: ""
    }
  },
  template: `
    <fieldset>
      <legend>{{ legend }}</legend>
      
      {{ yield }}
    </fieldset>
  `,
  css: `
    fieldset {
      margin-bottom: 1em;   
    }
  `
})
