(() => {
  const PROFILE='ana';
  const WORKOUT_ID='if2si49o3tmvf81r08';
  const POLAR_ACTIVITY_ID='polar-0e2a52b1-f092-5797-002d-0e88aaf11781';
  const STARTED_AT='2026-10-18T16:44:31.000Z';
  const FINISHED_AT='2026-10-18T17:29:35.000Z';
  const DURATION='45 min';
  const POLAR={
    hrAvg:91,
    hrMax:127,
    sportId:'15',
    calories:125,
    stopTime:'2026-10-18T19:29:35',
    sessionId:'0e2a52b1-f092-5797-002d-0e88aaf11781',
    startTime:'2026-10-18T18:44:31',
    deviceModel:'Polar Ignite 3',
    ascentMeters:0,
    runningIndex:null,
    descentMeters:0,
    distanceMeters:0,
    durationMillis:2698253,
    trainingBenefit:'TRAINING_BENEFIT_RECOVERY_TRAINING',
    recoveryTimeMillis:1470000
  };

  function currentProfile(){
    const t=document.getElementById('profileSwitchBtn')?.textContent?.trim()?.toLowerCase();
    return t==='ana'||t==='david'?t:null;
  }

  function fix(){
    try{
      if(currentProfile()!==PROFILE) return false;
      let changed=false;

      if(Array.isArray(workouts)){
        const w=workouts.find(x=>String(x?.id)===WORKOUT_ID);
        if(w){
          if(w.startedAt!==STARTED_AT){w.startedAt=STARTED_AT;changed=true;}
          if(w.finishedAt!==FINISHED_AT){w.finishedAt=FINISHED_AT;changed=true;}
          if(w.duration!==DURATION){w.duration=DURATION;changed=true;}
          if(w.source!=='nexus+polar'){w.source='nexus+polar';changed=true;}
          if(String(w?.polar?.sessionId||'')!==POLAR.sessionId){
            w.polar={...POLAR,importedAt:w?.polar?.importedAt||new Date().toISOString()};
            changed=true;
          }
        }
      }

      if(Array.isArray(activities)){
        const before=activities.length;
        activities=activities.filter(a=>String(a?.id)!==POLAR_ACTIVITY_ID);
        if(activities.length!==before) changed=true;
      }

      if(changed){
        if(typeof save==='function' && typeof STORAGE!=='undefined'){
          save(STORAGE.workouts,workouts);
          save(STORAGE.activities,activities);
        }
        try{if(typeof renderHistory==='function')renderHistory();}catch(_){}
        try{if(typeof renderHome==='function')renderHome();}catch(_){}
      }
      return changed;
    }catch(e){
      console.warn('Nexus Ana Polar workout merge fix:',e);
      return false;
    }
  }

  window.NEXUS_FIX_ANA_LOWER_A_20261018=fix;
  [0,150,500,1200,2500,5000].forEach(ms=>setTimeout(fix,ms));
  window.addEventListener('nexus:profile-selected',()=>setTimeout(fix,120));
  window.addEventListener('nexus:cloud-ready',()=>setTimeout(fix,250));
  window.addEventListener('nexus:boot-complete',()=>setTimeout(fix,250));
  window.addEventListener('focus',()=>setTimeout(fix,120));
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible')setTimeout(fix,120);
  });
})();