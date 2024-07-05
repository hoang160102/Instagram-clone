<template>
  <main-content>
    <div class="container mx-auto p-10">
      <div v-if="user" class="profile flex pb-7 px-10">
        <img
          class="rounded-full w-full h-full"
          src="../assets/avatar/default-avatar.jpg"
          alt=""
        />

        <div class="info-profile w-full px-10">
          <div class="header-profile flex align-center px-10">
            <div class="username text-xl font-medium">{{ user.username }}</div>
            <router-link
              class="ml-5 px-3 rounded-lg py-2 text-gray-100 bg-gray-600 font-medium"
              :to="{ name: 'Edit' }"
              >Edit profile</router-link
            >
          </div>
          <div class="count-num mt-5 w-2/3 justify-between flex px-10">
            <div class="posts flex">
              <div class="num-post font-medium">0</div>
              <span class="ml-1">posts</span>
            </div>
            <div class="followers flex">
              <div class="num-followers font-medium">157</div>
              <span class="ml-1">followers</span>
            </div>
            <div class="following flex">
              <div class="num-following font-medium">170</div>
              <span class="ml-1">following</span>
            </div>
          </div>
          <div class="name mt-5 px-10 font-medium">{{ user.fullName }}</div>
          <div class="bio mb-5 px-10 text-sm">{{ user.bio }}</div>
        </div>
      </div>
      <div class="user-content mt-3 mt-10">
        <div v-if="user" class="nav-content flex justify-center">
          <router-link
            :to="`/${user.username}`"
            class="nav-post mr-7 pt-4 text-sm flex"
          >
            <v-icon>mdi-post-outline</v-icon>
            <span class="ml-1 tracking-wider">POSTS</span>
          </router-link>
          <router-link
            :to="`/${user.username}/saved_post/`"
            class="nav-saved pt-4 text-sm flex"
          >
            <v-icon>mdi-bookmark-outline</v-icon>
            <span class="ml-1 tracking-wider">SAVED</span>
          </router-link>
        </div>
      </div>
      <div class="content mt-5">
        <router-view></router-view>
      </div>
    </div>
  </main-content>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const user = ref(null);
    const getUser = async () => {
      await store.dispatch("auth/auth/getCurrentUser");
      user.value = store.getters["auth/auth/user"];
      console.log(route);
    };
    getUser();
    return {
      user,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}
img {
  border: 2px solid #ccc;
  max-width: 150px;
}
.user-content {
  border-top: 1px solid #ccc;
}

.router-link-exact-active {
  color: black;
  border-top: 1px solid black;
  font-weight: 500;
}
</style>
