<template>
  <li class="media replyMedia mt-4" v-bind:id="reply.comment_id" v-if="reply.status=1">
    <div
      class="media-object avatar mr-4"
      v-bind:style="'background-image: url(//online2.html5zilla.com/'+user.profile.avatar+')'"
    ></div>
    <div class="media-body">
      <div class="d-md-flex">
        <div v-if="reply.user_id === reply.entry_id || reply.entry_id === comment.user_id">
          <a v-bind:href="'/user/book/'+reply.user_id">{{user.username}}</a> 回复
        </div>
        <div v-else>
          <a v-bind:href="'/user/book/'+reply.user_id">{{user.username}}</a> 回复
          <a v-bind:href="'/user/book/'+reply.entry_id">{{euser.username}}</a>
        </div>
        <div class="mx-3" style="margin-bottom: -15px;">
          <div v-html="reply.content"></div>
        </div>
      </div>
      <div>
        <small class="text-muted">{{ Date(parseInt(reply.created_at))}}</small>
        <span class="comment-reply btn btn-white btn-sm" v-on:click="ReplyEenterEvent">Comment</span>
        <div class="float-right mr-5" v-if="reply.status == 1">
          <el-col :span="12">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="fa fa-ellipsis-h reply-operate"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-on:click.native="dialogVisible = true"
                  v-if="this.$identify != reply.user_id"
                >Report</el-dropdown-item>
                <el-dropdown-item v-on:click.native="del" v-else>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </div>
        <Editor
          v-if="currentReplyId==this.reply.comment_id"
          v-on:editor-content="handleEditorContent"
        ></Editor>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="30%"
      v-if="dialogVisible"
    >
      <div>
        <el-radio v-model="reportRadio" label="Sexual Content">Sexual Content</el-radio>
        <el-radio
          v-model="reportRadio"
          label="Violent And Repulsive Content"
        >Violent And Repulsive Content</el-radio>
        <el-radio v-model="reportRadio" label="Spam Or Misleading">Spam Or Misleading</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="report">确 定</el-button>
      </span>
    </el-dialog>
  </li>
</template>
<script>
import Editor from "./Editor.vue";
export default {
  name: "reply",
  components: {
    Editor
  },
  data() {
    return {
      dialogVisible: false,
      reportRadio: Number,
      replyStatus: false
    };
  },
  props: {
    reply: Object,
    user: Object,
    euser: Object,
    comment: Object,
    currentReplyId: Number //当前回复ID
  },
  methods: {
    del: function() {
      let data = new FormData();
      data.append("id", this.reply.comment_id);

      this.$http.post("/comment/delete", data).then(response => {
        window.console.log(response);
        if (response.data.success) {
          this.$set(this.reply, "status", 2);
          this.$set(
            this.reply,
            "content",
            "<p class='text-muted'>该评论已经被删除</p>"
          );
        }
      });
    },
    report: function() {
      window.console.log("report");
      let data = new FormData();
      data.append("BookCommentReportForm[comment_id]", this.reply.comment_id);
      data.append("BookCommentReportForm[content]", this.reportRadio);
      window.console.log(this.reportRadio);
      this.$http
        .post("/comment/report", data)
        .then(response => {
          window.console.log(response);
          this.dialogVisible = false;
        })
        .catch(() => {
          window.console.log("error");
          this.dialogVisible = false;
        }); /**/
    },
    ReplyEenterEvent: function() {
      this.replyStatus = !this.replyStatus;
      this.$emit("reply-event", this.reply.comment_id);
    },
    handleEditorContent: function(e) {
      this.$emit("reply-content", {
        parent_id: this.comment.comment_id,
        entry_id: this.reply.user_id,
        content: e
      });
    }
  }
};
</script>
<style>
.replyMedia:hover .reply-operate {
  display: inline-block;
}

.replyMedia .reply-operate {
  display: none;
}
</style>

