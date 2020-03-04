class TemplateStore {
  constructor(){
    this.state = {
      cachedTemplates: JSON.parse(localStorage.getItem('cachedTemplates')) || {},
      data: {}
    }

    this.fetchData()
    this.events()
  }

  fetchData(){
    fetch('http://vanilla-notes.site/wp-json/vanilla/v1/metadata')
    .then(res => res.json())
    .then(data => this.setData(data))
    .catch(err => console.log(err)); // TODO: Error handling
  }

  events(){
    document.addEventListener('fetchTemplate', ({ detail }) => this.checkCachedTemplates(detail))
  }

  checkCachedTemplates(section){
    const cached = this.state.cachedTemplates[section]

    if (cached) {
      document.dispatchEvent(new CustomEvent('deliverTemplate', { detail: cached }))
    } else {
      this.createTemplate(section)
    }
  }

  createTemplate(section){
    const newTemplate = {
      id: new Date().getTime().toString(),
      target: '',
      content: ''
    }

    if (!this.state.data[section]) {        // There are no articles in this section yet
      newTemplate.target = ['sidebar__sections', 'sidebar__articles']

      newTemplate.content = `
        <li class="sidebar__title">
         <button class="sidebar__title--text" data-section="reset">Oops... section is emtpy</button>
        </li>
        <li class="sidebar__item">
          <p>Funny 404 image here or something</p>
        </li>
      `

      this.emitUpdateEvent(newTemplate)
      return
    }

    if (!this.state.data[section].length){                          // check if option is one of 'DOM', 'REST API', ...
      const keys = Object.keys(this.state.data[section])            // retrieve all categories under that section

      newTemplate.target = 'sidebar__sections'

      newTemplate.content = `
        <li class="sidebar__title">
         <button class="sidebar__title--text" data-section="back">${section}</button>
        </li>

        ${keys.map(item => (`
          <li class="sidebar__item">
            <button class="sidebar__link" data-section="${item}">${item}</button>
          </li>`))
        .join('')}
      `
    }

    if (this.state.data[section].length){                           // check if option is one of 'html', 'css', etc...
      newTemplate.target = 'sidebar__articles'

      newTemplate.content = `
        <li class="sidebar__title">
         <button class="sidebar__title--text" data-section="back">${section}</button>
        </li>

        ${this.state.data[section].map(item => (`
          <li class="sidebar__item">
            <a href="${item.permalink}" class="sidebar__link">${item.title}</button>
          </li>`))
        .join('')}
      `
    }

    this.emitUpdateEvent(newTemplate)
    this.setCachedTemplates({ newTemplate, section })
  }

  setData(data){
    this.state.data = { ...this.state.data, ...data }
  }

  setCachedTemplates({ newTemplate, section }){
    this.state.cachedTemplates = { ...this.state.cachedTemplates, [section]: newTemplate }

    localStorage.setItem('cachedTemplates', JSON.stringify(this.state.cachedTemplates))
  }

  emitUpdateEvent(newTemplate){
    document.dispatchEvent(new CustomEvent('deliverTemplate', { detail: newTemplate }))
  }
}

export default TemplateStore
