(() => {
  const VERSION='v2.49';
  const STAMP='04/09/2026 11:36:00';
  const VERSION_TEXT=`Training - ${VERSION} (${STAMP})`;

  function setRecorded(s,e){
    const repsOk=String(s?.reps??'').trim()!=='';
    const rirOk=String(s?.rir??'').trim()!=='';
    const weightOk=e?.unit==='peso corporal' || String(s?.weight??'').trim()!=='';
    return repsOk && rirOk && weightOk;
  }

  function repairCompletedExercises(){
    try{
      if(!window.activeWorkout || !Array.isArray(activeWorkout.exercises)) return false;
      let changed=false;
      activeWorkout.exercises.forEach(e=>{
        const sets=Array.isArray(e?.sets)?e.sets:[];
        if(!sets.length) return;
        const allRecorded=sets.every(s=>setRecorded(s,e));
        if(allRecorded && !e.exerciseMarkedComplete){
          e.exerciseMarkedComplete=true;
          e.exerciseMarkedAt=e.exerciseMarkedAt||new Date().toISOString();
          changed=true;
        }
      });
      if(changed && typeof save==='function' && window.STORAGE?.active){
        save(STORAGE.active,activeWorkout);
        try{window.dispatchEvent(new CustomEvent('nexus:set-completed',{detail:{reason:'exercise-completion-repair'}}));}catch(_){ }
      }
      return changed;
    }catch(_){return false}
  }

  function patchRender(){
    if(typeof window.renderWorkout!=='function' || window.renderWorkout.__completionV244) return;
    const original=window.renderWorkout;
    const wrapped=function(){
      repairCompletedExercises();
      return original.apply(this,arguments);
    };
    wrapped.__completionV244=true;
    window.renderWorkout=wrapped;
  }

  function patchMarkExerciseComplete(){
    if(typeof window.markExerciseComplete!=='function' || window.markExerciseComplete.__completionV244) return;
    const original=window.markExerciseComplete;
    const wrapped=function(){
      const before=window.activeWorkout?JSON.stringify(activeWorkout):'';
      const result=original.apply(this,arguments);
      try{
        const after=window.activeWorkout?JSON.stringify(activeWorkout):'';
        if(after && after!==before){
          window.dispatchEvent(new CustomEvent('nexus:set-completed',{detail:{reason:'exercise-marked-complete'}}));
        }
      }catch(_){ }
      return result;
    };
    wrapped.__completionV244=true;
    window.markExerciseComplete=wrapped;
  }

  function enforceVersion(){
    const el=document.querySelector('.version');
    if(el && el.textContent!==VERSION_TEXT) el.textContent=VERSION_TEXT;
  }

  function installVersionLock(){
    enforceVersion();
    const el=document.querySelector('.version');
    if(!el || el.__nexusVersionLockV249) return;
    el.__nexusVersionLockV249=true;
    const obs=new MutationObserver(()=>enforceVersion());
    obs.observe(el,{childList:true,characterData:true,subtree:true});
  }

  function install(){
    patchRender();
    patchMarkExerciseComplete();
    repairCompletedExercises();
    installVersionLock();
  }

  install();
  setTimeout(install,100);
  setTimeout(install,350);
  setTimeout(install,900);
  setTimeout(install,1800);
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible') setTimeout(install,50);
  });
})();