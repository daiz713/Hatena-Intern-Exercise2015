// 課題 JS-4 の内容
"use strict";

function addToArr(arr, elem) {
  for(var k = 0; k < arr.length; k++) {
    if(arr[k] === elem) return arr;
  }
  arr.push(elem);
  return arr;
}

function createOptionItem(optElem) {
  // ログ文字列をオブジェクトに変換
  var logStr = document.querySelector('#log-input').value;
  var logObj = parseLTSVLog(logStr);
  // .opt-key の選択肢を生成
  var keys = Object.keys(logObj[0]);
  var optKeyElem = optElem.querySelector('.opt-key');
  for(var i = 0; i < keys.length; i++) {
    var opt = document.createElement('option');
    opt.value = keys[i];
    opt.innerHTML = keys[i];
    optKeyElem.appendChild(opt);
  }
  optKeyElem.value = keys[0];
}

document.addEventListener('change', function(e) {
  var a = [];
  if(e.target.className === 'opt-key') {
    var id_num = e.target.id.split('-')[2];
    console.log(id_num);
    var key = e.target.value;
    // ログ文字列をオブジェクトに変換
    var logStr = document.querySelector('#log-input').value;
    var logObj = parseLTSVLog(logStr);
    // .opt-suggest-list の選択肢を生成
    var optSuggestListElem = document.querySelector('#opt-suggest-' + id_num);
    optSuggestListElem.innerHTML = '';
    // 選択肢配列を更新
    for(var i = 0; i < logObj.length; i++) {
      a = addToArr(a, logObj[i][key]);
    }
    for(i = 0; i < a.length; i++) {
      var opt = document.createElement('option');
      opt.value = a[i];
      opt.innerHTML = a[i];
      optSuggestListElem.appendChild(opt);
    }
  }
}, false);

document.querySelector('#option-add').addEventListener('click', function(e) {
  // オプション項目を追加するエリア
  var optContainer = document.querySelector('.opts');
  // オプション項目のテンプレートをコピー
  var optElem = document.querySelector('#option-elem-template').firstElementChild.cloneNode(true);
  // 現在表示されている項目数
  var num_opts = optContainer.childElementCount;
  optElem.querySelector('.opt-key').id = 'opt-key-' + (num_opts + 1);
  optElem.querySelector('.opt-value').setAttribute('list', 'opt-suggest-' + (num_opts + 1));
  optElem.querySelector('.opt-suggest-list').id = 'opt-suggest-' + (num_opts + 1);
  // セレクトボックス .opt-key 選択肢を生成
  createOptionItem(optElem);
  optContainer.appendChild(optElem);
}, false);
