<template>
  <li class="media replyMedia mt-2" v-bind:id="reply.comment_id" v-if="reply.status==1">
    <a
      :href="'/user/book/'+user.id"
      class="media-object avatar mr-4"
      v-bind:style="'background-image: url('+ $s3UrlHead + user.profile.avatar + ')'"
      v-if="user.profile.avatar"
    ></a>
    <a :href="'/user/book/'+user.id" v-html="user.profile.avatar_svg" v-else class="reply-avatar"></a>

    <div class="media-body">
      <div>
        <div v-if="reply.user_id == reply.entry_id || reply.entry_id == comment.user_id">
          <a v-bind:href="'/user/book/'+reply.user_id" class="text-dark-h">{{user.username}}</a>
          <small class="mx-3" style="color:#606060">{{ updateCommentDate()}}</small>
        </div>
        <div v-else>
          <div>
            <a v-bind:href="'/user/book/'+reply.user_id" class="text-dark-h">{{user.username}}</a>
            <small class="mx-3" style="color:#606060">{{ updateCommentDate()}}</small>
          </div>
          <div>
            <a v-bind:href="'/user/book/'+reply.entry_id" class="text-dark-r">@{{euser.username}}</a>
          </div>
        </div>
        <div v-if="reply.status == 1" v-html="reply.content" class="comment-content mt-1"></div>
        <div v-else-if="reply.status == 2" v-html="reply.reason" class="text-muted"></div>
      </div>
      <div>
        <span class="comment-reply" v-on:click="ReplyEenterEvent">REPLY</span>
        <div class="float-right mr-5" v-if="reply.status == 1">
          <el-col :span="12">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="fa fa-ellipsis-h reply-operate"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-on:click.native="handleReport"
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
      title="report"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="30%"
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
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="report">Enter</el-button>
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
      dialogVisible: false, //举报对话框打开状体
      reportRadio: String, //举报项
      loginStatus: false, //当前用户登陆状态
      loginDialogStatus: false //当前登陆对话框显示状态
    };
  },
  props: {
    reply: Object, //当前回复评论object
    user: Object, //当前回复评论的用户object
    euser: Object, //当前回复评论回复的用户的object
    comment: Object, //当前回复评论的首层评论
    currentReplyId: Number //当前正在被回复的评论的ID
  },
  methods: {
    del: function() {
      //删除评论事件
      if (!this.$loginStatus) {
        this.$emit("login-event");
        return;
      }

      let data = new FormData();
      data.append("id", this.reply.comment_id);

      this.$http.post("/comment/delete", data).then(response => {
        if (response.data.success) {
          this.$set(
            this.reply,
            "reason",
            "<p class='text-muted'>该评论已经被删除</p>"
          );
          this.$set(this.reply, "status", 2);
        }
      });
    },
    report: function() {
      //举报评论事件
      if (!(typeof this.reportRadio == "string")) return; //用户是否选择
      let data = new FormData();
      data.append("BookCommentReportForm[comment_id]", this.reply.comment_id);
      data.append("BookCommentReportForm[content]", this.reportRadio);
      this.$http
        .post("/comment/report", data)
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {
          this.dialogVisible = false;
        }); /**/
    },
    ReplyEenterEvent: function() {
      //回复按钮被点击事件
      if (!this.$loginStatus) this.$emit("login-event");
      else this.$emit("reply-event", this.reply.comment_id);
    },
    handleEditorContent: function(e) {
      //回复内容被提交事件
      this.$emit("reply-content", {
        parent_id: this.comment.comment_id,
        entry_id: this.reply.user_id,
        content: e
      });
    },
    handleReport: function() {
      //举报按钮被点击事件
      if (this.$loginStatus) this.dialogVisible = true;
      else {
        this.$emit("login-event");
      }
    },
    updateCommentDate() {
      let commentTime = parseInt(this.comment.created_at + "000");
      let currentTime = new Date().getTime();
      if (currentTime - commentTime > 0) {
        let diff = currentTime - commentTime;
        if (diff < 60 * 1000) {
          //一分钟内
          let second = parseInt(diff / 1000);
          if (second == 0 || second == 1) {
            return "1 second ago";
          } else {
            return second + " seconds ago";
          }
        } else if (diff < 3600 * 1000) {
          //一小时内
          let minute = parseInt(diff / 60 / 1000);
          if (minute == 0 || minute == 1) {
            return "1 minute ago";
          } else {
            return minute + " minutes ago";
          }
        } else if (diff < 3600 * 24 * 1000) {
          //一天内
          let hour = parseInt(diff / 3600 / 1000);
          if (hour == 0 || hour == 1) {
            return "1 hour ago";
          } else {
            return hour + " hours ago";
          }
        } else if (diff < 3600 * 24 * 7 * 1000) {
          //一周内
          let day = parseInt(diff / (3600 * 24) / 1000);
          if (day == 0 || day == 1) {
            return "1 day ago";
          } else {
            return day + " days ago";
          }
        } else {
          return this.$moment(parseInt(this.comment.created_at + "000")).format(
            "YYYY-MM-DD HH:mm"
          );
        }
      } else {
        return "One second ago";
      }
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
.comment-reply {
  color: #606060;
  cursor: pointer;
}
.comment-content {
  color: #111111;
}

a.text-dark-r {
  cursor: pointer;
  color: #065fd4;
}
a.text-dark-r:hover {
  color: #065fd4;
  text-decoration: none;
}

.reply-avatar {
  margin-left: -20px;
  width: 68px;
  margin-top: -25px;
  -webkit-transform: scale(0.43);
  -moz-transform: scale(0.43);
  -ms-transform: scale(0.43);
  -o-transform: scale(0.43);
  transform: scale(0.43);
  display: inline-block;
}
</style>
