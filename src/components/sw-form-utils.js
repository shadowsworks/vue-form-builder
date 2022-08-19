// ----------------------------------------------------------------
// 共通関数 
// ----------------------------------------------------------------

export default {
  methods: {

    //
    // item_key で item_data を取得する
    //
    get_data_by_key: function( form_data, key ){
      if( Array.isArray(form_data.item_data) ){
        for( let i=0;i<form_data.item_data.length;i++ ){
          if( form_data.item_data[i] !== null ){
            if( form_data.item_data[i].item_key == key ){
              return form_data.item_data[i].item_data;
            }
          }
        }
        return "";
      } else {
        return "";
      }
    },

    //
    // item_uuid で item_data を取得する
    //
    get_data_by_uuid: function( form_data, uuid ){
      if( Array.isArray(form_data.item_data) ){
        for( let i=0;i<form_data.item_data.length;i++ ){
          if( form_data.item_data[i] !== null ){
            if( form_data.item_data[i].item_uuid == uuid ){
              return form_data.item_data[i].item_data;
            }
          }
        }
        return "";
      } else {
        return "";
      }
    },

    //
    // item_key で item_state を取得する
    //
    get_state_by_key: function( form_data, key ){
      if( Array.isArray(form_data.item_data) ){
        for( let i=0;i<form_data.item_data.length;i++ ){
          if( form_data.item_data[i] !== null ){
            if( form_data.item_data[i].item_key == key ){
              return form_data.item_data[i].item_state;
            }
          }
        }
        return false;
      } else {
        return false;
      }
    },

    //
    // item_uuid で item_state を取得する
    //
    get_state_by_uuid: function( form_data, uuid ){
      if( Array.isArray(form_data.item_data) ){
        for( let i=0;i<form_data.item_data.length;i++ ){
          if( form_data.item_data[i] !== null ){
            if( form_data.item_data[i].item_uuid == uuid ){
              return form_data.item_data[i].item_state;
            }
          }
        }
        return false;
      } else {
        return false;
      }
    },

    //
    // item_uuid で item_show を取得する
    //
    get_show_by_uuid: function( form_data, uuid ){
      if( Array.isArray(form_data.item_data) ){
        for( let i=0;i<form_data.item_data.length;i++ ){
          if( form_data.item_data[i] !== null ){
            if( form_data.item_data[i].item_uuid == uuid ){
              return form_data.item_data[i].item_show;
            }
          }
        }
        return false;
      } else {
        return false;
      }
    },

    //
    // 必須項目が入力されているか
    //
    get_state_required: function( form_info, form_data ){
      //console.log("get_state_required_data="+JSON.stringify(form_data,null,2));
      if( form_info == null ){
        return false;
      }
      if( Array.isArray(form_info.item_info) && Array.isArray(form_data.item_data) ){
        for( let i=0;i<form_info.item_info.length;i++ ){
          //console.log("get_state_required_data="+JSON.stringify(form_info.item_info[i]));
          if( form_info.item_info[i] !== null ){
            if( form_info.item_info[i].item_required == true ){
              if( this.get_show_by_uuid(form_data,form_info.item_info[i].item_uuid) ){
                let state = this.get_state_by_uuid(form_data,form_info.item_info[i].item_uuid);
                if( state == false || state == null ){
                  return false;
                }
              }
            } else {
              let state = this.get_state_by_uuid(form_data,form_info.item_info[i].item_uuid);
              if( state == false ){
                return false;
              }
            }
          }
        }
        return true;
      } else {
        return false;
      }
    }
  }
}