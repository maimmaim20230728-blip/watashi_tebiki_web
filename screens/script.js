'use strict';
/* 画面: じぶんの だいほん(場面タグ + 題 + 本文・CRUD)
   ・「わたしのルール集」は台本の1章(タグ rule)
   ・保存キー tebiki.scripts.v1 = [{ id, tag, title, body, updated }]
   ・dict 画面からの下書き = tebiki.draft.script(読んだら消す)
   ・書きかけのフォーム = tebiki.draft.scriptForm = { id, tag, title, body }
     (下ナビ・言語切替・再読み込みでも残す。ほぞん / やめる で消す。いま電話の書きかけと同じ考え方)
   ・一覧の下の「文字で 書き出す」= いま絞っている章(タグ)だけを文字にしてコピー */
(function(){
  var KEY = 'scripts.v1';
  var FORM = 'draft.scriptForm';
  var TAGS_ALL = ['work','school','hospital','shop','family','phone','rule'];
  var filter = 'all';
  var mode = 'list';     // list / form / detail
  var cur = null;        // 編集中・表示中の1件

  /* よみこみ(バックアップ由来の欠けた項目でも落ちないよう整える。id の無い項目には付けて保存し直す) */
  function load(api){
    var v = api.load(KEY, []);
    if(!Array.isArray(v)) return [];
    var P = window.TEBIKI_PARTS, fixed = false;
    var list = v.filter(function(s){ return s && typeof s === 'object' && !Array.isArray(s); }).map(function(s){
      if(typeof s.id !== 'string' || !s.id){ s.id = P.uid(); fixed = true; }
      if(TAGS_ALL.indexOf(s.tag) < 0) s.tag = 'work';
      s.title = P.str(s.title); s.body = P.str(s.body); s.updated = P.num(s.updated);
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
  function cleanForm(f){
    return { id:(typeof f.id === 'string') ? f.id : null, tag:(TAGS_ALL.indexOf(f.tag) >= 0) ? f.tag : 'work',
             title:window.TEBIKI_PARTS.str(f.title), body:window.TEBIKI_PARTS.str(f.body) };
  }

  /* 章の書き出し(いま絞っているタグだけ) */
  function exportData(api){
    var P = window.TEBIKI_PARTS;
    var head = api.T('screen.script.title') + (filter !== 'all' ? P.SEP + P.tagName(api, filter) : '');
    var text = shown(api).map(function(s){
      return '■ ' + s.title + '\n' + P.tagName(api, s.tag) + P.SEP + P.fmt(s.updated, api.lang) + (s.body ? '\n' + s.body : '');
    }).join('\n\n');
    return { head:head, text:head + '\n\n' + text };
  }

  function renderList(c, api){
    mode = 'list'; cur = null;
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    P.toTop();
    c.appendChild(api.el('h1', 'scr-title', api.T('screen.script.title')));
    c.appendChild(api.el('p', 'hint', api.T('screen.script.hint')));
    var add = api.el('button', 'btn primary wide', '＋ ' + api.T('screen.script.add'));
    add.id = 'script-add';
    api.Tap.bind(add, function(){ renderForm(c, api, null); });
    c.appendChild(add);
    c.appendChild(P.chips(api, { all:true, tags:TAGS_ALL, value:filter, onPick:function(t){ filter = t; draw(); } }));
    var ul = api.el('ul', 'list'); ul.id = 'script-list';
    c.appendChild(ul);
    var exp = P.exportBtn(api, 'script-export', function(){ return exportData(api); });
    c.appendChild(exp);
    function draw(){
      ul.textContent = '';
      var list = shown(api);
      exp.classList.toggle('hidden', !list.length);
      if(!list.length){
        ul.appendChild(api.el('li', 'empty', filter === 'all' ? api.T('screen.script.empty') : api.T('common.emptyTag').replace('{t}', P.tagName(api, filter))));
        return;
      }
      list.forEach(function(s){
        var li = api.el('li', 'tappable');
        li.setAttribute('data-id', s.id);
        var g = api.el('div', 'grow');
        g.appendChild(api.el('div', 'dict-word', s.title));
        g.appendChild(api.el('div', 'hint', P.tagName(api, s.tag) + P.SEP + P.fmt(s.updated, api.lang)));
        li.appendChild(g);
        li.appendChild(api.el('span', 'hint', '›'));
        api.Tap.bind(li, function(){ renderDetail(c, api, s); });
        ul.appendChild(li);
      });
    }
    draw();
  }

  /* vals = 書きかけ({ tag, title, body })があればそれを入れる */
  function renderForm(c, api, s, vals){
    mode = 'form'; cur = s;
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    P.toTop();
    c.appendChild(api.el('h1', 'scr-title', s ? api.T('screen.script.edit') : api.T('screen.script.add')));
    var tagWrap = api.el('div', 'field');
    tagWrap.appendChild(api.el('label', null, api.T('screen.script.tag')));
    var sel = P.tagSelect(api, { tags:TAGS_ALL, value:vals ? vals.tag : (s ? s.tag : (filter !== 'all' ? filter : 'work')) });
    sel.id = 'script-tag';
    tagWrap.appendChild(sel);
    c.appendChild(tagWrap);
    var fName = P.field(api, { label:api.T('screen.script.name'), ph:api.T('screen.script.namePh'), value:vals ? vals.title : (s ? s.title : ''), id:'script-name' });
    c.appendChild(fName.wrap);
    var fBody = P.field(api, { label:api.T('screen.script.body'), ph:api.T('screen.script.bodyPh'), value:vals ? vals.body : (s ? s.body : ''), multi:true, rows:6, id:'script-body' });
    c.appendChild(fBody.wrap);
    c.appendChild(api.el('p', 'hint', api.T('common.optional')));
    /* 書きかけを残す(開いた時点と、書くたび・ばめんを変えるたび)
       ・あたらしく書くフォームで まだ何も書いていないときは残さない(離れて戻ったら一覧を見せる) */
    function keep(){
      if(!s && !fName.input.value && !fBody.input.value){ api.remove(FORM); return; }
      api.save(FORM, { id:s ? s.id : null, tag:sel.value, title:fName.input.value, body:fBody.input.value });
    }
    fName.input.addEventListener('input', keep);
    fBody.input.addEventListener('input', keep);
    sel.addEventListener('change', keep);
    keep();
    var row = api.el('div', 'btn-row');
    var save = api.el('button', 'btn primary', api.T('common.save')); save.id = 'script-save';
    var cancel = api.el('button', 'btn', api.T('common.cancel')); cancel.id = 'script-cancel';
    api.Tap.bind(save, function(){
      var title = fName.input.value.trim();
      if(!title){ api.toast(api.T('screen.script.needName')); return; }
      var list = load(api);
      var item = s ? list.filter(function(x){ return x.id === s.id; })[0] : null;
      if(!item){ item = { id:P.uid() }; list.push(item); }
      item.tag = sel.value; item.title = title; item.body = fBody.input.value; item.updated = Date.now();
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
    var back = api.el('button', 'btn', '‹ ' + api.T('common.back')); back.id = 'script-back';
    api.Tap.bind(back, function(){ renderList(c, api); });
    c.appendChild(back);
    c.appendChild(api.el('h1', 'scr-title', s.title));
    c.appendChild(api.el('p', 'hint', P.tagName(api, s.tag) + P.SEP + P.fmt(s.updated, api.lang)));
    var card = api.el('div', 'card');
    card.appendChild(api.el('p', 'pre dict-text', s.body || ''));
    c.appendChild(card);
    var row = api.el('div', 'btn-row');
    var show = api.el('button', 'btn primary', api.T('screen.script.show')); show.id = 'script-show';
    api.Tap.bind(show, function(){ P.overlay(api, { head:s.title, blocks:[{ label:P.tagName(api, s.tag), value:s.body || '' }] }); });
    var edit = api.el('button', 'btn', api.T('common.edit')); edit.id = 'script-edit';
    api.Tap.bind(edit, function(){ renderForm(c, api, s); });
    row.appendChild(show); row.appendChild(edit);
    c.appendChild(row);
    c.appendChild(P.confirmRow(api, { id:'script-del', onYes:function(){
      store(api, load(api).filter(function(x){ return x.id !== s.id; }));
      api.toast(api.T('common.deleted'));
      renderList(c, api);
    } }));
  }

  window.SCREENS.register('script', {
    render: function(c, api){
      /* 辞典からの下書き(読んだら消して、書きかけとして持ち直す) */
      var draft = api.load('draft.script', null);
      if(draft && typeof draft === 'object'){
        api.remove('draft.script');
        renderForm(c, api, null, cleanForm(draft));
        return;
      }
      /* 書きかけのフォーム(下ナビ・言語切替・再読み込みのあとも同じ中身で開く) */
      var form = api.load(FORM, null);
      if(form && typeof form === 'object' && !Array.isArray(form)){
        var f = cleanForm(form);
        var s = f.id ? (load(api).filter(function(x){ return x.id === f.id; })[0] || null) : null;
        renderForm(c, api, s, f);
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
