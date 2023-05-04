// スプシへの入力用関数
const sheetID = ScriptProperties.getProperty("SHEETID")

function getSheet(sheetName) {
  if(!d){var d = new Date();console.log("dateTime : ",Utilities.formatDate(d, 'JST', "yy-MM-dd HH:mm:ss"));} // "yy-MM-dd'T'HH:mm:ss"
  const ss = SpreadsheetApp.openById(sheetID);
  var sheet = ss.getSheetByName(sheetName);
  if(!sheet){
    sheet = ss.insertSheet(sheetName);
  }
  console.log("sheetName : ", sheet.getName());
  return sheet
}
