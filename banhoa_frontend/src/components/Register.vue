<template>
   <div class="container">
      <div class="d-flex justify-content-center h-100">
         <div class="card shadow-lg p-3 mb-5 bg-body rounded">
            <div class="card-header text-center">
               <h3>Đăng ký tài khoản</h3>
            </div>
            <div class="card-body">
               <form @submit.prevent="register()">
                  <div class="input-group form-group">
                     <div class="input-group-prepend">
                        <span class="input-group-text">
                           <i class="fa-solid fa-user"></i>
                        </span>
                     </div>
                     <input type="text" class="form-control" placeholder="Họ và tên" @blur="validate()"
                        v-model="user.name" :class="{ 'is-invalid': errors.name }" />
                     <div class="invalid-feedback" v-if="errors.name">
                        {{ errors.name }}
                     </div>
                  </div>
                  <div class="input-group form-group">
                     <div class="input-group-prepend">
                        <span class="input-group-text">
                           <i class="fa-solid fa-envelope"></i>
                        </span>
                     </div>
                     <input type="email" class="form-control" placeholder="Email" @blur="validate()" v-model="user.email"
                        :class="{ 'is-invalid': errors.email }" />
                     <div class="invalid-feedback" v-if="errors.email">
                        {{ errors.email }}
                     </div>
                  </div>
                  <div class="input-group form-group">
                     <div class="input-group-prepend">
                        <span class="input-group-text">
                           <i class="fas fa-key"></i>
                        </span>
                     </div>
                     <input type="password" class="form-control" placeholder="Mật khẩu" @blur="validate()"
                        v-model="user.password" :class="{ 'is-invalid': errors.password }" />
                     <div class="invalid-feedback" v-if="errors.password">
                        {{ errors.password }}
                     </div>
                  </div>
                  <div class="input-group form-group">
                     <div class="input-group-prepend">
                        <span class="input-group-text">
                           <i class="fa-solid fa-shield"></i>
                        </span>
                     </div>
                     <input type="password" class="form-control" placeholder="Nhập lại mật khẩu" @blur="validate()"
                        v-model="user.repassword" :class="{ 'is-invalid': errors.repassword }" />
                     <div class="invalid-feedback" v-if="errors.repassword">
                        {{ errors.repassword }}
                     </div>
                  </div>
                  <div class="form-group">
                     <input type="submit" value="Đăng ký" class="btn login_btn" />
                  </div>
               </form>
            </div>
            <div class="card-footer">
               <div class="d-flex justify-content-center links">
                  <p>
                     Đăng nhập ngay!
                     <router-link to="/login"><b>ĐĂNG NHẬP</b></router-link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import UserService from "../services/user.service";
import Swal from 'sweetalert2';

export default {
   data() {
      return {
         errors: {
            name: "",
            email: "",
            password: "",
            repassword: "",
         },
         user: {
            name: "",
            email: "",
            password: "",
            repassword: "",
         },
      };
   },
   methods: {
      validate() {
         let isValid = true;

         this.errors = {
            name: "",
            email: "",
            password: "",
            repassword: "",
         };

         if (!this.user.name) {
            this.errors.name = "Họ và tên là bắt buộc";
            isValid = false;
         }
         if (!this.user.email) {
            this.errors.email = "Email là bắt buộc";
            isValid = false;
         }
         if (!this.user.password) {
            this.errors.password = "Mật khẩu là bắt buộc";
            isValid = false;
         }
         if (this.user.repassword != this.user.password) {
            this.errors.repassword = "Mật khẩu chưa đúng";
            isValid = false;
         }
         return isValid;
      },
      async register() {
         if (this.validate()) {
            try {
               await UserService.create(this.user);
               // alert(
               //    `Chúc mừng ${this.user.name.toUpperCase()} !!! Bạn đã đăng ký tài khoản thành công!`
               // );
               Swal.fire({
                        icon: 'success',
                        title: 'Thành công!',
                        timer: 5000,
                        text: `Chúc mừng ${this.user.name.toUpperCase()} !!! Bạn đã đăng ký tài khoản thành công!`
                     });
               this.$router.push({ name: 'login' });
            } catch (error) {
               console.log(error);
            }
         }
      },
   },
};
</script>

<style scoped>
.container {
   padding-top: 80px;
   padding-bottom: 91px;
   background-color: pink;
   background-image: url(../images/register_bg_2.png);
   background-size: cover; 
   background-repeat: no-repeat;
}

.card {
   height: 520px;
   margin-top: auto;
   margin-bottom: auto;
   width: 500px;
   /* border: 1px solid #E38B29; */
   border-radius: 10px;

}

.social_icon span {
   font-size: 60px;
   margin-left: 10px;
   color: #d10671;
}

.social_icon span:hover {
   color: white;
   cursor: pointer;
}

.card-header h3 {
   color: #d10671;
}

.card-header {
   background-color: white;
   border-radius: 10px;
}

.social_icon {
   position: absolute;
   right: 20px;
   top: -45px;
}

.input-group-prepend span {
   width: 50px;
   background-color: white;
   color: #d10671;
   border: 0 !important;
}

input:focus {
   outline: 0 0 0 0 !important;
   box-shadow: 0 0 0 0 !important;
}

.login_btn {
   color: #d10671;
   border-radius: 20px;
   border: 1px solid #d10671;
   width: 100%;
}

.login_btn:hover {
   color: white;
   background-color: #d10671;
}

.links {
   color: white;
}

.card-footer {
   background-color: white;
   border-radius: 10px;
}

.links {
   color: #d10671;
}

.links a {
   margin-left: 4px;
   text-decoration: none;
   color: #d10671;
}
</style>
