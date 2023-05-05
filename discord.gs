// Discordへの通知用
function sendDisco(message="uni") {
  //取得したWebhookURLを追加
  const DISCORD_WEBWOOK = ScriptProperties.getProperty("DISCORD_WEBWOOK");
  if(!DISCORD_WEBWOOK){ return }

  const payload = {
    // username: "花火",
    content: message,
  };

  UrlFetchApp.fetch(DISCORD_WEBWOOK, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
}
