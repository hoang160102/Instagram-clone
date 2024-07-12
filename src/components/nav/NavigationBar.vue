<template>
  <nav class="w-full">
    <div class="logo">
      <div v-if="!isSearch" class="brand py-5 px-3 text-2xl mb-5">Instagram</div>
      <div class="icon flex justify-center">
        <v-icon v-if="isSearch" size="30" class="logo-insta text-2xl mb-4"
          >mdi-instagram</v-icon
        >
        <v-icon v-else size="30" class="logo-insta-res text-2xl mb-4"
          >mdi-instagram</v-icon
        >
      </div>
    </div>
    <div v-if="user" class="navigation">
      <router-link
        :to="{ name: 'Home' }"
        class="nav rounded-md home px-3 mb-5 py-2 flex align-center"
      >
        <v-icon v-if="route.path === '/'" size="30">mdi-home-variant</v-icon>
        <v-icon v-else size="30">mdi-home-variant-outline</v-icon>
        <span v-if="!isSearch" class="ml-4 text-lg">Home</span>
      </router-link>
      <div
        @click="searchUser"
        class="nav cursor-pointer rounded-md home py-2 mb-5 px-3 flex align-center"
      >
        <v-icon size="30">mdi-magnify</v-icon>
        <span v-if="!isSearch" class="ml-4 text-lg">Search</span>
      </div>
      <div class="nav rounded-md py-2 message mb-5 px-3 flex align-center">
        <v-icon size="30">mdi-chat-outline</v-icon>
        <span v-if="!isSearch" class="ml-4 text-lg">Messages</span>
      </div>
      <div class="nav rounded-md py-2 create mb-5 px-3 flex align-center">
        <v-icon size="30">mdi-plus</v-icon>
        <span v-if="!isSearch" class="ml-4 text-lg">Create</span>
      </div>
      <router-link
        :to="`/${user.username}/`"
        class="nav rounded-md profile py-2 mb-5 px-3 flex align-center"
      >
        <img
          v-if="user.profilePicture.length > 0"
          :src="user.profilePicture"
          alt=""
        />
        <img v-else src="../../assets/avatar/default-avatar.jpg" alt="" />
        <span v-if="!isSearch" class="ml-4 text-lg">Profile</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
// import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  props: ["currentUser", "isSearch"],
  emits: ["nav-style"],
  setup(props, context) {
    const user = ref(props.currentUser);
    const boolean = ref(false);
    const route = useRoute();
    const searchUser = async () => {
      boolean.value = true;
      context.emit("nav-style", boolean.value);
    };
    return {
      user,
      route,
      boolean,
      searchUser,
    };
  },
};
</script>

<style scoped>
.logo {
  height: 92px;
}

.home > i {
  font-weight: bolder;
}

img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #ccc;
}

.router-link-exact-active {
  font-weight: bold;
}

.nav:hover {
  background-color: #ccc;
}

.logo-insta-res {
  display: none;
}

@media screen and (max-width: 1240px) {
  .nav > .ml-4 {
    display: none;
  }
  .brand {
    display: none;
  }
  .logo-insta-res {
    display: block;
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
