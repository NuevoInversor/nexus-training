(() => {
  const VERSION='v2.15';
  const STAMP='30/08/2026 19:14:00';
  const CARDIO_TYPES=new Set(['padel','walk','swim','run','bike','hike']);

  function isCardioForm(){
    return !!document.getElementById('cardioNexusToggle')?.checked ||
      CARDIO_TYPES.has(document.getElementById('activityTypeInput')?.value);
  }

  function ensureStyle(){
    if(document.getElementById('nexusCardioReportV215Style')) return;
    const s=document.createElement('style');
    s.id='nexusCardioReportV215Style';
    s.textContent=`
      .nexus-cardio-feedback{margin-top:14px;padding:14px;border-radius:16px;background:#f8fafc;border:1px solid var(--line)}
      .nexus-cardio-feedback .activity-form-grid{margin-top:10px}
      .nexus-cardio-feedback-title{font-size:13px;font-weight:900;color:#0f172a}
      .nexus-cardio-feedback-sub{font-size:12px;color:var(--muted);margin-top:3px;line-height:1.4}
      .nexus-cardio-report-text{min-height:330px;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono",monospace;font-size:13px;line-height:1.45;white-space:pre-wrap}
      @media(max-width:560px){.nexus-cardio-feedback{padding:12px}.nexus-cardio-feedback .activity-form-grid{grid-template-columns:1fr 1fr}}
    `;
    document.head.appendChild(s);
  }

  function ensureFeedbackFields(){
    const modal=document.getElementById('activityModal');
    const notes=document.getElementById('activityNotesInput');
    if(!modal || !notes) return;

    const notesWrap=notes.parentElement;
    const label=notesWrap?.querySelector('label');
    if(label) label.textContent='Comentario';
    notes.placeholder='Cómo ha ido la sesión, contexto, terreno, sensaciones específicas, etc.';

    if(document.getElementById('nexusCardioFeedback')) return;

    const block=document.createElement('div');
    block.id='nexusCardioFeedback';
    block.className='nexus-cardio-feedback';
    block.innerHTML=`
      <div class="nexus-cardio-feedback-title">Reporte de la sesión</div>
      <div class="nexus-cardio-feedback-sub">Estos datos se incluirán en el texto que podrás copiar al terminar.</div>
      <div class="activity-form-grid">
        <div>
          <label>Fatiga general</label>
          <input id="activityGeneralFatigueInput" inputmode="numeric" placeholder="Ej. 5/10">
        </div>
        <div>
          <label>Fatiga de piernas</label>
          <input id="activityLegFatigueInput" inputmode="numeric" placeholder="Ej. 6/10">
        </div>
        <div>
          <label>Molestias</label>
          <input id="activityDiscomfortInput" placeholder="Ej. Ninguna">
        </div>
        <div>
          <label>Sensaciones</label>
          <input id="activitySensationsInput" inputmode="numeric" placeholder="Ej. 8/10">
        </div>
      </div>
    `;
    notesWrap.insertAdjacentElement('beforebegin',block);
  }

  function ensureSummaryModal(){
    if(document.getElementById('cardioSummaryModal')) return;
    document.body.insertAdjacentHTML('beforeend',`
      <div id="cardioSummaryModal" class="modal">
        <div class="sheet">
          <div class="row between">
            <div>
              <div class="eyebrow" style="color:#64748b">Listo para ChatGPT</div>
              <h2 style="margin:4px 0">Texto de la sesión de cardio</h2>
            </div>
            <button class="iconbtn" id="closeCardioSummaryBtn">✕</button>
          </div>
          <p class="muted small" style="margin-top:12px">Copia este texto y pégalo en nuestra conversación para revisar la sesión y ajustar la carga si fuese necesario.</p>
          <textarea id="cardioSummaryText" class="nexus-cardio-report-text" readonly></textarea>
          <button class="btn btn-primary btn-block" id="copyCardioSummaryBtn" style="margin-top:10px">Copiar texto</button>
          <button class="btn btn-secondary btn-block" id="doneCardioSummaryBtn" style="margin-top:10px">Cerrar</button>
        </div>
      </div>
    `);

    const close=()=>document.getElementById('cardioSummaryModal')?.classList.remove('open');
    document.getElementById('closeCardioSummaryBtn').onclick=close;
    document.getElementById('doneCardioSummaryBtn').onclick=close;
    document.getElementById('copyCardioSummaryBtn').onclick=async()=>{
      const ta=document.getElementById('cardioSummaryText');
      if(!ta) return;
      try{
        await navigator.clipboard.writeText(ta.value);
      }catch(e){
        ta.focus(); ta.select(); document.execCommand('copy');
      }
      const b=document.getElementById('copyCardioSummaryBtn');
      if(b){const old=b.textContent;b.textContent='Texto copiado';setTimeout(()=>b.textContent=old,1400);}
    };
  }

  function resetFeedback(){
    for(const id of ['activityGeneralFatigueInput','activityLegFatigueInput','activityDiscomfortInput','activitySensationsInput']){
      const el=document.getElementById(id);
      if(el) el.value='';
    }
  }

  function feedbackFromForm(){
    return {
      generalFatigue:(document.getElementById('activityGeneralFatigueInput')?.value||'').trim(),
      legFatigue:(document.getElementById('activityLegFatigueInput')?.value||'').trim(),
      discomfort:(document.getElementById('activityDiscomfortInput')?.value||'').trim(),
      sensations:(document.getElementById('activitySensationsInput')?.value||'').trim()
    };
  }

  function score(v){
    if(!v) return '—';
    return /\/10\s*$/.test(v) ? v : `${v}/10`;
  }

  function typeLabel(activity){
    if(activity.cardioNexus) return `Cardio Nexus · Semana ${activity.cardioNexus.week} · ${activity.cardioNexus.session} · ${activity.cardioNexus.type||''}`.trim();
    try{return getActivityVisual(activity.type)?.label || activity.type || 'Cardio';}
    catch(e){return activity.type||'Cardio';}
  }

  function buildReport(activity){
    const fb=activity.cardioFeedback||{};
    const lines=[
      'REPORTE CARDIO',
      '',
      `Fecha: ${activity.date||'—'}`,
      `Tipo: ${typeLabel(activity)}`,
      `Duración: ${activity.duration||'—'}`,
      `Distancia: ${activity.distance||'—'}`
    ];

    if(activity.cardioNexus){
      const cn=activity.cardioNexus;
      if(cn.training) lines.push(`Sesión planificada: ${cn.training}`);
      if(cn.objective) lines.push(`Objetivo: ${cn.objective}`);
    }

    lines.push(
      '',
      `Fatiga general: ${score(fb.generalFatigue)}`,
      `Fatiga de piernas: ${score(fb.legFatigue)}`,
      `Molestias: ${fb.discomfort||'Ninguna indicada'}`,
      `Sensaciones: ${score(fb.sensations)}`,
      `Comentario: ${activity.notes||'—'}`
    );

    return lines.join('\n');
  }

  function showReport(activity){
    ensureSummaryModal();
    const ta=document.getElementById('cardioSummaryText');
    if(ta) ta.value=buildReport(activity);
    document.getElementById('cardioSummaryModal')?.classList.add('open');
  }

  function patchOpenActivity(){
    if(typeof openActivityModal!=='function' || openActivityModal.__nexusV215) return;
    const original=openActivityModal;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      ensureFeedbackFields();
      resetFeedback();
      return result;
    };
    wrapped.__nexusV215=true;
    openActivityModal=wrapped;
  }

  function patchSaveActivity(){
    if(typeof saveActivity!=='function' || saveActivity.__nexusV215) return;
    const original=saveActivity;
    const wrapped=function(){
      ensureFeedbackFields();
      const shouldReport=isCardioForm();
      const feedback=feedbackFromForm();
      const beforeIds=new Set((activities||[]).map(a=>a.id));
      const result=original.apply(this,arguments);

      if(!shouldReport || !Array.isArray(activities)) return result;
      const activity=activities.find(a=>!beforeIds.has(a.id));
      if(!activity) return result;

      activity.cardioFeedback=feedback;
      try{
        if(typeof save==='function') save(STORAGE.activities,activities);
        else localStorage.setItem(STORAGE.activities,JSON.stringify(activities));
      }catch(e){}
      try{renderHistory();}catch(e){}
      showReport(activity);
      return result;
    };
    wrapped.__nexusV215=true;
    saveActivity=wrapped;
  }

  function patchHistory(){
    if(typeof openHistoryActivity!=='function' || openHistoryActivity.__nexusV215) return;
    const original=openHistoryActivity;
    const wrapped=function(activityId){
      const result=original.apply(this,arguments);
      const activity=activities?.find(a=>a.id===activityId);
      const fb=activity?.cardioFeedback;
      const host=document.getElementById('historyActivityContent');
      if(activity && fb && host && !host.querySelector('.nexus-history-cardio-feedback')){
        host.insertAdjacentHTML('beforeend',`
          <div class="history-detail-block nexus-history-cardio-feedback">
            <strong>Reporte de la sesión</strong>
            <div class="small" style="margin-top:8px"><strong>Fatiga general:</strong> ${esc(score(fb.generalFatigue))}</div>
            <div class="small" style="margin-top:6px"><strong>Fatiga de piernas:</strong> ${esc(score(fb.legFatigue))}</div>
            <div class="small" style="margin-top:6px"><strong>Molestias:</strong> ${esc(fb.discomfort||'—')}</div>
            <div class="small" style="margin-top:6px"><strong>Sensaciones:</strong> ${esc(score(fb.sensations))}</div>
            <button class="btn btn-secondary btn-block nexus-regenerate-cardio-report" style="margin-top:12px">Generar texto de reporte</button>
          </div>
        `);
        host.querySelector('.nexus-regenerate-cardio-report').onclick=()=>showReport(activity);
      }
      return result;
    };
    wrapped.__nexusV215=true;
    openHistoryActivity=wrapped;
  }

  function updateVersion(){
    const v=document.querySelector('header .version');
    if(v) v.textContent=`Training - ${VERSION} (${STAMP})`;
    document.title=`Nexus Training ${VERSION}`;
  }

  function tick(){
    ensureStyle();
    ensureFeedbackFields();
    ensureSummaryModal();
    patchOpenActivity();
    patchSaveActivity();
    patchHistory();
    updateVersion();
  }

  function boot(){
    tick();
    let n=0;
    const fast=setInterval(()=>{tick();if(++n>=12)clearInterval(fast);},1000);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();