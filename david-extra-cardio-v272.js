(() => {
  const START='2026-09-28', END='2026-10-04';
  const PROGRAM={
    C1:{session:'C1',type:'Calidad controlada',visual:'cardio-c1',icon:'speed',
      training:`10-12' suave + 4 × 3' rápidos (rec. 2' trote suave) + 10' suave`,
      duration:'Aprox. 40-42 min',
      objective:'RPE 7 · ritmo orientativo 4:40-4:50 min/km. Empezar cerca de 4:50 y acelerar solo si sigue controlado.',
      notes:'No convertir la sesión en un test. Preferiblemente separar Upper B y C1 varias horas.',preferredDay:'Jueves 01/10'},
    C2:{session:'C2',type:'Rodaje Z2',visual:'cardio-c2',icon:'endurance',
      training:`45-50' en Z2`,duration:'45-50 min',
      objective:'Z2 · RPE 4. La frecuencia cardiaca determina la intensidad; ritmo libre.',
      notes:'Sin progresivos. Debe sentirse claramente más fácil que C1 y dejar buenas piernas para el sábado.',preferredDay:'Viernes 02/10'},
    C3:{session:'C3',type:'Montaña / resistencia específica',visual:'cardio-c3',icon:'mountain',
      training:'14-16 km · Z1-Z2',duration:'14-16 km',
      objective:'RPE 4-5. Trabajo específico para la marcha de 50 km sin generar fatiga excesiva antes del pádel del lunes.',
      notes:'Ritmo sostenible. No buscar velocidad. Practicar hidratación y alimentación si la duración lo justifica.',preferredDay:'Sábado 03/10'}
  };
  const iso=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
  const inRange=()=>iso()>=START&&iso()<=END;
  const isDavid=()=>{
    try{if(localStorage.getItem('nexus_local_profile_v29')==='david')return true}catch(_){}
    const g=document.getElementById('profileGate'),b=document.getElementById('profileSwitchBtn');
    return !!b&&b.textContent.trim()==='David'&&(!g||g.classList.contains('hidden'));
  };

  function patchLookup(){
    if(typeof getCardioNexusSession!=='function'||getCardioNexusSession.__extraCardio272)return;
    const original=getCardioNexusSession;
    getCardioNexusSession=function(week,session){
      if(isDavid()&&inRange())return PROGRAM?.[session]||null;
      return original.apply(this,arguments);
    };
    getCardioNexusSession.__extraCardio272=true;
  }

  function patchPreview(){
    if(typeof renderCardioNexusPreview!=='function'||renderCardioNexusPreview.__extraCardio272)return;
    const original=renderCardioNexusPreview;
    renderCardioNexusPreview=function(){
      const result=original.apply(this,arguments);
      if(!isDavid()||!inRange()||!document.getElementById('cardioNexusToggle')?.checked)return result;
      const s=PROGRAM?.[document.getElementById('cardioSessionInput')?.value];
      const p=document.getElementById('cardioNexusPreview');
      if(!s||!p)return result;
      p.innerHTML=`
        <div class="cardio-preview-title">${typeof svgIcon==='function'?svgIcon(s.icon):''} Mesociclo 2 (EXTRA) · ${s.session} · ${s.type}</div>
        <div class="small"><strong>Entrenamiento:</strong> ${esc(s.training)}</div>
        <div class="small" style="margin-top:6px"><strong>Referencia:</strong> ${esc(s.duration)}</div>
        <div class="small" style="margin-top:6px"><strong>Intensidad / objetivo:</strong> ${esc(s.objective)}</div>
        <div class="small" style="margin-top:6px"><strong>Día:</strong> ${esc(s.preferredDay)}</div>
        <div class="small" style="margin-top:6px"><strong>Nota:</strong> ${esc(s.notes)}</div>`;
      return result;
    };
    renderCardioNexusPreview.__extraCardio272=true;
  }

  function patchSave(){
    if(typeof saveActivity!=='function'||saveActivity.__extraCardio272)return;
    const original=saveActivity;
    saveActivity=function(){
      const enabled=isDavid()&&inRange()&&document.getElementById('cardioNexusToggle')?.checked;
      const code=document.getElementById('cardioSessionInput')?.value;
      const before=Array.isArray(activities)?activities.length:0;
      const result=original.apply(this,arguments);
      const s=enabled?PROGRAM?.[code]:null;
      if(s&&Array.isArray(activities)&&activities.length>before){
        const a=activities.find(x=>x.cardioNexus?.session===code&&!x.cardioNexus?.programId)||activities[activities.length-1];
        if(a?.cardioNexus){
          a.cardioNexus.programId='cardio-mesociclo-2-extra-2026-09-28';
          a.cardioNexus.programName='Cardio - Mesociclo 2 (EXTRA)';
          a.cardioNexus.notes=s.notes;
          a.cardioNexus.preferredDay=s.preferredDay;
          try{if(typeof save==='function')save(STORAGE.activities,activities);else localStorage.setItem(STORAGE.activities,JSON.stringify(activities))}catch(_){}
        }
      }
      return result;
    };
    saveActivity.__extraCardio272=true;
  }

  function removeOldCard(){
    if(isDavid()&&iso()>='2026-09-28')document.getElementById('nexusCardioMeso2Card')?.remove();
  }

  function tick(){patchLookup();patchPreview();patchSave();removeOldCard()}
  function boot(){tick();let n=0;const f=setInterval(()=>{tick();if(++n>=20)clearInterval(f)},500);setInterval(tick,30000);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(tick,80)});window.addEventListener('focus',()=>setTimeout(tick,80))}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();