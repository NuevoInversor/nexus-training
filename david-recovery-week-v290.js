(() => {
  const VERSION='v2.90';
  const ID='recuperacion-post-reto-2026-11-02';
  const START='2026-11-02';
  const END='2026-11-08';
  const REVISION='recovery-post-46k-v1';

  const clone=x=>JSON.parse(JSON.stringify(x));
  const iso=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const esc2=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

  function isDavid(){
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='David' && (!gate || gate.classList.contains('hidden'));
  }
  function activeDate(){const d=iso();return d>=START&&d<=END;}

  function E(key,name,unit,rest,sets,reps,rir,weight,note=''){
    return {
      key,name,unit,rest,sets,reps,
      weeklySets:{'1':sets},
      weeklyReps:{'1':reps},
      weeklyRir:{'1':rir},
      weeklyWeight:{'1':weight},
      weeklyTargetNote:{'1':note},
      programNote:note
    };
  }

  const ROUTINES=[
    {id:'dia-1',name:'Upper A',emphasis:'Mantener fuerza y volumen de tren superior sin generar fatiga importante · 45-50 min',_nexusRecoveryRevision:REVISION,exercises:[
      E('press-banca','Press banca con barra','kg/lado',120,3,'5','4','16,25','No progresar carga esta semana.'),
      E('remo-maquina','Remo pecho apoyado / máquina','kg/lado',120,3,'6','4','30','No progresar carga esta semana.'),
      E('press-inclinado','Press inclinado con mancuernas','kg manc.',120,2,'6','3-4','22','Mantener margen; sin acercarse al fallo.'),
      E('jalon-neutro','Jalón al pecho agarre neutro','kg',120,2,'8','3-4','40','Mantener margen; priorizar ejecución.'),
      E('elevaciones-laterales-polea','Elevaciones laterales en polea','kg',90,2,'15-17','3','2,5','Sin añadir series aunque las sensaciones sean buenas.'),
      E('curl-biceps','Curl bíceps en banco inclinado','kg manc.',90,2,'10','3','12','No progresar carga esta semana.'),
      E('extension-triceps-polea','Extensión de tríceps en polea','kg',90,2,'8-10','3','22,5','No progresar carga esta semana.')
    ]},
    {id:'dia-3',name:'Upper B',emphasis:'Mantener estímulo de tren superior sin acercarse al fallo · 45-50 min',_nexusRecoveryRevision:REVISION,exercises:[
      E('dominadas','Dominadas peso corporal','peso corporal',120,3,'4','3-4','Peso corporal','Sin lastre.'),
      E('press-militar','Press militar','kg/lado + barra',120,3,'5','4','6,25','Barra + 6,25 kg/lado. No progresar carga.'),
      E('remo-polea-baja','Remo en polea baja','kg',120,3,'8','3-4','40','Mantener margen; sin acercarse al fallo.'),
      E('aperturas-maquina','Aperturas en máquina','kg',90,2,'8','3','22,5','No progresar carga esta semana.'),
      E('fondos-paralela','Fondos en paralelas','peso corporal',120,2,'8','3-4','Peso corporal','Sin lastre.'),
      E('facepull','Face Pull','kg',90,2,'15','3','20','Ejecución limpia.'),
      E('pajaros-peck-deck','Pájaros en Peck Deck','kg',90,2,'15','3','10','Ejecución limpia.')
    ]},
    {id:'dia-5',name:'Especialización',emphasis:'Hombro, brazos, espalda y core · intensidad moderada · evitar fatiga sistémica elevada',_nexusRecoveryRevision:REVISION,exercises:[
      E('dominadas','Dominadas peso corporal','peso corporal',120,3,'3','4','Peso corporal','Sin lastre.'),
      E('elevaciones-laterales-polea','Elevaciones laterales en polea','kg',90,3,'15','3','2,5','Mantener técnica y margen.'),
      E('pajaros-peck-deck','Pájaros en Peck Deck','kg',90,2,'15','3','10','Mantener técnica y margen.'),
      E('curl-biceps-polea','Curl de bíceps en polea','kg',90,2,'10','3','20-22,5 kg','Elegir 20-22,5 kg manteniendo RIR 3.'),
      E('extension-triceps-overhead','Extensión de tríceps overhead','kg',90,2,'10','3','22,5','Sin progresar carga.'),
      E('pallof-press','Pallof Press','kg',60,2,'12/lado','técnico','10','Ejecución técnica.'),
      E('abd-wheel','Ab Wheel','peso corporal',60,2,'8-10','3','Peso corporal','Controlar recorrido; sin buscar fatiga.')
    ]}
  ];

  const PLAN={
    id:ID,
    name:'Recuperación post-reto',
    startDate:START,
    endDate:END,
    weekDates:{'1':START},
    weeklyRir:{'1':'3-4'},
    exerciseRir:{},
    revision:REVISION,
    progressionRule:'Recuperación activa tras la ruta de 46,54 km. Mantener estímulo de tren superior, reducir impacto y carga sobre el tren inferior, trabajar lejos del fallo y no progresar cargas.',
    deloadGuidelines:'No realizar Lower A ni Lower B, carrera ni C1. No añadir series. Natación, bicicleta y elíptica tienen función regenerativa. Elíptica opcional solo si las piernas están claramente recuperadas. Si reaparece dolor en rodilla o planta del pie, reducir o eliminar el trabajo aeróbico en carga.'
  };
  ROUTINES.forEach(r=>r.exercises.forEach(e=>{PLAN.exerciseRir[e.key]=clone(e.weeklyRir);}));

  const SCHEDULE=[
    ['Lun 02/11','Descanso'],
    ['Mar 03/11','Natación suave · 30-40 min · RPE 2-3'],
    ['Mié 04/11','Upper A'],
    ['Jue 05/11','Bicicleta · 40-50 min · Z1-Z2 · RPE 3'],
    ['Vie 06/11','Upper B'],
    ['Sáb 07/11','Descanso'],
    ['Dom 08/11','Especialización + elíptica opcional · 20-30 min · Z1-Z2 · RPE 3']
  ];

  const AEROBIC=[
    {key:'swim',date:'2026-11-03',label:'Natación suave',icon:'swim',types:['swim'],duration:'30-40 min',detail:'RPE 2-3 · continuo cómodo o bloques sencillos · sin series intensas.',notes:'Recuperación activa post-reto. Nado cómodo, descansos cortos si son necesarios. No realizar series intensas.'},
    {key:'bike',date:'2026-11-05',label:'Bicicleta',icon:'bike',types:['bike','spinning'],duration:'40-50 min',detail:'Z1-Z2 · RPE 3 · cadencia cómoda · resistencia baja-moderada.',notes:'Recuperación activa sin impacto. Cadencia cómoda, resistencia baja-moderada. Evitar desarrollos largos o trabajo de fuerza.'},
    {key:'elliptical',date:'2026-11-08',label:'Elíptica opcional',icon:'elliptical',types:['elliptical'],duration:'20-30 min',detail:'Z1-Z2 · RPE 3 · solo si las piernas están claramente recuperadas.',notes:'Opcional. Realizar solo si las piernas están claramente recuperadas. Si persiste pesadez importante, omitir la elíptica y hacer únicamente Especialización.'}
  ];

  function buildRoutines(){return clone(ROUTINES);}

  function persist(){
    try{
      if(typeof save==='function'&&typeof STORAGE!=='undefined'){
        save(STORAGE.plan,plan);
        save(STORAGE.routines,routines);
      }else if(typeof STORAGE!=='undefined'){
        localStorage.setItem(STORAGE.plan,JSON.stringify(plan));
        localStorage.setItem(STORAGE.routines,JSON.stringify(routines));
      }
    }catch(_){}
  }

  function validState(){
    if(typeof plan==='undefined'||typeof routines==='undefined'||!Array.isArray(routines))return false;
    if(plan?.id!==ID||plan?.revision!==REVISION||routines.length!==ROUTINES.length)return false;
    return ROUTINES.every((r,i)=>{
      const cur=routines[i];
      if(cur?.id!==r.id||cur?._nexusRecoveryRevision!==REVISION||cur.exercises?.length!==r.exercises.length)return false;
      return r.exercises.every((e,j)=>{
        const q=cur.exercises[j];
        return q?.key===e.key&&Number(q?.sets)===Number(e.sets)&&String(q?.reps)===String(e.reps)&&String(q?.weeklyWeight?.['1']??'')===String(e.weeklyWeight?.['1']??'')&&String(q?.weeklyRir?.['1']??'')===String(e.weeklyRir?.['1']??'');
      });
    });
  }

  function forceState(){
    if(typeof plan==='undefined'||typeof routines==='undefined')return;
    plan=clone(PLAN);
    routines=buildRoutines();
    persist();
  }

  function activate(){
    if(!isDavid()||!activeDate()||typeof plan==='undefined'||typeof routines==='undefined')return false;
    if(!validState())forceState();
    return true;
  }

  function patchCurrentWeekWorkout(){
    if(typeof getCurrentWeekWorkout!=='function'||getCurrentWeekWorkout.__nexusRecoveryV290)return;
    const original=getCurrentWeekWorkout;
    getCurrentWeekWorkout=function(routineId){
      if(plan?.id===ID){
        return (workouts||[]).find(w=>w?.planId===ID&&w?.routineId===routineId&&Number(w?.mesocycleWeek)===1)||null;
      }
      return original.apply(this,arguments);
    };
    getCurrentWeekWorkout.__nexusRecoveryV290=true;
  }

  function latestPriorExercise(routineId,key){
    try{
      const list=(workouts||[])
        .filter(w=>w?.planId!==ID&&w?.finishedAt&&w?.exercises?.some(e=>e.key===key))
        .slice()
        .sort((a,b)=>new Date(b.finishedAt||b.startedAt||0)-new Date(a.finishedAt||a.startedAt||0));
      const same=list.find(w=>w.routineId===routineId);
      const w=same||list[0];
      return w?.exercises?.find(e=>e.key===key)||null;
    }catch(_){return null;}
  }

  function patchPrevious(){
    if(typeof previousWeekExercise!=='function'||previousWeekExercise.__nexusRecoveryV290)return;
    const original=previousWeekExercise;
    previousWeekExercise=function(routineId,key,currentWeek){
      if(plan?.id===ID&&Number(currentWeek)===1)return latestPriorExercise(routineId,key)||original.apply(this,arguments);
      return original.apply(this,arguments);
    };
    previousWeekExercise.__nexusRecoveryV290=true;
  }

  function patchRepRanges(){
    if(typeof getTargetRepRange!=='function'||getTargetRepRange.__nexusRecoveryV290)return;
    const original=getTargetRepRange;
    getTargetRepRange=function(key,week,fallback=''){
      if(plan?.id===ID){
        let e=null;
        try{e=activeWorkout?.exercises?.find(x=>x.key===key)||null;}catch(_){}
        if(!e){
          try{for(const r of routines||[]){const q=r.exercises?.find(x=>x.key===key);if(q){e=q;break;}}}catch(_){}
        }
        const v=e?.weeklyReps?.['1']??e?.targetReps??e?.reps;
        if(v!==undefined&&v!==null&&String(v)!=='')return String(v);
      }
      return original.apply(this,arguments);
    };
    getTargetRepRange.__nexusRecoveryV290=true;
  }

  function patchStart(){
    if(typeof startWorkout!=='function'||startWorkout.__nexusRecoveryV290)return;
    const original=startWorkout;
    startWorkout=function(routineId){
      if(isDavid()&&activeDate()){
        activate();
        if(!ROUTINES.some(r=>r.id===routineId)){
          if(typeof toast==='function')toast('Esta sesión no está programada durante la semana de recuperación');
          return;
        }
        try{
          if(activeWorkout&&activeWorkout.planId!==ID){
            const hasRecorded=(activeWorkout.exercises||[]).some(e=>(e.sets||[]).some(s=>{
              const reps=String(s?.reps??'').trim()!=='';
              const rir=String(s?.rir??'').trim()!=='';
              const weight=e?.unit==='peso corporal'||String(s?.weight??'').trim()!=='';
              return s?.completed||s?.completedAt||(reps&&rir&&weight);
            }));
            if(!hasRecorded){
              activeWorkout=null;
              localStorage.removeItem(STORAGE.active);
            }
          }
        }catch(_){}
      }
      return original.apply(this,arguments);
    };
    startWorkout.__nexusRecoveryV290=true;
  }

  function patchCardio(){
    if(typeof getCardioNexusSession!=='function'||getCardioNexusSession.__nexusRecoveryV290)return;
    const original=getCardioNexusSession;
    getCardioNexusSession=function(week,session){
      if(isDavid()&&activeDate()&&plan?.id===ID)return null;
      return original.apply(this,arguments);
    };
    getCardioNexusSession.__nexusRecoveryV290=true;
  }

  function ensureActivityOptions(){
    const sel=document.getElementById('activityTypeInput');
    if(!sel)return;
    if(!sel.querySelector('option[value="elliptical"]')){
      const o=document.createElement('option');o.value='elliptical';o.textContent='Elíptica';sel.appendChild(o);
    }
  }

  function activityDone(item){
    try{
      return (activities||[]).some(a=>a?.date===item.date&&item.types.includes(a?.type));
    }catch(_){return false;}
  }

  window.openRecoveryActivity=function(key){
    const item=AEROBIC.find(x=>x.key===key);
    if(!item||typeof openActivityModal!=='function')return;
    openActivityModal();
    ensureActivityOptions();
    const type=item.key==='elliptical'?'elliptical':item.key;
    const d=document.getElementById('activityDateInput');
    const t=document.getElementById('activityTypeInput');
    const du=document.getElementById('activityDurationInput');
    const n=document.getElementById('activityNotesInput');
    const cn=document.getElementById('cardioNexusToggle');
    if(d)d.value=item.date;
    if(t)t.value=type;
    if(du)du.value=item.duration;
    if(n)n.value=item.notes;
    if(cn)cn.checked=false;
    try{if(typeof renderCardioNexusPreview==='function')renderCardioNexusPreview();}catch(_){}
  };

  function ensureProgramCard(){
    if(!isDavid()||!activeDate()){
      document.getElementById('nexusDavidRecoveryCard')?.remove();
      return;
    }
    const base=document.getElementById('mesocycleSummary')?.closest('.card');
    if(!base)return;
    let card=document.getElementById('nexusDavidRecoveryCard');
    if(!card){
      card=document.createElement('div');
      card.id='nexusDavidRecoveryCard';
      card.className='card';
      base.insertAdjacentElement('afterend',card);
    }
    card.innerHTML=`
      <div class="eyebrow" style="color:#2563eb">Semana activa · 02-08 nov</div>
      <h3 style="margin:5px 0 7px">Recuperación post-reto</h3>
      <div class="muted small">Tras ruta de 46,54 km · objetivo: llegar al 09/11 con las piernas normales o casi normales.</div>
      <div class="small" style="margin-top:9px"><strong>Reglas:</strong> sin Lower A/B, sin carrera y sin C1 · RIR 3-4 · sin progresiones ni series extra.</div>
      <div class="small" style="margin-top:8px"><strong>Prioridad:</strong> recuperación de piernas. Si reaparece dolor en rodilla o planta del pie, reducir o eliminar el aeróbico en carga.</div>
      <div class="small" style="margin-top:10px">${SCHEDULE.map(([d,x])=>`<div style="margin-top:4px"><strong>${esc2(d)}:</strong> ${esc2(x)}</div>`).join('')}</div>
    `;
    const pill=document.getElementById('routineList')?.closest('.card')?.querySelector('.pill');
    if(pill)pill.textContent='3 días fuerza';
  }

  function ensureAerobicCard(){
    if(!isDavid()||!activeDate()){
      document.getElementById('nexusRecoveryAerobicCard')?.remove();
      return;
    }
    const lastCard=document.getElementById('lastWorkoutHome')?.closest('.card');
    if(!lastCard)return;
    let card=document.getElementById('nexusRecoveryAerobicCard');
    if(!card){
      card=document.createElement('div');
      card.id='nexusRecoveryAerobicCard';
      card.className='card nexus-cardio-week';
      lastCard.insertAdjacentElement('beforebegin',card);
    }
    card.innerHTML=`
      <div class="nexus-cardio-week-head">
        <div><h3 style="margin:0">Recuperación aeróbica</h3><div class="muted small" style="margin-top:3px">Sin impacto / baja carga · no es C1/C2/C3</div></div>
        <span class="pill">3 opciones</span>
      </div>
      <div class="nexus-cardio-week-list">
        ${AEROBIC.map(item=>{
          const done=activityDone(item);
          const icon=typeof svgIcon==='function'?svgIcon(item.icon):'';
          return `<div class="nexus-cardio-session">
            <div class="nexus-cardio-session-icon">${icon}</div>
            <div>
              <div class="nexus-cardio-session-title">${esc2(item.label)}</div>
              <div class="nexus-cardio-session-training">${esc2(item.duration)} · ${esc2(item.detail)}</div>
              <div class="small muted" style="margin-top:3px">${esc2(item.date.split('-').reverse().join('/'))}</div>
            </div>
            <div class="nexus-cardio-session-meta ${done?'nexus-cardio-done':''}">
              ${done?'✓ Hecho':`<button class="btn btn-secondary" style="padding:7px 9px;font-size:10px" onclick="openRecoveryActivity('${item.key}')">Registrar</button>`}
            </div>
          </div>`;
        }).join('')}
      </div>
    `;
  }

  function patchRenderHome(){
    if(typeof renderHome!=='function'||renderHome.__nexusRecoveryV290)return;
    const original=renderHome;
    renderHome=function(){
      if(isDavid()&&activeDate())activate();
      const result=original.apply(this,arguments);
      try{
        if(plan?.id===ID)document.getElementById('nexusCardioWeekCard')?.remove();
        ensureProgramCard();
        ensureAerobicCard();
      }catch(_){}
      return result;
    };
    renderHome.__nexusRecoveryV290=true;
  }

  function tick(){
    patchCurrentWeekWorkout();
    patchPrevious();
    patchRepRanges();
    patchStart();
    patchCardio();
    patchRenderHome();
    ensureActivityOptions();
    if(isDavid()&&activeDate())activate();
    if(plan?.id===ID)document.getElementById('nexusCardioWeekCard')?.remove();
    ensureProgramCard();
    ensureAerobicCard();
  }

  function boot(){
    tick();
    let n=0;
    const fast=setInterval(()=>{tick();if(++n>=24)clearInterval(fast);},500);
    setInterval(tick,30000);
    window.addEventListener('focus',()=>setTimeout(tick,80));
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(tick,80);});
    window.addEventListener('nexus:profile-selected',()=>setTimeout(tick,120));
    window.addEventListener('nexus:boot-complete',()=>setTimeout(tick,120));
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();