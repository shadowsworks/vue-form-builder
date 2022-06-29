<template>
  <div class="form-inputter text-left" v-if="state_data.loaded">
    <div v-for="(item_info,index) in bind_data.form_info.item_info" :key="item_info.item_uuid">
      <div v-show="show_judgement(item_info,bind_data.form_data)" v-bind:class="bind_data.line_space">
        <sw-item-inputter 
          :font_info="bind_data.form_info.font_info"
          :item_info="item_info" 
          :item_data="bind_data.form_data.item_data[index]" 
          :list_info="bind_data.form_list_info" 
          v-model="bind_data.form_data.item_data[index]" />
      </div>
    </div>
    <div v-if="debug">form_info {{ JSON.stringify(bind_data.form_info,null,2) }}</div>
    <div v-if="debug"><hr></div>
    <div v-if="debug">form_data(in) {{ JSON.stringify(form_data,null,2) }}</div>
    <div v-if="debug"><hr></div>
    <div v-if="debug">form_data(out) {{ JSON.stringify(bind_data.form_data,null,2) }}</div>
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
    form_info: {
      type: Object,
      default: () => null
    },
    // Form情報
    form_data: {
      type: Object,
      default: () => null,
    },
    // Pulldown情報
    form_list_info: {
      type: Array, 
      default: null
    },
    line_space: {
      type: Number, 
      default: 0
    },
    // デバッグ情報
    debug: {
      type: Boolean,
      default: false
    }
  },
  // ローカルデータ変数
  data () {
    return {
      // バインドデータ
      bind_data: {
        form_info: null,
        form_list_info: null,
        form_data: {
          version: "", 
          update: "", 
          desc: "", 
          font_info: "small",
          item_data: []
        },
        line_space: "mt-0",
      },
      state_data: {
        loaded: false,
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
    form_list_info: {
      handler: function(){
        if( this.form_list_info !== null ){
          this.bind_data.form_list_info = this.form_list_info;
        }
      },
      deep: true,
    },
    'bind_data.form_data': {
      handler: function(){
        this.$emit('input',this.bind_data.form_data);
      },
      deep: true,
    },
    line_space: {
      handler: function(){
        this.bind_data.line_space = "mt-"+String(this.line_space);
      }
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
    if( this.form_list_info !== null ){
      this.bind_data.form_list_info = this.form_list_info;
    }
    this.bind_data.line_space = "mt-"+String(this.line_space);
    //this.bind_data.font_info = this.font_info;
    this.data_set();
    this.reset();
    this.$emit('input',this.bind_data.form_data);
  },
  // ローカル関数
  methods: {
    lang: function( param ){
      return lang[locale][param];
    },
    data_set: function(){
      if( this.form_info != null ){
        this.bind_data.form_info = JSON.parse(JSON.stringify(this.form_info));
        this.bind_data.form_data.version = this.bind_data.form_info.version;
        this.bind_data.form_data.update = this.bind_data.form_info.update;
        this.bind_data.form_data.desc = this.bind_data.form_info.desc;
        this.bind_data.form_data.font_info = this.bind_data.form_info.font_info;
        this.bind_data.form_data.item_data = [];
        if( this.form_data != null ){
          //console.log("FormInputter:methods:data_set1:");
          for( let i=0;i<this.bind_data.form_info.item_info.length;i++ ){
            //if( this.debug ) console.log("FormInputter:methods:this.form_data=:"+JSON.stringify(this.form_data));
            for( let j=0;j<this.form_data.item_data.length;j++ ){
              if( this.bind_data.form_info.item_info[i].item_uuid === this.form_data.item_data[j].item_uuid ){
                this.bind_data.form_data.item_data.push(this.form_data.item_data[j].item_data);
                //if( this.debug ) console.log("FormInputter:data_set:"+JSON.stringify(this.form_data.item_data[j],null,2));
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
    reset: function(){
      if( this.bind_data.form_info != null ){
        this.state_data.loaded = false;
        this.$nextTick(function() {
          this.state_data.loaded = true;
        })
      }
    },
    // 
    is_input_completed: function(){
      if( this.bind_data.form_data.item_data.length > 0 ){
        for( let i=0;i<this.bind_data.form_data.item_data.length;i++ ){
          if( this.bind_data.form_data.item_data[i].item_state === false ){
            return false;
          } 
        }
        return true;
      } else {
        return false;
      }
    },
    show_judgement(item_info,form_data){
      //console.log("show_judgement:item_info="+JSON.stringify(item_info,null,2));
      //console.log("show_judgement:item_info.item_condition_use="+item_info.item_condition_use);
      //console.log("show_judgement:form_data="+JSON.stringify(form_data,null,2));
      if( !item_info.item_condition_use ){
        return true;
      }
      for( let i=0;i<form_data.item_data.length;i++ ){
        if( form_data.item_data[i] !== null ){
          if( item_info.item_condition_key == form_data.item_data[i].item_key ){
            if( Array.isArray(form_data.item_data[i].item_data) ){
              for( let j=0;j<form_data.item_data[i].item_data.length;j++ ){
                if( item_info.item_condition_value == form_data.item_data[i].item_data[j] ){
                  return true;
                }
              }
            } else {
              if( item_info.item_condition_value == form_data.item_data[i].item_data ){
                return true;
              }
            }
          }
        }
      }
      return false;
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