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
    <div id="commentContainer">
      <div class="row">
        <div id="comment" class="col-md-10"></div>
        <div class="col-md-2 align-self-end">
          <span class="btn btn-success" v-on:click="sendComment">Send</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "./components/Comment.vue";
import E from "wangeditor";

export default {
  name: "app",
  data: function() {
    return {
      comments: Array,
      page: 1,
      pageSize: 10,
      newContent: Object,
      commentEditor: Object
    };
  },
  components: {
    Comment
  },
  mounted() {
    this.commentList();
    this.createCommentEditor();
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
    },
    createCommentEditor: function() {
      this.commentEditor = new E("#comment");
      this.commentEditor.customConfig.lang = {
        设置标题: "title",
        正文: "p",
        链接文字: "link text",
        链接: "link",
        上传图片: "upload image",
        上传: "upload",
        创建: "init",
        // 还可自定添加更多
        默认: "default",
        新浪: "sina"
      }; /**/
      this.commentEditor.customConfig.menus = [
        //'head',  // 标题
        //'bold',  // 粗体
        //'fontSize',  // 字号
        //'fontName',  // 字体
        //'italic',  // 斜体
        //'underline',  // 下划线
        //'strikeThrough',  // 删除线
        //'foreColor',  // 文字颜色
        //'backColor',  // 背景颜色
        //'link',  // 插入链接
        //'list',  // 列表
        //'justify',  // 对齐方式
        //'quote',  // 引用
        "emoticon" // 表情
        //'image',  // 插入图片
        //'table',  // 表格
        //'video',  // 插入视频
        //'code',  // 插入代码
        //'undo',  // 撤销
        //'redo'  // 重复
      ]; /**/
      this.commentEditor.customConfig.onchange = function(html) {
        // html 即变化之后的内容
        let temp = html.replace(/<p><br><\/p>/g, "");
        window.console.log(temp);
      };
      this.commentEditor.customConfig.onblur = function(html) {
        // html 即编辑器中的内容
        let temp = html.replace(/<p><br><\/p>/g, "");
        window.console.log(temp);
      };

      this.commentEditor.create();
    },
    sendComment: function() {
      window.console.log(this.commentEditor.txt.html());
      let data = new FormData();
      data.append("BookCommentForm[entry_id]", this.$entryId);
      data.append("BookCommentForm[content]", this.commentEditor.txt.html());

      this.$http.post("/comment/create", data).then(response => {
        window.console.log(response);
        if (response.data.success) {
          window.console.log(response.data.data);
          let comment = response.data.data;
          this.$set(this.comments.user, ''+comment.user.id, comment.user);
          this.comments.comment.push(comment.comment);
        }
      });
    }
  }
};
</script>
<style>
.w-e-text-container {
  height: 100px !important;
}
</style>
