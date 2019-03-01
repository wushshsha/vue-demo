<template>
  <div
    class="my-2 "
    v-bind:id="comment.comment_id"
    v-if="comment.status == 1 || (comment.status != 1 && replys.reply && replys.reply.length > 0)"
  >
    <div class="media commentMedia ">
      <div class="mr-5 text-center">
        <a
          :href="'/user/book/'+user.id"
          class="media-object avatar avatar-md"
          v-bind:style="'background-image: url('+ $s3UrlHead + user.profile.avatar + ')'"
          v-if="user.profile.avatar"
        ></a>
        <a
          :href="'/user/book/'+user.id"
          v-html="user.profile.avatar_svg"
          v-else
          class="media-object avatar avatar-md"
        ></a>
      </div>

      <div class="media-body">
        <div>
          <a :href="'/user/book/'+comment.user_id" class="text-dark-h">{{user.username}}</a>
          <small class="mx-3" style="color:#606060">{{updateCommentDate()}}</small>
        </div>
        <div v-if="comment.status == 1" v-html="comment.content" class="comment-content mt-1"></div>
        <div v-else-if="comment.status == 2" v-html="comment.reason" class="text-muted"></div>
        <div>
          <span>
            <i
              v-if="likeStatus"
              class="fa fa-thumbs-up comment-like"
              style="color:#1b9cdf"
              v-on:click="iLike"
            ></i>
            <i v-else class="fa fa-thumbs-o-up comment-like" v-on:click="iLike"></i>
            <span class="likeCount mx-2">{{likeTotal > 0 ? likeTotal : ''}}</span>
          </span>
          <span class="mx-3">
            <i
              v-if="unlikeStatus"
              class="fa fa-thumbs-down comment-unlike"
              style="color:#1b9cdf"
              v-on:click="iUnlike"
            ></i>
            <i v-else class="fa fa-thumbs-o-down comment-unlike" v-on:click="iUnlike"></i>
            <span class="unlikeCount mx-2">{{unlikeTotal > 0 ? unlikeTotal : ''}}</span>
          </span>
          <span class="comment-reply mx-4" v-on:click="commentEnterEvent">REPLY</span>
          <div class="float-right mr-5" v-if="comment.status == 1">
            <el-col :span="12">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="fa fa-ellipsis-h comment-operate"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-on:click.native="handleReport"
                    v-if="this.$identify != comment.user_id"
                  >Report</el-dropdown-item>
                  <el-dropdown-item v-on:click.native="del" v-else>Delete</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </div>
          <editor
            v-if="currentReplyId==this.comment.comment_id"
            v-on:editor-content="handleComment"
            v-bind:buttonTxt="'REPLY'"
          ></editor>
        </div>
        <ul class="list-group replyLayout card-list-group comment-reply-list">
          <Reply
            v-for="(reply,key,index) in replys.reply"
            v-bind:key="index"
            v-bind:reply="reply"
            v-bind:user="replys.user[''+reply.user_id]"
            v-bind:euser="replys.user[''+reply.entry_id]"
            v-bind:comment="comment"
            v-on:reply-event="replyEnterEvent"
            v-bind:currentReplyId="currentReplyId"
            v-on:reply-content="replyContentEvnet"
            v-on:login-event="handleLogin"
          ></Reply>
          <div v-if="fold && replys.total>3 && pageSize==3" class="my-2">
            <span
              v-on:click="handleCurrentChange(1)"
              class="moreReply"
            >View {{replys.total}} replies</span>
          </div>
          <div class="block my-2" v-if="pageSize==10 &&  replys.total>pageSize">
            <el-pagination
              small
              background
              layout="prev, pager, next"
              :total="parseInt(replys.total)"
              :page-size="10"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </ul>
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
  </div>
</template>

<script>
import Reply from "./Reply.vue";
import Editor from "./Editor.vue";
export default {
  name: "Comment",
  data() {
    return {
      replys: Array, //回复数据
      dialogVisible: false, //举报对话框打开状态
      reportRadio: String, //举报选项
      fold: Boolean, //回复折叠状态
      page: 1, //当前回复页面
      pageSize: 3, //每页回复页面数
      likeStatus: false, //当前用户对该评论对like状态
      unlikeStatus: false, //当前用户对该评论的unlike状体啊
      likeTotal: 0, //当前评判被like的数量
      unlikeTotal: 0 //当前评论被unlike的数量
    };
  },
  props: {
    comment: Object, //评论object
    user: Object, //评论的用户object
    like: Object, //该评论被like或者是unlike的object
    currentReplyId: Number //当前正在被回复的评论id
  },
  components: {
    Reply,
    Editor
  },
  mounted() {
    this.replyList();
    this.updateLikeUnlikeData();
  },
  methods: {
    del: function() {
      //删除评论事件
      if (!this.$loginStatus) {
        this.$emit("login-event");
        return;
      }
      let data = new FormData();
      data.append("id", this.comment.comment_id);

      this.$http.post("/comment/delete", data).then(response => {
        if (response.data.success) {
          this.$set(
            this.comment,
            "reason",
            "<p class='text-muted'>The comment has been deleted by the author.</p>"
          );
          this.$set(this.comment, "status", 2);
        }
      });
    },
    report: function() {
      //举报评论事件
      if (!(typeof this.reportRadio == "string")) return; //用户是否选择
      let data = new FormData();
      data.append("BookCommentReportForm[comment_id]", this.comment.comment_id);
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
    handleCurrentChange(val) {
      //回复评论页面改变事件
      this.page = val;
      this.pageSize = 10;
      this.replyList();
    },
    replyList: function() {
      //获取回复评论的list
      this.$http
        .get(
          "/comment/r?page=" +
            this.page +
            "&pageSize=" +
            this.pageSize +
            "&id=" +
            this.comment.comment_id
        )
        .then(response => (this.replys = response.data));
    },
    iLike: function() {
      //点赞该评论事件
      if (!this.$loginStatus) {
        this.$emit("login-event");
        return;
      }
      let data = new FormData();
      data.append("id", this.comment.comment_id);
      this.$http.post("/comment/like", data).then(response => {
        if (response.data.success) {
          this.changeLikeStatus(response.data);
        }
      });
    },
    iUnlike: function() {
      //踩该评论事件
      if (!this.$loginStatus) {
        this.$emit("login-event");
        return;
      }

      let data = new FormData();
      data.append("id", this.comment.comment_id);
      this.$http.post("/comment/unlike", data).then(response => {
        if (response.data.success) {
          this.changeLikeStatus(response.data);
        }
      });
    },
    changeLikeStatus: function(response) {
      //切换like和unlike状态
      if (response.data.status == "like") {
        if (response.data.oldStatus == "unlike") {
          this.unlikeTotal--;
          this.likeTotal++;
        } else if (response.data.oldStatus == "none") {
          this.likeTotal++;
        }
        this.likeStatus = true;
        this.unlikeStatus = false;
      } else if (response.data.status == "none") {
        if (response.data.oldStatus == "unlike") {
          this.unlikeTotal--;
        } else if (response.data.oldStatus == "like") {
          this.likeTotal--;
        }
        this.likeStatus = false;
        this.unlikeStatus = false;
      } else if (response.data.status == "unlike") {
        if (response.data.oldStatus == "none") {
          this.unlikeTotal++;
        } else if (response.data.oldStatus == "like") {
          this.unlikeTotal++;
          this.likeTotal--;
        }
        this.likeStatus = false;
        this.unlikeStatus = true;
      }
    },
    handleComment: function(e) {
      //回复该评论事件
      let data = new FormData();
      data.append("BookCommentForm[parent_id]", this.comment.comment_id);
      data.append("BookCommentForm[entry_id]", this.comment.user_id);
      data.append("BookCommentForm[content]", e);

      this.$http.post("/comment/reply", data).then(response => {
        if (response.data.success) {
          let reply = response.data.data;
          this.$set(this.replys.user, "" + reply.user.id, reply.user);
          this.replys.reply.push(reply.reply);
        } else {
          this.$message.error(response.data.data);
        }
      });
    },
    replyEnterEvent: function(e) {
      //子级回复评论按钮被点击触发事件
      this.$emit("reply-event", e);
    },
    commentEnterEvent: function() {
      //回复评论按钮被点击触发事件
      if (!this.$loginStatus) this.$emit("login-event");
      else this.$emit("reply-event", this.comment.comment_id);
    },
    replyContentEvnet: function(e) {
      //子级回复评论事件
      let data = new FormData();
      data.append("BookCommentForm[parent_id]", e.parent_id);
      data.append("BookCommentForm[entry_id]", e.entry_id);
      data.append("BookCommentForm[content]", e.content);

      this.$http.post("/comment/reply", data).then(response => {
        if (response.data.success) {
          let reply = response.data.data;
          this.$set(this.replys.user, "" + reply.user.id, reply.user);
          this.replys.reply.push(reply.reply);
        } else {
          this.$message.error(response.data.data);
        }
      });
    },
    handleReport: function() {
      //举报该评论
      if (!this.$loginStatus) this.$emit("login-event");
      else this.dialogVisible = true;
    },
    handleLogin: function() {
      //子级登陆事件触发
      this.$emit("login-event");
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
    },
    updateLikeUnlikeData() {
      this.likeStatus = this.like && this.like.status == 1;
      this.unlikeStatus = this.like && this.like.status == -1;
      this.likeTotal =
        (this.comment.likeTotal && this.comment.likeTotal[0]
          ? this.comment.likeTotal[0]
          : 0) && this.comment.likeTotal[0].total;
      this.unlikeTotal = -(
        (this.comment.unlikeTotal && this.comment.unlikeTotal[0]
          ? this.comment.unlikeTotal[0]
          : 0) && this.comment.unlikeTotal[0].total
      );
    }
  },
  watch: {
    comment: function() {
      //检测comment是否变化，如果变化，重新加载回复列表
      this.replyList();
      this.updateLikeUnlikeData();
    }
  }
};
</script>
<style>
.fa:hover {
  color: #1b9cdf;
}
.commentMedia:hover .comment-operate {
  display: inline-block;
}
.commentMedia .comment-operate {
  display: none;
}
.moreReply {
  color: #0a0a0a;
  cursor: pointer;
}
a.text-dark-h {
  cursor: pointer;
  color: #0a0a0a;
}
a.text-dark-h:hover {
  color: #0a0a0a;
  text-decoration: none;
}
.comment-content p{
  margin: 0;
}
</style>


