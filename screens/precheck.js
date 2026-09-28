'use strict';
/* 画面: 言う前の てんけん(4問を順に答えて1画面で見返す・保存は任意)
   ・保存キー tebiki.precheck.v1 = [{ id, say, a:[4], at }](新しい順・30件まで)
   ・書いている途中の「言うこと」と答えは、入力のたびに覚える(下ナビ・言語切替で消えない。同じ起動中だけ)
   ・ほぞんした一覧の下の「文字で 書き出す」= ほぞんした てんけん を文字にしてコピー
   ・点数化・判定はしない。答えは本人が見返すためだけのもの */
(function(){
  var KEY = 'precheck.v1';
  var MAX = 30;
  var step = 0;                 // 0=言うこと / 1〜4=問い / 5=見返し / 6=ほぞん済み一覧の1件
  var say = '';
  var ans = ['', '', '', ''];
  var viewing = null;

  /* よみこみ(バックアップ由来の欠けた項目でも落ちないよう整える。id の無い項目には付けて保存し直す) */
  function load(api){
    var v = api.load(KEY, []);
    if(!Array.isArray(v)) return [];
    var P = window.TEBIKI_PARTS, fixed = false;
    var list = v.filter(function(h){ return h && typeof h === 'object' && !Array.isArray(h); }).map(function(h){
      if(typeof h.id !== 'string' || !h.id){ h.id = P.uid(); fixed = true; }
      h.say = P.str(h.say); h.a = P.strs(h.a, 4); h.at = P.num(h.at);
      return h;
    });
    if(fixed) api.save(KEY, list);
    return list;
  }
  function reset(){ step = 0; say = ''; ans = ['', '', '', '']; viewing = null; }

  /* 章の書き出し(ほぞんした てんけん・空の答えは省く) */
  function exportData(api){
    var P = window.TEBIKI_PARTS;
    var qs = api.T('screen.precheck.q');
    var head = api.T('screen.precheck.title');
    var text = load(api).map(function(h){
      var lines = ['■ ' + h.say, P.fmt(h.at, api.lang)];
      for(var i = 0; i < 4; i++) if(h.a[i]) lines.push(qs[i] + ':\n' + h.a[i]);
      return lines.join('\n');
    }).join('\n\n');
    return { head:head, text:head + '\n\n' + text };
  }

  function renderStart(c, api){
    var P = window.TEBIKI_PARTS;
    c.textContent = '';
    P.toTop();
    c.appendChild(api.el('h1', 'scr-title', api.T('screen.precheck.title')));
    c.appendChild(api.el('p', 'hint', api.T('screen.precheck.hint')));
    var f = P.field(api, { label:api.T('screen.precheck.say'), ph:api.T('screen.precheck.sayPh'), value:say, multi:true, rows:3, id:'pre-say' });
    f.input.addEventListener('input', function(){ say = f.input.value; });
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
        g.appendChild(api.el('div', 'hint', P.fmt(h.at, api.lang)));
        li.appendChild(g);
        li.appendChild(api.el('span', 'hint', '›'));
        api.Tap.bind(li, function(){
          viewing = h; say = h.say;
          ans = h.a.slice(0, 4);
          step = 6; renderReview(c, api);
        });
        ul.appendChild(li);
      });
      c.appendChild(ul);
      c.appendChild(P.exportBtn(api, 'pre-export', function(){ return exportData(api); }));
    }
  }

  function renderQ(c, api){
    var P = window.TEBIKI_PARTS;
    var i = step - 1;
    c.textContent = '';
    P.toTop();
    c.appendChild(api.el('p', 'hint', api.T('screen.precheck.step').replace('{n}', step)));
    c.appendChild(api.el('p', 'note', api.T('screen.precheck.quote').replace('{s}', function(){ return say; })));
    c.appendChild(api.el('h1', 'scr-title', api.T('screen.precheck.q')[i]));
    var f = P.field(api, { ph:api.T('screen.precheck.qPh')[i], value:ans[i], multi:true, rows:3, hint:api.T('screen.precheck.qHint')[i], id:'pre-a' + step });
    f.input.addEventListener('input', function(){ ans[i] = f.input.value; });
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
    P.toTop();
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
      /* 見ていた1件が もう無い(バックアップの よみこみで入れ替わった等)ときは はじめの画面へ(台本・失敗と次と同じ考え方) */
      if(step === 6 && viewing && !load(api).some(function(x){ return x.id === viewing.id; })) reset();
      if(step >= 1 && step <= 4) renderQ(c, api);
      else if(step === 5 || step === 6) renderReview(c, api);
      else renderStart(c, api);
    }
  });
})();
