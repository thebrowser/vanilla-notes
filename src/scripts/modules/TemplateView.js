class TemplateView {
  constructor() {
    this.lastRenderedTemplate = ''
    this.events()
  }

  events(){
    document.addEventListener('deliverTemplate', ({ detail }) => this.renderTemplate(detail))
  }

  renderTemplate({ id, target, content }){
    if(this.lastRenderedTemplate === id) return

    // If its an array it should be an error, so update all.
    if (typeof target === 'object'){
      target.forEach(t => {
        document.getElementById(t).innerHTML = content
      })
      this.lastRenderedTemplate = id
      return
    }

    document.getElementById(target).innerHTML = content

    this.lastRenderedTemplate = id
  }
}

export default TemplateView
