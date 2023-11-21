<template>
    <div class="wrapper">
        <div class="header">
            <div class="nav-menu">
                <nav-menu />
            </div>
        </div>
        <div class="container">
            <div class="listcategory">
                <Menu />
            </div>
        </div>
        <BaseFooter />
    </div>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";
import Menu from '../components/Menu.vue';
import BaseFooter from "../components/BaseFooter.vue";
export default {
    name: 'menu',
    components: {
        NavMenu,
        Menu,
        BaseFooter
    }
}
</script>

<style>
.wrapper {
   max-width: 100%;
   background: #fff;
   font-family: "Open Sans", sans-serif;
   padding-top: 5px;
   box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.header {
   width: 100%;
   height: auto;
}
.container {
   width: 100%;
   height: auto;
   margin-top: 5px;
   margin-bottom: 20px;
}
.listcategory {
   width: 100%;
   height: auto;
}
</style>