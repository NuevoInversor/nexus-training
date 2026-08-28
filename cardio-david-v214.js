(() => {
  const VERSION='v2.14';
  const STAMP='28/08/2026 08:00:00';
  const START_DATE='2026-08-31';
  const END_DATE='2026-09-27';

  const PROGRAM={
    1:{
      C1:{session:'C1',type:'Calidad',visual:'cardio-c1',icon:'speed',
        training:`12' calentamiento + 5 × 3' rápido (rec. 2' trote) + 10' vuelta a la calma`,
        duration:'Aprox. 57 min',objective:'RPE 7-7,5. Mantener esfuerzo controlado, sin apurar: esta semana incluye el C3 largo.',
        notes:'Semana con C3 largo. Mantener esfuerzo controlado, sin apurar.'},
      C2:{session:'C2',type:'Rodaje Z2',visual:'cardio-c2',icon:'endurance',
        training:`60' en Z2`,duration:'60 min',objective:'Z2 · RPE 4-5. La frecuencia cardiaca determina la intensidad; el ritmo no es objetivo.',
        notes:'Si la FC sube por encima del rango, reducir el ritmo.'},
      C3:{session:'C3',type:'Montaña / resistencia específica',visual:'cardio-c3',icon:'mountain',
        training:'22-24 km · Z1-Z2',duration:'22-24 km',objective:'RPE 4-5. Tirada larga principal del mesociclo. Priorizar esfuerzo sostenible.',
        notes:'Practicar hidratación, alimentación y material.'}
    },
    2:{
      C1:{session:'C1',type:'Calidad',visual:'cardio-c1',icon:'speed',
        training:`12' calentamiento + 5 × 5' rápido (rec. 2' trote) + 10' vuelta a la calma`,
        duration:'Aprox. 65 min',objective:'RPE 7,5-8. Priorizar calidad y control del esfuerzo.',
        notes:'No sprintar. Si el rendimiento cae claramente entre repeticiones, reducir intensidad.'},
      C2:{session:'C2',type:'Rodaje Z2',visual:'cardio-c2',icon:'endurance',
        training:`65' en Z2 + 4 × 20" progresivos (rec. 60")`,duration:'65 min + progresivos',objective:'Z2 · RPE 4-5. La frecuencia cardiaca determina la intensidad; el ritmo se adapta libremente.',
        notes:'El ritmo se registra únicamente como dato de evolución.'},
      C3:{session:'C3',type:'Montaña / resistencia específica',visual:'cardio-c3',icon:'mountain',
        training:'14-16 km · Z1-Z2',duration:'14-16 km',objective:'RPE 4-5. Mantener especificidad sin buscar fatiga alta.',
        notes:'Día preferente: viernes.',preferredDay:'Viernes'}
    },
    3:{
      C1:{session:'C1',type:'Calidad',visual:'cardio-c1',icon:'speed',
        training:`12-15' calentamiento + 4 × 8' (rec. 2'30" trote) + 10' vuelta a la calma`,
        duration:'Aprox. 62-65 min',objective:'RPE 7,5-8. Mantener un rendimiento estable entre repeticiones.',
        notes:'No sprintar. Reducir intensidad si el rendimiento cae claramente.'},
      C2:{session:'C2',type:'Rodaje Z2',visual:'cardio-c2',icon:'endurance',
        training:`70' en Z2 + 4 × 20" progresivos opcionales`,duration:'70 min',objective:'Z2 · RPE 4-5. Priorizar frecuencia cardiaca y RPE sobre el ritmo.',
        notes:'Los progresivos son opcionales.'},
      C3:{session:'C3',type:'Montaña / resistencia específica',visual:'cardio-c3',icon:'mountain',
        training:'16-18 km · Z1-Z2',duration:'16-18 km',objective:'RPE 4-5. Sesión moderada; mantener esfuerzo sostenible.',
        notes:'Día preferente: viernes.',preferredDay:'Viernes'}
    },
    4:{
      C1:{session:'C1',type:'Calidad · descarga',visual:'cardio-c1',icon:'speed',
        training:`10-12' calentamiento + 6 × (2' rápido + 2' suave) + 10' vuelta a la calma`,
        duration:'Aprox. 44-46 min',objective:'RPE 7. Descarga: estímulo controlado, sin apurar.',
        notes:'Semana de descarga.'},
      C2:{session:'C2',type:'Rodaje Z2 · descarga',visual:'cardio-c2',icon:'endurance',
        training:`50-55' en Z2`,duration:'50-55 min',objective:'Z2 · RPE 4. Descarga.',
        notes:'Sin objetivo de ritmo.'},
      C3:{session:'C3',type:'Montaña / resistencia específica · descarga',visual:'cardio-c3',icon:'mountain',
        training:'12-15 km',duration:'12-15 km',objective:'RPE 3-4. Descarga.',
        notes:'Sin objetivo de ritmo ni desnivel.'}
    }
  };

  const GENERAL_RULES={
    C1:'Priorizar calidad y control del esfuerzo. No sprintar. Si el rendimiento cae claramente entre repeticiones, reducir intensidad.',
    C2:'Priorizar frecuencia cardiaca y RPE sobre el ritmo. El ritmo se adapta libremente para permanecer en Z2.',
    C3:'Priorizar tiempo de exposición, tolerancia de piernas y esfuerzo sostenible. Velocidad y desnivel son secundarios. Evitar colocar C3 largo pegado a Lower B si es posible.',
    fatigue:'Si la fatiga general es ≥7/10 o las piernas están muy cargadas: reducir volumen del C1, acortar C2 un 10-20% y reducir distancia de C3. No compensar sesiones perdidas acumulando cardio en días posteriores.'
  };

  function isDavidSelected(){
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='David' && (!gate || gate.classList.contains('hidden'));
  }

  function isoToday(){
    const d=new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function isActive(){
    const today=isoToday();
    return isDavidSelected() && today>=START_DATE && today<=END_DATE;
  }

  function patchSessionLookup(){
    if(typeof getCardioNexusSession!=='function' || getCardioNexusSession.__nexusV214) return;
    const original=getCardioNexusSession;
    const wrapped=function(week,session){
      if(isActive()) return PROGRAM?.[Number(week)]?.[session] || null;
      return original(week,session);
    };
    wrapped.__nexusV214=true;
    getCardioNexusSession=wrapped;
  }

  function patchPreview(){
    if(typeof renderCardioNexusPreview!=='function' || renderCardioNexusPreview.__nexusV214) return;
    const original=renderCardioNexusPreview;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      if(!isActive()) return result;
      const enabled=document.getElementById('cardioNexusToggle')?.checked;
      if(!enabled) return result;
      const week=document.getElementById('cardioWeekInput')?.value;
      const code=document.getElementById('cardioSessionInput')?.value;
      const s=PROGRAM?.[Number(week)]?.[code];
      const preview=document.getElementById('cardioNexusPreview');
      if(!s || !preview) return result;
      preview.innerHTML=`
        <div class="cardio-preview-title">${typeof svgIcon==='function'?svgIcon(s.icon):''} Semana ${week} · ${s.session} · ${s.type}</div>
        <div class="small"><strong>Entrenamiento:</strong> ${esc(s.training)}</div>
        <div class="small" style="margin-top:6px"><strong>Referencia:</strong> ${esc(s.duration)}</div>
        <div class="small" style="margin-top:6px"><strong>Intensidad / objetivo:</strong> ${esc(s.objective)}</div>
        ${s.preferredDay?`<div class="small" style="margin-top:6px"><strong>Día preferente:</strong> ${esc(s.preferredDay)}</div>`:''}
        ${s.notes?`<div class="small" style="margin-top:6px"><strong>Nota:</strong> ${esc(s.notes)}</div>`:''}
        <div class="small muted" style="margin-top:9px"><strong>Regla ${s.session}:</strong> ${esc(GENERAL_RULES[s.session])}</div>
      `;
      return result;
    };
    wrapped.__nexusV214=true;
    renderCardioNexusPreview=wrapped;
  }

  function patchSaveActivity(){
    if(typeof saveActivity!=='function' || saveActivity.__nexusV214) return;
    const original=saveActivity;
    const wrapped=function(){
      const active=isActive() && document.getElementById('cardioNexusToggle')?.checked;
      const week=document.getElementById('cardioWeekInput')?.value;
      const code=document.getElementById('cardioSessionInput')?.value;
      const s=active?PROGRAM?.[Number(week)]?.[code]:null;
      const before=Array.isArray(activities)?activities.length:0;
      const result=original.apply(this,arguments);
      if(s && Array.isArray(activities) && activities.length>before){
        const a=activities.find(x=>x.cardioNexus && Number(x.cardioNexus.week)===Number(week) && x.cardioNexus.session===code) || activities[activities.length-1];
        if(a?.cardioNexus){
          a.cardioNexus.programId='cardio-mesociclo-2-2026-08-31';
          a.cardioNexus.programName='Cardio - Mesociclo 2';
          a.cardioNexus.notes=s.notes||'';
          a.cardioNexus.preferredDay=s.preferredDay||'';
          a.cardioNexus.generalRule=GENERAL_RULES[code];
          a.cardioNexus.fatigueAdjustment=GENERAL_RULES.fatigue;
          try{localStorage.setItem(STORAGE.activities,JSON.stringify(activities));}catch(e){}
        }
      }
      return result;
    };
    wrapped.__nexusV214=true;
    saveActivity=wrapped;
  }

  function ensureCard(){
    if(!isDavidSelected()) return;
    const existing=document.getElementById('nexusCardioMeso2Card');
    const summary=document.getElementById('mesocycleSummary');
    const base=document.getElementById('nexusUpcomingMesocycle') || summary?.closest('.card');
    if(!base) return;

    if(existing) return;
    const card=document.createElement('div');
    card.id='nexusCardioMeso2Card';
    card.className='card';
    const active=isActive();
    card.innerHTML=`
      <div class="eyebrow" style="color:#2563eb">${active?'Cardio Nexus · Mesociclo 2':'Próximo cardio · cargado'}</div>
      <h3 style="margin:5px 0 7px">Cardio - Mesociclo 2</h3>
      <div class="muted small">31 ago – 27 sep · C1 Calidad · C2 Z2 · C3 Montaña / resistencia específica</div>
      <div class="small" style="margin-top:9px"><strong>${active?'Estado':'Activación automática'}:</strong> ${active?'Activo':'31/08/2026'}</div>
      <div class="small" style="margin-top:8px"><strong>Ajuste por fatiga:</strong> si la fatiga es ≥7/10 o las piernas están muy cargadas, reducir el volumen; no acumular sesiones perdidas.</div>
    `;
    base.insertAdjacentElement('afterend',card);
  }

  function removeCardForOtherProfile(){
    if(!isDavidSelected()) document.getElementById('nexusCardioMeso2Card')?.remove();
  }

  function updateVersion(){
    const v=document.querySelector('header .version');
    if(v) v.textContent=`Training - ${VERSION} (${STAMP})`;
    document.title=`Nexus Training ${VERSION}`;
  }

  function tick(){
    patchSessionLookup();
    patchPreview();
    patchSaveActivity();
    updateVersion();
    removeCardForOtherProfile();
    ensureCard();
  }

  function boot(){
    tick();
    let n=0;
    const fast=setInterval(()=>{tick();if(++n>=15)clearInterval(fast);},1000);
    setInterval(tick,60000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')tick();});
    document.addEventListener('click',e=>{if(e.target.closest?.('[data-profile]'))setTimeout(tick,350);},true);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
