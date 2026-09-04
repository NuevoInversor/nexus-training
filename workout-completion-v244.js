(() => {
  const VERSION='v2.56';
  const STAMP='04/09/2026 20:24:00';
  const VERSION_TEXT=`Training - ${VERSION} (${STAMP})`;

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

  function persistActive(reason){
    const aw=getActiveWorkout();
    if(!aw) return;
    try{
      if(typeof save==='function' && typeof STORAGE!=='undefined' && STORAGE?.active){
        save(STORAGE.active,aw);
      }
    }catch(_){}
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

  function patchRender(){
    if(typeof window.renderWorkout!=='function' || window.renderWorkout.__completionV256) return;
    const original=window.renderWorkout;
    const wrapped=function(){
      repairCompletedExercises();
      return original.apply(this,arguments);
    };
    wrapped.__completionV256=true;
    window.renderWorkout=wrapped;
  }

  function patchMarkExerciseComplete(){
    if(typeof window.markExerciseComplete!=='function' || window.markExerciseComplete.__completionV256) return;
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
    wrapped.__completionV256=true;
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
    if(!el || el.__nexusVersionLockV256) return;
    el.__nexusVersionLockV256=true;
    const obs=new MutationObserver(()=>enforceVersion());
    obs.observe(el,{childList:true,characterData:true,subtree:true});
  }

  function install(){
    patchRender();
    patchMarkExerciseComplete();
    refreshIfRepaired();
    installVersionLock();
  }

  install();
  setTimeout(install,25);
  setTimeout(install,100);
  setTimeout(install,350);
  setTimeout(install,900);
  setTimeout(install,1800);
  window.addEventListener('focus',()=>setTimeout(install,25));
  window.addEventListener('nexus:cloud-synced',()=>setTimeout(install,50));
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible') setTimeout(install,25);
  });
})();