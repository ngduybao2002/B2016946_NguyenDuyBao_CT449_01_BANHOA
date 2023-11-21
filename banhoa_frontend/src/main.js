import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@splidejs/vue-splide/css';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import CSS của SweetAlert2
import Swal from 'sweetalert2'; // Import SweetAlert2

const app = createApp(App);

app.use(router);

// Vue Global Property: Sử dụng SweetAlert2 như một thuộc tính toàn cục của Vue
app.config.globalProperties.$swal = Swal;

app.mount('#app');

/* Show the button when scrolled 100px from the top */
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
       document.getElementById("scrollToTopButton").style.display = "block";
    } else {
       document.getElementById("scrollToTopButton").style.display = "none";
    }
};
