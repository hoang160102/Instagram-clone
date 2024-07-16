<template>
  <header>
    <the-header></the-header>
  </header>
  <section class="relative">
    <div
      :style="minNavWidth"
      v-click-outside="handleClickOutside"
      class="bar flex fixed h-screen"
      :class="{'z-10': isShowSearch}"
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
            v-model="searchTerm"
            type="text"
            placeholder="Search"
            class="px-3 rounded-md bg-gray-200 outline-none py-2 w-full"
          />
        </div>
        <div class="user-search mt-6 px-6">
          <div class="flex my-4 justify-between">
            <span class="font-semibold">Recent</span>
            <div class="load-clear">
              <span
                @click="clearAllRecent"
                v-if="recentSearch && recentSearch.length > 0"
                class="text-sky-500 cursor-pointer font-semibold"
                >Clear all</span
              >
              <v-progress-circular
                class="ml-3"
                v-if="loading"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </div>
          <div v-if="allUsers" class="user">
            <div
              v-if="searchTerm.length === 0 && recentSearch.length === 0"
              class="recent-search"
            >
              No recent searchs.
            </div>
            <div v-if="searchTerm.length === 0 && recentSearch.length > 0">
              <div
                v-for="item in recentSearch"
                @click="toUserProfile(item.username)"
                :key="item.id"
                class="user-item py-2 flex align-center cursor-pointer justify-between"
              >
                <div class="info flex align-center">
                  <img
                    v-if="item.profilePicture.length > 0"
                    :src="item.profilePicture"
                    class="rounded-full"
                    alt=""
                  />
                  <img
                    v-else
                    src="../assets/avatar/default-avatar.jpg"
                    class="rounded-full"
                    alt=""
                  />
                  <div class="username text-sm font-semibold ml-4">
                    {{ item.username }}
                  </div>
                </div>
                <v-icon
                  id="clear"
                  class="clear"
                  @click.stop="clearUser(item)"
                  >mdi-window-close</v-icon
                >
              </div>
            </div>
            <div v-if="searchTerm.length > 0" class="search-profile">
              <div
                v-for="item in filterUsers"
                :key="item.id"
                @click="userInfo(item.username, item)"
                class="user-item py-2 flex align-center cursor-pointer justify-between"
              >
                <div class="info flex align-center">
                  <img
                    v-if="item.profilePicture.length > 0"
                    :src="item.profilePicture"
                    class="rounded-full"
                    alt=""
                  />
                  <img
                    v-else
                    src="../assets/avatar/default-avatar.jpg"
                    class="rounded-full"
                    alt=""
                  />
                  <div class="username text-sm font-semibold ml-4">
                    {{ item.username }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout px-10 absolute">
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
import router from "@/router";
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
    const recentSearch = ref(null);
    const searchTerm = ref("");
    const loading = ref(false);
    const route = useRoute();
    const run = async () => {
      await store.dispatch("auth/auth/getCurrentUser");
      await store.dispatch("users/users/getAllUsers");
      user.value = store.state.auth.auth.user;
      allUsers.value = store.state.users.users.allUsers;
      recentSearch.value = user.value.recent;
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
    const filterUsers = computed(() => {
      const keywords = searchTerm.value
        .toLowerCase()
        .split(" ")
        .filter(Boolean);
      return allUsers.value.filter((user) =>
        keywords.every((keyword) =>
          user.username.toLowerCase().includes(keyword)
        )
      );
    });
    const showSearch = async (value) => {
      isShowSearch.value = value;
    };
    const handleClickOutside = async () => {
      isShowSearch.value = false;
    };
    const userInfo = async (username, item) => {
      isShowSearch.value = false
      await store.dispatch("users/users/addRecentSearch", item);
      router.push(`/${username}`);
    };
    const toUserProfile = async (username) => {
      isShowSearch.value = false
      router.push(`/${username}`);
    };
    const clearUser = async (item) => {
      event.target.parentElement.remove();
      await store.dispatch("users/users/removeRecentSearch", item);
    };
    const clearAllRecent = async () => {
      loading.value = true
      await store.dispatch("users/users/removeAllRecent");
      await run();
      loading.value = false
    };
    run();
    return {
      user,
      route,
      showSearch,
      handleClickOutside,
      userInfo,
      clearUser,
      toUserProfile,
      clearAllRecent,
      navWidth,
      isShowSearch,
      showSearchInput,
      minNavWidth,
      searchTerm,
      allUsers,
      filterUsers,
      recentSearch,
      loading,
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
  min-height: 100vh;
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

.v-progress-circular {
  width: 18px;
  height: 18px;
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
