<template>
  <main-content>
    <div v-if="user" class="container mx-auto p-10">
      <div class="title font-bold text-xl mb-10">Edit Profile</div>
      <div
        class="change-photo py-4 px-5 mb-10 flex flex-wrap align-center justify-between bg-gray-200 rounded-lg w-full"
      >
        <div class="user flex mb-2 align-center">
          <img
            class="object-cover"
            v-if="profileImg.length > 5"
            :src="fileImg || profileImg"
            alt=""
          />
          <img
            class="object-cover"
            v-else
            src="../assets/avatar/default-avatar.jpg"
            alt=""
          />
          <div class="user-info ml-10">
            <div class="username text-lg font-bold">{{ user.username }}</div>
            <div class="name text-gray-500">{{ user.fullName }}</div>
          </div>
        </div>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          class="hidden"
        />
        <button
          @click="triggerFileInput"
          class="change px-5 py-2 font-semibold bg-sky-500 mr-10 text-white"
        >
          Change Photo
        </button>
      </div>
      <form @submit.prevent="updateUser">
        <div class="form-control mb-10">
          <label for="name">
            <div class="py-4 font-bold">Name</div>
          </label>
          <input
            v-model="name"
            class="w-full px-4 py-2 outline-none"
            placeholder="Name"
            type="text"
          />
        </div>
        <div class="form-control mb-10">
          <label for="username">
            <div class="py-4 font-bold">Username</div>
          </label>
          <input
            v-model="username"
            class="w-full px-4 py-2 outline-none"
            placeholder="Username"
            type="text"
          />
        </div>
        <div class="form-control mb-10 relative">
          <label for="Bio">
            <div class="py-4 font-bold">Bio</div>
          </label>
          <textarea
            v-model="bio"
            class="pl-4 pr-20 text w-full py-2"
            placeholder="Bio"
          ></textarea>
          <span
            class="limit-letters absolute bottom-[15px] right-[15px] text-sm"
            >{{ bio.length }} / 150</span
          >
        </div>
        <div class="form-control">
          <div class="p-6 bg-white privacy">
            <h2 class="text-lg font-semibold mb-4">Account privacy</h2>
            <div class="flex items-center justify-between mb-4">
              <label for="private-account" class="text-gray-700 font-medium"
                >Private account</label
              >
              <div
                id="private-account"
                @click="toggle"
                :class="{ 'bg-green-500': isOn, 'bg-gray-300': !isOn }"
                class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors"
              >
                <span
                  :class="{ 'translate-x-6': isOn, 'translate-x-1': !isOn }"
                  class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform"
                ></span>
              </div>
            </div>
            <p class="text-gray-500">
              When your account is public, your profile and posts can be seen by
              anyone, on or off Instagram, even if they don’t have an Instagram
              account.
            </p>
            <p class="text-gray-500 mt-2">
              When your account is private, only the followers you approve can
              see what you share, including your photos or videos on hashtag and
              location pages, and your followers and following lists.
              <a href="#" class="text-blue-500">Learn more</a>
            </p>
          </div>
        </div>
        <div class="submit mt-4 flex justify-end">
          <button
            type="submit"
            class="px-10 py-3 font-semibold bg-sky-500 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </main-content>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const user = ref(null);
    const name = ref("");
    const username = ref("");
    const bio = ref("");
    const profileImg = ref("");
    const fileImg = ref(null)
    const isOn = ref(null);
    const fileInput = ref(null);
    const fetchData = async () => {
      await store.dispatch("auth/auth/getCurrentUser");
      user.value = store.getters["auth/auth/user"];
      isOn.value = user.value.privateAccount;
      name.value = user.value.fullName;
      username.value = user.value.username;
      profileImg.value = user.value.profilePicture;
    };
    const toggle = () => {
      isOn.value = !isOn.value;
    };
    const updateUser = async () => {
      await store.dispatch("auth/auth/updateInfo", {
        bio: bio.value,
        username: username.value,
        fullName: name.value,
        privateAccount: isOn.value,
      });
      fetchData();
    };
    fetchData();
    const triggerFileInput = () => {
      fileInput.value.click();
    };
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      const reader = new FileReader()
      reader.onloadend = async () => {
        fileImg.value = reader.result
      }
      reader.readAsDataURL(file);
      if (file && file.type.startsWith("image/")) {
        await store.dispatch("auth/auth/updateProfilePicture", file);
      }
      fetchData()
    };
    onMounted(fetchData)
    return {
      isOn,
      toggle,
      user,
      name,
      username,
      bio,
      profileImg,
      updateUser,
      fileInput,
      fileImg,
      triggerFileInput,
      handleFileUpload,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}
img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #ccc;
}
.change {
  border-radius: 15px;
}
.text {
  border-radius: 15px;
  outline: none;
  border: 1px solid black;
  height: 70px;
}

input,
.privacy {
  border: 1px solid black;
  border-radius: 15px;
}
button {
  border-radius: 15px;
}
</style>
