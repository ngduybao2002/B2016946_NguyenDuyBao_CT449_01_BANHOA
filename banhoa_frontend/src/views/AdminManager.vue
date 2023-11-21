<template>
   <div class="container">
      <AdminNavMenu />
      <ProductList />
      <BaseFooter />
   </div>
</template>

<script>
import AdminNavMenu from "../components/admin/AdminNavMenu.vue";
import ProductList from "./products/ProductList.vue";
import BaseFooter from "../components/BaseFooter.vue";

export default {
   components: {
      AdminNavMenu,
      ProductList,
      BaseFooter
   },
};
</script>

<style scoped>
.container {
   background-color: #fff;
   margin-top: 5px;
   padding: 0px;
}
</style>
