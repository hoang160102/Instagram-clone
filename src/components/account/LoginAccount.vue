<template>
  <div class="container flex align-center h-screen mx-auto">
    <div class="content flex w-full justify-center">
      <div class="img w-1/2">
        <div class="background-img relative">
          <div class="fade-img top-[27px] left-[155px] absolute">
            <div
              v-for="(img, index) in images"
              :key="index"
              class="img-gallery"
              :class="{ active: index === currentImageIndex }"
            >
              <img :src="require(`@/assets/theme/${img}`)" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="lg:w-1/2 flex justify-center">
        <div class="form bg-white p-6 rounded shadow-md w-80">
          <h1 class="text-center text-2xl font-bold mb-6">Instagram</h1>
          <form @submit.prevent="loginUser">
            <div class="form-control mb-4">
              <input
                v-model="email"
                type="text"
                placeholder="Email"
                class="block w-full text-sm px-3 py-2 border rounded"
              />
              <span
                v-if="!isValidEmail && submitData"
                class="px-4 text-xs text-red-500"
                >Your email is invalid</span
              >
            </div>
            <div class="form-control mb-2">
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="block w-full text-sm px-3 py-2 border rounded"
              />
              <span
                v-if="!isPassword && submitData"
                class="px-4 text-xs text-red-500"
                >Please enter your password</span
              >
            </div>
            <span
              class="px-4 text-xs text-red-500"
              v-if="submitData && isErrorLogin"
              >Email or password is incorrect</span
            >
            <button
              type="submit"
              class="bg-blue-500 text-sm mt-3 text-white w-full py-2 rounded font-medium"
            >
              Log in
            </button>
          </form>
          <div class="text-center my-4">
            <span class="text-gray-500">OR</span>
          </div>
          <button
            @click="googleLogin"
            type="button"
            class="bg-blue-800 text-sm text-white w-full py-2 rounded font-medium flex items-center justify-center"
          >
            <v-icon class="mr-1">mdi-google</v-icon> Log in with Google
          </button>
          <div class="text-center mt-4">
            <a href="#" class="text-blue-500 text-sm">Forgot password?</a>
          </div>
          <div class="text-center mt-6">
            <span class="text-sm text-gray-500">Don't have an account? </span>
            <router-link
              :to="{ name: 'Register' }"
              class="text-sm text-blue-500 font-medium"
              >Sign up</router-link
            >
          </div>
          <div class="mt-6">
            <p class="text-center text-gray-500 text-sm">Get the app.</p>
            <div class="flex justify-center mt-3">
              <a href="#" class="mr-2">
                <img src="../../assets/theme/ggplay.png" class="h-10" />
              </a>
              <a href="#">
                <img src="../../assets/theme/microsoft.png" class="h-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const email = ref("");
    const password = ref("");
    const submitData = ref(false);
    const errorLogin = ref(null);
    const images = [`insta.png`, `insta2.png`, `insta3.png`, `insta4.png`];
    const currentImageIndex = ref(0);
    const interval = ref(null);
    const startAutoFade = () => {
      interval.value = setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
      }, 4000);
    };
    const isValidEmail = computed(() => {
      if (
        email.value.match(
          /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
        )
      ) {
        return true;
      } else {
        return false;
      }
    });
    const isPassword = computed(() => {
      return password.value.length > 0;
    });
    const isErrorLogin = computed(() => {
      if (store.state.auth.auth.errLogin) {
        return true
      }
      else {
        return false
      }
    })

    const loginUser = async () => {
      submitData.value = true;
      if (
        email.value.match(
          /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
        ) &&
        password.value.length > 0
      ) {
        await store.dispatch("auth/auth/login", {
          email: email.value,
          password: password.value,
        });
      }
      if (store.state.auth.auth.errLogin) {
        errorLogin.value === store.state.auth.auth.errLogin
      }
      return;
    };
    const googleLogin = async () => {
      await store.dispatch('auth/auth/loginWithGoogle')
    }
    onMounted(() => {
      startAutoFade();
    });
    return {
      images,
      currentImageIndex,
      email,
      password,
      isValidEmail,
      isPassword,
      errorLogin,
      submitData,
      isErrorLogin,
      loginUser,
      googleLogin
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1000px;
}
.background-img {
  height: 582px;
  background-image: url("../../assets/theme/home-phones.png");
}

.img-gallery {
  height: 582px;
  width: 250px;
  position: absolute;
  opacity: 0;
  transition: opacity 1s;
}
.active {
  opacity: 1 !important;
}
.form {
  border: 1px solid #ccc;
}

input {
  border: 1px solid #ccc !important;
  outline: none;
}

@media screen and (max-width: 875px) {
  .img {
    display: none;
  }
}
</style>
