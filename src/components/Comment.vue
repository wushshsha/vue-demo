<template>
  <li
    class="list-group-item py-5"
    v-bind:id="comment.comment_id"
    v-if="comment.status == 1 || (comment.status != 1 && replys.reply && replys.reply.length > 0)"
  >
    <div class="media commentMedia">
      <div
        class="media-object avatar avatar-md mr-4"
        v-bind:style="'background-image: url(//online2.html5zilla.com/'+user.profile.avatar+')'"
      ></div>
      <div class="media-body">
        <div>
          <a :href="'/user/book/'+comment.user_id">{{user.username}}</a>
        </div>
        <div style="margin-bottom: -15px;">
          <div v-if="comment.status == 1" v-html="comment.content"></div>
          <div v-else-if="comment.status == 2" v-html="comment.reason" class="text-muted"></div>
        </div>
        <div>
          <small class="text-muted">{{ Date(parseInt(comment.created_at))}}</small>
          <span class="mx-2">
            <i class="fa fa-thumbs-o-up comment-like"></i>
            <span class="likeCount"></span>
          </span>
          <span class="mx-2">
            <i class="fa fa-thumbs-o-down comment-unlike"></i>
            <span class="unlikeCount"></span>
          </span>
          <span class="comment-reply btn btn-white btn-sm">Comment</span>
          <div class="float-right mr-5" v-if="comment.status == 1">
            <el-col :span="12">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="fa fa-ellipsis-h comment-operate"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-on:click.native="dialogVisible = true"
                    v-if="this.$identify != comment.user_id"
                  >Report</el-dropdown-item>
                  <el-dropdown-item v-on:click.native="del" v-else>Delete</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </div>
        </div>
        <ul class="list-group replyLayout card-list-group comment-reply-list">
          <Reply
            v-for="(reply,key,index) in replys.reply"
            v-bind:key="index"
            v-bind:reply="reply"
            v-bind:user="replys.user[''+reply.user_id]"
            v-bind:euser="replys.user[''+reply.entry_id]"
            v-bind:comment="comment"
          ></Reply>
          <div v-if="fold && replys.total>3 && pageSize==3">
            共{{replys.total}}条回复，
            <span v-on:click="pageSize=10; handleCurrentChange(1)">点击查看</span>
          </div>
          <div class="block" v-if="pageSize==10 &&  replys.total>pageSize">
            <el-pagination
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
import Reply from "./Reply.vue";
export default {
  name: "Comment",
  data() {
    return {
      replys: Array, //回复数据
      dialogVisible: false, //对话框打开状态
      reportRadio: Number, //举报选项
      fold: Boolean, //折叠状态
      page: 1,
      pageSize: 3
    };
  },
  props: {
    comment: Object,
    user: Object
  },
  components: {
    Reply
  },
  mounted() {
    this.replyList();
  },
  methods: {
    reply: function() {},
    del: function() {
      window.console.log("delete");
      let data = new FormData();
      data.append("id", this.comment.comment_id);

      this.$http.post("/comment/delete", data).then(response => {
        window.console.log(response);
        if (response.data.success)
          this.comment.content = "<p class='text-muted'>该评论已经被删除</p>";
      });
    },
    report: function() {
      window.console.log("report");
      let data = new FormData();
      data.append("BookCommentReportForm[comment_id]", this.comment.comment_id);
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
    handleCurrentChange(val) {
      this.page = val;
      this.pageSize = 10;
      window.console.log(`当前页: ${val}`);
      this.replyList();
    },
    replyList: function() {
      this.$http
        .get(
          "/comment/r?page=" +
            this.page +
            "&pageSize=" +
            this.pageSize +
            "&id=" +
            this.comment.comment_id
        )
        .then(
          response => (
            (this.replys = response.data), window.console.log(response)
          )
        );
    }
  },
  watch: {
    comment: function(){
      this.replyList();
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
</style>

