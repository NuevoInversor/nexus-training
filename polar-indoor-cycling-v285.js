(() => {
  const POLAR_INDOOR_CYCLING_ID='18';

  function normalizeIndoorCycling(){
    try{
      if(typeof activities==='undefined' || !Array.isArray(activities)) return false;
      let changed=false;
      for(const a of activities){
        if(String(a?.polar?.sportId||'')!==POLAR_INDOOR_CYCLING_ID) continue;
        if(a.type!=='spinning'){
          a.type='spinning';
          changed=true;
        }
      }
      if(!changed) return false;
      if(typeof save==='function' && typeof STORAGE!=='undefined') save(STORAGE.activities,activities);
      try{ if(typeof renderHistory==='function') renderHistory(); }catch(_){}
      return true;
    }catch(e){
      console.warn('Nexus indoor cycling Polar mapping:',e);
      return false;
    }
  }

  function refresh(){ normalizeIndoorCycling(); }

  window.addEventListener('nexus:profile-selected',()=>setTimeout(refresh,120));
  window.addEventListener('nexus:polar-synced',()=>setTimeout(refresh,120));
  window.addEventListener('nexus:boot-complete',()=>setTimeout(refresh,120));
  window.addEventListener('focus',()=>setTimeout(refresh,120));
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible') setTimeout(refresh,120);
  });

  refresh();
  let n=0;
  const fast=setInterval(()=>{
    refresh();
    if(++n>=16) clearInterval(fast);
  },500);
})();