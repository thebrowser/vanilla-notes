import { updateColors, resetColors, updateNavbar, resetNavbar, slideMenuForward, slideMenuBack, fetchTemplate } from '../flux/actions/actions'

class SideMenu {
  constructor(){
    this.sideBar = document.querySelector('.sidebar')
    this.events()
  }

  events(){
    this.sideBar.addEventListener('click', ({ target }) => this.updateMenu(target))
    document.addEventListener('sideMenuUpdated', ({ detail }) => this.updateSidebar(detail))
  }

  updateMenu(target){
    const { color, section } = target.dataset

    if (!section) return          // 1. user clicked elsewhere in the menu

    if (section === 'back'){      // 2. user clicked on the back button
      this.backMenu()
      return
    }

    if (color) {                  // 3. only the first menu updates color theme
      updateColors(color)
      updateNavbar()
    }

    slideMenuForward()
    fetchTemplate(section)        // 4. this action eventually triggers the event listener above "sideMenuUpdated"
  }

  backMenu(){
    slideMenuBack()
  }

  updateSidebar({ position }){    // 5. updates the DOM

    switch (position) {
      case 0:
        this.sideBar.className = 'sidebar sidebar--is-visible-3'
      break;
      case -33:
        this.sideBar.className = 'sidebar sidebar--is-visible-2'
      break;
      case -66:
        this.sideBar.className = 'sidebar sidebar--is-visible-1'
        resetNavbar()
        resetColors()
      break;
      default:
      return
    }

    this.sideBar.style.setProperty('--sidemenu-position', `${position}%`)
  }
}

export default SideMenu
