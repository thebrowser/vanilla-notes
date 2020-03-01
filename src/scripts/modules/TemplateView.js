class TemplateView {
  constructor() {
    this.lastRenderedTemplate = ''
    this.events()
  }

  events(){
    document.addEventListener('deliverTemplate', ({ detail }) => this.renderTemplate(detail))
  }

  renderTemplate({ id, target, content }){

    if(this.lastRenderedTemplate === id) return           // 1. Prevents an unnecessary DOM render

    document.getElementById(target).innerHTML = content   // 2. Updates the DOM

    this.lastRenderedTemplate = id                        // 3. Remembers the last rendered template
  }
}

export default TemplateView
