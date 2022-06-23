<template>
  <div id="app">
    <b-container>
      <div class="mx-1 mt-3 mb-2">
        <b-row>
          <b-col cols="3">
            <b-button block :variant="state_editor" @click='button_click("sw-form-editor")'>sw-form-editor</b-button>
          </b-col>
          <b-col cols="1">
            <b-icon class="mt-2" icon="arrow-right" />
          </b-col>
          <b-col cols="3">
            <b-button block :variant="state_inputter" @click='button_click("sw-form-inputter")'>sw-form-inputter</b-button>
          </b-col>
          <b-col cols="1">
            <b-icon class="mt-2" icon="arrow-right" />
          </b-col>
          <b-col cols="3">
            <b-button block :variant="state_viewer" @click='button_click("sw-form-viewer")'>sw-form-viewer</b-button>
          </b-col>
        </b-row>
      </div>

      <div v-if='selected==="sw-form-editor"'>
        <sw-form-editor 
          :form_info="bind_data.sw_form_editor.init_info" 
          :type_info="bind_data.sw_form_editor.type_info" 
          type_option="tile"
          :item_key_option="bind_data.sw_form_editor.item_key_option" 
          :item_condition_option="bind_data.sw_form_editor.item_condition_option" 
          v-model="bind_data.sw_form_editor.form_info" />
      </div>

      <div v-if='selected==="sw-form-inputter"'>
        <sw-form-inputter debug
          :form_info="bind_data.sw_form_inputter.form_info" 
          :form_list_info="bind_data.sw_form_inputter.form_list_info"
          v-model="bind_data.sw_form_inputter.form_data" />
      </div>

      <div v-if='selected==="sw-form-viewer"'>
        <sw-form-viewer
          :form_data="bind_data.sw_form_viewer.form_data" 
          pdf_output pdf_output_button="PDF出力" pdf_output_placement="top" />
      </div>

    </b-container>
  </div>
</template>

<script>
  import swFormEditor from '@/components/sw-form-editor';
  import swFormInputter from '@/components/sw-form-inputter';
  import swFormViewer from '@/components/sw-form-viewer';

  export default {
    name: 'App',
    components: {
      swFormEditor,swFormInputter,swFormViewer
    },
    data() {
      return {
        selected: 'sw-form-editor',
        // バインドデータ
        bind_data: {
          sw_form_editor: {
            init_info: null,
            type_info: "ALL",
            item_key_option: "true",
            item_condition_option: "true",
            form_info: null,
          },
          sw_form_inputter: {
            form_info: null,
            form_data: null,
            form_list_info: null,
          },
          sw_form_viewer: {
            form_data: null,
          },
        },
        state_data: {
        }
      }
    },
    // 監視
    watch: {
      'bind_data.sw_form_editor': {
        handler: function(){
          this.bind_data.sw_form_inputter.form_info = this.bind_data.sw_form_editor.form_info;
          //this.disabled_viewer();
        },
        deep: true,
      },
      'bind_data.sw_form_inputter': {
        handler: function(){
          this.bind_data.sw_form_viewer.form_data = this.bind_data.sw_form_inputter.form_data;
          //this.disabled_viewer();
        },
        deep: true,
      }
    },
    computed: {
      state_editor(){
        if( this.selected == "sw-form-editor" ){
          return "primary";
        } else {
          return "outline-primary";
        }
      },
      state_inputter(){
        if( this.selected == "sw-form-inputter" ){
          return "primary";
        } else {
          return "outline-primary";
        }
      },
      state_viewer(){
        if( this.selected == "sw-form-viewer" ){
          return "primary";
        } else {
          return "outline-primary";
        }
      },
      
    },
    // インスタンスマウント後
    mounted(){
      this.bind_data.sw_form_inputter.form_list_info = [];
      let options = [
        { value: 'aaaaaaa', text: '1 This is First option' },
        { value: 'bbbbbbb', text: '1 Selected Option' },
        { value: 'ccccc', text: '1 This is an option with object value' },
        { value: 'dddddd', text: '1 This one is disabled', disabled: true }
      ];
      let item = {}
      item.item_key = "select-1";
      item.item_options = options;
      this.bind_data.sw_form_inputter.form_list_info.push(item);
      let options2 = [
        { value: 'aaaaaaa', text: '2 This is First option' },
        { value: 'bbbbbbb', text: '2 Selected Option' },
        { value: 'ccccc', text: '2 This is an option with object value' },
        { value: 'dddddd', text: '2 This one is disabled', disabled: true }
      ];
      let item2 = {}
      item2.item_key = "select-2";
      item2.item_options = options2;
      this.bind_data.sw_form_inputter.form_list_info.push(item2);
    },
    methods: {
      button_click(data){
        this.selected = data;
      },
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
