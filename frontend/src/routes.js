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

export const ROUTES = [
  {path: '/', exact: true, component: Home},
  {path: '/home/:userID', component: Home},
  {path: '/materials', component: Materials},
  {path: '/site/:siteID', component: SiteDetails},
  {path: '/goals/:siteID', component: GoalsDetails},
  {path: '/materials/:siteID', component: Materials},
  {path: '/site/:siteID', exact: true, component: SiteDetails},
  {path: '/site/create/:userID', component: CreateSite},
  {path: '/logout', component: LogOut},
  {path: '/login', component: Login}
]
