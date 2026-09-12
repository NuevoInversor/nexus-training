(() => {
  const VERSION='v2.62';
  const PREFIX='nx_active_profile_v262_';
  let finishing=false;

  function profileId(){
    const name=document.getElementById('profileSwitchBtn')?.textContent?.trim()?.toLowerCase();
    if(name==='david' || name==='ana') return name;
    return null;
  }

  function key(pid=profileId()){
    return pid ? `${PREFIX}${pid}` : null;
  }

  function cloneSafe(v){
    try{return JSON.parse(JSON.stringify(v));}catch(_){return null;}
  }

  function readBackup(pid=profileId()){
    const k=key(pid); if(!k)return null;
    try{
      const raw=localStorage.getItem(k);
      const aw=raw?JSON.parse(raw):null;
      if(!aw || typeof aw!=='object')return null;
      if(aw.nexusProfileId && aw.nexusProfileId!==pid)return null;
      return aw;
    }catch(_){return null;}
  }

  function finished(aw){
    if(!aw?.id)return false;
    try{return (Array.isArray(workouts)?workouts:[]).some(w=>String(w?.id)===String(aw.id) && !!w?.finishedAt);}catch(_){return false;}
  }

  function validForCurrentProfile(aw,pid=profileId()){
    if(!aw || !pid)return false;
    if(aw.nexusProfileId && aw.nexusProfileId!==pid)return false;
    try{
      if(aw.planId && typeof plan!=='undefined' && plan?.id && String(aw.planId)!==String(plan.id))return false;
    }catch(_){}
    return !finished(aw);
  }

  function writeBackup(aw,pid=profileId()){
    const k=key(pid); if(!k)return;
    try{
      if(!aw || finished(aw)){
        localStorage.removeItem(k);
        return;
      }
      const copy=cloneSafe(aw); if(!copy)return;
      copy.nexusProfileId=pid;
      localStorage.setItem(k,JSON.stringify(copy));
    }catch(_){}
  }

  function clearBackup(pid=profileId()){
    const k=key(pid); if(!k)return;
    try{localStorage.removeItem(k);}catch(_){}
  }

  function currentActive(){
    try{return typeof activeWorkout!=='undefined' ? activeWorkout : null;}catch(_){return null;}
  }

  function persistCurrent(){
    const pid=profileId(),aw=currentActive();
    if(!pid || !aw)return;
    try{aw.nexusProfileId=pid;}catch(_){}
    writeBackup(aw,pid);
  }

  function restoreIfNeeded(){
    if(finishing)return false;
    const pid=profileId(); if(!pid)return false;
    let aw=currentActive();
    if(aw){
      if(validForCurrentProfile(aw,pid)){
        if(!aw.nexusProfileId)aw.nexusProfileId=pid;
        writeBackup(aw,pid);
        return false;
      }
      try{activeWorkout=null;}catch(_){}
      aw=null;
    }
    const backup=readBackup(pid);
    if(!validForCurrentProfile(backup,pid)){
      if(backup)clearBackup(pid);
      return false;
    }
    try{
      activeWorkout=backup;
      if(typeof save==='function' && typeof STORAGE!=='undefined' && STORAGE?.active) save(STORAGE.active,activeWorkout);
      return true;
    }catch(_){return false;}
  }

  function patchSave(){
    try{
      if(typeof save!=='function' || save.__nexusProfileActiveV262)return;
      const original=save;
      const wrapped=function(k,v){
        const result=original.apply(this,arguments);
        try{
          if(typeof STORAGE!=='undefined' && k===STORAGE.active && v){
            const pid=profileId();
            if(pid){v.nexusProfileId=pid;writeBackup(v,pid);}
          }
        }catch(_){}
        return result;
      };
      wrapped.__nexusProfileActiveV262=true;
      save=wrapped;
    }catch(_){}
  }

  function patchStart(){
    try{
      if(typeof startWorkout!=='function' || startWorkout.__nexusProfileActiveV262)return;
      const original=startWorkout;
      const wrapped=function(){
        const result=original.apply(this,arguments);
        persistCurrent();
        return result;
      };
      wrapped.__nexusProfileActiveV262=true;
      startWorkout=wrapped;
    }catch(_){}
  }

  function patchFinish(){
    try{
      if(typeof completeWorkoutAndGenerateSummary!=='function' || completeWorkoutAndGenerateSummary.__nexusProfileActiveV262)return;
      const original=completeWorkoutAndGenerateSummary;
      const wrapped=function(){
        const pid=profileId();
        finishing=true;
        try{return original.apply(this,arguments);}
        finally{
          clearBackup(pid);
          finishing=false;
        }
      };
      wrapped.__nexusProfileActiveV262=true;
      completeWorkoutAndGenerateSummary=wrapped;
    }catch(_){}
  }

  function patchRender(){
    try{
      if(typeof renderWorkout!=='function' || renderWorkout.__nexusProfileActiveV262)return;
      const original=renderWorkout;
      const wrapped=function(){
        restoreIfNeeded();
        return original.apply(this,arguments);
      };
      wrapped.__nexusProfileActiveV262=true;
      renderWorkout=wrapped;
    }catch(_){}
  }

  function install(){
    patchSave();patchStart();patchFinish();patchRender();
    if(currentActive())persistCurrent();
    else if(restoreIfNeeded()){
      try{if(typeof renderWorkout==='function')renderWorkout();}catch(_){}
    }
  }

  install();
  [50,200,600,1500,3000].forEach(ms=>setTimeout(install,ms));
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(install,80);});
  window.addEventListener('focus',()=>setTimeout(install,80));
  window.addEventListener('storage',e=>{
    try{
      if(typeof STORAGE!=='undefined' && e.key===STORAGE.active && e.newValue===null){
        setTimeout(()=>{if(restoreIfNeeded() && typeof renderWorkout==='function')renderWorkout();},50);
      }
    }catch(_){}
  });
})();
