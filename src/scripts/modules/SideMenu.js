import { updateColors, resetColors, updateNavbar, resetNavbar, slideMenuForward, slideMenuBack, resetSideMenu, fetchTemplate, showTableOfContents } from '../flux/actions/actions'

class SideMenu {
  constructor(){
    this.sideMenu = document.querySelector('.sidebar')
    this.events()
  }

  events(){
    this.sideMenu.addEventListener('click', ({ target }) => this.updateMenu(target))
    document.addEventListener('sideMenuUpdated', ({ detail }) => this.updateSidebar(detail))
  }

  updateMenu(target){
    const { color, section } = target.dataset

    if (!section) return
    if (section === 'back')   return slideMenuBack()
    if (section === 'reset')  return resetSideMenu()

    if (section === 'table') {
      showTableOfContents()
      slideMenuForward()
      return
    }

    if (color) {
      updateColors(color)
      updateNavbar()
    }

    slideMenuForward()
    fetchTemplate(section)
  }

  updateSidebar({ position }){

    switch (position) {
      case 0:
        this.sideMenu.className = 'sidebar sidebar--is-visible-3'
      break;
      case -33:
        this.sideMenu.className = 'sidebar sidebar--is-visible-2'
      break;
      case -66:
        this.sideMenu.className = 'sidebar sidebar--is-visible-1'
        resetNavbar()
        resetColors()
      break;
      default:
      return
    }

    this.sideMenu.style.setProperty('--sidemenu-position', `${position}%`)
  }
}

export default SideMenu
