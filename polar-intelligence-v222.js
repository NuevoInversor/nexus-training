(() => {
  const VERSION='v2.40';
  const STAMP='02/09/2026 20:01:00';
  const CFG=window.NEXUS_CLOUD||{};
  const BASE=(CFG.url||'').replace(/\/$/,'')+'/functions/v1';
  const BOOT_KEY='nexus_polar_v222_bootstrap';
  const POLAR_IMPORT_FROM='2026-09-01';
  let syncLock=false;

  function profileId(){
    const t=document.getElementById('profileSwitchBtn')?.textContent?.trim()?.toLowerCase();
    return (t==='david'||t==='ana')?t:null;
  }

  async function getSession(){
    try{
      if(!window.supabase||!CFG.url||!CFG.publishableKey)return null;
      const client=window.supabase.createClient(CFG.url,CFG.publishableKey);
      const {data}=await client.auth.getSession();
      return data?.session||null;
    }catch(_){return null}
  }

  async function api(body){
    const session=await getSession();
    if(!session) throw new Error('Nexus Cloud no conectado.');
    const r=await fetch(BASE+'/polar-api',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+session.access_token,
        'apikey':CFG.publishableKey
      },
      body:JSON.stringify(body||{})
    });
    const x=await r.json().catch(()=>({}));
    if(!r.ok) throw new Error(x.error||('Error '+r.status));
    return x;
  }

  function ensureStyle(){
    if(document.getElementById('polarIntelV222Style'))return;
    const s=document.createElement('style');
    s.id='polarIntelV222Style';
    s.textContent=`
      .nexus-readiness{border:1px solid #dbe3ee;background:linear-gradient(180deg,#fff,#f8fafc);padding:14px 16px}
      .nexus-rest-summary{display:flex;align-items:center;justify-content:space-between;gap:12px}
      .nexus-rest-main{display:flex;align-items:center;gap:12px;min-width:0}
      .nexus-rest-icon{width:46px;height:46px;border:0;border-radius:15px;display:flex;align-items:center;justify-content:center;padding:0;flex:0 0 auto;box-shadow:inset 0 0 0 1px rgba(15,23,42,.06)}
      .nexus-rest-icon svg{width:25px;height:25px}
      .nexus-rest-icon.good{background:#dcfce7;color:#15803d}
      .nexus-rest-icon.warn{background:#ffedd5;color:#c2410c}
      .nexus-rest-icon.bad{background:#fee2e2;color:#b91c1c}
      .nexus-rest-icon.neutral{background:#f1f5f9;color:#64748b}
      .nexus-rest-title{font-size:15px;font-weight:900;letter-spacing:-.01em;color:#0f172a}
      .nexus-rest-sub{font-size:11px;color:#64748b;font-weight:750;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .nexus-rest-chevron{font-size:18px;color:#94a3b8;transition:transform .18s ease}
      .nexus-readiness.open .nexus-rest-chevron{transform:rotate(180deg)}
      .nexus-readiness-date{font-size:11px;color:var(--muted);font-weight:800}
      .nexus-readiness-advice{margin-top:10px;padding:10px 12px;border-radius:12px;background:#eff6ff;color:#1e3a8a;font-size:12px;line-height:1.45;font-weight:800}
      .nexus-readiness-details{display:none;margin-top:12px;padding-top:12px;border-top:1px solid #e2e8f0}
      .nexus-readiness.open .nexus-readiness-details{display:block}
      .nexus-readiness-grid{display:grid;grid-template-columns:1fr;gap:8px}
      .nexus-readiness-row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 11px;border:1px solid #e2e8f0;border-radius:12px;background:#fff}
      .nexus-readiness-label{font-size:13px;font-weight:900;color:#0f172a}
      .nexus-readiness-value{font-size:12px;color:#475569;text-align:right;font-weight:750}
      .nexus-readiness-conclusion{margin-top:10px;padding:11px 12px;border-radius:12px;background:#eff6ff;color:#1e3a8a;font-size:12px;line-height:1.45;font-weight:750}
      .nexus-readiness-detail{margin-top:8px;font-size:11px;color:#64748b;line-height:1.45}
      .polar-source-badge{display:inline-flex;align-items:center;gap:5px;margin-top:8px;padding:4px 7px;border-radius:999px;background:#f1f5f9;color:#475569;font-size:10px;font-weight:850}
      .polar-history-block{margin-top:12px;padding:12px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc}
      .polar-history-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 12px;margin-top:8px;font-size:12px}
      @media(min-width:560px){.nexus-readiness-grid{grid-template-columns:1fr 1fr 1fr}}
    `;
    document.head.appendChild(s);
  }

  function ensureCard(){
    ensureStyle();
    let card=document.getElementById('nexusReadinessCard');
    const hero=document.querySelector('#homeView .hero');
    if(!hero)return card||null;
    const needsRebuild=!card || !card.querySelector('#nexusRestToggle');
    if(!card){
      card=document.createElement('div');
      card.className='card nexus-readiness';
      card.id='nexusReadinessCard';
    }
    if(!needsRebuild)return card;
    card.className='card nexus-readiness';
    card.innerHTML=`
      <div class="nexus-rest-summary">
        <div class="nexus-rest-main">
          <button class="nexus-rest-icon neutral" id="nexusRestToggle" type="button" aria-expanded="false" aria-controls="nexusReadinessDetails" aria-label="Ver detalle del descanso">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 7v10"/><path d="M21 10v7"/><path d="M3 13h18"/><path d="M7 13V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v5"/><path d="M3 17h18"/>
            </svg>
          </button>
          <div style="min-width:0">
            <div class="nexus-rest-title" id="nexusRestTitle">Descanso</div>
            <div class="nexus-rest-sub" id="nexusRestSub">Cargando datos de Polar…</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="nexus-readiness-date" id="nexusReadinessDate">—</div>
          <div class="nexus-rest-chevron">⌄</div>
        </div>
      </div>
      <div class="nexus-readiness-advice" id="nexusReadinessAdvice">Analizando recuperación…</div>
      <div class="nexus-readiness-details" id="nexusReadinessDetails">
        <div id="nexusReadinessBody"><div class="small muted">Cargando recuperación…</div></div>
      </div>
    `;
    if(!card.isConnected) hero.insertAdjacentElement('afterend',card);
    const toggle=document.getElementById('nexusRestToggle');
    const summary=card.querySelector('.nexus-rest-summary');
    const flip=()=>{const open=card.classList.toggle('open');toggle?.setAttribute('aria-expanded',String(open));};
    if(toggle)toggle.onclick=flip;
    if(summary)summary.addEventListener('click',e=>{if(e.target.closest('#nexusRestToggle'))return;flip();});
    return card;
  }

  function median(values){
    const a=values.filter(Number.isFinite).sort((x,y)=>x-y);
    if(!a.length)return null;
    const m=Math.floor(a.length/2);
    return a.length%2?a[m]:(a[m-1]+a[m])/2;
  }

  function pct(n){return Number.isFinite(n)?Math.round(n):null}

  function recoveryLabel(v){
    v=Number(v);
    if(v>=6)return'Muy buena';
    if(v>=5)return'Buena';
    if(v>=4)return'Normal';
    if(v>=3)return'Moderada';
    return'Baja';
  }

  function sleepLabel(score){
    score=Number(score);
    if(!Number.isFinite(score))return'Registrado';
    if(score>=85)return'Muy bueno';
    if(score>=70)return'Bueno';
    if(score>=55)return'Normal';
    return'Bajo';
  }

  function loadLabel(ratio){
    if(!Number.isFinite(ratio))return'Moderada';
    if(ratio>=1.35)return'Alta';
    if(ratio<=0.70)return'Baja';
    return'Moderada';
  }

  function parseSeconds(v){
    if(v==null)return null;
    if(typeof v==='number')return v;
    const s=String(v);
    if(/^\d+(\.\d+)?s$/.test(s))return Number(s.slice(0,-1));
    const m=s.match(/^PT(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?$/i);
    if(m)return Number(m[1]||0)*3600+Number(m[2]||0)*60+Number(m[3]||0);
    return null;
  }

  function fmtDurationMs(ms){
    const min=Math.max(0,Math.round(Number(ms||0)/60000));
    const h=Math.floor(min/60),m=min%60;
    return h? (m? `${h} h ${m} min`:`${h} h`) : `${m} min`;
  }

  function fmtSeconds(sec){
    if(!Number.isFinite(sec))return null;
    const min=Math.round(sec/60),h=Math.floor(min/60),m=min%60;
    return h? `${h} h ${String(m).padStart(2,'0')} min`:`${m} min`;
  }

  function addDays(iso,n){
    const d=new Date(iso+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+n);
    return d.toISOString().slice(0,10);
  }

  function buildReadiness(latest){
    ensureCard();
    const body=document.getElementById('nexusReadinessBody');
    const dateEl=document.getElementById('nexusReadinessDate');
    const restTitle=document.getElementById('nexusRestTitle');
    const restSub=document.getElementById('nexusRestSub');
    const restIcon=document.getElementById('nexusRestToggle');
    const advice=document.getElementById('nexusReadinessAdvice');
    if(!latest){
      dateEl.textContent='Sin datos';
      if(restTitle)restTitle.textContent='Descanso';
      if(restSub)restSub.textContent='Sin datos de Polar';
      if(restIcon)restIcon.className='nexus-rest-icon neutral';
      if(advice)advice.textContent='Conecta y sincroniza Polar para calcular tu estado diario.';
      body.innerHTML='<div class="small muted">Conecta y sincroniza Polar para calcular tu estado diario.</div>';
      return;
    }

    const recharge=latest.nightly_recharge?.nightlyRechargeResults||[];
    const sorted=[...recharge].filter(x=>x?.sleepResultDate).sort((a,b)=>String(a.sleepResultDate).localeCompare(String(b.sleepResultDate)));
    const today=sorted.at(-1)||null;
    const date=today?.sleepResultDate||latest.data_date||'';
    dateEl.textContent=date?new Date(date+'T12:00:00').toLocaleDateString('es-ES',{day:'2-digit',month:'short'}):'—';

    const indicator=Number(today?.recoveryIndicator);
    const rmssd=Number(today?.meanNightlyRecoveryRmssd);
    const baselineRmssd=median(sorted.slice(-15,-1).map(x=>Number(x?.meanNightlyRecoveryRmssd)));
    const rmssdDelta=(Number.isFinite(rmssd)&&Number.isFinite(baselineRmssd)&&baselineRmssd>0)?((rmssd-baselineRmssd)/baselineRmssd*100):null;

    const detailed=latest.sleep?.latestDetailed?.nightSleeps?.[0]||null;
    const sleepScore=Number(detailed?.sleepScore?.sleepScore);
    const asleepSec=parseSeconds(detailed?.sleepEvaluation?.asleepDuration);
    const sleepDate=detailed?.sleepDate || latest.sleep?.nightSleeps?.at?.(-1)?.sleepDate || null;
    const sleepQty=[
      fmtSeconds(asleepSec),
      Number.isFinite(sleepScore)?`Score ${Math.round(sleepScore)}`:null
    ].filter(Boolean).join(' · ') || (sleepDate?`registro ${sleepDate.split('-').reverse().join('/')}`:'sin detalle');

    const sessions=latest.training_sessions?.trainingSessions||[];
    const refDate=date||latest.data_date;
    const start7=addDays(refDate,-6), start28=addDays(refDate,-27), prevEnd=addDays(refDate,-7);
    const inRange=(s,a,b)=>{const d=String(s?.startTime||'').slice(0,10);return d>=a&&d<=b};
    const last7=sessions.filter(s=>inRange(s,start7,refDate));
    const prev21=sessions.filter(s=>inRange(s,start28,prevEnd));
    const dur7=last7.reduce((a,s)=>a+Number(s?.durationMillis||0),0);
    const prevWeekly=prev21.reduce((a,s)=>a+Number(s?.durationMillis||0),0)/3;
    const loadRatio=prevWeekly>0?dur7/prevWeekly:null;
    const loadText=`${last7.length} sesiones · ${fmtDurationMs(dur7)}`;

    const recText=Number.isFinite(indicator)?`${Math.round(indicator)}/6${Number.isFinite(rmssd)?' · RMSSD '+Math.round(rmssd)+' ms':''}`:(Number.isFinite(rmssd)?`RMSSD ${Math.round(rmssd)} ms`:'sin dato');

    const flags=[];
    if(Number.isFinite(indicator)&&indicator<=2)flags.push('recuperación baja');
    if(Number.isFinite(rmssdDelta)&&rmssdDelta<=-20)flags.push('HRV por debajo de tu referencia');
    if(Number.isFinite(sleepScore)&&sleepScore<55)flags.push('sueño bajo');
    if(Number.isFinite(loadRatio)&&loadRatio>=1.35)flags.push('carga reciente alta');

    let restTone='warn';
    let restWord='Normal';
    if((Number.isFinite(indicator)&&indicator<=2)||(Number.isFinite(sleepScore)&&sleepScore<55)||flags.length>=2){
      restTone='bad'; restWord='Bajo';
    }else if((Number.isFinite(indicator)&&indicator>=5)&&(Number.isFinite(sleepScore)&&sleepScore>=70)&&( !Number.isFinite(rmssdDelta) || rmssdDelta>-20 )){
      restTone='good'; restWord='Bueno';
    }
    if(restTitle)restTitle.textContent=`Descanso: ${restWord}`;
    if(restSub)restSub.textContent=[
      Number.isFinite(sleepScore)?`Sueño ${Math.round(sleepScore)}/100`:null,
      Number.isFinite(indicator)?`Recuperación ${Math.round(indicator)}/6`:null
    ].filter(Boolean).join(' · ')||'Datos de Polar';
    if(restIcon)restIcon.className=`nexus-rest-icon ${restTone}`;

    let conclusion='Sin señales claras para modificar el entrenamiento previsto.';
    if(flags.length>=2) conclusion='Hay varias señales de fatiga. Conviene priorizar sensaciones y plantear reducir intensidad o volumen.';
    else if(flags.length===1) conclusion=`Vigilar hoy: ${flags[0]}. Mantén el plan si las sensaciones acompañan; si no, ajustamos.`;
    else if(Number.isFinite(indicator)&&indicator>=5) conclusion='La recuperación es favorable. Mantén el entrenamiento previsto sin añadir carga extra por ello.';

    const trend=Number.isFinite(rmssdDelta)?`RMSSD vs referencia ~14 noches: ${rmssdDelta>=0?'+':''}${pct(rmssdDelta)}%.`:'Aún construyendo referencia individual de HRV.';
    if(advice) advice.textContent=conclusion;

    body.innerHTML=`
      <div class="nexus-readiness-grid">
        <div class="nexus-readiness-row"><span class="nexus-readiness-label">Recuperación: ${recoveryLabel(indicator)}</span><span class="nexus-readiness-value">(${recText})</span></div>
        <div class="nexus-readiness-row"><span class="nexus-readiness-label">Sueño: ${sleepLabel(sleepScore)}</span><span class="nexus-readiness-value">(${sleepQty})</span></div>
        <div class="nexus-readiness-row"><span class="nexus-readiness-label">Carga reciente: ${loadLabel(loadRatio)}</span><span class="nexus-readiness-value">(${loadText})</span></div>
      </div>
      <div class="nexus-readiness-detail">${trend} La interpretación Nexus combina tendencia, carga y datos de Polar; no cambia el plan automáticamente.</div>
    `;
  }

  function sportType(session){
    const id=String(session?.sport?.id??'');
    if(id==='1' || id==='17')return'run';
    if(id==='3')return'hike';
    return'other';
  }

  function sessionId(s){return String(s?.identifier?.id||s?.exercises?.[0]?.identifier?.id||'');}

  function polarPayload(s){
    return {
      sessionId:sessionId(s),
      sportId:String(s?.sport?.id??''),
      startTime:s?.startTime||null,
      stopTime:s?.stopTime||null,
      durationMillis:Number(s?.durationMillis||0),
      distanceMeters:Number(s?.distanceMeters||0),
      calories:Number(s?.calories||0),
      hrAvg:Number(s?.hrAvg||0)||null,
      hrMax:Number(s?.hrMax||0)||null,
      ascentMeters:Number(s?.exercises?.[0]?.ascentMeters??s?.ascentMeters??0)||0,
      descentMeters:Number(s?.exercises?.[0]?.descentMeters??s?.descentMeters??0)||0,
      runningIndex:Number(s?.exercises?.[0]?.runningIndex??s?.runningIndex??0)||null,
      trainingBenefit:s?.trainingBenefit||null,
      recoveryTimeMillis:Number(s?.recoveryTimeMillis||0)||null,
      deviceModel:s?.product?.modelName||null,
      importedAt:new Date().toISOString()
    };
  }

  function getWorkoutDate(w){
    const v=w?.finishedAt||w?.startedAt||'';
    return String(v).slice(0,10);
  }

  function durationMinutesText(v){
    const s=String(v||'').toLowerCase();
    let m=s.match(/(\d+)\s*h(?:\s*(\d+)\s*min)?/);
    if(m)return Number(m[1])*60+Number(m[2]||0);
    m=s.match(/(\d+)\s*(?:–|-)\s*(\d+)\s*min/);
    if(m)return (Number(m[1])+Number(m[2]))/2;
    m=s.match(/(\d+)\s*min/); if(m)return Number(m[1]);
    return null;
  }

  function findExisting(s){
    if(typeof activities==='undefined')return null;
    const sid=sessionId(s),date=String(s?.startTime||'').slice(0,10),type=sportType(s);
    if(sid){
      const exact=activities.find(a=>String(a?.polar?.sessionId||'')===sid);
      if(exact)return exact;
    }
    const candidates=activities.filter(a=>a?.date===date);
    const cardio=candidates.find(a=>{
      if(!a?.cardioNexus)return false;
      const code=String(a.cardioNexus.session||'');
      const sp=String(s?.sport?.id??'');
      return (sp==='1'&&(code==='C1'||code==='C2'))||(sp==='3'&&code==='C3');
    });
    if(cardio)return cardio;

    const sm=Number(s?.durationMillis||0)/60000;
    const similar=candidates.find(a=>{
      if(a?.type!==type)return false;
      const am=durationMinutesText(a?.duration);
      return Number.isFinite(am)&&Math.abs(am-sm)<=20;
    });
    return similar||null;
  }

  function enrichActivity(a,s){
    const p=polarPayload(s);
    a.polar=p;
    a.source=a.source||'polar+manual';
    const type=sportType(s);
    if(type!=='other')a.type=type;
    if(p.durationMillis)a.duration=fmtDurationMs(p.durationMillis);
    if(p.distanceMeters)a.distance=(p.distanceMeters/1000).toFixed(2).replace('.',',')+' km';
    return a;
  }

  function linkPolarToWorkout(s){
    if(typeof workouts==='undefined'||!Array.isArray(workouts)||typeof save!=='function'||typeof STORAGE==='undefined') return false;
    const sid=sessionId(s),date=String(s?.startTime||'').slice(0,10);
    if(!sid||!date) return false;

    const already=workouts.find(w=>String(w?.polar?.sessionId||'')===sid);
    if(already) return true;

    const candidates=workouts.filter(w=>getWorkoutDate(w)===date);
    if(!candidates.length) return false;

    const w=candidates[candidates.length-1];
    w.polar=polarPayload(s);
    w.source=w.source||'nexus+polar';
    w.polarLinkedAt=new Date().toISOString();
    try{save(STORAGE.workouts,workouts)}catch(_){return false}
    try{renderHistory()}catch(_){}
    try{renderHome()}catch(_){}
    return true;
  }

  function importPolarSessions(training){
    if(typeof activities==='undefined'||typeof save!=='function'||typeof STORAGE==='undefined')return {added:0,enriched:0,skipped:0};
    const sessions=training?.trainingSessions||[];
    let added=0,enriched=0,skipped=0;
    sessions.forEach(s=>{
      const sid=sessionId(s),date=String(s?.startTime||'').slice(0,10);
      if(!sid||!date||date<POLAR_IMPORT_FROM){skipped++;return}
      const existing=findExisting(s);
      if(existing){enrichActivity(existing,s);enriched++;return}

      const p=polarPayload(s);
      const hasDistance=p.distanceMeters>0;
      const sameDayWorkout=typeof workouts!=='undefined' && workouts.some(w=>getWorkoutDate(w)===date);
      const isStrengthLike=!hasDistance && sportType(s)==='other';
      if(isStrengthLike && sameDayWorkout){
        if(linkPolarToWorkout(s)) enriched++;
        else skipped++;
        return;
      }

      const type=sportType(s);
      activities.push({
        id:'polar-'+sid,
        date,
        type,
        duration:fmtDurationMs(p.durationMillis),
        distance:p.distanceMeters?(p.distanceMeters/1000).toFixed(2).replace('.',',')+' km':'',
        notes:'',
        createdAt:new Date().toISOString(),
        source:'polar',
        polar:p
      });
      added++;
    });
    activities.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    save(STORAGE.activities,activities);
    try{renderHistory()}catch(_){}
    return {added,enriched,skipped};
  }

  function patchWorkoutHistoryDetails(){
    if(typeof openHistoryWorkout!=='function'||openHistoryWorkout.__polarStrengthV238)return;
    const original=openHistoryWorkout;
    const wrapped=function(id){
      const result=original.apply(this,arguments);
      try{
        const w=workouts?.find(x=>x.id===id);
        const p=w?.polar;
        const c=document.getElementById('historyWorkoutContent');
        if(p&&c&&!c.querySelector('.polar-history-block')){
          const metrics=[
            p.durationMillis?['Duración Polar',fmtDurationMs(p.durationMillis)]:null,
            p.hrAvg?['FC media',p.hrAvg+' bpm']:null,
            p.hrMax?['FC máx.',p.hrMax+' bpm']:null,
            p.calories?['Calorías',p.calories+' kcal']:null,
            p.recoveryTimeMillis?['Recuperación Polar',fmtDurationMs(p.recoveryTimeMillis)]:null
          ].filter(Boolean);
          c.insertAdjacentHTML('beforeend',`
            <div class="polar-history-block">
              <strong>Datos Polar · Fuerza</strong>
              <div class="polar-history-grid">${metrics.map(m=>`<div><span class="muted">${m[0]}</span><br><strong>${m[1]}</strong></div>`).join('')}</div>
              <div class="polar-source-badge">⌚ Vinculado al entrenamiento de Nexus</div>
            </div>`);
        }
      }catch(_){}
      return result;
    };
    wrapped.__polarStrengthV238=true;
    openHistoryWorkout=wrapped;
  }

  function patchHistoryDetails(){
    if(typeof openHistoryActivity!=='function'||openHistoryActivity.__polarV222)return;
    const original=openHistoryActivity;
    const wrapped=function(id){
      const result=original.apply(this,arguments);
      try{
        const a=activities.find(x=>x.id===id);
        const p=a?.polar;
        const c=document.getElementById('historyActivityContent');
        if(p&&c&&!c.querySelector('.polar-history-block')){
          const metrics=[
            p.hrAvg?['FC media',p.hrAvg+' bpm']:null,
            p.hrMax?['FC máx.',p.hrMax+' bpm']:null,
            p.calories?['Calorías',p.calories+' kcal']:null,
            p.runningIndex?['Running Index',String(p.runningIndex)]:null,
            p.ascentMeters?['Desnivel +',Math.round(p.ascentMeters)+' m']:null,
            p.recoveryTimeMillis?['Recuperación Polar',fmtDurationMs(p.recoveryTimeMillis)]:null
          ].filter(Boolean);
          c.insertAdjacentHTML('beforeend',`
            <div class="polar-history-block">
              <strong>Datos Polar</strong>
              <div class="polar-history-grid">${metrics.map(m=>`<div><span class="muted">${m[0]}</span><br><strong>${m[1]}</strong></div>`).join('')}</div>
              <div class="polar-source-badge">⌚ Importado desde Polar</div>
            </div>`);
        }
      }catch(_){}
      return result;
    };
    wrapped.__polarV222=true;
    openHistoryActivity=wrapped;
  }

  async function consumeLatest(data,showImportToast=false){
    const latest=data?.latest||data;
    if(!latest)return;
    buildReadiness(latest);
    const r=importPolarSessions(latest.training_sessions);
    if(showImportToast && typeof toast==='function' && (r.added||r.enriched)){
      toast(r.added? `Polar: ${r.added} actividad(es) añadida(s) · ${r.enriched} actualizada(s)` : `Polar: ${r.enriched} actividad(es) enriquecida(s)`);
    }
  }

  async function refreshLatest(){
    const p=profileId();
    ensureCard();
    if(!p){buildReadiness(null);return}
    try{
      const x=await api({action:'latest',profile_id:p});
      await consumeLatest(x,false);
    }catch(_){buildReadiness(null)}
  }

  async function autoSyncOnce(){
    const p=profileId();
    if(!p||syncLock)return;
    const key=BOOT_KEY+'_'+p;
    syncLock=true;
    try{
      const status=await api({action:'status',profile_id:p});
      if(!status.connected)return;
      const bootstrapDone=localStorage.getItem(key)==='1';
      const lastMs=status.last_sync_at?new Date(status.last_sync_at).getTime():0;
      const stale=!lastMs || (Date.now()-lastMs)>=6*60*60*1000;
      if(bootstrapDone && !stale)return;
      const x=await api({action:'sync',profile_id:p});
      localStorage.setItem(key,'1');
      await consumeLatest(x,true);
      try{
        const meta=document.getElementById('polarMeta');
        if(meta)meta.textContent='Última sincronización: '+new Date(x.last_sync_at).toLocaleString('es-ES');
        const msg=document.getElementById('polarMsg');
        if(msg){msg.textContent='Polar sincronizado automáticamente.';msg.classList.add('show')}
      }catch(_){}
    }catch(_){}
    finally{syncLock=false}
  }

  function updateVersion(){
    const v=document.querySelector('header .version');
    if(v)v.textContent=`Training - ${VERSION} (${STAMP})`;
    document.title=`Nexus Training ${VERSION}`;
  }

  function tick(){
    ensureCard();
    patchWorkoutHistoryDetails();
    patchHistoryDetails();
    updateVersion();
  }

  function boot(){
    tick();
    refreshLatest();
    setTimeout(autoSyncOnce,1800);
    window.addEventListener('nexus:polar-synced',e=>consumeLatest(e.detail,true));
    document.addEventListener('click',e=>{
      if(e.target.closest?.('[data-profile]'))setTimeout(()=>{refreshLatest();autoSyncOnce()},1000);
    },true);
    let n=0;const fast=setInterval(()=>{tick();if(++n>10)clearInterval(fast)},700);
    setInterval(tick,30000);
    setInterval(autoSyncOnce,60*60*1000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'){tick();refreshLatest();autoSyncOnce()}});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();