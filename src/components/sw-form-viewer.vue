<template>
  <div class="form-viewer text-left" v-if="state_data.loaded">
    <div v-if='bind_data.pdf_output && bind_data.pdf_output_placement=="top"' class="text-right m-2">
      <b-button size="sm" @click="make_pdf()" variant="outline-success">
        <b-icon icon="file-pdf"></b-icon> {{ bind_data.pdf_output_button }}
      </b-button>
    </div>
    <div id="form-viewer-content">
      <div v-for="item_data in bind_data.form_data.item_data" :key="item_data.item_uuid">
        <sw-item-viewer :item_data="item_data" />
        <div v-if="state_data.debug">{{ JSON.stringify(item_data,null,2) }}</div>
      </div>
    </div>
    <div v-if='bind_data.pdf_output && bind_data.pdf_output_placement=="bottom"' class="text-right m-2">
      <b-button v-if="bind_data.pdf_output" size="sm" @click="make_pdf()" variant="outline-success">
        <b-icon icon="file-pdf"></b-icon> {{ bind_data.pdf_output_button }}
      </b-button>
    </div>
  </div>
</template>

<script>
import lang from './lang.json';
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";

import { jsPDF } from "jspdf";
import * as html2canvas from 'html2canvas'
import moment from 'moment-timezone';
import swItemViewer from '@/components/sw-item-viewer';

export default {
  name: 'sw-form-viewer',
  components: {
    swItemViewer
  },

  props: {
    // Form情報
    form_data: Object,
    // pdf出力
		pdf_output: {
      type: Boolean,
      default: false
    },
    // pdf出力ボタン名
		pdf_output_button: {
      type:  String,
      default: lang[locale].make_pdf
    },
    pdf_output_placement: {
      type:  String,
      default: "top"
    },
  },
  // ローカルデータ変数
  data () {
    return {
      // バインドデータ
      bind_data: {
        form_data: null,
        pdf_output: false,
        pdf_output_button: "",
        pdf_output_placement: "",
      },
      state_data: {
        loaded: false,
        debug: true,
      },
    }
  },
  // 既定計算
  computed: {
  },
  // 監視
  watch: {
    form_data: {
      handler: function(){
        //console.log("FormViewer:watch:this.form_data:"+JSON.stringify(this.form_data));
        if( this.form_data != null ){
          this.bind_data.form_data = this.form_data;
        }
        this.state_data.loaded = false;
        this.$nextTick(function() {
          this.state_data.loaded = true;
        })
      },
      deep: true,
    },
    pdf_output: {
      handler: function(){
        this.bind_data.pdf_output = this.pdf_output;
      }
    },
    pdf_output_button: {
      handler: function(){
        this.bind_data.pdf_output_button = this.pdf_output_button;
      }
    },
    pdf_output_placement: {
      handler: function(){
        this.bind_data.pdf_output_placement = this.pdf_output_placement;
      }
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
    //console.log("FormViewer:mounted:this.form_data:"+JSON.stringify(this.form_data));
    if( this.form_data != null ){
      this.bind_data.form_data = this.form_data;
    }
    this.bind_data.pdf_output = this.pdf_output;
    this.bind_data.pdf_output_button = this.pdf_output_button;
    this.bind_data.pdf_output_placement = this.pdf_output_placement;
    this.state_data.loaded = true;
  },
  // ローカル関数
  methods: {
    lang: function( param ){
      return lang[locale][param];
    },
    make_pdf: function(){
      const source = document.getElementById('form-viewer-content')
      html2canvas(source).then(capture => {
        const imgData = capture.toDataURL('image/png')
        const doc = new jsPDF()
        const width = doc.internal.pageSize.width
        doc.addImage(imgData, 'PNG', 10, 10, width * 0.9, 0)
        doc.save(moment().format("YYYY-MM-DD-HH-mm-ss")+".pdf")
      })
    }
  }
};
</script>
<style scoped>
.form-viewer {
  text-align: left;
  padding: 4px;
}
</style>