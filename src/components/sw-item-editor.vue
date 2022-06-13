<template>
  <div class="item-editor" v-if="state_data.loaded">
    <b-card no-body>
      <!-- ヘッダー共通 -->
      <b-card-header class="px-3 py-1">
        <b-button variant="light" size="sm" class="m-0 float-right" v-b-toggle="local_data.collapse_id" v-show="local_data.collapse_visible">
          <b-icon icon="caret-up-fill" aria-hidden="true"></b-icon>
        </b-button>
        <b-button variant="light" size="sm" class="m-0 float-right" v-b-toggle="local_data.collapse_id" v-show="!local_data.collapse_visible">
          <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon>
        </b-button>
        <div class="pt-1">
          <a href="#nogo" v-b-toggle="local_data.collapse_id">{{ get_item_options(bind_data.item_type).item_desc }}</a>
          <span v-show="!local_data.collapse_visible"> : {{ get_item_name(bind_data.item_name) }}</span>
        </div>
      </b-card-header>
      <!-- ボディ -->
      <b-collapse :id="local_data.collapse_id" visible v-model="local_data.collapse_visible" >
        <b-card-body class="py-0 pb-3">

          <!-- 短文テキスト -->
          <template v-if='bind_data.item_type=="text"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}</label>
            <b-form-input type="text" v-model="bind_data.item_placeholder" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
            <!-- 最大文字数 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('max_characters') }}</label>
            <b-form-input type="number" v-model="bind_data.item_length" :placeholder="lang('enter_max_number_characters')" class="mt-0" 
              :state="state_item_length"
              :min="get_item_options(bind_data.item_type).item_length_min" 
              :max="get_item_options(bind_data.item_type).item_length_max" />
            <!-- 許可する文字 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('allowed_characters') }}</label>
            <b-form-select v-model="bind_data.item_allowed_type" :options="local_data.item_allowed_options" size="sm" class="mt-0"></b-form-select>
          </template>

          <!-- 長文テキスト -->
          <template v-if='bind_data.item_type=="texts"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}</label>
            <b-form-input type="text" v-model="bind_data.item_placeholder" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
            <!-- 最大文字数 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('max_characters') }}</label>
            <b-form-input type="number" v-model="bind_data.item_length" :placeholder="lang('enter_max_number_characters')" class="mt-0" 
              :state="state_item_length"
              :min="get_item_options(bind_data.item_type).item_length_min" 
              :max="get_item_options(bind_data.item_type).item_length_max" />
            <!-- 行数 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('number_of_rows') }}</label>
            <b-form-input type="number" v-model="bind_data.item_rows" :placeholder="lang('enter_number_of_rows')" class="mt-0" 
              :state="state_item_rows"
              :min="get_item_options(bind_data.item_type).item_rows_min" 
              :max="get_item_options(bind_data.item_type).item_rows_max" />
          </template>
         
          <!-- 数値 -->
          <template v-if='bind_data.item_type=="number"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}</label>
            <b-form-input type="text" v-model="bind_data.item_placeholder" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
            <!-- 最小値 最大値 単位 -->
            <b-row >
              <b-col>
                <label class="text-secondary mt-2 mb-0 small" >{{ lang('min_value') }}</label>
                <b-form-input type="number" v-model="bind_data.item_limit_min" :placeholder="lang('enter_min_value')" class="mt-0"
                  :state="state_item_limit_min"  />
              </b-col>
              <b-col>
                <label class="text-secondary mt-2 mb-0 small" >{{ lang('max_value') }}</label>
                <b-form-input type="number" v-model="bind_data.item_limit_max" :placeholder="lang('enter_max_value')" class="mt-0" 
                  :state="state_item_limit_max" />
              </b-col>
              <b-col>
                <label class="text-secondary mt-2 mb-0 small" >{{ lang('unit') }}</label>
                <b-form-input type="text" v-model="bind_data.item_unit_name" :placeholder="lang('enter_unit')" class="mt-0" maxlength="10" />
              </b-col>
            </b-row>
          </template>

          <!-- ラジオボタン -->
          <template v-if='bind_data.item_type=="radio"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 選択肢 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('choices') }}</label>
            <sw-column-editor item_type="radio" max_column="10" :column_data="bind_data.item_options" v-model="bind_data.item_options"></sw-column-editor>
          </template>

          <!-- チェックボックス -->
          <template v-if='bind_data.item_type=="checkbox"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 選択肢 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('choices') }}</label>
            <sw-column-editor max_column="10" :column_data="bind_data.item_options" v-model="bind_data.item_options"></sw-column-editor>
          </template>

          <!-- スイッチ -->
          <template v-if='bind_data.item_type=="boolean"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}</label>
            <b-form-input type="text" v-model="bind_data.item_placeholder" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
          </template>

          <!-- 氏名 -->
          <template v-if='bind_data.item_type=="name"'>
            <!-- 項目名 -->
            <b-row>
              <b-col v-for="n in 2" :key="n" cols="6">
                <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}{{n}}</label>
                <b-form-input type="text" v-model="bind_data.item_name[n-1]" :state="state_item(bind_data.item_name[n-1],true)" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" />
              </b-col>
            </b-row>
            <!-- 説明 -->
            <b-row>
              <b-col v-for="n in 2" :key="n" cols="6">
                <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}{{n}}</label>
                <b-form-input type="text" v-model="bind_data.item_placeholder[n-1]" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" />
              </b-col>
            </b-row>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
            <!-- 最大文字数 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('max_characters') }}</label>
            <b-form-input type="number" v-model="bind_data.item_length" :placeholder="lang('enter_max_number_characters')" class="mt-0" 
              :state="state_item_length"
              :min="get_item_options(bind_data.item_type).item_length_min" 
              :max="get_item_options(bind_data.item_type).item_length_max" />
          </template>
          
          <!-- 電話番号 -->
          <template v-if='bind_data.item_type=="telephone"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" />
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
          </template>

          <!-- 日付/時刻-->
          <template v-if='bind_data.item_type=="date" || bind_data.item_type=="time"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" />
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}</label>
            <b-form-input type="text" v-model="bind_data.item_placeholder" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
          </template>

          <!-- 日時-->
          <template v-if='bind_data.item_type=="datetime"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" />
            <b-row>
              <b-col v-for="n in 2" :key="n" cols="6">
                <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}{{n}}</label>
                <b-form-input type="text" v-model="bind_data.item_placeholder[n-1]" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" />
              </b-col>
            </b-row>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
          </template>

          <!-- 表-->
          <template v-if='bind_data.item_type=="table"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" />
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 選択肢 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('row') }}</label>
            <sw-column-editor max_column="5" :column_data="bind_data.table_rows" v-model="bind_data.table_rows"></sw-column-editor>
            <!-- 選択肢 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('column') }}</label>
            <sw-column-editor max_column="5" :column_data="bind_data.table_cols" v-model="bind_data.table_cols"></sw-column-editor>
          </template>

          <!-- マークダウンテキスト -->
          <template v-if='bind_data.item_type=="markdown"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}</label>
            <b-form-input type="text" v-model="bind_data.item_placeholder" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
            <!-- 最大文字数 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('max_characters') }}</label>
            <b-form-input type="number" v-model="bind_data.item_length" :placeholder="lang('enter_max_number_characters')" class="mt-0" 
              :state="state_item_length"
              :min="get_item_options(bind_data.item_type).item_length_min" 
              :max="get_item_options(bind_data.item_type).item_length_max" />
            <!-- 行数 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('number_of_rows') }}</label>
            <b-form-input type="number" v-model="bind_data.item_rows" :placeholder="lang('enter_number_of_rows')" class="mt-0" 
              :state="state_item_rows"
              :min="get_item_options(bind_data.item_type).item_rows_min" 
              :max="get_item_options(bind_data.item_type).item_rows_max" />
          </template>

          <!-- 写真 -->
          <template v-if='bind_data.item_type=="image"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}</label>
            <b-form-input type="text" v-model="bind_data.item_placeholder" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
            <!-- 最大幅 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('max_width') }} {{bind_data.item_width_min}} - {{bind_data.item_width_max}} pixel</label>
            <b-form-input type="number" v-model="bind_data.item_width" :placeholder="lang('enter_max_width')" class="mt-0" 
              :state="state_item_width" :min="bind_data.item_width_min" :max="bind_data.item_width_max" />
            <!-- 最大高さ -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('max_height') }} {{bind_data.item_height_min}} - {{bind_data.item_height_max}} pixel</label>
            <b-form-input type="number" v-model="bind_data.item_height" :placeholder="lang('enter_max_height')" class="mt-0" 
              :state="state_item_height" :min="bind_data.item_height_min" :max="bind_data.item_height_max" />
          </template>

          <!-- パスワード -->
          <template v-if='bind_data.item_type=="password"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}</label>
            <b-form-input type="text" v-model="bind_data.item_placeholder" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
            <!-- 最小文字数 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('min_characters') }} </label>
            <b-form-input type="number" v-model="bind_data.item_length" :placeholder="lang('enter_min_number_characters')" class="mt-0" 
              :state="state_item_length" :min="bind_data.item_length_min" :max="bind_data.item_length_max" />
            <!-- 文字種 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('character_type') }} </label>
              <b-form-checkbox-group v-model="bind_data.item_selected"  >
                <b-form-checkbox value="uppercase">{{ lang('uppercase') }}</b-form-checkbox>
                <b-form-checkbox value="lowercase">{{ lang('lowercase') }}</b-form-checkbox>
                <b-form-checkbox value="numbers">{{ lang('numbers') }}</b-form-checkbox>
                <b-form-checkbox value="symbols">{{ lang('symbols') }}</b-form-checkbox>
              </b-form-checkbox-group>
          </template>

          <!-- メールアドレス -->
          <template v-if='bind_data.item_type=="email"'>
            <!-- 項目名 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_name') }}</label>
            <b-form-input type="text" v-model="bind_data.item_name" :state="state_item_name" :placeholder="lang('enter_item_name')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('placeholder') }}</label>
            <b-form-input type="text" v-model="bind_data.item_placeholder" :placeholder="lang('enter_placeholder')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 補足説明 -->
            <label class="text-secondary mt-2 mb-0 small" >{{ lang('description') }}</label>
            <b-form-input type="text" v-model="bind_data.item_description" :placeholder="lang('enter_description')" class="mt-0 mb-0" maxlength="100" ></b-form-input>
            <!-- 項目キー -->
            <div v-if="local_data.item_key_option">
              <label class="text-secondary mt-2 mb-0 small" >{{ lang('item_key') }}</label>
              <b-form-input type="text" v-model="bind_data.item_key" :placeholder="lang('enter_item_key')" class="mt-0 mb-0" maxlength="32"
                :state="state_item_key" />
            </div>
            <!-- 必須選択 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('required') }}</label>
            <div v-if="bind_data.item_must" class="float-right mt-1">
              <br><b-form-checkbox v-model="bind_data.item_must_badge" value="checked" unchecked-value="unchecked">{{ lang('badge') }}</b-form-checkbox>
            </div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mb-0">
              <b-form-radio-group v-model="bind_data.item_must" :options="local_data.item_must_options" :aria-describedby="ariaDescribedby" />
            </b-form-group>
            <!-- 複数可 -->
            <label class="text-secondary mt-2 mb-0 small">{{ lang('allow_multiple_entries') }}</label>
            <div class="mt-1">
              <b-form-checkbox v-model="bind_data.item_allow_multiple" value="checked" unchecked-value="unchecked">{{ lang('allow_multiple') }}</b-form-checkbox>
            </div>
            
          </template>

        </b-card-body>
        <b-card-footer class="px-3 pt-1 py-1">
          <b-button variant="light" size="sm" class="m-0 float-right" v-b-tooltip.hover title="複製する" @click="copy_item()">
            <b-icon icon="files" aria-hidden="true"></b-icon>
          </b-button>
          <b-button variant="light" size="sm" class="m-0 float-right" v-b-tooltip.hover title="削除する" @click="delete_item()">
            <b-icon icon="trash" aria-hidden="true"></b-icon>
          </b-button>
          <b-button variant="light" size="sm" class="m-0" disabled >
            <b-icon icon="blank" aria-hidden="true"></b-icon>
          </b-button>
        </b-card-footer>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import lang from './lang.json';
// ブラウザからデフォルトの言語を取得する
let locale = navigator.language;
if( locale != "ja" && locale != "en" ) locale = "en";

import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import swColumnEditor from '@/components/sw-column-editor';

export default {
  name: 'ItemEditor',
  components: {
    swColumnEditor
  },
  props: {
    // 新規の時は item_no を指定
    // 編集の時は Item情報 を指定
    item_info: Object, 
    // No
		item_no: {
      type: Number,
      default: 0
    },
    item_key_option: {
      type:  String,
      default: "false"
    },
  },
  // ローカルデータ変数
  data () {
    return {
      // バインドデータ
      bind_data: null,
      // ローカルデータ
      local_data: {
        collapse_id: "",
        collapse_visible: true,
        item_key_option: false,
        item_must_options: [
          { text: lang[locale].any, value: false },
          { text: lang[locale].mandatory, value: true },
        ],
        item_done_options: [
          { text: lang[locale].yes, value: true },
          { text: lang[locale].no, value: false },
        ],
        item_allowed_options: [
          { text: lang[locale].all, value: 'All' },
          { text: lang[locale].alpha, value: 'Alpha' },
          { text: lang[locale].numbers, value: 'Numeric' },
          { text: lang[locale].alphanumeric, value: 'Alphanumeric' },
          { text: lang[locale].ascii, value: 'Ascii' },
          //{ text: lang[locale].email, value: 'Email' },
        ],
        item_options: [
          { 
            item_type: 'text', 
            item_state: false,
            item_name: lang[locale].short_text, 
            item_desc: lang[locale].short_text, 
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false, 
            item_must_badge: false,
            item_length: 20,      //文字数初期値
            item_length_min: 1,   //文字数最小値
            item_length_max: 100, //文字数最大値
            item_allowed_type: "All", // 文字種 All or Alpha or Numeric or Alphanumeric or Ascii 
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'texts', 
            item_state: false,
            item_name: lang[locale].long_text, 
            item_desc: lang[locale].long_text,
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: "unchecked",
            item_length: 100,     //文字数初期値
            item_length_min: 1,   //文字数最小値
            item_length_max: 500, //文字数最大値
            item_rows: 4,         //行数初期値
            item_rows_min: 2,     //行数最小値
            item_rows_max: 20,    //行数最大値
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'number', 
            item_state: false,
            item_name: lang[locale].numeric, 
            item_desc: lang[locale].numeric, 
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false, 
            item_must_badge: "unchecked",
            item_limit_min: 0,    //制限最小値
            item_limit_max: 100,  //制限最大値
            item_unit_name: "",   //単位
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'radio', 
            item_state: false,
            item_name: lang[locale].radio, 
            item_desc: lang[locale].radio, 
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: "unchecked",
            item_options: [],
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'checkbox', 
            item_state: false,
            item_name: lang[locale].checkbox, 
            item_desc: lang[locale].checkbox, 
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false, 
            item_must_badge: false,
            item_options: [],
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'boolean', 
            item_state: false,
            item_name: lang[locale].switch, 
            item_desc: lang[locale].switch, 
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false, 
            item_must_badge: "unchecked",
            item_checked_value: "true",
            item_unchecked_value: "false",
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'name', 
            item_state: false,
            item_name: [lang[locale].family_name,lang[locale].first_name],
            item_desc: lang[locale].full_name,
            item_placeholder: ["",""], //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: "unchecked",
            item_length: 10,     //文字数初期値
            item_length_min: 1,   //文字数最小値
            item_length_max: 100, //文字数最大値
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'telephone', 
            item_state: false,
            item_name: lang[locale].phone_number,
            item_desc: lang[locale].phone_number,
            item_placeholder: ["03","1234","5678"], //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: "unchecked",
            item_length: 6,     //文字数初期値
            item_length_min: 1,   //文字数最小値
            item_length_max: 6, //文字数最大値
            item_allowed_type: "Numeric", // 文字種 All or Alpha or Numeric or Alphanumeric or Ascii 
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'date', 
            item_state: false,
            item_name: lang[locale].date,
            item_desc: lang[locale].date,
            item_placeholder: lang[locale].select_date, //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: false,
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'time', 
            item_state: false,
            item_name: lang[locale].time,
            item_desc: lang[locale].time,
            item_placeholder: lang[locale].select_time, //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: "unchecked",
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'datetime', 
            item_state: false,
            item_name: lang[locale].datetime,
            item_desc: lang[locale].datetime,
            item_placeholder: [lang[locale].select_date,lang[locale].select_time], //説明
            item_description: "", //補足説明item_state
            item_key: "", //キー
            item_cols: "12", //6:縦向き 12:横向き
            item_must: false,
            item_must_badge: false,
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'table', 
            item_state: false,
            item_name: lang[locale].table,
            item_desc: lang[locale].table,
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: "unchecked", 
            table_rows: [],
            table_cols: [],
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'markdown', 
            item_state: false,
            item_name: lang[locale].markdown, 
            item_desc: lang[locale].markdown,
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: "unchecked",
            item_length: 100,     //文字数初期値
            item_length_min: 1,   //文字数最小値
            item_length_max: 500, //文字数最大値
            item_rows: 4,         //行数初期値
            item_rows_min: 2,     //行数最小値
            item_rows_max: 20,    //行数最大値
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'image', 
            item_state: false,
            item_name: lang[locale].image, 
            item_desc: lang[locale].image,
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: "unchecked",
            item_width: 800,     //幅デフォルト値
            item_width_min: 80,     //幅最小値
            item_width_max: 1920,     //幅最大値
            item_height: 600,    //高さデフォルト値
            item_height_min: 80,    //高さ最小値
            item_height_max: 1920,    //高さ最大値
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'password', 
            item_state: false,
            item_name: lang[locale].password, 
            item_desc: lang[locale].password,
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: "unchecked",
            item_length: 10,  //最小文字数
            item_length_min: 8,   //文字数最小値
            item_length_max: 128, //文字数最大値
            item_selected: ["lowercase","uppercase","numbers","symbols"], 
            item_lowercase: true,  //英字（小文字）
            item_is_uppercase: true,  //英字（大文字） 
            item_is_numbers: true,  //数字
            item_is_symbols: false, //記号なし 記号あり
            item_uuid: "",
            item_seq: 0,
          },{ 
            item_type: 'email', 
            item_state: false,
            item_name: lang[locale].email, 
            item_desc: lang[locale].email,
            item_placeholder: "", //説明
            item_description: "", //補足説明
            item_key: "", //キー
            item_must: false,
            item_must_badge: "unchecked",
            item_allow_multiple: "unchecked",//カンマ区切りで複数入力可能
            item_uuid: "",
            item_seq: 0,
          }
        ],
      },
      // 状態データ
      state_data: {
        loaded: false,
      },
    }
  },
  // 既定計算
  computed: {
    state_item: function() {
      return function(item_data,item_must){
        if( item_must ){
          if( item_data === "" ){
            return false;
          } else {
            return true;
          }
        } else {
          return null;
        }
      }
    },
    state_item_name(){
      if( this.bind_data.item_name !== undefined ){
        if( this.bind_data.item_name !== "" ){
          return true;
        }
      }
      return false;
    },
    state_item_length(){
      if( this.bind_data.item_length !== undefined ){
        if( this.bind_data.item_length !== "" && this.bind_data.item_length !== null ){
          return true;
        }
      }
      return false;
    },
    state_item_rows(){
      if( this.bind_data.item_rows !== undefined ){
        if( this.bind_data.item_rows !== "" && this.bind_data.item_rows !== null ){
          return true;
        }
      }
      return false;
    },
    state_item_limit_min(){
      if( this.bind_data.item_limit_min !== undefined ){
        if( this.bind_data.item_limit_min !== "" ){
          if( this.bind_data.item_limit_max !== undefined ){
            if( this.bind_data.item_limit_max !== "" ){
              if( Number(this.bind_data.item_limit_min) <= Number(this.bind_data.item_limit_max) ){
                return true;
              }
            }
          }
        }
      }
      return false;
    },
    state_item_limit_max(){
      if( this.bind_data.item_limit_max !== undefined ){
        if( this.bind_data.item_limit_max !== "" ){
          if( this.bind_data.item_limit_min !== undefined ){
            if( this.bind_data.item_limit_min !== "" ){
              if( Number(this.bind_data.item_limit_min) <= Number(this.bind_data.item_limit_max) ){
                return true;
              }
            }
          }
        }
      }
      return false;
    },
    state_item_width(){
      if( this.bind_data.item_width !== undefined ){
        if( this.bind_data.item_width !== "" ){
          if( Number(this.bind_data.item_width) > Number(this.bind_data.item_width_max) ){
            return false;
          }
          if( Number(this.bind_data.item_width) < Number(this.bind_data.item_width_min) ){
            return false;
          }
          return true;
        }
      }
      return false;
    },
    state_item_height(){
      if( this.bind_data.item_height !== undefined ){
        if( this.bind_data.item_height !== "" ){
          if( Number(this.bind_data.item_height) > Number(this.bind_data.item_height_max) ){
            return false;
          }
          if( Number(this.bind_data.item_height) < Number(this.bind_data.item_height_min) ){
            return false;
          }
          return true;
        }
      }
      return false;
    },
    state_item_key(){
      if( this.bind_data.item_key !== undefined ){
        if( this.bind_data.item_key !== "" ){
          if( validator.isAlpha(this.bind_data.item_key,['en-US'],{'ignore':'_'}) ){
            return true;
          } else {
            return false;
          }
        } else {
          return null;
        }
      }
      return null;
    }
  },
  // 監視
  watch: {
    item_key_option() {
      if( this.item_key_option == "true" ){
        this.local_data.item_key_option = true;
      } else {
        this.local_data.item_key_option = false;
      }
    },
    bind_data: {
      handler: function(){
        if( this.bind_data.item_length !== undefined ){
          if( this.bind_data.item_length > this.bind_data.item_length_max ){
            this.$nextTick(function() {
              this.bind_data.item_length = this.bind_data.item_length_max;
            });
          }
          if( this.bind_data.item_length < this.bind_data.item_length_min ){
            this.$nextTick(function() {
              this.bind_data.item_length = this.bind_data.item_length_min;
            });
          }
          if( this.bind_data.item_length == "" || this.bind_data.item_length == null ){
            this.$nextTick(function() {
              this.bind_data.item_length = this.bind_data.item_length_min;
            });
          }
        }
        if( this.bind_data.item_rows !== undefined ){
          if( this.bind_data.item_rows > this.bind_data.item_rows_max ){
            this.$nextTick(function() {
              this.bind_data.item_rows = this.bind_data.item_rows_max;
            });
          }
          if( this.bind_data.item_length < this.bind_data.item_rows_min ){
            this.$nextTick(function() {
              this.bind_data.item_rows = this.bind_data.item_rows_min;
            });
          }
          if( this.bind_data.item_rows == "" || this.bind_data.item_rows == null ){
            this.$nextTick(function() {
              this.bind_data.item_rows = this.bind_data.item_rows_min;
            });
          }
        }
        if( this.bind_data.item_limit_min !== undefined ){
          if( this.bind_data.item_limit_min == "" || this.bind_data.item_limit_min == null ){
            this.$nextTick(function() {
              this.bind_data.item_limit_min = 0;
            });
          }
        }
        if( this.bind_data.item_limit_max !== undefined ){
          if( this.bind_data.item_limit_max == "" || this.bind_data.item_limit_max == null ){
            this.$nextTick(function() {
              this.bind_data.item_limit_max = 0;
            });
          }
        }
        // if( this.bind_data.item_width_max !== undefined ){
        //   if( this.bind_data.item_width_max !== "" ){
        //     if( Number(this.bind_data.item_width_max) > 1920 ){
        //       this.$nextTick(function() {
        //         this.bind_data.item_width_max = "1920";
        //       })
        //     }
        //     if( Number(this.bind_data.item_width_max) < 800 ){
        //       this.$nextTick(function() {
        //         this.bind_data.item_width_max = "800";
        //       })
        //     }
        //   }
        // }

        //
        // 状態を設定
        //
        if( this.bind_data.item_type == "name" ){
          if( this.bind_data.item_name[0] !== "" && this.bind_data.item_name[1] !== "" ){
            this.bind_data.item_state = true;
          } else {
            this.bind_data.item_state = false;
          }
        } else if( this.bind_data.item_type == "number" ){
          if( this.state_item_name && this.state_item_limit_min && this.state_item_limit_min ){
            this.bind_data.item_state = true;
          } else {
            this.bind_data.item_state = false;
          }
        } else if( this.bind_data.item_type == "radio" || this.bind_data.item_type == "checkbox" ){
          if( this.state_item_name ){
            this.bind_data.item_state = true;
            for( let i=0;i<this.bind_data.item_options.length;i++ ){
              if( this.bind_data.item_options[i] === "" ){
                this.bind_data.item_state = false;
              }    
            }
          } else {
            this.bind_data.item_state = false;
          }
        } else {
          if( this.state_item_name ){
            this.bind_data.item_state = true;
          } else {
            this.bind_data.item_state = false;
          }
        }
      },
      deep: true,
    }
  },
  // インスタンス初期化後
  created(){
    this.local_data.collapse_id = "accordion-" + this.get_unique_string();
  },
  // インスタンス破棄後
  destroyed() {
  },
  // インスタンスマウント後
  mounted(){
    if( this.item_key_option == "true" ){
      this.local_data.item_key_option = true;
    } else {
      this.local_data.item_key_option = false;
    }
    if( this.item_info == null ){
      this.bind_data = this.get_item_options("text");
    } else {
      if( this.item_info.item_state === undefined ){
        this.bind_data = this.get_item_options(this.item_info.item_type);
      } else {
        this.bind_data = this.item_info;
      }
    }
    if( this.bind_data.item_uuid == "" ){
      this.bind_data.item_uuid = uuidv4();
    }
    if( this.bind_data.item_no < 0 ){
      this.bind_data.item_no = String( Number(this.item_no) + 1 );
    }
    this.$emit('input',this.bind_data);
    this.state_data.loaded = true;
  },
  // ローカル関数
  methods: {
    lang: function( param ){
      return lang[locale][param];
    },
    get_item_name: function( item_name ){
      if( typeof item_name === "string" ){
        return item_name;
      } else if( item_name.length ){
        let ret = "";
        for( let i=0;i<item_name.length;i++ ){
          if( i>0 ) ret = ret + " / "; 
          ret = ret + item_name[i];
        }
        return ret;
      }
    },
    get_item_options: function( item_type ){
      for( let i=0;i<this.local_data.item_options.length;i++ ){
        if( this.local_data.item_options[i].item_type == item_type ){
          return this.local_data.item_options[i];
        }
      }
      return this.local_data.item_options[0];
    },
    get_unique_string:function (myStrong){
      var strong = 1000;
      if (myStrong) strong = myStrong;
      return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    },
    delete_item: function(){
      this.$emit("delete_item_method",this.bind_data);
    },
    copy_item: function(){
      this.$emit("copy_item_method",this.bind_data);
    }
  }
};
</script>
<style scoped>
.item-editor {
  text-align: left;
  padding: 4px;
}
a,a:hover,a:visited{
  color: inherit;
}
</style>