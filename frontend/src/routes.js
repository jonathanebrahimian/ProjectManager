import TestHome from './app/TestHome'
import TestPage from './app/TestPage'
import Login from './app/Login'
import { Materials } from './app/Materials'
import { Site } from './app/Site'
import Home from './app/Home'
import { SiteDetails } from './app/SiteDetails'
import {GoalsDetails} from './app/GoalsDetails'
import CreateSite from './app/CreateSite'
import { LogOut } from './app/LogOut'
import Register from './app/Register'
import { Builders } from './app/Builders'
import { Suppliers } from './app/Suppliers'
import EditMaterial from './app/EditMaterial'
import AssignSite from './app/AssignSite'
import { Roster } from './app/Roster'

export const ROUTES = [
  {path: '/', exact: true, component: Home},
  {path: '/home/:userID', component: Home},
  {path: '/materials', component: Materials},
  // {path: '/site/:siteID', component: SiteDetails},
  {path: '/goals/:siteID', component: GoalsDetails},
  {path: '/materials/:siteID', exact: true, component: Materials},
  {path: '/site/:siteID', exact: true, component: SiteDetails},
  {path: '/site/create/:userID', component: CreateSite},
  {path: '/logout', component: LogOut},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/builders', component: Builders},
  {path: '/suppliers', component: Suppliers},
  {path: '/editMaterials/:materialID', component: EditMaterial},
  {path: '/assignSite', component: AssignSite},
  {path: '/roster/:siteID', component: Roster}
]
