class NavbarStore {
  constructor(){
    this.state = {
      navbarPosition: 0
    }
    this.events()
  }

  events(){
    document.addEventListener('newNavbarPosition', ({ detail }) => this.setState(detail))
  }

  getState(){
    return this.state
  }

  setState(updateToState){
    this.state = { ...this.state, ...updateToState }
    this.emitUpdateEvent()
  }

  emitUpdateEvent(){
    document.dispatchEvent(new CustomEvent('navbarUpdated', { detail: this.getState() }))
  }
}

export default NavbarStore
