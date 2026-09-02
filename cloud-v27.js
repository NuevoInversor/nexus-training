(() => {
  const CFG = window.NEXUS_CLOUD || {};
  const PROFILE_CACHE_KEY = 'nexus_local_profile_v29';
  let sb = null;
  let user = null;
  let profileId = null;
  let hasRemote = false;
  let ready = false;
  let applying = false;
  let timer = null;
  let lastError = '';
  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;

  const PROFILES = {
    david: { id:'david', name:'David', subtitle:'Entrenamiento de David' },
    ana: { id:'ana', name:'Ana', subtitle:'Entrenamiento de Ana' }
  };

  function pendingKey(){ return `nexus_cloud_pending_v29_${profileId||'none'}`; }
  function lastSyncKey(){ return `nexus_cloud_last_sync_v29_${profileId||'none'}`; }

  function injectUI(){
    const style=document.createElement('style');
    style.textContent=`
      .cloud-status{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);margin-top:5px}.cloud-dot{width:9px;height:9px;border-radius:50%;background:#94a3b8}.cloud-dot.ok{background:#16a34a}.cloud-dot.wait{background:#f59e0b}.cloud-dot.err{background:#dc2626}.cloud-account{font-size:12px;color:var(--muted);margin-top:4px}.cloud-note{margin-top:12px;padding:10px 12px;border-radius:12px;background:#f8fafc;border:1px solid var(--line);font-size:12px;line-height:1.4}.cloud-note.warn{background:#fff7ed;border-color:#fed7aa;color:#9a3412}.cloud-note.good{background:#f0fdf4;border-color:#bbf7d0;color:#166534}
      .profile-gate{position:fixed;inset:0;z-index:200;background:linear-gradient(145deg,#0f172a,#111827 55%,#1f2937);display:flex;align-items:center;justify-content:center;padding:22px}.profile-gate.hidden{display:none}.profile-panel{width:min(520px,100%);color:white}.profile-logo{font-size:15px;font-weight:950;letter-spacing:.18em;opacity:.88;margin-bottom:24px}.profile-panel h1{font-size:34px;margin:0 0 8px}.profile-panel p{color:#cbd5e1;margin-bottom:22px}.profile-list{display:grid;gap:12px}.profile-choice{width:100%;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);color:white;border-radius:20px;padding:18px;text-align:left;display:flex;align-items:center;justify-content:space-between;gap:14px}.profile-choice:active{transform:scale(.995)}.profile-avatar{width:46px;height:46px;border-radius:15px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:950}.profile-choice-name{font-size:18px;font-weight:950}.profile-choice-sub{font-size:12px;color:#cbd5e1;margin-top:3px}.profile-arrow{font-size:24px;color:#cbd5e1}.profile-switch{border:0;background:#eef2f7;color:#334155;border-radius:999px;padding:7px 10px;font-size:12px;font-weight:900;white-space:nowrap}
    `;
    document.head.appendChild(style);

    if(!document.getElementById('profileGate')) document.body.insertAdjacentHTML('afterbegin',`
      <div id="profileGate" class="profile-gate">
        <div class="profile-panel">
          <div class="profile-logo">NEXUS</div>
          <h1>¿Quién va a entrenar?</h1>
          <p>Selecciona tu perfil para cargar tu planificación, historial y Cardio Nexus.</p>
          <div class="profile-list">
            <button class="profile-choice" data-profile="david"><span class="row"><span class="profile-avatar">D</span><span><span class="profile-choice-name">David</span><span class="profile-choice-sub">Entrar en Nexus de David</span></span></span><span class="profile-arrow">›</span></button>
            <button class="profile-choice" data-profile="ana"><span class="row"><span class="profile-avatar">A</span><span><span class="profile-choice-name">Ana</span><span class="profile-choice-sub">Entrar en Nexus de Ana</span></span></span><span class="profile-arrow">›</span></button>
          </div>
        </div>
      </div>`);

    document.querySelectorAll('[data-profile]').forEach(btn=>btn.onclick=()=>selectProfile(btn.dataset.profile));

    const header=document.querySelector('header');
    if(header && !document.getElementById('profileSwitchBtn')){
      const pill=document.getElementById('todayPill');
      if(pill) pill.insertAdjacentHTML('beforebegin','<button id="profileSwitchBtn" class="profile-switch">Perfil</button>');
      document.getElementById('profileSwitchBtn').onclick=showProfileGate;
    }


    const hero=document.querySelector('#homeView .hero');
    if(hero && !document.getElementById('cloudCard')) hero.insertAdjacentHTML('afterend',`<div class="card" id="cloudCard"><div class="row between"><div><h3 style="margin-bottom:4px">Nexus Cloud</h3><div class="cloud-status"><span id="cloudDot" class="cloud-dot"></span><span id="cloudStatusText">Selecciona un perfil</span></div><div id="cloudAccount" class="cloud-account"></div></div><button class="btn btn-secondary" id="cloudOpenBtn">Conectar</button></div></div>`);

    if(!document.getElementById('cloudModal')) document.body.insertAdjacentHTML('beforeend',`<div id="cloudModal" class="modal"><div class="sheet"><div class="row between"><div><div class="eyebrow" style="color:#64748b">Nexus Cloud</div><h2 style="margin:4px 0">Sincronización</h2></div><button class="iconbtn" id="cloudCloseBtn">✕</button></div><div id="cloudSignedOut" style="margin-top:16px"><p class="muted small">Usa la misma cuenta de GitHub. Nexus separa los datos por perfil.</p><button class="btn btn-primary btn-block" id="cloudGithubBtn">Continuar con GitHub</button></div><div id="cloudSignedIn" style="display:none;margin-top:16px"><div id="cloudUser" class="cloud-note good"></div><div id="cloudSeedArea" style="display:none"><div class="cloud-note warn">Este perfil aún no tiene datos en Nexus Cloud. Puedes iniciar su espacio con los datos que aparecen ahora en pantalla.</div><button class="btn btn-primary btn-block" id="cloudSeedBtn" style="margin-top:10px">Crear este perfil en Nexus Cloud</button></div><button class="btn btn-primary btn-block" id="cloudSyncBtn" style="margin-top:12px">Sincronizar ahora</button><button class="btn btn-secondary btn-block" id="cloudLogoutBtn" style="margin-top:10px">Cerrar sesión</button></div><div id="cloudMsg" class="cloud-note" style="display:none"></div></div></div>`);

    document.getElementById('cloudOpenBtn').onclick=openModal;
    document.getElementById('cloudCloseBtn').onclick=()=>document.getElementById('cloudModal').classList.remove('open');
    document.getElementById('cloudGithubBtn').onclick=loginGithub;
    document.getElementById('cloudSeedBtn').onclick=seedCloud;
    document.getElementById('cloudSyncBtn').onclick=syncNow;
    document.getElementById('cloudLogoutBtn').onclick=logout;
  }

  function showProfileGate(){
    document.getElementById('profileGate')?.classList.remove('hidden');
  }

  function msg(text,type=''){
    const el=document.getElementById('cloudMsg'); if(!el)return;
    el.style.display=text?'block':'none'; el.textContent=text||''; el.className=`cloud-note ${type}`.trim();
  }

  function openModal(){ msg(''); renderModal(); document.getElementById('cloudModal').classList.add('open'); }

  function snapshot(){
    return {
      schemaVersion:2,
      appVersion:'2.9',
      profileId,
      routines:clone(routines),
      workouts:clone(workouts),
      activeWorkout:activeWorkout?clone(activeWorkout):null,
      plan:clone(plan),
      notesStore:clone(notesStore),
      activities:clone(activities),
      clientUpdatedAt:new Date().toISOString()
    };
  }

  function persistCurrentState(){
    originalSetItem.call(localStorage,STORAGE.routines,JSON.stringify(routines));
    originalSetItem.call(localStorage,STORAGE.workouts,JSON.stringify(workouts));
    if(activeWorkout) originalSetItem.call(localStorage,STORAGE.active,JSON.stringify(activeWorkout)); else originalRemoveItem.call(localStorage,STORAGE.active);
    originalSetItem.call(localStorage,STORAGE.plan,JSON.stringify(plan));
    originalSetItem.call(localStorage,STORAGE.notes,JSON.stringify(notesStore));
    originalSetItem.call(localStorage,STORAGE.activities,JSON.stringify(activities));
  }

  function resetEmptyProfile(){
    applying=true;
    try{
      routines=clone(DEFAULT_ROUTINES);
      workouts=[];
      activeWorkout=null;
      plan=clone(DEFAULT_PLAN);
      notesStore={};
      activities=[];
      persistCurrentState();
    } finally { applying=false; }
    renderAll();
  }

  function activeWorkoutProgress(w){
    if(!w || typeof w!=='object') return 0;
    try{
      return (w.exercises||[]).reduce((total,e)=>total+(e.sets||[]).filter(s=>s?.completed || s?.weight || s?.reps || s?.rir).length,0);
    }catch(_){return 0}
  }

  function chooseActiveWorkout(remoteActive,localActive){
    const rp=activeWorkoutProgress(remoteActive), lp=activeWorkoutProgress(localActive);
    if(lp>rp) return localActive;
    if(rp>lp) return remoteActive;
    if(localActive && !remoteActive) return localActive;
    return remoteActive||localActive||null;
  }

  function applyRemote(data){
    if(!data || typeof data!=='object') return;
    const localActive=activeWorkout?clone(activeWorkout):null;
    applying=true;
    try{
      if(Array.isArray(data.routines)) routines=data.routines;
      if(Array.isArray(data.workouts)) workouts=data.workouts.filter(w=>{
        const count=Number(w?.completedSets ?? 0);
        return count>0 || (w?.exercises||[]).some(e=>(e?.sets||[]).some(s=>s?.completed));
      });
      const localActiveAlreadyFinished=localActive && workouts.some(w=>w?.id===localActive.id && !!w?.finishedAt);
      if(Object.prototype.hasOwnProperty.call(data,'activeWorkout')) activeWorkout=chooseActiveWorkout(data.activeWorkout||null,localActiveAlreadyFinished?null:localActive);
      if(data.plan) plan=data.plan;
      if(data.notesStore) notesStore=data.notesStore;
      if(Array.isArray(data.activities)) activities=data.activities;
      persistCurrentState();
    } finally { applying=false; }
    renderAll();
  }

  function renderStatus(){
    const dot=document.getElementById('cloudDot'), txt=document.getElementById('cloudStatusText'), acc=document.getElementById('cloudAccount'), btn=document.getElementById('cloudOpenBtn'), switchBtn=document.getElementById('profileSwitchBtn');
    if(!dot||!txt||!acc||!btn)return;
    dot.className='cloud-dot'; btn.textContent=user?'Cuenta':'Conectar';
    if(switchBtn) switchBtn.textContent=profileId ? PROFILES[profileId].name : 'Perfil';
    acc.textContent=profileId ? `Perfil: ${PROFILES[profileId].name}${user?' · cuenta conectada':''}` : 'Selecciona David o Ana';
    if(!profileId){txt.textContent='Selecciona un perfil';return;}
    if(!sb){dot.classList.add('err');txt.textContent='Nexus Cloud no configurado';return;}
    if(!user){txt.textContent='Solo en este dispositivo';return;}
    if(lastError){dot.classList.add('err');txt.textContent='Error de sincronización';return;}
    if(!hasRemote){dot.classList.add('wait');txt.textContent='Perfil pendiente de crear en Cloud';return;}
    if(localStorage.getItem(pendingKey())==='1'){dot.classList.add('wait');txt.textContent='Cambios pendientes';return;}
    dot.classList.add('ok');
    const last=localStorage.getItem(lastSyncKey());
    txt.textContent=last?`Sincronizado · ${new Intl.DateTimeFormat('es-ES',{hour:'2-digit',minute:'2-digit'}).format(new Date(last))}`:'Sincronizado';
  }

  function renderModal(){
    const out=document.getElementById('cloudSignedOut'), inside=document.getElementById('cloudSignedIn'), seed=document.getElementById('cloudSeedArea'), label=document.getElementById('cloudUser');
    if(!out)return;
    out.style.display=user?'none':'block'; inside.style.display=user?'block':'none'; seed.style.display=user&&profileId&&!hasRemote?'block':'none';
    label.textContent=user&&profileId?`Perfil ${PROFILES[profileId].name} · ${user.email||user.user_metadata?.user_name||'cuenta GitHub'}`:'';
    renderStatus();
  }

  async function fetchRemote(){
    if(!profileId) return null;
    const {data,error}=await sb.from('nexus_state').select('data,updated_at').eq('user_id',user.id).eq('profile_id',profileId).maybeSingle();
    if(error) throw error;
    return data;
  }

  async function bootstrap(u){
    user=u; ready=false; lastError='';
    if(!user||!profileId){hasRemote=false;renderModal();return;}
    try{
      const row=await fetchRemote();
      hasRemote=!!row;
      if(row?.data){
        const incoming=clone(row.data);
        if(plan?.id==='hipertrofia-general-2026-08-31' && incoming?.plan?.id==='mesociclo-agosto-2026'){
          incoming.plan=clone(plan);
          incoming.routines=clone(routines);
        }
        applyRemote(incoming);
        originalRemoveItem.call(localStorage,pendingKey());
        originalSetItem.call(localStorage,lastSyncKey(),new Date().toISOString());
      } else {
        resetEmptyProfile();
      }
      ready=true;
    }catch(e){lastError=e.message||String(e);}
    renderModal();
  }

  async function selectProfile(id){
    if(!PROFILES[id]) return;
    profileId=id;
    originalSetItem.call(localStorage,PROFILE_CACHE_KEY,id);
    document.getElementById('profileGate')?.classList.add('hidden');
    lastError=''; hasRemote=false; ready=false;
    renderStatus();
    if(sb){
      const {data}=await sb.auth.getSession();
      if(data?.session?.user) await bootstrap(data.session.user);
      else renderModal();
    }
  }

  function mergeById(remoteArr,localArr){
    const map=new Map();
    (Array.isArray(remoteArr)?remoteArr:[]).forEach(x=>{ if(x?.id) map.set(String(x.id),clone(x)); });
    (Array.isArray(localArr)?localArr:[]).forEach(x=>{ if(x?.id) map.set(String(x.id),clone(x)); });
    return Array.from(map.values());
  }

  function mergeSnapshots(remoteData,localData){
    if(!remoteData||typeof remoteData!=='object') return localData;
    const merged={...remoteData,...localData};
    merged.workouts=mergeById(remoteData.workouts,localData.workouts).filter(w=>{
      const count=Number(w?.completedSets ?? 0);
      const recorded=count>0 || (w?.exercises||[]).some(e=>(e?.sets||[]).some(s=>s?.completed));
      return recorded || !w?.finishedAt;
    });
    merged.activities=mergeById(remoteData.activities,localData.activities);
    merged.activeWorkout=chooseActiveWorkout(remoteData.activeWorkout||null,localData.activeWorkout||null);
    if((remoteData.workouts||[]).length && !(localData.workouts||[]).length) merged.workouts=clone(remoteData.workouts);
    if((remoteData.activities||[]).length && !(localData.activities||[]).length) merged.activities=clone(remoteData.activities);
    return merged;
  }

  async function push(showToast=false){
    if(!sb||!user||!profileId||!ready)return false;
    lastError='';
    try{
      const now=new Date().toISOString();
      const localSnap=snapshot();
      let outgoing=localSnap;
      try{
        const row=await fetchRemote();
        if(row?.data) outgoing=mergeSnapshots(row.data,localSnap);
      }catch(_){}
      const {error}=await sb.from('nexus_state').upsert({user_id:user.id,profile_id:profileId,data:outgoing,updated_at:now},{onConflict:'user_id,profile_id'});
      if(error) throw error;
      hasRemote=true;
      originalRemoveItem.call(localStorage,pendingKey());
      originalSetItem.call(localStorage,lastSyncKey(),now);
      if(showToast) toast('Datos sincronizados');
      renderModal();
      return true;
    }catch(e){
      lastError=e.message||String(e);
      originalSetItem.call(localStorage,pendingKey(),'1');
      renderStatus();
      if(showToast) msg(`No se pudo sincronizar: ${lastError}`,'warn');
      return false;
    }
  }

  function schedulePush(){
    if(!user||!profileId||!ready||applying)return;
    originalSetItem.call(localStorage,pendingKey(),'1');
    renderStatus();
    clearTimeout(timer);
    timer=setTimeout(()=>push(false),700);
  }

  async function seedCloud(){
    if(!profileId)return;
    ready=true;
    originalSetItem.call(localStorage,pendingKey(),'1');
    msg(`Creando perfil ${PROFILES[profileId].name}…`);
    if(await push(false)) msg(`Perfil ${PROFILES[profileId].name} creado en Nexus Cloud.`,'good');
  }

  async function syncNow(){
    if(!profileId){showProfileGate();return;}
    if(!user)return openModal();
    msg('Sincronizando…');
    if(localStorage.getItem(pendingKey())==='1' && !(await push(false))) return;
    try{
      const row=await fetchRemote();
      hasRemote=!!row;
      if(row?.data){
        const incoming=clone(row.data);
        if(plan?.id==='hipertrofia-general-2026-08-31' && incoming?.plan?.id==='mesociclo-agosto-2026'){
          incoming.plan=clone(plan);
          incoming.routines=clone(routines);
        }
        applyRemote(incoming);
      } else resetEmptyProfile();
      originalSetItem.call(localStorage,lastSyncKey(),new Date().toISOString());
      msg('Sincronización completada.','good');
      renderModal();
    }catch(e){lastError=e.message||String(e);msg(`Error: ${lastError}`,'warn');renderStatus();}
  }

  async function loginGithub(){
    if(!profileId){showProfileGate();return;}
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
      if(this===localStorage && /^nexus_/.test(String(k)) && k!==PROFILE_CACHE_KEY && !String(k).startsWith('nexus_cloud_')) schedulePush();
    };
    Storage.prototype.removeItem=function(k){
      originalRemoveItem.call(this,k);
      if(this===localStorage && /^nexus_/.test(String(k)) && k!==PROFILE_CACHE_KEY && !String(k).startsWith('nexus_cloud_')) schedulePush();
    };
  }

  async function initCloud(){
    injectUI(); patchStorage(); renderStatus();
    if(!window.supabase || !CFG.url || !CFG.publishableKey){
      lastError='Falta la configuración pública de Supabase'; renderStatus(); return;
    }
    sb=window.supabase.createClient(CFG.url,CFG.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    sb.auth.onAuthStateChange((event,session)=>{
      if(event==='SIGNED_IN' && session?.user && profileId) bootstrap(session.user);
      if(event==='SIGNED_OUT'){user=null;ready=false;hasRemote=false;lastError='';renderModal();}
    });
    const {data}=await sb.auth.getSession();
    user=data?.session?.user||null;
    renderStatus();
    window.addEventListener('nexus:set-completed',()=>{
      if(user && profileId && ready && !applying){
        clearTimeout(timer);
        originalSetItem.call(localStorage,pendingKey(),'1');
        push(false);
      }
    });
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState==='visible' && user && profileId && hasRemote){
        if(localStorage.getItem(pendingKey())==='1') push(false); else syncNow();
      }
    });
  }

  initCloud();
})();
