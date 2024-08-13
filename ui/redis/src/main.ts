import { createApp } from 'vue';
import './bridge';
import './style/styles.scss';
import App from './App.vue';
import { setupStore } from './store/index';
import { listen } from '@tauri-apps/api/event';
import { setupI18n } from './resources/lang'
const app = createApp(App);
setupStore(app);

app.use(setupI18n)

app.mount('#app');
