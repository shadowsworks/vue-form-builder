<template>
  <div class="column-editor mx-0" v-if="state_data.loaded">
    <div v-for="n in bind_data.column_data.length" :key="n" class="mb-1">
      <b-input-group>
        <b-input-group-prepend is-text v-if='item_type=="radio"' :title="lang('set_initial_selection')">
          <b-form-radio v-model="local_data.selected" :name="local_data.radio_name" :value="bind_data.column_data[n-1]"  />
        </b-input-group-prepend>
        <b-input-group-prepend v-if="n==bind_data.column_data.length && n>2">
          <b-button variant="outline-success" @click="minus_button">
            <span class="font-weight-bold">-</span>
          </b-button>
        </b-input-group-prepend>
        <b-form-input type="text" v-model="bind_data.column_data[n-1]" class="mt-0 mb-0" maxlength="100" 
            :state="state_item(bind_data.column_data[n-1],n-1)" 
            @change="change_column(bind_data.column_data[n-1])" 
            :placeholder="lang('enter_your_choice')" />
        <b-input-group-append v-if="n==bind_data.column_data.length && n<bind_data.max_column">
          <b-button variant="outline-success" @click="plus_button">
            <span class="font-weight-bold">+</span>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </div>
  
</template>

<script>
import lang from './lang.json';
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";

export default {
  name: 'sw-column-editor',
  components: {
  },
  props: {
    item_type: {
      type:  String,
      default: "checkbox"
    },
    max_column: {
      type: String,
      default: ""
    },
    column_data: {
      type: [ Array, Object ],
      default: () => null,
    }
  },
  // ローカルデータ変数
  data () {
    return {
      // バインドデータ
      bind_data: {
        max_column: 5,
        column_data: [lang[locale].item1,lang[locale].item2],
        return_data: [{text:lang[locale].item1,value:lang[locale].item1,init:true},{text:lang[locale].item2,value:lang[locale].item2,init:false}]
      },
      local_data: {
        selected: "",
        radio_name: "",
      },
      state_data: {
        loaded: false,
      },
    }
  },
  // 既定計算
  computed: {
    state_item: function() {
      return function(item_data,n){
        if( item_data === "" ){
          return false;
        } else {
          for( let i=0;i<this.bind_data.column_data.length;i++ ){
            if( i != n ){
              if( this.bind_data.column_data[i] === item_data ){
                return false;
              }
            }
          }
          return true;
        }
      }
    },
  },
  // 監視
  watch: {
    'bind_data.column_data': {
      handler: function(){
        this.bind_data.return_data = [];
        for( let i=0;i<this.bind_data.column_data.length;i++ ){
          let data = {};
          data.text = this.bind_data.column_data[i];
          data.value = this.bind_data.column_data[i];
          data.init = false;
          if( i == 0 ){
            data.init = true;
          }
          this.bind_data.return_data.push(data);
        }
        this.local_data.selected = this.bind_data.return_data[0].value;
        this.$emit('input',this.bind_data.return_data);
      },
      deep: true,
    },
    'local_data.selected': {
      handler: function(){
        for( let i=0;i<this.bind_data.return_data.length;i++ ){
          if( this.bind_data.return_data[i].value == this.local_data.selected ){
            this.bind_data.return_data[i].init = true;
          } else {
            this.bind_data.return_data[i].init = false;
          }
        }
        this.$emit('input',this.bind_data.return_data);
      },
      deep: true,
    },
    max_column: function(){
      if( this.max_column !== null ){
        this.bind_data.max_column = this.max_column;
      }
    }
  },
  // インスタンス初期化後
  created(){
    this.local_data.radio_name = this.get_unique_string();
    this.local_data.selected = this.bind_data.return_data[0].value;
  },
  // インスタンス破棄後
  destroyed() {
  },
  // インスタンスマウント後
  mounted(){
    if( this.column_data !== undefined && this.column_data !== null ){
      //console.log("ColumnEditor:mounted:"+JSON.stringify(this.column_data))
      if( this.column_data.length > 0 ){
        this.bind_data.return_data = this.column_data;
        this.bind_data.column_data = [];
        for( let i=0;i<this.column_data.length;i++ ){
          this.bind_data.column_data.push(this.column_data[i].value);
        }
      }
    }
    if( this.max_column !== undefined && this.max_column !== null ){
      this.bind_data.max_column = Number(this.max_column);
    }
    this.$nextTick(function() {
      this.state_data.loaded = true;
    })
    this.$emit('input',this.bind_data.return_data);
  },
  // ローカル関数
  methods: {
    lang: function( param ){
      return lang[locale][param];
    },
    plus_button: function(){
      this.bind_data.column_data.push("");
      this.state_data.loaded = false;
      this.$nextTick(function() {
        this.state_data.loaded = true;
      })
    },
    minus_button: function(){
      this.bind_data.column_data.pop();
      this.state_data.loaded = false;
      this.$nextTick(function() {
        this.state_data.loaded = true;
      })
    },
    change_column: function(column_data){
      if( column_data === "" ){
        this.state_data.loaded = false;
        this.$nextTick(function() {
          this.state_data.loaded = true;
        })
      }
    },
    get_unique_string:function (myStrong){
      var strong = 1000;
      if (myStrong) strong = myStrong;
      return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    },
  }
};
</script>
<style scoped>
.column-editor {
  text-align: left;
  padding: 4px;
}
</style>