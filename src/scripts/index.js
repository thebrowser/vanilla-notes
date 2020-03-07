import Globals from './modules/Globals'
import SideMenu from './modules/SideMenu'
import TemplateView from './modules/TemplateView'
import Search from './modules/Search'

import ColorStore from './flux/stores/colors'
import NavbarStore from './flux/stores/navbar'
import SideMenuStore from './flux/stores/sideMenu'
import TemplateStore from './flux/stores/templates'
import TableOfContentsStore from './flux/stores/tableOfContents'

new Globals()
new SideMenu()
new TemplateView()
new Search()

new ColorStore()
new NavbarStore()
new SideMenuStore()
new TemplateStore()
new TableOfContentsStore()
