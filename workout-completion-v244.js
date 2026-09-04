(() => {
  const VERSION='v2.48';
  const STAMP='04/09/2026 11:27:00';

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

  function updateVersion(){
    const el=document.querySelector('.version');
    if(el) el.textContent=`Training - ${VERSION} (${STAMP})`;
  }

  function install(){
    patchRender();
    patchMarkExerciseComplete();
    repairCompletedExercises();
    updateVersion();
  }

  install();
  setTimeout(install,250);
  setTimeout(install,900);
  setTimeout(updateVersion,1600);
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible') setTimeout(install,100);
  });
})();