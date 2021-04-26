import TestHome from './app/TestHome'
import TestPage from './app/TestPage'
import Login from './app/Login'
import { Materials } from './app/Materials'
import { Site } from './app/Site'
import Home from './app/Home'
import { SiteDetails } from './app/SiteDetails'
import {GoalsDetails} from './app/GoalsDetails'

export const ROUTES = [
  {path: '/', exact: true, component: Home},
  {path: '/home/:userID', component: Home},
  {path: '/materials', component: Materials},
  {path: '/site/:siteID', component: SiteDetails},
  {path: '/goals/:siteID', component: GoalsDetails},
  // {path: '/login', component: Login}
]

