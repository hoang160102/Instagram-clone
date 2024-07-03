<template>
  <div class="right mt-10 h-screen">
    <div v-if="user" class="user flex align-center justify-between">
      <router-link :to="{ name: 'Profile', params: { username: user.username } }" class="info flex align-center">
        <img src="../../../assets/avatar/default-avatar.jpg" alt="" />
        <div class="user-info ml-3">
          <div class="username font-semibold text-sm">{{ user.username }}</div>
          <div class="name text-sm text-gray-500">{{ user.fullName }}</div>
        </div>
      </router-link>
      <div @click="signOut" class="logout text-sm text-cyan-500 font-semibold cursor-pointer">
        Logout
      </div>
    </div>
    <div class="suggest mt-5">
      <div class="suggest-title flex justify-between">
        <span class="text-sm text-gray-500 font-semibold"
          >Suggested for you</span
        >
        <div class="see-all text-sm cursor-pointer text-gray-800 font-medium">
          See All
        </div>
      </div>
      <div class="other-user">
        <div class="other mt-4 flex align-center justify-between">
          <div class="info flex align-center">
            <img src="../../../assets/avatar/default-avatar.jpg" alt="" />
            <div class="user-info ml-3">
              <div class="username font-semibold text-sm">_viet_hoang</div>
              <div class="name text-sm text-gray-500">Nguyen Viet Hoang</div>
            </div>
          </div>
          <div
            class="logout text-cyan-500 text-sm font-semibold cursor-pointer"
          >
            Follow
          </div>
        </div>
        <div class="other mt-4 flex align-center justify-between">
          <div class="info flex align-center">
            <img src="../../../assets/avatar/default-avatar.jpg" alt="" />
            <div class="user-info ml-3">
              <div class="username font-semibold text-sm">_viet_hoang</div>
              <div class="name text-sm text-gray-500">Nguyen Viet Hoang</div>
            </div>
          </div>
          <div
            class="logout text-cyan-500 text-sm font-semibold cursor-pointer"
          >
            Follow
          </div>
        </div>
        <div class="other mt-4 flex align-center justify-between">
          <div class="info flex align-center">
            <img src="../../../assets/avatar/default-avatar.jpg" alt="" />
            <div class="user-info ml-3">
              <div class="username font-semibold text-sm">_viet_hoang</div>
              <div class="name text-sm text-gray-500">Nguyen Viet Hoang</div>
            </div>
          </div>
          <div
            class="logout text-cyan-500 text-sm font-semibold cursor-pointer"
          >
            Follow
          </div>
        </div>
        <div class="other mt-4 flex align-center justify-between">
          <div class="info flex align-center">
            <img src="../../../assets/avatar/default-avatar.jpg" alt="" />
            <div class="user-info ml-3">
              <div class="username font-semibold text-sm">_viet_hoang</div>
              <div class="name text-sm text-gray-500">Nguyen Viet Hoang</div>
            </div>
          </div>
          <div
            class="logout text-cyan-500 text-sm font-semibold cursor-pointer"
          >
            Follow
          </div>
        </div>
        <div class="other mt-4 flex align-center justify-between">
          <div class="info flex align-center">
            <img src="../../../assets/avatar/default-avatar.jpg" alt="" />
            <div class="user-info ml-3">
              <div class="username font-semibold text-sm">_viet_hoang</div>
              <div class="name text-sm text-gray-500">Nguyen Viet Hoang</div>
            </div>
          </div>
          <div
            class="logout text-cyan-500 text-sm font-semibold cursor-pointer"
          >
            Follow
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const user = ref(null);
    const fetchData = async () => {
      await store.dispatch("auth/auth/getCurrentUser");
      user.value = store.getters['auth/auth/user']
    }
    const signOut = async () => {
      await store.dispatch('auth/auth/logout')
    }
    fetchData()
    return {
      user,
      signOut
    };
  },
};
</script>

<style scoped>
.right {
  width: 370px;
  padding-left: 64px;
}

img {
  width: 44px;
  border-radius: 50%;
  border: 1px solid #ccc;
}
</style>
