import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import registerStore from './store'
import registerIcons from './global/regsiter-icons'

const app = createApp(App)
app.use(registerStore)
app.use(router)
//全局注册element-plus的icon
app.use(registerIcons)

app.mount('#app')
