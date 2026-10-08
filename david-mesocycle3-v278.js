(() => {
  const VERSION='v2.78';
  const ID='mesociclo-3-2026-10-12';
  const CARDIO_ID='cardio-mesociclo-3-2026-10-12';
  const START='2026-10-12', END='2026-11-01';

  const clone=x=>JSON.parse(JSON.stringify(x));
  const iso=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
  const esc2=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

  function isDavid(){
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='David' && (!gate || gate.classList.contains('hidden'));
  }
  const activeDate=()=>iso()>=START&&iso()<=END;
  const upcoming=()=>iso()<START;

  function W(a,b,c){return {'1':a,'2':b,'3':c}}
  function E(key,name,unit,rest,sets,reps,rir,weight,notes={},programNote=''){
    return {
      key,name,unit,rest,
      sets:Number(sets['1']||0),reps:String(reps['1']??''),
      weeklySets:sets,weeklyReps:reps,weeklyRir:rir,weeklyWeight:weight,
      weeklyTargetNote:{
        '1':notes['1']||programNote||'',
        '2':notes['2']||programNote||'',
        '3':notes['3']||programNote||''
      },
      programNote:programNote||''
    };
  }

  const MASTER=[
    {id:'dia-1',name:'Upper A',emphasis:'Torso · fuerza/hipertrofia + especialización integrada',exercises:[
      E('press-banca','Press banca con barra','kg/lado',120,W(3,3,2),W('6-7','7-8','5-6'),W('3','2','4'),W('15','15','12,5')),
      E('remo-maquina','Remo pecho apoyado / máquina','kg/lado',120,W(3,3,2),W('8-9','9-10','6-8'),W('3','2','4'),W('27,5','27,5','22,5')),
      E('press-inclinado','Press inclinado con mancuernas','kg manc.',120,W(2,2,1),W('8-9','9-10','6-8'),W('3','2','4'),W('20','20','16-18 kg/mancuerna')),
      E('jalon-neutro','Jalón al pecho agarre neutro','kg',120,W(2,2,1),W('10','11-12','8-10'),W('3','2','4'),W('40','40','35')),
      E('elevaciones-laterales-polea','Elevaciones laterales en polea','kg',90,W(2,2,1),W('16-18','18-20','12-15'),W('2-3','2','4'),W('2,5','2,5','2,5')),
      E('curl-biceps','Curl bíceps en banco inclinado','kg manc.',90,W(2,2,1),W('10','11-12','8-10'),W('2-3','2','4'),W('12','12','10')),
      E('extension-triceps-polea','Extensión de tríceps en polea','kg',90,W(2,2,1),W('10-11','11-12','8-10'),W('2-3','2','4'),W('20','20','17,5'))
    ]},
    {id:'dia-2',name:'Lower A',emphasis:'Pierna · dominante de rodilla + core',exercises:[
      E('sentadilla-trasera','Sentadilla trasera','kg/lado',120,W(3,3,2),W('7','8','5'),W('3','2','4'),W('22,5','22,5','20')),
      E('prensa-inclinada','Prensa inclinada','kg/lado',120,W(2,2,1),W('10-12','12','8-10'),W('3','2','4'),W('27,5','27,5','22,5-25 kg/lado')),
      E('extension-cuadriceps','Extensión de cuádriceps','kg',90,W(2,2,0),W('12-13','14-15','—'),W('2-3','2','—'),W('25','25','—'),{'3':'Omitir para reducir fatiga antes del 50 km.'}),
      E('curl-femoral-tumbado','Curl femoral tumbado','kg',90,W(2,2,0),W('10-12','12','—'),W('3','2','—'),W('17,5','17,5','—'),{'3':'Omitir en taper.'}),
      E('gemelos-sentado','Gemelos sentado','kg',90,W(2,2,0),W('12-15','12-15','—'),W('3','2','—'),W('37,5','37,5','—'),{'3':'Omitir para llegar fresco al 50 km.'},'No forzar ante sensaciones anormales en gemelo.'),
      E('plancha','Plancha abdominal','',60,W(2,2,1),W('45-60 s','45-60 s','30-45 s'),W('técnico','técnico','técnico'),W('Sin carga','Sin carga','Sin carga')),
      E('pallof-press','Pallof Press','kg',60,W(2,2,1),W('12-15/lado','12-15/lado','10-12/lado'),W('técnico','técnico','técnico'),W('10','10','7,5'))
    ]},
    {id:'dia-3',name:'Upper B',emphasis:'Torso · vertical + especialización integrada',exercises:[
      E('dominadas','Dominadas peso corporal','peso corporal',120,W(4,4,2),W('4','4-5','3'),W('3','2','4'),W('Peso corporal','Peso corporal','Peso corporal'),{},'Sustituye a las dominadas asistidas. No añadir lastre durante este bloque.'),
      E('press-militar','Press militar','kg/lado + barra',120,W(3,3,2),W('6','7','5'),W('3','2','4'),W('6,25','6,25','5')),
      E('remo-polea-baja','Remo en polea baja','kg',120,W(2,2,2),W('9-10','10','6-8'),W('3','2','4'),W('40','40','35')),
      E('aperturas-maquina','Aperturas en máquina','kg',90,W(2,2,1),W('10-12','12','8-10'),W('2-3','2','4'),W('20','20','17,5')),
      E('fondos-paralela','Fondos en paralelas','peso corporal',120,W(2,2,1),W('8-10','10','6-8'),W('3','2','4'),W('Peso corporal','Peso corporal','Peso corporal')),
      E('facepull','Face Pull','kg',90,W(2,2,1),W('15-17','17-20','12-15'),W('2-3','2','4'),W('20','20','15')),
      E('pajaros-peck-deck','Pájaros en Peck Deck','kg',90,W(2,2,1),W('15','16-18','12-15'),W('2-3','2','4'),W('10','10','7,5'))
    ]},
    {id:'dia-4',name:'Lower B',emphasis:'Pierna · cadena posterior + core',exercises:[
      E('peso-muerto-rumano-dia4','Peso muerto rumano','kg/lado',120,W(3,3,0),W('7-8','8','—'),W('3','2','—'),W('15','15','—'),{'3':'No realizar.'}),
      E('sentadilla-bulgara','Sentadilla búlgara','kg/lado',120,W(2,2,0),W('8-10','10','—'),W('3','2','—'),W('7,5','7,5','—'),{'3':'No realizar.'}),
      E('hip-thrust','Hip Thrust','kg',120,W(2,2,0),W('8-10','10','—'),W('3','2','—'),W('23,65','23,65','—'),{'3':'No realizar.'}),
      E('curl-femoral-sentado','Curl femoral sentado','kg',90,W(2,2,0),W('10','11-12','—'),W('3','2','—'),W('32,5','32,5','—'),{'3':'No realizar.'}),
      E('gemelos-prensa','Gemelos en prensa / de pie','kg/lado',90,W(2,2,0),W('12-15','15','—'),W('3','2','—'),W('35','35','—'),{'3':'No realizar.'},'Mantener margen; no buscar RIR 1.'),
      E('elevaciones-piernas','Elevaciones de piernas colgado','peso corporal',60,W(2,2,0),W('10-15','12-15','—'),W('técnico / 2-3','técnico / 2-3','—'),W('Peso corporal','Peso corporal','—')),
      E('abd-wheel','Ab Wheel','peso corporal',60,W(2,2,0),W('8-10','10-12','—'),W('técnico / 2-3','técnico / 2-3','—'),W('Peso corporal','Peso corporal','—'),{},'Progresar mediante control y recorrido, no añadiendo carga.')
    ]}
  ];

  const PLAN={
    id:ID,name:'Mesociclo 3',startDate:START,endDate:END,
    weekDates:{'1':'2026-10-12','2':'2026-10-19','3':'2026-10-26'},
    weeklyRir:{'1':'3','2':'2','3':'4'},
    exerciseRir:{},
    progressionRule:'Mantener/progresar fuerza e hipertrofia minimizando interferencia con la preparación específica para la marcha de 50 km del 01/11. Semana 1 reintroducción; Semana 2 principal de carga sin fallo; Semana 3 taper.',
    deloadGuidelines:'Semana 3: RIR 4, reducción importante del volumen, sin agujetas ni fatiga residual. Lower B no se realiza.'
  };
  MASTER.forEach(r=>r.exercises.forEach(e=>{PLAN.exerciseRir[e.key]=clone(e.weeklyRir)}));

  const SCHEDULE={
    '1':[
      ['Lun 12/10','C3 · 20 km'],['Mar 13/10','Upper A'],['Mié 14/10','C2'],['Jue 15/10','Lower A'],
      ['Vie 16/10','Upper B + C1 · separar varias horas'],['Sáb 17/10','Descanso'],['Dom 18/10','Lower B']
    ],
    '2':[
      ['Lun 19/10','Upper A + C1 · separar varias horas'],['Mar 20/10','Lower A'],['Mié 21/10','Descanso'],['Jue 22/10','Upper B'],
      ['Vie 23/10','C2'],['Sáb 24/10','Lower B'],['Dom 25/10','C3']
    ],
    '3':[
      ['Lun 26/10','Upper A · volumen de taper'],['Mar 27/10','Lower A · volumen muy reducido'],['Mié 28/10','C2 muy suave'],
      ['Jue 29/10','Upper B · volumen de taper'],['Vie 30/10','Descanso total'],['Sáb 31/10','Paseo opcional 20-30 min muy suave · preparar material/hidratación/alimentación'],
      ['Dom 01/11','RETO 50 KM']
    ]
  };

  const CARDIO={
    1:{
      C1:{session:'C1',type:'Calidad controlada',visual:'cardio-c1',icon:'speed',training:`12' suave + 4 × 3' rápidos (rec. 2' trote suave) + 10' suave`,duration:'Aprox. 40 min',objective:'Ritmo orientativo 4:45-4:55 min/km · RPE 7.',notes:'No perseguir el ritmo si el RPE sube demasiado. Reintroducir calidad tras vacaciones. Preferiblemente separar Upper B y C1 varias horas.',preferredDay:'Viernes 16/10'},
      C2:{session:'C2',type:'Base aeróbica',visual:'cardio-c2',icon:'endurance',training:`50-55' en Z2`,duration:'50-55 min',objective:'Z2 · RPE 4 · ritmo libre según frecuencia cardiaca.',notes:'Sin progresivos.',preferredDay:'Miércoles 14/10'},
      C3:{session:'C3',type:'Senderismo / marcha específica',visual:'cardio-c3',icon:'mountain',training:'20 km · Z1-Z2',duration:'20 km',objective:'RPE 4-5 · ritmo sostenible. No correr ni buscar tiempo.',notes:'Usar calzado previsto para los 50 km; practicar hidratación, alimentación y mochila/material. Si la recuperación tras la boda es mala, reducir a 14-16 km.',preferredDay:'Lunes 12/10'}
    },
    2:{
      C1:{session:'C1',type:'Calidad controlada',visual:'cardio-c1',icon:'speed',training:`12' suave + 4 × 5' rápidos (rec. 2' trote suave) + 10' suave`,duration:'Aprox. 50 min',objective:'Ritmo orientativo 4:45-4:55 min/km · RPE 7-7,5.',notes:'Sesión controlada. No acabar al límite. Preferiblemente separar de Upper A varias horas.',preferredDay:'Lunes 19/10'},
      C2:{session:'C2',type:'Base aeróbica',visual:'cardio-c2',icon:'endurance',training:`55-60' en Z2`,duration:'55-60 min',objective:'Z2 · RPE 4 · ritmo libre según frecuencia cardiaca.',notes:'Sin progresivos.',preferredDay:'Viernes 23/10'},
      C3:{session:'C3',type:'Senderismo / resistencia específica',visual:'cardio-c3',icon:'mountain',training:'12-14 km · Z1-Z2',duration:'12-14 km',objective:'RPE 4 · última exposición específica antes del reto.',notes:'No convertirla en tirada larga exigente. Acabar con sensación de poder continuar.',preferredDay:'Domingo 25/10'}
    },
    3:{
      C2:{session:'C2',type:'Activación aeróbica',visual:'cardio-c2',icon:'endurance',training:`30-35' muy suave en Z1-Z2`,duration:'30-35 min',objective:'RPE 3 · mover piernas y mantener activación aeróbica.',notes:'Muy fácil. Sin progresivos.',preferredDay:'Miércoles 28/10'},
      C3:{session:'C3',type:'RETO 50 KM',visual:'cardio-c3',icon:'mountain',training:'50 km · marcha / senderismo',duration:'50 km',objective:'Completar de forma sostenible.',notes:'Gestionar el esfuerzo desde el inicio; alimentación e hidratación planificadas; no dejarse llevar por un ritmo excesivo en los primeros kilómetros; ajustar ritmo a desnivel, terreno y sensaciones.',preferredDay:'Domingo 01/11'}
    }
  };
  window.NEXUS_MESOCYCLE3_CARDIO=CARDIO;

  function weekNow(){const d=iso();if(d>='2026-10-26')return 3;if(d>='2026-10-19')return 2;return 1;}

  function buildRoutines(week){
    const w=String(week);
    return MASTER.map(r=>{
      const x=clone(r);
      x.exercises=x.exercises.filter(e=>Number(e.weeklySets?.[w]||0)>0).map(e=>{e.sets=Number(e.weeklySets[w]||0);e.reps=String(e.weeklyReps[w]??'');e.targetReps=e.reps;return e;});
      return x;
    }).filter(r=>r.exercises.length>0);
  }

  function persist(){
    try{
      if(typeof save==='function'&&typeof STORAGE!=='undefined'){save(STORAGE.plan,plan);save(STORAGE.routines,routines);}
      else if(typeof STORAGE!=='undefined'){localStorage.setItem(STORAGE.plan,JSON.stringify(plan));localStorage.setItem(STORAGE.routines,JSON.stringify(routines));}
    }catch(_){}
  }

  function validState(){
    if(typeof plan==='undefined'||typeof routines==='undefined'||plan?.id!==ID||!Array.isArray(routines))return false;
    const expected=buildRoutines(weekNow());
    if(routines.length!==expected.length)return false;
    return expected.every((r,i)=>routines[i]?.id===r.id&&Array.isArray(routines[i]?.exercises)&&routines[i].exercises.length===r.exercises.length&&r.exercises.every((e,j)=>routines[i].exercises[j]?.key===e.key&&Number(routines[i].exercises[j]?.sets)===Number(e.sets)));
  }

  function forceState(){if(typeof plan==='undefined'||typeof routines==='undefined')return;plan=clone(PLAN);routines=buildRoutines(weekNow());persist();}
  function activate(){if(!isDavid()||!activeDate()||typeof plan==='undefined'||typeof routines==='undefined')return false;if(!validState())forceState();return true;}

  function patchRepRanges(){
    if(typeof getTargetRepRange!=='function'||getTargetRepRange.__nexusMeso3)return;
    const original=getTargetRepRange;
    getTargetRepRange=function(key,week,fallback=''){
      if(plan?.id===ID){
        const w=String(week||weekNow());let e=null;
        try{e=activeWorkout?.exercises?.find(x=>x.key===key)||null}catch(_){}
        if(!e){try{for(const r of routines||[]){const q=r.exercises?.find(x=>x.key===key);if(q){e=q;break}}}catch(_){} }
        const v=e?.weeklyReps?.[w]??e?.targetReps??e?.reps;if(v!==undefined&&v!==null&&String(v)!=='')return String(v);
      }
      return original.apply(this,arguments);
    };
    getTargetRepRange.__nexusMeso3=true;
  }

  function patchPrevious(){
    if(typeof previousWeekExercise!=='function'||previousWeekExercise.__nexusMeso3)return;
    const original=previousWeekExercise;
    previousWeekExercise=function(routineId,key,currentWeek){
      if(plan?.id===ID&&Number(currentWeek)===1){
        try{const prior=(workouts||[]).find(w=>w?.planId!==ID&&w?.routineId===routineId&&w?.finishedAt&&w?.exercises?.some(e=>e.key===key));const e=prior?.exercises?.find(x=>x.key===key);if(e)return e;}catch(_){}
      }
      return original.apply(this,arguments);
    };
    previousWeekExercise.__nexusMeso3=true;
  }

  function patchStart(){
    if(typeof startWorkout!=='function'||startWorkout.__nexusMeso3)return;
    const original=startWorkout;
    startWorkout=function(routineId){
      if(isDavid()&&activeDate()){
        activate();
        const allowed=buildRoutines(weekNow()).some(r=>r.id===routineId);
        if(!allowed){if(typeof toast==='function')toast('Esta sesión no está programada esta semana');return;}
        try{const stale=activeWorkout&&activeWorkout.planId!==ID;if(stale){const hasData=(activeWorkout.exercises||[]).some(e=>(e.sets||[]).some(s=>s?.completed||s?.weight||s?.reps||s?.rir));const old=String(activeWorkout.startedAt||'').slice(0,10);if(!hasData||(old&&old<START)){activeWorkout=null;localStorage.removeItem(STORAGE.active);}}}catch(_){}
      }
      return original.apply(this,arguments);
    };
    startWorkout.__nexusMeso3=true;
  }

  function patchCardioLookup(){
    if(typeof getCardioNexusSession!=='function'||getCardioNexusSession.__nexusMeso3)return;
    const original=getCardioNexusSession;
    getCardioNexusSession=function(week,session){if(isDavid()&&activeDate())return CARDIO?.[Number(week)]?.[session]||null;return original.apply(this,arguments);};
    getCardioNexusSession.__nexusMeso3=true;
  }

  function patchCardioPreview(){
    if(typeof renderCardioNexusPreview!=='function'||renderCardioNexusPreview.__nexusMeso3)return;
    const original=renderCardioNexusPreview;
    renderCardioNexusPreview=function(){
      const result=original.apply(this,arguments);
      if(!isDavid()||!activeDate()||!document.getElementById('cardioNexusToggle')?.checked)return result;
      const week=Number(document.getElementById('cardioWeekInput')?.value||weekNow());const code=document.getElementById('cardioSessionInput')?.value;const s=CARDIO?.[week]?.[code];const p=document.getElementById('cardioNexusPreview');if(!p)return result;
      if(!s){p.innerHTML=`<div class="cardio-preview-title">Mesociclo 3 · Semana ${week} · ${esc2(code||'')}</div><div class="small"><strong>No realizar esta sesión esta semana.</strong></div>`;return result;}
      p.innerHTML=`<div class="cardio-preview-title">${typeof svgIcon==='function'?svgIcon(s.icon):''} Mesociclo 3 · Semana ${week} · ${s.session} · ${esc2(s.type)}</div><div class="small"><strong>Entrenamiento:</strong> ${esc2(s.training)}</div><div class="small" style="margin-top:6px"><strong>Referencia:</strong> ${esc2(s.duration)}</div><div class="small" style="margin-top:6px"><strong>Intensidad / objetivo:</strong> ${esc2(s.objective)}</div><div class="small" style="margin-top:6px"><strong>Día:</strong> ${esc2(s.preferredDay)}</div><div class="small" style="margin-top:6px"><strong>Nota:</strong> ${esc2(s.notes)}</div>`;
      return result;
    };
    renderCardioNexusPreview.__nexusMeso3=true;
  }

  function patchCardioSave(){
    if(typeof saveActivity!=='function'||saveActivity.__nexusMeso3)return;
    const original=saveActivity;
    saveActivity=function(){
      const enabled=isDavid()&&activeDate()&&document.getElementById('cardioNexusToggle')?.checked;const week=Number(document.getElementById('cardioWeekInput')?.value||weekNow());const code=document.getElementById('cardioSessionInput')?.value;const s=enabled?CARDIO?.[week]?.[code]:null;
      if(enabled&&!s){if(typeof toast==='function')toast('Esta sesión no está programada esta semana');return;}
      const before=Array.isArray(activities)?activities.length:0;const result=original.apply(this,arguments);
      if(s&&Array.isArray(activities)&&activities.length>before){const a=activities.find(x=>x.cardioNexus&&Number(x.cardioNexus.week)===week&&x.cardioNexus.session===code)||activities[activities.length-1];if(a?.cardioNexus){a.cardioNexus.programId=CARDIO_ID;a.cardioNexus.programName='Cardio - Mesociclo 3';a.cardioNexus.notes=s.notes;a.cardioNexus.preferredDay=s.preferredDay;try{save(STORAGE.activities,activities)}catch(_){}}}
      return result;
    };
    saveActivity.__nexusMeso3=true;
  }

  function cardioDone(week,code){
    try{return Array.isArray(activities)&&activities.some(a=>{const cn=a?.cardioNexus;if(!cn||cn.session!==code||Number(cn.week)!==Number(week))return false;const d=String(a?.date||'');return cn.programId===CARDIO_ID||(d>=START&&d<=END);});}catch(_){return false}
  }

  function ensureCardioHome(){
    let card=document.getElementById('nexusCardioWeekCard');
    if(!isDavid()||!activeDate())return;
    const routineCard=document.getElementById('routineList')?.closest('.card');const lastCard=document.getElementById('lastWorkoutHome')?.closest('.card');if(!routineCard||!lastCard)return;
    const week=weekNow();const sessions=['C1','C2','C3'].map(code=>({code,data:CARDIO?.[week]?.[code]})).filter(x=>x.data);
    if(!card){card=document.createElement('div');card.id='nexusCardioWeekCard';card.className='card nexus-cardio-week';lastCard.insertAdjacentElement('beforebegin',card);}
    card.innerHTML=`<div class="nexus-cardio-week-head"><div><h3 style="margin:0">Cardio</h3><div class="muted small" style="margin-top:3px">Mesociclo 3 · Semana ${week}</div></div><span class="pill">${sessions.length} sesiones</span></div><div class="nexus-cardio-week-list">${sessions.map(({code,data:s})=>{const done=cardioDone(week,code);return `<div class="nexus-cardio-session"><div class="nexus-cardio-session-icon">${typeof svgIcon==='function'?svgIcon(s.icon):''}</div><div><div class="nexus-cardio-session-title">${code} · ${esc2(s.type)}</div><div class="nexus-cardio-session-training">${esc2(s.training)}</div><div class="small muted" style="margin-top:3px">${esc2(s.preferredDay)}</div></div><div class="nexus-cardio-session-meta ${done?'nexus-cardio-done':''}">${done?'✓ Hecho':esc2(s.duration)}</div></div>`;}).join('')}</div>`;
  }

  function ensureProgramCard(){
    if(!isDavid()){document.getElementById('nexusDavidMeso3Card')?.remove();return}
    if(!activeDate()&&!upcoming()){document.getElementById('nexusDavidMeso3Card')?.remove();return}
    const base=document.getElementById('mesocycleSummary')?.closest('.card');if(!base)return;
    let c=document.getElementById('nexusDavidMeso3Card');if(!c){c=document.createElement('div');c.id='nexusDavidMeso3Card';c.className='card';base.insertAdjacentElement('afterend',c)}
    const active=activeDate(),week=weekNow();const schedule=SCHEDULE[String(week)]||SCHEDULE['1'];const weekLabel=week===1?'Reintroducción':week===2?'Semana principal de carga':'Taper 50 km';
    c.innerHTML=`<div class="eyebrow" style="color:#2563eb">${active?`Mesociclo 3 · Semana ${week} activa`:'Próximo bloque · cargado'}</div><h3 style="margin:5px 0 7px">Mesociclo 3</h3><div class="muted small">12 oct – 1 nov · 4 sesiones de fuerza · preparación específica 50 km</div><div class="small" style="margin-top:9px"><strong>Objetivo:</strong> mantener/progresar fuerza e hipertrofia minimizando interferencia con la marcha de 50 km.</div><div class="small" style="margin-top:8px"><strong>${active?'Semana actual':'Semana 1'}:</strong> ${weekLabel}. ${week===3?'RIR 4 · volumen muy reducido · sin Lower B.':week===2?'Compuestos y accesorios RIR 2 · sin fallo.':'Compuestos RIR 3 · accesorios RIR 2-3.'}</div><div class="small" style="margin-top:10px">${schedule.map(([d,x])=>`<div style="margin-top:4px"><strong>${d}:</strong> ${esc2(x)}</div>`).join('')}</div>`;
    if(active){const pill=document.getElementById('routineList')?.closest('.card')?.querySelector('.pill');if(pill)pill.textContent=`${buildRoutines(week).length} días`;}
  }

  function patchRenderHome(){
    if(typeof renderHome!=='function'||renderHome.__nexusMeso3)return;
    const original=renderHome;
    renderHome=function(){if(isDavid()&&activeDate())activate();const r=original.apply(this,arguments);try{ensureProgramCard();ensureCardioHome()}catch(_){}return r;};
    renderHome.__nexusMeso3=true;
  }

  function tick(){patchRepRanges();patchPrevious();patchStart();patchCardioLookup();patchCardioPreview();patchCardioSave();patchRenderHome();if(isDavid()&&activeDate())activate();ensureProgramCard();ensureCardioHome();}
  function boot(){tick();let n=0;const f=setInterval(()=>{tick();if(++n>=24)clearInterval(f)},500);setInterval(tick,30000);window.addEventListener('focus',()=>setTimeout(tick,80));document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(tick,80)});window.addEventListener('nexus:profile-selected',()=>setTimeout(tick,120));window.addEventListener('nexus:boot-complete',()=>setTimeout(tick,120));}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();