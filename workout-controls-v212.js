(() => {
  const VERSION='v2.12';
  const STAMP='24/08/2026 20:00:00';
  let chronoInterval=null;

  function hasExecutedSeries(workout){
    if(!workout?.exercises) return false;
    return workout.exercises.some(exercise =>
      Array.isArray(exercise.sets) && exercise.sets.some(set => {
        if(set?.completed) return true;
        try { return typeof isSetRecorded==='function' && isSetRecorded(set,exercise); }
        catch(e) { return false; }
      })
    );
  }

  function clearEmptyActiveWorkout(){
    if(!activeWorkout) return false;
    if(hasExecutedSeries(activeWorkout)) return false;
    try { localStorage.removeItem(STORAGE.active); } catch(e) {}
    activeWorkout=null;
    return true;
  }

  function formatElapsed(ms){
    const total=Math.max(0,Math.floor(ms/1000));
    const h=Math.floor(total/3600);
    const m=Math.floor((total%3600)/60);
    const s=total%60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function updateChrono(){
    const el=document.getElementById('nexusWorkoutChronoValue');
    if(!el || !activeWorkout?.startedAt) return;
    const started=new Date(activeWorkout.startedAt).getTime();
    if(!Number.isFinite(started)) return;
    el.textContent=formatElapsed(Date.now()-started);
  }

  function stopChrono(){
    if(chronoInterval){clearInterval(chronoInterval);chronoInterval=null;}
  }

  function injectChrono(){
    stopChrono();
    if(!activeWorkout || !(activeWorkout.currentExercise===null || activeWorkout.currentExercise===undefined)) return;
    const c=document.getElementById('workoutContent');
    if(!c || document.getElementById('nexusWorkoutChrono')) return;
    const box=document.createElement('div');
    box.id='nexusWorkoutChrono';
    box.className='nexus-workout-chrono';
    box.innerHTML=`<div><div class="nexus-workout-chrono-label">TIEMPO DE SESIÓN</div><div class="nexus-workout-chrono-sub">Desde que se inició el entrenamiento</div></div><div id="nexusWorkoutChronoValue" class="nexus-workout-chrono-value">00:00:00</div>`;
    c.prepend(box);
    updateChrono();
    chronoInterval=setInterval(updateChrono,1000);
  }

  function ensureStyle(){
    if(document.getElementById('nexusWorkoutControlsV212Style')) return;
    const s=document.createElement('style');
    s.id='nexusWorkoutControlsV212Style';
    s.textContent=`
      .nexus-workout-chrono{display:flex;align-items:center;justify-content:space-between;gap:16px;background:linear-gradient(145deg,#0f172a,#1e293b);color:#fff;border-radius:20px;padding:16px 18px;margin-bottom:12px;box-shadow:0 10px 30px rgba(15,23,42,.10)}
      .nexus-workout-chrono-label{font-size:11px;font-weight:900;letter-spacing:.13em;opacity:.76}
      .nexus-workout-chrono-sub{font-size:12px;color:#cbd5e1;margin-top:3px}
      .nexus-workout-chrono-value{font-variant-numeric:tabular-nums;font-size:25px;font-weight:950;letter-spacing:.02em;white-space:nowrap}
      @media(max-width:560px){.nexus-workout-chrono{padding:14px 15px;border-radius:18px}.nexus-workout-chrono-value{font-size:22px}.nexus-workout-chrono-sub{font-size:11px}}
    `;
    document.head.appendChild(s);
  }

  function patchStartWorkout(){
    if(typeof startWorkout!=='function' || startWorkout.__nexusV212) return;
    const original=startWorkout;
    const wrapped=function(routineId){
      const removed=clearEmptyActiveWorkout();
      if(removed && typeof toast==='function') toast('Entrenamiento anterior vacío eliminado');
      return original(routineId);
    };
    wrapped.__nexusV212=true;
    startWorkout=wrapped;
  }

  function patchRenderWorkout(){
    if(typeof renderWorkout!=='function' || renderWorkout.__nexusV212) return;
    const original=renderWorkout;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      injectChrono();
      return result;
    };
    wrapped.__nexusV212=true;
    renderWorkout=wrapped;
  }

  function updateVersion(){
    const v=document.querySelector('header .version');
    if(v) v.textContent=`Training - ${VERSION} (${STAMP})`;
    document.title=`Nexus Training ${VERSION}`;
  }

  function boot(){
    ensureStyle();
    patchStartWorkout();
    patchRenderWorkout();
    updateVersion();
    try { renderWorkout(); } catch(e) {}
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
