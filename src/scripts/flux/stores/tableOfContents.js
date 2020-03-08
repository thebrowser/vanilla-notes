class TableOfContentsStore {
  constructor(){
    this.headings = []
    this.calculateNodes()
    this.events()
  }

  events(){
    document.addEventListener('showTableContents', () => this.generateTemplate())
    this.generateTemplate()
  }

  calculateNodes(){
    const article = document.querySelector('.article')
    const h1 = article.querySelectorAll('h1')
    const h2 = article.querySelectorAll('h2')
    const h3 = article.querySelectorAll('h3')

    const nodes = [...h1, ...h2, ...h3].map(node => {
      node.id = node.textContent.split(' ').join('_')
      return node
    })

    this.headings = nodes
  }

  generateTemplate(){  // Warning: repeating myself !

    const newTemplate = {
      id: new Date().getTime().toString(),
      target: 'sidebar__sections',
      content: ''
    }

    newTemplate.content = `
    <li class="sidebar__title"><button class="sidebar__title--text" data-section="back">Sections &#8594;</button></li>
    ${this.headings.map(heading => (`
      <li class="sidebar__item">
        <a href="/#${heading.id}" class="sidebar__link">${heading.textContent}</button>
      </li>`))
    .join('')}
    `

    document.dispatchEvent(new CustomEvent('deliverTemplate', { detail: newTemplate }))
  }
}

export default TableOfContentsStore
