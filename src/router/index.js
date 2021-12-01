import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Eleves from '../views/Eleves.vue'
import Profs from '../views/Profs.vue'
import Administration from '../views/Administration.vue'
import FileImporter from '@/components/FileImporter.vue'
import ExportStage from '@/components/ExportStage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/eleves',
    name: 'Eleves',
    component: Eleves
  },
  {
    path: '/profs',
    name: 'Profs',
    component: Profs
  },
  {
    path: '/admin',
    name: 'Administration',
    component: Administration
  },
  {
    path: '/fileimporter',
    name: 'ImporterFile',
    component: FileImporter
  },
  {
    path: '/exportstage',
    name: 'exportstage',
    component: ExportStage
  }
]

const router = new VueRouter({
  routes
})

export default router
