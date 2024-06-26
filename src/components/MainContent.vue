<template>
  <header>
    <the-header></the-header>
  </header>
  <section class="flex">
    <div class="bar h-screen">
      <div class="side-bar p-3 h-full">
        <navigation-bar></navigation-bar>
      </div>
    </div>
    <div class="layout w-full">
      <slot></slot>
    </div>
  </section>
  <div class="bottom-bar">
    <navigation-bar></navigation-bar>
  </div>
</template>

<script>
import NavigationBar from "./nav/NavigationBar.vue";
import TheHeader from "./nav/TheHeader.vue";
export default {
  components: {
    NavigationBar,
    TheHeader,
  },
  setup() {},
};
</script>

<style scoped>
.bar {
  width: calc(100% / 5);
}
.side-bar {
  border-right: 1px solid #ccc;
}
header {
  display: none;
}
.bottom-bar {
  display: none;
}

@media screen and (max-width: 1240px) {
  .bar {
    width: 80px;
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
