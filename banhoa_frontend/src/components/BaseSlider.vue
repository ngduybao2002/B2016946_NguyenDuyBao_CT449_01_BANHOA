<template>
   <div class="slider-box">
      <div class="slider-content">
         <Splide :options="options" aria-label="My Favorite Images">
            <SplideSlide>
               <img src="https://images.pexels.com/photos/5409710/pexels-photo-5409710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sample 3" />
            </SplideSlide>
            <SplideSlide>
               <img src="https://images.pexels.com/photos/103573/pexels-photo-103573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sample 2" />
            </SplideSlide>
            <SplideSlide>
               <img src="https://images.pexels.com/photos/7474935/pexels-photo-7474935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sample 1" />
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
         rewind: true,
         gap: "1rem",
         autoplay: true,
      };

      return { options };
   },
});
</script>

<style scoped>
.splide__slide img {
   width: 100%;
   height: 400px;
   object-fit: cover; /* Bao phủ toàn bộ khung hình */
   display: block;
}
.content {
   margin-top: 5px;
   position: absolute; /* Để đưa nội dung vào trong khung ảnh */
   right: 10px;
   bottom: 20px;
   width: 400px;
   text-align: justify;
   background-color: #333;
   padding: 7px 7px 12px;
   border-radius: 3px;
   opacity: 0.85;
}
.content a {
   text-decoration: none;
   color: white;
   display: inline-block;
   line-height: 24px;
   text-transform: uppercase;
}
</style>
