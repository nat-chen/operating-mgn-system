import baseComponent from '@pages'
import sales from './sales'

export default {
   path: '/',
   component: baseComponent,
   isExact: true,
   subRoutes: [
     ...sales
   ]
}