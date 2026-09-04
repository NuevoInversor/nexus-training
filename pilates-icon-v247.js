(() => {
  const VERSION='v2.47';
  const STAMP='04/09/2026 11:22:00';

  const PILATES_SVG=`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="7.4" cy="6.1" r="1.7"/>
    <path d="M6.1 5.4c-.7.5-1 1.2-.9 2.1"/>
    <path d="M8.4 8.2c1.1 1.1 1.7 2.4 2 3.9"/>
    <path d="M9.1 9.7c2.1.9 4.1.5 6.3-.7"/>
    <path d="M15.4 9l2.1-1.2"/>
    <path d="M10.3 12.1c.8 1.8 2.1 3 3.7 3.6"/>
    <path d="M14 15.7l5-7.1"/>
    <path d="M13.8 15.8l6.1-2.2"/>
    <path d="M5 19h14"/>
    <path d="M6.3 18.8c1.2-2.3 2.4-3.7 4-4.5"/>
  </svg>`;

  function install(){
    if(window.__nexusPilatesIconV247) return;
    window.__nexusPilatesIconV247=true;

    const originalSvg=window.svgIcon;
    if(typeof originalSvg==='function'){
      window.svgIcon=function(name){
        if(name==='pilates') return PILATES_SVG;
        return originalSvg(name);
      };
    }

    const originalVisual=window.getActivityVisual;
    if(typeof originalVisual==='function'){
      window.getActivityVisual=function(type){
        if(String(type||'').toLowerCase()==='pilates') return {icon:'pilates',cls:'pilates',label:'Pilates'};
        return originalVisual(type);
      };
    }

    if(!document.getElementById('nexusPilatesIconV247Style')){
      const style=document.createElement('style');
      style.id='nexusPilatesIconV247Style';
      style.textContent=`
        .activity-chip.pilates{background:#ede9fe;color:#7c3aed}
        .history-badge.pilates{background:#f5f3ff;color:#6d28d9}
      `;
      document.head.appendChild(style);
    }

    try{window.renderHistory?.();}catch(_){}
  }

  function updateVersion(){
    const el=document.querySelector('header .version,.version');
    if(el) el.textContent=`Training - ${VERSION} (${STAMP})`;
  }

  let tries=0;
  const timer=setInterval(()=>{
    install();
    updateVersion();
    if(window.svgIcon && window.getActivityVisual && ++tries>=8) clearInterval(timer);
  },250);
  install();
  updateVersion();
})();
