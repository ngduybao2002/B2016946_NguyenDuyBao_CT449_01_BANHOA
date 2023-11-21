<template>
   <div class="container">
      <AdminNavMenu />
      <div class="product-list">
         <form
            class="px-3 py-3 pr-3 mx-auto float-left form-inline my-2 my-lg-0"
         >
            <input
               class="form-control mr-sm-2"
               type="search"
               placeholder="Tìm kiếm theo tên"
               aria-label="Search"
               v-model="searchText"
            />
            <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
               <i class="fas fa-search"></i>
            </button> -->
         </form>
         <div class="px-3 py-3 mx-auto float-right">
            <button
               type="button"
               class="btn btn-danger"
               @click="removeAllUsers">
               <i class="fas fa-trash"></i>
               Xóa tất cả
            </button>
         </div>
         <div class="container">
            <table class="table table-bordered table-striped">
               <thead>
                  <tr class="table-active text-center">
                     <th scope="col" class="space-role">Vai trò</th>
                     <th scope="col" class="space-name">Tên</th>
                     <th scope="col" class="space-email">Email</th>
                     <th scope="col" class="space-time">Ngày tạo/Cập nhật</th>
                     <th scope="col" class="space-handle">Xử lý</th>
                  </tr>
               </thead>
               <div v-if="filteredUsersCount > 0"></div>
               <p class="non-user" v-else>Không có tài khoản nào</p>
               <tbody class="text-center">
                  <tr :key="index" v-for="(user, index) in filteredUsers">
                     <th>{{ user.role }}</th>
                     <td>{{ user.name }}</td>
                     <td>{{ user.email }}</td>
                     <td>{{ time(user.createdAt) }}</td>
                     <td>
                        <button
                           type="button"
                           class="btn btn-danger"
                           @click="deleteUser(user._id)"
                        >
                           Xóa
                        </button>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
      <BaseFooter />
   </div>
</template>

<script>
import UserService from "../../services/user.service";
import AdminNavMenu from "../../components/admin/AdminNavMenu.vue";
import BaseFooter from "../../components/BaseFooter.vue";
import Swal from 'sweetalert2';

export default {
   components: {
       AdminNavMenu,
       BaseFooter,
    },
   data() {
      return {
         users: [],
         searchText: "",
      };
   },
   computed: {
      userStrings() {
         return this.users.map((user) => {
            const { email } = user;
            return [email].join("");
         });
      },
      filteredUsers() {
         if (!this.searchText) return this.users;
         return this.users.filter((_user, index) =>
            this.userStrings[index].includes(this.searchText)
         );
      },
      filteredUsersCount() {
         return this.filteredUsers.length;
      },
   },
   methods: {
      async getAllUser() {
         try {
            this.users = await UserService.getAll();
         } catch (error) {
            console.log(error);
         }
      },
      async deleteUser(UserId) {
         const confirmation = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn muốn xóa Tài khoản này?',
            icon: 'warning',
            timer: 5000,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
         });
         
         if (confirmation.isConfirmed) {
            try {
               await UserService.delete(UserId);
               await Swal.fire({
                  icon: 'success',
                  title: 'Thành công!',
                  timer: 5000,
                  text: 'Tài khoản đã được xóa thành công.',
               });
               this.$router.push({ name: "user.list" });
               this.getAllUser();
            } catch (error) {
               console.log(error);
            }
         }
      },
      async removeAllUsers() {
         const confirmation = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn muốn xóa tất cả tài khoản?',
            timer: 5000,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
         });

         if (confirmation.isConfirmed) {
            try {
               await UserService.deleteAll();
               await Swal.fire({
                  icon: 'success',
                  title: 'Thành công!',
                  timer: 5000,
                  text: 'Tất cả tài khoản đã được xóa.',
               });
               // Sử dụng tên định danh đúng để chuyển hướng người dùng
               this.$router.push({ name: "user.list" });
               this.getAllUser();
            } catch (error) {
               console.log(error);
            }
         }
      },
      time(timestamp) {
         const date = new Date(timestamp);
         return date.toLocaleString();
      },
   },
   created() {
      this.getAllUser();
   },
};
</script>

<style scoped>
.container {
   background-color: #fff;
   padding-bottom: auto;
   margin-top: 10px;
}
.product-list {
   padding-bottom: 10px;
}
.space-handle {
   width: 150px;
}
product-img {
   width: 150px;
   height: auto;
}
a {
   text-decoration: none;
}
.button-add {
   color: #fff;
}
.non-user {
   margin-left: 10px;
   margin-top: 15px;
   font-size: 20px;
   font-weight: bold;
   color: blue;
}
</style>
