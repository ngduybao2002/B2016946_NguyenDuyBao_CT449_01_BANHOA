<template>
   <div class="wrapper">
      <div class="header">
         <div class="nav-menu">
            <NavMenu />
         </div>
         <div class="container text-center">
            <h5>
               Không thể tìm thấy trang. Trở về
               <router-link to="/home"><b>Trang chủ.</b></router-link>
            </h5>
         </div>
      </div>
   </div>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";

export default {
   components: {
      NavMenu,
   },
};
</script>

<style scoped>
.wrapper {
   max-width: 100%;
   background: #fff;
   font-family: "Open Sans", sans-serif;
   padding-bottom: 150px;
}
.header {
   width: 100%;
   /* height: 210px; */
   height: auto;
}
.container {
   background-color: #fff;
   margin-top: 20px;
}
</style>
