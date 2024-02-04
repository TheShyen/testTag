import { createApp } from 'vue'
import App from './App.vue'
import {key, store} from "./stores/AppStore.ts";

createApp(App).use(store, key).mount('#app')
