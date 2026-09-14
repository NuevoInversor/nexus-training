(() => {
  const PLAN_ID='hipertrofia-general-2026-08-31';
  const WEEK='3';
  const TARGETS={
    'press-banca':{reps:'7',rir:'1',weight:'15',note:'Mantener 15 kg/lado y progresar repeticiones antes de volver a subir carga.'},
    'remo-maquina':{reps:'10',rir:'1',weight:'27,5',note:'Mantener carga y completar 4x10.'},
    'press-inclinado':{reps:'10',rir:'1',weight:'20',note:'Mantener 20 kg y completar 3x10.'},
    'jalon-neutro':{reps:'10',rir:'1',weight:'40',note:'Aumentar a 40 kg tras completar el máximo del rango con margen en Semana 2.'},
    'elevaciones-laterales-polea':{reps:'16',rir:'1',weight:'2,5',note:'Mantener carga; no forzar el gran salto disponible en la polea.'},
    'curl-biceps':{reps:'12',rir:'1',weight:'12',note:'Mantener carga y completar 2x12.'},
    'extension-triceps-polea':{reps:'11',rir:'1',weight:'20',note:'Mantener carga y completar 2x11.'},

    'dominadas-asistidas':{reps:'7',rir:'1',weight:'14',note:'Mantener 14 kg de ayuda y completar 4x7.'},
    'press-militar':{reps:'7',rir:'1',weight:'6,25',note:'Mantener barra + 6,25 kg/lado. No aumentar carga ni repeticiones esta semana.'},
    'remo-polea-baja':{reps:'8-9',rir:'1',weight:'37,5 o 40',note:'Usar 37,5 kg si está disponible y buscar 3x9. Si el siguiente salto es 40 kg, comenzar con 3x8.'},
    'aperturas-maquina':{reps:'12',rir:'1',weight:'20',note:'Mantener carga y completar 3x12.'},
    'fondos-paralela':{reps:'10',rir:'1',weight:'Peso corporal',note:'Mantener peso corporal. Todavía sin lastre.'},
    'facepull':{reps:'15-17',rir:'1',weight:'20',note:'Subir a 20 kg y priorizar la técnica.'},

    'sentadilla-trasera':{reps:'8',rir:'1',weight:'22,5',note:'Mantener carga y completar 4x8.'},
    'prensa-inclinada':{reps:'12',rir:'1',weight:'27,5',note:'Mantener carga y completar 3x12.'},
    'extension-cuadriceps':{reps:'15',rir:'1',weight:'25',note:'Mantener carga y completar 3x15.'},
    'curl-femoral-tumbado':{reps:'10',rir:'1',weight:'17,5',note:'Aumentar a 17,5 kg y volver a 3x10.'},
    'gemelos-sentado':{reps:'14-15',rir:'2',weight:'37,5',note:'Mantener margen adicional por las sensaciones recientes del gemelo durante carrera.'},
    'plancha':{reps:'45-60 s',rir:'técnico',weight:'Sin carga',note:'Mantener 3x45-60 s y registrar la duración real de cada serie.'},

    'peso-muerto-rumano-dia4':{reps:'7-8',rir:'1',weight:'16,25',note:'Usar incremento pequeño a 16,25 kg/lado.'},
    'sentadilla-bulgara':{reps:'8',rir:'1-2',weight:'10',note:'Usar 10 kg/lado. Si el salto compromete estabilidad o técnica, volver a 7,5 kg y realizar 3x10 cerca de RIR 1.'},
    'hip-thrust':{reps:'10',rir:'1',weight:'23,65',note:'Mantener carga y completar 3x10.'},
    'curl-femoral-sentado':{reps:'11',rir:'1',weight:'32,5',note:'Mantener carga; no aumentarla hasta consolidar las repeticiones.'},
    'gemelos-prensa':{reps:'15',rir:'2',weight:'35',note:'Mantener 35 kg/lado y no llevar todavía el gemelo a RIR 1.'},
    'elevaciones-piernas':{reps:'15',rir:'2',weight:'Peso corporal',note:'Ejecución controlada.'},

    'dominadas':{reps:'4',rir:'1',weight:'Peso corporal',note:'Mantener 5x4. No forzar todavía 5 repeticiones.'},
    'elevaciones-laterales-polea-dia5':{reps:'19-20',rir:'1',weight:'2,5',note:'Mantener carga y progresar repeticiones.'},
    'pajaros-peck-deck':{reps:'15-16',rir:'1',weight:'10',note:'Consolidar el incremento de Semana 2 antes de volver a subir.'},
    'curl-biceps-polea':{reps:'10',rir:'1',weight:'22,5',note:'Subir a 22,5 kg tras completar el máximo del rango con margen.'},
    'extension-triceps-overhead':{reps:'11-12',rir:'1',weight:'22,5',note:'Mantener carga y progresar repeticiones.'},
    'pallof-press':{reps:'15',rir:'técnico',weight:'10',note:'Mantener 10 kg y completar 3x15 con ejecución técnica.'},
    'abd-wheel':{reps:'12',rir:'técnico',weight:'Peso corporal',note:'Mantener 3x12. Progresar mediante mayor control y recorrido, no añadiendo carga.'}
  };

  function isDavid(){
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='David' && (!gate || gate.classList.contains('hidden'));
  }

  function currentWeek(){
    try{return String(getWeek())}catch(_){return ''}
  }

  function apply(){
    if(!isDavid() || typeof plan==='undefined' || plan?.id!==PLAN_ID || typeof routines==='undefined' || !Array.isArray(routines)) return false;
    let changed=false;
    routines.forEach(r=>r.exercises?.forEach(e=>{
      const t=TARGETS[e.key];
      if(!t)return;
      e.weeklyReps=e.weeklyReps||{};
      e.weeklyRir=e.weeklyRir||{};
      e.weeklyWeight=e.weeklyWeight||{};
      e.weeklyTargetNote=e.weeklyTargetNote||{};
      if(e.weeklyReps[WEEK]!==t.reps){e.weeklyReps[WEEK]=t.reps;changed=true;}
      if(e.weeklyRir[WEEK]!==t.rir){e.weeklyRir[WEEK]=t.rir;changed=true;}
      if(e.weeklyWeight[WEEK]!==t.weight){e.weeklyWeight[WEEK]=t.weight;changed=true;}
      if(e.weeklyTargetNote[WEEK]!==t.note){e.weeklyTargetNote[WEEK]=t.note;changed=true;}
      if(currentWeek()===WEEK && e.reps!==t.reps){e.reps=t.reps;changed=true;}
    }));
    if(changed){
      try{
        if(typeof save==='function' && typeof STORAGE!=='undefined') save(STORAGE.routines,routines);
        else localStorage.setItem(STORAGE.routines,JSON.stringify(routines));
      }catch(_){}
      try{renderAll();}catch(_){}
    }
    return changed;
  }

  function boot(){
    apply();
    let n=0;
    const quick=setInterval(()=>{apply();if(++n>=20)clearInterval(quick)},500);
    setInterval(apply,30000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(apply,80)});
    window.addEventListener('focus',()=>setTimeout(apply,80));
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
