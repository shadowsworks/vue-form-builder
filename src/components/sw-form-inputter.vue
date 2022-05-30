<template>
  <div class="form-inputter text-left" v-if="state_data.loaded">
    <div v-for="(item_info,index) in bind_data.form_info.item_info" :key="item_info.item_uuid">
      <sw-item-inputter :item_info="item_info" :item_data="bind_data.form_data.item_data[index]" v-model="bind_data.form_data.item_data[index]" />
    </div>
    <div v-if="state_data.debug">{{ JSON.stringify(bind_data.form_info,null,2) }}</div>
    <div v-if="state_data.debug">{{ JSON.stringify(bind_data.form_data,null,2) }}</div>
  </div>
</template>

<script>
import lang from './lang.json';
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";

import swItemInputter from '@/components/sw-item-inputter';
export default {
  name: 'sw-form-inputter',
  components: {
    swItemInputter
  },
  props: {
    // Form情報
    form_info: Object, 
    // Form情報
    form_data: Object, 
  },
  // ローカルデータ変数
  data () {
    return {
      // バインドデータ
      bind_data: {
        form_info: null,
        form_data: {
          item_data: []
        },
      },
      state_data: {
        loaded: false,
        debug: false,
      },
    }
  },
  // 既定計算
  computed: {
  },
  // 監視
  watch: {
    form_info: {
      handler: function(){
        this.data_set();
        this.reset();
      },
      deep: true,
    },
    form_data: {
      handler: function(){
        this.data_set();
        this.reset();
      },
      deep: true,
    },
    'bind_data.form_data': {
      handler: function(){
        this.$emit('input',this.bind_data.form_data);
      },
      deep: true,
    },
  },
  // インスタンス初期化後
  created(){
    //console.log("FormInputter:created");
  },
  // インスタンス破棄後
  destroyed() {
    //console.log("FormInputter:destroyed");
  },
  // インスタンスマウント後
  mounted(){
    //console.log("FormInputter:mounted:this.form_info:"+JSON.stringify(this.form_info));
    //console.log("FormInputter:mounted:this.form_data:"+JSON.stringify(this.form_data));
    this.data_set();
    this.reset();
    this.$emit('input',this.bind_data.form_data);
  },
  // ローカル関数
  methods: {
    lang: function( param ){
      return lang[locale][param];
    },
    data_set(){
      if( this.form_info !== undefined && this.form_info != null ){
        this.bind_data.form_info = this.form_info;
        if( this.form_data !== undefined  && this.form_data != null ){
          //console.log("FormInputter:methods:data_set1:");
          for( let i=0;i<this.bind_data.form_info.item_info.length;i++ ){
            for( let j=0;j<this.form_data.item_data.length;j++ ){
              if( this.bind_data.form_info.item_info[i].item_uuid === this.form_data.item_data[j].item_uuid ){
                this.bind_data.form_data.item_data.push(this.form_data.item_data[j].item_data);
                //console.log("FormInputter:mounted:this.form_data.item_data[j]"+JSON.stringify(this.form_data.item_data[j]));
              }
            }
          }
        } else {
          //console.log("FormInputter:methods:data_set2:");
          for( let i=0;i<this.bind_data.form_info.item_info.length;i++ ){
            this.bind_data.form_data.item_data.push(null);
          }
        }
      }
    },
    reset(){
      if( this.bind_data.form_info != null ){
        this.state_data.loaded = false;
        this.$nextTick(function() {
          this.state_data.loaded = true;
        })
      }
    }
  }
};
</script>
<style scoped>
.form-inputter {
  text-align: left;
  padding: 4px;
}
</style>