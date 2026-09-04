(() => {
  const VERSION='v2.54';
  const STAMP='04/09/2026 13:24:00';
  const VERSION_TEXT=`Training - ${VERSION} (${STAMP})`;
  const PILATES_SVG=`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7.3" cy="6" r="1.6"/><path d="M8.5 8.2c1.1 1 1.8 2.3 2.1 3.8"/><path d="M9.1 9.6c2 .9 4.2.5 6.3-.7"/><path d="M15.4 8.9l2.2-1.2"/><path d="M10.5 12.1c.9 1.7 2 2.8 3.6 3.6"/><path d="M14.1 15.7l5-7.1"/><path d="M14 15.8l5.9-2.1"/><path d="M6.2 18.7c1.2-2.3 2.5-3.7 4.1-4.5"/><path d="M5 19h14"/></svg>`;

  function ensureStyle(){
    if(document.getElementById('nexusFinalV252Style')) return;
    const s=document.createElement('style');
    s.id='nexusFinalV252Style';
    s.textContent=`.activity-chip.pilates{background:#ede9fe!important;color:#7c3aed!important}.history-badge.pilates{background:#f5f3ff!important;color:#6d28d9!important}`;
    document.head.appendChild(s);
  }

  function fixVersion(){
    const el=document.querySelector('header .version,.version');
    if(el && el.textContent!==VERSION_TEXT) el.textContent=VERSION_TEXT;
    const title=`Nexus Training ${VERSION}`;
    if(document.title!==title) document.title=title;
  }

  function fixPilatesDom(){
    ensureStyle();
    document.querySelectorAll('button.activity-chip[title="Pilates"],button.activity-chip[aria-label="Pilates"]').forEach(btn=>{
      btn.classList.remove('other','purple');
      btn.classList.add('pilates');
      if(!btn.querySelector('svg[data-nexus-pilates="1"]')){
        btn.innerHTML=PILATES_SVG.replace('<svg ','<svg data-nexus-pilates="1" ');
      }
    });

    const modal=document.getElementById('historyActivityModal');
    const title=document.getElementById('historyActivityTitle')?.textContent||'';
    if(modal && /^Pilates\b/i.test(title)){
      const badge=[...modal.querySelectorAll('.history-meta .history-badge')].find(x=>/Pilates/i.test(x.textContent||''));
      if(badge){
        badge.classList.add('pilates');
        badge.innerHTML=PILATES_SVG.replace('<svg ','<svg data-nexus-pilates="1" ')+' Pilates';
      }
    }
  }

  function patchFunctions(){
    if(typeof window.svgIcon==='function' && !window.svgIcon.__nexusPilates252){
      const original=window.svgIcon;
      const wrapped=function(name){
        if(String(name||'').trim().toLowerCase()==='pilates') return PILATES_SVG;
        return original.apply(this,arguments);
      };
      wrapped.__nexusPilates252=true;
      window.svgIcon=wrapped;
    }

    if(typeof window.getActivityVisual==='function' && !window.getActivityVisual.__nexusPilates252){
      const original=window.getActivityVisual;
      const wrapped=function(type){
        const t=String(type||'').trim().toLowerCase();
        if(t==='pilates'||t==='pilates_class'||t==='pilates class') return {icon:'pilates',cls:'pilates',label:'Pilates'};
        return original.apply(this,arguments);
      };
      wrapped.__nexusPilates252=true;
      window.getActivityVisual=wrapped;
    }
  }

  function apply(){
    fixVersion();
    patchFunctions();
    fixPilatesDom();
  }

  ensureStyle();
  apply();
  let fastCount=0;
  const fast=setInterval(()=>{
    apply();
    if(++fastCount>=50) clearInterval(fast);
  },200);
  setInterval(apply,2000);

  // Install a real DOM observer after profile-ui has restored MutationObserver.
  setTimeout(()=>{
    try{
      const Obs=window.MutationObserver;
      if(!Obs || document.documentElement.__nexusFinalObserver252) return;
      const obs=new Obs(()=>apply());
      obs.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
      document.documentElement.__nexusFinalObserver252=true;
    }catch(_){}
  },2500);

  window.addEventListener('focus',()=>setTimeout(apply,50));
  window.addEventListener('nexus:polar-synced',()=>setTimeout(apply,100));
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(apply,50)});
})();