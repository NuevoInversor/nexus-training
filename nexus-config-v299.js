window.NEXUS_CLOUD = {
  url: 'https://ecfxzsddqgnbkgjrwpri.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7',
  publishableKey: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7'
};

(() => {
  if(document.documentElement.dataset.nexusModule==='nutrition') return;
  const VERSION='v2.99';
  const STAMP='24/11/2026 22:39:00';
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

  function polishProfileGate(){
    if(document.getElementById('nexusProfileStyles299') || document.getElementById('nexusProfilePolishV298')) return;
    const style=document.createElement('style');
    style.id='nexusProfilePolishV298';
    style.textContent=`
      #profileGate{overflow-y:auto;align-items:safe center;padding:24px 22px;background:radial-gradient(ellipse at 12% 0%,rgba(37,99,235,.23),transparent 50%),radial-gradient(ellipse at 100% 100%,rgba(14,116,144,.13),transparent 55%),linear-gradient(145deg,#080f21,#111d35 70%,#0e192c)}
      #profileGate .profile-panel{max-width:480px}
      #profileGate .profile-brand-lockup{display:flex;margin:0 auto 30px;width:min(100%,330px);height:clamp(86px,25vw,112px);padding:0;overflow:hidden;border-radius:19px;box-shadow:0 8px 30px rgba(37,99,235,.18);background:#f1f2f4;position:relative}
      #profileGate .profile-brand-lockup img{width:92%;max-width:none;height:auto;flex:none;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}
      #profileGate .profile-panel h1{font-size:clamp(25px,6.9vw,34px);letter-spacing:-.035em;line-height:1.16;margin-bottom:10px}
      #profileGate .profile-panel > p{font-size:15px;line-height:1.5;color:#b8c5d9;margin-bottom:23px}
      #profileGate .profile-list{gap:12px}
      #profileGate .profile-choice{min-height:76px;border:1px solid rgba(130,174,238,.24);background:linear-gradient(125deg,rgba(44,68,110,.57),rgba(26,42,72,.68));box-shadow:0 5px 16px rgba(0,0,0,.16);border-radius:18px;padding:15px 17px;transition:border-color .15s,transform .15s}
      #profileGate .profile-choice:focus-visible{outline:2px solid #93c5fd;outline-offset:3px}
      #profileGate .profile-choice .profile-avatar{background:linear-gradient(135deg,#245caa,#1b3157);border:1px solid rgba(147,197,253,.25);width:46px;height:46px;color:#eff6ff}
      #profileGate .profile-choice-name{font-size:18px;letter-spacing:-.02em}
      #profileGate .profile-arrow{color:#a9c4e6}
      #profileGate .nutrition-divider{display:block;width:100%;height:1px;border:0;margin:23px 0 19px;background:linear-gradient(90deg,transparent,rgba(170,190,220,.42) 12%,rgba(170,190,220,.42) 88%,transparent)}
      #profileGate #nutritionEntry{margin:0;text-decoration:none;background:linear-gradient(125deg,#124338,#102f35);border-color:#317b67;color:#e0fff3}
      #profileGate #nutritionEntry .profile-avatar{background:linear-gradient(135deg,#1c7056,#16483f);border-color:#378d75;color:#d1fae5}
      #profileGate #nutritionEntry .profile-arrow{color:#86efbf}
      @media(max-height:650px){#profileGate .profile-brand-lockup{margin-bottom:18px}#profileGate .profile-panel > p{margin-bottom:15px}#profileGate .profile-choice{min-height:66px;padding:10px 15px}#profileGate .nutrition-divider{margin:15px 0}}
    `;
    document.head.appendChild(style);
  }
  function addNutritionEntry(){
    polishProfileGate();
    const panel=document.querySelector('#profileGate .profile-panel');
    if(!panel || panel.querySelector('#nutritionEntry')) return;
    const a=document.createElement('a');
    a.id='nutritionEntry'; a.href='nutrition.html?v=2.99'; a.className='profile-choice';
    
    a.innerHTML='<span class="row"><span class="profile-avatar" aria-hidden="true">🍴</span><span><span class="profile-choice-name">Nutrición</span><br><span style="font-size:12px;color:#a7f3d0">Menú semanal y recetario</span></span></span><span class="profile-arrow" aria-hidden="true">›</span>';
    const divider=document.createElement('hr');
    divider.className='nutrition-divider';
    panel.append(divider,a);
  }
  function finalRender(){
    addNutritionEntry();
    try{
      if(typeof renderAll==='function') renderAll();
      else if(typeof renderHome==='function') renderHome();
    }catch(e){console.warn('Nexus v2.99 final render:',e)}
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
    ['cloud-v276.js?v=2.84','data-nexus-cloud'],
    [null,'__profile_ui__'],
    ['workout-controls-v212.js?v=2.84','data-nexus-workout-controls'],
    ['mesocycle-david-v213.js?v=2.76','data-nexus-david-mesocycle'],
    ['david-progression-v263.js?v=2.76','data-nexus-david-progression'],
    ['david-deload-v266.js?v=2.76','data-nexus-david-deload'],
    ['cardio-david-v214.js?v=2.76','data-nexus-david-cardio'],
    ['david-extra-cardio-v272.js?v=2.76','data-nexus-david-extra-cardio'],
    ['david-extra-strength-v272.js?v=2.76','data-nexus-david-extra-strength'],
    ['cardio-report-v215.js?v=2.76','data-nexus-cardio-report'],
    ['ana-plan-v216.js?v=2.91','data-nexus-ana-plan'],
    ['ana-progression-v260.js?v=2.76','data-nexus-ana-progression'],
    ['ana-return-v282.js?v=2.82','data-nexus-ana-return'],
    ['profile-cardio-access-v217.js?v=2.76','data-nexus-profile-cardio-access'],
    ['polar-v218.js?v=2.76','data-nexus-polar'],
    ['plan-editor-v220.js?v=2.76','data-nexus-plan-editor'],
    ['home-mesocycle-v221.js?v=2.76','data-nexus-home-mesocycle'],
    ['polar-intelligence-v222.js?v=2.76','data-nexus-polar-intelligence'],
    ['polar-padel-v277.js?v=2.77','data-nexus-polar-padel'],
    ['polar-indoor-cycling-v285.js?v=2.85','data-nexus-polar-indoor-cycling'],
    ['ana-polar-workout-fix-v286.js?v=2.86','data-nexus-ana-polar-workout-fix'],
    ['strength-polar-v253.js?v=2.76','data-nexus-strength-polar'],
    ['home-dashboard-v272.js?v=2.76','data-nexus-home-dashboard'],
    ['david-mesocycle3-v278.js?v=2.88','data-nexus-david-mesocycle3'],
    ['david-cardio-correction-v287.js?v=2.87','data-nexus-david-cardio-correction'],
    ['david-workout-date-fix-v289.js?v=2.89','data-nexus-david-workout-date-fix'],
    ['david-recovery-week-v290.js?v=2.90','data-nexus-david-recovery-week'],
    ['david-mesocycle4-v292.js?v=2.95','data-nexus-david-mesocycle4'],
    ['mesocycle3-history-v279.js?v=2.79','data-nexus-mesocycle3-history'],
    ['workout-completion-v244.js?v=2.76','data-nexus-workout-completion'],
    ['cardio-persistence-v245.js?v=2.76','data-nexus-cardio-persistence'],
    ['ui-final-v252.js?v=2.76','data-nexus-ui-final'],
    ['ui-hotfix-v250.js?v=2.76','data-nexus-ui-hotfix'],
    ['profile-active-isolation-v262.js?v=2.84','data-nexus-profile-active-isolation']
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
    load('workout-date-fix-v280.js?v=2.81','data-nexus-workout-date-fix',()=>runStep(0));
  }

  setVersion();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();