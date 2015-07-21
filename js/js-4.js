// 課題 JS-4 の内容
"use strict";

function addToArr(arr, elem) {
  for(var k = 0; k < arr.length; k++) {
    if(arr[k] === elem) return arr;
  }
  arr.push(elem);
  return arr;
}

// 全ての条件を満たすかどうか、ログを一件ずつ確認する
function generateCondRes(logObj) {
  var res = true;
  var conds = document.querySelector('.opts').children;
  var condsLength = document.querySelector('.opts').childElementCount;
  var and = document.querySelector('#option-and').checked;
  var or = document.querySelector('#option-or').checked;

  var and_or = 'and';
  var res = true;
  if(or) {
    and_or = 'or';
    res = false;
  }

  for(var i = 0; i < condsLength; i++) {
    var enable = conds[i].querySelector('.opt-enable').checked;
    if(enable) {
      var key = conds[i].querySelector('.opt-key').value;
      var val = conds[i].querySelector('.opt-value').value;
      if(val === '') val = logObj[key];
      var eq_neq = conds[i].querySelector('.opt-eq').value;
      var rg = new RegExp(val, 'i');
      var objval = '' + logObj[key];
      if(eq_neq === 'eq') {
        res = (and_or == 'and') ? (res && (objval.search(rg) != -1)) : (res || (objval.search(rg) != -1));
      }else {
        res = (and_or == 'and') ? (res && (objval.search(rg) == -1)) : (res || (objval.search(rg) == -1));
      }
    }
  }
  return res;
}

// セレクトボックス(Label)の内容に対応した選択肢を生成する
function createOptionValues(id_num, key) {
  var a = [];
  // ログ文字列をオブジェクトに変換
  var logStr = document.querySelector('#log-input').value;
  var logObjs = parseLTSVLog(logStr);
  // .opt-suggest-list の選択肢を生成
  var optSuggestListElem = document.querySelector('#opt-suggest-' + id_num);
  optSuggestListElem.innerHTML = '';
  // 選択肢配列を更新
  for(var i = 0; i < logObjs.length; i++) {
    a = addToArr(a, logObjs[i][key]);
  }
  for(i = 0; i < a.length; i++) {
    var opt = document.createElement('option');
    opt.value = a[i];
    opt.innerHTML = a[i];
    optSuggestListElem.appendChild(opt);
  }
}

// セレクトボックス(Label)の選択肢を生成する
function createOptionLabels(id_num, optElem) {
  // ログ文字列をオブジェクトに変換
  var logStr = document.querySelector('#log-input').value;
  var logObjs = parseLTSVLog(logStr);
  // .opt-key の選択肢を生成
  var keys = Object.keys(logObjs[0]);
  var optKeyElem = optElem.querySelector('.opt-key');
  for(var i = 0; i < keys.length; i++) {
    var opt = document.createElement('option');
    opt.value = keys[i];
    opt.innerHTML = keys[i];
    optKeyElem.appendChild(opt);
  }
  optKeyElem.value = keys[0];
  createOptionValues(id_num, optKeyElem.value);
}

function searchLogs() {
  // ログ文字列をオブジェクトに変換
  var logStr = document.querySelector('#log-input').value;
  var logObjs = parseLTSVLog(logStr);
  // 表示するログオブジェクトを格納する配列を用意
  var res = [];
  // 表示するものを決定する
  for(var i = 0; i < logObjs.length; i++) {
    if(generateCondRes(logObjs[i]) === true) res.push(logObjs[i]);
  }
  return res;
}

document.querySelector('#option-do-search').addEventListener('click', function(e) {
  var logs = searchLogs();
  var container = document.querySelector('#table-container');
  container.innerHTML = '';  // 前回の描画をクリアする
  createLogTable(container, logs);
}, false);

document.addEventListener('change', function(e) {
  if(e.target.className === 'opt-key') {
    var id_num = e.target.id.split('-')[2];
    var key = e.target.value;
    createOptionValues(id_num, key);
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
  optContainer.appendChild(optElem);
  createOptionLabels(num_opts + 1, optElem);
}, false);
