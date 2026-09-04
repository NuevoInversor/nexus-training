(() => {
  const PILATES_SVG=`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="7.3" cy="6" r="1.6"/>
    <path d="M8.5 8.2c1.1 1 1.8 2.3 2.1 3.8"/>
    <path d="M9.1 9.6c2 .9 4.2.5 6.3-.7"/>
    <path d="M15.4 8.9l2.2-1.2"/>
    <path d="M10.5 12.1c.9 1.7 2 2.8 3.6 3.6"/>
    <path d="M14.1 15.7l5-7.1"/>
    <path d="M14 15.8l5.9-2.1"/>
    <path d="M6.2 18.7c1.2-2.3 2.5-3.7 4.1-4.5"/>
    <path d="M5 19h14"/>
  </svg>`;

  function ensureStyle(){
    if(document.getElementById('nexusUiHotfixV250Style')) return;
    const s=document.createElement('style');
    s.id='nexusUiHotfixV250Style';
    s.textContent=`
      .activity-chip.pilates{background:#ede9fe!important;color:#7c3aed!important}
      .history-badge.pilates{background:#f5f3ff!important;color:#6d28d9!important}
      .activity-chip.elliptical{background:#dcfce7!important;color:#166534!important}
    `;
    document.head.appendChild(s);
  }

  function installIcons(){
    ensureStyle();
    let changed=false;

    if(typeof window.svgIcon==='function' && !window.svgIcon.__pilatesV250){
      const original=window.svgIcon;
      const wrapped=function(name){
        if(String(name||'').toLowerCase()==='pilates') return PILATES_SVG;
        return original.apply(this,arguments);
      };
      wrapped.__pilatesV250=true;
      window.svgIcon=wrapped;
      changed=true;
    }

    if(typeof window.getActivityVisual==='function' && !window.getActivityVisual.__pilatesV250){
      const original=window.getActivityVisual;
      const wrapped=function(type){
        const t=String(type||'').trim().toLowerCase();
        if(t==='pilates' || t==='pilates_class' || t==='pilates class') return {icon:'pilates',cls:'pilates',label:'Pilates'};
        if(t==='elliptical') return {icon:'elliptical',cls:'elliptical',label:'Elíptica'};
        return original.apply(this,arguments);
      };
      wrapped.__pilatesV250=true;
      window.getActivityVisual=wrapped;
      changed=true;
    }

    if(changed){
      try{window.renderHistory?.();}catch(_){}
      try{window.renderHome?.();}catch(_){}
    }

    return typeof window.svgIcon==='function' && typeof window.getActivityVisual==='function';
  }

  ensureStyle();
  installIcons();
  let tries=0;
  const timer=setInterval(()=>{
    if(installIcons() && ++tries>=6) clearInterval(timer);
    else if(++tries>=40) clearInterval(timer);
  },250);

  window.addEventListener('focus',()=>setTimeout(installIcons,50));
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible') setTimeout(installIcons,50);
  });
  window.addEventListener('nexus:polar-synced',()=>setTimeout(installIcons,100));
})();