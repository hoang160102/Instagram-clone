<template>
  <div class="header px-5 flex align-center">
    <div class="nav flex w-full flex align-center justify-between">
      <div class="brand text-xl">Instagram</div>
      <div @click="focus" class="search relative">
        <v-icon v-if="!focusSearch" class="text-slate-400">mdi-magnify</v-icon>
        <input class="p-1" type="text" placeholder="Search" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const focusSearch = ref(false);
    const focus = () => {
      focusSearch.value = ref(true);
    };
    return {
      focusSearch,
      focus,
    };
  },
};
</script>

<style scoped>
.header {
  height: 60px;
  border-bottom: 1px solid #ccc;
}

.search > input {
  outline: none;
  width: 270px;
}

.search {
  cursor: text;
}
</style>
