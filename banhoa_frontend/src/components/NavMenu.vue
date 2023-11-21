<template>
   <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>

         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
               <li class="nav-item active">
                  <router-link to="/" class="nav-link">Home
                     <i class="fa-solid fa-house"></i>
                  </router-link>
               </li>
               <!-- <li class="nav-item dropdown">
                  <router-link to="/menu" class="nav-link">Menu
                     
                  </router-link>
               </li> -->
               <li class="nav-item">
                  <router-link to="/contact" class="nav-link">
                     Liên hệ
                  </router-link>
               </li>
            </ul>
            <ul class="navbar-nav ">
               <li class="nav-item ">
                  <router-link to="/cart" class="nav-link">
                     Giỏ hàng
                     <i class="fa-solid fa-cart-shopping"></i>
                     {{ localCarts.length }}
                  </router-link>
               </li>
               
               <li class="nav-item" v-if="this.localUser.role === 'admin'">
                  <router-link to="/adminpage" class="nav-link">
                     Quản lý
                  </router-link>
               </li>

               <li class="nav-item" >
                  <router-link to="/login" class="nav-link" @click="handleLogout">
                     <b>{{ this.localUser.name }}</b>
                     <button class="btn logout-btn">
                        <i class="fa-solid fa-user"></i>
                     </button>
                  </router-link>
               </li>
            </ul>
         </div>
      </nav>
   </div>
</template>

<script>
export default {
   data() {
      return {
         localUser: {},
         localCarts: {},
      };
   },
   methods: {
      handleLogout() {
         localStorage.removeItem("localUserLogin");
      },
   },
   mounted() {
      const user = JSON.parse(localStorage.getItem("localUserLogin"));
      this.localUser = user;
      const localProductCart = JSON.parse(
         localStorage.getItem("localProductCart") ?? "[]"
      );
      this.localCarts = localProductCart;
   },
};
</script>

<style scoped>
.container {
   max-width: 100%;
   padding: 0px;
}

.navbar {
   background-color: #d10671;
}

.navbar .nav-item {
   color: #d10671;
   position: relative;
}

.navbar .nav-item a {
   font-family: "Open Sans", sans-serif;
   color: #fff !important;
   text-align: left;
   font-size: 16px;
}

.navbar .nav-item a:hover {
   color: #fff !important;
   background-color: green;
   border-radius: 10px;
   box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.nav-item ul li a {
   display: flex;
   text-align: left;
}

.dropdown-menu {
   width: 1031px;
}

.dropdown-menu ul {
   position: relative;
   z-index: 500;
   left: -15px;
   right: 0;
   list-style: none;
   padding-left: 0px;
   margin-left: 0;
}

.nav-item:hover .dropdown-menu {
   display: block;
}

.logout-btn {
   width: 30px;
   height: auto;
   padding: 0px !important;
   margin-top: -5px;
   margin-left: 5px;
}

.admin-btn {
   width: 30px;
   height: auto;
   padding: 0px !important;
   margin-top: -5px;
}
@media screen and (max-width: 1023px) {
   .admin-btn{
      visibility: hidden;
   }
}


i {
   color: #fff;
}
</style>


