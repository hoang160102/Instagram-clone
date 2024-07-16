import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue";
import LoginAccount from "./components/account/LoginAccount.vue";
import RegisterAccount from "./components/account/RegisterAccount.vue";
import ProfilePage from "./views/ProfilePage.vue";
import UserPosts from './components/layout/user-post/UserPosts.vue'
import SavedPost from "./components/layout/user-post/SavedPost.vue";
import EditProfile from "./views/EditProfile.vue"
import FollowingUsers from './components/follow/FollowingUsers.vue'
import FollowerUsers from "./components/follow/FollowerUsers.vue";
import app from "./firebaseInit";
import { getAuth } from "firebase/auth";
const auth = getAuth(app)

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
      redirect: '/:username',
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
        { 
          path: "following",
          name: 'Following',
          component: FollowingUsers,
          meta: { title: "Following", requiresAuth: true}
        },
        {
          path: "followers",
          name: 'Followers',
          component: FollowerUsers,
          meta: { title: "Followers", requiresAuth: true }
        }
      ],
    },
    {
      path: '/accounts/edit',
      name: 'Edit',
      component: EditProfile,
      meta: { title: "Edit Profile", requiresAuth: true }
    }
  ],
  scrollBehavior(to, from, savedPos) {
    if (savedPos) {
      return savedPos;
    }
    return { left: 0, top: 0 };
  },
});
router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | Netflix`;
  const loggedIn = !!auth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !loggedIn) router.push({name: 'Login'});
  else if (!requiresAuth && loggedIn) next({name: 'Home'});
  else {
    next();
    return
  }
});

export default router;
