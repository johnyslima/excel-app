import { Router } from './core/routes/Router'
import { DashboardPage } from './pages/DashboardPage'
import { ExcelPage } from './pages/ExcelPage'
import './style/index.scss'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
})
