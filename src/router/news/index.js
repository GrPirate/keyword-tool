export default [
  {
    path: '/news',
    component: () => import(/* WebpackChunkName: "news" */ '@/views/news/index.vue')
  }
]
