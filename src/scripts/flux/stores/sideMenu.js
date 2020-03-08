class SideMenuStore {
  constructor(){
    this.state = {
      position: -33
    }
    this.events()
  }

  events(){
    document.addEventListener('newSidemenu', ({ detail }) => this.setState(detail))
  }

  getState(){
    return this.state
  }

  setState({ position }){
    this.state = { ...this.state, position: this.state.position + position }
    this.emitUpdateEvent()
  }

  emitUpdateEvent(){
    document.dispatchEvent(new CustomEvent('sideMenuUpdated', { detail: this.getState() }))
  }
}

export default SideMenuStore
