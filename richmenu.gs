// リッチメニュー関連
// getRichMenuList()
// setOwnRichMenu(userId,richMenuId)
// postRichMenuImage(richMenuId,imgID)
// setDefaultRichMenu(richMenuId)
// deleteRichMenu(richMenuId)
// https://drive.google.com/file/d/1OwOPpQXG-odfrmy9Dxm_HwTofn8KJYQs/view?usp=sharing
function richmenuMain(){
  var a = makeRichMenu();
  let payload=makeDefaultRichMenu()
  var response = registRichMenu(payload)
  console.log(response);
  return
  var richmenuIDs = {
    "defaultRichmenu":'richmenu-1',
  }

  var userIDs={
    "user":"userID",
  };
  // postRichMenuImage(richmenuIDs.defaultRichmenu,"imgID");
  // setOwnRichMenu(userIDs.user,richmenuIDs.defaultRichMenu);
  // deleteRichMenu("richmenu-id");
  // setDefaultRichMenu("richmenu-id");
  // setRichMenuForAll(richmenuIDs.defaultrichmenu)
  // createRichMenuAlias("richmenu-alias-stamp",richmenuIDs.StampRichMenu_s)
  // updateRichMenuAlias("richmenu-alias-stamp",richmenuIDs.StampRichMenu_s)
  // createRichMenuAlias("richmenu-alias-coupon",richmenuIDs.StampRichMenu_c)
}

function makeRichMenu() {
  return {
    "size": {
      "width": 800,
      "height": 500
    },
    "selected": true,
    "name": "defaultRichmenu-v1",
    "chatBarText": "メニュー",
    "areas": [
      {
        "bounds": {
          "x": 0,
          "y": 0,
          "width": 400,
          "height": 250
        },
        "action": {
          "type":"uri",
          "label":"購入する",
          "uri":"url",
        }
      }
   ]
  }
}

function deleteRichMenu(richMenuId){
 var url = "https://api.line.me/v2/bot/richmenu/" + richMenuId;
 var response = UrlFetchApp.fetch(url, {
   'headers': {'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,},
   'method' : 'DELETE',
 });
 Logger.log(response);  
}

function postRichMenuImage(richMenuId,imgID){

  //  var richMenuId = "***************"; // 作成済みリッチメニューのID
  var richmenu_url = "https://api-data.line.me/v2/bot/richmenu/" + richMenuId+"/content";

  //  var content = "*******************"; // グーグルドライブの画像ファイルのID
  var content_type = "image/png"; //pngの場合はjpeg→png

  var blob = DriveApp.getFileById(imgID).getBlob();
  
  var response = UrlFetchApp.fetch(richmenu_url, {
    'headers': {
      'Content-Type': content_type,
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': blob
  });
 
  Logger.log(response);  
}

function setDefaultRichMenu(richMenuId){
  var url = "https://api.line.me/v2/bot/user/all/richmenu/" + richMenuId;
  var response = UrlFetchApp.fetch(url, {
    'headers': {'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,},
    'method' : 'post',
  });
  Logger.log(response);  
}

function getRichMenuList(){
  var url = "https://api.line.me/v2/bot/richmenu/list";
  var response = UrlFetchApp.fetch(url, {
    'headers': {'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,},
    'method' : 'get',
  });
  var res = JSON.parse(response.getContentText());
  
  console.log(res);
  for (var i in res["richmenus"]){
    Logger.log(res["richmenus"][i].richMenuId);
    Logger.log(res["richmenus"][i].name);
    Logger.log(res["richmenus"][i].areas);
  }
}

function setOwnRichMenu(userId,richMenuId){
  // var  = "richmenu-3147077ec584b9f6759976bdfd04ce8d";
  var url = "https://api.line.me/v2/bot/user/"+userId+"/richmenu/" + richMenuId;
  var response = UrlFetchApp.fetch(url, {
    'headers': {'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,},
    'method' : 'post',
  });
  Logger.log(response);
}

function createRichMenuAlias(aliasId,richMenuId){
  var payload = {
    "richMenuAliasId": aliasId,
    "richMenuId": richMenuId
  }
  // var  = "richmenu-3147077ec584b9f6759976bdfd04ce8d";
  var url = "https://api.line.me/v2/bot/richmenu/alias";
  var response = UrlFetchApp.fetch(url, {
    'headers': {
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      'Content-Type' : 'application/json'
    },
    'payload': JSON.stringify(payload),
    'method' : 'post',
  });
  Logger.log(response);
}
// curl -v -X POST https://api.line.me/v2/bot/richmenu/alias/richmenu-alias-a \
// -H 'Authorization: Bearer {channel access token}' \
// -H 'Content-Type: application/json' \
// -d \
// '{
//     "richMenuId": "richmenu-862e6ad6c267d2ddf3f42bc78554f6a4"
// }'
function updateRichMenuAlias(aliasId,richMenuId){
  var payload = {
    "richMenuId": richMenuId
  }
  var url = "https://api.line.me/v2/bot/richmenu/alias/"+aliasId;
  var response = UrlFetchApp.fetch(url, {
    'headers': {
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      'Content-Type' : 'application/json'
    },
    'payload': JSON.stringify(payload),
    'method' : 'post',
  });
  Logger.log(response);
}



function getUserList(){
  // var  = "richmenu-3147077ec584b9f6759976bdfd04ce8d";
  var url = "https://api.line.me/v2/bot/followers/ids";
  var response = UrlFetchApp.fetch(url, {
    'headers': {
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      'Content-Type' : 'application/json'
    },
    // 'payload': JSON.stringify(payload),
    'method' : 'get',
    "muteHttpExceptions":true
  });
  console.log(response);
  var res = JSON.parse(response.getContentText());
  
  console.log(res);
}

function setRichMenuForAll(richmenuID){
  var payload = {
    "richMenuId": richmenuID,
    // "richMenuId": "	richmenu-2d886fc18abc5efb40a660a90d5bd2b4",
    "userIds": users
  }
  // var  = "richmenu-3147077ec584b9f6759976bdfd04ce8d";
  var url = "https://api.line.me/v2/bot/richmenu/bulk/link";
  var response = UrlFetchApp.fetch(url, {
    'headers': {
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      'Content-Type' : 'application/json'
    },
    'payload': JSON.stringify(payload),
    'method' : 'post',
  });
  Logger.log(response);
}
// curl -v -X POST https://api.line.me/v2/bot/richmenu/bulk/unlink \
// -H "Authorization: Bearer {channel access token}" \
// -H "Content-Type: application/json" \
// -d '{
//   "userIds":["{userId1}","{userId2}"]
// }'
function unlinkRichMenuForAll(){
  var payload = {
    // "richMenuId": richmenuID,
    // "richMenuId": "	richmenu-2d886fc18abc5efb40a660a90d5bd2b4",
    "userIds": users
  }
  // var  = "richmenu-3147077ec584b9f6759976bdfd04ce8d";
  var url = "https://api.line.me/v2/bot/richmenu/bulk/unlink";
  var response = UrlFetchApp.fetch(url, {
    'headers': {
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      'Content-Type' : 'application/json'
    },
    'payload': JSON.stringify(payload),
    'method' : 'post',
  });
  Logger.log(response);
}

function registRichMenu(payload) {
  try{
    
  // リッチメニュー使えるか確認用

  UrlFetchApp.fetch('https://api.line.me/v2/bot/richmenu/validate', {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'POST',
    'payload': JSON.stringify(payload),
    })
  }catch(e){
    console.log(e.message)
  }

  // 応答メッセージ用のAPI URL
  var url = 'https://api.line.me/v2/bot/richmenu';

  return UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'POST',
    'payload': JSON.stringify(payload),
    });
}
