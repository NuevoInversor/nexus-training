(() => {
  const ID='mesociclo-2-extra-2026-09-28', START='2026-09-28', END='2026-10-04';
  const E=(key,name,unit,rest,sets,reps,rir,weight,note='')=>({
    key,name,unit,rest,sets,reps,
    weeklySets:{'1':sets},weeklyReps:{'1':reps},weeklyRir:{'1':rir},
    weeklyWeight:{'1':weight},weeklyTargetNote:{'1':note},programNote:note
  });
  const PLAN={
    id:ID,name:'Mesociclo 2 (EXTRA)',startDate:START,endDate:END,
    weekDates:{'1':START},weeklyRir:{'1':'2-3'},exerciseRir:{},
    progressionRule:'Semana puente: mantener fuerza, recuperar continuidad cardiovascular y evitar acumular fatiga. No buscar RIR 1 ni récords.',
    deloadGuidelines:'Volumen moderado. Lower B no se realiza esta semana.'
  };
  const ROUTINES=[
    {id:'dia-1',name:'Upper A',emphasis:'Semana puente · torso horizontal',estimatedDuration:'50-55 min',exercises:[
      E('press-banca','Press banca con barra','kg/lado',120,3,'6-8','2-3','15'),
      E('remo-maquina','Remo pecho apoyado / máquina','kg/lado',120,3,'8-10','2-3','27,5'),
      E('press-inclinado','Press inclinado con mancuernas','kg manc.',120,2,'8-10','2-3','20'),
      E('jalon-neutro','Jalón al pecho agarre neutro','kg',120,2,'10-12','2-3','40'),
      E('elevaciones-laterales-polea','Elevaciones laterales en polea','kg',90,2,'15-20','2','2,5'),
      E('curl-biceps','Curl bíceps en banco inclinado','kg manc.',90,2,'10-12','2-3','12'),
      E('extension-triceps-polea','Extensión de tríceps en polea','kg',90,2,'10-12','2-3','20')
    ]},
    {id:'dia-2',name:'Lower A',emphasis:'Semana puente · cuádriceps',estimatedDuration:'45-50 min',exercises:[
      E('sentadilla-trasera','Sentadilla trasera','kg/lado',120,3,'6-8','2-3','22,5'),
      E('prensa-inclinada','Prensa inclinada','kg/lado',120,2,'10-12','2-3','27,5'),
      E('extension-cuadriceps','Extensión de cuádriceps','kg',90,2,'12-15','2-3','25'),
      E('curl-femoral-tumbado','Curl femoral tumbado','kg',90,2,'10-12','2-3','17,5'),
      E('gemelos-sentado','Gemelos sentado','kg',90,2,'12-15','2-3','37,5','No forzar si aparecen sensaciones en el gemelo.'),
      E('plancha','Plancha abdominal','',60,2,'45-60 s','técnico','Sin carga')
    ]},
    {id:'dia-3',name:'Upper B',emphasis:'Semana puente · empuje y tirón vertical',estimatedDuration:'45-50 min',exercises:[
      E('dominadas-asistidas','Dominadas asistidas / peso corporal','kg ayuda',120,3,'6-8','2-3','14'),
      E('press-militar','Press militar','kg/lado + barra',120,3,'6-7','2-3','6,25'),
      E('remo-polea-baja','Remo en polea baja','kg',120,2,'8-10','2-3','40'),
      E('aperturas-maquina','Aperturas en máquina','kg',90,2,'10-12','2-3','20'),
      E('fondos-paralela','Fondos en paralelas','peso corporal',120,2,'8-10','2-3','Peso corporal'),
      E('facepull','Face Pull','kg',90,2,'15-20','2-3','20')
    ]},
    {id:'dia-5',name:'Especialización',emphasis:'Complementario + core · volumen moderado',estimatedDuration:'35-45 min',exercises:[
      E('dominadas','Dominadas peso corporal','peso corporal',120,3,'4','2-3','Peso corporal','Sin lastre esta semana.'),
      E('elevaciones-laterales-polea-dia5','Elevaciones laterales en polea','kg',90,2,'15-20','2-3','2,5'),
      E('pajaros-peck-deck','Pájaros en Peck Deck','kg',90,2,'15-18','2-3','10'),
      E('curl-biceps-polea','Curl de bíceps en polea','kg',90,1,'10-12','2-3','22,5'),
      E('extension-triceps-overhead','Extensión de tríceps por encima de la cabeza','kg',90,1,'10-12','2-3','22,5'),
      E('pallof-press','Pallof Press','kg',60,2,'12-15','técnico','10'),
      E('abd-wheel','Ab Wheel','peso corporal',60,2,'8-10','técnico','Peso corporal')
    ]}
  ];
  const SCHEDULE=[
    ['Lun 28/09','Descanso total'],['Mar 29/09','Upper A'],['Mié 30/09','Lower A'],
    ['Jue 01/10','Upper B + C1 · separar varias horas'],['Vie 02/10','C2'],
    ['Sáb 03/10','C3'],['Dom 04/10','Especialización']
  ];
  const iso=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
  const isDavid=()=>{
    try{if(localStorage.getItem('nexus_local_profile_v29')==='david')return true}catch(_){}
    const g=document.getElementById('profileGate'),b=document.getElementById('profileSwitchBtn');
    return !!b&&b.textContent.trim()==='David'&&(!g||g.classList.contains('hidden'));
  };
  const activeDate=()=>iso()>=START&&iso()<=END;
  const upcoming=()=>iso()<START;
  function persist(){
    try{
      if(typeof save==='function'){save(STORAGE.plan,plan);save(STORAGE.routines,routines);}
      else{localStorage.setItem(STORAGE.plan,JSON.stringify(plan));localStorage.setItem(STORAGE.routines,JSON.stringify(routines));}
    }catch(_){}
  }
  function validProgramState(){
    if(plan?.id!==ID || !Array.isArray(routines) || routines.length!==ROUTINES.length)return false;
    return ROUTINES.every((expected,i)=>{
      const current=routines[i];
      return current?.id===expected.id &&
        Array.isArray(current?.exercises) &&
        current.exercises.length===expected.exercises.length;
    });
  }

  function forceProgramState(){
    plan=JSON.parse(JSON.stringify(PLAN));
    routines=JSON.parse(JSON.stringify(ROUTINES));
    persist();
  }

  function activate(){
    if(!isDavid()||!activeDate()||typeof plan==='undefined'||typeof routines==='undefined')return;
    if(!validProgramState()) forceProgramState();
  }

  function ensureRoutineList(){
    if(!isDavid()||!activeDate())return;
    if(!validProgramState()) forceProgramState();

    const host=document.getElementById('routineList');
    if(!host)return;

    const completedFor=(routineId)=>{
      try{
        return (workouts||[]).find(w=>w?.planId===ID && w?.routineId===routineId && Number(w?.mesocycleWeek)===1) || null;
      }catch(_){return null}
    };

    const html=ROUTINES.map(r=>{
      const sets=(r.exercises||[]).reduce((a,e)=>a+Number(e.sets||0),0);
      const done=completedFor(r.id);
      const completed=!!done && done.isComplete!==false;
      const incomplete=!!done && done.isComplete===false;
      const status=completed
        ? 'Completado'
        : (incomplete ? 'Incompleto' : '');
      const button=completed
        ? '<button class="btn btn-completed" disabled>✓ Completado</button>'
        : `<button class="btn btn-primary" onclick="startWorkout('${r.id}')">${incomplete?'Repetir':'Iniciar'}</button>`;
      return `<div class="routine-card ${completed?'completed':''}">
        <div class="row between">
          <div>
            <strong>${r.name}</strong>
            <div class="small muted" style="margin-top:4px">${r.exercises.length} ejercicios · ${sets} series</div>
            ${status?`<div class="routine-status">${status}</div>`:''}
          </div>
          ${button}
        </div>
      </div>`;
    }).join('');

    host.dataset.nexusExtraVersion='2.72';
    host.style.display='grid';
    host.style.visibility='visible';
    host.style.opacity='1';
    if(host.innerHTML!==html)host.innerHTML=html;
  }

  function patchRenderHome(){
    if(typeof renderHome!=='function'||renderHome.__nexusExtra272)return;
    const original=renderHome;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      try{ensureRoutineList()}catch(e){console.warn('Nexus EXTRA renderHome watchdog:',e)}
      return result;
    };
    wrapped.__nexusExtra272=true;
    renderHome=wrapped;
  }

  function installRoutineWatchdog(){
    const host=document.getElementById('routineList');
    if(!host||window.__nexusExtra272RoutineObserver)return;
    const Obs=window.MutationObserver;
    if(!Obs)return;

    let repairing=false;
    const healthy=()=>{
      if(!isDavid()||!activeDate())return true;
      const cards=[...host.querySelectorAll(':scope > .routine-card')];
      return cards.length===ROUTINES.length && ROUTINES.every((r,i)=>(cards[i]?.textContent||'').includes(r.name));
    };

    const observer=new Obs(()=>{
      if(repairing||healthy())return;
      repairing=true;
      try{ensureRoutineList()}catch(e){console.warn('Nexus EXTRA DOM watchdog:',e)}
      setTimeout(()=>{repairing=false},0);
    });
    observer.observe(host,{childList:true});
    window.__nexusExtra272RoutineObserver=observer;
    if(!healthy())ensureRoutineList();
  }

  function patchStartWorkout(){
    if(typeof startWorkout!=='function'||startWorkout.__nexusExtra272)return;
    const original=startWorkout;
    startWorkout=function(routineId){
      if(isDavid()&&activeDate()&&ROUTINES.some(r=>r.id===routineId)){
        if(!validProgramState()) forceProgramState();
        const stale=typeof activeWorkout!=='undefined' && activeWorkout && activeWorkout.planId!==ID;
        if(stale){
          const hasRecorded=(activeWorkout.exercises||[]).some(e=>(e.sets||[]).some(s=>s?.completed||s?.weight||s?.reps||s?.rir));
          const oldDate=String(activeWorkout.startedAt||'').slice(0,10);
          if(!hasRecorded || (oldDate && oldDate<START)){
            activeWorkout=null;
            try{localStorage.removeItem(STORAGE.active)}catch(_){}
          }
        }
      }
      return original.apply(this,arguments);
    };
    startWorkout.__nexusExtra272=true;
  }

  function patchPrevious(){
    if(typeof previousWeekExercise!=='function'||previousWeekExercise.__extra267)return;
    const original=previousWeekExercise;
    previousWeekExercise=function(routineId,key,currentWeek){
      if(plan?.id===ID&&Number(currentWeek)===1){
        for(const w of workouts||[]){
          if(w?.planId===ID||w?.routineId!==routineId||!w?.finishedAt)continue;
          const e=w.exercises?.find(x=>x.key===key); if(e)return e;
        }
      }
      return original.apply(this,arguments);
    };
    previousWeekExercise.__extra267=true;
  }
  function card(){
    if(!isDavid()){document.getElementById('nexusDavidExtraCard')?.remove();return}
    const active=activeDate();
    if(!active&&!upcoming()){document.getElementById('nexusDavidExtraCard')?.remove();return}
    const host=document.getElementById('mesocycleSummary')?.closest('.card'); if(!host)return;
    let c=document.getElementById('nexusDavidExtraCard');
    if(!c){c=document.createElement('div');c.id='nexusDavidExtraCard';c.className='card';host.insertAdjacentElement('afterend',c)}
    c.innerHTML=`<div class="eyebrow" style="color:#2563eb">${active?'Semana puente · activa':'Próximo bloque · cargado'}</div>
      <h3 style="margin:5px 0 7px">Mesociclo 2 (EXTRA)</h3>
      <div class="muted small">28 sep – 4 oct · fuerza RIR 2-3 · volumen moderado · sin Lower B</div>
      <div class="small" style="margin-top:9px"><strong>Objetivo:</strong> mantener fuerza, recuperar continuidad cardiovascular y llegar fresco al pádel y las vacaciones.</div>
      <div class="small" style="margin-top:10px">${SCHEDULE.map(([d,x])=>`<div style="margin-top:4px"><strong>${d}:</strong> ${x}</div>`).join('')}</div>`;
    const p=document.getElementById('routineList')?.closest('.card')?.querySelector('.pill');
    if(active&&p)p.textContent='4 días';
  }
  function tick(){patchPrevious();patchStartWorkout();activate();card()}
  function boot(){tick();let n=0;const f=setInterval(()=>{tick();if(++n>=12)clearInterval(f)},750);setInterval(tick,30000);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(tick,80)});window.addEventListener('focus',()=>setTimeout(tick,80))}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();