'use strict';
/* 画面: あとで 書く(失敗と つぎ)= 何があった → あとで気づいた → 次に試す → 頼めること の4段(CRUD・場面タグで一覧)
   ・保存キー tebiki.after.v1 = [{ id, tag, f:[4], updated }]
   ・書きかけのフォーム = tebiki.draft.afterForm = { id, tag, f:[4] }(下ナビ・言語切替・再読み込みでも残す。ほぞん / やめる で消す)
   ・一覧の下の「文字で 書き出す」= いま絞っている場面だけを文字にしてコピー(他の人の情報を伏せる案内つき)
   ・責めない。よい・わるいの欄は置かない。気分の欄も置かない(そよぎノートと混同しない) */
(function(){
  var KEY = 'after.v1';
  var FORM = 'draft.afterForm';
  var filter = 'all';
  var mode = 'list';
  var cur = null;

  /* よみこみ(バックアップ由来の欠けた項目でも落ちないよう整える。id の無い項目には付けて保存し直す) */
  function load(api){
    var v = api.load(KEY, []);
    if(!Array.isArray(v)) return [];
    var P = window.TEBIKI_PARTS, fixed = false;
    var list = v.filter(function(s){ return s && typeof s === 'object' && !Array.isArray(s); }).map(function(s){
      if(typeof s.id !== 'string' || !s.id){ s.id = P.uid(); fixed = true; }
      if(P.TAGS.indexOf(s.tag) < 0) s.tag = 'work';
      s.f = P.strs(s.f, 4);
      s.updated = P.num(s.updated);
      return s;
    });
    if(fixed) api.save(KEY, list);
    return list;
  }
  function store(api, list){ if(!api.save(KEY, list)){ api.toast(api.T('common.storageFull')); return false; } return true; }
  function shown(api){
    return load(api).filter(function(s){ return filter === 'all' || s.tag === filter; })
      .sort(function(a, b){ return b.updated - a.updated; });
  }

  /* 章の書き出し(いま絞っている場面だけ・空の段は省く) */
  function exportData(api){
    var P = window.TEBIKI_PARTS;
    var labels = api.T('screen.after.f');
    var head = api.T('screen.after.title') + (filter !== 'all' ? P.SEP + P.tagName(api, filter) : '');
    var text = shown(api).map(function(s){
      var lines = ['■ ' + P.tagName(api, s.tag) + P.SEP + P.fmt(s.updated, api.lang)];
      for(var i = 0; i < 4; i++) if(s.f[i]) lines.push(labels[i] + ':\n' + s.f[i]);
      return lines.join('\n');
    }).join('\n\n');
    return { head:head, text:head + '\n\n' + text };
  }

  function renderList(c, api){
    mode = 'list'; cur = null;
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    P.toTop();
    c.appendChild(api.el('h1', 'scr-title', api.T('screen.after.title')));
    c.appendChild(api.el('p', 'hint', api.T('screen.after.hint')));
    var add = api.el('button', 'btn primary wide', '＋ ' + api.T('screen.after.add')); add.id = 'after-add';
    api.Tap.bind(add, function(){ renderForm(c, api, null); });
    c.appendChild(add);
    c.appendChild(P.chips(api, { all:true, value:filter, onPick:function(t){ filter = t; draw(); } }));
    var ul = api.el('ul', 'list'); ul.id = 'after-list';
    c.appendChild(ul);
    var exp = P.exportBtn(api, 'after-export', function(){ return exportData(api); });
    c.appendChild(exp);
    var expHint = api.el('p', 'hint', api.T('screen.after.exportHint'));
    c.appendChild(expHint);
    function draw(){
      ul.textContent = '';
      var list = shown(api);
      exp.classList.toggle('hidden', !list.length);
      expHint.classList.toggle('hidden', !list.length);
      if(!list.length){
        ul.appendChild(api.el('li', 'empty', filter === 'all' ? api.T('screen.after.empty') : api.T('common.emptyTag').replace('{t}', P.tagName(api, filter))));
        return;
      }
      list.forEach(function(s){
        var li = api.el('li', 'tappable');
        li.setAttribute('data-id', s.id);
        var g = api.el('div', 'grow');
        g.appendChild(api.el('div', 'dict-word', s.f[0]));
        g.appendChild(api.el('div', 'hint', P.tagName(api, s.tag) + P.SEP + P.fmt(s.updated, api.lang) + (s.f[2] ? P.SEP + api.T('screen.after.f')[2] + ': ' + s.f[2] : '')));
        li.appendChild(g);
        li.appendChild(api.el('span', 'hint', '›'));
        api.Tap.bind(li, function(){ renderDetail(c, api, s); });
        ul.appendChild(li);
      });
    }
    draw();
  }

  /* vals = 書きかけ({ tag, f:[4] })があればそれを入れる */
  function renderForm(c, api, s, vals){
    mode = 'form'; cur = s;
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    P.toTop();
    c.appendChild(api.el('h1', 'scr-title', s ? api.T('screen.after.edit') : api.T('screen.after.add')));
    var tagWrap = api.el('div', 'field');
    tagWrap.appendChild(api.el('label', null, api.T('screen.after.tag')));
    var sel = P.tagSelect(api, { value:vals ? vals.tag : (s ? s.tag : (filter !== 'all' ? filter : 'work')) }); sel.id = 'after-tag';
    tagWrap.appendChild(sel);
    c.appendChild(tagWrap);
    var labels = api.T('screen.after.f'), phs = api.T('screen.after.fPh'), hints = api.T('screen.after.fHint');
    var inputs = [];
    /* 書きかけを残す。あたらしく書くフォームで まだ何も書いていないときは残さない(離れて戻ったら一覧を見せる) */
    function keep(){
      var fv = inputs.map(function(x){ return x.value; });
      if(!s && !fv.some(function(x){ return x; })){ api.remove(FORM); return; }
      api.save(FORM, { id:s ? s.id : null, tag:sel.value, f:fv });
    }
    for(var i = 0; i < 4; i++){
      var f = P.field(api, { label:(i + 1) + '. ' + labels[i], ph:phs[i], hint:hints[i], value:vals ? vals.f[i] : (s ? s.f[i] : ''), multi:true, rows:2, id:'after-f' + i });
      inputs.push(f.input);
      f.input.addEventListener('input', keep);
      c.appendChild(f.wrap);
    }
    sel.addEventListener('change', keep);
    keep();
    c.appendChild(api.el('p', 'hint', api.T('common.optional')));
    var row = api.el('div', 'btn-row');
    var save = api.el('button', 'btn primary', api.T('common.save')); save.id = 'after-save';
    var cancel = api.el('button', 'btn', api.T('common.cancel')); cancel.id = 'after-cancel';
    api.Tap.bind(save, function(){
      var vals2 = inputs.map(function(x){ return x.value.trim(); });
      if(!vals2[0]){ api.toast(api.T('screen.after.needWhat')); return; }
      var list = load(api);
      var item = s ? list.filter(function(x){ return x.id === s.id; })[0] : null;
      if(!item){ item = { id:P.uid() }; list.push(item); }
      item.tag = sel.value; item.f = vals2; item.updated = Date.now();
      if(store(api, list)){ api.remove(FORM); api.toast(api.T('common.saved')); renderDetail(c, api, item); }
    });
    api.Tap.bind(cancel, function(){ api.remove(FORM); if(s) renderDetail(c, api, s); else renderList(c, api); });
    row.appendChild(save); row.appendChild(cancel);
    c.appendChild(row);
  }

  function renderDetail(c, api, s){
    mode = 'detail'; cur = s;
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    P.toTop();
    var back = api.el('button', 'btn', '‹ ' + api.T('common.back')); back.id = 'after-back';
    api.Tap.bind(back, function(){ renderList(c, api); });
    c.appendChild(back);
    c.appendChild(api.el('p', 'hint', P.tagName(api, s.tag) + P.SEP + P.fmt(s.updated, api.lang)));
    var labels = api.T('screen.after.f');
    var blocks = [];
    for(var i = 0; i < 4; i++){
      var card = api.el('div', 'card' + (i === 2 ? ' tappable' : ''));
      card.appendChild(api.el('div', 'show-label', (i + 1) + '. ' + labels[i]));
      card.appendChild(api.el('p', 'pre dict-text', s.f[i] || api.T('screen.after.none')));
      c.appendChild(card);
      blocks.push({ label:(i + 1) + '. ' + labels[i], value:s.f[i] });
    }
    var row = api.el('div', 'btn-row');
    var show = api.el('button', 'btn primary', api.T('screen.after.show')); show.id = 'after-show';
    api.Tap.bind(show, function(){ P.overlay(api, { head:P.tagName(api, s.tag), blocks:blocks }); });
    var edit = api.el('button', 'btn', api.T('common.edit')); edit.id = 'after-edit';
    api.Tap.bind(edit, function(){ renderForm(c, api, s); });
    row.appendChild(show); row.appendChild(edit);
    c.appendChild(row);
    c.appendChild(P.confirmRow(api, { id:'after-del', onYes:function(){
      store(api, load(api).filter(function(x){ return x.id !== s.id; }));
      api.toast(api.T('common.deleted'));
      renderList(c, api);
    } }));
  }

  window.SCREENS.register('after', {
    render: function(c, api){
      /* 書きかけのフォーム(下ナビ・言語切替・再読み込みのあとも同じ中身で開く) */
      var form = api.load(FORM, null);
      if(form && typeof form === 'object' && !Array.isArray(form)){
        var P = window.TEBIKI_PARTS;
        var fv = { tag:(P.TAGS.indexOf(form.tag) >= 0) ? form.tag : 'work', f:P.strs(form.f, 4) };
        var id = (typeof form.id === 'string') ? form.id : null;
        var s = id ? (load(api).filter(function(x){ return x.id === id; })[0] || null) : null;
        renderForm(c, api, s, fv);
        return;
      }
      if(mode === 'detail' && cur){
        var still = load(api).filter(function(x){ return x.id === cur.id; })[0];
        if(still){ renderDetail(c, api, still); return; }
      }
      renderList(c, api);
    }
  });
})();
