(() => {
  const PLAN_ID='ana-fuerza-definicion-8s-2026-08-31';
  const REENTRY_WEEK=7;

  function isAna(){
    try{
      if(typeof nexusCurrentProfile==='function') return nexusCurrentProfile()==='ana';
    }catch(_){}
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='Ana' && (!gate || gate.classList.contains('hidden'));
  }

  function workoutTime(w){
    const t=new Date(w?.finishedAt||w?.startedAt||0).getTime();
    return Number.isFinite(t)?t:0;
  }

  function latestPriorExercise(routineId,key,currentWeek){
    if(typeof workouts==='undefined' || !Array.isArray(workouts)) return null;
    const week=Number(currentWeek);
    let best=null;
    let bestTime=-1;
    for(const w of workouts){
      if(w?.routineId!==routineId) continue;
      const ww=Number(w?.mesocycleWeek);
      if(Number.isFinite(week) && Number.isFinite(ww) && ww>=week) continue;
      const e=w?.exercises?.find?.(x=>x?.key===key);
      if(!e) continue;
      const t=workoutTime(w);
      if(t>bestTime){best=e;bestTime=t;}
    }
    return best;
  }

  function usableSets(exercise){
    return (exercise?.sets||[]).filter(s=>
      String(s?.weight??'').trim()!=='' || String(s?.reps??'').trim()!==''
    );
  }

  function priorSummary(exercise){
    const sets=usableSets(exercise);
    if(!sets.length) return '';
    return sets.map((s,i)=>{
      const weight=String(s?.weight??'').trim()||'—';
      const reps=String(s?.reps??'').trim()||'—';
      const rir=String(s?.rir??'').trim();
      return `S${i+1}: ${weight} × ${reps}${rir?` · RIR ${rir}`:''}`;
    }).join(' | ');
  }

  function priorWeightSummary(exercise){
    const sets=usableSets(exercise);
    if(!sets.length) return '';
    return sets.map(s=>String(s?.weight??'').trim()||'—').join(' / ');
  }

  function applyReentryTargets(){
    if(!isAna() || typeof plan==='undefined' || plan?.id!==PLAN_ID || typeof routines==='undefined' || !Array.isArray(routines)) return false;
    let changed=false;

    plan.weeklyRir=plan.weeklyRir||{};
    if(plan.weeklyRir['7']!=='3'){plan.weeklyRir['7']='3';changed=true;}
    if(plan.weeklyRir['8']!=='2-3'){plan.weeklyRir['8']='2-3';changed=true;}

    const week=String(typeof getWeek==='function'?getWeek():REENTRY_WEEK);
    if(Number(week)>=REENTRY_WEEK){
      routines.forEach(r=>r.exercises?.forEach(e=>{
        const prev=latestPriorExercise(r.id,e.key,Number(week));
        if(!prev) return;
        const summary=priorSummary(prev);
        const weights=priorWeightSummary(prev);
        e.weeklyWeight=e.weeklyWeight||{};
        e.weeklyTargetNote=e.weeklyTargetNote||{};
        if(weights && e.weeklyWeight[week]!==weights){e.weeklyWeight[week]=weights;changed=true;}
        const note=`Reentrada post-vacaciones · datos de la última sesión: ${summary}. Úsalos como referencia; esta semana prioriza RIR 3 y técnica.`;
        if(e.weeklyTargetNote[week]!==note){e.weeklyTargetNote[week]=note;changed=true;}
      }));
    }

    if(changed){
      try{
        if(typeof save==='function' && typeof STORAGE!=='undefined'){
          save(STORAGE.plan,plan);
          save(STORAGE.routines,routines);
        }else{
          localStorage.setItem('nexus_plan',JSON.stringify(plan));
          localStorage.setItem('nexus_routines',JSON.stringify(routines));
        }
      }catch(_){}
    }
    return changed;
  }

  function patchPreviousExercise(){
    if(typeof previousWeekExercise!=='function' || previousWeekExercise.__nexusAnaReturnV282) return;
    const original=previousWeekExercise;
    const wrapped=function(routineId,key,currentWeek){
      if(isAna()) return latestPriorExercise(routineId,key,currentWeek) || original(routineId,key,currentWeek);
      return original(routineId,key,currentWeek);
    };
    wrapped.__nexusAnaReturnV282=true;
    previousWeekExercise=wrapped;
  }

  function patchStartWorkout(){
    if(typeof startWorkout!=='function' || startWorkout.__nexusAnaReturnV282) return;
    const original=startWorkout;
    const wrapped=function(routineId){
      const before=(typeof activeWorkout!=='undefined' && activeWorkout)?activeWorkout.id:null;
      const result=original.apply(this,arguments);
      if(!isAna() || typeof activeWorkout==='undefined' || !activeWorkout || activeWorkout.id===before) return result;
      const week=Number(activeWorkout.mesocycleWeek||0);
      if(week<REENTRY_WEEK) return result;

      let changed=false;
      activeWorkout.exercises?.forEach(e=>{
        const prev=latestPriorExercise(activeWorkout.routineId,e.key,week);
        const prevSets=usableSets(prev);
        if(!prevSets.length) return;
        e.sets?.forEach((s,i)=>{
          const p=prevSets[i] || prevSets[prevSets.length-1];
          if(!p) return;
          if(String(s.weight??'').trim()==='' && String(p.weight??'').trim()!==''){
            s.weight=String(p.weight); changed=true;
          }
          if(String(s.reps??'').trim()==='' && String(p.reps??'').trim()!==''){
            s.reps=String(p.reps); changed=true;
          }
          if(s.restActual==null) s.restActual=Number(e.rest)||0;
        });
      });

      if(changed){
        try{if(typeof save==='function' && typeof STORAGE!=='undefined') save(STORAGE.active,activeWorkout);}catch(_){}
        try{if(typeof renderWorkout==='function') renderWorkout();}catch(_){}
        try{if(typeof toast==='function') toast('Pesos y repeticiones de la última sesión cargados');}catch(_){}
      }
      return result;
    };
    wrapped.__nexusAnaReturnV282=true;
    startWorkout=wrapped;
  }

  function patchRenderWorkout(){
    if(typeof renderWorkout!=='function' || renderWorkout.__nexusAnaReturnV282) return;
    const original=renderWorkout;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      if(isAna()){
        document.querySelectorAll('.previous-inline-label').forEach(el=>{el.textContent='Última sesión';});
      }
      return result;
    };
    wrapped.__nexusAnaReturnV282=true;
    renderWorkout=wrapped;
  }

  function tick(){
    patchPreviousExercise();
    patchStartWorkout();
    patchRenderWorkout();
    applyReentryTargets();
  }

  function boot(){
    tick();
    let n=0;
    const quick=setInterval(()=>{tick();if(++n>=20)clearInterval(quick);},500);
    setInterval(tick,30000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')tick();});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
