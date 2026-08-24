(() => {
  function applyProfileUI(){
    const gate=document.getElementById('profileGate');
    if(!gate) return false;

    const panel=gate.querySelector('.profile-panel');
    const title=panel?.querySelector('h1');
    const description=panel?.querySelector('p');
    if(title) title.textContent='¿Quién va a entrenar?';
    if(description) description.textContent='Selecciona tu perfil para cargar tus entrenamientos e historial.';

    gate.querySelectorAll('.profile-choice-sub').forEach(el=>el.remove());

    const style=document.createElement('style');
    style.id='profileUiV210Style';
    style.textContent=`
      .profile-gate{
        background:
          radial-gradient(circle at 80% 12%,rgba(37,99,235,.18),transparent 34%),
          radial-gradient(circle at 12% 92%,rgba(14,165,233,.10),transparent 34%),
          linear-gradient(155deg,#0b1222,#111827 58%,#172033);
        padding:clamp(22px,5vw,38px);
      }
      .profile-panel{width:min(540px,100%)}
      .profile-logo{margin-bottom:28px;font-size:16px;letter-spacing:.24em;color:#f8fafc;opacity:1}
      .profile-panel h1{font-size:clamp(36px,8vw,48px);line-height:1.02;letter-spacing:-.035em;margin-bottom:14px;max-width:480px}
      .profile-panel>p{font-size:16px;line-height:1.5;color:#aebbd0;margin-bottom:30px;max-width:460px}
      .profile-list{gap:14px}
      .profile-choice{
        min-height:96px;padding:18px 20px;border-radius:22px;
        border:1px solid rgba(148,163,184,.28);
        background:linear-gradient(135deg,rgba(255,255,255,.095),rgba(255,255,255,.055));
        box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 12px 30px rgba(0,0,0,.10);
        transition:transform .15s ease,border-color .15s ease,background .15s ease;
      }
      .profile-choice:hover{border-color:rgba(56,189,248,.48);background:rgba(255,255,255,.11);transform:translateY(-1px)}
      .profile-choice:active{transform:scale(.99)}
      .profile-choice>.row{gap:16px}
      .profile-avatar{
        width:58px;height:58px;border-radius:18px;
        background:linear-gradient(145deg,rgba(59,130,246,.28),rgba(255,255,255,.10));
        border:1px solid rgba(147,197,253,.15);
        font-size:22px;
      }
      .profile-choice-name{display:block;font-size:23px;line-height:1;font-weight:900;letter-spacing:-.02em}
      .profile-arrow{font-size:30px;color:#94a3b8;padding-right:2px}
      @media(max-width:560px){
        .profile-gate{align-items:center;padding:28px 22px calc(34px + env(safe-area-inset-bottom))}
        .profile-logo{margin-bottom:24px}
        .profile-panel h1{font-size:40px}
        .profile-panel>p{font-size:16px;margin-bottom:26px}
        .profile-choice{min-height:88px;padding:15px 16px;border-radius:20px}
        .profile-avatar{width:54px;height:54px;border-radius:17px}
        .profile-choice-name{font-size:22px}
      }
    `;
    if(!document.getElementById(style.id)) document.head.appendChild(style);

    const version=document.querySelector('header .version');
    if(version) version.textContent='Training - v2.10 (24/08/2026 14:51:00)';
    document.title='Nexus Training v2.10';
    return true;
  }

  function boot(){
    if(applyProfileUI()) return;
    const observer=new MutationObserver(()=>{
      if(applyProfileUI()) observer.disconnect();
    });
    observer.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),10000);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
