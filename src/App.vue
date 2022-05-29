<template>
  <div id="app">
    <b-container>
      <label for="select-1">Choose Component</label>
      <div class="mx-1 mb-2">
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </div>

      <div v-if='selected==="sw-form-editor"'>
        <!-- <sw-form-editor  /> -->
        <sw-form-editor 
          :form_info="bind_data.sw_form_editor.init_info" 
          :type_info="bind_data.sw_form_editor.type_info" 
          :item_key_option="bind_data.sw_form_editor.item_key_option" 
          v-model="bind_data.sw_form_editor.form_info" />
      </div>

      <div v-if='selected==="sw-form-inputter"'>
        <sw-form-inputter 
          :form_info="bind_data.sw_form_inputter.form_info" 
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
        options: [
          { value: 'sw-form-editor', text: 'sw-form-editor' },
          { value: 'sw-form-inputter', text: 'sw-form-inputter' },
          { value: 'sw-form-viewer', text: 'sw-form-viewer' },
        ],
        // バインドデータ
        bind_data: {
          sw_form_editor: {
            init_info: null,
            type_info: "ALL",
            item_key_option: "true",
            form_info: null,
          },
          sw_form_inputter: {
            form_info: null,
            form_data: null,
          },
          sw_form_viewer: {
            form_data: null,
          },
        }
      }
    },
    // 監視
    watch: {
      'bind_data.sw_form_editor': {
        handler: function(){
          this.bind_data.sw_form_inputter.form_info = this.bind_data.sw_form_editor.form_info;
        },
        deep: true,
      },
      'bind_data.sw_form_inputter': {
        handler: function(){
          this.bind_data.sw_form_viewer.form_data = this.bind_data.sw_form_inputter.form_data;
        },
        deep: true,
      }
    },
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
