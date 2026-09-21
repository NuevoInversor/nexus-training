(() => {
  const PLAN_ID='hipertrofia-general-2026-08-31';
  const WEEK='4';
  // Only loads explicitly prescribed for week 4. Existing sets, reps and RIR
  // remain governed by the mesocycle's deload plan; weeks 1-3 are untouched.
  const TARGETS={
    'press-banca':'12,5',
    'remo-maquina':'22,5',
    'press-inclinado':'18',
    'jalon-neutro':'35',
    'curl-biceps':'10',
    'extension-triceps-polea':'17,5',
    'dominadas-asistidas':'21',
    'press-militar':'5',
    'remo-polea-baja':'35',
    'aperturas-maquina':'17,5',
    'facepull':'15',
    'sentadilla-trasera':'20',
    'prensa-inclinada':'22,5',
    'extension-cuadriceps':'20',
    'curl-femoral-tumbado':'15',
    'gemelos-sentado':'30',
    'peso-muerto-rumano-dia4':'12,5',
    'sentadilla-bulgara':'5',
    'hip-thrust':'20',
    'curl-femoral-sentado':'27,5',
    'gemelos-prensa':'27,5',
    'pajaros-peck-deck':'7,5',
    'curl-biceps-polea':'17,5',
    'extension-triceps-overhead':'20',
    'pallof-press':'7,5'
  };

  function isDavid(){
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='David' && (!gate || gate.classList.contains('hidden'));
  }

  function applyExerciseWeights(exercises){
    let changed=false;
    (exercises||[]).forEach(e=>{
      if(!Object.prototype.hasOwnProperty.call(TARGETS,e.key))return;
      e.weeklyWeight=e.weeklyWeight||{};
      if(e.weeklyWeight[WEEK]!==TARGETS[e.key]){
        e.weeklyWeight[WEEK]=TARGETS[e.key];
        changed=true;
      }
    });
    return changed;
  }

  function apply(){
    try{
      if(!isDavid() || typeof plan==='undefined' || plan?.id!==PLAN_ID || typeof routines==='undefined' || !Array.isArray(routines))return;
      let changed=false;
      routines.forEach(r=>{if(applyExerciseWeights(r.exercises))changed=true;});
      if(changed){
        if(typeof save==='function' && typeof STORAGE!=='undefined')save(STORAGE.routines,routines);
        else localStorage.setItem(STORAGE.routines,JSON.stringify(routines));
      }
      // Already-open week 4 sessions are snapshots of routines. Update
      // *target metadata only*, never the actual recorded sets/weights.
      let activeChanged=false;
      if(typeof activeWorkout!=='undefined' && activeWorkout &&
         activeWorkout.planId===PLAN_ID && Number(activeWorkout.mesocycleWeek)===4 &&
         !activeWorkout.finishedAt && !activeWorkout.isComplete){
        activeChanged=applyExerciseWeights(activeWorkout.exercises);
        if(activeChanged){
          if(typeof save==='function' && typeof STORAGE!=='undefined')save(STORAGE.active,activeWorkout);
          else localStorage.setItem(STORAGE.active,JSON.stringify(activeWorkout));
        }
      }
      if(changed || activeChanged){
        if(typeof renderAll==='function')renderAll();
        else if(typeof renderWorkout==='function')renderWorkout();
      }
    }catch(err){console.warn('Nexus week 4 load update:',err)}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  function boot(){
    apply();
    let n=0;
    const quick=setInterval(()=>{apply();if(++n>=20)clearInterval(quick);},500);
    setInterval(apply,30000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(apply,80);});
    window.addEventListener('focus',()=>setTimeout(apply,80));
  }
})();
