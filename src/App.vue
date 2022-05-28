<template>
  <div id="app">
    <b-container>
      <label for="select-1">Choose Component</label>
      <div class="mx-1 mb-2">
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </div>

      <div v-if='selected==="sw-form-editor"'>
        <sw-form-editor  />
      </div>

      <div v-if='selected==="sw-column-editor"'>
        <sw-column-editor max_column="10" 
          :column_data="bind_data.sw_column_editor.item_options" 
          v-model="bind_data.sw_column_editor.item_options" />
      </div>

      <div v-if='selected==="sw-markdown-editor"'>
        <sw-markdown-editor :md_text="bind_data.sw_markdown_editor.item_data" 
          :rows="bind_data.sw_markdown_editor.item_rows"
          :max_length="bind_data.sw_markdown_editor.item_length" 
          :must="bind_data.sw_markdown_editor.item_must"
          :placeholder="bind_data.sw_markdown_editor.item_placeholder" 
          v-model="bind_data.sw_markdown_editor.item_data" />
      </div>

    </b-container>
  </div>
</template>

<script>
  import swFormEditor from '@/components/sw-form-editor';
  import swColumnEditor from '@/components/sw-column-editor';
  import swMarkdownEditor from '@/components/sw-markdown-editor';

  export default {
    name: 'App',
    components: {
      swFormEditor,swColumnEditor,swMarkdownEditor
    },
    data() {
      return {
        selected: 'sw-form-editor',
        options: [
          { value: 'sw-form-editor', text: 'sw-form-editor' },
          { value: 'sw-form-inputter', text: 'sw-form-inputter' },
          { value: 'sw-form-viewer', text: 'sw-form-viewer' },
          { value: 'sw-item-editor', text: 'sw-item-editor' },
          { value: 'sw-item-inputter', text: 'sw-item-inputter' },
          { value: 'sw-item-inputter', text: 'sw-item-inputter' },
          { value: 'sw-item-viewer', text: 'sw-item-viewer' },
          { value: 'sw-item-type', text: 'sw-item-type' },
          { value: 'sw-column-editor', text: 'sw-column-editor' },
          { value: 'sw-markdown-editor', text: 'sw-markdown-editor' },
          { value: 'sw-markdown-viewer', text: 'sw-markdown-viewer' }
        ],
        // バインドデータ
        bind_data: {
          //
          sw_column_editor: {
            item_options: [],
          },
          //
          sw_markdown_editor: {
            item_data: "",
            item_rows: 4,
            item_length: 100,
            item_must: false, 
            placeholder: "",
          }
        }
      }
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
