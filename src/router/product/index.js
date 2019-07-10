export default [
  {
    path: '/product',
    component: () => import(/* WebpackChunkName: "product" */ '@/views/product/index.vue')
  }
]
