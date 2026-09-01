(() => {
  const VERSION='v2.16';
  const STAMP='30/08/2026 19:14:00';
  const PLAN_ID='ana-fuerza-definicion-8s-2026-08-31';

  const PLAN={
    id:PLAN_ID,
    name:'Mesociclo Ana · Fuerza + Definición · 8 semanas',
    startDate:'2026-08-31',
    endDate:'2026-10-25',
    weekDates:{
      '1':'2026-08-31','2':'2026-09-07','3':'2026-09-14','4':'2026-09-21',
      '5':'2026-09-28','6':'2026-10-05','7':'2026-10-12','8':'2026-10-19'
    },
    weeklyRir:{'1':'3','2':'2-3','3':'2','4':'2','5':'4','6':'3','7':'2-3','8':'2'},
    exerciseRir:{},
    deloadWeek:5,
    deloadGuidelines:'Semana 5: reducir aproximadamente 30-40% del número de series. Mantener descansos máximos de 60 s.',
    progressionRule:'Si se completa el rango alto con el RIR objetivo, aumentar carga aproximadamente 2,5-5%. Si una sesión acumula demasiada fatiga, reducir antes una serie accesoria que alargar los descansos.'
  };

  const W=(base,deload)=>({'1':base,'2':base,'3':base,'4':base,'5':deload,'6':base,'7':base,'8':base});
  const E=(key,name,sets,reps,rest,unit,deloadSets)=>({
    key,name,sets,reps,rest,unit,
    weeklySets:W(sets,deloadSets),
    weeklyReps:{'1':reps,'2':reps,'3':reps,'4':reps,'5':reps,'6':reps,'7':reps,'8':reps}
  });

  const ROUTINES=[
    {id:'dia-1',name:'Lower A',estimatedDuration:'45-50 min',exercises:[
      E('prensa-inclinada','Prensa inclinada',3,'6-8',60,'kg',2),
      E('peso-muerto-rumano-mancuernas','Peso muerto rumano con mancuernas',3,'8-10',60,'kg manc.',2),
      E('extension-cuadriceps','Extensión de cuádriceps',3,'10-12',60,'kg',2),
      E('curl-femoral-sentado','Curl femoral sentado',3,'10-12',60,'kg',2),
      E('aductores-maquina','Aductores en máquina',3,'12-15',60,'kg',2),
      E('gemelo-maquina','Gemelo en máquina',3,'10-15',60,'kg',2),
      E('abduccion-cadera-maquina','Abducción de cadera en máquina',2,'15-20',45,'kg',1),
      E('pallof-press-lower-a','Pallof press',2,'10-12/lado',45,'kg',1)
    ]},
    {id:'dia-2',name:'Upper A',estimatedDuration:'45-50 min',exercises:[
      E('jalon-pecho','Jalón al pecho',3,'8-10',60,'kg',2),
      E('remo-polea-baja','Remo en polea baja',3,'8-10',60,'kg',2),
      E('press-hombro-sentado','Press de hombro sentado / máquina',3,'8-10',60,'kg',2),
      E('elevacion-lateral-unilateral-polea','Elevación lateral unilateral en polea',3,'12-15',60,'kg',2),
      E('pullover-polea','Pullover en polea',3,'10-12',60,'kg',2),
      E('face-pull','Face pull',2,'12-15',45,'kg',1),
      E('pajaros-peck-deck','Pájaros en peck deck',2,'12-15',45,'kg',1),
      E('curl-biceps-polea','Curl de bíceps en polea',2,'10-12',60,'kg',1),
      E('extension-triceps-polea','Extensión de tríceps en polea',2,'10-12',60,'kg',1),
      E('farmer-walk','Farmer walk',3,'30-40 s',45,'kg manc.',2)
    ]},
    {id:'dia-3',name:'Lower B',estimatedDuration:'45-50 min',exercises:[
      E('step-up-alto','Step-up alto',3,'8/lado',60,'kg manc.',2),
      E('prensa-unilateral','Prensa unilateral',3,'10/lado',60,'kg',2),
      E('pull-through-polea','Pull-through en polea',3,'10-12',60,'kg',2),
      E('patada-gluteo-polea','Patada de glúteo en polea',2,'12-15/lado',60,'kg',1),
      E('curl-femoral-sentado-lower-b','Curl femoral sentado',3,'10-12',60,'kg',2),
      E('abduccion-maquina-lower-b','Abducción en máquina',2,'15-20',45,'kg',1),
      E('gemelo-pie-prensa','Gemelo de pie o en prensa',3,'12-15',60,'kg',2),
      E('suitcase-carry','Suitcase carry',3,'30 s/lado',45,'kg manc.',2),
      E('woodchop-polea','Woodchop en polea',2,'10/lado',45,'kg',1)
    ]},
    {id:'dia-4',name:'Upper B / Full Body',estimatedDuration:'45-50 min',exercises:[
      E('remo-maquina-apoyo','Remo en máquina con apoyo',3,'8-10',60,'kg',2),
      E('press-pecho-maquina-inclinada','Press de pecho en máquina inclinada',3,'8-10',60,'kg',2),
      E('goblet-squat','Goblet squat',3,'10-12',60,'kg manc.',2),
      E('jalon-unilateral-polea','Jalón unilateral en polea',3,'10-12/lado',60,'kg',2),
      E('elevaciones-laterales-upper-b','Elevaciones laterales',2,'12-15',45,'kg',1),
      E('remo-alto-cuerda','Remo alto con cuerda / face pull alto',2,'12-15',45,'kg',1),
      E('aperturas-pecho-maquina','Aperturas de pecho en máquina',2,'12-15',60,'kg',1),
      E('curl-martillo','Curl martillo',2,'10-12',45,'kg manc.',1),
      E('extension-triceps-cuerda','Extensión de tríceps con cuerda',2,'10-12',45,'kg',1),
      E('pallof-press-pie','Pallof press de pie',2,'10-12/lado',45,'kg',2)
    ]}
  ];

  const VISUALS={
    'dia-1':{icon:'lower',cls:'blue',label:'Lower A',code:'LA'},
    'dia-2':{icon:'upper',cls:'orange',label:'Upper A',code:'UA'},
    'dia-3':{icon:'lower',cls:'red',label:'Lower B',code:'LB'},
    'dia-4':{icon:'upper',cls:'purple',label:'Upper B',code:'UB'}
  };

  function isAna(){
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='Ana' && (!gate || gate.classList.contains('hidden'));
  }

  function findAnaExercise(key){
    for(const r of routines||[]){
      const e=r.exercises?.find(x=>x.key===key);
      if(e) return e;
    }
    return null;
  }

  function applyWeekTargets(){
    if(!isAna() || plan?.id!==PLAN_ID || !Array.isArray(routines)) return false;
    const week=String(typeof getWeek==='function'?getWeek():1);
    let changed=false;
    routines.forEach(r=>r.exercises?.forEach(e=>{
      const nextSets=e.weeklySets?.[week];
      if(nextSets!=null && Number(e.sets)!==Number(nextSets)){e.sets=Number(nextSets);changed=true;}
      const nextReps=e.weeklyReps?.[week];
      if(nextReps && e.reps!==nextReps){e.reps=nextReps;changed=true;}
      if(Number(e.rest)>60){e.rest=60;changed=true;}
    }));
    return changed;
  }

  function ensureAnaPlan(){
    if(!isAna() || typeof plan==='undefined' || typeof routines==='undefined') return;
    let changed=false;
    if(plan?.id!==PLAN_ID){
      plan=JSON.parse(JSON.stringify(PLAN));
      routines=JSON.parse(JSON.stringify(ROUTINES));
      changed=true;
      if(typeof activeWorkout!=='undefined' && activeWorkout){
        const hasSeries=activeWorkout.exercises?.some(e=>e.sets?.some(s=>s.completed));
        if(!hasSeries){activeWorkout=null;try{localStorage.removeItem(STORAGE.active);}catch(e){}}
      }
    }
    if(applyWeekTargets()) changed=true;
    if(changed){
      try{
        localStorage.setItem(STORAGE.plan,JSON.stringify(plan));
        localStorage.setItem(STORAGE.routines,JSON.stringify(routines));
      }catch(e){}
      try{renderAll();}catch(e){}
    }
  }

  function patchRepRanges(){
    if(typeof getTargetRepRange==='function' && !getTargetRepRange.__nexusAnaV216){
      const original=getTargetRepRange;
      const wrapped=function(key,week=getWeek(),fallback=''){
        if(isAna() && plan?.id===PLAN_ID){
          const e=findAnaExercise(key);
          if(e) return e.weeklyReps?.[String(week)] || e.reps || fallback || '—';
        }
        return original(key,week,fallback);
      };
      wrapped.__nexusAnaV216=true;
      getTargetRepRange=wrapped;
    }

    if(typeof startWorkout==='function' && !startWorkout.__nexusAnaV216){
      const original=startWorkout;
      const wrapped=function(routineId){
        if(isAna() && plan?.id===PLAN_ID) applyWeekTargets();
        return original(routineId);
      };
      wrapped.__nexusAnaV216=true;
      startWorkout=wrapped;
    }
  }

  function patchVisuals(){
    if(typeof getRoutineVisual==='function' && !getRoutineVisual.__nexusAnaV216){
      const original=getRoutineVisual;
      const wrapped=function(routineId){
        if(isAna() && VISUALS[routineId]) return VISUALS[routineId];
        return original(routineId);
      };
      wrapped.__nexusAnaV216=true;
      getRoutineVisual=wrapped;
    }
  }

  function updateHomePill(){
    const list=document.getElementById('routineList');
    const card=list?.closest('.card');
    const pill=card?.querySelector('.pill');
    if(!pill) return;
    if(isAna()) pill.textContent='4 días fuerza';
    else if(pill.textContent==='4 días fuerza') pill.textContent='5 días';
  }

  function ensurePilatesOption(){
    const select=document.getElementById('activityTypeInput');
    if(!select || select.querySelector('option[value="pilates"]')) return;
    const opt=document.createElement('option');
    opt.value='pilates'; opt.textContent='Pilates';
    const other=select.querySelector('option[value="other"]');
    if(other) select.insertBefore(opt,other); else select.appendChild(opt);
  }

  function patchActivityVisual(){
    if(typeof getActivityVisual==='function' && !getActivityVisual.__nexusAnaV216){
      const original=getActivityVisual;
      const wrapped=function(type){
        if(type==='pilates') return {icon:'other',cls:'other',label:'Pilates'};
        return original(type);
      };
      wrapped.__nexusAnaV216=true;
      getActivityVisual=wrapped;
    }
  }

  function updateVersion(){ /* Version centralizada en polar-intelligence-v222.js */ }

  function tick(){
    patchRepRanges();
    patchVisuals();
    patchActivityVisual();
    ensurePilatesOption();
    ensureAnaPlan();
    updateHomePill();
    updateVersion();
  }

  function boot(){
    tick();
    let n=0;
    const fast=setInterval(()=>{tick();if(++n>=20)clearInterval(fast);},750);
    setInterval(tick,30000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')tick();});
    document.addEventListener('click',e=>{if(e.target.closest?.('[data-profile]'))setTimeout(tick,450);},true);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();