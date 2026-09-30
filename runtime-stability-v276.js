(() => {
  const START='2026-09-28', END='2026-10-04';
  const PROGRAM={
    C1:{type:'Calidad controlada',icon:'speed',training:`10-12' suave + 4 × 3' rápidos (rec. 2' trote suave) + 10' suave`,duration:'40-42 min'},
    C2:{type:'Rodaje Z2',icon:'endurance',training:`45-50' en Z2`,duration:'45-50 min'},
    C3:{type:'Montaña / resistencia específica',icon:'mountain',training:'14-16 km · Z1-Z2',duration:'14-16 km'}
  };

  function iso(){
    const d=new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function profile(){
    const gate=document.getElementById('profileGate');
    if(gate && !gate.classList.contains('hidden')) return null;
    const t=document.getElementById('profileSwitchBtn')?.textContent?.trim()?.toLowerCase();
    return (t==='david'||t==='ana')?t:null;
  }
  function extraActive(){const d=iso();return profile()==='david'&&d>=START&&d<=END}

  function forceView(id){
    document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));
    document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===id));
    try{
      if(id==='workoutView'&&typeof renderWorkout==='function')renderWorkout();
      if(id==='historyView'&&typeof renderHistory==='function')renderHistory();
    }catch(e){console.warn('Nexus v2.76 view render:',e)}
  }

  function installNav(){
    document.querySelectorAll('.nav button[data-view]').forEach(btn=>{
      if(btn.__nexusStableNav276)return;
      btn.__nexusStableNav276=true;
      btn.addEventListener('click',e=>{
        const id=btn.dataset.view;
        if(!id)return;
        forceView(id);
      },true);
    });
  }

  function done(code){
    try{
      return Array.isArray(activities)&&activities.some(a=>{
        const cn=a?.cardioNexus;
        if(!cn||cn.session!==code)return false;
        const date=String(a?.date||'');
        return cn.programId==='cardio-mesociclo-2-extra-2026-09-28'||(date>=START&&date<=END);
      });
    }catch(_){return false}
  }

  function ensureCardio(){
    let card=document.getElementById('nexusCardioWeekCard');
    if(!extraActive()){
      if(card?.dataset?.nexusStableCardio276==='1')card.remove();
      return;
    }
    const routineCard=document.getElementById('routineList')?.closest('.card');
    const lastCard=document.getElementById('lastWorkoutHome')?.closest('.card');
    if(!routineCard||!lastCard)return;

    if(!card){
      card=document.createElement('div');
      card.id='nexusCardioWeekCard';
      card.className='card nexus-cardio-week';
      lastCard.insertAdjacentElement('beforebegin',card);
    }
    card.dataset.nexusStableCardio276='1';
    card.style.display='block';
    card.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
        <div><h3 style="margin:0">Cardio</h3><div class="muted small" style="margin-top:3px">Mesociclo 2 (EXTRA)</div></div>
        <span class="pill">3 sesiones</span>
      </div>
      <div style="display:grid;gap:9px;margin-top:12px">
        ${Object.entries(PROGRAM).map(([code,s])=>{
          const completed=done(code);
          const icon=typeof svgIcon==='function'?svgIcon(s.icon):'';
          return `<div style="display:grid;grid-template-columns:42px 1fr auto;gap:10px;align-items:center;padding:11px;border:1px solid #e2e8f0;border-radius:14px;background:#fff">
            <div style="width:42px;height:42px;border-radius:13px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;color:#0f172a">${icon}</div>
            <div>
              <div style="font-size:13px;font-weight:900;color:#0f172a">${code} · ${s.type}</div>
              <div style="font-size:11px;color:#64748b;line-height:1.35;margin-top:2px">${s.training}</div>
            </div>
            <div style="font-size:10px;color:${completed?'#15803d':'#64748b'};font-weight:800;text-align:right;white-space:nowrap">${completed?'✓ Hecho':s.duration}</div>
          </div>`;
        }).join('')}
      </div>`;
  }

  function refresh(){
    installNav();
    ensureCardio();
  }

  window.addEventListener('nexus:profile-selected',()=>setTimeout(refresh,80));
  window.addEventListener('nexus:boot-complete',()=>setTimeout(refresh,80));
  window.addEventListener('focus',()=>setTimeout(refresh,80));
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(refresh,80)});

  refresh();
  let n=0;
  const fast=setInterval(()=>{refresh();if(++n>=30)clearInterval(fast)},500);
  setInterval(refresh,15000);
})();