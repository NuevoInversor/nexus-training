(() => {
  const VERSION='v2.93';
  const ID='mesociclo-4-2026-11-09';
  const CARDIO_ID='cardio-mesociclo-4-2026-11-09';
  const START='2026-11-09', END='2026-12-13';
  const REVISION='m4-especializacion-v2';

  const clone=x=>JSON.parse(JSON.stringify(x));
  const iso=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const esc2=s=>typeof esc==='function'?esc(s):String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

  function isDavid(){
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='David' && (!gate || gate.classList.contains('hidden'));
  }
  const activeDate=()=>iso()>=START&&iso()<=END;
  const upcoming=()=>iso()<START;

  function W5(a,b,c,d,e){return {'1':a,'2':b,'3':c,'4':d,'5':e};}
  function E(key,name,unit,rest,sets,reps,rir,weight,notes={},programNote=''){
    return {
      key,name,unit,rest,
      sets:Number(sets['1']||0),reps:String(reps['1']??''),
      weeklySets:sets,weeklyReps:reps,weeklyRir:rir,weeklyWeight:weight,
      weeklyTargetNote:{
        '1':notes['1']||programNote||'',
        '2':notes['2']||programNote||'',
        '3':notes['3']||programNote||'',
        '4':notes['4']||programNote||'',
        '5':notes['5']||programNote||''
      },
      programNote:programNote||''
    };
  }

  const MASTER=[
    {id:'dia-1',name:'Upper A',emphasis:'Torso · fuerza/hipertrofia · 50-60 min',exercises:[
      E('press-banca','Press banca con barra','kg/lado',120,
        W5(4,4,4,4,2),W5('6','7','8','8','5'),W5('3','2-3','2','1','4'),W5('16,25','16,25','16,25','16,25','16,25'),
        {'4':'Semana 4: primeras series RIR 2-1; última serie RIR 1. No alcanzar fallo muscular.'}),
      E('remo-maquina','Remo pecho apoyado / máquina','kg/lado',120,
        W5(4,4,4,4,2),W5('8','9','10','10','6'),W5('3','2-3','2','1','4'),W5('30','30','30','30','30'),
        {'4':'Semana 4: última serie RIR 1; no forzar fallo.'}),
      E('press-inclinado','Press inclinado con mancuernas','kg manc.',120,
        W5(2,2,2,2,1),W5('7','8','9','9','6'),W5('3','2-3','2','1-2','4'),W5('22','22','22','22','20-22')),
      E('jalon-neutro','Jalón al pecho agarre neutro','kg',120,
        W5(2,2,2,2,1),W5('10','11','12','12','8'),W5('3','2-3','2','1-2','4'),W5('40','40','40','40','40'),
        {},'Si el bíceps domina el movimiento, mantener técnica y no buscar repeticiones extra.'),
      E('elevaciones-laterales-polea','Elevaciones laterales en polea','kg',90,
        W5(1,1,1,1,0),W5('17','18','20','20','—'),W5('3','2-3','2','1-2','—'),W5('2,5','2,5','2,5','2,5','—'),
        {'5':'OMITIR en taper.'}),
      E('curl-biceps','Curl bíceps en banco inclinado','kg manc.',90,
        W5(2,2,2,2,1),W5('10','11','12','12','8'),W5('3','2-3','2','1-2','4'),W5('12','12','12','12','12')),
      E('extension-triceps-polea','Extensión de tríceps en polea','kg',90,
        W5(2,2,2,2,1),W5('9','10','11','11','8'),W5('3','2-3','2','1-2','4'),W5('22,5','22,5','22,5','22,5','22,5'))
    ]},

    {id:'dia-2',name:'Lower A',emphasis:'Pierna · dominante de rodilla + core · conservador para carrera/pádel',exercises:[
      E('sentadilla-trasera','Sentadilla trasera','kg/lado',120,
        W5(3,3,3,2,2),W5('6','7','8','6','5'),W5('3','2-3','2','3','4'),W5('22,5','22,5','22,5','22,5','22,5')),
      E('prensa-inclinada','Prensa inclinada','kg/lado',120,
        W5(3,3,3,2,1),W5('8','9','10','8','8'),W5('3','2-3','2','3','4'),W5('30','30','30','30','25-30')),
      E('extension-cuadriceps','Extensión de cuádriceps','kg',90,
        W5(3,3,3,2,0),W5('12','13','14-15','12','—'),W5('3','2-3','2','3','—'),W5('25','25','25','25','—'),
        {'4':'Semana 4: objetivo 1-2 series; la segunda serie es opcional dentro del rango pautado.','5':'OMITIR en taper.'}),
      E('curl-femoral-tumbado','Curl femoral tumbado','kg',90,
        W5(3,3,3,2,0),W5('8','9','10','8','—'),W5('3','2-3','2','3','—'),W5('20','20','20','20','—'),
        {'4':'Semana 4: objetivo 1-2 series; la segunda serie es opcional dentro del rango pautado.','5':'OMITIR en taper.'}),
      E('gemelos-sentado','Gemelos sentado','kg',90,
        W5(3,3,3,2,0),W5('12','13','15','12','—'),W5('3','2-3','2','3','—'),W5('37,5','37,5','37,5','37,5','—'),
        {'4':'Semana 4: objetivo 1-2 series; la segunda serie es opcional dentro del rango pautado.','5':'OMITIR en taper.'}),
      E('plancha','Plancha abdominal','',60,
        W5(2,2,2,1,1),W5('45-60 s','45-60 s','45-60 s','45 s','30-45 s'),W5('técnico','técnico','técnico','técnico','técnico'),W5('Sin carga','Sin carga','Sin carga','Sin carga','Sin carga')),
      E('pallof-press','Pallof Press','kg',60,
        W5(2,2,2,1,1),W5('12-15/lado','12-15/lado','12-15/lado','12/lado','10/lado'),W5('técnico','técnico','técnico','técnico','técnico'),W5('10','10','10','10','10'))
    ]},

    {id:'dia-3',name:'Upper B',emphasis:'Torso · vertical + espalda · 50-60 min',exercises:[
      E('dominadas','Dominadas peso corporal','peso corporal',120,
        W5(4,4,4,4,2),W5('4','5','5','5','3'),W5('3','2-3','2','1','4'),W5('Peso corporal','Peso corporal','Peso corporal','Peso corporal','Peso corporal'),
        {'4':'Semana 4: no forzar repeticiones si la técnica se degrada.'}),
      E('press-militar','Press militar','kg/lado + barra',120,
        W5(4,4,4,4,2),W5('6','6-7','7','7','4'),W5('3','2-3','2','1','4'),W5('6,25','6,25','6,25','6,25','6,25'),
        {'4':'Semana 4: última serie puede llegar a RIR 1; no alcanzar fallo.'}),
      E('remo-polea-baja','Remo en polea baja','kg',120,
        W5(2,2,2,2,1),W5('9','10','11','11','6-8'),W5('3','2-3','2','1-2','4'),W5('40','40','40','40','40')),
      E('aperturas-maquina','Aperturas en máquina','kg',90,
        W5(2,2,2,2,1),W5('9','10','11','11','6-8'),W5('3','2-3','2','1-2','4'),W5('22,5','22,5','22,5','22,5','22,5')),
      E('fondos-paralela','Fondos en paralelas','peso corporal',120,
        W5(2,2,2,2,1),W5('10','11','12','12','6'),W5('3','2-3','2','1-2','4'),W5('Peso corporal','Peso corporal','Peso corporal','Peso corporal','Peso corporal')),
      E('facepull','Face Pull','kg',90,
        W5(1,1,1,1,0),W5('16','18','20','20','—'),W5('3','2-3','2','1-2','—'),W5('20','20','20','20','—'),
        {'5':'OMITIR en taper.'}),
      E('pajaros-peck-deck','Pájaros en Peck Deck','kg',90,
        W5(1,1,1,1,0),W5('16','17','18','18','—'),W5('3','2-3','2','1-2','—'),W5('10','10','10','10','—'),
        {'5':'OMITIR en taper.'})
    ]},

    {id:'dia-4',name:'Lower B',emphasis:'Pierna · cadena posterior + core · conservador para carrera/pádel',exercises:[
      E('peso-muerto-rumano-dia4','Peso muerto rumano','kg/lado',120,
        W5(3,3,3,2,0),W5('7','7-8','8','6','—'),W5('3','2-3','2','3','—'),W5('16,25','16,25','16,25','16,25','—'),
        {'5':'OMITIR en taper.'}),
      E('sentadilla-bulgara','Sentadilla búlgara','kg/lado',120,
        W5(2,3,3,2,0),W5('8','10','11','8','—'),W5('3','2-3','2','3','—'),W5('7,5','7,5','7,5','7,5','—'),
        {'4':'Semana 4: objetivo 1-2 series; la segunda serie es opcional dentro del rango pautado.','5':'OMITIR en taper.'}),
      E('hip-thrust','Hip Thrust','kg',120,
        W5(3,3,3,2,0),W5('8','9','10','8','—'),W5('3','2-3','2','3','—'),W5('25','25','25','25','—'),
        {'4':'Semana 4: objetivo 1-2 series; la segunda serie es opcional dentro del rango pautado.','5':'OMITIR en taper.'}),
      E('curl-femoral-sentado','Curl femoral sentado','kg',90,
        W5(3,3,3,2,0),W5('10','11','12','10','—'),W5('3','2-3','2','3','—'),W5('32,5','32,5','32,5','32,5','—'),
        {'4':'Semana 4: objetivo 1-2 series; la segunda serie es opcional dentro del rango pautado.','5':'OMITIR en taper.'}),
      E('gemelos-prensa','Gemelos en prensa / de pie','kg/lado',90,
        W5(2,2,2,2,0),W5('12','13','15','12','—'),W5('3','2-3','2','3','—'),W5('35','35','35','35','—'),
        {'4':'OMITIR si hay fatiga de carrera o pádel.','5':'OMITIR en taper.'}),
      E('elevaciones-piernas','Elevaciones de piernas colgando','peso corporal',60,
        W5(2,2,2,1,0),W5('15','15','15','12','—'),W5('técnico','técnico','técnico','técnico','—'),W5('Peso corporal','Peso corporal','Peso corporal','Peso corporal','—'),
        {'5':'OMITIR en taper.'}),
      E('abd-wheel','Ab Wheel','peso corporal',60,
        W5(2,2,2,1,0),W5('10-12','10-12','10-12','8-10','—'),W5('técnico','técnico','técnico','técnico','—'),W5('Peso corporal','Peso corporal','Peso corporal','Peso corporal','—'),
        {'5':'OMITIR en taper.'})
    ]},

    {id:'dia-5',name:'Especialización',emphasis:'Tercer estímulo Upper · hombro, brazos, espalda y core · miércoles',exercises:[
      E('dominadas-especializacion','Dominadas peso corporal','peso corporal',120,
        W5(2,2,2,2,0),W5('4','5','5','5','—'),W5('3','2-3','2','1-2','—'),W5('Peso corporal','Peso corporal','Peso corporal','Peso corporal','—'),
        {'5':'OMITIR por taper.'}),
      E('elevaciones-laterales-especializacion','Elevaciones laterales en polea','kg',90,
        W5(3,3,3,3,0),W5('17','18','20','20','—'),W5('3','2-3','2','1','—'),W5('2,5','2,5','2,5','2,5','—'),
        {'5':'OMITIR por taper.'}),
      E('pajaros-peck-deck-especializacion','Pájaros en Peck Deck','kg',90,
        W5(2,2,2,2,0),W5('16','17','18','18','—'),W5('3','2-3','2','1-2','—'),W5('10','10','10','10','—'),
        {'5':'OMITIR por taper.'}),
      E('curl-biceps-polea','Curl de bíceps en polea','kg',90,
        W5(2,2,2,2,0),W5('10','11','12','12','—'),W5('3','2-3','2','1','—'),W5('22,5','22,5','22,5','22,5','—'),
        {'5':'OMITIR por taper.'}),
      E('extension-triceps-overhead','Extensión de tríceps overhead','kg',90,
        W5(2,2,2,2,0),W5('10','11','12','12','—'),W5('3','2-3','2','1','—'),W5('22,5','22,5','22,5','22,5','—'),
        {'5':'OMITIR por taper.'}),
      E('pallof-press-especializacion','Pallof Press','kg',60,
        W5(1,1,1,1,0),W5('12/lado','12/lado','12/lado','12/lado','—'),W5('técnico','técnico','técnico','técnico','—'),W5('10','10','10','10','—'),
        {'5':'OMITIR por taper.'}),
      E('abd-wheel-especializacion','Ab Wheel','peso corporal',60,
        W5(1,1,1,1,0),W5('8-10','10','10-12','10','—'),W5('3','2-3','2','2','—'),W5('Peso corporal','Peso corporal','Peso corporal','Peso corporal','—'),
        {'5':'OMITIR por taper.'})
    ]}
  ];

  const PLAN={
    id:ID,name:'Mesociclo 4',startDate:START,endDate:END,
    weekDates:{'1':'2026-11-09','2':'2026-11-16','3':'2026-11-23','4':'2026-11-30','5':'2026-12-07'},
    weeklyRir:{
      '1':'Upper 3 · Lower 3',
      '2':'Upper 2-3 · Lower 2-3',
      '3':'Upper 2 · Lower 2',
      '4':'Upper 1-2 · Lower 3',
      '5':'RIR 4 · taper'
    },
    exerciseRir:{},
    revision:REVISION,
    progressionRule:'Mantener/progresar fuerza e hipertrofia mientras se prepara la media maratón del 13/12/2026. Semanas 1-4: 4 sesiones base de fuerza + Especialización como tercer estímulo Upper, redistribuyendo volumen sin aumentar de forma significativa el volumen semanal total. Si hay pádel el miércoles, sustituye Especialización y no se recupera otro día. Semana 5: eliminar Especialización por taper. Mantener 3 sesiones de carrera C1/C2/C3; pico de tirada larga de 17 km el 29/11; referencia específica central C3 ~5:15/km.',
    deloadGuidelines:'Semana 4: pico de esfuerzo Upper sin fallo + reducción progresiva de Lower. Accesorios de Upper/Especialización pueden llegar a RIR 1 sin fallo muscular. Semana 5: taper completo y Especialización eliminada. No progresar Lower si interfiere con carrera o pádel.'
  };
  MASTER.forEach(r=>r.exercises.forEach(e=>{PLAN.exerciseRir[e.key]=clone(e.weeklyRir);}));

  const SCHEDULE={
    '1':[
      ['Lun 09/11','Upper A + C2'],['Mar 10/11','Lower A'],['Mié 11/11','Especialización · si hay pádel, el pádel la sustituye'],['Jue 12/11','Lower B'],
      ['Vie 13/11','C1 + Upper B'],['Sáb 14/11','Descanso'],['Dom 15/11','C3 · 12 km']
    ],
    '2':[
      ['Lun 16/11','Upper A + C2'],['Mar 17/11','Lower A'],['Mié 18/11','Especialización · si hay pádel, el pádel la sustituye'],['Jue 19/11','Lower B'],
      ['Vie 20/11','C1 + Upper B'],['Sáb 21/11','Descanso'],['Dom 22/11','C3 · 14 km']
    ],
    '3':[
      ['Lun 23/11','Upper A + C2'],['Mar 24/11','Lower A'],['Mié 25/11','Especialización · si hay pádel, el pádel la sustituye'],['Jue 26/11','Lower B'],
      ['Vie 27/11','C1 + Upper B'],['Sáb 28/11','Descanso'],['Dom 29/11','C3 · 17 km · tirada pico']
    ],
    '4':[
      ['Lun 30/11','Upper A + C2'],['Mar 01/12','Lower A reducido'],['Mié 02/12','Especialización · si hay pádel, el pádel la sustituye'],['Jue 03/12','Lower B reducido'],
      ['Vie 04/12','C1 + Upper B'],['Sáb 05/12','Descanso'],['Dom 06/12','C3 · 10-12 km']
    ],
    '5':[
      ['Lun 07/12','Upper A taper + C2'],['Mar 08/12','Lower A taper'],['Mié 09/12','Descanso · Especialización eliminada por taper'],['Jue 10/12','Lower B omitido'],
      ['Vie 11/12','C1 activación + Upper B taper'],['Sáb 12/12','Descanso total'],['Dom 13/12','C3 · MEDIA MARATÓN 21,1 km']
    ]
  };

  const CARDIO={
    1:{
      C1:{session:'C1',type:'Calidad / rendimiento',visual:'cardio-c1',icon:'speed',training:`15' suave + 4 × 5' a 4:50-5:00/km (rec. 2' trote suave) + 10' suave`,duration:'Aprox. 53 min',objective:'RPE 6-7 · ritmo + RPE + recuperación.',notes:'No recuperar sesiones perdidas. Ajustar según reglas de pádel.',preferredDay:'Viernes 13/11'},
      C2:{session:'C2',type:'Base aeróbica',visual:'cardio-c2',icon:'endurance',training:`45-50' · ritmo orientativo 6:20-6:45/km`,duration:'45-50 min',objective:'Z2 por FC + RPE 4. Si para mantener Z2 necesitas correr más lento, manda la FC.',notes:'Ritmo orientativo; prioridad FC Z2 + RPE.',preferredDay:'Lunes 09/11'},
      C3:{session:'C3',type:'Tirada larga específica',visual:'cardio-c3',icon:'endurance',training:'12 km · km 1-3 a 5:30-5:35/km · km 4-9 a 5:20-5:25/km · km 10-12 ~5:15/km si buenas sensaciones',duration:'12 km',objective:'RPE 4-5 · progresión controlada.',notes:'La tirada larga del domingo es la sesión prioritaria de carrera.',preferredDay:'Domingo 15/11'}
    },
    2:{
      C1:{session:'C1',type:'Calidad / rendimiento',visual:'cardio-c1',icon:'speed',training:`15' + 3 × 8' a 4:55-5:05/km (rec. 2'30" trote suave) + 10'`,duration:'Aprox. 57 min',objective:'RPE 7.',notes:'No recuperar sesiones perdidas. Ajustar según reglas de pádel.',preferredDay:'Viernes 20/11'},
      C2:{session:'C2',type:'Base aeróbica',visual:'cardio-c2',icon:'endurance',training:`50' · ritmo orientativo 6:15-6:40/km`,duration:'50 min',objective:'Z2 por FC + RPE 4.',notes:'El ritmo es orientativo; manda la FC.',preferredDay:'Lunes 16/11'},
      C3:{session:'C3',type:'Tirada larga específica',visual:'cardio-c3',icon:'endurance',training:'14 km · km 1-3 a 5:25-5:30/km · km 4-11 a 5:15-5:20/km · km 12-14 mantener 5:15-5:20/km o acelerar ligeramente si RPE ≤5-6',duration:'14 km',objective:'RPE controlado · consolidar ritmo específico.',notes:'La tirada larga del domingo es prioritaria.',preferredDay:'Domingo 22/11'}
    },
    3:{
      C1:{session:'C1',type:'Calidad / rendimiento',visual:'cardio-c1',icon:'speed',training:`15' + 3 × 2 km a 4:55-5:05/km (rec. 2'30" trote suave) + 10'`,duration:'Por bloques',objective:'RPE ~7.',notes:'No recuperar sesiones perdidas. Ajustar según reglas de pádel.',preferredDay:'Viernes 27/11'},
      C2:{session:'C2',type:'Base aeróbica',visual:'cardio-c2',icon:'endurance',training:`50-55' · ritmo orientativo 6:15-6:40/km`,duration:'50-55 min',objective:'Z2 + RPE 4.',notes:'El ritmo es orientativo; manda la FC.',preferredDay:'Lunes 23/11'},
      C3:{session:'C3',type:'Tirada larga específica · pico',visual:'cardio-c3',icon:'endurance',training:'17 km · km 1-3 a 5:25-5:30/km · km 4-14 a 5:15-5:20/km · km 15-17 a 5:10-5:15/km solo si sensaciones muy buenas',duration:'17 km',objective:'RPE inicio 4 · central 4-5 · final máx. 6. Consolidar ~5:15/km como referencia específica central.',notes:'Pico de volumen del bloque.',preferredDay:'Domingo 29/11'}
    },
    4:{
      C1:{session:'C1',type:'Calidad / rendimiento',visual:'cardio-c1',icon:'speed',training:`15' + 3 × 6' a 4:55-5:05/km (rec. 2') + 10'`,duration:'Aprox. 47 min',objective:'RPE 6-7.',notes:'Semana de pico Upper y descarga progresiva Lower. Ajustar según pádel.',preferredDay:'Viernes 04/12'},
      C2:{session:'C2',type:'Base aeróbica',visual:'cardio-c2',icon:'endurance',training:`40-45' · ritmo orientativo 6:20-6:45/km`,duration:'40-45 min',objective:'Z2 + RPE 3-4.',notes:'Mantener fácil.',preferredDay:'Lunes 30/11'},
      C3:{session:'C3',type:'Tirada larga específica',visual:'cardio-c3',icon:'endurance',training:'10-12 km · 5:20-5:30/km',duration:'10-12 km',objective:'RPE 4-5.',notes:'Sin progresión final.',preferredDay:'Domingo 06/12'}
    },
    5:{
      C1:{session:'C1',type:'Activación de calidad',visual:'cardio-c1',icon:'speed',training:`10-15' + 3 × 3' a 4:55-5:05/km (rec. 2') + 10'`,duration:'Activación',objective:'Activación, no entrenamiento duro.',notes:'Semana de carrera. Evitar pádel.',preferredDay:'Viernes 11/12'},
      C2:{session:'C2',type:'Activación aeróbica',visual:'cardio-c2',icon:'endurance',training:`25-30' · ritmo orientativo 6:25-6:50/km · Z1-Z2`,duration:'25-30 min',objective:'RPE 3.',notes:'Añadir 3-4 progresivos de 20" solo si las piernas están perfectas.',preferredDay:'Lunes 07/12'},
      C3:{session:'C3',type:'MEDIA MARATÓN',visual:'cardio-c3',icon:'endurance',training:'21,1 km · MEDIA MARATÓN',duration:'21,1 km',objective:'Ritmo definitivo pendiente de decidir tras revisar C1 Semana 2, 3×2 km Semana 3 y tirada de 17 km del 29/11.',notes:'13/12/2026 · semana de carrera. Evitar pádel.',preferredDay:'Domingo 13/12'}
    }
  };
  window.NEXUS_MESOCYCLE4_CARDIO=CARDIO;

  const PADEL_RULES=[
    'Ubicación preferente: miércoles.',
    'Si hay pádel el miércoles, sustituye Especialización; no recuperar Especialización otro día.',
    'Si el pádel cae a menos de 48 h del C1: eliminar C1 esa semana.',
    'Si cae a 72 h o más del C1 y las piernas están normales: mantener C1 reduciendo ~25-30% el volumen.',
    'Evitar pádel viernes o sábado antes de la tirada larga.',
    'Si se juega entre martes y jueves: reducir Lower A ~20-25% si hay fatiga; omitir Lower B si las piernas no están recuperadas.',
    'El pádel sustituye parte de la carga de calidad; no se añade como cuarta sesión intensa.',
    'Semana de carrera: evitar pádel.'
  ];

  function weekNow(){
    const d=iso();
    if(d>='2026-12-07')return 5;
    if(d>='2026-11-30')return 4;
    if(d>='2026-11-23')return 3;
    if(d>='2026-11-16')return 2;
    return 1;
  }

  function buildRoutines(week){
    const w=String(week);
    return MASTER.map(r=>{
      const x=clone(r);
      x._nexusM4Revision=REVISION;
      x.exercises=x.exercises
        .filter(e=>Number(e.weeklySets?.[w]||0)>0)
        .map(e=>{
          e.sets=Number(e.weeklySets[w]||0);
          e.reps=String(e.weeklyReps[w]??'');
          e.targetReps=e.reps;
          return e;
        });
      return x;
    }).filter(r=>r.exercises.length>0);
  }

  function persist(){
    try{
      if(typeof save==='function'&&typeof STORAGE!=='undefined'){
        save(STORAGE.plan,plan);
        save(STORAGE.routines,routines);
      }else if(typeof STORAGE!=='undefined'){
        localStorage.setItem(STORAGE.plan,JSON.stringify(plan));
        localStorage.setItem(STORAGE.routines,JSON.stringify(routines));
      }
    }catch(_){}
  }

  function validState(){
    if(typeof plan==='undefined'||typeof routines==='undefined'||plan?.id!==ID||plan?.revision!==REVISION||!Array.isArray(routines))return false;
    const expected=buildRoutines(weekNow());
    if(routines.length!==expected.length)return false;
    return expected.every((r,i)=>
      routines[i]?.id===r.id &&
      routines[i]?._nexusM4Revision===REVISION &&
      Array.isArray(routines[i]?.exercises) &&
      routines[i].exercises.length===r.exercises.length &&
      r.exercises.every((e,j)=>
        routines[i].exercises[j]?.key===e.key &&
        Number(routines[i].exercises[j]?.sets)===Number(e.sets) &&
        String(routines[i].exercises[j]?.reps??'')===String(e.reps??'') &&
        String(routines[i].exercises[j]?.weeklyWeight?.[String(weekNow())]??'')===String(e.weeklyWeight?.[String(weekNow())]??'') &&
        String(routines[i].exercises[j]?.weeklyRir?.[String(weekNow())]??'')===String(e.weeklyRir?.[String(weekNow())]??'')
      )
    );
  }

  function forceState(){
    if(typeof plan==='undefined'||typeof routines==='undefined')return;
    plan=clone(PLAN);
    routines=buildRoutines(weekNow());
    persist();
  }

  function activate(){
    if(!isDavid()||!activeDate()||typeof plan==='undefined'||typeof routines==='undefined')return false;
    if(!validState())forceState();
    return true;
  }

  function patchCurrentWeekWorkout(){
    if(typeof getCurrentWeekWorkout!=='function'||getCurrentWeekWorkout.__nexusM4)return;
    const original=getCurrentWeekWorkout;
    getCurrentWeekWorkout=function(routineId){
      if(plan?.id===ID){
        const week=weekNow();
        return (workouts||[]).find(w=>w?.planId===ID&&w?.routineId===routineId&&Number(w?.mesocycleWeek)===week)||null;
      }
      return original.apply(this,arguments);
    };
    getCurrentWeekWorkout.__nexusM4=true;
  }

  function latestPriorExercise(routineId,key){
    try{
      const list=(workouts||[])
        .filter(w=>w?.planId!==ID&&w?.finishedAt&&w?.exercises?.some(e=>e.key===key))
        .slice()
        .sort((a,b)=>new Date(b.finishedAt||b.startedAt||0)-new Date(a.finishedAt||a.startedAt||0));
      const same=list.find(w=>w.routineId===routineId);
      const w=same||list[0];
      return w?.exercises?.find(e=>e.key===key)||null;
    }catch(_){return null;}
  }

  function patchPrevious(){
    if(typeof previousWeekExercise!=='function'||previousWeekExercise.__nexusM4)return;
    const original=previousWeekExercise;
    previousWeekExercise=function(routineId,key,currentWeek){
      if(plan?.id===ID&&Number(currentWeek)===1)return latestPriorExercise(routineId,key)||null;
      return original.apply(this,arguments);
    };
    previousWeekExercise.__nexusM4=true;
  }

  function patchRepRanges(){
    if(typeof getTargetRepRange!=='function'||getTargetRepRange.__nexusM4)return;
    const original=getTargetRepRange;
    getTargetRepRange=function(key,week,fallback=''){
      if(plan?.id===ID){
        const w=String(week||weekNow());
        let e=null;
        try{e=activeWorkout?.exercises?.find(x=>x.key===key)||null;}catch(_){}
        if(!e){
          try{for(const r of routines||[]){const q=r.exercises?.find(x=>x.key===key);if(q){e=q;break;}}}catch(_){}
        }
        const v=e?.weeklyReps?.[w]??e?.targetReps??e?.reps;
        if(v!==undefined&&v!==null&&String(v)!=='')return String(v);
      }
      return original.apply(this,arguments);
    };
    getTargetRepRange.__nexusM4=true;
  }

  function patchStart(){
    if(typeof startWorkout!=='function'||startWorkout.__nexusM4)return;
    const original=startWorkout;
    startWorkout=function(routineId){
      if(isDavid()&&activeDate()){
        activate();
        const allowed=buildRoutines(weekNow()).some(r=>r.id===routineId);
        if(!allowed){
          if(typeof toast==='function')toast('Esta sesión no está programada esta semana');
          return;
        }
        try{
          if(activeWorkout&&activeWorkout.planId!==ID){
            const hasRecorded=(activeWorkout.exercises||[]).some(e=>(e.sets||[]).some(s=>{
              const reps=String(s?.reps??'').trim()!=='';
              const rir=String(s?.rir??'').trim()!=='';
              const weight=e?.unit==='peso corporal'||String(s?.weight??'').trim()!=='';
              return s?.completed||s?.completedAt||(reps&&rir&&weight);
            }));
            const old=String(activeWorkout.startedAt||'').slice(0,10);
            if(!hasRecorded||(old&&old<START)){
              activeWorkout=null;
              localStorage.removeItem(STORAGE.active);
            }
          }
        }catch(_){}
      }
      return original.apply(this,arguments);
    };
    startWorkout.__nexusM4=true;
  }

  function patchCardioLookup(){
    if(typeof getCardioNexusSession!=='function'||getCardioNexusSession.__nexusM4)return;
    const original=getCardioNexusSession;
    getCardioNexusSession=function(week,session){
      if(isDavid()&&activeDate())return CARDIO?.[Number(week)]?.[session]||null;
      return original.apply(this,arguments);
    };
    getCardioNexusSession.__nexusM4=true;
  }

  function patchCardioPreview(){
    if(typeof renderCardioNexusPreview!=='function'||renderCardioNexusPreview.__nexusM4)return;
    const original=renderCardioNexusPreview;
    renderCardioNexusPreview=function(){
      const result=original.apply(this,arguments);
      if(!isDavid()||!activeDate()||!document.getElementById('cardioNexusToggle')?.checked)return result;
      const week=Number(document.getElementById('cardioWeekInput')?.value||weekNow());
      const code=document.getElementById('cardioSessionInput')?.value;
      const s=CARDIO?.[week]?.[code];
      const p=document.getElementById('cardioNexusPreview');
      if(!p)return result;
      if(!s){
        p.innerHTML=`<div class="cardio-preview-title">Mesociclo 4 · Semana ${week} · ${esc2(code||'')}</div><div class="small"><strong>No realizar esta sesión esta semana.</strong></div>`;
        return result;
      }
      p.innerHTML=`<div class="cardio-preview-title">${typeof svgIcon==='function'?svgIcon(s.icon):''} Mesociclo 4 · Semana ${week} · ${s.session} · ${esc2(s.type)}</div>
        <div class="small"><strong>Entrenamiento:</strong> ${esc2(s.training)}</div>
        <div class="small" style="margin-top:6px"><strong>Referencia:</strong> ${esc2(s.duration)}</div>
        <div class="small" style="margin-top:6px"><strong>Intensidad / objetivo:</strong> ${esc2(s.objective)}</div>
        <div class="small" style="margin-top:6px"><strong>Día:</strong> ${esc2(s.preferredDay)}</div>
        <div class="small" style="margin-top:6px"><strong>Nota:</strong> ${esc2(s.notes)}</div>`;
      return result;
    };
    renderCardioNexusPreview.__nexusM4=true;
  }

  function patchCardioSave(){
    if(typeof saveActivity!=='function'||saveActivity.__nexusM4)return;
    const original=saveActivity;
    saveActivity=function(){
      const enabled=isDavid()&&activeDate()&&document.getElementById('cardioNexusToggle')?.checked;
      const week=Number(document.getElementById('cardioWeekInput')?.value||weekNow());
      const code=document.getElementById('cardioSessionInput')?.value;
      const s=enabled?CARDIO?.[week]?.[code]:null;
      if(enabled&&!s){
        if(typeof toast==='function')toast('Esta sesión no está programada esta semana');
        return;
      }
      const before=Array.isArray(activities)?activities.length:0;
      const result=original.apply(this,arguments);
      if(s&&Array.isArray(activities)&&activities.length>before){
        const a=activities.find(x=>x.cardioNexus&&Number(x.cardioNexus.week)===week&&x.cardioNexus.session===code)||activities[activities.length-1];
        if(a?.cardioNexus){
          a.cardioNexus.programId=CARDIO_ID;
          a.cardioNexus.programName='Cardio - Mesociclo 4';
          a.cardioNexus.notes=s.notes;
          a.cardioNexus.preferredDay=s.preferredDay;
          try{save(STORAGE.activities,activities);}catch(_){}
        }
      }
      return result;
    };
    saveActivity.__nexusM4=true;
  }

  function cardioDone(week,code){
    try{
      return Array.isArray(activities)&&activities.some(a=>{
        const cn=a?.cardioNexus;
        if(!cn||cn.session!==code||Number(cn.week)!==Number(week))return false;
        const d=String(a?.date||'');
        return cn.programId===CARDIO_ID||(d>=START&&d<=END);
      });
    }catch(_){return false;}
  }

  function ensureCardioHome(){
    let card=document.getElementById('nexusCardioWeekCard');
    if(!isDavid()||!activeDate())return;
    const lastCard=document.getElementById('lastWorkoutHome')?.closest('.card');
    if(!lastCard)return;
    const week=weekNow();
    const sessions=['C1','C2','C3'].map(code=>({code,data:CARDIO?.[week]?.[code]})).filter(x=>x.data);
    if(!card){
      card=document.createElement('div');
      card.id='nexusCardioWeekCard';
      card.className='card nexus-cardio-week';
      lastCard.insertAdjacentElement('beforebegin',card);
    }
    card.innerHTML=`<div class="nexus-cardio-week-head"><div><h3 style="margin:0">Cardio</h3><div class="muted small" style="margin-top:3px">Mesociclo 4 · Semana ${week}</div></div><span class="pill">3 sesiones</span></div>
      <div class="nexus-cardio-week-list">${sessions.map(({code,data:s})=>{
        const done=cardioDone(week,code);
        return `<div class="nexus-cardio-session">
          <div class="nexus-cardio-session-icon">${typeof svgIcon==='function'?svgIcon(s.icon):''}</div>
          <div><div class="nexus-cardio-session-title">${code} · ${esc2(s.type)}</div><div class="nexus-cardio-session-training">${esc2(s.training)}</div><div class="small muted" style="margin-top:3px">${esc2(s.preferredDay)}</div></div>
          <div class="nexus-cardio-session-meta ${done?'nexus-cardio-done':''}">${done?'✓ Hecho':esc2(s.duration)}</div>
        </div>`;
      }).join('')}</div>`;
  }

  function ensureProgramCard(){
    if(!isDavid()){
      document.getElementById('nexusDavidMeso4Card')?.remove();
      return;
    }
    if(!activeDate()&&!upcoming()){
      document.getElementById('nexusDavidMeso4Card')?.remove();
      return;
    }
    const base=document.getElementById('mesocycleSummary')?.closest('.card');
    if(!base)return;
    let c=document.getElementById('nexusDavidMeso4Card');
    if(!c){
      c=document.createElement('div');
      c.id='nexusDavidMeso4Card';
      c.className='card';
      base.insertAdjacentElement('afterend',c);
    }
    const active=activeDate();
    const week=active?weekNow():1;
    const schedule=SCHEDULE[String(week)]||SCHEDULE['1'];
    const weekLabel=week===1?'RIR 3':week===2?'RIR 2-3':week===3?'RIR 2':week===4?'Pico Upper · Lower reducido':'Taper + media maratón';
    c.innerHTML=`
      <div class="eyebrow" style="color:#2563eb">${active?`Mesociclo 4 · Semana ${week} activa`:'Próximo bloque · cargado'}</div>
      <h3 style="margin:5px 0 7px">Mesociclo 4 · Media maratón</h3>
      <div class="muted small">09 nov – 13 dic · 4 días base + Especialización S1-S4 · C1/C2/C3 · media maratón 13/12</div>
      <div class="small" style="margin-top:9px"><strong>Objetivo:</strong> mantener/progresar fuerza e hipertrofia mientras se prepara la media maratón.</div>
      <div class="small" style="margin-top:8px"><strong>${active?'Semana actual':'Semana 1'}:</strong> ${weekLabel}. ${week<5?'Especialización miércoles; si hay pádel, se sustituye y no se recupera.':'Especialización eliminada por taper.'} Tirada prioritaria: ${week===3?'17 km el 29/11':week===5?'media maratón 21,1 km':'domingo C3'}.</div>
      <div class="small" style="margin-top:10px">${schedule.map(([d,x])=>`<div style="margin-top:4px"><strong>${esc2(d)}:</strong> ${esc2(x)}</div>`).join('')}</div>
      <details style="margin-top:12px"><summary class="small" style="font-weight:900;cursor:pointer">Reglas de pádel</summary>
        <div class="small muted" style="margin-top:7px">${PADEL_RULES.map(x=>`<div style="margin-top:4px">• ${esc2(x)}</div>`).join('')}</div>
      </details>
    `;
    if(active){
      const pill=document.getElementById('routineList')?.closest('.card')?.querySelector('.pill');
      if(pill)pill.textContent=`${buildRoutines(week).length} días fuerza`;
    }
  }

  function patchRenderHome(){
    if(typeof renderHome!=='function'||renderHome.__nexusM4)return;
    const original=renderHome;
    renderHome=function(){
      if(isDavid()&&activeDate())activate();
      const result=original.apply(this,arguments);
      try{ensureProgramCard();ensureCardioHome();}catch(_){}
      return result;
    };
    renderHome.__nexusM4=true;
  }

  function tick(){
    patchCurrentWeekWorkout();
    patchPrevious();
    patchRepRanges();
    patchStart();
    patchCardioLookup();
    patchCardioPreview();
    patchCardioSave();
    patchRenderHome();
    if(isDavid()&&activeDate())activate();
    ensureProgramCard();
    ensureCardioHome();
  }

  function boot(){
    tick();
    let n=0;
    const fast=setInterval(()=>{tick();if(++n>=24)clearInterval(fast);},500);
    setInterval(tick,30000);
    window.addEventListener('focus',()=>setTimeout(tick,80));
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')setTimeout(tick,80);});
    window.addEventListener('nexus:profile-selected',()=>setTimeout(tick,120));
    window.addEventListener('nexus:boot-complete',()=>setTimeout(tick,120));
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();