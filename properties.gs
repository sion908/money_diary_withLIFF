// プロパティへの登録用
function setCHANNEL_ACCESS_TOKEN(){
  const channnel_access_token = "xxx";
  if (channnel_access_token == "xxx"){console.log("値をいれてください");return;}
  ScriptProperties.setProperty("CHANNEL_ACCESS_TOKEN",channnel_access_token);
}
function setDISCORD_WEBWOOK(){
  const discord_webhook = "xxx";
  if (discord_webhook == "xxx"){console.log("値をいれてください");return;}
  ScriptProperties.setProperty("CHANNEL_ACCESS_TOKEN",discord_webhook);
}
function setSHEET_ID(){
  const sheet_id = "xxx";
  if (sheet_id == "xxx"){console.log("値をいれてください");return;}
  ScriptProperties.setProperty("SHEETID",sheet_id);
}

function setUserList(){
  users = [
    "xxx"
  ];

  console.log("count : ",users.length);
  if (users.length == 1 && users[0] == "xxx"){
    console.log("値をいれてください");return;
  }
  ScriptProperties.setProperty("USER_LIST", users.join("."))
  console.log(ScriptProperties.getProperty("USER_LIST").split("."))
}
