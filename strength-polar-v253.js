(() => {
  const VERSION='v2.54';
  const STAMP='04/09/2026 13:24:00';
  let busy=false;

  const strengthSvg=()=>`<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9v6M6 7v10M9 10h6M15 7v10M18 9v6"/><path d="M4.5 7h1.5M4.5 17h1.5M17 7h1.5M17 17h1.5"/></svg>`;

  function getActivities(){
    try{return (typeof activities!=='undefined' && Array.isArray(activities))?activities:null}catch(_){return null}
  }
  function getWorkouts(){
    try{return (typeof workouts!=='undefined' && Array.isArray(workouts))?workouts:null}catch(_){return null}
  }
  function dateOf(v){ return String(v||'').slice(0,10); }
  function workoutDate(w){ return dateOf(w?.finishedAt||w?.startedAt); }
  function isPolarStrength(a){ return String(a?.polar?.sportId||'')==='15'; }

  function ensureStyle(){
    if(document.getElementById('nexusStrengthV254Style')) return;
    const s=document.createElement('style');
    s.id='nexusStrengthV254Style';
    s.textContent=`
      .activity-chip.strength{background:#e0e7ff!important;color:#3730a3!important}
      .history-badge.strength{background:#eef2ff!important;color:#3730a3!important}
    `;
    document.head.appendChild(s);
  }

  function patchVisuals(){
    ensureStyle();
    try{
      if(typeof svgIcon==='function' && !svgIcon.__strengthV254){
        const original=svgIcon;
        const wrapped=function(name){
          if(String(name||'').toLowerCase()==='strength') return strengthSvg();
          return original.apply(this,arguments);
        };
        wrapped.__strengthV254=true;
        svgIcon=wrapped;
      }
    }catch(_){}
    try{
      if(typeof getActivityVisual==='function' && !getActivityVisual.__strengthV254){
        const original=getActivityVisual;
        const wrapped=function(type){
          if(String(type||'').trim().toLowerCase()==='strength') return {icon:'strength',cls:'strength',label:'Fuerza'};
          return original.apply(this,arguments);
        };
        wrapped.__strengthV254=true;
        getActivityVisual=wrapped;
      }
    }catch(_){}
  }

  function bestWorkoutFor(activity,ws){
    const date=activity?.date||dateOf(activity?.polar?.startTime);
    const candidates=ws.filter(w=>workoutDate(w)===date);
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

  function persist(changedActivities,changedWorkouts,as,ws){
    try{
      if(typeof save==='function' && typeof STORAGE!=='undefined'){
        if(changedActivities && STORAGE?.activities) save(STORAGE.activities,as);
        if(changedWorkouts && STORAGE?.workouts) save(STORAGE.workouts,ws);
      }
    }catch(_){}
    try{if(typeof renderHistory==='function')renderHistory()}catch(_){}
    try{if(typeof renderHome==='function')renderHome()}catch(_){}
  }

  function reconcile(){
    const as=getActivities(), ws=getWorkouts();
    if(busy || !as || !ws) return;
    busy=true;
    let changedActivities=false, changedWorkouts=false;
    try{
      // Polar sport 15 is always strength, never "other".
      as.forEach(a=>{
        if(isPolarStrength(a) && a.type!=='strength'){
          a.type='strength';
          changedActivities=true;
        }
      });

      // Remove any standalone Polar strength already attached to a Nexus workout.
      const linkedIds=new Set(ws
        .filter(w=>String(w?.polar?.sportId||'')==='15' && w?.polar?.sessionId)
        .map(w=>String(w.polar.sessionId)));
      for(let i=as.length-1;i>=0;i--){
        const a=as[i], sid=String(a?.polar?.sessionId||'');
        if(isPolarStrength(a) && sid && linkedIds.has(sid)){
          as.splice(i,1);
          changedActivities=true;
        }
      }

      // Attach remaining standalone strength to the corresponding Nexus workout.
      for(let i=as.length-1;i>=0;i--){
        const a=as[i];
        if(!isPolarStrength(a)) continue;
        const target=bestWorkoutFor(a,ws);
        if(!target) continue;
        const sid=String(a?.polar?.sessionId||'');
        if(target?.polar?.sessionId && String(target.polar.sessionId)!==sid) continue;
        target.polar={...(target.polar||{}),...(a.polar||{})};
        target.source=target.source||'nexus+polar';
        target.polarLinkedAt=target.polarLinkedAt||new Date().toISOString();
        as.splice(i,1);
        changedActivities=true;
        changedWorkouts=true;
      }

      // One standalone row maximum per Polar session id.
      const seen=new Set();
      for(let i=as.length-1;i>=0;i--){
        const a=as[i];
        if(!isPolarStrength(a)) continue;
        const sid=String(a?.polar?.sessionId||'');
        if(!sid) continue;
        if(seen.has(sid)){
          as.splice(i,1);
          changedActivities=true;
        }else seen.add(sid);
      }

      if(changedActivities || changedWorkouts) persist(changedActivities,changedWorkouts,as,ws);
    } finally { busy=false; }
  }

  function install(){ patchVisuals(); reconcile(); }
  install();
  [50,150,400,900,1800,3500].forEach(ms=>setTimeout(install,ms));
  setInterval(install,5000);
  window.addEventListener('nexus:polar-synced',()=>setTimeout(install,50));
  window.addEventListener('nexus:cloud-synced',()=>setTimeout(install,50));
  window.addEventListener('focus',()=>setTimeout(install,50));
  window.addEventListener('storage',()=>setTimeout(install,50));
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible') setTimeout(install,50);});

  window.NEXUS_STRENGTH_POLAR={version:VERSION,stamp:STAMP,reconcile};
})();