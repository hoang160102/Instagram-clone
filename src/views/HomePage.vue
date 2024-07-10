<template>
  <main-content>
    <div class="container flex justify-center">
      <new-feed></new-feed>
      <suggest-follow></suggest-follow>
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
</style>
