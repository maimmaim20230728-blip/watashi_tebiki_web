'use strict';
/* 画面: ホーム
   ・大ボタン2つ「ばめんを えらぶ」「あとで 書く」+ 小さく「いま電話」
   ・文言は api.T('screen.home.*')。操作は api.Tap.bind(click禁止)。画面遷移は api.go('<id>') */
(function(){
  window.SCREENS.register('home', {
    render: function(c, api){
      var P = window.TEBIKI_PARTS;
      c.appendChild(api.el('h1', 'scr-title', api.T('screen.home.title')));
      c.appendChild(api.el('p', 'tagline', api.T('app.tagline')));
      c.appendChild(P.bigBtn(api, { id:'home-bamen', cls:'primary', ico:'📖', label:api.T('screen.home.bamen'), sub:api.T('screen.home.bamenSub'), onTap:function(){ api.go('bamen'); } }));
      c.appendChild(P.bigBtn(api, { id:'home-after', ico:'✎', label:api.T('screen.home.after'), sub:api.T('screen.home.afterSub'), onTap:function(){ api.go('after'); } }));
      var call = api.el('button', 'btn wide');
      call.id = 'home-call';
      call.appendChild(api.el('span', null, '☎ ' + api.T('screen.home.call')));
      api.Tap.bind(call, function(){ api.go('call'); });
      c.appendChild(call);
      c.appendChild(api.el('p', 'hint', api.T('screen.home.callSub')));
      c.appendChild(api.el('p', 'note', api.T('screen.home.note')));
    }
  });
})();
