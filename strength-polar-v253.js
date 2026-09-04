(() => {
  const VERSION='v2.53';
  const STAMP='04/09/2026 13:04:00';
  let busy=false;

  const strengthSvg=()=>`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9v6M6 7v10M9 10h6M15 7v10M18 9v6"/><path d="M4.5 7h1.5M4.5 17h1.5M17 7h1.5M17 17h1.5"/></svg>`;

  function dateOf(v){ return String(v||'').slice(0,10); }
  function workoutDate(w){ return dateOf(w?.finishedAt||w?.startedAt); }
  function isPolarStrength(a){ return String(a?.polar?.sportId||'')==='15'; }

  function ensureStyle(){
    if(document.getElementById('nexusStrengthV253Style')) return;
    const s=document.createElement('style');
    s.id='nexusStrengthV253Style';
    s.textContent=`
      .activity-chip.strength{background:#e0e7ff!important;color:#3730a3!important}
      .history-badge.strength{background:#eef2ff!important;color:#3730a3!important}
    `;
    document.head.appendChild(s);
  }

  function patchVisuals(){
    ensureStyle();
    if(typeof window.svgIcon==='function' && !window.svgIcon.__strengthV253){
      const original=window.svgIcon;
      const wrapped=function(name){
        if(String(name||'').toLowerCase()==='strength') return strengthSvg();
        return original.apply(this,arguments);
      };
      wrapped.__strengthV253=true;
      window.svgIcon=wrapped;
    }
    if(typeof window.getActivityVisual==='function' && !window.getActivityVisual.__strengthV253){
      const original=window.getActivityVisual;
      const wrapped=function(type){
        if(String(type||'').trim().toLowerCase()==='strength') return {icon:'strength',cls:'strength',label:'Fuerza'};
        return original.apply(this,arguments);
      };
      wrapped.__strengthV253=true;
      window.getActivityVisual=wrapped;
    }
  }

  function bestWorkoutFor(activity){
    if(!Array.isArray(window.workouts)) return null;
    const date=activity?.date||dateOf(activity?.polar?.startTime);
    const candidates=window.workouts.filter(w=>workoutDate(w)===date);
    if(!candidates.length) return null;

    const sid=String(activity?.polar?.sessionId||'');
    const already=candidates.find(w=>String(w?.polar?.sessionId||'')===sid);
    if(already) return already;

    const free=candidates.filter(w=>!w?.polar?.sessionId || String(w?.polar?.sportId||'')!=='15');
    if(!free.length) return null;
    if(free.length===1) return free[0];

    const polarMs=Date.parse(activity?.polar?.startTime||'');
    if(Number.isFinite(polarMs)){
      return free.slice().sort((a,b)=>{
        const am=Date.parse(a?.startedAt||a?.finishedAt||'');
        const bm=Date.parse(b?.startedAt||b?.finishedAt||'');
        const ad=Number.isFinite(am)?Math.abs(am-polarMs):Number.MAX_SAFE_INTEGER;
        const bd=Number.isFinite(bm)?Math.abs(bm-polarMs):Number.MAX_SAFE_INTEGER;
        return ad-bd;
      })[0];
    }
    return free[free.length-1];
  }

  function saveAll(changedActivities,changedWorkouts){
    try{
      if(changedActivities && window.STORAGE?.activities){
        if(typeof window.save==='function') window.save(window.STORAGE.activities,window.activities);
        else localStorage.setItem(window.STORAGE.activities,JSON.stringify(window.activities));
      }
      if(changedWorkouts && window.STORAGE?.workouts){
        if(typeof window.save==='function') window.save(window.STORAGE.workouts,window.workouts);
        else localStorage.setItem(window.STORAGE.workouts,JSON.stringify(window.workouts));
      }
    }catch(_){}
    try{window.renderHistory?.();}catch(_){}
    try{window.renderHome?.();}catch(_){}
  }

  function reconcile(){
    if(busy || !Array.isArray(window.activities) || !Array.isArray(window.workouts)) return;
    busy=true;
    let changedActivities=false, changedWorkouts=false;
    try{
      // 1) Polar sport 15 is always identified as strength, never as "other".
      window.activities.forEach(a=>{
        if(isPolarStrength(a) && a.type!=='strength'){
          a.type='strength';
          changedActivities=true;
        }
      });

      // 2) Remove exact duplicates already linked to a Nexus workout.
      const linkedIds=new Set(window.workouts
        .filter(w=>String(w?.polar?.sportId||'')==='15' && w?.polar?.sessionId)
        .map(w=>String(w.polar.sessionId)));
      for(let i=window.activities.length-1;i>=0;i--){
        const a=window.activities[i];
        const sid=String(a?.polar?.sessionId||'');
        if(isPolarStrength(a) && sid && linkedIds.has(sid)){
          window.activities.splice(i,1);
          changedActivities=true;
        }
      }

      // 3) If a standalone Polar strength session has a Nexus workout that day,
      // attach the Polar measurements to the workout and remove the standalone activity.
      for(let i=window.activities.length-1;i>=0;i--){
        const a=window.activities[i];
        if(!isPolarStrength(a)) continue;
        const target=bestWorkoutFor(a);
        if(!target) continue;
        const sid=String(a?.polar?.sessionId||'');
        if(target?.polar?.sessionId && String(target.polar.sessionId)!==sid) continue;
        target.polar={...(target.polar||{}),...(a.polar||{})};
        target.source=target.source||'nexus+polar';
        target.polarLinkedAt=target.polarLinkedAt||new Date().toISOString();
        window.activities.splice(i,1);
        changedActivities=true;
        changedWorkouts=true;
      }

      // 4) Guarantee one standalone activity per Polar session id.
      const seen=new Set();
      for(let i=window.activities.length-1;i>=0;i--){
        const a=window.activities[i];
        if(!isPolarStrength(a)) continue;
        const sid=String(a?.polar?.sessionId||'');
        if(!sid) continue;
        if(seen.has(sid)){
          window.activities.splice(i,1);
          changedActivities=true;
        }else seen.add(sid);
      }

      if(changedActivities || changedWorkouts) saveAll(changedActivities,changedWorkouts);
    } finally { busy=false; }
  }

  function install(){ patchVisuals(); reconcile(); }
  install();
  setTimeout(install,100);
  setTimeout(install,500);
  setTimeout(install,1500);
  setInterval(install,10000);
  window.addEventListener('nexus:polar-synced',()=>setTimeout(install,100));
  window.addEventListener('focus',()=>setTimeout(install,100));
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible') setTimeout(install,100);});

  window.NEXUS_STRENGTH_POLAR={version:VERSION,stamp:STAMP,reconcile};
})();