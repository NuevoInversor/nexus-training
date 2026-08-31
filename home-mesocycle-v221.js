(() => {
  const VERSION='v2.21';
  const STAMP='31/08/2026 14:16:00';

  function ensureStyle(){
    if(document.getElementById('nexusHeroMesocycleV221Style')) return;
    const s=document.createElement('style');
    s.id='nexusHeroMesocycleV221Style';
    s.textContent=`
      #homeView .hero{position:relative;padding-right:74px}
      .nexus-hero-edit{
        position:absolute;top:18px;right:18px;width:44px;height:44px;border:0;border-radius:14px;
        display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.12);
        color:#fff;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:0
      }
      .nexus-hero-edit:active{transform:scale(.97);background:rgba(255,255,255,.18)}
      .nexus-hero-edit svg{width:20px;height:20px}
      .nexus-hero-dates{
        display:flex;flex-wrap:wrap;gap:8px 16px;margin-top:14px;color:#cbd5e1;
        font-size:12px;line-height:1.35;font-weight:700
      }
      .nexus-hero-date strong{color:#fff;font-weight:850}
      @media(max-width:560px){
        #homeView .hero{padding-right:66px}
        .nexus-hero-edit{top:16px;right:16px;width:40px;height:40px;border-radius:13px}
        .nexus-hero-dates{font-size:11px;gap:6px 12px;margin-top:12px}
      }
    `;
    document.head.appendChild(s);
  }

  function formatDate(iso){
    if(!iso) return '—';
    const [y,m,d]=String(iso).split('-');
    return y&&m&&d ? `${d}/${m}/${y}` : iso;
  }

  function openPlanFromHero(){
    const original=document.getElementById('editPlanBtn');
    if(original && typeof original.onclick==='function'){
      original.onclick.call(original);
      return;
    }
    if(typeof window.openPlan==='function') window.openPlan();
  }

  function ensureHeroControls(){
    const hero=document.querySelector('#homeView .hero');
    if(!hero) return;

    if(!document.getElementById('nexusHeroEditBtn')){
      const btn=document.createElement('button');
      btn.id='nexusHeroEditBtn';
      btn.className='nexus-hero-edit';
      btn.setAttribute('aria-label','Configurar mesociclo');
      btn.title='Configurar mesociclo';
      btn.innerHTML=`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>
        </svg>`;
      btn.onclick=openPlanFromHero;
      hero.appendChild(btn);
    }

    let dates=document.getElementById('nexusHeroDates');
    if(!dates){
      dates=document.createElement('div');
      dates.id='nexusHeroDates';
      dates.className='nexus-hero-dates';
      hero.appendChild(dates);
    }

    dates.innerHTML=`
      <span class="nexus-hero-date"><strong>Desde:</strong> ${formatDate(plan?.startDate)}</span>
      <span class="nexus-hero-date"><strong>Hasta:</strong> ${formatDate(plan?.endDate)}</span>
    `;
  }

  function hideLegacyMesocycleCard(){
    const summary=document.getElementById('mesocycleSummary');
    const card=summary?.closest('.card');
    if(card) card.style.display='none';
  }

  function patchRenderHome(){
    if(typeof renderHome!=='function' || renderHome.__nexusV221) return;
    const original=renderHome;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      ensureHeroControls();
      hideLegacyMesocycleCard();
      return result;
    };
    wrapped.__nexusV221=true;
    renderHome=wrapped;
  }

  function updateVersion(){
    const v=document.querySelector('header .version');
    if(v) v.textContent=`Training - ${VERSION} (${STAMP})`;
    document.title=`Nexus Training ${VERSION}`;
  }

  function tick(){
    ensureStyle();
    patchRenderHome();
    ensureHeroControls();
    hideLegacyMesocycleCard();
    updateVersion();
  }

  function boot(){
    tick();
    try{renderHome();}catch(e){}
    let n=0;
    const fast=setInterval(()=>{tick(); if(++n>=12) clearInterval(fast);},750);
    setInterval(tick,30000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')tick();});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();