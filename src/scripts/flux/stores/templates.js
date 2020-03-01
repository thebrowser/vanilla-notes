class TemplateStore {
  constructor(){
    this.state = {
      // cachedTemplates: JSON.parse(localStorage.getItem('cachedTemplates')) || {}, // might not be needed afterall because of browser cache
      data: {
        html: {
          target: 'sidebar__sections',
          content: `
            <button data-section="back">Back</button>
            <li class="sidebar__item"><button class="sidebar__link" data-section="htmlhead">What's in the head?</button></li>
            <li class="sidebar__item"><button class="sidebar__link" data-section="htmlelements">HTML Elements</button></li>
            <li class="sidebar__item"><button class="sidebar__link" data-section="semanticmarkup">Semantic Markup</button></li>
            `
        },
        css: {
          target: 'sidebar__sections',
          content: `
            <button data-section="back">Back</button>
            <li class="sidebar__item"><button class="sidebar__link" data-section="css">WhdfsfsSS</button></li>
            <li class="sidebar__item"><button class="sidebar__link" data-section="css">Specificity</button></li>
            <li class="sidebar__item"><button class="sidebar__link" data-section="css">Fouck yeah</button></li>
            <li class="sidebar__item"><button class="sidebar__link" data-section="css">Accessibility</button></li>
            `
        },
				htmlhead: {
          target: 'sidebar__articles',
          content: `
            <button data-section="back">Back</button>
            <li class="sidebar__item"><a class="sidebar__link" data-section="metatags">Meta Tags</a></li>
            <li class="sidebar__item"><a class="sidebar__link" data-section="externalresources">External Resources</a></li>
            <li class="sidebar__item"><a class="sidebar__link" data-section="preload">Preload and Prefetch</a></li>
            `
        },
				htmlelements: {
          target: 'sidebar__articles',
          content: `
            <button data-section="back">Back</button>
            <li class="sidebar__item"><button class="sidebar__link" data-section="form">Form</button></li>
            <li class="sidebar__item"><button class="sidebar__link" data-section="multimedia">Multimedia</button></li>
            <li class="sidebar__item"><button class="sidebar__link" data-section="Embedded">Embedded Content</button></li>
            <li class="sidebar__item"><button class="sidebar__link" data-section="svg">SVG</button></li>
            <li class="sidebar__item"><button class="sidebar__link" data-section="htmlentities">HTML Entities</button></li>
            `
        },
				semanticmarkup: {
          target: 'sidebar__articles',
          content: `
            <button data-section="back">Back</button>
            <li class="sidebar__item"><button class="sidebar__link" data-section="htmlstructure">HTML Structure</button></li>
            <li class="sidebar__item"><button class="sidebar__link" data-section="accessibility">Accessibility</button></li>
            `
        },
      }
    }
    this.events()
  }

  events(){
    // document.addEventListener('fetchTemplate', ({ detail }) => this.checkCachedTemplates(detail))
    document.addEventListener('fetchTemplate', ({ detail }) => this.createTemplate(detail))
  }

  checkCachedTemplates(section){
    const cachedTemplate = this.state.cachedTemplates[section]

    if (cachedTemplate) {
      document.dispatchEvent(new CustomEvent('deliverTemplate', { detail: cachedTemplate }))  // 1. template is in cache
      return
    }

    this.createTemplate(section)
  }

  createTemplate(section){
    console.log(section)
    if(this.state.data[section]) {

      const newTemplate = {
        id: new Date().getTime().toString(),
        target: this.state.data[section].target,
        content: this.state.data[section].content
      }

      this.emitUpdateEvent(newTemplate)                                                 // 2. emit event with new template
      this.setState(newTemplate, section)

    } else {
      console.log('Data object cannot be found, please refresh the page')               // 3. the data object is not loaded
    }
  }

  /* getState(){                                                                        // 4. not in use
     return this.state
   }
 */

  setState(newTemplate, section){

    this.state = {
      ...this.state,
      cachedTemplates: { ...this.state.cachedTemplates, [section]: newTemplate }         // 5. cache the new template
    }

    localStorage.setItem('cachedTemplates', JSON.stringify(this.state.cachedTemplates))  // 6. save for next visit/refresh
  }

  emitUpdateEvent(newTemplate){
    document.dispatchEvent(new CustomEvent('deliverTemplate', { detail: newTemplate }))
  }
}

export default TemplateStore
