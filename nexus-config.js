window.NEXUS_CLOUD = {
  url: 'https://ecfxzsddqgnbkgjrwpri.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7',
  publishableKey: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7'
};

(() => {
  const VERSION='v2.51';
  const STAMP='04/09/2026 12:28:00';
  const VERSION_TEXT=`Training - ${VERSION} (${STAMP})`;

  const setVersion=()=>{
    const el=document.querySelector('.version');
    if(el && el.textContent!==VERSION_TEXT) el.textContent=VERSION_TEXT;
    if(document.title!==`Nexus Training ${VERSION}`) document.title=`Nexus Training ${VERSION}`;
  };

  const installVersionLock=()=>{
    setVersion();
    const el=document.querySelector('.version');
    if(!el || el.__nexusVersionLockV251) return;
    el.__nexusVersionLockV251=true;
    const obs=new MutationObserver(()=>setVersion());
    obs.observe(el,{childList:true,characterData:true,subtree:true});
  };

  function load(src,attr,value,next){
    if(document.querySelector(`script[${attr}]`)){
      next?.();
      return;
    }
    const s=document.createElement('script');
    s.src=src;
    s.setAttribute(attr,value);
    s.async=false;
    s.onload=()=>next?.();
    s.onerror=()=>next?.();
    document.head.appendChild(s);
  }

  const loadUiHotfix=()=>load('ui-hotfix-v250.js?v=2.51','data-nexus-ui-hotfix','v2.51');
  const loadCardioPersistence=()=>load('cardio-persistence-v245.js?v=2.51','data-nexus-cardio-persistence','v2.51');
  const loadWorkoutCompletion=()=>load('workout-completion-v244.js?v=2.51','data-nexus-workout-completion','v2.51',loadCardioPersistence);
  const loadHomeDashboard=()=>load('home-dashboard-v227.js?v=2.51','data-nexus-home-dashboard','v2.51',loadWorkoutCompletion);
  const loadPolarIntelligence=()=>load('polar-intelligence-v222.js?v=2.51','data-nexus-polar-intelligence','v2.51',loadHomeDashboard);
  const loadHomeMesocycle=()=>load('home-mesocycle-v221.js?v=2.51','data-nexus-home-mesocycle','v2.51',loadPolarIntelligence);
  const loadPlanEditor=()=>load('plan-editor-v220.js?v=2.51','data-nexus-plan-editor','v2.51',loadHomeMesocycle);
  const loadPolar=()=>load('polar-v218.js?v=2.51','data-nexus-polar','v2.51',loadPlanEditor);
  const loadProfileCardioAccess=()=>load('profile-cardio-access-v217.js?v=2.51','data-nexus-profile-cardio-access','v2.51',loadPolar);

  const loadAnaPlan=()=>load('ana-plan-v216.js?v=2.51','data-nexus-ana-plan','v2.51');
  const loadCardioReport=()=>load('cardio-report-v215.js?v=2.51','data-nexus-cardio-report','v2.51');

  const loadDavidCardio=()=>{
    const after=()=>{loadCardioReport();loadAnaPlan();loadProfileCardioAccess();};
    load('cardio-david-v214.js?v=2.51','data-nexus-david-cardio','v2.51',after);
  };
  const loadDavidMesocycle=()=>load('mesocycle-david-v213.js?v=2.51','data-nexus-david-mesocycle','v2.51',loadDavidCardio);
  const loadWorkoutControls=()=>load('workout-controls-v212.js?v=2.51','data-nexus-workout-controls','v2.51',loadDavidMesocycle);

  const loadProfileUI=()=>{
    if(document.querySelector('script[data-nexus-profile-ui]')){loadWorkoutControls();return;}
    const NativeMutationObserver=window.MutationObserver;
    if(NativeMutationObserver){
      window.MutationObserver=class NexusOneShotObserver{
        constructor(){} observe(){} disconnect(){} takeRecords(){return[];}
      };
    }
    const finish=()=>{
      if(NativeMutationObserver) window.MutationObserver=NativeMutationObserver;
      loadWorkoutControls();
    };
    const s=document.createElement('script');
    s.src='profile-ui-v211.js?v=2.51';
    s.dataset.nexusProfileUi='v2.51';
    s.async=false;
    s.onload=finish;
    s.onerror=finish;
    document.head.appendChild(s);
  };

  const boot=()=>{
    installVersionLock();
    loadUiHotfix();
    loadWorkoutCompletion();
    loadProfileUI();
    let n=0;
    const fast=setInterval(()=>{
      installVersionLock();
      if(++n>=20) clearInterval(fast);
    },50);
  };

  setVersion();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();