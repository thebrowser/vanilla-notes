import Globals from './modules/Globals'
import SideMenu from './modules/SideMenu'
import TemplateView from './modules/TemplateView'

import ColorStore from './flux/stores/colors'
import NavbarStore from './flux/stores/navbar'
import SideMenuStore from './flux/stores/sideMenu'
import TemplateStore from './flux/stores/templates'

new Globals()
new SideMenu()
new TemplateView()

new ColorStore()
new NavbarStore()
new SideMenuStore()
new TemplateStore()
