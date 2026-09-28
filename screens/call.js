'use strict';
/* 画面: いま電話(だれから・ようけん・いつまで・おりかえし先 の4欄・大きな字・直近5件だけ保存)
   ・保存キー tebiki.calls.v1 = [{ id, f:[4], at }](新しい順・5件まで) / 書きかけ = tebiki.call.draft
   ・聞き返しの言い方は、タップで大きく見せる(相手に見せる文なので漢字) */
(function(){
  var KEY = 'calls.v1';
  var DRAFT = 'call.draft';
  var MAX = 5;

  function load(api){ var v = api.load(KEY, []); return Array.isArray(v) ? v : []; }

  window.SCREENS.register('call', {
    render: function(c, api){
      var P = window.TEBIKI_PARTS;
      c.appendChild(api.el('h1', 'scr-title', api.T('screen.call.title')));
      c.appendChild(api.el('p', 'hint', api.T('screen.call.hint')));

      var draft = api.load(DRAFT, null);
      var vals = (draft && Array.isArray(draft.f)) ? draft.f : ['', '', '', ''];
      var labels = api.T('screen.call.f'), phs = api.T('screen.call.fPh');
      var inputs = [];
      for(var i = 0; i < 4; i++){
        var f = P.field(api, { label:labels[i], ph:phs[i], value:vals[i], id:'call-f' + i, cls:'call-input' });
        inputs.push(f.input);
        f.input.addEventListener('input', function(){ api.save(DRAFT, { f:inputs.map(function(x){ return x.value; }) }); });
        c.appendChild(f.wrap);
      }
      function current(){ return inputs.map(function(x){ return x.value.trim(); }); }
      function blocks(fv){ return labels.map(function(l, i){ return { label:l, value:fv[i] }; }); }

      var row = api.el('div', 'btn-row');
      var show = api.el('button', 'btn primary', api.T('screen.call.show')); show.id = 'call-show';
      api.Tap.bind(show, function(){ P.overlay(api, { head:api.T('screen.call.title'), blocks:blocks(current()) }); });
      var save = api.el('button', 'btn primary', api.T('screen.call.save')); save.id = 'call-save';
      api.Tap.bind(save, function(){
        var fv = current();
        if(!fv.some(function(x){ return x; })){ api.toast(api.T('screen.call.needAny')); return; }
        var list = load(api);
        list.unshift({ id:P.uid(), f:fv, at:Date.now() });
        if(list.length > MAX) list.length = MAX;
        if(!api.save(KEY, list)){ api.toast(api.T('common.storageFull')); return; }
        api.remove(DRAFT);
        api.toast(api.T('common.saved'));
        c.textContent = ''; window.SCREENS.get('call').render(c, api);
      });
      var clear = api.el('button', 'btn', api.T('screen.call.clear')); clear.id = 'call-clear';
      api.Tap.bind(clear, function(){ inputs.forEach(function(x){ x.value = ''; }); api.remove(DRAFT); });
      row.appendChild(show); row.appendChild(save); row.appendChild(clear);
      c.appendChild(row);

      /* 聞き返しの言い方(相手に見せる文なので漢字。タップで大きく) */
      c.appendChild(api.el('h2', 'sec-h', api.T('screen.call.askBack')));
      var phrases = api.T('screen.call.askPhrases');
      var pul = api.el('ul', 'list'); pul.id = 'call-phrases';
      phrases.forEach(function(p, i){
        var li = api.el('li', 'tappable');
        li.setAttribute('data-i', String(i));
        li.appendChild(api.el('div', 'grow', p));
        api.Tap.bind(li, function(){ P.overlay(api, { blocks:[{ value:p }] }); });
        pul.appendChild(li);
      });
      c.appendChild(pul);

      /* 直近5件 */
      c.appendChild(api.el('h2', 'sec-h', api.T('screen.call.recent')));
      var ul = api.el('ul', 'list'); ul.id = 'call-recent';
      var list = load(api);
      if(!list.length) ul.appendChild(api.el('li', 'empty', api.T('screen.call.empty')));
      list.forEach(function(h){
        var li = api.el('li', 'tappable');
        li.setAttribute('data-id', h.id);
        var g = api.el('div', 'grow');
        g.appendChild(api.el('div', 'dict-word', (h.f[0] || '') + (h.f[1] ? ' ・ ' + h.f[1] : '')));
        g.appendChild(api.el('div', 'hint', P.fmt(h.at) + (h.f[2] ? ' ・ ' + labels[2] + ': ' + h.f[2] : '')));
        li.appendChild(g);
        li.appendChild(api.el('span', 'hint', '›'));
        api.Tap.bind(li, function(){ P.overlay(api, { head:P.fmt(h.at), blocks:blocks(h.f) }); });
        ul.appendChild(li);
      });
      c.appendChild(ul);
    }
  });
})();
