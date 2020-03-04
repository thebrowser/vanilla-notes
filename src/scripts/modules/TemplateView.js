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

    // Checking for array which means both side
    if (typeof target === 'object'){
      document.getElementById(target[0]).innerHTML = content
      document.getElementById(target[1]).innerHTML = content
      this.lastRenderedTemplate = id
      return
    }

    document.getElementById(target).innerHTML = content

    this.lastRenderedTemplate = id
  }
}

export default TemplateView
