class Globals {
  constructor(){
    this.root = document.querySelector(':root')
    this.events()
  }

  events(){
    document.addEventListener('updatedColors', ({ detail }) => {
      this.root.style.setProperty('--color-primary', detail.primary)
      this.root.style.setProperty('--color-secondary', detail.secondary)
    })
    document.addEventListener('navbarUpdated', ({ detail }) => {
      this.root.style.setProperty('--navbar-slider-position', `${detail.navbarPosition}%`)
    })
  }
}

export default Globals

/*
  The purpose of this module is to update the global custom variables that multiple
  elements depend on, which are the color theme and the navbar slider underline
*/
