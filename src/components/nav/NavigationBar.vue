<template>
    <div class="logo">
      <div class="brand py-5 px-3 text-2xl mb-5">Instagram</div>
      <v-icon size="32" class="logo-insta py-5 px-3 text-2xl mb-5">mdi-instagram</v-icon>
    </div>
    <div class="navigation px-3">
      <div class="nav home mb-5 flex align-center">
        <v-icon size="32">mdi-home-outline</v-icon>
        <span class="ml-4 text-lg">Home</span>
      </div>
      <div class="nav home mb-5 flex align-center">
        <v-icon size="32">mdi-magnify</v-icon>
        <span class="ml-4 text-lg">Search</span>
      </div>
      <div class="nav message mb-5 flex align-center">
        <v-icon size="32">mdi-chat-outline</v-icon>
        <span class="ml-4 text-lg">Messages</span>
      </div>
      <div class="nav create mb-5 flex align-center">
        <v-icon size="32">mdi-plus</v-icon>
        <span class="ml-4 text-lg">Create</span>
      </div>
      <div class="nav profile mb-5 flex align-center">
        <v-icon size="32">mdi-plus</v-icon>
        <span class="ml-4 text-lg">Profile</span>
      </div>
    </div>
</template>

<script>
export default {
  setup() {},
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
  }
  .logo {
    display: none;
  }
}
</style>
