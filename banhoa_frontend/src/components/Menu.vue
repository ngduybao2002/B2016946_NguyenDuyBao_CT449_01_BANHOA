<template>
      <div class="container">
         <div class="row">
            <div id="content" class="col-sm-12 page">
               <div class="header-content flex-row-reverse">
                  <form class="pricing-header px-3 py-3 pr-3 mx-auto float-left form-inline my-2 my-lg-0">
                     <input class="form-control mr-sm-2" type="search" placeholder="Tìm kiếm theo tên" aria-label="Search"
                        v-model="searchText" />
                     <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                        <i class="fas fa-search"></i>
                     </button> -->
                  </form>
               </div>
               <div class="row product-category">
                  <div v-if="filteredProductsCount > 0"></div>
                  <p class="non-product" v-else>Không có sản phẩm nào</p>
                  <div class="product-grid col-lg-3" :key="index" v-for="(product, index) in filteredProducts">
                     <div class="thumb">
                        <div class="image">
                           <!-- Thêm sự kiện click vào thẻ a -->
                           <a href="#" @click.prevent="addProductToCart(index)">
                              <img :src="product.imgUrl" alt="Sản phẩm" />
                           </a>
                        </div>
                        <div class="caption">
                           <h4>
                              <!-- Thêm sự kiện click vào thẻ a -->
                              <a href="#" @click.prevent="addProductToCart(index)" class="product-name">
                                 <b>{{ product.name }}</b>
                                 <br />
                                 {{ product.description }}
                              </a>
                           </h4>
                           <p class="price">
                              {{
                                 product.price.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                              }}
                              đồng
                           </p>
                        </div>
                        <div class="botton-cart">
                           <button class="btn-cart" @click="addProductToCart(index)">
                              Thêm vào giỏ
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
</template>

<script>
import ProductService from "../services/product.service";
import Swal from 'sweetalert2';

export default {
   data() {
      return {
         products: [],
         searchText: "",
      };
   },

   computed: {
      productStrings() {
         return this.products.map((product) => {
            const { name, description } = product;
            return [name, description].join("");
         });
      },
      filteredProducts() {
         const productsFromFifth = this.products.slice(4);
         if (!this.searchText) return productsFromFifth;
         return productsFromFifth.filter((product) =>
            [product.name, product.description].join("").includes(this.searchText)
         );
      },
      
      filteredProductsCount() {
         return this.filteredProducts.length;
      },
   },
   methods: {
      async getAllProduct() {
         try {
            this.products = await ProductService.getAll();
         } catch (error) {
            console.log(error);
         }
      },
      async addProductToCart(index) {
         if (!this.isLoggedIn) {
            // Hiển thị thông báo yêu cầu đăng nhập
            Swal.fire({
               icon: 'info',
               title: 'Thông báo',
               text: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.',
               timer: 5000,
            });
            return;
         }

         const saveLocalCart = JSON.parse(
            localStorage.getItem("localProductCart") ?? "[]"
         );

         // Kiểm tra giỏ hàng và thêm sản phẩm
         for (const item of saveLocalCart) {
            if (item.id === this.products[index]._id) {
               item.amount++;
               const localProductCart = JSON.stringify(saveLocalCart);
               localStorage.setItem("localProductCart", localProductCart);

               Swal.fire({
                  icon: 'success',
                  title: 'Thành công!',
                  timer: 5000,
                  text: `Số lượng sản phẩm ${this.products[index].name} đã được cập nhật`,
               });
               return;
            }
         }

         const temp = {
            id: this.products[index]._id,
            name: this.products[index].name,
            imgUrl: this.products[index].imgUrl,
            price: this.products[index].price,
            description: this.products[index].description,
            amount: 1,
         };

         saveLocalCart.push(temp);
         const localProductCart = JSON.stringify(saveLocalCart);
         localStorage.setItem("localProductCart", localProductCart);

         Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            timer: 5000,
            text: `Sản phẩm ${this.products[index].name} vừa được thêm vào giỏ hàng`,
         });
      },
   },

   created() {
      this.getAllProduct();
      
      const localUserLogin = localStorage.getItem("localUserLogin");
      this.isLoggedIn = localUserLogin !== null;
   },
};
</script>

<style scoped>

.row {
   padding-top: 0px;
   /* padding: 0px; */
}

#content {
   min-height: 400x;
}


.product-category {
   padding-top: 25px;
}

.header-content {
   display: flex;
   padding: 10px 0px 10px 0px;
   border-bottom: 3px solid #d10671;
   font-weight: normal;
   font-size: 22px;
}
.page{
   padding: 0px;
}

.non-product {
   margin-left: 450px;
   margin-top: 15px;
   font-size: 20px;
   font-weight: bold;
   color: #d10671;
}

.product-grid {
   height: 300px;
   position: relative;
   text-align: center;
   vertical-align: top;
   padding: 7px;
   margin-bottom: 30px;
   border: 3px solid transparent;
}

.product-grid .thumb img {
   object-fit: cover;
   height: 150px;
}

.product-grid .thumb .caption h4 a {
   font-size: 13px;
   line-height: 22px;
   text-decoration: none;
   padding: 5px;
   color: #d10671;
   margin: 0 auto;
   width: 100%;
   overflow: hidden;
   text-overflow: ellipsis;
   -webkit-line-clamp: 2;
   display: block;
   -webkit-box-orient: vertical;
}

.product-grid:hover {
   transform: scale(1.2);
}

.price {
   color: #ff0000;
   font-weight: bold;
}

.botton-cart {
   position: absolute;
   bottom: 0;
   left: calc(50% - 55px);
}

.btn-cart {
   background-color: #d10671;
   color: #fff;
   border: 0;
   border-radius: 3px;
}

.btn-cart:hover {
   background-color: green;
}
</style>
