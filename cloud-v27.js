(() => {
  const CFG = window.NEXUS_CLOUD || {};
  const PENDING = 'nexus_cloud_pending_v27';
  const LASTSYNC = 'nexus_cloud_last_sync_v27';
  let sb = null;
  let user = null;
  let hasRemote = false;
  let ready = false;
  let applying = false;
  let timer = null;
  let lastError = '';
  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;

  function injectUI(){
    const style=document.createElement('style');
    style.textContent=`.cloud-status{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);margin-top:5px}.cloud-dot{width:9px;height:9px;border-radius:50%;background:#94a3b8}.cloud-dot.ok{background:#16a34a}.cloud-dot.wait{background:#f59e0b}.cloud-dot.err{background:#dc2626}.cloud-account{font-size:12px;color:var(--muted);margin-top:4px}.cloud-note{margin-top:12px;padding:10px 12px;border-radius:12px;background:#f8fafc;border:1px solid var(--line);font-size:12px;line-height:1.4}.cloud-note.warn{background:#fff7ed;border-color:#fed7aa;color:#9a3412}.cloud-note.good{background:#f0fdf4;border-color:#bbf7d0;color:#166534}`;
    document.head.appendChild(style);

    const hero=document.querySelector('#homeView .hero');
    if(hero && !document.getElementById('cloudCard')) hero.insertAdjacentHTML('afterend',`<div class="card" id="cloudCard"><div class="row between"><div><h3 style="margin-bottom:4px">Nexus Cloud</h3><div class="cloud-status"><span id="cloudDot" class="cloud-dot"></span><span id="cloudStatusText">Solo en este dispositivo</span></div><div id="cloudAccount" class="cloud-account"></div></div><button class="btn btn-secondary" id="cloudOpenBtn">Conectar</button></div></div>`);

    if(!document.getElementById('cloudModal')) document.body.insertAdjacentHTML('beforeend',`<div id="cloudModal" class="modal"><div class="sheet"><div class="row between"><div><div class="eyebrow" style="color:#64748b">Nexus Cloud</div><h2 style="margin:4px 0">Sincronización</h2></div><button class="iconbtn" id="cloudCloseBtn">✕</button></div><div id="cloudSignedOut" style="margin-top:16px"><p class="muted small">Usa la misma cuenta de GitHub en móvil y ordenador.</p><button class="btn btn-primary btn-block" id="cloudGithubBtn">Continuar con GitHub</button><div class="cloud-note warn">Haz la primera migración desde el dispositivo que tenga el historial más completo.</div></div><div id="cloudSignedIn" style="display:none;margin-top:16px"><div id="cloudUser" class="cloud-note good"></div><div id="cloudSeedArea" style="display:none"><div class="cloud-note warn">Nexus Cloud aún está vacío. Si este dispositivo contiene tu historial principal, súbelo ahora.</div><button class="btn btn-primary btn-block" id="cloudSeedBtn" style="margin-top:10px">Subir datos de este dispositivo</button></div><button class="btn btn-primary btn-block" id="cloudSyncBtn" style="margin-top:12px">Sincronizar ahora</button><button class="btn btn-secondary btn-block" id="cloudLogoutBtn" style="margin-top:10px">Cerrar sesión</button></div><div id="cloudMsg" class="cloud-note" style="display:none"></div></div></div>`);

    document.getElementById('cloudOpenBtn').onclick=openModal;
    document.getElementById('cloudCloseBtn').onclick=()=>document.getElementById('cloudModal').classList.remove('open');
    document.getElementById('cloudGithubBtn').onclick=loginGithub;
    document.getElementById('cloudSeedBtn').onclick=seedCloud;
    document.getElementById('cloudSyncBtn').onclick=syncNow;
    document.getElementById('cloudLogoutBtn').onclick=logout;
  }

  function msg(text,type=''){
    const el=document.getElementById('cloudMsg'); if(!el)return;
    el.style.display=text?'block':'none'; el.textContent=text||''; el.className=`cloud-note ${type}`.trim();
  }

  function openModal(){ msg(''); renderModal(); document.getElementById('cloudModal').classList.add('open'); }

  function snapshot(){
    return {
      schemaVersion:1,
      appVersion:'2.7',
      routines:clone(routines),
      workouts:clone(workouts),
      activeWorkout:activeWorkout?clone(activeWorkout):null,
      plan:clone(plan),
      notesStore:clone(notesStore),
      activities:clone(activities),
      clientUpdatedAt:new Date().toISOString()
    };
  }

  function applyRemote(data){
    if(!data || typeof data!=='object') return;
    applying=true;
    try{
      if(Array.isArray(data.routines)) routines=data.routines;
      if(Array.isArray(data.workouts)) workouts=data.workouts;
      if(Object.prototype.hasOwnProperty.call(data,'activeWorkout')) activeWorkout=data.activeWorkout||null;
      if(data.plan) plan=data.plan;
      if(data.notesStore) notesStore=data.notesStore;
      if(Array.isArray(data.activities)) activities=data.activities;
      originalSetItem.call(localStorage,STORAGE.routines,JSON.stringify(routines));
      originalSetItem.call(localStorage,STORAGE.workouts,JSON.stringify(workouts));
      if(activeWorkout) originalSetItem.call(localStorage,STORAGE.active,JSON.stringify(activeWorkout)); else originalRemoveItem.call(localStorage,STORAGE.active);
      originalSetItem.call(localStorage,STORAGE.plan,JSON.stringify(plan));
      originalSetItem.call(localStorage,STORAGE.notes,JSON.stringify(notesStore));
      originalSetItem.call(localStorage,STORAGE.activities,JSON.stringify(activities));
    } finally { applying=false; }
    renderAll();
  }

  function renderStatus(){
    const dot=document.getElementById('cloudDot'), txt=document.getElementById('cloudStatusText'), acc=document.getElementById('cloudAccount'), btn=document.getElementById('cloudOpenBtn');
    if(!dot||!txt||!acc||!btn)return;
    dot.className='cloud-dot'; btn.textContent=user?'Cuenta':'Conectar';
    acc.textContent=user?(user.email||user.user_metadata?.user_name||'Cuenta conectada'):'Conecta una cuenta para sincronizar';
    if(!sb){dot.classList.add('err');txt.textContent='Nexus Cloud no configurado';return;}
    if(!user){txt.textContent='Solo en este dispositivo';return;}
    if(lastError){dot.classList.add('err');txt.textContent='Error de sincronización';return;}
    if(!hasRemote){dot.classList.add('wait');txt.textContent='Primera sincronización pendiente';return;}
    if(localStorage.getItem(PENDING)==='1'){dot.classList.add('wait');txt.textContent='Cambios pendientes';return;}
    dot.classList.add('ok');
    const last=localStorage.getItem(LASTSYNC);
    txt.textContent=last?`Sincronizado · ${new Intl.DateTimeFormat('es-ES',{hour:'2-digit',minute:'2-digit'}).format(new Date(last))}`:'Sincronizado';
  }

  function renderModal(){
    const out=document.getElementById('cloudSignedOut'), inside=document.getElementById('cloudSignedIn'), seed=document.getElementById('cloudSeedArea'), label=document.getElementById('cloudUser');
    if(!out)return;
    out.style.display=user?'none':'block'; inside.style.display=user?'block':'none'; seed.style.display=user&&!hasRemote?'block':'none';
    label.textContent=user?`Cuenta conectada: ${user.email||user.user_metadata?.user_name||user.id}`:'';
    renderStatus();
  }

  async function fetchRemote(){
    const {data,error}=await sb.from('nexus_state').select('data,updated_at').eq('user_id',user.id).maybeSingle();
    if(error) throw error;
    return data;
  }

  async function bootstrap(u){
    user=u; ready=false; lastError='';
    if(!user){hasRemote=false;renderModal();return;}
    try{
      const row=await fetchRemote();
      hasRemote=!!row;
      if(row?.data){
        applyRemote(row.data);
        originalRemoveItem.call(localStorage,PENDING);
        originalSetItem.call(localStorage,LASTSYNC,new Date().toISOString());
      }
      ready=true;
    }catch(e){lastError=e.message||String(e);}
    renderModal();
  }

  async function push(showToast=false){
    if(!sb||!user||!ready)return false;
    lastError='';
    try{
      const now=new Date().toISOString();
      const {error}=await sb.from('nexus_state').upsert({user_id:user.id,data:snapshot(),updated_at:now},{onConflict:'user_id'});
      if(error) throw error;
      hasRemote=true;
      originalRemoveItem.call(localStorage,PENDING);
      originalSetItem.call(localStorage,LASTSYNC,now);
      if(showToast) toast('Datos sincronizados');
      renderModal();
      return true;
    }catch(e){
      lastError=e.message||String(e);
      originalSetItem.call(localStorage,PENDING,'1');
      renderStatus();
      if(showToast) msg(`No se pudo sincronizar: ${lastError}`,'warn');
      return false;
    }
  }

  function schedulePush(){
    if(!user||!ready||applying)return;
    originalSetItem.call(localStorage,PENDING,'1');
    renderStatus();
    clearTimeout(timer);
    timer=setTimeout(()=>push(false),700);
  }

  async function seedCloud(){
    ready=true;
    originalSetItem.call(localStorage,PENDING,'1');
    msg('Subiendo el historial…');
    if(await push(false)) msg('Este dispositivo ya es la base de Nexus Cloud.','good');
  }

  async function syncNow(){
    if(!user)return openModal();
    msg('Sincronizando…');
    if(localStorage.getItem(PENDING)==='1' && !(await push(false))) return;
    try{
      const row=await fetchRemote();
      hasRemote=!!row;
      if(row?.data) applyRemote(row.data);
      originalSetItem.call(localStorage,LASTSYNC,new Date().toISOString());
      msg('Sincronización completada.','good');
      renderModal();
    }catch(e){lastError=e.message||String(e);msg(`Error: ${lastError}`,'warn');renderStatus();}
  }

  async function loginGithub(){
    msg('Abriendo GitHub…');
    const {error}=await sb.auth.signInWithOAuth({provider:'github',options:{redirectTo:location.origin+location.pathname}});
    if(error) msg(error.message,'warn');
  }

  async function logout(){
    await sb.auth.signOut(); user=null;ready=false;hasRemote=false;lastError='';
    document.getElementById('cloudModal').classList.remove('open'); renderStatus(); toast('Sesión cerrada');
  }

  function patchStorage(){
    Storage.prototype.setItem=function(k,v){
      originalSetItem.call(this,k,v);
      if(this===localStorage && /^nexus_/.test(String(k)) && k!==PENDING && k!==LASTSYNC) schedulePush();
    };
    Storage.prototype.removeItem=function(k){
      originalRemoveItem.call(this,k);
      if(this===localStorage && /^nexus_/.test(String(k)) && k!==PENDING && k!==LASTSYNC) schedulePush();
    };
  }

  async function initCloud(){
    injectUI(); patchStorage(); renderStatus();
    if(!window.supabase || !CFG.url || !CFG.publishableKey){
      lastError='Falta la configuración pública de Supabase'; renderStatus(); return;
    }
    sb=window.supabase.createClient(CFG.url,CFG.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    sb.auth.onAuthStateChange((event,session)=>{
      if(event==='SIGNED_IN' && session?.user) bootstrap(session.user);
      if(event==='SIGNED_OUT'){user=null;ready=false;hasRemote=false;lastError='';renderModal();}
    });
    const {data}=await sb.auth.getSession();
    if(data?.session?.user) await bootstrap(data.session.user); else renderStatus();
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState==='visible' && user && hasRemote){
        if(localStorage.getItem(PENDING)==='1') push(false); else syncNow();
      }
    });
  }

  initCloud();
})();
