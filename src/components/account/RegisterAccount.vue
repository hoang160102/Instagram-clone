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
        <div class="bg-white form p-8 rounded-lg shadow-lg w-96">
          <h1 class="text-center text-3xl font-bold mb-6">Instagram</h1>
          <button class="w-full text-sm bg-blue-600 text-white py-2 rounded-lg mb-4">
            Log in with Goggle
          </button>
          <div class="flex items-center justify-center my-4">
            <hr class="w-full border-gray-300" />
            <span class="px-2 text-sm text-gray-500">OR</span>
            <hr class="w-full border-gray-300" />
          </div>
          <form @submit.prevent="submit" class="space-y-4">
            <div class="form-control">
              <input
                v-model="email"
                type="text"
                placeholder="Email"
                class="w-full text-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span v-if="!isValidEmail && submitData" class="px-4 text-xs text-red-500">Your email is invalid</span>
            </div>
            <div class="form-control">
              <input
                v-model="fullName"
                type="text"
                placeholder="Full Name"
                class="w-full text-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span v-if="!isFullName && submitData" class="px-4 text-xs text-red-500">Please enter your full name</span>
            </div>
            <div class="form-control">
              <input
                v-model="username"
                type="text"
                placeholder="Username"
                class="w-full text-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span v-if="!isUsername && submitData" class="px-4 text-xs text-red-500">Please enter your username</span>
            </div>
            <div class="form-control">
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="w-full text-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span v-if="!isPassword && submitData" class="px-4 text-xs text-red-500">Your password must have at least 6 characters</span>
            </div>
            <p class="text-xs text-gray-500">
              People who use our service may have uploaded your contact
              information to Instagram.
              <a href="#" class="text-blue-500">Learn More</a>
            </p>
            <p class="text-xs text-gray-500">
              By signing up, you agree to our
              <a href="#" class="text-blue-500">Terms</a>,
              <a href="#" class="text-blue-500">Privacy Policy</a> and
              <a href="#" class="text-blue-500">Cookies Policy</a>.
            </p>
            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Sign up
            </button>
          </form>
          <div class="mt-6 text-center">
            <p class="text-gray-500 text-sm">
              Have an account? <router-link :to="{ name: 'Login' }" class="text-blue-500">Log in</router-link>
            </p>
          </div>
          <div class="mt-4 text-center">
            <p class="text-gray-500 text-sm">Get the app.</p>
            <div class="flex justify-center mt-2 space-x-2">
              <a href="#"
                ><img
                  src="../../assets/theme/ggplay.png"
                  alt="Google Play"
                  class="h-10"
              /></a>
              <a href="#"
                ><img
                  src="../../assets/theme/microsoft.png"
                  alt="Microsoft Store"
                  class="h-10"
              /></a>
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
    const store = useStore()
    const email = ref('')
    const fullName = ref('')
    const username = ref('')
    const password = ref('')
    const submitData = ref(false)
    const images = [`insta.png`, `insta2.png`, `insta3.png`, `insta4.png`];
    const currentImageIndex = ref(0);
    const interval = ref(null);
    const startAutoFade = () => {
      interval.value = setInterval(() => {
        currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
      }, 4000);
    };
    const isValidEmail = computed(() => {
      if (email.value.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)) {
        return true
      }
      else {
        return false
      }
    })
    const isFullName = computed(() => {
      return fullName.value.length > 0
    })
    const isUsername = computed(() => {
      return username.value.length > 0
    })
    const isPassword = computed(() => {
      return password.value.length >= 6
    })
    const submit = async () => {
      submitData.value = true
      if (email.value.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim) && fullName.value.length > 0 && username.value.length > 0 && password.value.length >= 6) {
        await store.dispatch('auth/auth/signUp', {
          email: email.value,
          fullName: fullName.value,
          username: username.value,
          password: password.value
        })
      }
      return 
    }
    onMounted(() => {
      startAutoFade();
    });
    return {
      images,
      currentImageIndex,
      email,
      fullName,
      username,
      password,
      isValidEmail,
      isFullName,
      isUsername,
      isPassword,
      submitData,
      submit
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
