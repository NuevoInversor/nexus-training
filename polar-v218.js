(() => {
  const VERSION='v2.19';
  const STAMP='31/08/2026 13:40:00';
  const CFG=window.NEXUS_CLOUD||{};
  const BASE=(CFG.url||'').replace(/\/$/,'')+'/functions/v1';
  let session=null;
  let currentProfile=null;

  function profileId(){
    const btn=document.getElementById('profileSwitchBtn');
    const t=btn?.textContent?.trim()?.toLowerCase();
    if(t==='david'||t==='ana') return t;
    return null;
  }

  function ensureStyle(){
    if(document.getElementById('polarV218Style')) return;
    const s=document.createElement('style');
    s.id='polarV218Style';
    s.textContent=`
      .polar-card{border:1px solid #cbd5e1;background:linear-gradient(180deg,#fff,#f8fafc)}
      .polar-badge{display:inline-flex;align-items:center;gap:7px;padding:7px 10px;border-radius:999px;background:#eef2ff;color:#3730a3;font-size:12px;font-weight:900}
      .polar-dot{width:8px;height:8px;border-radius:50%;background:#94a3b8}
      .polar-dot.ok{background:#16a34a}.polar-dot.warn{background:#f59e0b}.polar-dot.err{background:#dc2626}
      .polar-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
      .polar-meta{font-size:12px;color:var(--muted);margin-top:6px;line-height:1.4}
      .polar-msg{display:none;margin-top:10px;padding:10px 12px;border-radius:12px;background:#f8fafc;border:1px solid var(--line);font-size:12px}
      .polar-msg.show{display:block}
    `;
    document.head.appendChild(s);
  }

  function ensureCard(){
    ensureStyle();
    const cloud=document.getElementById('cloudCard');
    const hero=document.querySelector('#homeView .hero');
    if(!document.getElementById('polarCard')){
      const html=`
        <div class="card polar-card" id="polarCard">
          <div class="row between">
            <div>
              <div class="polar-badge"><span id="polarDot" class="polar-dot"></span><span id="polarStatus">Polar no conectado</span></div>
              <div class="polar-meta" id="polarMeta">Entrenamientos, actividad, sueño y recuperación</div>
            </div>
            <button class="btn btn-secondary" id="polarConnectBtn">Conectar</button>
          </div>
          <div class="polar-actions">
            <button class="btn btn-primary" id="polarSyncBtn" disabled>Sincronizar Polar</button>
            <button class="btn btn-secondary" id="polarDisconnectBtn" disabled>Desconectar</button>
          </div>
          <div class="polar-msg" id="polarMsg"></div>
        </div>`;
      if(cloud) cloud.insertAdjacentHTML('afterend',html);
      else if(hero) hero.insertAdjacentHTML('afterend',html);
      document.getElementById('polarConnectBtn').onclick=connectPolar;
      document.getElementById('polarSyncBtn').onclick=syncPolar;
      document.getElementById('polarDisconnectBtn').onclick=disconnectPolar;
    }
  }

  function showMsg(text){
    const el=document.getElementById('polarMsg');
    if(!el)return;
    el.textContent=text||'';
    el.classList.toggle('show',!!text);
  }

  async function getSession(){
    try{
      if(!window.supabase||!CFG.url||!CFG.publishableKey) return null;
      const client=window.supabase.createClient(CFG.url,CFG.publishableKey);
      const {data}=await client.auth.getSession();
      return data?.session||null;
    }catch(e){ return null; }
  }

  async function api(path,body){
    session=await getSession();
    if(!session) throw new Error('Conecta primero Nexus Cloud con GitHub.');
    const r=await fetch(BASE+'/'+path,{
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

  async function refreshStatus(){
    ensureCard();
    currentProfile=profileId();
    const dot=document.getElementById('polarDot');
    const status=document.getElementById('polarStatus');
    const meta=document.getElementById('polarMeta');
    const connect=document.getElementById('polarConnectBtn');
    const sync=document.getElementById('polarSyncBtn');
    const disc=document.getElementById('polarDisconnectBtn');
    if(!currentProfile){
      status.textContent='Selecciona un perfil';
      meta.textContent='Polar se vincula por perfil de Nexus';
      dot.className='polar-dot';
      connect.disabled=true; sync.disabled=true; disc.disabled=true;
      return;
    }
    connect.disabled=false;
    try{
      const x=await api('polar-api',{action:'status',profile_id:currentProfile});
      if(x.connected){
        dot.className='polar-dot ok';
        status.textContent='Polar conectado';
        meta.textContent=x.last_sync_at?'Última sincronización: '+new Date(x.last_sync_at).toLocaleString('es-ES'):'Conectado · pendiente de primera sincronización';
        connect.textContent='Reconectar';
        sync.disabled=false; disc.disabled=false;
      }else{
        dot.className='polar-dot';
        status.textContent='Polar no conectado';
        meta.textContent='Entrenamientos, actividad, sueño y recuperación';
        connect.textContent='Conectar';
        sync.disabled=true; disc.disabled=true;
      }
    }catch(e){
      dot.className='polar-dot warn';
      status.textContent='Polar pendiente de configurar';
      meta.textContent=e.message;
      if(e.message==='Conecta primero Nexus Cloud con GitHub.'){
        connect.textContent='Conectar Cloud primero';
      }
      sync.disabled=true; disc.disabled=true;
    }
  }

  async function connectPolar(){
    try{
      showMsg('Preparando conexión segura con Polar…');
      const p=profileId();
      if(!p) throw new Error('Selecciona primero un perfil.');

      session=await getSession();
      if(!session){
        showMsg('Primero debes conectar Nexus Cloud con GitHub. Te abro la conexión.');
        const cloudOpen=document.getElementById('cloudOpenBtn');
        const cloudGithub=document.getElementById('cloudGithubBtn');
        if(cloudOpen) cloudOpen.click();
        setTimeout(()=>{
          const signedOut=document.getElementById('cloudSignedOut');
          if(signedOut && signedOut.style.display!=='none' && cloudGithub) cloudGithub.focus();
        },250);
        return;
      }

      const x=await api('polar-start',{profile_id:p});
      if(!x?.url) throw new Error('Polar no devolvió una URL de autorización.');
      location.href=x.url;
    }catch(e){ showMsg(e.message); }
  }

  async function syncPolar(){
    try{
      showMsg('Sincronizando los últimos 28 días con Polar…');
      const p=profileId();
      const x=await api('polar-api',{action:'sync',profile_id:p});
      showMsg('Polar sincronizado correctamente.');
      await refreshStatus();
      window.dispatchEvent(new CustomEvent('nexus:polar-synced',{detail:x}));
    }catch(e){showMsg(e.message);}
  }

  async function disconnectPolar(){
    try{
      const p=profileId();
      await api('polar-api',{action:'disconnect',profile_id:p});
      showMsg('Polar desconectado de este perfil.');
      await refreshStatus();
    }catch(e){showMsg(e.message);}
  }

  function handleReturn(){
    const u=new URL(location.href);
    const s=u.searchParams.get('polar');
    if(!s)return;
    ensureCard();
    if(s==='connected') showMsg('Polar conectado. Ya puedes sincronizar tus datos.');
    else showMsg('No se pudo completar la conexión con Polar: '+(u.searchParams.get('message')||'error desconocido'));
    u.searchParams.delete('polar'); u.searchParams.delete('message');
    history.replaceState({},'',u.pathname+(u.search?u.search:'')+u.hash);
  }

  function updateVersion(){
    const v=document.querySelector('header .version');
    if(v)v.textContent=`Training - ${VERSION} (${STAMP})`;
    document.title=`Nexus Training ${VERSION}`;
  }

  function boot(){
    ensureCard(); handleReturn(); updateVersion();
    setTimeout(refreshStatus,700);
    document.addEventListener('click',e=>{
      if(e.target.closest?.('[data-profile]')) setTimeout(refreshStatus,900);
      if(e.target.closest?.('#cloudGithubBtn,#cloudLogoutBtn,#cloudSyncBtn')) setTimeout(refreshStatus,1400);
    },true);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshStatus();});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();