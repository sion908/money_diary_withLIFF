// テキスト入力のメッセージ受信時
function messageRep(event){
  var reply_token = event.replyToken;
  if (typeof reply_token === 'undefined') {
    sendDisco("messageRep\nnoreptoken");
    return;
  }else if(!(userlist.includes(event.source.userId))){
    sendDisco(`messageRep\nnotVaridUser`)
    return;
  }
  const message = event.message.text.split("\n");
  if(message.length==2){
    const d = new Date(event.timestamp);
    var sheetName = Utilities.formatDate(d, 'JST', 'yy-');
    var month = d.getMonth();
    if(month%2==0){
      sheetName+=( '00' + (month+1) ).slice( -2 )+( '00' + (month+2) ).slice( -2 );
    }else{
      sheetName+=( '00' + (month+0) ).slice( -2 )+( '00' + (month+1) ).slice( -2 );
    }
    const sheet = getSheet(sheetName);
    var data = [event.timestamp,Utilities.formatDate(d, 'JST', "yy-MM-dd HH:mm:ss"),,...message]
    sheet.appendRow(data);
    quickRepItems = getQuickRepItems(sheet.getLastRow(), sheetName);
    eTitle="2"
    lastRow=2
    UrlFetchApp.fetch( 'https://api.line.me/v2/bot/message/reply', {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'muteHttpExceptions':true,
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': '種類は？',
        "quickReply": {
          "items":quickRepItems
        }
      }],
    }),
    });
  }else if(message.length==3){
    const d = new Date(event.timestamp);
    const sheet = getSheet("収入");
    var data = [event.timestamp,Utilities.formatDate(d, 'JST', "yy-MM-dd HH:mm:ss"),,...message.slice(1,3)]
    sheet.appendRow(data);
    quickRepItems = getQuickRepItems(sheet.getLastRow(), sheetName);
    eTitle="2"
    lastRow=2
    UrlFetchApp.fetch( 'https://api.line.me/v2/bot/message/reply', {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'muteHttpExceptions':true,
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': `登録しました\n収入\n`+
                `品目 : ${message[1]}\n`+
                `価格 : ${message[2]}円`
      }],
    }),
    });
  }else{errorRep(reply_token, event.message.text+"入力形式を間違えています");return;}
  ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}


function errorRep(reply_token,mess){
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
  'headers': {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  },
  'method': 'post',
  'payload': JSON.stringify({
    'replyToken': reply_token,
    'messages': [{
      'type': 'text',
      'text': mess + '\nえらーがありました'
    }],
  }),
  });
}
