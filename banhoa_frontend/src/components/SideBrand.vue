<template>
   <div class="container">
      <div class="box-container">
         <h3 class="title">Voucher khuyến mãi</h3>
         <Splide :options="options" aria-label="My Favorite Images">
            <SplideSlide>
               <img src="../images/brands/voucher1.jpg" alt="Thương hiệu 1" />
            </SplideSlide>
            <SplideSlide>
               <img src="../images/brands/voucher2.jpg" alt="Thương hiệu 2" />
            </SplideSlide>
            <SplideSlide>
               <img src="../images/brands/voucher3.jpg" alt="Thương hiệu 3" />
            </SplideSlide>
            <SplideSlide>
               <img src="../images/brands/voucher4.jpg" alt="Thương hiệu 4" />
            </SplideSlide>
            <SplideSlide>
               <img src="../images/brands/voucher5.jpg" alt="Thương hiệu 5" />
            </SplideSlide>
            <SplideSlide>
               <img src="../images/brands/voucher6.jpg" alt="Thương hiệu 6" />
            </SplideSlide>
            <SplideSlide>
               <img src="../images/brands/voucher7.jpg" alt="Thương hiệu 7" />
            </SplideSlide>
            <SplideSlide>
               <img src="../images/brands/voucher8.jpg" alt="Thương hiệu 8" />
            </SplideSlide>
            <SplideSlide>
               <img src="../images/brands/voucher9.jpg" alt="Thương hiệu 9" />
            </SplideSlide>
            <SplideSlide>
               <img src="../images/brands/voucher10.jpg" alt="Thương hiệu 10" />
            </SplideSlide>
            <SplideSlide>
               <img src="../images/brands/voucher11.jpg" alt="Thương hiệu 11" />
            </SplideSlide>
         </Splide>
      </div>
   </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { defineComponent } from "vue";

export default defineComponent({
   components: {
      Splide,
      SplideSlide,
   },
   setup() {
      const options = {
         perPage: 6,
         perMove: 1,
         gap: 2,
         height: 160,
         rewind: true,
         autoplay: true,
      };

      return { options };
   },
});
</script>

<style scoped>
.container {
   margin: 0 auto;
}

.box-container {
   height: 150px;
   padding: 0 0;
}

.title {
   text-align: center;
   color: #E38B29;
   font-size: 26px;
   font-weight: normal;
   border-bottom: 3px solid #E38B29;
   margin-bottom: 30px;
   padding: 10px 0;
}

.splide__slide {
   height: 45px !important;
   text-align: center;
}
.product-grid {
   height: 180px;
   position: relative;
   vertical-align: top;
   padding: 7px;
   margin-bottom: 15px;
   border: 3px solid transparent;
}
.product-grid .thumb img {
   object-fit: cover;
   height: 150px;
   box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
