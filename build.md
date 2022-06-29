# ライブラリとしてビルド
npm run build-bundle

# ファイル名を変更
mv dist/vue-form-producer.umd.min.js dist/vue-form-producer.umd.js

# npm へアップ
npm login
npm publish

# 取り消し(72時間以内)
npm unpublish vue-form-producer@x.x.x
