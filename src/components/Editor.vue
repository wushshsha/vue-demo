<template>
  <div class="row">
    <div ref="editor" style="text-align:left" class="col-md-10"></div>
    <div class="col-md-2 align-self-end">
      <span class="btn btn-info" v-on:click="getContent">REPLY</span>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";

export default {
  name: "Editor",
  data() {
    return {
      editorContent: "",
      editor: Object
    };
  },
  methods: {
    getContent: function() {
      if (this.editorContent.length > 8) {
        this.$emit("editor-content", this.editorContent);
        this.editor.txt.clear();
      }
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.onchange = html => {
      let temp = html.replace(/<p><br><\/p>/g, "");
      this.editorContent = temp;
    };
    this.editor.customConfig.onblur = html => {
      let temp = html.replace(/<p><br><\/p>/g, "");
      this.editorContent = temp;
    };
    this.editor.customConfig.menus = [
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
    this.editor.customConfig.zIndex = 500;
    this.editor.create();
  }
};
</script>

<style>
.w-e-text-container {
  height: 50px !important;
}
</style>
