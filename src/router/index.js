import Vue from 'vue'
import VueRouter from 'vue-router'
import Blog from '../components/pages/blog/_Page'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Blog",
    component: Blog,
  },
  // {
  //   path: "/blog/category",
  //   name: "category",
  //   component: "",
  // },
  {
    path: "/product",
    name: "Product",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/pages/product/_Page"
      ),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/pages/contact/_Page"
      ),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/pages/profile/_Page"
      ),
  },
  {
    path: "*",
    component: Blog
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
