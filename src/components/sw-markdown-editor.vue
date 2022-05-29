<template>
  <div class="markdown-editor">
    <div v-if='!state_preview_mode'>
      <b-form-textarea v-model="state_textarea" :placeholder="state_placeholder" 
        :rows="state_rows" :maxlength="state_max_length"
        :state="state_item(state_textarea,state_must)" />
    </div>
    <div v-if='!state_preview_mode' class="mt-1">
      <div v-if='!state_preview_mode' class="mt-0 float-right">
        <b-button variant="outline-secondary" size="sm" @click="mode_change">{{ lang('preview') }}</b-button>
      </div>
    </div>
    
    <div v-if='state_preview_mode' class="preview_mode">
      <div class="markdown-body" v-html="state_result"></div>
    </div>
    <div v-if='state_preview_mode' class="mt-2 float-right">
      <b-button variant="outline-secondary" size="sm" @click="mode_change">{{ lang('back') }}</b-button>
    </div>
    <div>&nbsp;</div>
  </div>
</template>

<script>
import lang from './lang.json';
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";

import markdownit from 'markdown-it';
import 'github-markdown-css/github-markdown.css';

export default {
  name: 'sw-markdown-editor',
  components: {
  },
  props: {
    // 行数
		rows: {
      type: Number,
      default: 0
    },
    // 最大文字数
    max_length: {
      type: Number,
      default: 10
    },
    // 必須
    must: {
      type: Boolean,
      default: false
    },
    // プレースホルダー
    placeholder: {
      type: String,
      default: ""
    },
  },
  // ローカルデータ変数
  data () {
    return {
      markdownit: null, //マークダウンオブジェクト
      state_rows: 3, // 行数
      state_max_length: 10, // 最大文字数
      state_must: false, // 必須
      state_placeholder: "",
      state_preview_mode: false,  //プレビューモード
      state_textarea: "",
      state_result: "TEXT"
    }
  },
  // 既定計算
  computed: {
    state_item: function() {
      return function(item_data,item_must){
        if( item_must ){
          if( item_data === "" ){
            return false;
          } else {
            return true;
          }
        } else {
          return null;
        }
      }
    },
  },
  // 監視
  watch: {
    rows: function(){
      this.state_rows = this.rows;
    },
    max_length: function(){
      this.state_max_length = this.max_length;
    },
    must: function(){
      this.state_must = this.must;
    },
    placeholder: function(){
      this.state_placeholder = this.placeholder;
    },
    state_textarea: function(){
      this.$emit('input',this.state_textarea);
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
    this.state_rows = this.rows;
    this.state_max_length = this.max_max_length;
    this.state_placeholder = this.placeholder;
  },
  // ローカル関数
  methods: {
    lang: function( param ){
      return lang[locale][param];
    },
    mode_change: function(){
      this.state_preview_mode = !this.state_preview_mode;
      this.state_result = this.markdownit.render(this.state_textarea);
    }
  }
};
</script>
<style scoped>
.markdown-editor {
  text-align: left;
  padding: 4px;
}
.preview_mode {
  box-sizing: border-box;
  margin: 7px 12px 7px 12px;
}
</style>