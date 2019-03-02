<template>
  <div id="app" class="container">
    <Editor v-on:editor-content="handleComment" v-bind:buttonTxt="'COMMENT'"></Editor>
    <div class="list-group card-list-group">
      <Comment
        v-for="(comment,key,index) in comments.comment"
        v-bind:key="index"
        v-bind:comment="comment"
        v-bind:user="comments.user[''+comment.user_id]"
        v-bind:like="comments.like[''+comment.comment_id]"
        v-on:reply-event="replyEnterEvent"
        v-bind:currentReplyId="currentReplyId"
        v-on:login-event="loginDialogStatus=true"
      ></Comment>
    </div>
    <div v-if="comments.total > pageSize">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="parseInt(comments.total)"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <!----->
    <Editor v-on:editor-content="handleComment" v-if="comments && comments.comment && comments.comment.length>6" v-bind:buttonTxt="'COMMENT'"></Editor>
    <el-dialog
      title="Login"
      :visible.sync="loginDialogStatus"
      :modal-append-to-body="false"
      width="30%"
      v-if="loginStatus == false"
    >
      <div>
        <a href="/site/login">You must be logged in to reply.</a>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginDialogStatus = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Comment from "./components/Comment.vue";
import Editor from "./components/Editor.vue";

export default {
  name: "app",
  data: function() {
    return {
      comments: Array, //当前评论列表
      page: 1, //当前评论页面
      pageSize: 15, //每页评论个数
      currentReplyId: 0, //当前正被回复的评论ID
      loginStatus: false, //当前用户登陆状态
      loginDialogStatus: false //当前登陆对话框显示状态
    };
  },
  components: {
    Comment,
    Editor
  },
  mounted() {
    this.commentList();
  },
  methods: {
    commentList: function() {
      //获取评论列表
      this.$http
        .get(
          "/comment/c?id=" +
            this.$entryId +
            "&page=" +
            this.page +
            "&pageSize=" +
            this.pageSize
        )
        .then(response => (this.comments = response.data));
    },
    handleCurrentChange: function(e) {
      //页面评论切换事件
      this.page = e;
      this.commentList();
    },
    handleComment: function(e) {
      //发评论事件
      if (this.$loginStatus == false) {
        this.loginDialogStatus = true;
        return;
      }
      let data = new FormData();
      data.append("BookCommentForm[entry_id]", this.$entryId);
      data.append("BookCommentForm[content]", e);

      this.$http.post("/comment/create", data).then(response => {
        if (response.data.success) {
          let comment = response.data.data;
          this.$set(this.comments.user, "" + comment.user.id, comment.user);
          this.comments.comment.unshift(comment.comment);
        } else {
          this.$message.error(response.data.data);
        }
      });
    },
    replyEnterEvent: function(e) {
      //回复评论事件
      this.currentReplyId = parseInt(e);
    },
  }
};
</script>
