import TestHome from './app/TestHome'
import TestPage from './app/TestPage'
import Login from './app/Logreg'
import { Materials } from './app/Materials'
import { Site } from './app/Site'
import GetEmployeeInfo from './app/GetEmployeeInfo'

export const ROUTES = [
  {path: '/testPage', component: TestPage},
  {path: '/', exact: true, component: Login},
  {path: '/materials', component: Materials},
  {path: '/site', component: Site},
  {path: '/employeesTable', component: GetEmployeeInfo}
]