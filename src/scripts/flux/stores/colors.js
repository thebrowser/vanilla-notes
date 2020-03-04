class ColorStore {
  constructor(){
    this.baseColor = document.body.dataset.color
    this.events()
    this.setState({
      primary: this.baseColor,
      secondary: this.baseColor
    })
  }

  events(){
    document.addEventListener('newColors', ({ detail }) => this.setState(detail))

    document.addEventListener('resetColors', () => {        // timeout updates the theme color in sync with the navbar underline
      setTimeout(() => this.setState({
        primary: this.baseColor,
        secondary: this.baseColor
      }), 250)
    })
  }

  getState(){
    return this.state
  }

  setState(updateToState){
    this.state = { ...this.state, ...updateToState }
    this.emitUpdateEvent()
  }

  emitUpdateEvent(){
    document.dispatchEvent(new CustomEvent('updatedColors', { detail: this.getState() }))
  }
}

export default ColorStore
