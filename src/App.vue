<template>
  <div id="app" class="container">
    <ul class="list-group card-list-group">
      <Comment
        v-for="(comment,key,index) in comments.comment"
        v-bind:key="index"
        v-bind:comment="comment"
        v-bind:user="comments.user[''+comment.user_id]"
      ></Comment>
    </ul>
    <div class="bg-white border-top">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
    <!----->
  </div>
</template>

<script>
import Comment from "./components/Comment.vue";

export default {
  name: "app",
  data: function() {
    return {
      comments: Array,
    };
  },
  components: {
    Comment
  },
  mounted() {
    this.$http.get("/comment/c?id=1").then(
      response => (this.comments = response.data)
      //, window.console.log(response)
    );
    window.console.log(window.identify);
  },
};
</script>