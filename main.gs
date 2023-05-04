var CHANNEL_ACCESS_TOKEN = ScriptProperties.getProperty("CHANNEL_ACCESS_TOKEN");
const userlist = ScriptProperties.getProperty("USER_LIST").split(".");

// lineにメッセージがあったらとりあえず呼ばれる部分
function doPost(e) {
  try{
    var post_json = JSON.parse(e.postData.getDataAsString());
    const events = post_json.events;
    for(let event of events){
      // sendDisco(`type : ${event.type}`+"\nuser:"+event.source.userId+"\nugroup:"+event.source.groupId+"\nuroom:"+event.source.roomId)
      switch (event.type) {
        case "message":
          if(event.message.type=="sticker"){
            // スタンプがそうしんされた時
            // sendSelect(event);
          }else{
            messageRep(event);
          }
          break;
        case "postback":
          messageRepPost(event);
          break
        default:
          sendDisco("false"+event.type+  +event.source.roomId +  +event.source.type)
      }
    }
  }catch(e){
    sendDisco(printError(e))
  }
}
