import { createApp } from 'vue'
import './assets/global.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css'

createApp(App).mount('#app')
app.use(PrimeVue);
