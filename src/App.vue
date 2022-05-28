<template>
  <div id="app">
    <b-container>
      <label for="select-1">Choose Component</label>
      <b-form-select v-model="selected" :options="options"></b-form-select>

      <div v-if='selected==="sw-column-editor"'>
        <sw-column-editor max_column="10" :column_data="bind_data.sw_column_editor_item_options" v-model="bind_data.sw_column_editor_item_options" />
      </div>
    </b-container>
  </div>
</template>

<script>
  import swColumnEditor from '@/components/sw-column-editor';

  export default {
    name: 'ItemEditor',
    components: {
      swColumnEditor
    },
    data() {
      return {
        selected: 'sw-column-editor',
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
          sw_column_editor_item_options: [],
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
