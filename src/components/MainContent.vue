<template>
  <header>
    <the-header></the-header>
  </header>
  <section class="relative">
    <div
      :style="minNavWidth"
      v-click-outside="handleClickOutside"
      class="bar z-20 flex fixed h-screen"
    >
      <div v-if="user" :style="navWidth" class="side-bar flex p-3 h-full">
        <navigation-bar
          :isSearch="isShowSearch"
          :current-user="user"
          @nav-style="showSearch"
        ></navigation-bar>
      </div>
      <div :style="showSearchInput" class="search bg-white rounded-r-2xl py-5">
        <div class="nav-search px-4">
          <div class="title px-5 mb-7 font-semibold text-2xl">Search</div>
          <input
            v-model="searchItem"
            type="text"
            placeholder="Search"
            class="px-3 rounded-md bg-gray-200 outline-none py-2 w-full"
          />
        </div>
        <div class="user-search mt-6 px-6">
          <div class="flex my-4 justify-between">
            <span class="font-semibold">Recent</span>
            <span class="text-sky-500 font-semibold">Clear all</span>
          </div>
          <div class="user">
            <div
              v-for="item in allUsers"
              :key="item.id"
              @click="userInfo"
              class="user-item py-2 flex align-center justify-between"
            >
              <div class="info flex align-center">
                <img v-if="item.profilePicture.length > 0" :src="item.profilePicture" class="rounded-full" alt="" />
                <img v-else src="../assets/avatar/default-avatar.jpg" class="rounded-full" alt="">
                <div class="username text-sm font-semibold ml-4">
                  {{ item.username }}
                </div>
              </div>
              <v-icon class="z-10 clear" @click.stop="clearUser"
                >mdi-window-close</v-icon
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout px-10 z-10 absolute">
      <slot></slot>
    </div>
  </section>
  <div v-if="user" class="bottom-bar bg-white">
    <navigation-bar :current-user="user"></navigation-bar>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import clickOuside from "@/directives/clickOuside.js";
import NavigationBar from "./nav/NavigationBar.vue";
import TheHeader from "./nav/TheHeader.vue";
export default {
  components: {
    NavigationBar,
    TheHeader,
  },
  directives: {
    clickOuside,
  },
  setup() {
    const store = useStore();
    const user = ref(null);
    const allUsers = ref(null);
    const isShowSearch = ref(false);
    const searchItem = ref("");
    const route = useRoute();
    const run = async () => {
      await store.dispatch("auth/auth/getCurrentUser");
      await store.dispatch("users/users/getAllUsers");
      user.value = store.state.auth.auth.user;
      allUsers.value = store.state.users.users.allUsers;
    };
    const navWidth = computed(() => {
      if (isShowSearch.value) {
        return {
          width: "80px",
          "z-index": "10",
        };
      } else {
        return {
          "min-width": "100%",
        };
      }
    });
    const minNavWidth = computed(() => {
      if (isShowSearch.value) {
        return {
          width: "calc(100% / 4)",
        };
      } else {
        return {
          width: "calc(100% / 5)",
        };
      }
    });
    const showSearchInput = computed(() => {
      if (!isShowSearch.value) {
        return {
          display: "none",
          opacity: 0,
          width: "0px",
        };
      } else {
        return {
          display: "block",
          opacity: 1,
          "min-width": "410px",
          "border-right": "1px solid #ccc",
        };
      }
    });
    const showSearch = async (value) => {
      isShowSearch.value = value;
    };
    const handleClickOutside = async () => {
      isShowSearch.value = false;
    };
    const userInfo = async () => {
      console.log(1);
    };
    const clearUser = async () => {
      console.log(2);
    };
    run();
    return {
      user,
      route,
      showSearch,
      handleClickOutside,
      userInfo,
      clearUser,
      navWidth,
      isShowSearch,
      showSearchInput,
      minNavWidth,
      searchItem,
      allUsers,
    };
  },
};
</script>

<style scoped>
.side-bar {
  border-right: 1px solid #ccc;
}
header {
  display: none;
}
.bottom-bar {
  display: none;
}

.layout {
  width: 80%;
  left: calc(100% / 5);
  top: 0;
}

.search {
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.2);
}

.user-search {
  border-top: 1px solid #ccc;
}

img {
  width: 44px;
}

@media screen and (max-width: 1240px) {
  .bar {
    width: 80px !important;
  }
  .layout {
    left: 80px;
  }
}

@media screen and (max-width: 765px) {
  .side-bar {
    display: none;
  }
  .bar {
    width: 0px;
  }
  header {
    display: block;
  }
  .bottom-bar {
    display: block;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
