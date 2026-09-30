(() => {
  const VERSION='v2.74';
  const errors=[];
  window.__nexusDebug274Errors=errors;

  const clip=v=>{
    try{
      const s=String(v??'');
      return s.length>180?s.slice(0,177)+'...':s;
    }catch(_){return '?'}
  };
  const safe=(fn,fallback='ERR')=>{
    try{return fn()}catch(e){return fallback+': '+(e?.message||String(e))}
  };
  const localProfile=()=>safe(()=>localStorage.getItem('nexus_local_profile_v29')||'—');
  const localISO=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};

  window.addEventListener('error',e=>{
    errors.push(`error: ${e.message||'sin mensaje'} @ ${e.filename||'?'}:${e.lineno||'?'}`);
    if(errors.length>6)errors.shift();
    setTimeout(render,0);
  });
  window.addEventListener('unhandledrejection',e=>{
    errors.push('promise: '+clip(e.reason?.message||e.reason||'sin detalle'));
    if(errors.length>6)errors.shift();
    setTimeout(render,0);
  });

  function ensure(){
    const routine=document.getElementById('routineList');
    const routineCard=routine?.closest('.card');
    if(!routineCard)return null;
    let card=document.getElementById('nexusDebug273');
    if(!card){
      card=document.createElement('div');
      card.id='nexusDebug273';
      card.className='card';
      card.style.cssText='border:2px solid #f59e0b;background:#fffbeb;padding:14px 16px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace';
      routineCard.insertAdjacentElement('beforebegin',card);
    }
    return card;
  }

  function row(k,v){
    return `<div style="display:grid;grid-template-columns:112px 1fr;gap:8px;padding:4px 0;border-bottom:1px solid #fde68a"><strong>${k}</strong><span style="overflow-wrap:anywhere">${clip(v)}</span></div>`;
  }

  function render(){
    const card=ensure(); if(!card)return;
    const host=document.getElementById('routineList');
    const cardio=document.getElementById('nexusCardioWeekCard');
    const rect=host?.getBoundingClientRect?.();
    const style=host?getComputedStyle(host):null;
    const scripts=[...document.scripts].map(s=>s.src||'inline');
    const names=safe(()=>Array.isArray(routines)?routines.map(r=>r?.name||'?').join(' | '):'NO ARRAY');
    const state={
      fecha:localISO(),
      perfilCache:localProfile(),
      perfilBoton:document.getElementById('profileSwitchBtn')?.textContent?.trim()||'—',
      gate:safe(()=>document.getElementById('profileGate')?.classList.contains('hidden')?'hidden':'VISIBLE','—'),
      planId:safe(()=>typeof plan==='undefined'?'UNDEFINED':(plan?.id||'sin id')),
      planName:safe(()=>typeof plan==='undefined'?'UNDEFINED':(plan?.name||'sin nombre')),
      routinesLength:safe(()=>typeof routines==='undefined'?'UNDEFINED':(Array.isArray(routines)?routines.length:'NO ARRAY')),
      routinesNames:names,
      renderHome:safe(()=>typeof renderHome),
      renderAll:safe(()=>typeof renderAll),
      routineChildren:host?.children?.length??'sin host',
      routineCards:host?.querySelectorAll?.('.routine-card')?.length??'sin host',
      routineHtml:host?.innerHTML?.length??'sin host',
      routineText:clip(host?.textContent?.trim()||'VACÍO'),
      routineHeight:rect?Math.round(rect.height)+'px':'—',
      routineDisplay:style?.display||'—',
      routineVisibility:style?.visibility||'—',
      cardioExiste:!!cardio,
      cardioDisplay:cardio?getComputedStyle(cardio).display:'—',
      scriptExtraStrength:scripts.some(x=>x.includes('david-extra-strength-v272.js')),
      scriptExtraCardio:scripts.some(x=>x.includes('david-extra-cardio-v272.js')),
      scriptDashboard:scripts.some(x=>x.includes('home-dashboard-v272.js')),
      errores:errors.length?errors.join(' || '):'ninguno capturado'
    };

    const first=host?.querySelector?.('.routine-card')||null;
    const firstStyle=first?getComputedStyle(first):null;
    const firstRect=first?.getBoundingClientRect?.()||null;
    const center=firstRect?{
      x:Math.max(0,Math.min(innerWidth-1,firstRect.left+firstRect.width/2)),
      y:Math.max(0,Math.min(innerHeight-1,firstRect.top+Math.min(firstRect.height/2,30)))
    }:null;
    const topAtCenter=center?document.elementFromPoint(center.x,center.y):null;
    const chain=[];
    let el=topAtCenter;
    for(let i=0;el&&i<5;i++,el=el.parentElement){
      chain.push(el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(el.className&&typeof el.className==='string'?'.'+el.className.trim().replace(/\s+/g,'.'):''));
    }
    const parents=[];
    el=host;
    for(let i=0;el&&i<6;i++,el=el.parentElement){
      const cs=getComputedStyle(el);
      parents.push(
        el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+
        ' ov='+cs.overflow+'/'+cs.overflowY+
        ' pos='+cs.position+
        ' z='+cs.zIndex+
        ' op='+cs.opacity
      );
    }
    state.firstDisplay=firstStyle?.display||'—';
    state.firstVisibility=firstStyle?.visibility||'—';
    state.firstOpacity=firstStyle?.opacity||'—';
    state.firstColor=firstStyle?.color||'—';
    state.firstBg=firstStyle?.backgroundColor||'—';
    state.firstRect=firstRect?`${Math.round(firstRect.left)},${Math.round(firstRect.top)} ${Math.round(firstRect.width)}x${Math.round(firstRect.height)}`:'—';
    state.point=center?`${Math.round(center.x)},${Math.round(center.y)}`:'—';
    state.elementOnTop=chain.join(' > ')||'—';
    state.parents=parents.join(' || ');
    const cardioRect=cardio?.getBoundingClientRect?.();
    state.cardioRect=cardioRect?`${Math.round(cardioRect.left)},${Math.round(cardioRect.top)} ${Math.round(cardioRect.width)}x${Math.round(cardioRect.height)}`:'—';


    card.innerHTML=`
      <div style="font-family:Inter,system-ui,sans-serif">
        <div style="font-size:11px;font-weight:900;letter-spacing:.12em;color:#b45309">DEPURACIÓN NEXUS ${VERSION}</div>
        <div style="font-size:13px;font-weight:800;margin:4px 0 8px;color:#78350f">No modifica tus datos · captura esta tarjeta completa</div>
      </div>
      <div style="font-size:11px;line-height:1.35">
        ${row('fecha',state.fecha)}
        ${row('perfil cache',state.perfilCache)}
        ${row('perfil botón',state.perfilBoton)}
        ${row('gate',state.gate)}
        ${row('plan.id',state.planId)}
        ${row('plan.name',state.planName)}
        ${row('routines.length',state.routinesLength)}
        ${row('rutinas',state.routinesNames)}
        ${row('renderHome',state.renderHome)}
        ${row('renderAll',state.renderAll)}
        ${row('DOM children',state.routineChildren)}
        ${row('DOM cards',state.routineCards)}
        ${row('HTML chars',state.routineHtml)}
        ${row('DOM texto',state.routineText)}
        ${row('altura',state.routineHeight)}
        ${row('display',state.routineDisplay)}
        ${row('visibility',state.routineVisibility)}
        ${row('cardio',state.cardioExiste+' / '+state.cardioDisplay)}
        ${row('strength272',state.scriptExtraStrength)}
        ${row('cardio272',state.scriptExtraCardio)}
        ${row('dashboard272',state.scriptDashboard)}
        ${row('1st display',state.firstDisplay)}
        ${row('1st visibility',state.firstVisibility)}
        ${row('1st opacity',state.firstOpacity)}
        ${row('1st color',state.firstColor)}
        ${row('1st bg',state.firstBg)}
        ${row('1st rect',state.firstRect)}
        ${row('test point',state.point)}
        ${row('element on top',state.elementOnTop)}
        ${row('parents',state.parents)}
        ${row('cardio rect',state.cardioRect)}
        ${row('errores',state.errores)}
      </div>`;
  }

  function boot(){
    render();
    let n=0;
    const fast=setInterval(()=>{render();if(++n>=30)clearInterval(fast)},500);
    setInterval(render,5000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(render,100)});
    window.addEventListener('focus',()=>setTimeout(render,100));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();