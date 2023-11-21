<template>
    <div class="container">
       <div class="d-flex justify-content-center h-100">
          <div class="card shadow-lg p-3 mb-5 bg-body rounded">
             <div class="card-header text-center">
                <h3>Đăng nhập</h3>
             </div>
             <div class="card-body">
                <form @submit.prevent="login()">
                   <div class="input-group form-group">
                      <div class="input-group-prepend">
                         <span class="input-group-text">
                            <i class="fa-solid fa-envelope"></i>
                         </span>
                      </div>
                      <input
                         type="email"
                         class="form-control"
                         placeholder="Email"
                         @blur="validate()"
                         v-model="user.email"
                         :class="{ 'is-invalid': errors.email }"
                      />
                      <div class="invalid-feedback" v-if="errors.email">
                         {{ errors.email }}
                      </div>
                   </div>
                   <div class="input-group form-group">
                      <div class="input-group-prepend">
                         <span class="input-group-text"
                            ><i class="fas fa-key"></i
                         ></span>
                      </div>
                      <input
                         type="password"
                         class="form-control"
                         placeholder="Mật khẩu"
                         @blur="validate()"
                         v-model="user.password"
                         :class="{ 'is-invalid': errors.password }"
                      />
                      <div class="invalid-feedback" v-if="errors.password">
                         {{ errors.password }}
                      </div>
                   </div>
                   <div class="form-group">
                      <input
                         type="submit"
                         value="Đăng nhập"
                         class="btn login_btn"
                      />
                   </div>
                </form>
             </div>
             <div class="card-footer">
                <div class="d-flex justify-content-center links">
                   <!-- <p>
                      Nếu bạn chưa có tài khoản!
                      <router-link to="/register"><b>ĐĂNG KÝ</b></router-link>
                   </p> -->
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
             email: "",
             password: "",
          },
          user: {
             email: "",
             password: "",
          },
       };
    },
    methods: {
       validate() {
          let isValid = true;
 
          this.errors = {
             email: "",
             password: "",
          };
 
          if (!this.user.email) {
             this.errors.email = "Email là bắt buộc";
             isValid = false;
          }
 
          if (!this.user.password) {
             this.errors.password = "Mật khẩu là bắt buộc";
             isValid = false;
          }
          return isValid;
       },
       async login() {
          if (this.validate()) {
             const userLogin = await UserService.login(this.user);
             const localUserLogin = JSON.stringify(userLogin);
             localStorage.setItem("localUserLogin", localUserLogin);
             
            if (userLogin.role === "admin") {
                this.$router.push({ name: "admin" });
             } else {
               //  alert("Xin lỗi! Bạn không phải là admin");
               Swal.fire({
                        icon: 'error',
                        title: 'Thất bại !',
                        timer: 5000,
                        text: "Xin lỗi! Bạn không phải là admin",
                     });
             }
          }
       },
    },
 };
 </script>
 
 <style scoped>
 .container {
   padding-top: 80px;
   padding-bottom: 261px;
   background-color: pink;
   background-image: url(../images/register_bg_2.png);
   background-size: cover; 
   background-repeat: no-repeat;
 }
 .card {
    height: 400px;
    width: 500px;
 }
 .card-header h3 {
    color: #d10671;
 }
 .card-header{
    background-color: white;
    border-radius: 10px;
 }
 .card{
   height: 350px;
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
 .card-footer{
    background-color: white;
 
 }
 .links {
    color: #d10671;
 }
 .links a {
    margin-left: 4px;
    text-decoration: none;
    color:#d10671;
 }
 </style>
 