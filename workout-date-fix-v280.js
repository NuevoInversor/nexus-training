(() => {
  const WORKOUT_ID='hy8tnb6h8mfmv6xn3cu';
  const STARTED_AT='2026-10-13T17:05:07.000Z';
  const FINISHED_AT='2026-10-13T17:51:36.000Z';
  const DURATION='46 min';

  function fixWorkoutDate(){
    try{
      if(!Array.isArray(workouts)) return false;
      const w=workouts.find(x=>String(x?.id)===WORKOUT_ID);
      if(!w) return false;
      const changed=w.startedAt!==STARTED_AT || w.finishedAt!==FINISHED_AT || w.duration!==DURATION;
      if(!changed) return false;
      w.startedAt=STARTED_AT;
      w.finishedAt=FINISHED_AT;
      w.duration=DURATION;
      if(typeof save==='function' && typeof STORAGE!=='undefined' && STORAGE.workouts){
        save(STORAGE.workouts,workouts);
      }
      try{ if(typeof renderHistory==='function') renderHistory(); }catch(_){}
      try{ if(typeof renderHome==='function') renderHome(); }catch(_){}
      return true;
    }catch(_){
      return false;
    }
  }

  function currentMonthKey(){
    const d=new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
  }

  function installHistoryCurrentMonth(){
    const btn=document.querySelector('.nav button[data-view="historyView"]');
    if(!btn || btn.__nexusHistoryCurrentMonth281) return;
    btn.__nexusHistoryCurrentMonth281=true;
    btn.addEventListener('click',()=>{
      try{
        historyMonthCursor=currentMonthKey();
        setTimeout(()=>{ if(typeof renderHistory==='function') renderHistory(); },0);
      }catch(_){}
    },true);
  }

  window.NEXUS_FIX_UPPER_A_20261013=fixWorkoutDate;
  fixWorkoutDate();
  installHistoryCurrentMonth();

  let ticks=0;
  const fast=setInterval(()=>{
    fixWorkoutDate();
    installHistoryCurrentMonth();
    if(++ticks>=30) clearInterval(fast);
  },500);

  window.addEventListener('nexus:profile-selected',()=>setTimeout(()=>{fixWorkoutDate();installHistoryCurrentMonth();},80));
  window.addEventListener('nexus:cloud-ready',()=>setTimeout(()=>{fixWorkoutDate();installHistoryCurrentMonth();},80));
  window.addEventListener('nexus:boot-complete',()=>setTimeout(()=>{fixWorkoutDate();installHistoryCurrentMonth();},80));
  window.addEventListener('focus',()=>setTimeout(()=>{fixWorkoutDate();installHistoryCurrentMonth();},80));
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible') setTimeout(()=>{fixWorkoutDate();installHistoryCurrentMonth();},80);
  });
})();
