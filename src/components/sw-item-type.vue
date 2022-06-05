<template>
  <div class="item-type" v-if="state_data.loaded">
    <b-button block size="sm" variant="outline-secondary" class="p-2 text-left" 
      :title="lang('click_add_item')" @click="onClick()" >
      <b-icon :icon="bind_data.type_info.icon_name" scale="1" aria-hidden="true"></b-icon>
      <span class="ml-3"> {{ bind_data.type_info.type_desc }}</span>
    </b-button>
  </div>
  
</template>

<script>
import lang from './lang.json';
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";

export default {
  name: 'ItemType',
  components: {
  },
  props: {
    // ItemType情報
    type_info: Object, 
  },
  // ローカルデータ変数
  data () {
    return {
      // バインドデータ
      bind_data: {
        type_info: null,
      },
      state_data: {
        loaded: false,
      }
    }
  },
  // 既定計算
  computed: {
  },
  // 監視
  watch: {
    type_info: {
      handler: function(){
        if( this.item_info != null ){
          this.bind_data.type_info = this.type_info;
        }
      },
      deep: true,
    }
  },
  // インスタンス初期化後
  created(){
  },
  // インスタンス破棄後
  destroyed() {
  },
  // インスタンスマウント後
  mounted(){
    this.bind_data.type_info = this.type_info;
    this.$nextTick(function() {
      this.state_data.loaded = true;
    })
  },
  // ローカル関数
  methods: {
    lang: function( param ){
      return lang[locale][param];
    },
    onClick: function(){
      this.$emit("add_item_method",this.bind_data.type_info);
    }
  }
};
</script>
<style scoped>
.item-type {
  text-align: left;
  padding: 4px;
}
</style>