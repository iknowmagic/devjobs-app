import MainLayout from '@/layouts/MainLayout'
import NotFound from '@/pages/NotFound'
import HomePage from '@/pages/HomePage'

export default [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        redirect: { name: 'welcome' }
      },
      {
        path: 'welcome',
        name: 'welcome',
        component: HomePage,
        meta: {
          title: 'Welcome'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: NotFound,
    name: 'notFound',
    meta: {
      title: 'Page Not Found'
    }
  }
]
