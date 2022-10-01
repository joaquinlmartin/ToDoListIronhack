import { createApp } from 'vue';
import './index.css';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTrash, faPenToSquare, faCircleCheck, faHourglassStart, faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router/index';
import App from './App.vue';

library.add(faTrash, faPenToSquare, faCircleCheck, faHourglassStart, faCircleXmark);

const pinia = createPinia();

createApp(App).use(router).use(pinia).component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
