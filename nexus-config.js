window.NEXUS_CLOUD = {
  url: 'https://ecfxzsddqgnbkgjrwpri.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7',
  publishableKey: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7'
};

(() => {
  const VERSION='v2.64';
  const STAMP='14/09/2026 18:50:00';
  const VERSION_TEXT=`Training - ${VERSION} (${STAMP})`;

  const setVersion=()=>{
    const el=document.querySelector('.version');
    if(el && el.textContent!==VERSION_TEXT) el.textContent=VERSION_TEXT;
    if(document.title!==`Nexus Training ${VERSION}`) document.title=`Nexus Training ${VERSION}`;
  };

  const installVersionLock=()=>{
    setVersion();
    const el=document.querySelector('.version');
    if(!el || el.__nexusVersionLockV262) return;
    el.__nexusVersionLockV262=true;
    try{
      const obs=new MutationObserver(()=>setVersion());
      obs.observe(el,{childList:true,characterData:true,subtree:true});
    }catch(_){}
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

  const loadProfileActiveIsolation=()=>load('profile-active-isolation-v262.js?v=2.64','data-nexus-profile-active-isolation','v2.64');
  const loadFinalUi=()=>load('ui-final-v252.js?v=2.64','data-nexus-ui-final','v2.64');
  const loadUiHotfix=()=>load('ui-hotfix-v250.js?v=2.64','data-nexus-ui-hotfix','v2.64');
  const loadCardioPersistence=()=>load('cardio-persistence-v245.js?v=2.64','data-nexus-cardio-persistence','v2.64',loadFinalUi);
  const loadWorkoutCompletion=()=>load('workout-completion-v244.js?v=2.64','data-nexus-workout-completion','v2.64',loadCardioPersistence);
  const loadHomeDashboard=()=>load('home-dashboard-v227.js?v=2.64','data-nexus-home-dashboard','v2.64',loadWorkoutCompletion);
  const loadStrengthPolar=()=>load('strength-polar-v253.js?v=2.64','data-nexus-strength-polar','v2.64',loadHomeDashboard);
  const loadPolarIntelligence=()=>load('polar-intelligence-v222.js?v=2.64','data-nexus-polar-intelligence','v2.64',loadStrengthPolar);
  const loadHomeMesocycle=()=>load('home-mesocycle-v221.js?v=2.64','data-nexus-home-mesocycle','v2.64',loadPolarIntelligence);
  const loadPlanEditor=()=>load('plan-editor-v220.js?v=2.64','data-nexus-plan-editor','v2.64',loadHomeMesocycle);
  const loadPolar=()=>load('polar-v218.js?v=2.64','data-nexus-polar','v2.64',loadPlanEditor);
  const loadProfileCardioAccess=()=>load('profile-cardio-access-v217.js?v=2.64','data-nexus-profile-cardio-access','v2.64',loadPolar);

  const loadAnaProgression=()=>load('ana-progression-v260.js?v=2.64','data-nexus-ana-progression','v2.64');
  const loadAnaPlan=()=>load('ana-plan-v216.js?v=2.64','data-nexus-ana-plan','v2.64',loadAnaProgression);
  const loadCardioReport=()=>load('cardio-report-v215.js?v=2.64','data-nexus-cardio-report','v2.64');

  const loadDavidCardio=()=>{
    const after=()=>{loadCardioReport();loadAnaPlan();loadProfileCardioAccess();};
    load('cardio-david-v214.js?v=2.64','data-nexus-david-cardio','v2.64',after);
  };
  const loadDavidProgression=()=>load('david-progression-v263.js?v=2.64','data-nexus-david-progression','v2.64',loadDavidCardio);
  const loadDavidMesocycle=()=>load('mesocycle-david-v213.js?v=2.64','data-nexus-david-mesocycle','v2.64',loadDavidProgression);
  const loadWorkoutControls=()=>load('workout-controls-v212.js?v=2.64','data-nexus-workout-controls','v2.64',loadDavidMesocycle);

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
    s.src='profile-ui-v211.js?v=2.64';
    s.dataset.nexusProfileUi='v2.64';
    s.async=false;
    s.onload=finish;
    s.onerror=finish;
    document.head.appendChild(s);
  };

  const boot=()=>{
    installVersionLock();
    loadProfileActiveIsolation();
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