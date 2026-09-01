(() => {
  const VERSION='v2.26';
  const STAMP='01/09/2026 16:40:00';
  const TEXT=`Training - ${VERSION} (${STAMP})`;
  let applying=false;
  function apply(){
    if(applying)return;
    applying=true;
    const v=document.querySelector('header .version');
    if(v && v.textContent!==TEXT) v.textContent=TEXT;
    const title=`Nexus Training ${VERSION}`;
    if(document.title!==title) document.title=title;
    applying=false;
  }
  function boot(){
    apply();
    const obs=new MutationObserver(()=>apply());
    obs.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
    let n=0;
    const fast=setInterval(()=>{apply();if(++n>=40)clearInterval(fast)},250);
    setInterval(apply,15000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')apply()});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();