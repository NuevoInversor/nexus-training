(() => {
  const VERSION='v2.61';
  const STAMP='11/09/2026 11:00:00';
  const VERSION_TEXT=`Training - ${VERSION} (${STAMP})`;
  let resumePending=false;

  function getActiveWorkout(){
    try{
      return typeof activeWorkout!=='undefined' ? activeWorkout : null;
    }catch(_){return null}
  }

  function setRecorded(s,e){
    try{
      if(typeof isSetRecorded==='function') return !!isSetRecorded(s,e);
    }catch(_){}
    const repsOk=String(s?.reps??'').trim()!=='';
    const rirOk=String(s?.rir??'').trim()!=='';
    const weightOk=e?.unit==='peso corporal' || String(s?.weight??'').trim()!=='';
    return repsOk && rirOk && weightOk;
  }

  function persistActive(reason,notify=true){
    const aw=getActiveWorkout();
    if(!aw) return;
    try{
      if(typeof save==='function' && typeof STORAGE!=='undefined' && STORAGE?.active){
        save(STORAGE.active,aw);
      }
    }catch(_){}
    if(!notify) return;
    try{
      window.dispatchEvent(new CustomEvent('nexus:set-completed',{detail:{reason}}));
    }catch(_){}
  }

  function repairCompletedExercises(){
    try{
      const aw=getActiveWorkout();
      if(!aw || !Array.isArray(aw.exercises)) return false;
      let changed=false;
      aw.exercises.forEach(e=>{
        const sets=Array.isArray(e?.sets)?e.sets:[];
        if(!sets.length) return;
        const allRecorded=sets.every(s=>setRecorded(s,e));
        if(allRecorded && !e.exerciseMarkedComplete){
          e.exerciseMarkedComplete=true;
          e.exerciseMarkedAt=e.exerciseMarkedAt||new Date().toISOString();
          changed=true;
        }
      });
      if(changed) persistActive('exercise-completion-repair');
      return changed;
    }catch(_){return false}
  }

  function exerciseIncomplete(e){
    const sets=Array.isArray(e?.sets)?e.sets:[];
    if(!sets.length) return false;
    return sets.some(s=>!setRecorded(s,e));
  }

  function chooseResumeExercise(aw){
    const exercises=Array.isArray(aw?.exercises)?aw.exercises:[];
    if(!exercises.length) return null;

    const currentRaw=aw.currentExercise;
    const current=currentRaw===null||currentRaw===undefined ? null : Number(currentRaw);
    if(Number.isInteger(current) && current>=0 && current<exercises.length && exerciseIncomplete(exercises[current])){
      return current;
    }

    const start=Number.isInteger(current) && current>=0 && current<exercises.length ? (current+1)%exercises.length : 0;
    for(let offset=0;offset<exercises.length;offset++){
      const idx=(start+offset)%exercises.length;
      if(exerciseIncomplete(exercises[idx])) return idx;
    }
    return null;
  }

  function routeWorkoutAfterResume(){
    try{
      const aw=getActiveWorkout();
      if(!aw || !Array.isArray(aw.exercises)) return;
      repairCompletedExercises();
      const target=chooseResumeExercise(aw);
      const normalizedCurrent=aw.currentExercise===null||aw.currentExercise===undefined ? null : Number(aw.currentExercise);
      const changed=normalizedCurrent!==target;
      aw.currentExercise=target;
      if(changed) persistActive('resume-exercise-routing',false);

      const workoutView=document.getElementById('workoutView');
      if(workoutView?.classList.contains('active') && typeof renderWorkout==='function'){
        renderWorkout();
      }
    }catch(_){}
  }

  function patchRender(){
    if(typeof window.renderWorkout!=='function' || window.renderWorkout.__completionV261) return;
    const original=window.renderWorkout;
    const wrapped=function(){
      repairCompletedExercises();
      return original.apply(this,arguments);
    };
    wrapped.__completionV261=true;
    window.renderWorkout=wrapped;
  }

  function patchMarkExerciseComplete(){
    if(typeof window.markExerciseComplete!=='function' || window.markExerciseComplete.__completionV261) return;
    const original=window.markExerciseComplete;
    const wrapped=function(){
      const beforeAw=getActiveWorkout();
      const before=beforeAw?JSON.stringify(beforeAw):'';
      const result=original.apply(this,arguments);
      try{
        const afterAw=getActiveWorkout();
        const after=afterAw?JSON.stringify(afterAw):'';
        if(after && after!==before) persistActive('exercise-marked-complete');
      }catch(_){}
      return result;
    };
    wrapped.__completionV261=true;
    window.markExerciseComplete=wrapped;
  }

  function refreshIfRepaired(){
    const changed=repairCompletedExercises();
    if(changed){
      try{ if(typeof renderWorkout==='function') renderWorkout(); }catch(_){}
    }
  }

  function enforceVersion(){
    const el=document.querySelector('.version');
    if(el && el.textContent!==VERSION_TEXT) el.textContent=VERSION_TEXT;
    if(document.title!==`Nexus Training ${VERSION}`) document.title=`Nexus Training ${VERSION}`;
  }

  function installVersionLock(){
    enforceVersion();
    const el=document.querySelector('.version');
    if(!el || el.__nexusVersionLockV261) return;
    el.__nexusVersionLockV261=true;
    const obs=new MutationObserver(()=>enforceVersion());
    obs.observe(el,{childList:true,characterData:true,subtree:true});
  }

  function install(){
    patchRender();
    patchMarkExerciseComplete();
    refreshIfRepaired();
    installVersionLock();
  }

  function resumeNow(){
    if(!resumePending && document.visibilityState==='visible') return;
    resumePending=false;
    setTimeout(()=>{
      install();
      routeWorkoutAfterResume();
    },50);
  }

  install();
  setTimeout(install,25);
  setTimeout(install,100);
  setTimeout(install,350);
  setTimeout(install,900);
  setTimeout(install,1800);

  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='hidden'){
      resumePending=true;
      return;
    }
    if(document.visibilityState==='visible') resumeNow();
  });
  window.addEventListener('focus',()=>{
    if(resumePending) resumeNow();
  });
  window.addEventListener('pageshow',e=>{
    if(e.persisted){
      resumePending=true;
      resumeNow();
    }
  });
})();