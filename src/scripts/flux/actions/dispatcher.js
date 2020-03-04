import actionTypes from './types'

class Dispatcher {
  dispatch(action){
    switch (action.type) {
      case actionTypes.UPDATE_COLORS:
        document.dispatchEvent(new CustomEvent('newColors', { detail: action.payload }))
      break
      case actionTypes.RESET_COLORS:
        document.dispatchEvent(new CustomEvent('resetColors'))
      break
      case actionTypes.UPDATE_NAVBAR:
      case actionTypes.RESET_NAVBAR:
        document.dispatchEvent(new CustomEvent('newNavbarPosition', { detail: action.payload }))
      break
      case actionTypes.SLIDE_FORWARD:
      case actionTypes.SLIDE_BACK:
      case actionTypes.RESET_MENU:
        document.dispatchEvent(new CustomEvent('newSidemenu', { detail: action.payload }))
      break
      case actionTypes.FETCH_TEMPLATE:
        document.dispatchEvent(new CustomEvent('fetchTemplate', { detail: action.payload }))
      break
      case actionTypes.TABLE_CONTENTS:
        document.dispatchEvent(new CustomEvent('showTableContents'))
      break
      default:
      return
    }
  }
}

export default new Dispatcher()
