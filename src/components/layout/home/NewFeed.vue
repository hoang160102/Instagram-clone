<template>
  <div class="left px-10">
    <div class="post px-10">
      <div class="info flex align-center justify-between">
        <div class="left-info flex align-center">
          <img
            class="ava-user"
            src="../../../assets/avatar/default-avatar.jpg"
            alt=""
          />
          <div class="username font-semibold ml-2">_viet_hoang</div>
        </div>
        <div class="follow">
          <v-icon class="cursor-pointer">mdi-dots-horizontal</v-icon>
        </div>
      </div>
      <div class="w-full mt-5 img-post">
        <img
          src="../../../assets/post/post-img.png"
          alt=""
        />
      </div>
      <div class="mt-2 flex justify-between">
        <div class="react-post flex">
          <div class="like cursor-pointer">
            <v-icon size="30">mdi-cards-heart-outline</v-icon>
          </div>
          <div class="comment ml-2 cursor-pointer">
            <v-icon size="30">mdi-comment-outline</v-icon>
          </div>
        </div>
        <div class="save cursor-pointer">
          <v-icon size="30">mdi-bookmark-outline</v-icon>
        </div>
      </div>
      <div class="number-likes text-sm font-semibold mt-1 cursor-pointer">
        99999 likes
      </div>
      <div class="title flex mt-1">
        <div class="user-title text-sm font-semibold">_viet_hoang</div>
        <div class="title-post ml-3 text-sm">sweden</div>
      </div>
      <div class="user-comments">
        <div class="all-comments text-sm mt-1 text-slate-500 cursor-pointer">
          View all 100 comments
        </div>
      </div>
      <form class="mt-1 w-full">
        <input
          class="text-sm w-full"
          type="text"
          placeholder="Add a comment..."
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.left {
  width: 630px;
}
.left {
  margin-top: 70px;
}
.ava-user {
  border-radius: 50%;
  width: 32px;
  height: 32px;
}
.img-post {
  border-radius: 7px;
  overflow: hidden;
}
input {
  outline: none;
}
</style>
