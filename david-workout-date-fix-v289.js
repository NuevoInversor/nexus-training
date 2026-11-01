(() => {
  const FIXES={
    'fn9jimciuh8mvovp0a6':{
      startedAt:'2026-10-26T06:31:25.614Z',
      finishedAt:'2026-10-26T07:11:25.614Z',
      duration:'40 min'
    },
    'tmmh6ou3naemvtsvz76':{
      startedAt:'2026-10-29T17:11:42.834Z',
      finishedAt:'2026-10-29T17:56:42.834Z',
      duration:'45min'
    }
  };

  function profile(){
    return document.getElementById('profileSwitchBtn')?.textContent?.trim()?.toLowerCase()||'';
  }

  function fix(){
    try{
      if(profile()!=='david' || typeof workouts==='undefined' || !Array.isArray(workouts)) return false;
      let changed=false;
      for(const w of workouts){
        const f=FIXES[String(w?.id||'')];
        if(!f) continue;
        for(const [k,v] of Object.entries(f)){
          if(String(w[k]??'')!==String(v)){ w[k]=v; changed=true; }
        }
      }
      if(!changed) return false;
      if(typeof save==='function' && typeof STORAGE!=='undefined') save(STORAGE.workouts,workouts);
      try{ if(typeof renderHistory==='function') renderHistory(); }catch(_){}
      try{ if(typeof renderHome==='function') renderHome(); }catch(_){}
      return true;
    }catch(e){
      console.warn('Nexus David workout date fix:',e);
      return false;
    }
  }

  [0,150,500,1200,2500,5000].forEach(ms=>setTimeout(fix,ms));
  window.addEventListener('nexus:profile-selected',()=>setTimeout(fix,120));
  window.addEventListener('nexus:cloud-ready',()=>setTimeout(fix,250));
  window.addEventListener('nexus:boot-complete',()=>setTimeout(fix,250));
  window.addEventListener('focus',()=>setTimeout(fix,120));
  document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') setTimeout(fix,120); });
})();