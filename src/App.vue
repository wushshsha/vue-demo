<template>
  <div id="app" class="container">
    <ul class="list-group card-list-group">
      <Comment
        v-for="(comment,key,index) in comments.comment"
        v-bind:key="index"
        v-bind:comment="comment"
        v-bind:user="comments.user[''+comment.user_id]"
        v-bind:like="comments.like[''+comment.comment_id]"
      ></Comment>
    </ul>
    <div class="bg-white border-top" v-if="comments.total > pageSize">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="parseInt(comments.total)"
        @current-change="handleCurrentChange"
      ></el-pagination>
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
      page: 1,
      pageSize: 10
    };
  },
  components: {
    Comment
  },
  mounted() {
    this.commentList();
  },
  methods: {
    commentList: function() {
      this.$http
        .get(
          "/comment/c?id=" +
            this.$entryId +
            "&page=" +
            this.page +
            "&pageSize=" +
            this.pageSize
        )
        .then(
          response => (this.comments = response.data)
          //, window.console.log(response)
        );
    },
    handleCurrentChange: function(e) {
      this.page = e;
      this.commentList();
    }
  }
};
</script>