# vue-form-producer

By linking form creation required for business applications, input screens using forms, and data display screens with JSON data, Vue.js / Bootstrap-Vue the productivity of form development in front-end development.
It is a component that improves in terms of productivity.

業務アプリケーションに必要とされるフォームの作成から、フォームを使った入力画面、データ表示画面までをJSONデータで連携し、Vue.js / Bootstrap-Vue でのフロントエンド開発におけるフォーム開発の生産性を飛躍的に向上するコンポーネントです。

# DEMO

![vue-form-producer](https://github.com/shadowsworks/vue-form-producer/blob/main/vue-form-producer-demo.gif)

デモサイトは<a href="https://form-producer.demo.shadows-works.com/">こちら</a>

# Install

```
npm install vue-form-producer
```

# BootstrapVue Setup

Register BootstrapVue in your app entry point (typically app.js or main.js):

```
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
```

詳しくは [BootstrapVue](https://bootstrap-vue.org/docs) のサイトを参照ください

# Setup

```
import { swFormEditor, swFormInputter, swFormViewer } from sw-form-producer
```

# Usage

vue-form-producer は、以下の3つのコンポーネントで構成されています。

* フォーム作成コンポーネント / sw-form-editor
* 入力フォームコンポーネント / sw-form-inputter
* データ表示コンポーネント / sw-form-viewer

![vue-form-producer](https://github.com/shadowsworks/vue-form-producer/blob/main//vue-form-builder-usage.png)

<br>

## フォーム作成コンポーネント / sw-form-editor

```
<template>
  <div>
    <sw-form-editor type_info="ALL" item_key_option="false" v-model="form_info" />
  </div>
</template>

<script>
  import { swFormEditor } from sw-form-producer

  export default {
    data() {
      return {
        form_info: null
      }
    }
  }
</script>
```

### Properties

|Property|Type|Default|Description|
|:--|:--|:--|:--|
|form_info|Object|null|null の時は、新規作成。v-model で取得した "フォーム定義 JSON Object" をセットすると、編集モードとなる。|
|type_info|String|"basic"|［追加する項目］に表示する項目を指定。複数の場合は、カンマ区切りで指定。※別表を参照|
|type_option|String|"list"|［追加する項目タイプ］の表示方法を指定する。"list":リスト形式 or "tile":タイル形式 を指定する。|
|item_key_option|String|"false"|［項目キー］の入力フィールドの使用/不使用を指定する。"true":使用 or "false":不使用 を指定すること。|
|item_condition_option|String|"false"|［条件付き表示］の入力フィールドの使用/不使用を指定する。"true":使用 or "false":不使用 を指定すること。|


### v-model

|Property|Event|Description|
|:--|:--|:--|
|value|update|フォームが定義された "フォーム定義 JSON Object" が出力される。データフォーマットは<a href="https://form-producer.demo.shadows-works.com/">デモページ</a>を参照ください。|

### type-info

|Value|Description|
|:--|:--|
|"all"|全てを表示する|
|"text"|短いテキスト|
|"texts"|長いテキスト|
|"number"|数値|
|"radio"|ラジオボタン|
|"checkbox"|チェックボックス|
|"toggle"|スイッチ|
|"date"|日付|
|"time"|時刻|
|"datetime"|日時|
|"image"|写真|
|"password"|パスワード|
|"name"|氏名|
|"telephone"|電話番号|
|"email"|メールアドレス|
|"pulldown"|プルダウン|
|"label"|ラベル|
|"table"|表|
|"markdown"|マークダウン|
|"basic"|"text","texts","number","radio", "checkbox","toggle","date","time","datetime" のセット|
|"standard"|"basic" + "image","password","name","telephone","email" のセット|
|"pro"|"standard" + "pulldown","label","table","markdown" のセット|

<br>

## 入力フォームコンポーネント / sw-form-inputter

```
<template>
  <div>
    <sw-form-inputter :form_info="form_info" v-model="form_data"" />
  </div>
</template>

<script>
  import { swFormInputter } from sw-form-producer

  export default {
    data() {
      return {
        form_info: null,
        form_data: null
      }
    }
  }
</script>
```

### Properties

|Property|Type|Default|Description|
|:--|:--|:--|:--|
|form_info|Object|null|フォーム作成コンポーネントで取得した "フォーム定義 JSON Object" を指定する。データフォーマットは<a href="https://form-producer.demo.shadows-works.com/">デモページ</a>を参照ください。|
|form_data|Object|null|新規の場合は、null。編集時には、フォーム入力コンポーネントで取得した "データ入力 JSON Object" を指定する。データフォーマットは<a href="https://form-producer.demo.shadows-works.com/">デモページ</a>を参照ください。|
|form_list_info|Array|null|［プルダウン］項目で［動的］を選択した時に選択肢のデータを指定する。|
|line_space|Number|0|項目の行間調整（0-5）|

### form_list_info

```
[ 
  {
    item_key: "select-1";
    item_options: [
      { value: 'value1', text: 'text 1' },
      { value: 'value2', text: 'text 2' },...,{}
    ]
  },...,{}
]
```

### v-model

|Property|Event|Description|
|:--|:--|:--|
|value|update|フォームで入力された "データ入力 JSON Object" が出力される。データフォーマットは<a href="https://form-producer.demo.shadows-works.com/">デモページ</a>を参照ください。|


<br>

## データ表示コンポーネント / sw-form-viewer

```
<template>
  <div>
    <sw-form-viewer :form_data="form_data" 
          pdf_output pdf_output_button="PDF出力" pdf_output_placement="top" />
  </div>
</template>

<script>
  import { swFormViewer } from sw-form-producer
  
  export default {
    data() {
      return {
        form_data: null
      }
    }
  }
</script>
```

### Properties

|Property|Type|Default|Description|
|:--|:--|:--|:--|
|form_data|Object|null|フォーム入力コンポーネントで取得した "データ入力 JSON Object" を指定する。|
|pdf_output|toggle|false|true:PDF出力ボタンを表示する / false:PDF出力ボタンを表示しない|
|pdf_output_button|String|"PDF出力"|PDF出力ボタンの名称|
|pdf_output_placement|String|"top"|PDF出力ボタンの表示位置 "top":先頭 "bottom":最後尾|
|line_space|Number|0|項目の行間調整（0-5）|

<br><br><br>


