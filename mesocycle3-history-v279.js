(() => {
  const M3='mesociclo-3-2026-10-12';
  const M2='hipertrofia-general-2026-08-31';

  function isM3Week1(){
    try{return plan?.id===M3 && Number(getWeek())===1}catch(_){return false}
  }

  function findM2Week3Exercise(routineId,key){
    try{
      const candidates=(workouts||[])
        .filter(w=>w?.planId===M2 && Number(w?.mesocycleWeek)===3 && w?.finishedAt && Array.isArray(w?.exercises))
        .sort((a,b)=>String(b.finishedAt).localeCompare(String(a.finishedAt)));

      // Primero la misma rutina; si el ejercicio fue movido desde Especialización u otra sesión,
      // usar la sesión de Semana 3 del Mesociclo 2 que contenga la misma clave de ejercicio.
      const sameRoutine=candidates.find(w=>w.routineId===routineId && w.exercises.some(e=>e?.key===key));
      const source=sameRoutine || candidates.find(w=>w.exercises.some(e=>e?.key===key));
      return source?.exercises?.find(e=>e?.key===key) || null;
    }catch(_){return null}
  }

  function patchPrevious(){
    if(typeof previousWeekExercise!=='function' || previousWeekExercise.__nexusM3History279)return;
    const original=previousWeekExercise;
    previousWeekExercise=function(routineId,key,currentWeek){
      if(plan?.id===M3 && Number(currentWeek)===1){
        const e=findM2Week3Exercise(routineId,key);
        if(e)return e;
      }
      return original.apply(this,arguments);
    };
    previousWeekExercise.__nexusM3History279=true;
  }

  function relabel(){
    if(!isM3Week1())return;
    document.querySelectorAll('.previous-inline-label').forEach(el=>{
      if(el.textContent.trim()==='Semana pasada' || el.dataset.nexusM3History279==='1'){
        el.textContent='Mesociclo 2 · Semana 3';
        el.dataset.nexusM3History279='1';
      }
    });
  }

  function patchRenderWorkout(){
    if(typeof renderWorkout!=='function' || renderWorkout.__nexusM3History279)return;
    const original=renderWorkout;
    renderWorkout=function(){
      const r=original.apply(this,arguments);
      try{relabel()}catch(_){}
      return r;
    };
    renderWorkout.__nexusM3History279=true;
  }

  function tick(){patchPrevious();patchRenderWorkout();relabel()}
  function boot(){
    tick();
    let n=0;
    const fast=setInterval(()=>{tick();if(++n>=24)clearInterval(fast)},500);
    setInterval(tick,30000);
    window.addEventListener('focus',()=>setTimeout(tick,80));
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(tick,80)});
    window.addEventListener('nexus:profile-selected',()=>setTimeout(tick,120));
    window.addEventListener('nexus:boot-complete',()=>setTimeout(tick,120));
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
