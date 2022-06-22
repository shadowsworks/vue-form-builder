<template>
  <div class="markdown-viewer">
    <div class="preview_mode">
      <div class="markdown-body" v-html="state_md_text"></div>
    </div>
  </div>
</template>

<script>
import markdownit from 'markdown-it';
import 'github-markdown-css/github-markdown.css'
export default {
  name: 'sw-markdown-viewer',
  components: {
  },
  props: {
    // マークダウン
    md_text: {
      type: String,
      default: ""
    },
  },
  // ローカルデータ変数
  data () {
    return {
      markdownit: null, //マークダウンオブジェクト
      state_md_text: "",
    }
  },
  // 既定計算
  computed: {
  },
  // 監視
  watch: {
    md_text: function(){
      if( this.md_text !== null ){
        this.state_md_text = this.bconvert(this.markdownit.render(this.md_text));
        //console.log("md_text="+this.state_md_text)
      }
    },
  },
  // インスタンス初期化後
  created(){
    this.markdownit = new markdownit();
  },
  // インスタンス破棄後
  destroyed() {
  },
  // インスタンスマウント後
  mounted(){
    if( this.md_text !== null ){
      this.state_md_text = this.bconvert(this.markdownit.render(this.md_text));
    }
  },
  // ローカル関数
  methods: {
    bconvert: function( data ){
      return data;
    }
  }
};
</script>
<style scoped>
.markdown-viewer {
  text-align: left;
  padding: 4px;
}
.preview_mode {
  box-sizing: border-box;
  margin: 7px 0px 7px 0px;
}
</style>