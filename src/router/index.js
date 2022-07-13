import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Search = () => import('@/views/Search')
const News = () => import('@/views/News')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const City = () => import('@/views/City')
const Collect = () => import('@/views/Collect')
const Rental = () => import('@/views/Rental')
const Map = () => import('@/views/Map')
const Hinfo = () => import('@/views/Hinfo')
const Lease = () => import('@/views/lease')
const PlotKeyword = () => import('@/views/PlotKeyword')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      { path: 'home', component: Home, name: 'home' },
      { path: 'search', component: Search, name: 'search' },
      { path: 'news', component: News, name: 'news' },
      { path: 'my', component: My, name: 'my' }
    ]
  },
  { path: '/login', component: Login },
  { path: '/city', component: City },
  { path: '/collect', component: Collect, name: 'collect' },
  { path: '/rental', component: Rental, name: 'rental' },
  { path: '/map', component: Map, name: 'map' },
  { path: '/lease', component: Lease, name: 'lease' },
  { path: '/hinfo/:id', component: Hinfo, name: 'hinfo', props: true },
  { path: '/plotkeyword', component: PlotKeyword, name: 'plotkeyword' }
]

const router = new VueRouter({
  routes
})

export default router
