'use strict';
/* 画面: あとで 書く(失敗と つぎ)= 何があった → あとで気づいた → 次に試す → 頼めること の4段(CRUD・場面タグで一覧)
   ・保存キー tebiki.after.v1 = [{ id, tag, f:[4], updated }]
   ・責めない。よい・わるいの欄は置かない。気分の欄も置かない(そよぎノートと混同しない) */
(function(){
  var KEY = 'after.v1';
  var filter = 'all';
  var mode = 'list';
  var cur = null;

  /* よみこみ(バックアップ由来の欠けた項目でも落ちないよう f を4つに整える) */
  function load(api){
    var v = api.load(KEY, []);
    if(!Array.isArray(v)) return [];
    return v.filter(function(s){ return s && typeof s === 'object'; }).map(function(s){
      if(!Array.isArray(s.f)) s.f = [];
      while(s.f.length < 4) s.f.push('');
      return s;
    });
  }
  function store(api, list){ if(!api.save(KEY, list)){ api.toast(api.T('common.storageFull')); return false; } return true; }

  function renderList(c, api){
    mode = 'list'; cur = null;
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    c.appendChild(api.el('h1', 'scr-title', api.T('screen.after.title')));
    c.appendChild(api.el('p', 'hint', api.T('screen.after.hint')));
    var add = api.el('button', 'btn primary wide', '＋ ' + api.T('screen.after.add')); add.id = 'after-add';
    api.Tap.bind(add, function(){ renderForm(c, api, null); });
    c.appendChild(add);
    c.appendChild(P.chips(api, { all:true, value:filter, onPick:function(t){ filter = t; draw(); } }));
    var ul = api.el('ul', 'list'); ul.id = 'after-list';
    c.appendChild(ul);
    c.appendChild(api.el('p', 'hint', api.T('screen.after.exportHint')));
    function draw(){
      ul.textContent = '';
      var list = load(api).filter(function(s){ return filter === 'all' || s.tag === filter; });
      if(!list.length){ ul.appendChild(api.el('li', 'empty', api.T('screen.after.empty'))); return; }
      list.sort(function(a, b){ return b.updated - a.updated; }).forEach(function(s){
        var li = api.el('li', 'tappable');
        li.setAttribute('data-id', s.id);
        var g = api.el('div', 'grow');
        g.appendChild(api.el('div', 'dict-word', s.f[0]));
        g.appendChild(api.el('div', 'hint', api.T('common.tags.' + s.tag) + ' ・ ' + P.fmt(s.updated) + (s.f[2] ? ' ・ ' + api.T('screen.after.f')[2] + ': ' + s.f[2] : '')));
        li.appendChild(g);
        li.appendChild(api.el('span', 'hint', '›'));
        api.Tap.bind(li, function(){ renderDetail(c, api, s); });
        ul.appendChild(li);
      });
    }
    draw();
  }

  function renderForm(c, api, s){
    mode = 'form'; cur = s;
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    c.appendChild(api.el('h1', 'scr-title', s ? api.T('screen.after.edit') : api.T('screen.after.add')));
    var tagWrap = api.el('div', 'field');
    tagWrap.appendChild(api.el('label', null, api.T('screen.after.tag')));
    var sel = P.tagSelect(api, { value:s ? s.tag : (filter !== 'all' ? filter : 'work') }); sel.id = 'after-tag';
    tagWrap.appendChild(sel);
    c.appendChild(tagWrap);
    var labels = api.T('screen.after.f'), phs = api.T('screen.after.fPh'), hints = api.T('screen.after.fHint');
    var inputs = [];
    for(var i = 0; i < 4; i++){
      var f = P.field(api, { label:(i + 1) + '. ' + labels[i], ph:phs[i], hint:hints[i], value:s ? s.f[i] : '', multi:true, rows:2, id:'after-f' + i });
      inputs.push(f.input);
      c.appendChild(f.wrap);
    }
    c.appendChild(api.el('p', 'hint', api.T('common.optional')));
    var row = api.el('div', 'btn-row');
    var save = api.el('button', 'btn primary', api.T('common.save')); save.id = 'after-save';
    var cancel = api.el('button', 'btn', api.T('common.cancel')); cancel.id = 'after-cancel';
    api.Tap.bind(save, function(){
      var vals = inputs.map(function(x){ return x.value.trim(); });
      if(!vals[0]){ api.toast(api.T('screen.after.needWhat')); return; }
      var list = load(api);
      var item = s ? list.filter(function(x){ return x.id === s.id; })[0] : null;
      if(!item){ item = { id:P.uid() }; list.push(item); }
      item.tag = sel.value; item.f = vals; item.updated = Date.now();
      if(store(api, list)){ api.toast(api.T('common.saved')); renderDetail(c, api, item); }
    });
    api.Tap.bind(cancel, function(){ if(s) renderDetail(c, api, s); else renderList(c, api); });
    row.appendChild(save); row.appendChild(cancel);
    c.appendChild(row);
  }

  function renderDetail(c, api, s){
    mode = 'detail'; cur = s;
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    var back = api.el('button', 'btn', '‹ ' + api.T('common.back')); back.id = 'after-back';
    api.Tap.bind(back, function(){ renderList(c, api); });
    c.appendChild(back);
    c.appendChild(api.el('p', 'hint', api.T('common.tags.' + s.tag) + ' ・ ' + P.fmt(s.updated)));
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
    api.Tap.bind(show, function(){ P.overlay(api, { head:api.T('common.tags.' + s.tag), blocks:blocks }); });
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
      if(mode === 'detail' && cur){
        var still = load(api).filter(function(x){ return x.id === cur.id; })[0];
        if(still){ renderDetail(c, api, still); return; }
      }
      renderList(c, api);
    }
  });
})();
