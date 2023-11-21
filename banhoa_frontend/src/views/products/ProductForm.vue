<template>
   <div class="container">
      <AdminNavMenu />
      <div class="product-info">
         <!-- <div class="pricing-header px-3 py-3 pr-3 mx-auto text-center">
            <button type="button" class="btn btn-info">
               <router-link to="/adminpage" class="button-add">
                  <i class="fa-solid fa-circle-left"></i>
                  Quay lại
               </router-link>
            </button>
         </div> -->

         <div class="container">
            <div>
               <h1>Thêm sản phẩm</h1>
            </div>
            <form @submit.prevent="save()">
               <!-- .prevent: để khi nhấn vào Save không load lại trang -->
               <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">Tên sản phẩm</label>
                  <div class="col-sm-9">
                     <input type="text" class="form-control" @blur="validate()" v-model="product.name"
                        :class="{ 'is-invalid': errors.name }" />
                     <!-- sử dụng v-model để lấy thông tin từ input
                            sử dụng @blur để khi không nhập gì, không cần nhấn Save vẫn thông báo lỗi 
                            sử dụng v-bind:class để thêm class is-invalid vào ô input sau khi nhấn Save (Hiện khung đỏ)
                        -->
                     <div class="invalid-feedback" v-if="errors.name">
                        {{ errors.name }}
                     </div>
                  </div>
               </div>
               <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">Hình ảnh</label>
                  <div class="col-sm-9">
                     <input type="text" class="form-control" @blur="validate()" v-model="product.imgUrl"
                        :class="{ 'is-invalid': errors.imgUrl }" />
                     <div class="invalid-feedback" v-if="errors.imgUrl">
                        {{ errors.imgUrl }}
                     </div>
                  </div>
               </div>
               <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">Giá sản phẩm</label>
                  <div class="col-sm-9">
                     <input type="text" class="form-control" @blur="validate()" v-model="product.price"
                        :class="{ 'is-invalid': errors.price }" />
                     <div class="invalid-feedback" v-if="errors.price">
                        {{ errors.price }}
                     </div>
                  </div>
               </div>
               <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">Mô tả sản phẩm</label>
                  <div class="col-sm-9">
                     <textarea class="form-control" row="3" @blur="validate()" v-model="product.description"
                        :class="{ 'is-invalid': errors.description }">
                        </textarea>
                     <div class="invalid-feedback" v-if="errors.description">
                        {{ errors.description }}
                     </div>
                  </div>
               </div>
               <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label"></label>
                  <div class="col-sm-9">
                     <button type="submit" class="btn btn-primary">Lưu</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
      <div class="footer">
         <BaseFooter />
      </div>
   </div>
</template>

<script>
import ProductService from "../../services/product.service";
import AdminNavMenu from "../../components/admin/AdminNavMenu.vue";
import BaseFooter from "../../components/BaseFooter.vue";
import Swal from 'sweetalert2';

export default {
   components: {
      AdminNavMenu,
      BaseFooter
   },
   data() {
      return {
         errors: {
            name: "",
            imgUrl: "",
            price: "",
            description: "",
         },
         product: {
            name: "",
            imgUrl: "",
            price: "",
            description: "",
         },
      };
   },
   methods: {
      validate() {
         let isValid = true;

         this.errors = {
            name: "",
            imgUrl: "",
            price: "",
            description: "",
         };

         if (!this.product.name) {
            this.errors.name = "Tên sản phẩm là bắt buộc";
            isValid = false;
         }
         if (!this.product.imgUrl) {
            this.errors.imgUrl = "Hình ảnh sản phẩm là bắt buộc";
            isValid = false;
         }
         if (!this.product.price) {
            this.errors.price = "Giá sản phẩm là bắt buộc";
         } else if (!this.isNumber(this.product.price)) {
            this.errors.price = "Tên sản phẩm phải là số";
            isValid = false;
         }

         if (!this.product.description) {
            this.errors.description = "Mô tả sản phẩm là bắt buộc";
            isValid = false;
         }
         return isValid;
      },
      isNumber(value) {
         return /^\d*$/.test(value);
      },
      async save() {
         if (this.validate()) {
            try {
               if (this.$route.params.id) {
                  await ProductService.update(this.$route.params.id, this.product);
               } else {
                  await ProductService.create(this.product);
               }

               // Sử dụng SweetAlert2 cho thông báo thành công
               await Swal.fire({
                  icon: 'success',
                  title: 'Thành công!',
                  timer: 5000,
                  text: `Sản phẩm ${this.product.name} đã được lưu thành công.`,
               });

               // Chuyển hướng sau khi thêm sản phẩm thành công
               this.$router.push({ name: 'admin' });
            } catch (error) {
               console.log(error);
            }
         }
      },
      async getProduct(productId) {
         try {
            this.product = await ProductService.get(productId);
         } catch (error) {
            console.log(error);
         }
      },
   },
   created() {
      let productId = this.$route.params.id;
      if (productId) {
         this.getProduct(productId);
      }
   },
};
</script>
<style scoped>
.container {
   background-color: #fff;
   margin-top: 10px;
}

h1 {
   text-align: center;
   margin-bottom: 32px;
}

a {
   text-decoration: none;
}

.footer {
   margin-top: 104px;
}

.button-add {
   color: #fff;
}
</style>
