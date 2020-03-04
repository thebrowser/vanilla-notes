class TemplateStore {
  constructor(){
    this.state = {
      // cachedTemplates: JSON.parse(localStorage.getItem('cachedTemplates')) || {},
    }

    this.fetchData()
    this.events()
  }

  fetchData(){
    fetch('http://vanilla-notes.site/wp-json/vanilla/v1/metadata')
    .then(res => res.json())
    .then(data => this.setData(data))
    .catch(err => console.log(err));
  }

  events(){
    // document.addEventListener('fetchTemplate', ({ detail }) => this.checkCachedTemplates(detail))
    document.addEventListener('fetchTemplate', ({ detail }) => this.createTemplate(detail))
  }

  checkCachedTemplates(section){
    const cachedTemplate = this.state.cachedTemplates[section]

    if (cachedTemplate) {
      document.dispatchEvent(new CustomEvent('deliverTemplate', { detail: cachedTemplate }))
      return
    }

    this.createTemplate(section)
  }

  createTemplate(section){

    const newTemplate = {
      id: new Date().getTime().toString(),
      target: '',
      content: ''
    }

    /* click happened on the first menu because it holds object, not arrays, which don't have a length property */

    if (!this.state.data[section].length){
      const keys = Object.keys(this.state.data[section])

      if(!keys.length){
        // TODO, no posts under this category so better create some sort of '404' template for this or something
        console.log('Oops, looks like there are no posts under this category yet.')
        return
      }

      newTemplate.target = 'sidebar__sections'

      newTemplate.content = keys.map(item => (`
        <li class="sidebar__item">
          <button class="sidebar__link" data-section="${item}">${item}</button>
        </li>`))
      .join('')
    }

    /* click happened on the second menu, then we need to render anchor tags */

    if (this.state.data[section].length){
      newTemplate.target = 'sidebar__articles'

      newTemplate.content = this.state.data[section].map(item => (`
        <li class="sidebar__item">
          <a href="${item.permalink}" class="sidebar__link">${item.title}</button>
        </li>`))
      .join('')
    }

    this.emitUpdateEvent(newTemplate)
    // this.setState(newTemplate, section)
  }

  setData(data){
    this.state = {
      ...this.state,
      data
    }
    // console.log('done', this.state)
  }

  setState(newState){

    this.state = {
      ...this.state,
      newState
      // cachedTemplates: { ...this.state.cachedTemplates, [section]: newTemplate }
    }

    // localStorage.setItem('cachedTemplates', JSON.stringify(this.state.cachedTemplates))
  }

  emitUpdateEvent(newTemplate){
    document.dispatchEvent(new CustomEvent('deliverTemplate', { detail: newTemplate }))
  }
}

export default TemplateStore
