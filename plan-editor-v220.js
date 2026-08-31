(() => {
  const VERSION='v2.20';
  const STAMP='31/08/2026 14:10:00';

  function escHtml(v=''){
    return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  }

  function safeRenderPlanEditor(){
    if(!planDraft) return;
    const name=document.getElementById('planNameInput');
    const start=document.getElementById('planStartInput');
    const end=document.getElementById('planEndInput');
    const editor=document.getElementById('weeklyRirEditor');
    if(!name||!start||!end||!editor) return;

    name.value=planDraft.name||'';
    start.value=planDraft.startDate||'';
    end.value=planDraft.endDate||'';

    const weeks=Object.entries(planDraft.weekDates||{})
      .filter(([,d])=>!!d)
      .map(([w,d])=>({week:Number(w),date:d}))
      .sort((a,b)=>a.week-b.week);

    editor.innerHTML=weeks.map(({week,date})=>`
      <div class="card" style="box-shadow:none;margin:10px 0;padding:12px">
        <div class="row between" style="align-items:flex-end">
          <div style="flex:1">
            <label>Semana ${week}</label>
            <input type="date" data-week-date="${week}" value="${escHtml(date)}">
          </div>
          <div style="width:120px">
            <label>RIR</label>
            <input data-week-rir="${week}" value="${escHtml(planDraft.weeklyRir?.[String(week)]||'')}">
          </div>
        </div>
      </div>
    `).join('');

    const markDirty=()=>{ planEditorDirty=true; };
    [name,start,end,...editor.querySelectorAll('input')].forEach(el=>{
      el.oninput=markDirty;
      el.onchange=markDirty;
    });
  }

  function safeOpenPlan(){
    try{
      ensurePlanDates();
      planDraft=clone(plan);
      if(!planDraft.endDate) planDraft.endDate=addDaysISO(planDraft.startDate,28);
      if(!planDraft.weekDates||!Object.keys(planDraft.weekDates).length){
        planDraft.weekDates=buildDefaultWeekDates(planDraft.startDate,planDraft.endDate);
      }
      if(!planDraft.weeklyRir) planDraft.weeklyRir={};
      planEditorDirty=false;
      safeRenderPlanEditor();
      document.getElementById('planModal')?.classList.add('open');
    }catch(e){
      try{toast('No se pudo abrir la configuración del mesociclo');}catch(_){}
      console.error('Nexus plan editor',e);
    }
  }

  function patch(){
    window.renderPlanEditor=safeRenderPlanEditor;
    window.openPlan=safeOpenPlan;

    const edit=document.getElementById('editPlanBtn');
    if(edit) edit.onclick=safeOpenPlan;

    const regen=document.getElementById('regenerateWeeksBtn');
    if(regen && typeof regeneratePlanWeeks==='function'){
      regen.onclick=()=>{
        if(!planDraft) return;
        const start=document.getElementById('planStartInput')?.value||planDraft.startDate;
        const end=document.getElementById('planEndInput')?.value||addDaysISO(start,28);
        planDraft.startDate=start;
        planDraft.endDate=end;
        planDraft.weekDates=buildDefaultWeekDates(start,end);
        if(!planDraft.weeklyRir) planDraft.weeklyRir={};
        Object.keys(planDraft.weekDates).forEach(w=>{
          if(planDraft.weeklyRir[w]===undefined) planDraft.weeklyRir[w]='';
        });
        planEditorDirty=true;
        safeRenderPlanEditor();
        try{toast('Semanas regeneradas');}catch(e){}
      };
    }

    const v=document.querySelector('header .version');
    if(v) v.textContent=`Training - ${VERSION} (${STAMP})`;
    document.title=`Nexus Training ${VERSION}`;
  }

  function boot(){
    patch();
    setTimeout(patch,500);
    setTimeout(patch,1500);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')patch();});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();