window.NEXUS_CLOUD = {
  url: 'https://ecfxzsddqgnbkgjrwpri.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7',
  publishableKey: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7'
};

(() => {
  const VERSION='v2.79';
  const STAMP='08/10/2026 21:16:00';
  const VERSION_TEXT=`Training - ${VERSION} (${STAMP})`;

  function setVersion(){
    const el=document.querySelector('.version');
    if(el) el.textContent=VERSION_TEXT;
    document.title=`Nexus Training ${VERSION}`;
  }

  function load(src,attr,next){
    const existing=document.querySelector(`script[${attr}]`);
    if(existing){ next?.(); return; }
    const s=document.createElement('script');
    s.src=src;
    s.setAttribute(attr,VERSION);
    s.async=false;
    s.onload=()=>next?.();
    s.onerror=()=>next?.();
    document.head.appendChild(s);
  }

  function finalRender(){
    try{
      if(typeof renderAll==='function') renderAll();
      else if(typeof renderHome==='function') renderHome();
    }catch(e){console.warn('Nexus v2.79 final render:',e)}
    setTimeout(()=>{
      try{
        if(typeof renderHome==='function') renderHome();
        window.dispatchEvent(new CustomEvent('nexus:boot-complete'));
      }catch(_){}
    },120);
  }

  function loadProfileUI(next){
    if(document.querySelector('script[data-nexus-profile-ui]')){next?.();return;}
    const NativeMutationObserver=window.MutationObserver;
    if(NativeMutationObserver){
      window.MutationObserver=class NexusNoopObserver276{
        constructor(){} observe(){} disconnect(){} takeRecords(){return[];}
      };
    }
    const finish=()=>{
      if(NativeMutationObserver)window.MutationObserver=NativeMutationObserver;
      next?.();
    };
    const s=document.createElement('script');
    s.src='profile-ui-v211.js?v=2.76';
    s.dataset.nexusProfileUi=VERSION;
    s.async=false;
    s.onload=finish;
    s.onerror=finish;
    document.head.appendChild(s);
  }

  const steps=[
    ['cloud-v276.js?v=2.76','data-nexus-cloud'],
    [null,'__profile_ui__'],
    ['workout-controls-v212.js?v=2.76','data-nexus-workout-controls'],
    ['mesocycle-david-v213.js?v=2.76','data-nexus-david-mesocycle'],
    ['david-progression-v263.js?v=2.76','data-nexus-david-progression'],
    ['david-deload-v266.js?v=2.76','data-nexus-david-deload'],
    ['cardio-david-v214.js?v=2.76','data-nexus-david-cardio'],
    ['david-extra-cardio-v272.js?v=2.76','data-nexus-david-extra-cardio'],
    ['david-extra-strength-v272.js?v=2.76','data-nexus-david-extra-strength'],
    ['cardio-report-v215.js?v=2.76','data-nexus-cardio-report'],
    ['ana-plan-v216.js?v=2.76','data-nexus-ana-plan'],
    ['ana-progression-v260.js?v=2.76','data-nexus-ana-progression'],
    ['profile-cardio-access-v217.js?v=2.76','data-nexus-profile-cardio-access'],
    ['polar-v218.js?v=2.76','data-nexus-polar'],
    ['plan-editor-v220.js?v=2.76','data-nexus-plan-editor'],
    ['home-mesocycle-v221.js?v=2.76','data-nexus-home-mesocycle'],
    ['polar-intelligence-v222.js?v=2.76','data-nexus-polar-intelligence'],
    ['polar-padel-v277.js?v=2.77','data-nexus-polar-padel'],
    ['strength-polar-v253.js?v=2.76','data-nexus-strength-polar'],
    ['home-dashboard-v272.js?v=2.76','data-nexus-home-dashboard'],
    ['david-mesocycle3-v278.js?v=2.78','data-nexus-david-mesocycle3'],
    ['mesocycle3-history-v279.js?v=2.79','data-nexus-mesocycle3-history'],
    ['workout-completion-v244.js?v=2.76','data-nexus-workout-completion'],
    ['cardio-persistence-v245.js?v=2.76','data-nexus-cardio-persistence'],
    ['ui-final-v252.js?v=2.76','data-nexus-ui-final'],
    ['ui-hotfix-v250.js?v=2.76','data-nexus-ui-hotfix'],
    ['profile-active-isolation-v262.js?v=2.76','data-nexus-profile-active-isolation']
  ];

  function runStep(i=0){
    if(i===1){loadProfileUI(()=>runStep(i+1));return;}
    if(i>=steps.length){
      load('runtime-stability-v276.js?v=2.76','data-nexus-runtime-stability',finalRender);
      return;
    }
    const [src,attr]=steps[i];
    load(src,attr,()=>runStep(i+1));
  }

  function boot(){
    setVersion();
    runStep(0);
  }

  setVersion();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();