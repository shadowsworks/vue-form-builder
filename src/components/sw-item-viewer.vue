<template>
  <div class="item-viewer text-left" v-if="state_data.loaded">
    <template v-if='bind_data.item_data.item_type=="text" || bind_data.item_data.item_type=="texts" || bind_data.item_data.item_type=="number" || 
      bind_data.item_data.item_type=="radio" || bind_data.item_data.item_type=="checkbox" ||
      bind_data.item_data.item_type=="boolean" || bind_data.item_data.item_type=="telephone" || bind_data.item_data.item_type=="date" ||
      bind_data.item_data.item_type=="time" || bind_data.item_data.item_type=="datetime" || bind_data.item_data.item_type=="table" ||
      bind_data.item_data.item_type=="markdown" || bind_data.item_data.item_type=="image" || bind_data.item_data.item_type=="password" ||
      bind_data.item_data.item_type=="email" ' >
      <label class="text-secondary mt-2 mb-0 ml-3 small" >{{ bind_data.item_data.item_name }}</label>
    </template>
    
    <!-- <div class="text-left">{{ JSON.stringify(bind_data.item_data,null,2) }}</div> -->
    <!-- <div class="text-left">{{ bind_data.item_data.item_data }}</div> -->

    <!-- 短文テキスト -->
    <template v-if='bind_data.item_data.item_type=="text"' >
      <div class="ml-3 mr-2">{{ bind_data.item_data.item_data }}</div>
    </template>

    <!-- 長文テキスト -->
    <template v-if='bind_data.item_data.item_type=="texts"'>
      <div class="ml-3 mr-2 long_text">{{ bind_data.item_data.item_data }}</div>
    </template>

    <!-- 数値 -->
    <template v-if='bind_data.item_data.item_type=="number"'>
      <div class="ml-3 mr-2">{{ bind_data.item_data.item_data }} {{ bind_data.item_data.item_unit_name }}</div>
    </template>

    <!-- ラジオボタン -->
    <template v-if='bind_data.item_data.item_type=="radio"'>
      <div class="ml-3 mr-2">{{ bind_data.item_data.item_data }}</div>
    </template>

    <!-- チェックボックス -->
    <template v-if='bind_data.item_data.item_type=="checkbox"'>
      <div class="ml-3 mr-2 mb-1" v-for="(item_data) in bind_data.item_data.item_data" :key="item_data">
        {{ item_data }}
      </div>
    </template>

    <!-- スイッチ -->
    <template v-if='bind_data.item_data.item_type=="boolean"'>
      <div class="ml-3 mr-2">{{ bind_data.item_data.item_data }}</div>
    </template>

    <!-- 氏名 -->
    <template v-if='bind_data.item_data.item_type=="name"' >
      <b-row>
        <b-col>
          <label class="text-secondary mt-2 mb-0 small" >{{ bind_data.item_data.item_name[0] }}</label>
          <div class="ml-3 mr-2">{{ bind_data.item_data.item_data[0] }}</div>
        </b-col>
        <b-col>
          <label class="text-secondary mt-2 mb-0 small" >{{ bind_data.item_data.item_name[1] }}</label>
          <div class="ml-3 mr-2">{{ bind_data.item_data.item_data[1] }}</div>
        </b-col>
      </b-row>
    </template>

    <!-- 電話番号 -->
    <template v-if='bind_data.item_data.item_type=="telephone"' >
      <div class="ml-3 mr-2">{{ bind_data.item_data.item_data[0] }} - {{ bind_data.item_data.item_data[1] }} - {{ bind_data.item_data.item_data[2] }}</div>
    </template>

    <!-- 日付 -->
    <template v-if='bind_data.item_data.item_type=="date"'>
      <div class="ml-3 mr-2">{{ set_date_format(bind_data.item_data.item_data) }}</div>
    </template>

    <!-- 時刻 -->
    <template v-if='bind_data.item_data.item_type=="time"'>
      <div class="ml-3 mr-2">{{ set_time_format(bind_data.item_data.item_data) }}</div>
    </template>
    
    <!-- 日時 -->
    <template v-if='bind_data.item_data.item_type=="datetime"' >
      <div class="ml-3 mr-2">{{ set_date_format(bind_data.item_data.item_data[0]) }} {{ set_time_format(bind_data.item_data.item_data[1]) }}</div>
    </template>

    <!-- 表 -->
    <template v-if='bind_data.item_data.item_type=="table"' >
      <div class="ml-3 mr-2">
        <b-table bordered responsive :items="bind_data.item_data.item_data.table_items" :fields="bind_data.item_data.item_data.table_fields" class="mb-0 text-nowrap"></b-table>
      </div>
    </template>

    <!-- マークダウン -->
    <template v-if='bind_data.item_data.item_type=="markdown"' >
      <sw-markdown-viewer :md_text="bind_data.item_data.item_data" />
    </template>

    <!-- 写真 -->
    <template v-if='bind_data.item_data.item_type=="image"' >
      <b-img :src="bind_data.item_data.item_data" class="my-1 p-1 image-shadow" style="max-height:400px;max-width:100%;"></b-img>
    </template>

    <!-- パスワード -->
    <template v-if='bind_data.item_data.item_type=="password"' >
      <div class="ml-3 mr-2" v-if="bind_data.item_data.item_data !== null">**********</div>
    </template>

    <!-- メールアドレス -->
    <template v-if='bind_data.item_data.item_type=="email"' >
      <div class="ml-3 mr-2">{{ bind_data.item_data.item_data }}</div>
    </template>

    <!-- プルダウン -->
    <template v-if='bind_data.item_data.item_type=="pulldown"'>
      <div class="ml-3 mr-2">{{ bind_data.item_data.item_data }}</div>
    </template>

    <!-- ラベル -->
    <template v-if='bind_data.item_data.item_type=="label"' >
      <template v-if='bind_data.item_data.item_data.item_display_checked=="true"'>
        <div v-if='bind_data.item_data.item_data.item_markdown_checked=="true"' >
          <sw-markdown-viewer :md_text="bind_data.item_data.item_data.item_description" />
        </div>
        <div v-else class="text-secondary mt-1 mb-0 ml-3 mr-2 long_text">{{ bind_data.item_data.item_data.item_description }}</div>
      </template>
    </template>

  </div>
  <div v-else>
    <div class="text-center">
      <b-icon icon="three-dots" animation="cylon" font-scale="3" variant="secondary"></b-icon>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone';
import swMarkdownViewer from '@/components/sw-markdown-viewer';

export default {
  name: 'sw-item-viewer',
  components: {
    swMarkdownViewer
  },
  props: {
    // Item情報
    item_data: Object, 
  },
  // ローカルデータ変数
  data () {
    return {
      // バインドデータ
      bind_data: {
        item_data: null,
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
    item_data: {
      handler: function(){
        //console.log("ItemViewer:watch:this.item_data:"+this.item_data);
        if( this.item_data !== undefined && this.item_data != null ){
          this.bind_data.item_data = this.item_data;
          //console.log("ItemViewer:watch:this.bind_data.item_data:"+this.bind_data.item_data);
        }
        this.state_data.loaded = false;
        this.$nextTick(function() {
          this.state_data.loaded = true;
        })
      },
      deep: true,
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
    //console.log("ItemViewer:mounted:this.item_data:"+JSON.stringify(this.item_data));
    if( this.item_data !== undefined && this.item_data != null ){
      this.bind_data.item_data = this.item_data;
      //console.log("ItemViewer:mounted:this.bind_data.item_data:"+this.bind_data.item_data);
    }
    this.$nextTick(function() {
      this.state_data.loaded = true;
    });
  },
  // ローカル関数
  methods: {
    set_date_format: function( data ){
      if( moment(data).isValid() ){
        return moment(data).format("YYYY/MM/DD");
      } else {
        return "";
      }
    },
    set_time_format: function( data ){
      try {
        let times = data.split(":");
        if( times.length == 3 ){
          return times[0]+":"+times[1];
        } else {
          return "";
        }
      } catch( ex ){
        return "";
      }
    },
    set_br_code( data ){
      return data.replace(/\r?\n/g, '<br>');
    }
  }
};
</script>
<style scoped>
.item-viewer {
  text-align: left;
  padding: 4px;
}
.long_text {
  white-space: break-spaces;
}
</style>