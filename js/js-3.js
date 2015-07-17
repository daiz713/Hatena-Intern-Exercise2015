// 課題 JS-3 の実装をここに記述してください。

// ボタンにクリックイベントを登録:
document.querySelector('#submit-button').addEventListener('click', function(e) {
  var container = document.querySelector('#table-container');
  var logStr = document.querySelector('#log-input').value;
  container.innerHTML = '';  // 前回の描画をクリアする
  createLogTable(container, parseLTSVLog(logStr));
}, false);
