'use strict';
/* 画面共通の小さな部品(このアプリ固有。シェル app.js は触らない)
   ・window.TEBIKI_PARTS = { TAGS, SEP, uid, fmt, str, num, strs, tagName, toTop, field, chips, tagSelect, overlay, confirmRow, disarm, askDiscard, bigBtn, exportText, exportBtn }
   ・各画面は render のときに参照する(読み込み順に依存しない)
   ・操作は全部 api.Tap.bind。select と input/textarea の入力だけネイティブイベント */
(function(){
  var TAGS = ['work','school','hospital','shop','family','phone'];
  var SEP = ' · ';      // 一覧の区切り(全言語共通)

  function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function pad(n){ return (n < 10 ? '0' : '') + n; }
  /* 日付: ja/zh/ko/en は 月/日、de は 日.月.、nl は 日-月、ほかは 日/月(数字は全言語 西洋数字のまま) */
  function fmt(ts, lang){
    var d = new Date(ts || Date.now());
    var m = d.getMonth() + 1, day = d.getDate();
    var md = ['ja','zh','ko','en'].indexOf(lang || 'ja') >= 0 ? (m + '/' + day)
           : (lang === 'de') ? (day + '.' + m + '.')
           : (lang === 'nl') ? (day + '-' + m)
           : (day + '/' + m);
    return md + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  /* バックアップ由来の欠けた値を整える(文字 / 数 / 文字の配列n個) */
  function str(x){ return (typeof x === 'string') ? x : (typeof x === 'number' ? String(x) : ''); }
  function num(x){ return (typeof x === 'number' && isFinite(x)) ? x : 0; }
  function strs(a, n){ var src = Array.isArray(a) ? a : [], out = []; for(var i = 0; i < n; i++) out.push(str(src[i])); return out; }
  function tagName(api, t){ return api.T('common.tags.' + t); }
  /* 画面の中で 一覧 → 詳細/フォーム などに切り替えたら、いちばん上から見せる */
  function toTop(){ try{ var m = document.getElementById('main'); if(m) m.scrollTop = 0; }catch(_){} }

  /* 入力欄(label + input/textarea + hint)。戻り値 { wrap, input } */
  function field(api, o){
    var wrap = api.el('div', 'field');
    if(o.label){ var lb = api.el('label', null, o.label); wrap.appendChild(lb); }
    var input = api.el(o.multi ? 'textarea' : 'input');
    if(!o.multi) input.type = 'text';
    else input.rows = o.rows || 3;
    if(o.cls) input.className = o.cls;
    input.placeholder = o.ph || '';
    input.value = o.value || '';
    if(o.id) input.id = o.id;
    /* 戻るボタン(Play版): 入れたらすぐ覚える欄(書きかけの保存・検索)は、書きかけの確かめに数えない */
    if(o.nodirty) input.setAttribute('data-nodirty', '1');
    wrap.appendChild(input);
    if(o.hint) wrap.appendChild(api.el('p', 'hint', o.hint));
    return { wrap: wrap, input: input };
  }

  /* 場面タグの丸ボタン列(えらぶと .on)。o.tags=タグ配列 / o.value=いま / o.all=「すべて」を先頭に / o.onPick(tag) */
  function chips(api, o){
    var wrap = api.el('div', 'chips');
    var list = (o.all ? ['all'] : []).concat(o.tags || TAGS);
    list.forEach(function(t){
      var b = api.el('button', 'chip' + (t === o.value ? ' on' : ''), api.T('common.tags.' + t));
      b.setAttribute('data-tag', t);
      api.Tap.bind(b, function(){
        var all = wrap.querySelectorAll('.chip');
        for(var i = 0; i < all.length; i++) all[i].classList.toggle('on', all[i] === b);
        if(o.onPick) o.onPick(t);
      });
      wrap.appendChild(b);
    });
    return wrap;
  }

  /* 場面タグの select(入力フォーム用。select だけはネイティブ) */
  function tagSelect(api, o){
    var sel = api.el('select');
    (o.tags || TAGS).forEach(function(t){
      var op = api.el('option', null, api.T('common.tags.' + t));
      op.value = t;
      sel.appendChild(op);
    });
    sel.value = o.value || (o.tags || TAGS)[0];
    return sel;
  }

  /* 全画面で大きく見せる(.ov + .ov-close)。o.head=見出し / o.blocks=[{label, value}] */
  function overlay(api, o){
    var ov = api.el('div', 'ov');
    ov.id = 'tebiki-ov';
    if(o.head) ov.appendChild(api.el('div', 'show-head', o.head));
    (o.blocks || []).forEach(function(b){
      if(!b.value) return;
      var blk = api.el('div', 'show-block');
      if(b.label) blk.appendChild(api.el('div', 'show-label', b.label));
      blk.appendChild(api.el('div', 'show-value pre', b.value));
      ov.appendChild(blk);
    });
    var close = api.el('button', 'ov-close', api.T('common.close'));
    close.id = 'tebiki-ov-close';
    api.Tap.bind(close, function(){ ov.remove(); });
    ov.appendChild(close);
    /* 戻るボタン(Play版): 下に足した「けす」の確かめ中なら「いいえ」、そうでなければ とじる と同じ */
    ov._back = function(){ if(!disarm(ov)) ov.remove(); };
    document.body.appendChild(ov);
    return ov;
  }

  /* 二段階の「けす」: 1回目で「ほんとうに?」+ はい/いいえ を出す(window.confirm は使わない)
     o.label / o.ask / o.cls で「欄を からにする」などにも使う
     ・確かめ中の行には data-armed を付ける。戻るボタン(Play版)は disarm() で「いいえ」と同じにする(けさない) */
  function confirmRow(api, o){
    var row = api.el('div', 'btn-row');
    var del = api.el('button', o.cls || 'btn danger', o.label || api.T('common.del'));
    del.id = o.id || 'btn-del';
    function unarm(){ row.textContent = ''; row.removeAttribute('data-armed'); row.appendChild(del); }
    api.Tap.bind(del, function(){
      row.textContent = '';
      row.setAttribute('data-armed', '1');
      row.appendChild(api.el('span', 'hint', o.ask || api.T('common.delConfirm')));
      var yes = api.el('button', 'btn danger', api.T('common.yes'));
      yes.id = (o.id || 'btn-del') + '-yes';
      var no = api.el('button', 'btn', api.T('common.no'));
      api.Tap.bind(yes, function(){ if(o.onYes) o.onYes(); });
      api.Tap.bind(no, unarm);
      row.appendChild(yes); row.appendChild(no);
    });
    row._unarm = unarm;
    row.appendChild(del);
    return row;
  }
  /* 戻るボタン(Play版): root の中に確かめ中の「けす」があれば「いいえ」にして true */
  function disarm(root){
    var r = (root && root.querySelector) ? root.querySelector('[data-armed]') : null;
    if(!r || typeof r._unarm !== 'function') return false;
    r._unarm();
    return true;
  }
  /* 戻るボタン(Play版): 書いたことを すてて もどるか たずねる。done(true=はい)
     アプリの中の確かめの窓(api.ask)。window.confirm は Play版だとボタンが英語の OK / Cancel になるため(2026-09-29) */
  function askDiscard(api, done){
    if(typeof api.ask === 'function'){ api.ask(api.T('common.backConfirm'), done, false); return; }
    var ok = false;
    try{ ok = !!window.confirm(api.T('common.backConfirm')); }catch(_){ ok = false; }
    done(ok);
  }

  /* ホーム等の大ボタン(絵 + 文字 + 小さな説明) */
  function bigBtn(api, o){
    var b = api.el('button', 'big-btn' + (o.cls ? ' ' + o.cls : ''));
    if(o.id) b.id = o.id;
    b.appendChild(api.el('span', 'ico', o.ico || ''));
    var txt = api.el('span', 'txt');
    txt.appendChild(api.el('span', 'lbl', o.label));
    if(o.sub) txt.appendChild(api.el('span', 'sub', o.sub));
    b.appendChild(txt);
    api.Tap.bind(b, o.onTap);
    return b;
  }

  /* 章の書き出し(全画面): 文字にして並べ、他の人の情報を伏せる案内 + 書きかえられる欄 + コピー
     ・Play版の WebView で動かない window.print / navigator.share は使わない
     ・欄を書きかえても保存した中身は変わらない(コピーする文字だけ) */
  function copyText(api, ta){
    var text = ta.value;
    /* コピーできたら、書きかえた字は手元(クリップボード)にある=戻るボタン(Play版)で確かめない */
    function copied(){ if(typeof api.markSaved === 'function') api.markSaved(); api.toast(api.T('common.exp.copied')); }
    function fallback(){
      var ok = false;
      try{ ta.focus(); ta.select(); if(ta.setSelectionRange) ta.setSelectionRange(0, text.length); ok = !!(document.execCommand && document.execCommand('copy')); }catch(_){ ok = false; }
      if(ok) copied(); else api.toast(api.T('common.exp.copyFail'));
    }
    try{
      if(typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function'){
        navigator.clipboard.writeText(text).then(copied, fallback);
        return;
      }
    }catch(_){}
    fallback();
  }
  function exportText(api, o){
    var ov = api.el('div', 'ov');
    ov.id = 'tebiki-ov';
    ov.appendChild(api.el('div', 'show-head', o.head || ''));
    ov.appendChild(api.el('p', 'note', api.T('common.exp.hint')));
    var ta = api.el('textarea', 'exp-text');
    ta.id = 'tebiki-exp-text';
    ta.setAttribute('dir', 'auto');
    /* 戻るボタン(Play版): 名前などを伏せた書きかえは、戻るで閉じる前に確かめる(やめる=そのまま・OK=× とじる と同じ)。
       押し間違い(端からのスワイプ)で伏せた作業が消えないように(点検 2026-09-29)。コピーしたあとは確かめない */
    ta.rows = 14;
    ta.value = o.text || '';
    ov.appendChild(ta);
    var copy = api.el('button', 'btn primary wide', api.T('common.exp.copy'));
    copy.id = 'tebiki-exp-copy';
    api.Tap.bind(copy, function(){ copyText(api, ta); });
    ov.appendChild(copy);
    var close = api.el('button', 'ov-close', api.T('common.close'));
    close.id = 'tebiki-ov-close';
    api.Tap.bind(close, function(){ ov.remove(); });
    ov.appendChild(close);
    ov._back = function(){ ov.remove(); };   // 戻るボタン(Play版)= とじる と同じ
    document.body.appendChild(ov);
    return ov;
  }
  /* 一覧の下に置く「文字で 書き出す」ボタン */
  function exportBtn(api, id, make){
    var b = api.el('button', 'btn wide exp-btn', api.T('common.exp.btn'));
    b.id = id;
    api.Tap.bind(b, function(){ var o = make(); exportText(api, o); });
    return b;
  }

  window.TEBIKI_PARTS = { TAGS: TAGS, SEP: SEP, uid: uid, fmt: fmt, str: str, num: num, strs: strs, tagName: tagName, toTop: toTop, field: field, chips: chips, tagSelect: tagSelect, overlay: overlay, confirmRow: confirmRow, disarm: disarm, askDiscard: askDiscard, bigBtn: bigBtn, exportText: exportText, exportBtn: exportBtn };
})();
