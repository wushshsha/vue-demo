<template>
  <li class="list-group-item py-5" v-bind:data-key="comment.comment_id">
    <div class="media">
      <div
        class="media-object avatar avatar-md mr-4"
        v-bind:style="'background-image: url(//online2.html5zilla.com/'+comment.user.profile.avatar+')'"
      ></div>
      <div class="media-body">
        <div>
          <a :href="'/user/book/'+comment.user_id">{{comment.user.username}}</a>
        </div>
        <div style="margin-bottom: -15px;" v-html="comment.content">
        </div>
        <div>
          <small class="text-muted">{{new Date(parseInt(comment.created_at)).Format("yyyy-MM-dd HH:mm:ss")}}</small>
          <span class="mx-2">
            <i class="fa fa-thumbs-o-up comment-like" ></i>
            <span class="likeCount"></span>
          </span>
          <span class="mx-2">
            <i class="fa fa-thumbs-o-down comment-unlike" data-key="224"></i>
            <span class="unlikeCount"></span>
          </span>
          <span class="comment-reply btn btn-white btn-sm" data-key="224" data-user="54">Comment</span>
          <div class="float-right mr-5 dropdown">
            <i class="fa fa-ellipsis-h comment-operate" data-toggle="dropdown"></i>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow hoverContainer-item">
              <span class="dropdown-item d-flex commentReport" data-key="224">Report</span>
            </div>
          </div>
        </div>
        <ul class="list-group replyLayout card-list-group comment-reply-list">
          <Reply></Reply>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
import Reply from "./Reply.vue";
export default {
  name: "Comment",
  data() {
      return {
          commentId: Number
      };
  },
  props: {
    comment: Object
  },
  components: {
    Reply
  },
  created:function(){
      window.console.log(this.comment);
  }

};
</script>

