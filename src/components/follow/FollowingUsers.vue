<template>
  <teleport to="body">
    <div
      @click.self="close"
      class="modal flex justify-center align-center z-10 w-screen relative h-screen"
    >
      <div class="container rounded-lg bg-white w-[430px] h-[430px]">
        <div class="modal-header font-semibold text-center py-4">Followers</div>
        <div class="search-input px-4 w-full mt-4">
          <input
            class="w-full rounded-md border-none text-sm px-5 py-2 bg-gray-200 outline-none"
            type="text"
            placeholder="Search"
          />
        </div>
        <div v-if="user" class="list-users h-[305px] overflow-y-scroll mt-4 px-5">
          <div
            v-for="user in listFollowing"
            :key="user.id"
            class="users flex mb-3 justify-between"
          >
            <div class="info-user flex">
              <img
                v-if="user.profilePicture.length === 0"
                class="w-[44px] h-[44px] rounded-full"
                src="../../assets/avatar/default-avatar.jpg" 
                alt=""
              />
              <img
                class="w-[44px] h-[44px] rounded-full"
                v-else
                :src="user.profilePicture"
                alt=""
              />
              <div class="ml-4 text-user">
                <div class="text-sm font-semibold username">{{ user.username }}</div>
                <div class="text-sm text-gray-500 name">{{ user.fullName }}</div>
              </div>
            </div>
            <div @click="unfollow(user.id)" v-if="auth.currentUser.uid !== user.id" class="follow">
              <button v-if="!isFollowing" class="text-sm py-2 rounded-lg px-5 bg-gray-200 font-semibold">
                Following
              </button>
              <button @click="follow(user.id)" v-else class="text-sm rounded-lg py-2 px-5 bg-sky-500 text-white font-semibold">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { computed, ref } from 'vue';
import router from '@/router';
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getAuth } from 'firebase/auth';
export default {
  setup() {
    const auth = getAuth()
    const store = useStore();
    const route = useRoute();
    const username = ref(route.params.username)
    const user = ref(null);
    const allUsers = ref(null);
    const getUser = async (username) => {
      await store.dispatch("users/users/getProfileUser", username);
      await store.dispatch("users/users/getAllUsers");
      user.value = store.state.users.users.profileUser[0];
      allUsers.value = store.state.users.users.allUsers;
    };
    const listFollowing = computed(() => {
      const followingUsers = user.value.following;
      const infoFollowingUsers = followingUsers.map((follow) => {
        return allUsers.value.filter((user) => {
          return user.id === follow;
        });
      });
      return infoFollowingUsers.flat()
    })
    const isFollowing = computed(() => {
      const followingUsers = user.value.following
      return followingUsers.find((user) => {
        return user.id === auth.currentUser.uid
      })
    })
    const follow = async (id) => {
      await store.dispatch('users/users/follow', id)
      await refreshUser();
    }
    const unfollow = async (id) => {
      await store.dispatch('users/users/unfollow', id)
      await refreshUser();
    }
    const refreshUser = async () => {
      await getUser(username.value);
    };
    getUser(username.value)
    const close = (() => {
      router.back()
    })
    return {
      close,
      listFollowing,
      user,
      isFollowing,
      auth,
      unfollow,
      follow
    }
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.6);
}
.modal-header {
  border-bottom: 1px solid #ccc;
}
</style>
