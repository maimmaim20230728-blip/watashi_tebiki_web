'use strict';
/* 画面: ばめんを えらぶ(じてん・だいほん・言う前の てんけん への入口) */
(function(){
  window.SCREENS.register('bamen', {
    render: function(c, api){
      var P = window.TEBIKI_PARTS;
      c.appendChild(api.el('h1', 'scr-title', api.T('screen.bamen.title')));
      c.appendChild(api.el('p', 'hint', api.T('screen.bamen.hint')));
      c.appendChild(P.bigBtn(api, { id:'bamen-dict', ico:'📖', label:api.T('screen.bamen.dict'), sub:api.T('screen.bamen.dictSub'), onTap:function(){ api.go('dict'); } }));
      c.appendChild(P.bigBtn(api, { id:'bamen-script', ico:'📝', label:api.T('screen.bamen.script'), sub:api.T('screen.bamen.scriptSub'), onTap:function(){ api.go('script'); } }));
      c.appendChild(P.bigBtn(api, { id:'bamen-precheck', ico:'☑', label:api.T('screen.bamen.precheck'), sub:api.T('screen.bamen.precheckSub'), onTap:function(){ api.go('precheck'); } }));
    }
  });
})();
