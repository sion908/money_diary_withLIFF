// クイックリプレイの項目作成用
function getQuickRepItems(lastRow, sheetName){
  if(!lastRow){lastRow=1,sheetName="2"}
  // {
  //   "type": "postback",
  //   "label": "Buy",
  //   "data": "action=buy&itemid=111",
  //   "displayText": "Buy",
  // }
  reps = ScriptProperties.getProperty("typeOfUsage").split(".");
  context = reps.map(rep => {
    [jTitle, eTitle] = rep.split(",");
    console.log("eTitle", eTitle, "jTitle", jTitle);
    return {
        "type": "action",
        "action": {
          "type": "postback",
          "label": jTitle,
          "data": `data=${eTitle}&lR=${lastRow}&sn=${sheetName}`,
          "displayText": jTitle,
        }
      }
  });
  console.log(context);
  return context
}

function convertQuickRepItems(eTitle){
  if(!eTitle){eTitle="Water"}
  reps = ScriptProperties.getProperty("typeOfUsage").split(".");
  for(value of reps){
    [j,e]=value.split(",");
    console.log(j,e);
    if(e==eTitle){
      return j;
    }
  }
}

// クイックリプレイの設定用，更新があった場合これの更新のみでlineにも適用されるはず
function setQuickRepItems(){
  // limit:13
  kinds =[
    ["食費","Food"],
    ["交際費","Entertainment"],
    ["日用品費","Daily"],
    ["被服,美容費","Expense"],
    ["趣味費","Hobby"],
    ["交通費","Transportation"],
    ["医療費","Medical"],
    ["雑費","Miscellaneous"],
    ["住居費","Housing"],
    ["水道光熱費","Water"],
    ["通信費","Communication"],
    ["保険料","Insurance"],
  ];

  console.log("count : ",kinds.length);
  if(kinds.length>=13){
    console.log("上限を超えています\n", kinds.length);
    return;
  }
  ScriptProperties.setProperty("typeOfUsage", kinds.map(value=>value.join(",")).join("."))
}
