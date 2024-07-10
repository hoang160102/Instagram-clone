<template>
  <main-content>
    <div class="container mx-auto p-10">
      <div v-if="user" class="profile flex pb-7 px-10">
        <img
          class="rounded-full user-img"
          v-if="user.profilePicture.length > 0"
          :src="user.profilePicture"
          alt=""
        />
        <img
          v-else
          class="rounded-full w-full h-full"
          src="../assets/avatar/default-avatar.jpg"
          alt=""
        />
        <div class="info-profile w-full px-10">
          <div class="header-profile flex align-center px-10">
            <div class="username text-xl font-medium">{{ user.username }}</div>
            <router-link
              v-if="isCurrentUser"
              class="ml-5 px-3 rounded-lg py-2 text-gray-100 bg-gray-600 font-medium"
              :to="{ name: 'Edit' }"
              >Edit profile</router-link
            >
            <button
              v-if="!isCurrentUser && !isFollow"
              @click="followUser"
              class="ml-5 px-6 rounded-lg py-2 text-white bg-sky-500 font-medium"
            >
              <span v-if="!loading">Follow</span>
              <v-progress-circular
                v-else
                color="primary"
                indeterminate
              ></v-progress-circular>
            </button>
            <button
              v-if="!isCurrentUser && isFollow"
              @click="unfollowUser"
              class="ml-5 px-6 rounded-lg py-2 text-white bg-sky-500 font-medium"
            >
              <span v-if="!loading">Unfollow</span>
              <v-progress-circular
                v-else
                color="primary"
                indeterminate
              ></v-progress-circular>
            </button>
          </div>
          <div class="count-num mt-5 w-2/3 justify-between flex px-10">
            <div class="posts flex">
              <div class="num-post font-medium">0</div>
              <span class="ml-1">posts</span>
            </div>
            <div class="followers flex">
              <div class="num-followers font-medium">
                {{ user.followers.length }}
              </div>
              <span class="ml-1">followers</span>
            </div>
            <div class="following flex">
              <div class="num-following font-medium">
                {{ user.following.length }}
              </div>
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getAuth } from "firebase/auth";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const auth = getAuth();
    const user = ref(null);
    const loading = ref(false);
    const getUser = async () => {
      await store.dispatch("users/users/getProfileUser", route.params.username);
      user.value = store.state.users.users.profileUser[0];
    };
    const isCurrentUser = computed(() => {
      return auth.currentUser.uid === user.value.id;
    });
    const isFollow = computed(() => {
      return user.value.followers.includes(auth.currentUser.uid);
    });
    const followUser = async () => {
      loading.value = true;
      await store.dispatch("users/users/follow", user.value.id);
      await refreshUser();
      loading.value = false;
    };
    const unfollowUser = async () => {
      loading.value = true;
      await store.dispatch("users/users/unfollow", user.value.id);
      await refreshUser();
      loading.value = false;
    };
    const refreshUser = async () => {
      await getUser();
    };

    getUser();
    return {
      user,
      isCurrentUser,
      isFollow,
      loading,
      followUser,
      unfollowUser,
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
.user-img {
  min-width: 150px;
  max-height: 150px;
}
.user-content {
  border-top: 1px solid #ccc;
}

.router-link-exact-active {
  color: black;
  border-top: 1px solid black;
  font-weight: 500;
}

.v-progress-circular {
  width: 18px;
  height: 18px;
}
</style>
