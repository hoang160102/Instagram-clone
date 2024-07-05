<template>
    <div v-if="user" class="logo">
      <div class="brand py-5 px-3 text-2xl mb-6">Instagram</div>
      <v-icon size="30" class="logo-insta py-5 px-3 text-2xl mb-6">mdi-instagram</v-icon>
    </div>
    <div class="navigation px-3">
      <router-link :to="{ name: 'Home'}" class="nav home mb-6 flex align-center">
        <v-icon size="30">mdi-home-variant-outline</v-icon>
        <span class="ml-4 text-lg">Home</span>
      </router-link>
      <div class="nav home mb-6 flex align-center">
        <v-icon size="30">mdi-magnify</v-icon>
        <span class="ml-4 text-lg">Search</span>
      </div>
      <div class="nav message mb-6 flex align-center">
        <v-icon size="30">mdi-chat-outline</v-icon>
        <span class="ml-4 text-lg">Messages</span>
      </div>
      <div class="nav create mb-6 flex align-center">
        <v-icon size="30">mdi-plus</v-icon>
        <span class="ml-4 text-lg">Create</span>
      </div>
      <router-link v-if="user" :to="`/${user.username}/`" class="nav profile mb-6 flex align-center">
        <img src="../../assets/avatar/default-avatar.jpg" alt="">
        <span class="ml-4 text-lg">Profile</span>
      </router-link>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore()
    const user = ref(null)
    async function run() {
      await store.dispatch('auth/auth/getCurrentUser')
      user.value = store.state.auth.auth.user
    }
    run()
    return {
      user
    }
  },
};
</script>

<style scoped>

.logo {
  height: 92px;
}

.logo-insta {
  display: none;
}

.home > i {
  font-weight: bolder;
}

img {
  width: 32px;
  border-radius: 50%;
  border: 1px solid #ccc;
}

@media screen and (max-width: 1240px) {
  .nav > .ml-4 {
    display: none;
  }
  .brand {
    display: none;
  }
  .logo-insta {
    display: block
  }
}

@media screen and (max-width: 765px) {
  .navigation {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;
  }
  .logo {
    display: none;
  }
}
</style>
