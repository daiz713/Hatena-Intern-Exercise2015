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
  for(var i = 0; i < logLines.length-1; i++) {
    var logLine = logLines[i];           // ログ1行分
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
  
  return res;
}

// 課題 JS-2: 関数 `createLogTable` を記述してください
