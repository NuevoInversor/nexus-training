(() => {
  const VERSION='v2.17';
  const STAMP='30/08/2026 19:59:00';

  function isAna(){
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='Ana' && (!gate || gate.classList.contains('hidden'));
  }

  function applyCardioAccess(){
    const box=document.getElementById('cardioNexusBox');
    const toggle=document.getElementById('cardioNexusToggle');
    const fields=document.getElementById('cardioNexusFields');
    if(!box || !toggle) return;

    if(isAna()){
      toggle.checked=false;
      toggle.disabled=true;
      box.style.display='none';
      fields?.classList.remove('show');
      box.classList.remove('active');
      try{ if(typeof renderCardioNexusPreview==='function') renderCardioNexusPreview(); }catch(e){}
    }else{
      toggle.disabled=false;
      box.style.display='';
    }
  }

  function patchOpen(){
    if(typeof openActivityModal!=='function' || openActivityModal.__nexusV217) return;
    const original=openActivityModal;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      applyCardioAccess();
      return result;
    };
    wrapped.__nexusV217=true;
    openActivityModal=wrapped;
  }

  function patchSave(){
    if(typeof saveActivity!=='function' || saveActivity.__nexusV217) return;
    const original=saveActivity;
    const wrapped=function(){
      if(isAna()){
        const toggle=document.getElementById('cardioNexusToggle');
        if(toggle) toggle.checked=false;
      }
      return original.apply(this,arguments);
    };
    wrapped.__nexusV217=true;
    saveActivity=wrapped;
  }

  function updateVersion(){ /* Version centralizada en polar-intelligence-v222.js */ }

  function tick(){
    patchOpen();
    patchSave();
    applyCardioAccess();
    updateVersion();
  }

  function boot(){
    tick();
    let n=0;
    const fast=setInterval(()=>{tick();if(++n>=20)clearInterval(fast);},750);
    setInterval(tick,30000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')tick();});
    document.addEventListener('click',e=>{if(e.target.closest?.('[data-profile]'))setTimeout(tick,400);},true);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();