<template>
  <div class="form-editor" v-if="state_data.loaded">
    <b-row class="text-left">
      <b-col cols="3" class="border-right">
        <div class="text-secondary mx-1 mt-0 mb-2 small border-bottom" >{{ lang('item_type_to_add') }}</div>
        <div v-if='type_option=="tile"'>
          <b-row class="mx-1">
            <b-col cols="6" class="item mx-0 px-0" v-for="(type_info) in bind_data.type_info" :key="type_info.item_type">
              <sw-item-type :type_info="type_info" :type_option="type_option" @add_item_method="add_item_method" />
            </b-col>
          </b-row>
        </div>
        <div v-if='type_option=="list"'>
          <div class="item m-1" v-for="(type_info) in bind_data.type_info" :key="type_info.item_type">
            <sw-item-type :type_info="type_info" :type_option="type_option" @add_item_method="add_item_method" />
          </div>
        </div>
      </b-col>
      <b-col cols="5">
        <div class="text-secondary mx-1 mt-0 mb-2 small border-bottom" >{{ lang('item_setting') }}</div>
        <draggable v-model="bind_data.form_info.item_info" group="myGroup2">
          <div class="item m-1" v-for="(item_info,index) in bind_data.form_info.item_info" :key="item_info.item_uuid">
            <sw-item-editor :item_info="item_info" :item_key_option="bind_data.item_key_option" :item_condition_option="bind_data.item_condition_option" 
              v-model="bind_data.form_info.item_info[index]" @copy_item_method="copy_item_method" @delete_item_method="delete_item_method" />
          </div>
        </draggable>
      </b-col>
      <b-col cols="4" class="border-left">
        <div class="text-secondary mx-1 mt-0 mb-2 small border-bottom" >{{ lang('preview') }}</div>
        <div v-for="(item_info,index) in bind_data.form_info.item_info" :key="item_info.item_uuid">
          <sw-item-inputter :item_info="item_info" v-model="local_data.item_data[index]" />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import lang from './lang.json';
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";

import draggable from 'vuedraggable';
import swItemEditor from '@/components/sw-item-editor';
import swItemInputter from '@/components/sw-item-inputter';
import swItemType from '@/components/sw-item-type';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'sw-form-editor',
  components: {
    draggable,swItemEditor,swItemInputter,swItemType
  },
  props: {
    // 編集の時は Item情報 を指定
    form_info: Object,
    //
    type_info: [ String, Array, Number ],
    //
    type_option: {
      type:  String,
      default: "list"
    },
    //
    item_key_option: {
      type:  String,
      default: "false"
    },
    item_condition_option: {
      type:  String,
      default: "false"
    },
  },
  // ローカルデータ変数
  data () {
    return {
      // バインドデータ
      bind_data: {
        type_info: [],
        type_option: "",
        item_data: [],
        form_info: {
          version: require('../../package.json').version,
          update: require('../../package.json').update,
          desc: "",
          item_info: [],
        },
        item_key_option: "false",
        item_condition_option: "false",
      },
      state_data: {
        loaded: false
      },
      local_data: {
        type_info: [
          { item_type: "text", type_desc: lang[locale].short_text, icon_name: "type", level: 1 },
          { item_type: "texts", type_desc: lang[locale].long_text, icon_name: "pencil", level: 1 },
          { item_type: "number", type_desc: lang[locale].numeric, icon_name: "dice-6", level: 1 },
          { item_type: "radio", type_desc: lang[locale].radio, icon_name: "check-circle", level: 1 },
          { item_type: "checkbox", type_desc: lang[locale].checkbox, icon_name: "check-square", level: 1 },
          { item_type: "boolean", type_desc: lang[locale].switch, icon_name: "toggle-on", level: 1 },
          { item_type: "date", type_desc: lang[locale].date, icon_name: "calendar-date", level: 1 },
          { item_type: "time", type_desc: lang[locale].time, icon_name: "clock", level: 1 },
          { item_type: "datetime", type_desc: lang[locale].datetime, icon_name: "calendar-plus", level: 1 },
          { item_type: "image", type_desc: lang[locale].image, icon_name: "image", level: 2 },
          { item_type: "password", type_desc: lang[locale].password, icon_name: "key", level: 2 },
          { item_type: "name", type_desc: lang[locale].full_name, icon_name: "person-square", level: 2 },
          { item_type: "telephone", type_desc: lang[locale].phone_number, icon_name: "telephone", level: 2 },
          { item_type: "email", type_desc: lang[locale].email, icon_name: "envelope", level: 2 },
          //{ item_type: "select", type_desc: "プルダウン選択", icon_name: "card-list", level: 2 },
          { item_type: "table", type_desc: lang[locale].table, icon_name: "table", level: 3 },
          { item_type: "markdown", type_desc: lang[locale].markdown, icon_name: "markdown", level: 3 },
        ],
        item_data: [],
      }
    }
  },
  // 既定計算
  computed: {
  },
  // 監視
  watch: {
    form_info() {
      if( this.form_info !== null ){
        this.bind_data.form_info = this.form_info;
      }
    },
    item_key_option(){
      this.bind_data.item_key_option = this.item_key_option;
    },
    item_condition_option(){
      this.bind_data.item_condition_option = this.item_condition_option;
    },
    bind_data: {
      handler: function(){
        this.reset_seq();
        this.$emit('input',this.bind_data.form_info);
      },
      deep: true,
    },
    type_info: {
      handler: function(){
        this.set_type_info();
      },
      deep: true,
    },
    type_option(){
      this.bind_data.type_option = this.type_option;
    },
  },
  // インスタンス初期化後
  created(){
  },
  // インスタンス破棄後
  destroyed() {
  },
  // インスタンスマウント後
  mounted(){
    this.bind_data.item_key_option = this.item_key_option;
    this.bind_data.item_condition_option = this.item_condition_option;
    if( this.form_info !== undefined ){
      if( this.form_info !== null ){
        this.bind_data.form_info = this.form_info;
      }
    }
    this.set_type_info();
    this.$nextTick(function() {
      this.state_data.loaded = true;
    })
    this.$emit('input',this.bind_data.form_info);
  },
  // ローカル関数
  methods: {
    lang: function( param ){
      return lang[locale][param];
    },
    add_item_method: function( type_info ){
      //console.log(JSON.stringify(type_info));
      this.bind_data.form_info.item_info.push(type_info);
      this.bind_data.item_data.push("");
      this.reset_seq();
    },
    copy_item_method: function( item_info ){
      //console.log(JSON.stringify(item_info));
      let copy_item = JSON.parse(JSON.stringify(item_info));
      copy_item.item_uuid = uuidv4();
      this.bind_data.form_info.item_info.push(copy_item);
      this.bind_data.item_data.push("");
      this.reset_seq();
    },
    delete_item_method: function( item_info ){
      //console.log(JSON.stringify(item_info));
      for( let i=0;i<this.bind_data.form_info.item_info.length;i++ ){
        if( this.bind_data.form_info.item_info[i].item_uuid == item_info.item_uuid ){
          this.bind_data.form_info.item_info.splice(i, 1);
        }
      }
      for( let i=0;i<this.bind_data.item_data.length;i++ ){
        if( this.bind_data.item_data[i].item_uuid == item_info.item_uuid ){
          this.bind_data.item_data.splice(i, 1);
        }
      }
      this.reset_seq();
    },
    reset_seq: function(){
      //console.log("reset_seq="+JSON.stringify(this.bind_data.form_info));
      if( this.bind_data.form_info !== undefined ){
        for( let i=0;i<this.bind_data.form_info.item_info.length;i++ ){
          this.bind_data.form_info.item_info[i].item_seq = i;
        }
      }
    },
    set_type_info: function(){
      //console.log("FormEditor:set_type_info="+this.type_info);
      this.bind_data.type_info = [];
      if( this.type_info === undefined ){
        this.bind_data.type_info = this.local_data.type_info;
      } else {
        if( this.isNum(this.type_info) ){
          for( let j=0;j<this.local_data.type_info.length;j++ ){
            if( this.local_data.type_info[j].level <= this.type_info ){
              //console.log("FormEditor:this.local_data.type_info[j]="+this.local_data.type_info[j]);
              this.bind_data.type_info.push(this.local_data.type_info[j]);
            }
          }
        }
        if( this.type_info === "ALL" ){
          this.bind_data.type_info = this.local_data.type_info;
        }
        if( Array.isArray(this.type_info) ){
          for( let i=0;i<this.type_info.length;i++ ){
            for( let j=0;j<this.local_data.type_info.length;j++ ){
              if( this.type_info[i] === this.local_data.type_info[j].item_type ){
                this.bind_data.type_info.push(this.local_data.type_info[j]);
              }
            }
          }
        }
      }
    },
    isNum: function(val){
      return !isNaN(val)
    }
  }
};
</script>
<style scoped>
.form-editor {
  text-align: left;
  padding: 4px;
}
.item {
  cursor: pointer;
}
.item:hover {
  cursor: grab;
}
.item:active {
  cursor: grabbing;
}
</style>