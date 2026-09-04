(() => {
  const VERSION='v2.49';
  const STAMP='04/09/2026 11:36:00';
  const STORE_PREFIX='nxs_cardio_meta_v245_';
  let restoring=false;

  function loadPilatesIcon(){
    if(document.querySelector('script[data-nexus-pilates-icon]')) return;
    const s=document.createElement('script');
    s.src='pilates-icon-v247.js?v=2.49';
    s.dataset.nexusPilatesIcon='v2.49';
    s.async=false;
    document.head.appendChild(s);
  }

  function profileId(){
    try{return localStorage.getItem('nexus_local_profile_v29')||'default';}catch(_){return'default'}
  }
  function storeKey(){return STORE_PREFIX+profileId();}
  function readStore(){
    try{return JSON.parse(localStorage.getItem(storeKey())||'{}')||{};}catch(_){return{}}
  }
  function writeStore(v){
    try{localStorage.setItem(storeKey(),JSON.stringify(v||{}));}catch(_){}
  }
  function polarKey(a){return String(a?.polar?.sessionId||a?.id||'');}

  function capture(){
    if(restoring || !Array.isArray(window.activities)) return;
    const meta=readStore();
    let changed=false;
    window.activities.forEach(a=>{
      if(!a?.polar) return;
      const key=polarKey(a); if(!key) return;
      if(!a.cardioNexus && !a.cardioFeedback && !a.cardioReviewCompletedAt) return;
      const prev=meta[key]||{};
      const next={
        cardioNexus:a.cardioNexus||prev.cardioNexus||null,
        cardioFeedback:a.cardioFeedback||prev.cardioFeedback||null,
        cardioReviewCompletedAt:a.cardioReviewCompletedAt||prev.cardioReviewCompletedAt||null,
        notes:(a.notes!==undefined&&a.notes!==null)?a.notes:(prev.notes||''),
        savedAt:new Date().toISOString()
      };
      if(JSON.stringify(prev)!==JSON.stringify(next)){meta[key]=next;changed=true;}
    });
    if(changed) writeStore(meta);
  }

  function restore(){
    if(restoring || !Array.isArray(window.activities)) return;
    const meta=readStore();
    let changed=false;
    window.activities.forEach(a=>{
      if(!a?.polar) return;
      const m=meta[polarKey(a)]; if(!m) return;
      if(m.cardioNexus && !a.cardioNexus){a.cardioNexus=m.cardioNexus;changed=true;}
      if(m.cardioFeedback && !a.cardioFeedback){a.cardioFeedback=m.cardioFeedback;changed=true;}
      if(m.cardioReviewCompletedAt && !a.cardioReviewCompletedAt){a.cardioReviewCompletedAt=m.cardioReviewCompletedAt;changed=true;}
      if(m.notes && !a.notes){a.notes=m.notes;changed=true;}
    });
    if(changed){
      restoring=true;
      try{
        if(typeof window.save==='function' && window.STORAGE?.activities) window.save(window.STORAGE.activities,window.activities);
        else if(window.STORAGE?.activities) localStorage.setItem(window.STORAGE.activities,JSON.stringify(window.activities));
        try{window.renderHistory?.();}catch(_){}
        try{window.renderHome?.();}catch(_){}
      }catch(_){} finally {restoring=false;}
    }
  }

  function removeLinkedStrengthDuplicates(){
    if(restoring || !Array.isArray(window.activities) || !Array.isArray(window.workouts)) return;
    const linked=new Set(
      window.workouts
        .filter(w=>String(w?.polar?.sportId||'')==='15' && w?.polar?.sessionId)
        .map(w=>String(w.polar.sessionId))
    );
    if(!linked.size) return;

    const before=window.activities.length;
    for(let i=window.activities.length-1;i>=0;i--){
      const a=window.activities[i];
      const sid=String(a?.polar?.sessionId||'');
      if(String(a?.polar?.sportId||'')==='15' && sid && linked.has(sid)) window.activities.splice(i,1);
    }
    if(window.activities.length===before) return;

    restoring=true;
    try{
      if(typeof window.save==='function' && window.STORAGE?.activities) window.save(window.STORAGE.activities,window.activities);
      else if(window.STORAGE?.activities) localStorage.setItem(window.STORAGE.activities,JSON.stringify(window.activities));
      try{window.renderHistory?.();}catch(_){}
      try{window.renderHome?.();}catch(_){}
    }catch(_){} finally {restoring=false;}
  }

  function reconcile(){capture();restore();removeLinkedStrengthDuplicates();capture();}
  window.addEventListener('nexus:polar-synced',()=>setTimeout(reconcile,250));
  window.addEventListener('focus',()=>setTimeout(reconcile,150));
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(reconcile,200);});
  document.addEventListener('change',()=>setTimeout(capture,100));

  loadPilatesIcon();
  let runs=0;
  const boot=setInterval(()=>{
    reconcile(); loadPilatesIcon();
    if(++runs>=12) clearInterval(boot);
  },500);
  setTimeout(()=>{reconcile();loadPilatesIcon();},50);
  setInterval(reconcile,10000);
})();
