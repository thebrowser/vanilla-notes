import actionTypes from './types'
import Dispatcher from './dispatcher'

export const updateColors = (newColor) => {
  Dispatcher.dispatch({ type: actionTypes.UPDATE_COLORS, payload: { secondary: newColor }})
}

export const resetColors = () => {
  Dispatcher.dispatch({ type: actionTypes.RESET_COLORS })
}

export const updateNavbar = () => {
  Dispatcher.dispatch({ type: actionTypes.UPDATE_NAVBAR, payload: { navbarPosition: 100 } })  // translateX navbar to 100%
}

export const resetNavbar = () => {
  Dispatcher.dispatch({ type: actionTypes.UPDATE_NAVBAR, payload: { navbarPosition: 0 } })    // translateX navbar to 0%
}

export const slideMenuForward = () => {
  Dispatcher.dispatch({ type: actionTypes.SLIDE_FORWARD, payload: { position: 33 } })         // translateX sidebar by 33%
}

export const slideMenuBack = () => {
  Dispatcher.dispatch({ type: actionTypes.SLIDE_BACK, payload: { position: -33 } })           // translateX sidebar by -33%
}

export const fetchTemplate = (section) => {
  Dispatcher.dispatch({ type: actionTypes.FETCH_TEMPLATE, payload: section })
}
