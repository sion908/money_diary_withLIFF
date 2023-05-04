// postbackメッセージ受信時
function messageRepPost(event){
  var reply_token = event.replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }else if(!(userlist.includes(event.source.userId))){
    return;
  }

  [kind, lastRow, sheetName] = event.postback.data.split("&").map(value=>value.split("=")[1]);

  sheet = getSheet(sheetName);
  sheet.getRange(lastRow,3).setValue(convertQuickRepItems(kind));
  datas = sheet.getRange(lastRow, 2, 1, 5).getValues()[0];
  console.log("datas", datas);

  UrlFetchApp.fetch( 'https://api.line.me/v2/bot/message/reply', {
  'headers': {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  },
  'method': 'post',
  'payload': JSON.stringify({
    'replyToken': reply_token,
    
    'messages': [
      {
        'type': 'text',
        'text': dataToString(datas),
      }
    ],
  }),
  });
  ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function dataToString(d){
  if(!d){d=[new Date(),"kind","品目","444"]}

  return `${Utilities.formatDate(d[0], 'JST', "yy-MM-dd\nHH:mm:ss")}\n`+
         `種類 : ${d[1]}\n`+
         `品目 : ${d[2]}\n`+
         `価格 : ${d[3]}円`
}