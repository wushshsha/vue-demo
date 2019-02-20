<template>
  <div id="app" class="container">
    <ul class="list-group card-list-group" >
      <Comment  v-for="(comment,key,index) in comment()" v-bind:key="index" v-bind:comment="comment"></Comment>
    </ul>
    <div class="bg-white border-top">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
import Comment from "./components/Comment.vue";

export default {
  name: "app",
  components: {
    Comment
  },
  methods: {
    comment: function(){
      /*let data = {
        comments:  [{"comment_id":"225","parent_id":"0","entry_id":"1","user_id":"54","content":"<p>是否</p>","type":"1","status":"1","reply_status":"1","reason":"","created_at":"1550311402","updated_at":"1550311402","user":{"id":"54","uname":"nextflipdebug1","username":"Nextflipdebug1","password_hash":"570ffd3d85d666e91b83814d9a1f994a","email":"wushshsha@163.com","auth_key":"gWVFNzJxXxAGvlFnZy_EjLa2edov3qnu","access_token":"IDnq6ySwiccq3DJa1BTTB2l8KbwNgbFR1544521265","password_reset_token":"Csupz2yWk0Mppzif25a9YQags5DcSVM__1545117054","status":"1","ip":"85.203.47.220","referer":"online","created_at":"1534756945","updated_at":"1545117054","captcha":null,"profile":{"user_id":"54","about_me":"","company":"","city":"","country":"","website":"","avatar":"dnka/user_resource/1545385024.png","background":"dnka/user_resource/1545803891.jpeg"}},"myLike":null}],
      };* */
      
      let data = [{"comment_id":"225","parent_id":"0","entry_id":"1","user_id":"54","content":"<p>是否</p>","type":"1","status":"1","reply_status":"1","reason":"","created_at":"1550311402","updated_at":"1550311402","user":{"id":"54","uname":"nextflipdebug1","username":"Nextflipdebug1","password_hash":"570ffd3d85d666e91b83814d9a1f994a","email":"wushshsha@163.com","auth_key":"gWVFNzJxXxAGvlFnZy_EjLa2edov3qnu","access_token":"IDnq6ySwiccq3DJa1BTTB2l8KbwNgbFR1544521265","password_reset_token":"Csupz2yWk0Mppzif25a9YQags5DcSVM__1545117054","status":"1","ip":"85.203.47.220","referer":"online","created_at":"1534756945","updated_at":"1545117054","captcha":null,"profile":{"user_id":"54","about_me":"","company":"","city":"","country":"","website":"","avatar":"dnka/user_resource/1545385024.png","background":"dnka/user_resource/1545803891.jpeg"}},"myLike":null}];
      return data;
    }
  } 
};
</script>