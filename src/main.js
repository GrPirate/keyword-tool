import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
// import store from './store'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './components' // 全局组件自动注册
import {
  Message,
  Container,
  Header,
  Main,
  Row,
  Col,
  Input,
  Tag,
  Card,
  Button
} from 'element-ui'

Vue.component(Message.name, Message)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Tag)
Vue.use(Card)
Vue.use(Button)
Vue.prototype.$message = Message
// Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
