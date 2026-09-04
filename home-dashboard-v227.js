(() => {
  const VERSION='v2.53';
  const STAMP='04/09/2026 13:04:00';

  function currentProfile(){
    const t=document.getElementById('profileSwitchBtn')?.textContent?.trim()?.toLowerCase();
    return (t==='david'||t==='ana')?t:null;
  }

  function ensureStyle(){
    if(document.getElementById('nexusHomeDashboardV227Style')) return;
    const s=document.createElement('style');
    s.id='nexusHomeDashboardV227Style';
    s.textContent=`
      #cloudCard,#polarCard,#nexusCardioMeso2Card{display:none!important}
      .nexus-connect-card{padding:15px 16px}
      .nexus-connect-title{font-size:17px;font-weight:900;letter-spacing:-.015em;margin:0}
      .nexus-connect-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
      .nexus-connect-tile{position:relative;border:1px solid #e2e8f0;background:#fff;border-radius:16px;padding:14px 10px 12px;text-align:center;min-width:0}
      .nexus-connect-tile:active{transform:scale(.985);background:#f8fafc}
      .nexus-connect-icon{width:45px;height:45px;margin:0 auto 8px;display:flex;align-items:center;justify-content:center;color:#0f172a}
      .nexus-connect-icon svg{width:38px;height:38px}
      .nexus-connect-name{font-size:12px;font-weight:900;color:#0f172a}
      .nexus-connect-status{position:absolute;right:13px;top:13px;width:10px;height:10px;border-radius:50%;background:#94a3b8;box-shadow:0 0 0 3px #fff}
      .nexus-connect-status.ok{background:#22c55e}
      .nexus-connect-status.warn{background:#f59e0b}
      .nexus-connect-status.err{background:#ef4444}
      .nexus-connect-sync{margin-top:7px;font-size:10px;line-height:1.35;color:#64748b}
      .nexus-connect-sync strong{display:block;color:#475569;font-weight:850}
      .nexus-polar-sheet-info{padding:11px 12px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;font-size:12px;line-height:1.45;margin-top:14px}
      .nexus-polar-sheet-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
      .nexus-cardio-week{padding:15px 16px}
      .nexus-cardio-week-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
      .nexus-cardio-week-list{display:grid;gap:9px;margin-top:12px}
      .nexus-cardio-session{display:grid;grid-template-columns:42px 1fr auto;gap:10px;align-items:center;padding:11px;border:1px solid #e2e8f0;border-radius:14px;background:#fff}
      .nexus-cardio-session-icon{width:42px;height:42px;border-radius:13px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;color:#0f172a}
      .nexus-cardio-session-icon svg{width:22px;height:22px}
      .nexus-cardio-session-title{font-size:13px;font-weight:900;color:#0f172a}
      .nexus-cardio-session-training{font-size:11px;color:#64748b;line-height:1.35;margin-top:2px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      .nexus-cardio-session-meta{font-size:10px;color:#64748b;font-weight:800;text-align:right;white-space:nowrap}
      .nexus-cardio-done{color:#15803d}
      @media(max-width:390px){
        .nexus-connect-grid{gap:8px}
        .nexus-cardio-session{grid-template-columns:38px 1fr}
        .nexus-cardio-session-meta{grid-column:2;text-align:left}
      }
    `;
    document.head.appendChild(s);
  }

  function watchIcon(){
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M9 2h6l1 4H8l1-4Z"/><rect x="6" y="6" width="12" height="12" rx="3"/><path d="M8 18h8l-1 4H9l-1-4Z"/>
      <rect x="9" y="9" width="2" height="2" rx=".3"/><rect x="13" y="9" width="2" height="2" rx=".3"/><rect x="9" y="13" width="2" height="2" rx=".3"/><rect x="13" y="13" width="2" height="2" rx=".3"/>
    </svg>`;
  }

  function cloudIcon(){
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M17.5 19H7a5 5 0 0 1-.6-9.96A6.5 6.5 0 0 1 18.8 8a4.5 4.5 0 0 1-1.3 11Z"/>
    </svg>`;
  }

  function formatSync(value){
    if(!value) return {date:'Sin sincronizar',time:''};
    const d=new Date(value);
    if(Number.isNaN(d.getTime())) return {date:String(value),time:''};
    return {
      date:d.toLocaleDateString('es-ES',{day:'2-digit',month:'2-digit',year:'2-digit'}),
      time:d.toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'})
    };
  }

  function parsePolarSync(){
    const txt=document.getElementById('polarMeta')?.textContent||'';
    const m=txt.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})[^\d]+(\d{1,2}):(\d{2})/);
    if(!m) return null;
    return new Date(Number(m[3]),Number(m[2])-1,Number(m[1]),Number(m[4]),Number(m[5]));
  }

  function statusClass(el,kind){
    if(!el) return 'warn';
    if(el.classList.contains('ok')) return 'ok';
    if(el.classList.contains('err')) return 'err';
    if(el.classList.contains('warn')||el.classList.contains('wait')) return 'warn';
    if(kind==='polar'){
      const text=document.getElementById('polarStatus')?.textContent||'';
      if(/no conectado/i.test(text)) return 'err';
    }
    return 'warn';
  }

  function ensureConnectivity(){
    ensureStyle();
    const routineCard=document.getElementById('routineList')?.closest('.card');
    if(!routineCard) return null;
    let card=document.getElementById('nexusConnectivityCard');
    if(!card){
      card=document.createElement('div');
      card.id='nexusConnectivityCard';
      card.className='card nexus-connect-card';
      card.innerHTML=`
        <h3 class="nexus-connect-title">Conectividades</h3>
        <div class="nexus-connect-grid">
          <button class="nexus-connect-tile" id="nexusPolarTile" type="button">
            <span class="nexus-connect-status" id="nexusPolarState"></span>
            <span class="nexus-connect-icon">${watchIcon()}</span>
            <span class="nexus-connect-name">Polar</span>
            <div class="nexus-connect-sync" id="nexusPolarSyncText"><strong>Última sincronización:</strong>—</div>
          </button>
          <button class="nexus-connect-tile" id="nexusCloudTile" type="button">
            <span class="nexus-connect-status" id="nexusCloudState"></span>
            <span class="nexus-connect-icon">${cloudIcon()}</span>
            <span class="nexus-connect-name">Nexus Cloud</span>
            <div class="nexus-connect-sync" id="nexusCloudSyncText"><strong>Última sincronización:</strong>—</div>
          </button>
        </div>`;
      routineCard.insertAdjacentElement('beforebegin',card);
      document.getElementById('nexusPolarTile').onclick=openPolarSheet;
      document.getElementById('nexusCloudTile').onclick=()=>document.getElementById('cloudOpenBtn')?.click();
    }
    return card;
  }

  function ensurePolarSheet(){
    if(document.getElementById('nexusPolarQuickModal')) return;
    document.body.insertAdjacentHTML('beforeend',`
      <div id="nexusPolarQuickModal" class="modal">
        <div class="sheet">
          <div class="row between">
            <div>
              <div class="eyebrow" style="color:#64748b">Conectividad</div>
              <h2 style="margin:4px 0">Polar</h2>
            </div>
            <button class="iconbtn" id="nexusPolarQuickClose">✕</button>
          </div>
          <div class="nexus-polar-sheet-info" id="nexusPolarQuickInfo">Cargando estado…</div>
          <div class="nexus-polar-sheet-actions">
            <button class="btn btn-primary" id="nexusPolarQuickSync">Sincronizar</button>
            <button class="btn btn-secondary" id="nexusPolarQuickDisconnect">Desconectar</button>
          </div>
        </div>
      </div>`);
    document.getElementById('nexusPolarQuickClose').onclick=()=>document.getElementById('nexusPolarQuickModal').classList.remove('open');
    document.getElementById('nexusPolarQuickSync').onclick=()=>{
      document.getElementById('polarSyncBtn')?.click();
      document.getElementById('nexusPolarQuickModal').classList.remove('open');
    };
    document.getElementById('nexusPolarQuickDisconnect').onclick=()=>{
      document.getElementById('polarDisconnectBtn')?.click();
      document.getElementById('nexusPolarQuickModal').classList.remove('open');
    };
  }

  function openPolarSheet(){
    ensurePolarSheet();
    const status=document.getElementById('polarStatus')?.textContent||'Polar';
    const meta=document.getElementById('polarMeta')?.textContent||'';
    const sync=document.getElementById('polarSyncBtn');
    const disc=document.getElementById('polarDisconnectBtn');
    const connect=document.getElementById('polarConnectBtn');
    document.getElementById('nexusPolarQuickInfo').innerHTML=`<strong>${status}</strong><br><span class="muted">${meta}</span>`;
    const qSync=document.getElementById('nexusPolarQuickSync');
    const qDisc=document.getElementById('nexusPolarQuickDisconnect');
    qSync.disabled=!!sync?.disabled;
    qDisc.disabled=!!disc?.disabled;
    if(sync?.disabled && connect && !connect.disabled){
      qSync.disabled=false;
      qSync.textContent='Conectar Polar';
      qSync.onclick=()=>{
        connect.click();
        document.getElementById('nexusPolarQuickModal').classList.remove('open');
      };
    }else{
      qSync.textContent='Sincronizar';
      qSync.onclick=()=>{
        sync?.click();
        document.getElementById('nexusPolarQuickModal').classList.remove('open');
      };
    }
    document.getElementById('nexusPolarQuickModal').classList.add('open');
  }

  function updateConnectivity(){
    ensureConnectivity();
    const pState=document.getElementById('nexusPolarState');
    const cState=document.getElementById('nexusCloudState');
    if(pState) pState.className='nexus-connect-status '+statusClass(document.getElementById('polarDot'),'polar');
    if(cState) cState.className='nexus-connect-status '+statusClass(document.getElementById('cloudDot'),'cloud');

    const p=formatSync(parsePolarSync());
    const pText=document.getElementById('nexusPolarSyncText');
    if(pText) pText.innerHTML=`<strong>Última sincronización:</strong>${p.date}${p.time?'<br>'+p.time:''}`;

    const profile=currentProfile();
    const cloudLast=profile?localStorage.getItem('nexus_cloud_last_sync_v29_'+profile):null;
    const cl=formatSync(cloudLast);
    const cText=document.getElementById('nexusCloudSyncText');
    if(cText) cText.innerHTML=`<strong>Última sincronización:</strong>${cl.date}${cl.time?'<br>'+cl.time:''}`;
  }

  function cardioDone(week,code){
    try{
      return Array.isArray(activities)&&activities.some(a=>{
        const cn=a?.cardioNexus;
        if(!cn || Number(cn.week)!==Number(week) || cn.session!==code) return false;
        const date=String(a?.date||'');
        const currentProgram=cn.programId==='cardio-mesociclo-2-2026-08-31';
        const currentDates=date>='2026-08-31' && date<='2026-09-27';
        return currentProgram || currentDates;
      });
    }catch(_){return false}
  }

  function ensureCardioWeek(){
    const profile=currentProfile();
    const routineCard=document.getElementById('routineList')?.closest('.card');
    const lastCard=document.getElementById('lastWorkoutHome')?.closest('.card');
    let card=document.getElementById('nexusCardioWeekCard');
    if(profile!=='david'){
      card?.remove();
      return;
    }
    if(!routineCard||!lastCard||typeof getWeek!=='function'||typeof getCardioNexusSession!=='function') return;
    const week=getWeek();
    const sessions=['C1','C2','C3'].map(code=>({code,data:getCardioNexusSession(week,code)})).filter(x=>x.data);
    if(!sessions.length){card?.remove();return}

    if(!card){
      card=document.createElement('div');
      card.id='nexusCardioWeekCard';
      card.className='card nexus-cardio-week';
      lastCard.insertAdjacentElement('beforebegin',card);
    }
    card.innerHTML=`
      <div class="nexus-cardio-week-head">
        <div><h3 style="margin:0">Cardio</h3><div class="muted small" style="margin-top:3px">Sesiones de la semana ${week}</div></div>
        <span class="pill">Semana ${week}</span>
      </div>
      <div class="nexus-cardio-week-list">
        ${sessions.map(({code,data:s})=>{
          const done=cardioDone(week,code);
          const icon=typeof svgIcon==='function'?svgIcon(s.icon):'';
          return `<div class="nexus-cardio-session">
            <div class="nexus-cardio-session-icon">${icon}</div>
            <div>
              <div class="nexus-cardio-session-title">${code} · ${typeof esc==='function'?esc(s.type):s.type}</div>
              <div class="nexus-cardio-session-training">${typeof esc==='function'?esc(s.training):s.training}</div>
            </div>
            <div class="nexus-cardio-session-meta ${done?'nexus-cardio-done':''}">${done?'✓ Hecho':(s.duration||'')}</div>
          </div>`;
        }).join('')}
      </div>`;
  }

  function cleanLegacy(){
    const cloud=document.getElementById('cloudCard'); if(cloud) cloud.style.display='none';
    const polar=document.getElementById('polarCard'); if(polar) polar.style.display='none';
    const old=document.getElementById('nexusCardioMeso2Card'); if(old) old.style.display='none';
  }

  function updateVersion(){ /* Version centralizada en polar-intelligence-v222.js */ }

  function tick(){
    ensureStyle();
    cleanLegacy();
    updateConnectivity();
    ensureCardioWeek();
    updateVersion();
  }

  function boot(){
    ensurePolarSheet();
    tick();
    let n=0;
    const fast=setInterval(()=>{tick();if(++n>=16)clearInterval(fast)},700);
    setInterval(tick,30000);
    document.addEventListener('click',e=>{
      if(e.target.closest?.('[data-profile],#cloudSyncBtn,#cloudGithubBtn,#cloudLogoutBtn,#polarSyncBtn,#polarDisconnectBtn,#polarConnectBtn')) setTimeout(tick,1000);
    },true);
    window.addEventListener('nexus:polar-synced',()=>setTimeout(tick,250));
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')tick()});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();