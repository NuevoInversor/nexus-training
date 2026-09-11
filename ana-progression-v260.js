(() => {
  const PLAN_ID='ana-fuerza-definicion-8s-2026-08-31';
  const T={
    '2':{
      'prensa-inclinada':['8','2-3','40','Aproximación 20 y 30 kg. Después 3 series efectivas con 40 kg.'],
      'peso-muerto-rumano-mancuernas':['10','2-3','16','Aproximación 8 kg. Después 3 series efectivas con 16 kg.'],
      'extension-cuadriceps':['12','2-3','20','Superserie A con Pallof press · 45-60 s tras la pareja.'],
      'curl-femoral-sentado':['9-10','2-3','5','Buscar 9-9-9 o 10-9-9. Superserie B con Gemelo.'],
      'aductores-maquina':['12-15','2-3','35','35 kg en las 3 series. Superserie C con Abducción.'],
      'gemelo-maquina':['12-15','2-3','20','Superserie B con Curl femoral · 45-60 s tras la pareja.'],
      'abduccion-cadera-maquina':['15-20','2-3','30','Mínimo 15 reps. Superserie C con Aductores · 45 s tras la pareja.'],
      'pallof-press-lower-a':['10-12/lado','2-3','5','Superserie A con Extensión de cuádriceps · 45-60 s tras la pareja.'],
      'jalon-pecho':['8-10','2-3','22,5 aprox.','Subir al menor incremento disponible; referencia ~22,5 kg.'],
      'remo-polea-baja':['9-10','2-3','20','Mantener carga y progresar repeticiones.'],
      'press-hombro-sentado':['8-10','2-3','7,5','Aproximación 5 kg. Después 3 series efectivas con 7,5 kg.'],
      'elevacion-lateral-unilateral-polea':['8-12','2-3','1,25 o inferior','No subir carga. Si existe una inferior, usar 12-15 reps; si 1,25 kg es el mínimo, 8-12 reps.'],
      'pullover-polea':['10-12','2-3','6,25','6,25 kg en las 3 series.'],
      'face-pull':['15','2-3','5','Buscar 15-15.'],
      'pajaros-peck-deck':['14-15','2-3','2,5','Mantener carga.'],
      'curl-biceps-polea':['10-12','2-3','5 o incremento pequeño','Subir solo si existe un incremento pequeño; si no, mantener 5 kg.'],
      'extension-triceps-polea':['11-12','2-3','5','Mantener carga.'],
      'farmer-walk':['35 s','2-3','20','3 series. Progresar tiempo; no aumentar carga y tiempo a la vez.'],
      'remo-maquina-apoyo':['10','2-3','12,5','Aproximación 10 kg. Después 3 series efectivas con 12,5 kg.'],
      'press-pecho-maquina-inclinada':['8-10','2-3','10','Aproximación 5 kg. Después 3 series efectivas con 10 kg.'],
      'goblet-squat':['10-12','2-3','16','Mantener como tercer ejercicio.'],
      'jalon-unilateral-polea':['10-12/lado','2-3','7,5','Aproximación 5 kg. Después 3 series efectivas con 7,5 kg.'],
      'elevaciones-laterales-upper-b':['13-15','2-3','3','Superserie A con Extensión de tríceps · 45 s tras la pareja.'],
      'extension-triceps-cuerda':['11-12','2-3','7,5','Superserie A con Elevaciones laterales · 45 s tras la pareja.'],
      'remo-alto-cuerda':['12-15','2-3','10','Superserie B con Curl martillo · 45 s tras la pareja.'],
      'curl-martillo':['11-12','2-3','5','Superserie B con Remo alto · 45 s tras la pareja.'],
      'aperturas-pecho-maquina':['15','2-3','5','Buscar 15-15. Superserie C con Pallof press · 45 s tras la pareja.'],
      'pallof-press-pie':['12/lado','2-3','5','2x12 por lado. Superserie C con Aperturas · 45 s tras la pareja.']
    },
    '3':{
      'step-up-alto':['8/lado','2','8','3x8 por lado. Hacer al principio y no subir carga.'],
      'prensa-unilateral':['10/lado','2','20','3x10 por lado.'],
      'pull-through-polea':['10-12','2','12-12,5 aprox.','Subir al menor incremento disponible; referencia ~12-12,5 kg.'],
      'patada-gluteo-polea':['13-14/lado','2','7,5','Mantener carga.'],
      'curl-femoral-sentado-lower-b':['10-12','2','siguiente escalón >12,5','Subir al siguiente escalón razonable de máquina.'],
      'abduccion-maquina-lower-b':['19-20','2-3','30','Mantener carga.'],
      'gemelo-pie-prensa':['14-15','2','20','Mantener carga.'],
      'suitcase-carry':['35 s/lado','2','12','3 series. No subir carga y tiempo simultáneamente.'],
      'woodchop-polea':['10/lado','2-3','2,5 o incremento pequeño','Mantener 2,5 kg si el siguiente salto es grande.']
    }
  };
  // Ana no completa necesariamente las cuatro rutinas dentro de una semana natural.
  // Lower B usa ya en semana 2 la progresión definida para su próxima vuelta,
  // sin modificar el entrenamiento ya guardado.
  Object.assign(T['2'],T['3']);
  const ORDER={
    '2':{
      'dia-1':['prensa-inclinada','peso-muerto-rumano-mancuernas','extension-cuadriceps','pallof-press-lower-a','curl-femoral-sentado','gemelo-maquina','aductores-maquina','abduccion-cadera-maquina'],
      'dia-4':['remo-maquina-apoyo','press-pecho-maquina-inclinada','goblet-squat','jalon-unilateral-polea','elevaciones-laterales-upper-b','extension-triceps-cuerda','remo-alto-cuerda','curl-martillo','aperturas-pecho-maquina','pallof-press-pie']
    }
  };

  function isAna(){
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='Ana' && (!gate || gate.classList.contains('hidden'));
  }
  function currentWeek(){try{return String(getWeek())}catch(_){return '1'}}
  function findExercise(key){
    for(const r of (typeof routines!=='undefined'&&Array.isArray(routines)?routines:[])){
      const e=r.exercises?.find(x=>x.key===key); if(e)return e;
    }
    return null;
  }
  function apply(){
    if(!isAna() || typeof plan==='undefined' || plan?.id!==PLAN_ID || typeof routines==='undefined' || !Array.isArray(routines))return false;
    const week=currentWeek(), targets=T[week]||{};
    let changed=false;
    plan.progressionRule='Doble progresión: primero aumentar repeticiones dentro del rango; al alcanzar el rango alto con el RIR objetivo, subir carga aproximadamente 2,5-5%. Descansos máximos de 60 s y accesorios 45-60 s. Las aproximaciones no cuentan como series efectivas. Si aumenta demasiado la fatiga, reducir antes una serie accesoria que aumentar descansos.';
    routines.forEach(r=>{
      if(r.estimatedDuration!=='50-55 min'){r.estimatedDuration='50-55 min';changed=true;}
      r.exercises?.forEach(e=>{
        const t=targets[e.key];
        if(t){
          e.weeklyReps=e.weeklyReps||{}; e.weeklyRir=e.weeklyRir||{}; e.weeklyWeight=e.weeklyWeight||{}; e.weeklyTargetNote=e.weeklyTargetNote||{};
          const [reps,rir,weight,note]=t;
          if(e.weeklyReps[week]!==reps){e.weeklyReps[week]=reps;changed=true;}
          if(e.weeklyRir[week]!==rir){e.weeklyRir[week]=rir;changed=true;}
          if(e.weeklyWeight[week]!==weight){e.weeklyWeight[week]=weight;changed=true;}
          if(e.weeklyTargetNote[week]!==note){e.weeklyTargetNote[week]=note;changed=true;}
          if(e.reps!==reps){e.reps=reps;changed=true;}
        }
        if(Number(e.rest)>60){e.rest=60;changed=true;}
      });
      const desired=ORDER[week]?.[r.id];
      if(desired){
        const pos=new Map(desired.map((k,i)=>[k,i])), before=r.exercises.map(e=>e.key).join('|');
        r.exercises.sort((a,b)=>(pos.has(a.key)?pos.get(a.key):999)-(pos.has(b.key)?pos.get(b.key):999));
        if(r.exercises.map(e=>e.key).join('|')!==before)changed=true;
      }
    });
    if(changed){
      try{localStorage.setItem(STORAGE.plan,JSON.stringify(plan));localStorage.setItem(STORAGE.routines,JSON.stringify(routines));}catch(_){}
      try{renderAll();}catch(_){}
    }
    return changed;
  }
  function patchRir(){
    if(typeof getTargetRir!=='function' || getTargetRir.__nexusAnaProgressionV260)return;
    const original=getTargetRir;
    getTargetRir=function(key,week=getWeek()){
      if(isAna() && plan?.id===PLAN_ID){const v=findExercise(key)?.weeklyRir?.[String(week)];if(v!==undefined&&v!=='')return v;}
      return original(key,week);
    };
    getTargetRir.__nexusAnaProgressionV260=true;
  }
  function boot(){
    patchRir();apply();
    let n=0;const quick=setInterval(()=>{patchRir();apply();if(++n>=20)clearInterval(quick)},750);
    setInterval(()=>{patchRir();apply()},30000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){patchRir();apply()}});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
