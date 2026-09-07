(() => {
  const VERSION='v2.13';
  const STAMP='30/08/2026 19:14:00';
  const PLAN_ID='hipertrofia-general-2026-08-31';
  const START_DATE='2026-08-31';

  const PLAN={
    id:PLAN_ID,
    name:'Hipertrofia general',
    startDate:'2026-08-31',
    endDate:'2026-09-27',
    weekDates:{'1':'2026-08-31','2':'2026-09-07','3':'2026-09-14','4':'2026-09-21'},
    weeklyRir:{'1':'3','2':'2','3':'1','4':'4'},
    exerciseRir:{},
    progressionRule:'Si se completa el extremo superior del rango de repeticiones en todas las series manteniendo el RIR objetivo, aumentar la carga mínima disponible en la siguiente sesión. Si el salto de carga disponible es demasiado grande, progresar primero mediante repeticiones.',
    deloadGuidelines:'Reducir aproximadamente un 40-50% el número de series, reducir ligeramente las repeticiones, trabajar a RIR 4 y no realizar series al fallo ni técnicas de alta intensidad.'
  };

  const E=(key,name,unit,rest,sets,reps,rir,note='')=>({
    key,name,unit,rest,
    sets:sets['1'],
    reps:reps['1'],
    weeklySets:sets,
    weeklyReps:reps,
    weeklyRir:rir,
    programNote:note
  });

  const ROUTINES=[
    {id:'dia-1',name:'Upper A',emphasis:'Torso horizontal equilibrado',estimatedDuration:'55-60 min',exercises:[
      E('press-banca','Press banca con barra','kg/lado',120,{'1':4,'2':4,'3':4,'4':2},{'1':'6-8','2':'6-8','3':'6-8','4':'4-6'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('remo-maquina','Remo pecho apoyado / máquina','kg/lado',120,{'1':4,'2':4,'3':4,'4':2},{'1':'8-10','2':'8-10','3':'8-10','4':'6-8'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('press-inclinado','Press inclinado con mancuernas','kg manc.',120,{'1':3,'2':3,'3':3,'4':2},{'1':'8-10','2':'8-10','3':'8-10','4':'6-8'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('jalon-neutro','Jalón al pecho agarre neutro','kg',120,{'1':3,'2':3,'3':3,'4':2},{'1':'10-12','2':'10-12','3':'10-12','4':'8-10'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('elevaciones-laterales-polea','Elevaciones laterales en polea','kg',90,{'1':3,'2':3,'3':3,'4':2},{'1':'12-16','2':'12-16','3':'12-16','4':'10-12'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('curl-biceps','Curl bíceps en banco inclinado','kg manc.',90,{'1':2,'2':2,'3':2,'4':1},{'1':'10-12','2':'10-12','3':'10-12','4':'8-10'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('extension-triceps-polea','Extensión de tríceps en polea','kg',90,{'1':2,'2':2,'3':2,'4':1},{'1':'10-12','2':'10-12','3':'10-12','4':'8-10'},{'1':'2','2':'2','3':'1','4':'4'})
    ]},
    {id:'dia-2',name:'Lower A',emphasis:'Dominante de cuádriceps',estimatedDuration:'50-55 min',exercises:[
      E('sentadilla-trasera','Sentadilla trasera','kg/lado',120,{'1':4,'2':4,'3':4,'4':2},{'1':'6-8','2':'6-8','3':'6-8','4':'4-6'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('prensa-inclinada','Prensa inclinada','kg/lado',120,{'1':3,'2':3,'3':3,'4':2},{'1':'10-12','2':'10-12','3':'10-12','4':'8-10'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('extension-cuadriceps','Extensión de cuádriceps','kg',90,{'1':3,'2':3,'3':3,'4':1},{'1':'12-15','2':'12-15','3':'12-15','4':'10-12'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('curl-femoral-tumbado','Curl femoral tumbado','kg',90,{'1':3,'2':3,'3':3,'4':2},{'1':'10-12','2':'10-12','3':'10-12','4':'8-10'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('gemelos-sentado','Gemelos sentado','kg',90,{'1':3,'2':3,'3':3,'4':2},{'1':'12-15','2':'12-15','3':'12-15','4':'10-12'},{'1':'2','2':'1','3':'1','4':'4'}),
      E('plancha','Plancha abdominal','',60,{'1':3,'2':3,'3':3,'4':2},{'1':'45-60 s','2':'45-60 s','3':'45-60 s','4':'30-45 s'},{'1':'técnico','2':'técnico','3':'técnico','4':'técnico'})
    ]},
    {id:'dia-3',name:'Upper B',emphasis:'Empuje y tirón vertical',estimatedDuration:'55-60 min',exercises:[
      E('dominadas-asistidas','Dominadas asistidas / peso corporal','kg ayuda',120,{'1':4,'2':4,'3':4,'4':2},{'1':'6-8','2':'6-8','3':'6-8','4':'4-6'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('press-militar','Press militar','kg/lado + barra',120,{'1':4,'2':4,'3':4,'4':2},{'1':'6-8','2':'6-8','3':'6-8','4':'4-6'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('remo-polea-baja','Remo en polea baja','kg',120,{'1':3,'2':3,'3':3,'4':2},{'1':'8-10','2':'8-10','3':'8-10','4':'6-8'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('aperturas-maquina','Aperturas en máquina','kg',90,{'1':3,'2':3,'3':3,'4':2},{'1':'10-12','2':'10-12','3':'10-12','4':'8-10'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('fondos-paralela','Fondos en paralelas / máquina','peso corporal',120,{'1':3,'2':3,'3':3,'4':2},{'1':'8-10','2':'8-10','3':'8-10','4':'6-8'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('facepull','Face Pull','kg',90,{'1':2,'2':2,'3':2,'4':1},{'1':'15-20','2':'15-20','3':'15-20','4':'12-15'},{'1':'2','2':'2','3':'1','4':'4'})
    ]},
    {id:'dia-4',name:'Lower B',emphasis:'Cadena posterior',estimatedDuration:'50-55 min',exercises:[
      E('peso-muerto-rumano-dia4','Peso muerto rumano','kg/lado',120,{'1':4,'2':4,'3':4,'4':2},{'1':'6-8','2':'6-8','3':'6-8','4':'4-6'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('sentadilla-bulgara','Sentadilla búlgara','kg/lado',120,{'1':3,'2':3,'3':3,'4':2},{'1':'8-10','2':'8-10','3':'8-10','4':'6-8'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('hip-thrust','Hip Thrust','kg',120,{'1':3,'2':3,'3':3,'4':2},{'1':'8-10','2':'8-10','3':'8-10','4':'6-8'},{'1':'3','2':'2','3':'1','4':'4'}),
      E('curl-femoral-sentado','Curl femoral sentado','kg',90,{'1':3,'2':3,'3':3,'4':2},{'1':'10-12','2':'10-12','3':'10-12','4':'8-10'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('gemelos-prensa','Gemelos en prensa / de pie','kg/lado',90,{'1':3,'2':3,'3':3,'4':2},{'1':'12-15','2':'12-15','3':'12-15','4':'10-12'},{'1':'2','2':'1','3':'1','4':'4'}),
      E('elevaciones-piernas','Elevaciones de piernas colgado','peso corporal',60,{'1':3,'2':3,'3':3,'4':2},{'1':'10-15','2':'10-15','3':'10-15','4':'8-10'},{'1':'técnico','2':'2','3':'2','4':'4'})
    ]},
    {id:'dia-5',name:'Especialización',emphasis:'Trabajo complementario equilibrado + core',estimatedDuration:'45-55 min',exercises:[
      E('dominadas','Dominadas peso corporal','peso corporal',120,{'1':5,'2':5,'3':5,'4':2},{'1':'desde 3 reps','2':'desde 3 reps','3':'desde 3 reps','4':'desde 3 reps'},{'1':'3','2':'2','3':'1','4':'4'},'Progresar repeticiones antes de añadir lastre.'),
      E('elevaciones-laterales-polea-dia5','Elevaciones laterales en polea','kg',90,{'1':3,'2':3,'3':3,'4':2},{'1':'15-20','2':'15-20','3':'15-20','4':'12-15'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('pajaros-peck-deck','Pájaros en Peck Deck','kg',90,{'1':3,'2':3,'3':3,'4':2},{'1':'15-20','2':'15-20','3':'15-20','4':'12-15'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('curl-biceps-polea','Curl de bíceps en polea','kg',90,{'1':2,'2':2,'3':2,'4':1},{'1':'10-12','2':'10-12','3':'10-12','4':'8-10'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('extension-triceps-overhead','Extensión de tríceps por encima de la cabeza','kg',90,{'1':2,'2':2,'3':2,'4':1},{'1':'10-12','2':'10-12','3':'10-12','4':'8-10'},{'1':'2','2':'2','3':'1','4':'4'}),
      E('pallof-press','Pallof Press','kg',60,{'1':3,'2':3,'3':3,'4':2},{'1':'12-15','2':'12-15','3':'12-15','4':'10-12'},{'1':'técnico','2':'técnico','3':'técnico','4':'técnico'}),
      E('abd-wheel','Ab Wheel','peso corporal',60,{'1':3,'2':3,'3':3,'4':2},{'1':'8-12','2':'8-12','3':'8-12','4':'6-8'},{'1':'técnico','2':'técnico','3':'técnico','4':'técnico'})
    ]}
  ];

  function isDavidSelected(){
    const gate=document.getElementById('profileGate');
    const switchBtn=document.getElementById('profileSwitchBtn');
    return !!switchBtn && switchBtn.textContent.trim()==='David' && (!gate || gate.classList.contains('hidden'));
  }

  function currentISO(){
    const d=new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function findProgramExercise(key){
    for(const r of routines||[]){
      const e=r.exercises?.find(x=>x.key===key);
      if(e?.weeklyReps || e?.weeklyRir || e?.weeklySets) return e;
    }
    return null;
  }

  const WEEK2_TARGETS={"press-banca":{"reps":"6-7","rir":"2","weight":"15","note":"Subir carga tras completar el máximo del rango con margen suficiente."},"remo-maquina":{"reps":"9","rir":"2","weight":"27,5","note":"Mantener carga y progresar repeticiones antes de volver a subir peso."},"press-inclinado":{"reps":"9","rir":"2","weight":"20","note":""},"jalon-neutro":{"reps":"12","rir":"2","weight":"35","note":"Mantener carga; progresar primero mediante menor RIR antes de aumentar el salto de máquina."},"elevaciones-laterales-polea":{"reps":"12-16","rir":"2","weight":"2,5","note":""},"curl-biceps":{"reps":"11-12","rir":"2","weight":"12","note":""},"extension-triceps-polea":{"reps":"10","rir":"2","weight":"20","note":""},"sentadilla-trasera":{"reps":"7","rir":"2","weight":"22,5","note":""},"prensa-inclinada":{"reps":"11","rir":"2","weight":"27,5","note":""},"extension-cuadriceps":{"reps":"13-14","rir":"2","weight":"25","note":""},"curl-femoral-tumbado":{"reps":"10-12","rir":"2","weight":"15","note":"Volver al rango 10-12 sin forzar."},"gemelos-sentado":{"reps":"12-15","rir":"2","weight":"37,5","note":"No aumentar carga esta semana."},"plancha":{"reps":"45-60 s","rir":"técnico","weight":"Sin carga","note":""},"dominadas-asistidas":{"reps":"6","rir":"2","weight":"14","note":"Si 14 kg de ayuda te sitúan claramente por debajo de RIR 2, vuelve a 21 kg y realiza 4x8."},"press-militar":{"reps":"7","rir":"2","weight":"6,25","note":"Mantener carga y priorizar repeticiones antes de aumentarla."},"remo-polea-baja":{"reps":"10","rir":"2","weight":"35","note":""},"aperturas-maquina":{"reps":"11-12","rir":"2","weight":"20","note":""},"fondos-paralela":{"reps":"10","rir":"2","weight":"Peso corporal","note":"No añadir lastre todavía."},"facepull":{"reps":"20","rir":"2","weight":"17,5","note":""},"peso-muerto-rumano-dia4":{"reps":"8","rir":"2","weight":"15","note":"Mantener carga y priorizar tolerancia antes de aumentarla."},"sentadilla-bulgara":{"reps":"10","rir":"2","weight":"7,5","note":"Mantener carga."},"hip-thrust":{"reps":"10","rir":"2","weight":"23,65","note":"Mantener carga."},"curl-femoral-sentado":{"reps":"11-12","rir":"2","weight":"32,5","note":""},"gemelos-prensa":{"reps":"12-15","rir":"2","weight":"Sin aumento · registrar carga real","note":"No aumentar carga esta semana y registrar la carga real utilizada."},"elevaciones-piernas":{"reps":"10-15","rir":"2","weight":"Peso corporal","note":""},"dominadas":{"reps":"3","rir":"2","weight":"Peso corporal","note":"Mantener 5x3 y progresar repeticiones antes de añadir lastre."},"elevaciones-laterales-polea-dia5":{"reps":"18-20","rir":"2","weight":"2,5","note":""},"pajaros-peck-deck":{"reps":"15-16","rir":"2","weight":"10","note":"Subir carga tras completar el máximo del rango con margen adecuado."},"curl-biceps-polea":{"reps":"11-12","rir":"2","weight":"20","note":""},"extension-triceps-overhead":{"reps":"10","rir":"2","weight":"22,5","note":""},"pallof-press":{"reps":"13-15","rir":"técnico","weight":"10","note":"Priorizar ejecución técnica."},"abd-wheel":{"reps":"12","rir":"técnico","weight":"Peso corporal","note":"Priorizar ejecución técnica."}};

  function applyWeekTargets(){
    if(typeof plan==='undefined' || plan?.id!==PLAN_ID || !Array.isArray(routines)) return false;
    const week=String(typeof getWeek==='function'?getWeek():1);
    let changed=false;
    routines.forEach(r=>r.exercises?.forEach(e=>{
      if(week==='2' && WEEK2_TARGETS[e.key]){
        const t=WEEK2_TARGETS[e.key];
        e.weeklyReps=e.weeklyReps||{};
        e.weeklyRir=e.weeklyRir||{};
        e.weeklyWeight=e.weeklyWeight||{};
        e.weeklyTargetNote=e.weeklyTargetNote||{};
        if(e.weeklyReps['2']!==t.reps){e.weeklyReps['2']=t.reps;changed=true;}
        if(e.weeklyRir['2']!==t.rir){e.weeklyRir['2']=t.rir;changed=true;}
        if(e.weeklyWeight['2']!==t.weight){e.weeklyWeight['2']=t.weight;changed=true;}
        if((e.weeklyTargetNote['2']||'')!==(t.note||'')){e.weeklyTargetNote['2']=t.note||'';changed=true;}
      }
      if(e.weeklySets?.[week]!=null){
        const nextSets=Number(e.weeklySets[week]);
        if(Number(e.sets)!==nextSets){e.sets=nextSets;changed=true;}
      }
      if(e.weeklyReps?.[week] && e.reps!==e.weeklyReps[week]){e.reps=e.weeklyReps[week];changed=true;}
    }));
    return changed;
  }

  function activatePlan(){
    if(!isDavidSelected() || currentISO()<START_DATE) return false;
    if(typeof plan==='undefined' || typeof routines==='undefined') return false;

    let changed=false;
    if(plan?.id!==PLAN_ID){
      plan=JSON.parse(JSON.stringify(PLAN));
      routines=JSON.parse(JSON.stringify(ROUTINES));
      changed=true;
      if(typeof activeWorkout!=='undefined' && activeWorkout && activeWorkout.planId!==PLAN_ID){
        const hasSeries=activeWorkout.exercises?.some(e=>e.sets?.some(s=>s.completed));
        if(!hasSeries){
          activeWorkout=null;
          try{localStorage.removeItem(STORAGE.active);}catch(e){}
        }
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
    removeUpcomingCard();
    return true;
  }

  function patchTargets(){
    if(typeof getTargetRepRange==='function' && !getTargetRepRange.__nexusV213){
      const original=getTargetRepRange;
      const wrapped=function(key,week=getWeek(),fallback=''){
        if(plan?.id===PLAN_ID){
          const e=findProgramExercise(key);
          const v=e?.weeklyReps?.[String(week)];
          if(v) return v;
        }
        return original(key,week,fallback);
      };
      wrapped.__nexusV213=true;
      getTargetRepRange=wrapped;
    }

    if(typeof getTargetRir==='function' && !getTargetRir.__nexusV213){
      const original=getTargetRir;
      const wrapped=function(key,week=getWeek()){
        if(plan?.id===PLAN_ID){
          const e=findProgramExercise(key);
          const v=e?.weeklyRir?.[String(week)];
          if(v!==undefined && v!=='') return v;
        }
        return original(key,week);
      };
      wrapped.__nexusV213=true;
      getTargetRir=wrapped;
    }

    if(typeof getCurrentWeekWorkout==='function' && !getCurrentWeekWorkout.__nexusPlanScoped){
      const wrapped=function(routineId){
        const week=getWeek();
        return (workouts||[]).find(w=>w.planId===plan?.id && w.routineId===routineId && Number(w.mesocycleWeek)===Number(week)) || null;
      };
      wrapped.__nexusPlanScoped=true;
      getCurrentWeekWorkout=wrapped;
    }

    if(typeof previousWeekExercise==='function' && !previousWeekExercise.__nexusV213){
      const wrapped=function(routineId,key,currentWeek){
        const target=Number(currentWeek)-1;
        if(target<1) return null;
        for(const w of workouts||[]){
          if(w.planId!==plan.id || w.routineId!==routineId || Number(w.mesocycleWeek)!==target) continue;
          const e=w.exercises?.find(x=>x.key===key);
          if(e) return e;
        }
        return null;
      };
      wrapped.__nexusV213=true;
      previousWeekExercise=wrapped;
    }

    if(typeof startWorkout==='function' && !startWorkout.__nexusV213){
      const original=startWorkout;
      const wrapped=function(routineId){
        if(plan?.id===PLAN_ID) applyWeekTargets();
        return original(routineId);
      };
      wrapped.__nexusV213=true;
      startWorkout=wrapped;
    }
  }

  function ensureUpcomingCard(){
    if(!isDavidSelected() || currentISO()>=START_DATE || plan?.id===PLAN_ID) return;
    const summary=document.getElementById('mesocycleSummary');
    const host=summary?.closest('.card');
    if(!host || document.getElementById('nexusUpcomingMesocycle')) return;
    const card=document.createElement('div');
    card.id='nexusUpcomingMesocycle';
    card.className='card';
    card.innerHTML=`<div class="eyebrow" style="color:#2563eb">Próximo mesociclo · cargado</div><h3 style="margin:5px 0 7px">Hipertrofia general</h3><div class="muted small">31 ago – 27 sep · 4 semanas · RIR 3 → 2 → 1 → deload RIR 4</div><div class="small" style="margin-top:9px"><strong>Activación automática:</strong> 31/08/2026</div>`;
    host.insertAdjacentElement('afterend',card);
  }

  function removeUpcomingCard(){
    document.getElementById('nexusUpcomingMesocycle')?.remove();
  }

  function updateVersion(){ /* Version centralizada en polar-intelligence-v222.js */ }

  function tick(){
    patchTargets();
    updateVersion();
    if(!activatePlan()) ensureUpcomingCard();
  }

  function boot(){
    tick();
    let quick=0;
    const fast=setInterval(()=>{tick(); if(++quick>=15) clearInterval(fast);},1000);
    setInterval(tick,60000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible') tick();});
    document.addEventListener('click',e=>{
      if(e.target.closest?.('[data-profile]')) setTimeout(tick,350);
    },true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
