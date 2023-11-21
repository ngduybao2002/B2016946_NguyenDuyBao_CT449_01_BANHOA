import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  //Login
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
  },
  //Register
  {
    path: "/register",
    name: "register",
    component: () => import("../components/Register.vue"),
  },
  //Admin
  {
    path: "/admin",
    name: "loginadmin",
    component: () => import("../components/loginAdmin.vue"),
  },
  //Home
  {
    path: "/",
    name: "home",
    component: Home,
  },
  //menu

  //Quản lý sản phẩm
  {
    path: "/product",
    name: "product.list",
    component: () => import("../views/products/ProductList.vue"),
  },
  {
    path: "/product/create",
    name: "product.create",
    component: () => import("../views/products/ProductForm.vue"),
  },
  {
    path: "/product/edit/:id",
    name: "product.edit",
    component: () => import("../views/products/EditProductForm.vue"),
  },
  //Quản lý tài khoản
  {
    path: "/user",
    name: "user.list",
    component: () => import("../views/users/UserList.vue"),
  },
  {
    path: "/:pathMatch(.*)*", //regular expression
    name: "error",
    component: () => import("../views/Error.vue"),
  },
  //Liên hệ
  {
    path: "/contact",
    name: "contact",
    component: () => import("../components/Contact.vue"),
  },

  //Giỏ hàng
  {
    path: "/cart",
    name: "cart",
    component: () => import("../components/Cart.vue"),
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import("../views/Menu.vue"),
  },
  {
    path: "/adminpage",
    name: "admin",
    component: () => import("../views/AdminManager.vue"),
  },
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//kiem tra truoc khi dang nhap
router.beforeEach((to, from, next) => {
  const authToken = localStorage.getItem("localUserLogin");
  if (to.name === "admin" && !authToken) {
    next({ name: "loginadmin" });
  } else {
    next();
  }
});

export default router;
