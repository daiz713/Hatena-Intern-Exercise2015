// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
/* 
 * LTSV 形式の文字列を引数として受け取り、
 * その文字列をパースしてオブジェクトの配列にして返す関数
 */
function parseLTSVLog(logStr) {
  var res = [];
  var EPOCH = "epoch";

  var logLines = logStr.split('\n');
  // それぞれのログに対して:
  for(var i = 0; i < logLines.length; i++) {
    var logLine = logLines[i];           // ログ1行分
    if(logLine != '') {
      var logPears = logLine.split('\t');  // ログ1行に含まれるLabel-Valueペアの配列
      // それぞれのペアに対して:
      var logObj = {};
      for(var j = 0; j < logPears.length; j++) {
        var label = logPears[j].split(':')[0];
        var val = logPears[j].split(':')[1];
        if(label === EPOCH) val = Number(val);
        logObj[label] = val;
      } 
      res.push(logObj);
    }
  }
  
  return res;
}

// 課題 JS-2: 関数 `createLogTable` を記述してください
/* tagName 要素を表す DOM オブジェクトを、parentObjの直下に追加して、返す関数 */
function elem(tagName, text, parentObj) {
  var newObj = document.createElement(tagName);
  if(text != '') newObj.appendChild(document.createTextNode(text));
  parentObj.appendChild(newObj);
  return newObj;
}

/*
 * 第1引数: div 要素を表す DOM オブジェクト
 * 第2引数: 関数 parseLTSVLog の返り値と同じ形式の配列
 * 第1引数のdivの直下にtableを生成する関数
 */
function createLogTable(containerDiv, logObjs) {
  var labels = Object.keys(logObjs[0] || {});
  var i, j;

  var table = elem('table', '', containerDiv);
  var thead = elem('thead', '', table);
  var tbody = elem('tbody', '', table);
  var tr, th, td, logObj;
  
  // <thead> ... </thead> の部分を生成:
  tr = elem('tr', '', thead);
  for(i = 0; i < labels.length; i++) elem('th', labels[i], tr);

  // <tbody> ... </tbody> の部分を生成:
  for(i = 0; i < logObjs.length; i++) {
    logObj = logObjs[i];
    tr = elem('tr', '', tbody);
    for(j = 0; j < labels.length; j++) elem('td', logObj[labels[j]], tr);
  }
}

