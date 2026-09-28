'use strict';
/* 画面: 言い方の じてん(data/dict.ja.js・日本語のみ)
   ・部分一致の検索(言い方・言葉どおり・候補の文) + 場面タグ
   ・一覧の語をタップ → その語の3欄(言葉どおり / ありがちな意味の候補 / たしかめ方)
   ・「だいほんを 書く」→ 下書きを保存して script 画面へ */
(function(){
  var query = '';      // 画面を行き来しても検索語は残す(同じ夜に何度も引くため)
  var tag = 'all';
  var openId = null;

  function entries(){ return window.TEBIKI_DICT || []; }
  /* 辞典の中身は日本語: 右から左の言語(ar)でも句読点・かぎかっこが崩れないよう、左から右の日本語として置く */
  function ja(e){ e.setAttribute('lang', 'ja'); e.setAttribute('dir', 'ltr'); return e; }
  function hit(e){
    if(tag !== 'all' && e.tags.indexOf(tag) < 0) return false;
    if(!query) return true;
    var q = query.toLowerCase();
    var hay = [e.w, e.lit].concat(e.maybe).join(' ').toLowerCase();
    return hay.indexOf(q) >= 0;
  }

  function renderList(c, api){
    c.textContent = '';
    window.TEBIKI_PARTS.toTop();
    c.appendChild(api.el('h1', 'scr-title', api.T('screen.dict.title')));
    if(api.lang !== 'ja') c.appendChild(api.el('p', 'note', api.T('screen.dict.jaOnly')));
    var f = window.TEBIKI_PARTS.field(api, { label:api.T('screen.dict.search'), ph:api.T('screen.dict.searchPh'), value:query, id:'dict-q' });
    f.input.addEventListener('input', function(){ query = f.input.value.trim(); drawItems(); });
    c.appendChild(f.wrap);
    c.appendChild(window.TEBIKI_PARTS.chips(api, { all:true, value:tag, onPick:function(t){ tag = t; drawItems(); } }));
    var count = api.el('p', 'hint'); count.id = 'dict-count';
    c.appendChild(count);
    var ul = api.el('ul', 'list'); ul.id = 'dict-list';
    c.appendChild(ul);
    c.appendChild(api.el('p', 'hint', api.T('screen.dict.caution')));

    function drawItems(){
      ul.textContent = '';
      var list = entries().filter(hit);
      count.textContent = api.T('screen.dict.count').replace('{n}', list.length);
      if(!list.length){ ul.appendChild(api.el('li', 'empty', api.T('screen.dict.noHit'))); return; }
      list.forEach(function(e){
        var li = api.el('li', 'tappable');
        li.setAttribute('data-id', e.id);
        var g = api.el('div', 'grow');
        g.appendChild(ja(api.el('div', 'dict-word', e.w)));
        g.appendChild(ja(api.el('div', 'hint', e.lit)));
        li.appendChild(g);
        li.appendChild(api.el('span', 'hint', '›'));
        api.Tap.bind(li, function(){ openId = e.id; renderDetail(c, api, e); });
        ul.appendChild(li);
      });
    }
    drawItems();
  }

  function renderDetail(c, api, e){
    c.textContent = '';
    window.TEBIKI_PARTS.toTop();
    var back = api.el('button', 'btn', '‹ ' + api.T('common.back'));
    back.id = 'dict-back';
    api.Tap.bind(back, function(){ openId = null; renderList(c, api); });
    c.appendChild(back);
    c.appendChild(ja(api.el('h1', 'scr-title dict-head', e.w)));
    var tags = api.el('div', 'chips');
    e.tags.forEach(function(t){ tags.appendChild(api.el('span', 'chip', api.T('common.tags.' + t))); });
    c.appendChild(tags);

    var card = api.el('div', 'card');
    card.appendChild(api.el('div', 'show-label', api.T('screen.dict.lit')));
    card.appendChild(ja(api.el('p', 'dict-text', e.lit)));
    c.appendChild(card);

    var card2 = api.el('div', 'card');
    card2.appendChild(api.el('div', 'show-label', api.T('screen.dict.maybe')));
    var ul = ja(api.el('ul', 'dict-maybe'));
    e.maybe.forEach(function(m){ ul.appendChild(api.el('li', null, m)); });
    card2.appendChild(ul);
    c.appendChild(card2);

    var card3 = api.el('div', 'card tappable');
    card3.appendChild(api.el('div', 'show-label', api.T('screen.dict.ask')));
    card3.appendChild(ja(api.el('p', 'dict-text', e.ask)));
    c.appendChild(card3);

    c.appendChild(api.el('p', 'hint', api.T('screen.dict.caution')));

    var toScript = api.el('button', 'btn wide', api.T('screen.dict.toScript'));
    toScript.id = 'dict-to-script';
    api.Tap.bind(toScript, function(){
      /* 下書きを渡す(画面同士で状態を共有しないので保存を経由する) */
      api.save('draft.script', { tag:e.tags[0], title:api.T('screen.dict.draftTitle').replace('{w}', function(){ return e.w; }), body:api.T('screen.dict.ask') + ': ' + e.ask + '\n' });
      api.go('script');
    });
    c.appendChild(toScript);
  }

  window.SCREENS.register('dict', {
    render: function(c, api){
      var cur = openId ? entries().filter(function(e){ return e.id === openId; })[0] : null;
      if(cur) renderDetail(c, api, cur); else renderList(c, api);
    }
  });
})();
