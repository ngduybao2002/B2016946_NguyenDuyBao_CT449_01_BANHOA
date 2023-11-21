<template>
   <div class="container">
      <router-view />
      <button @click="scrollToTop" id="scrollToTopButton" class="scroll-to-top">↑</button>
   </div>
</template>

<script>
export default {
   methods: {
      scrollToTop() {
         window.scrollTo({
            top: 0,
            behavior: "smooth"
         });
      }
   }
};
</script>

<style scoped>
.container{
   max-width: 100%;
   padding: 0px;
}

.scroll-to-top {
   position: fixed;
   bottom: 20px;
   right: 20px;
   background: green;
   color: white;
   border: none;
   border-radius: 50%;
   width: 50px;
   height: 50px;
   text-align: center;
   line-height: 50px;
   font-size: 24px;
   cursor: pointer;
   display: none;
}

.scroll-to-top:hover {
   background: rgb(54, 153, 54);
}

</style>
