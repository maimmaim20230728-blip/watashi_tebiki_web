'use strict';
/* 画面共通の小さな部品(このアプリ固有。シェル app.js は触らない)
   ・window.TEBIKI_PARTS = { TAGS, uid, fmt, field, chips, tagSelect, overlay, confirmRow, bigBtn }
   ・各画面は render のときに参照する(読み込み順に依存しない)
   ・操作は全部 api.Tap.bind。select と input/textarea の入力だけネイティブイベント */
(function(){
  var TAGS = ['work','school','hospital','shop','family','phone'];

  function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function pad(n){ return (n < 10 ? '0' : '') + n; }
  function fmt(ts){
    var d = new Date(ts || Date.now());
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

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
    document.body.appendChild(ov);
    return ov;
  }

  /* 二段階の「けす」: 1回目で「ほんとうに?」+ はい/いいえ を出す(window.confirm は使わない) */
  function confirmRow(api, o){
    var row = api.el('div', 'btn-row');
    var del = api.el('button', 'btn danger', api.T('common.del'));
    del.id = o.id || 'btn-del';
    api.Tap.bind(del, function(){
      row.textContent = '';
      row.appendChild(api.el('span', 'hint', api.T('common.delConfirm')));
      var yes = api.el('button', 'btn danger', api.T('common.yes'));
      yes.id = (o.id || 'btn-del') + '-yes';
      var no = api.el('button', 'btn', api.T('common.no'));
      api.Tap.bind(yes, function(){ if(o.onYes) o.onYes(); });
      api.Tap.bind(no, function(){ row.textContent = ''; row.appendChild(del); });
      row.appendChild(yes); row.appendChild(no);
    });
    row.appendChild(del);
    return row;
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

  window.TEBIKI_PARTS = { TAGS: TAGS, uid: uid, fmt: fmt, field: field, chips: chips, tagSelect: tagSelect, overlay: overlay, confirmRow: confirmRow, bigBtn: bigBtn };
})();
