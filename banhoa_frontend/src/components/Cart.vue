<template>
   <div class="wrapper">
      <div class="header">
         <div class="nav-menu">
            <NavMenu />
         </div>
      </div>
      <div class="container">
         <div class="px-3 py-3 pr-3 mx-auto float-left">
            <span class="btn btn-success">
               Số sản phẩm: {{ products.length }}
            </span>
         </div>
         <div class="px-3 py-3 pr-3 mx-auto float-right">
            <button class="btn btn-success">
               Tổng:
               {{
                  `${totalPrice().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng`
               }}
            </button>
         </div>
         <table class="table table-bordered table-striped table-sm">
            <thead>
               <tr class="table-active text-center">
                  <th scope="col">STT</th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col" class="space-name">Tên sản phẩm</th>
                  <th scope="col" class="space-price">Giá</th>
                  <th scope="col" class="space-amount">Số lượng</th>
                  <th scope="col" class="space-total">Thành tiền</th>
                  <th scope="col" class="space-handle">Xử lý</th>
               </tr>
            </thead>
            <tbody>
               <tr :key="index" v-for="(product, index) in products">
                  <td class="items-center text-center">{{ index + 1 }}</td>
                  <td>
                     <div class="product-img-container">
                        <img class="product-img" :src="product.imgUrl" alt="" />
                     </div>
                  </td>
                  <td class="items-center">
                     {{ product.name }} {{ product.description }}
                  </td>
                  <td class="items-center text-center">
                     {{ product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
                     đồng
                  </td>
                  <td class="items-center text-center"><input class="amount" min="0" type="number" v-model="product.amount"/></td>
                  <td class="items-center text-center">
                     {{
                        `${product.price * product.amount}`.replace(
                           /\B(?=(\d{3})+(?!\d))/g,
                           "."
                        )
                     }}
                     đồng
                  </td>
                  <td class="items-center text-center">
                     <button
                        v-if="product.id"
                        type="button"
                        class="ml-2 btn btn-danger"
                        @click="deleteProductCart(index)"
                     >
                        Xóa
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
         <div class="px-3 py-3 pr-3 mx-auto float-right">
            <button class="btn btn-success" @click="confirmPayment" v-if="products.length > 0">
               Xác nhận thanh toán
            </button>
         </div>
      </div>
      
      <div class="container1" v-if="showInvoice">
         <h1>Hóa đơn</h1>
         <h4>Tổng tiền: {{ totalPrice().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }} đồng</h4>

         <form @submit.prevent="submitInvoice" class="text-center">
            <div class="form-group row">
               <label class="col-sm-3 col-form-label" for="name">Tên:</label>
               <div class="col-sm-9">
                  <input class="form-control" type="text" id="name" v-model="name" readonly>{{ userName }}
               </div>
            </div>

            <div class="form-group row">
               <label class="col-sm-3 col-form-label" for="phone">Số điện thoại:</label>
               <div class="col-sm-9">
                  <input class="form-control" type="tel" id="phone" v-model="phone" required>
               </div>
            </div>

            <div class="form-group row">
               <label class="col-sm-3 col-form-label" for="address">Địa chỉ giao hàng:</label>
               <div class="col-sm-9">
                  <input class="form-control" type="text" id="address" v-model="address" required>
               </div>
            </div>

            <div class="form-group row">
               <label class="col-sm-3 col-form-label" for="address"></label>
               <div class="col-sm-9">
                  <button type="submit" class="button btn btn-primary">Thanh toán</button>
                  &nbsp;
                  <button @click="closeInvoice" class="button btn btn-secondary">Đóng hóa đơn</button>
               </div>
            </div>
         </form>
      </div>

      <div class="footer">
         <BaseFooter />
      </div>
   </div>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";
import BaseFooter from "./BaseFooter.vue";
import Swal from 'sweetalert2';

export default {
   components: {
      NavMenu,
      BaseFooter,
   },
   data() {
      return {
         products: [],
         showInvoice: false,
         name: localStorage.getItem("userName"),
      };
   },
   methods: {
      confirmPayment() {
         localStorage.setItem("totalPrice", this.totalPrice());
         localStorage.setItem('cart', JSON.stringify(this.cart));
         this.showInvoice = true; // Hiển thị hóa đơn khi xác nhận thanh toán
      },

      closeInvoice() {
         this.showInvoice = false; // Đóng hóa đơn khi nút được bấm
      },

      deleteProductCart(index) {
         const filteredProductCart = this.products.filter(
            (product) => product.id != this.products[index].id
         );
         this.products = filteredProductCart;
         const localProductCart = JSON.stringify(filteredProductCart);
         localStorage.setItem("localProductCart", localProductCart);
      },
      totalPrice() {
         let total = 0;
         for (let i = 0; i < this.products.length; i++) {
            total += this.products[i].price * this.products[i].amount;
         }
         return `${total}`;
      },

      submitInvoice(){
         // alert("Thanh toán thành công!");
         Swal.fire({
                        icon: 'success',
                        title: 'Thanh toán thành công!',
                        timer: 5000,
                        text: `Đơn hàng sẽ được giao đến bạn trong thời gian sớm nhất!`,
                     });
         // Xóa toàn bộ dữ liệu trong giỏ hàng
         this.products = [];
         localStorage.removeItem("localProductCart");
      },
   },
   mounted() {
      const listLocalCart = JSON.parse(
         localStorage.getItem("localProductCart") ?? "[]"
      );
      this.products = listLocalCart;
   },
};
</script>
<style scoped>
/* .wrapper {
   max-width: 100%;
   background: #fff;
   font-family: "Open Sans", sans-serif;
   padding-bottom: 50px;
} */
.header {
   width: 100%;
   /* height: 210px; */
   height: auto;
}

.footer {
   margin-top: 100px;
}

.row{
   padding-left: 300px;
   padding-right: 300px;
}

.container1 {
   background-color: #fff;
   margin-top: 100px;
   padding: 0px;
}

h1, h4 {
   text-align: center;
   margin-bottom: 32px;
}

.container {
   background-color: #fff;
   margin-top: 5px;
}

.button {
   display: block;
   width: 50%;
   height: 47px;
}

.amount{
   width: 50px;
}
.product-list {
   padding-bottom: 10px;
}
.product-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.product-img {
   width: 150px;
   height: auto;
}
a {
   text-decoration: none;
}
.button-add {
   color: #fff;
}
.space-price {
   width: 150px;
}
.space-amount {
   width: 100px;
}
.space-total {
   width: 150px;
}
.space-handle {
   width: 150px;
}
.items-center {
   padding-top: 45px;
}
</style>
