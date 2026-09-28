'use strict';
/* 画面: じぶんの だいほん(場面タグ + 題 + 本文・CRUD)
   ・「わたしのルール集」は台本の1章(タグ rule)
   ・保存キー tebiki.scripts.v1 = [{ id, tag, title, body, updated }]
   ・dict 画面からの下書き = tebiki.draft.script(読んだら消す) */
(function(){
  var KEY = 'scripts.v1';
  var TAGS_ALL = ['work','school','hospital','shop','family','phone','rule'];
  var filter = 'all';
  var mode = 'list';     // list / form / detail
  var cur = null;        // 編集中・表示中の1件

  function load(api){ var v = api.load(KEY, []); return Array.isArray(v) ? v : []; }
  function store(api, list){ if(!api.save(KEY, list)){ api.toast(api.T('common.storageFull')); return false; } return true; }

  function renderList(c, api){
    mode = 'list'; cur = null;
    c.textContent = '';
    c.appendChild(api.el('h1', 'scr-title', api.T('screen.script.title')));
    c.appendChild(api.el('p', 'hint', api.T('screen.script.hint')));
    var add = api.el('button', 'btn primary wide', '＋ ' + api.T('screen.script.add'));
    add.id = 'script-add';
    api.Tap.bind(add, function(){ renderForm(c, api, null); });
    c.appendChild(add);
    c.appendChild(window.TEBIKI_PARTS.chips(api, { all:true, tags:TAGS_ALL, value:filter, onPick:function(t){ filter = t; draw(); } }));
    var ul = api.el('ul', 'list'); ul.id = 'script-list';
    c.appendChild(ul);
    function draw(){
      ul.textContent = '';
      var list = load(api).filter(function(s){ return filter === 'all' || s.tag === filter; });
      if(!list.length){ ul.appendChild(api.el('li', 'empty', api.T('screen.script.empty'))); return; }
      list.sort(function(a, b){ return b.updated - a.updated; }).forEach(function(s){
        var li = api.el('li', 'tappable');
        li.setAttribute('data-id', s.id);
        var g = api.el('div', 'grow');
        g.appendChild(api.el('div', 'dict-word', s.title));
        g.appendChild(api.el('div', 'hint', api.T('common.tags.' + s.tag) + ' ・ ' + window.TEBIKI_PARTS.fmt(s.updated)));
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
    c.appendChild(api.el('h1', 'scr-title', s ? api.T('screen.script.edit') : api.T('screen.script.add')));
    var tagWrap = api.el('div', 'field');
    tagWrap.appendChild(api.el('label', null, api.T('screen.script.tag')));
    var sel = P.tagSelect(api, { tags:TAGS_ALL, value:s ? s.tag : (filter !== 'all' ? filter : 'work') });
    sel.id = 'script-tag';
    tagWrap.appendChild(sel);
    c.appendChild(tagWrap);
    var fName = P.field(api, { label:api.T('screen.script.name'), ph:api.T('screen.script.namePh'), value:s ? s.title : '', id:'script-name' });
    c.appendChild(fName.wrap);
    var fBody = P.field(api, { label:api.T('screen.script.body'), ph:api.T('screen.script.bodyPh'), value:s ? s.body : '', multi:true, rows:6, id:'script-body' });
    c.appendChild(fBody.wrap);
    c.appendChild(api.el('p', 'hint', api.T('common.optional')));
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
    var back = api.el('button', 'btn', '‹ ' + api.T('common.back')); back.id = 'script-back';
    api.Tap.bind(back, function(){ renderList(c, api); });
    c.appendChild(back);
    c.appendChild(api.el('h1', 'scr-title', s.title));
    c.appendChild(api.el('p', 'hint', api.T('common.tags.' + s.tag) + ' ・ ' + P.fmt(s.updated)));
    var card = api.el('div', 'card');
    card.appendChild(api.el('p', 'pre dict-text', s.body || ''));
    c.appendChild(card);
    var row = api.el('div', 'btn-row');
    var show = api.el('button', 'btn primary', api.T('screen.script.show')); show.id = 'script-show';
    api.Tap.bind(show, function(){ P.overlay(api, { head:s.title, blocks:[{ label:api.T('common.tags.' + s.tag), value:s.body || '' }] }); });
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
      var draft = api.load('draft.script', null);
      if(draft && typeof draft === 'object'){
        api.remove('draft.script');
        renderForm(c, api, null);
        var sel = c.querySelector('#script-tag'), nm = c.querySelector('#script-name'), bd = c.querySelector('#script-body');
        if(sel && TAGS_ALL.indexOf(draft.tag) >= 0) sel.value = draft.tag;
        if(nm) nm.value = draft.title || '';
        if(bd) bd.value = draft.body || '';
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
