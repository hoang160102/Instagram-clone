import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import LoginAccount from "./components/account/LoginAccount.vue";
import RegisterAccount from "./components/account/RegisterAccount.vue";
import ProfilePage from "./views/ProfilePage.vue";
import UserPosts from './components/layout/user-post/UserPosts.vue'
import SavedPost from "./components/layout/user-post/SavedPost.vue";
import EditProfile from "./views/EditProfile.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
      meta: { title: "Home", requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginAccount,
      meta: { title: "Login", requiresAuth: false },
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterAccount,
      meta: { title: "Register", requiresAuth: false },
    },
    {
      path: "/:username",
      name: 'Profile',
      redirect: '/:username/',
      meta: { title: "Profile", requiresAuth: true },
      component: ProfilePage,
      children: [
        {
          path: "",
          component: UserPosts,
          name: 'All Posts',
          meta: { title: "Profile", requiresAuth: true },
        },
        {
          path: "saved_post",
          name: 'Saved Posts',
          component: SavedPost,
          meta: { title: "Profile", requiresAuth: true },
        },
      ],
    },
    {
      path: '/accounts/edit',
      name: 'Edit',
      component: EditProfile,
      meta: { title: "Edit Profile", requiresAuth: true }
    }
  ],
});

export default router;
