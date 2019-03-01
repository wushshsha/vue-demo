<template>
  <div class="row">
    <div ref="editor" style="text-align:left" class="col-md-10"></div>
    <div class="col-md-2 align-self-end">
      <span class="btn btn-info" v-on:click="getContent">{{buttonTxt}}</span>
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
  props: {
    buttonTxt: String
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

    // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
    this.editor.customConfig.emotions = [
      {
        // tab 的标题
        title: "Default",
        // type -> 'emoji' / 'image'
        type: "image",
        // content -> 数组
        content: [
          {
            alt: "weixioa02",
            src: "/statics/comment/normal/2018new_weixioa02_org.png",
            class: "img-normal-class"
          },
          {
            alt: "huaxin",
            src: "/statics/comment/normal/2018new_huaxin_org.png",
            class: "img-normal-class"
          },
          {
            alt: "ku",
            src: "/statics/comment/normal/2018new_ku_org.png",
            class: "img-normal-class"
          },
          {
            alt: "leimu",
            src: "/statics/comment/normal/2018new_leimu_org.png",
            class: "img-normal-class"
          },
          {
            alt: "haixiu",
            src: "/statics/comment/normal/2018new_haixiu_org.png",
            class: "img-normal-class"
          },
          {
            alt: "bizui",
            src: "/statics/comment/normal/2018new_bizui_org.png",
            class: "img-normal-class"
          },
          {
            alt: "shuijiao_thumb.png",
            src: "/statics/comment/normal/2018new_shuijiao_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "nu_thumb.png",
            src: "/statics/comment/normal/2018new_nu_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "xixi_thumb.png",
            src: "/statics/comment/normal/2018new_xixi_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "chijing",
            src: "/statics/comment/normal/2018new_chijing_org.png",
            class: "img-normal-class"
          },
          {
            alt: "heng_thumb.png",
            src: "/statics/comment/normal/2018new_heng_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "tu",
            src: "/statics/comment/normal/2018new_tu_org.png",
            class: "img-normal-class"
          },
          {
            alt: "touxiao",
            src: "/statics/comment/normal/2018new_touxiao_org.png",
            class: "img-normal-class"
          },
          {
            alt: "keai",
            src: "/statics/comment/normal/2018new_keai_org.png",
            class: "img-normal-class"
          },
          {
            alt: "landelini",
            src: "/statics/comment/normal/2018new_landelini_org.png",
            class: "img-normal-class"
          },
          {
            alt: "kun_thumb.png",
            src: "/statics/comment/normal/2018new_kun_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "haha_thumb.png",
            src: "/statics/comment/normal/2018new_haha_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "zhouma_thumb.png",
            src: "/statics/comment/normal/2018new_zhouma_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "ningwen",
            src: "/statics/comment/normal/2018new_ningwen_org.png",
            class: "img-normal-class"
          },
          {
            alt: "xu",
            src: "/statics/comment/normal/2018new_xu_org.png",
            class: "img-normal-class"
          },
          {
            alt: "yun_thumb.png",
            src: "/statics/comment/normal/2018new_yun_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "shuai_thumb.png",
            src: "/statics/comment/normal/2018new_shuai_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "ding",
            src: "/statics/comment/normal/2018new_ding_org.png",
            class: "img-normal-class"
          },
          {
            alt: "baibai_thumb.png",
            src: "/statics/comment/normal/2018new_baibai_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "han",
            src: "/statics/comment/normal/2018new_han_org.png",
            class: "img-normal-class"
          },
          {
            alt: "wabi_thumb.png",
            src: "/statics/comment/normal/2018new_wabi_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "guzhang_thumb.png",
            src: "/statics/comment/normal/2018new_guzhang_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "huaixiao",
            src: "/statics/comment/normal/2018new_huaixiao_org.png",
            class: "img-normal-class"
          },
          {
            alt: "zuohengheng_thumb.png",
            src: "/statics/comment/normal/2018new_zuohengheng_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "youhengheng_thumb.png",
            src: "/statics/comment/normal/2018new_youhengheng_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "dahaqian",
            src: "/statics/comment/normal/2018new_dahaqian_org.png",
            class: "img-normal-class"
          },
          {
            alt: "bishi",
            src: "/statics/comment/normal/2018new_bishi_org.png",
            class: "img-normal-class"
          },
          {
            alt: "weiqu_thumb.png",
            src: "/statics/comment/normal/2018new_weiqu_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "beishang",
            src: "/statics/comment/normal/2018new_beishang_org.png",
            class: "img-normal-class"
          },
          {
            alt: "yinxian",
            src: "/statics/comment/normal/2018new_yinxian_org.png",
            class: "img-normal-class"
          },
          {
            alt: "qinqin_thumb.png",
            src: "/statics/comment/normal/2018new_qinqin_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "kelian",
            src: "/statics/comment/normal/2018new_kelian_org.png",
            class: "img-normal-class"
          },
          {
            alt: "kuxiao",
            src: "/statics/comment/normal/2018new_kuxiao_org.png",
            class: "img-normal-class"
          },
          {
            alt: "jiyan",
            src: "/statics/comment/normal/2018new_jiyan_org.png",
            class: "img-normal-class"
          },
          {
            alt: "xiaoku_thumb.png",
            src: "/statics/comment/normal/2018new_xiaoku_thumb.png",
            class: "img-normal-class"
          },

          {
            alt: "aini",
            src: "/statics/comment/normal/2018new_aini_org.png",
            class: "img-normal-class"
          },
          {
            alt: "bingbujiandan_thumb.png",
            src: "/statics/comment/normal/2018new_bingbujiandan_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "chanzui",
            src: "/statics/comment/normal/2018new_chanzui_org.png",
            class: "img-normal-class"
          },
          {
            alt: "chigua_thumb.png",
            src: "/statics/comment/normal/2018new_chigua_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "chongjing",
            src: "/statics/comment/normal/2018new_chongjing_org.png",
            class: "img-normal-class"
          },
          {
            alt: "dalian",
            src: "/statics/comment/normal/2018new_dalian_org.png",
            class: "img-normal-class"
          },
          {
            alt: "heixian_thumb.png",
            src: "/statics/comment/normal/2018new_heixian_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "kouzhao_thumb.png",
            src: "/statics/comment/normal/2018new_kouzhao_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "qian_thumb.png",
            src: "/statics/comment/normal/2018new_qian_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "shayan",
            src: "/statics/comment/normal/2018new_shayan_org.png",
            class: "img-normal-class"
          },
          {
            alt: "shengbing_thumb.png",
            src: "/statics/comment/normal/2018new_shengbing_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "sikao",
            src: "/statics/comment/normal/2018new_sikao_org.png",
            class: "img-normal-class"
          },
          {
            alt: "taikaixin",
            src: "/statics/comment/normal/2018new_taikaixin_org.png",
            class: "img-normal-class"
          },
          {
            alt: "tianping_thumb.png",
            src: "/statics/comment/normal/2018new_tianping_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "wenhao_thumb.png",
            src: "/statics/comment/normal/2018new_wenhao_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "wu_thumb.png",
            src: "/statics/comment/normal/2018new_wu_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "xiaoerbuyu",
            src: "/statics/comment/normal/2018new_xiaoerbuyu_org.png",
            class: "img-normal-class"
          },
          {
            alt: "zhuakuang",
            src: "/statics/comment/normal/2018new_zhuakuang_org.png",
            class: "img-normal-class"
          },
          {
            alt: "zuoyi",
            src: "/statics/comment/normal/2018new_zuoyi_org.png",
            class: "img-normal-class"
          },
          {
            alt: "good",
            src: "/statics/comment/normal/2018new_good_org.png",
            class: "img-normal-class"
          },
          {
            alt: "guolai_thumb.png",
            src: "/statics/comment/normal/2018new_guolai_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "jiayou",
            src: "/statics/comment/normal/2018new_jiayou_org.png",
            class: "img-normal-class"
          },
          {
            alt: "no",
            src: "/statics/comment/normal/2018new_no_org.png",
            class: "img-normal-class"
          },
          {
            alt: "ok",
            src: "/statics/comment/normal/2018new_ok_org.png",
            class: "img-normal-class"
          },
          {
            alt: "ruo",
            src: "/statics/comment/normal/2018new_ruo_org.png",
            class: "img-normal-class"
          },
          {
            alt: "woshou_thumb.png",
            src: "/statics/comment/normal/2018new_woshou_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "ye_thumb.png",
            src: "/statics/comment/normal/2018new_ye_thumb.png",
            class: "img-normal-class"
          },
          {
            alt: "zan",
            src: "/statics/comment/normal/2018new_zan_org.png",
            class: "img-normal-class"
          }
        ]
      }
    ];

    this.editor.customConfig.zIndex = 500;
    this.editor.create();
  }
};
</script>

<style>
.w-e-text-container {
  height: 65px !important;
}
.w-e-text p{
  margin: 0;
}
img.img-normal-class {
  width: 22px;
  height: 22px;
}
</style>
