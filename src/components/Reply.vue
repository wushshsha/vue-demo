<template>
  <li class="media replyMedia mt-4" v-bind:id="reply.comment_id">
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
        <span class="comment-reply btn btn-white btn-sm">Comment</span>
        <div class="float-right mr-5">
          <el-col :span="12">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="fa fa-ellipsis-h reply-operate"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Report</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  name: "reply",
  props: {
    reply: Object,
    user: Object,
    euser: Object,
    comment: Object
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

