'use strict';
/* 画面: 言う前の てんけん(4問を順に答えて1画面で見返す・保存は任意)
   ・保存キー tebiki.precheck.v1 = [{ id, say, a:[4], at }](新しい順・30件まで)
   ・点数化・判定はしない。答えは本人が見返すためだけのもの */
(function(){
  var KEY = 'precheck.v1';
  var MAX = 30;
  var step = 0;                 // 0=言うこと / 1〜4=問い / 5=見返し / 6=ほぞん済み一覧の1件
  var say = '';
  var ans = ['', '', '', ''];
  var viewing = null;

  function load(api){ var v = api.load(KEY, []); return Array.isArray(v) ? v : []; }
  function reset(){ step = 0; say = ''; ans = ['', '', '', '']; viewing = null; }

  function renderStart(c, api){
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    c.appendChild(api.el('h1', 'scr-title', api.T('screen.precheck.title')));
    c.appendChild(api.el('p', 'hint', api.T('screen.precheck.hint')));
    var f = P.field(api, { label:api.T('screen.precheck.say'), ph:api.T('screen.precheck.sayPh'), value:say, multi:true, rows:3, id:'pre-say' });
    c.appendChild(f.wrap);
    var start = api.el('button', 'btn primary wide', api.T('screen.precheck.start')); start.id = 'pre-start';
    api.Tap.bind(start, function(){
      say = f.input.value.trim();
      if(!say){ api.toast(api.T('screen.precheck.needSay')); return; }
      step = 1; renderQ(c, api);
    });
    c.appendChild(start);

    var hist = load(api);
    if(hist.length){
      c.appendChild(api.el('h2', 'sec-h', api.T('screen.precheck.history')));
      var ul = api.el('ul', 'list'); ul.id = 'pre-history';
      hist.forEach(function(h){
        var li = api.el('li', 'tappable');
        li.setAttribute('data-id', h.id);
        var g = api.el('div', 'grow');
        g.appendChild(api.el('div', 'dict-word', h.say));
        g.appendChild(api.el('div', 'hint', P.fmt(h.at)));
        li.appendChild(g);
        li.appendChild(api.el('span', 'hint', '›'));
        api.Tap.bind(li, function(){
          viewing = h; say = h.say || '';
          ans = Array.isArray(h.a) ? h.a.slice(0, 4) : [];       // バックアップ由来で欠けていても落ちない
          while(ans.length < 4) ans.push('');
          step = 6; renderReview(c, api);
        });
        ul.appendChild(li);
      });
      c.appendChild(ul);
    }
  }

  function renderQ(c, api){
    var P = window.TEBIKI_PARTS;
    var i = step - 1;
    c.textContent = '';
    c.appendChild(api.el('p', 'hint', api.T('screen.precheck.step').replace('{n}', step)));
    c.appendChild(api.el('p', 'note', '「' + say + '」'));
    c.appendChild(api.el('h1', 'scr-title', api.T('screen.precheck.q')[i]));
    var f = P.field(api, { ph:api.T('screen.precheck.qPh')[i], value:ans[i], multi:true, rows:3, hint:api.T('screen.precheck.qHint')[i], id:'pre-a' + step });
    c.appendChild(f.wrap);
    var row = api.el('div', 'btn-row');
    var prev = api.el('button', 'btn', '‹ ' + api.T('common.prev')); prev.id = 'pre-prev';
    var next = api.el('button', 'btn primary', (step < 4 ? api.T('common.next') : api.T('screen.precheck.review')) + ' ›'); next.id = 'pre-next';
    api.Tap.bind(prev, function(){ ans[i] = f.input.value.trim(); step--; if(step < 1) renderStart(c, api); else renderQ(c, api); });
    api.Tap.bind(next, function(){ ans[i] = f.input.value.trim(); step++; if(step > 4) renderReview(c, api); else renderQ(c, api); });
    row.appendChild(prev); row.appendChild(next);
    c.appendChild(row);
  }

  function renderReview(c, api){
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    c.appendChild(api.el('h1', 'scr-title', api.T('screen.precheck.reviewTitle')));
    c.appendChild(api.el('p', 'hint', api.T('screen.precheck.reviewHint')));
    c.appendChild(api.el('div', 'show-head', say));
    var qs = api.T('screen.precheck.q');
    for(var i = 0; i < 4; i++){
      var blk = api.el('div', 'show-block');
      blk.appendChild(api.el('div', 'show-label', qs[i]));
      blk.appendChild(api.el('div', 'pre-answer pre', ans[i] || api.T('screen.precheck.unanswered')));
      c.appendChild(blk);
    }
    var row = api.el('div', 'btn-row');
    if(viewing){
      var back = api.el('button', 'btn', '‹ ' + api.T('common.back')); back.id = 'pre-back';
      api.Tap.bind(back, function(){ reset(); renderStart(c, api); });
      row.appendChild(back);
      c.appendChild(row);
      c.appendChild(P.confirmRow(api, { id:'pre-del', onYes:function(){
        var id = viewing.id;
        api.save(KEY, load(api).filter(function(x){ return x.id !== id; }));
        api.toast(api.T('common.deleted'));
        reset(); renderStart(c, api);
      } }));
      return;
    }
    var redo = api.el('button', 'btn', api.T('screen.precheck.redo')); redo.id = 'pre-redo';
    api.Tap.bind(redo, function(){ step = 1; renderQ(c, api); });
    var save = api.el('button', 'btn primary', api.T('screen.precheck.saveIt')); save.id = 'pre-save';
    api.Tap.bind(save, function(){
      var list = load(api);
      list.unshift({ id:P.uid(), say:say, a:ans.slice(), at:Date.now() });
      if(list.length > MAX) list.length = MAX;
      if(!api.save(KEY, list)){ api.toast(api.T('common.storageFull')); return; }
      api.toast(api.T('screen.precheck.saved'));
      reset(); renderStart(c, api);
    });
    row.appendChild(redo); row.appendChild(save);
    c.appendChild(row);
    var noSave = api.el('button', 'btn wide', api.T('screen.precheck.noSave')); noSave.id = 'pre-nosave';
    api.Tap.bind(noSave, function(){ reset(); renderStart(c, api); });
    c.appendChild(noSave);
  }

  window.SCREENS.register('precheck', {
    render: function(c, api){
      if(step >= 1 && step <= 4) renderQ(c, api);
      else if(step === 5 || step === 6) renderReview(c, api);
      else renderStart(c, api);
    }
  });
})();
