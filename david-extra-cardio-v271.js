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
    if(typeof getCardioNexusSession!=='function'||getCardioNexusSession.__extraCardio271)return;
    const original=getCardioNexusSession;
    getCardioNexusSession=function(week,session){
      if(isDavid()&&inRange())return PROGRAM?.[session]||null;
      return original.apply(this,arguments);
    };
    getCardioNexusSession.__extraCardio271=true;
  }

  function patchPreview(){
    if(typeof renderCardioNexusPreview!=='function'||renderCardioNexusPreview.__extraCardio271)return;
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
    renderCardioNexusPreview.__extraCardio271=true;
  }

  function patchSave(){
    if(typeof saveActivity!=='function'||saveActivity.__extraCardio271)return;
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
    saveActivity.__extraCardio271=true;
  }

  function cardioDone(code){
    try{
      return Array.isArray(activities)&&activities.some(a=>{
        const cn=a?.cardioNexus;
        if(!cn||cn.session!==code)return false;
        const date=String(a?.date||'');
        return cn.programId==='cardio-mesociclo-2-extra-2026-09-28' || (date>=START&&date<=END);
      });
    }catch(_){return false}
  }

  function ensureHomeCard(){
    let card=document.getElementById('nexusCardioWeekCard');
    if(!isDavid()||!inRange()){
      if(card&&card.dataset?.nexusExtraCardio==='1')card.remove();
      return;
    }
    const routineCard=document.getElementById('routineList')?.closest('.card');
    if(!routineCard)return;
    const lastCard=document.getElementById('lastWorkoutHome')?.closest('.card');
    if(!card){
      card=document.createElement('div');
      card.id='nexusCardioWeekCard';
      card.className='card nexus-cardio-week';
      card.dataset.nexusExtraCardio='1';
      if(lastCard)lastCard.insertAdjacentElement('beforebegin',card);
      else routineCard.insertAdjacentElement('afterend',card);
    }
    card.dataset.nexusExtraCardio='1';
    card.style.display='block';
    card.innerHTML=`
      <div class="nexus-cardio-week-head" style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
        <div><h3 style="margin:0">Cardio</h3><div class="muted small" style="margin-top:3px">Mesociclo 2 (EXTRA)</div></div>
        <span class="pill">3 sesiones</span>
      </div>
      <div class="nexus-cardio-week-list" style="display:grid;gap:9px;margin-top:12px">
        ${['C1','C2','C3'].map(code=>{
          const s=PROGRAM[code],done=cardioDone(code);
          const icon=typeof svgIcon==='function'?svgIcon(s.icon):'';
          return `<div class="nexus-cardio-session" style="display:grid;grid-template-columns:42px 1fr auto;gap:10px;align-items:center;padding:11px;border:1px solid #e2e8f0;border-radius:14px;background:#fff">
            <div class="nexus-cardio-session-icon" style="width:42px;height:42px;border-radius:13px;background:#f1f5f9;display:flex;align-items:center;justify-content:center">${icon}</div>
            <div>
              <div class="nexus-cardio-session-title" style="font-size:13px;font-weight:900">${code} · ${typeof esc==='function'?esc(s.type):s.type}</div>
              <div class="nexus-cardio-session-training" style="font-size:11px;color:#64748b;line-height:1.35;margin-top:2px">${typeof esc==='function'?esc(s.training):s.training}</div>
              <div class="small muted" style="margin-top:3px">${typeof esc==='function'?esc(s.preferredDay):s.preferredDay}</div>
            </div>
            <div class="nexus-cardio-session-meta ${done?'nexus-cardio-done':''}" style="font-size:10px;font-weight:800;text-align:right;white-space:nowrap;${done?'color:#15803d':''}">${done?'✓ Hecho':s.duration}</div>
          </div>`;
        }).join('')}
      </div>`;
  }

  function updateRoutinePill(){
    if(!isDavid()||!inRange())return;
    const p=document.getElementById('routineList')?.closest('.card')?.querySelector('.pill');
    if(p)p.textContent='4 días';
  }

  function removeOldCard(){
    if(isDavid()&&iso()>='2026-09-28')document.getElementById('nexusCardioMeso2Card')?.remove();
  }

  function tick(){patchLookup();patchPreview();patchSave();removeOldCard();ensureHomeCard();updateRoutinePill()}
  function boot(){tick();let n=0;const f=setInterval(()=>{tick();if(++n>=20)clearInterval(f)},500);setInterval(tick,30000);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(tick,80)});window.addEventListener('focus',()=>setTimeout(tick,80))}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();