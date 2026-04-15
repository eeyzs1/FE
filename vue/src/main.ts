import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import GlobalButton from './components/GlobalButton.vue'
import './style.css'
import './assets/lesson-base.css'

const app = createApp(App)

app.component('GlobalButton', GlobalButton)

app.use(createPinia()).use(router).mount('#app')
