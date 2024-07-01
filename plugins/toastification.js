import Vue from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {
  position: 'top-right',
  toastOptions: {
    enterClass: 'toast-enter',
    leaveClass: 'toast-leave',
    progressClass: 'toast-progress',
  },
};

Vue.use(Toast, options);
