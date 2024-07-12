<template>
  <main-content>
    <div class="container flex justify-center">
      <new-feed></new-feed>
      <div class="right-content">
        <suggest-follow></suggest-follow>
      </div>
    </div>
  </main-content>
</template>

<script>
import NewFeed from '../components/layout/home/NewFeed.vue'
import SuggestFollow from '../components/layout/home/SuggestFollow.vue'
export default {
    components: {
        NewFeed,
        SuggestFollow
    },
    setup() {
        
    },
}
</script>

<style scoped>
.container {
  width: 100%;
}

@media screen and (max-width: 1240px) {
  .right-content {
    display: none;
    width: 0px;
  }
}
</style>
