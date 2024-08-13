import { createApp } from 'vue';
import './bridge';
import './style/styles.scss';
import App from './App.vue';
import { setupStore } from './store/index';
// import { download } from '@tauri-apps/plugin-mysql';
const app = createApp(App);
setupStore(app);
app.mount('#app');
