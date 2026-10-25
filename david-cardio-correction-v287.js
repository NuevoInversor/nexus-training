(() => {
  const ACTIVITY_ID='polar-0e2a871a-d99e-8536-6c24-0e294d317348';

  function fix(){
    try{
      const profile=document.getElementById('profileSwitchBtn')?.textContent?.trim()?.toLowerCase();
      if(profile!=='david' || typeof activities==='undefined' || !Array.isArray(activities)) return false;
      const a=activities.find(x=>String(x?.id)===ACTIVITY_ID);
      if(!a) return false;
      const desired={
        icon:'endurance',
        type:'Base aeróbica',
        week:2,
        visual:'cardio-c2',
        session:'C2',
        training:'50-55 min en Z2',
        objective:'Z2 · RPE 4 · ritmo libre según frecuencia cardiaca.',
        programId:'cardio-mesociclo-3-2026-10-12',
        programName:'Cardio - Mesociclo 3',
        plannedDuration:'50-55 min',
        preferredDay:'Jueves 22/10',
        notes:'Sin progresivos. Preferiblemente separar de Lower B varias horas.'
      };
      const current=a.cardioNexus||{};
      const changed=Object.entries(desired).some(([k,v])=>String(current[k]??'')!==String(v));
      if(!changed) return false;
      a.cardioNexus={...current,...desired};
      if(typeof save==='function' && typeof STORAGE!=='undefined') save(STORAGE.activities,activities);
      try{if(typeof renderHistory==='function')renderHistory();}catch(_){}
      try{if(typeof renderHome==='function')renderHome();}catch(_){}
      return true;
    }catch(e){
      console.warn('Nexus C2 correction 20/10:',e);
      return false;
    }
  }

  [0,150,500,1200,2500,5000].forEach(ms=>setTimeout(fix,ms));
  window.addEventListener('nexus:profile-selected',()=>setTimeout(fix,120));
  window.addEventListener('nexus:cloud-ready',()=>setTimeout(fix,250));
  window.addEventListener('nexus:boot-complete',()=>setTimeout(fix,250));
  window.addEventListener('focus',()=>setTimeout(fix,120));
})();