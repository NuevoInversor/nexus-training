(() => {
  // Mesociclo Ana actualizado el 08/11/2026. Historial anterior se conserva en Cloud.
  const VERSION='v2.91';
  const STAMP='08/11/2026';
  const PLAN_ID='ana-fuerza-dinamica-8s-2026-11-09';

  const PLAN={
    "id": "ana-fuerza-dinamica-8s-2026-11-09",
    "name": "Mesociclo Ana · Fuerza dinámica · 8 semanas",
    "startDate": "2026-11-09",
    "endDate": "2027-01-03",
    "weekDates": {
      "1": "2026-11-09",
      "2": "2026-11-16",
      "3": "2026-11-23",
      "4": "2026-11-30",
      "5": "2026-12-07",
      "6": "2026-12-14",
      "7": "2026-12-21",
      "8": "2026-12-28"
    },
    "weeklyRir": {
      "1": "3",
      "2": "2-3",
      "3": "2",
      "4": "2",
      "5": "4",
      "6": "3",
      "7": "2-3",
      "8": "2"
    },
    "exerciseRir": {},
    "deloadWeek": 5,
    "deloadGuidelines": "Semana 5 (7–13 dic): reducir 30–40% de series, RIR 4, sin drop sets ni fallo. Todas las máquinas se usan una sola vez por sesión.",
    "progressionRule": "4 sesiones: lunes Lower A, martes Upper A, jueves Lower B, sábado Upper B/Full Body. Una sola visita por máquina o estación: terminar todas las series, soltar y pasar a la siguiente. Sin circuitos ni superseries entre estaciones; Pilates y cardio independientes. Descansos máximos 60 s, accesorios 45 s. Progresar primero repeticiones; luego la carga mínima disponible si se alcanza rango alto y RIR objetivo. Técnica y recuperación por encima de aumentar pulsaciones. Drop set opcional de un solo accesorio en S4/S8."
  };

  const ROUTINES=[
    {
      "id": "dia-1",
      "name": "Lower A",
      "estimatedDuration": "45-50 min",
      "exercises": [
        {
          "key": "prensa-inclinada",
          "name": "Prensa inclinada",
          "sets": 3,
          "reps": "8-12",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "8-12",
            "2": "8-12",
            "3": "8-12",
            "4": "8-12",
            "5": "8-12",
            "6": "8-12",
            "7": "8-12",
            "8": "8-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "40"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Series en onda 12-10-8; aumentar carga entre series solo si se mantiene RIR. Dos series de aproximación no computan. Referencia anterior: 40 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Series en onda 12-10-8; aumentar carga entre series solo si se mantiene RIR. Dos series de aproximación no computan.",
            "3": "Doble progresión: reps y luego peso. Series en onda 12-10-8; aumentar carga entre series solo si se mantiene RIR. Dos series de aproximación no computan.",
            "4": "Consolidación sin fallo. Series en onda 12-10-8; aumentar carga entre series solo si se mantiene RIR. Dos series de aproximación no computan.",
            "5": "Descarga: menos series, RIR 4. Series en onda 12-10-8; aumentar carga entre series solo si se mantiene RIR. Dos series de aproximación no computan.",
            "6": "Reinicio técnico: RIR 3. Series en onda 12-10-8; aumentar carga entre series solo si se mantiene RIR. Dos series de aproximación no computan.",
            "7": "Progresar repeticiones o carga moderada. Series en onda 12-10-8; aumentar carga entre series solo si se mantiene RIR. Dos series de aproximación no computan.",
            "8": "Consolidar y registrar comparación con S1. Series en onda 12-10-8; aumentar carga entre series solo si se mantiene RIR. Dos series de aproximación no computan."
          },
          "programNote": "Series en onda 12-10-8; aumentar carga entre series solo si se mantiene RIR. Dos series de aproximación no computan. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "peso-muerto-rumano-mancuernas",
          "name": "Peso muerto rumano con mancuernas",
          "sets": 3,
          "reps": "8-10",
          "rest": 60,
          "unit": "kg manc.",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "8-10",
            "2": "8-10",
            "3": "8-10",
            "4": "8-10",
            "5": "8-10",
            "6": "8-10",
            "7": "8-10",
            "8": "8-10"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "20"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Descenso controlado 3 segundos, subida fluida; espalda neutra. Referencia anterior: 20 kg manc.; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Descenso controlado 3 segundos, subida fluida; espalda neutra.",
            "3": "Doble progresión: reps y luego peso. Descenso controlado 3 segundos, subida fluida; espalda neutra.",
            "4": "Consolidación sin fallo. Descenso controlado 3 segundos, subida fluida; espalda neutra.",
            "5": "Descarga: menos series, RIR 4. Descenso controlado 3 segundos, subida fluida; espalda neutra.",
            "6": "Reinicio técnico: RIR 3. Descenso controlado 3 segundos, subida fluida; espalda neutra.",
            "7": "Progresar repeticiones o carga moderada. Descenso controlado 3 segundos, subida fluida; espalda neutra.",
            "8": "Consolidar y registrar comparación con S1. Descenso controlado 3 segundos, subida fluida; espalda neutra."
          },
          "programNote": "Descenso controlado 3 segundos, subida fluida; espalda neutra. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "extension-cuadriceps",
          "name": "Extensión de cuádriceps",
          "sets": 3,
          "reps": "10-12",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "10-12",
            "2": "10-12",
            "3": "10-12",
            "4": "10-12",
            "5": "10-12",
            "6": "10-12",
            "7": "10-12",
            "8": "10-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "25"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Recorrido completo, pausa 1 s arriba. Sin volver a la máquina. Referencia anterior: 25 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Recorrido completo, pausa 1 s arriba. Sin volver a la máquina.",
            "3": "Doble progresión: reps y luego peso. Recorrido completo, pausa 1 s arriba. Sin volver a la máquina.",
            "4": "Consolidación sin fallo. Recorrido completo, pausa 1 s arriba. Sin volver a la máquina. Opcional: UNA reducción de carga 20–25% tras la última serie, 5–8 reps controladas, solo si hay buena recuperación.",
            "5": "Descarga: menos series, RIR 4. Recorrido completo, pausa 1 s arriba. Sin volver a la máquina.",
            "6": "Reinicio técnico: RIR 3. Recorrido completo, pausa 1 s arriba. Sin volver a la máquina.",
            "7": "Progresar repeticiones o carga moderada. Recorrido completo, pausa 1 s arriba. Sin volver a la máquina.",
            "8": "Consolidar y registrar comparación con S1. Recorrido completo, pausa 1 s arriba. Sin volver a la máquina. Opcional: UNA reducción de carga 20–25% tras la última serie, 5–8 reps controladas, solo si hay buena recuperación."
          },
          "programNote": "Recorrido completo, pausa 1 s arriba. Sin volver a la máquina. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "curl-femoral-sentado",
          "name": "Curl femoral sentado",
          "sets": 3,
          "reps": "10-12",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "10-12",
            "2": "10-12",
            "3": "10-12",
            "4": "10-12",
            "5": "10-12",
            "6": "10-12",
            "7": "10-12",
            "8": "10-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "15"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Pausa 1 s al flexionar. Controlar la fase excéntrica. Referencia anterior: 15 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Pausa 1 s al flexionar. Controlar la fase excéntrica.",
            "3": "Doble progresión: reps y luego peso. Pausa 1 s al flexionar. Controlar la fase excéntrica.",
            "4": "Consolidación sin fallo. Pausa 1 s al flexionar. Controlar la fase excéntrica.",
            "5": "Descarga: menos series, RIR 4. Pausa 1 s al flexionar. Controlar la fase excéntrica.",
            "6": "Reinicio técnico: RIR 3. Pausa 1 s al flexionar. Controlar la fase excéntrica.",
            "7": "Progresar repeticiones o carga moderada. Pausa 1 s al flexionar. Controlar la fase excéntrica.",
            "8": "Consolidar y registrar comparación con S1. Pausa 1 s al flexionar. Controlar la fase excéntrica."
          },
          "programNote": "Pausa 1 s al flexionar. Controlar la fase excéntrica. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "aductores-maquina",
          "name": "Aductores en máquina",
          "sets": 2,
          "reps": "12-15",
          "rest": 45,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "12-15",
            "2": "12-15",
            "3": "12-15",
            "4": "12-15",
            "5": "12-15",
            "6": "12-15",
            "7": "12-15",
            "8": "12-15"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "35"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Ritmo continuo y técnico; sin balanceos. Referencia anterior: 35 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Ritmo continuo y técnico; sin balanceos.",
            "3": "Doble progresión: reps y luego peso. Ritmo continuo y técnico; sin balanceos.",
            "4": "Consolidación sin fallo. Ritmo continuo y técnico; sin balanceos.",
            "5": "Descarga: menos series, RIR 4. Ritmo continuo y técnico; sin balanceos.",
            "6": "Reinicio técnico: RIR 3. Ritmo continuo y técnico; sin balanceos.",
            "7": "Progresar repeticiones o carga moderada. Ritmo continuo y técnico; sin balanceos.",
            "8": "Consolidar y registrar comparación con S1. Ritmo continuo y técnico; sin balanceos."
          },
          "programNote": "Ritmo continuo y técnico; sin balanceos. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "abduccion-cadera-maquina",
          "name": "Abducción de cadera en máquina",
          "sets": 2,
          "reps": "15-20",
          "rest": 45,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "15-20",
            "2": "15-20",
            "3": "15-20",
            "4": "15-20",
            "5": "15-20",
            "6": "15-20",
            "7": "15-20",
            "8": "15-20"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "35"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Repeticiones controladas, pequeña pausa en apertura. Referencia anterior: 35 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Repeticiones controladas, pequeña pausa en apertura.",
            "3": "Doble progresión: reps y luego peso. Repeticiones controladas, pequeña pausa en apertura.",
            "4": "Consolidación sin fallo. Repeticiones controladas, pequeña pausa en apertura.",
            "5": "Descarga: menos series, RIR 4. Repeticiones controladas, pequeña pausa en apertura.",
            "6": "Reinicio técnico: RIR 3. Repeticiones controladas, pequeña pausa en apertura.",
            "7": "Progresar repeticiones o carga moderada. Repeticiones controladas, pequeña pausa en apertura.",
            "8": "Consolidar y registrar comparación con S1. Repeticiones controladas, pequeña pausa en apertura."
          },
          "programNote": "Repeticiones controladas, pequeña pausa en apertura. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "gemelo-maquina",
          "name": "Gemelos en máquina",
          "sets": 2,
          "reps": "12-15",
          "rest": 45,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "12-15",
            "2": "12-15",
            "3": "12-15",
            "4": "12-15",
            "5": "12-15",
            "6": "12-15",
            "7": "12-15",
            "8": "12-15"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "20"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Pausa arriba y estiramiento abajo; sin rebotes. Referencia anterior: 20 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Pausa arriba y estiramiento abajo; sin rebotes.",
            "3": "Doble progresión: reps y luego peso. Pausa arriba y estiramiento abajo; sin rebotes.",
            "4": "Consolidación sin fallo. Pausa arriba y estiramiento abajo; sin rebotes.",
            "5": "Descarga: menos series, RIR 4. Pausa arriba y estiramiento abajo; sin rebotes.",
            "6": "Reinicio técnico: RIR 3. Pausa arriba y estiramiento abajo; sin rebotes.",
            "7": "Progresar repeticiones o carga moderada. Pausa arriba y estiramiento abajo; sin rebotes.",
            "8": "Consolidar y registrar comparación con S1. Pausa arriba y estiramiento abajo; sin rebotes."
          },
          "programNote": "Pausa arriba y estiramiento abajo; sin rebotes. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "dead-bug-ana",
          "name": "Dead bug en colchoneta",
          "sets": 2,
          "reps": "10/lado",
          "rest": 45,
          "unit": "peso corporal",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "10/lado",
            "2": "10/lado",
            "3": "10/lado",
            "4": "10/lado",
            "5": "10/lado",
            "6": "10/lado",
            "7": "10/lado",
            "8": "10/lado"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Alternar lados sin abandonar la colchoneta; zona lumbar estable.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Alternar lados sin abandonar la colchoneta; zona lumbar estable.",
            "3": "Doble progresión: reps y luego peso. Alternar lados sin abandonar la colchoneta; zona lumbar estable.",
            "4": "Consolidación sin fallo. Alternar lados sin abandonar la colchoneta; zona lumbar estable.",
            "5": "Descarga: menos series, RIR 4. Alternar lados sin abandonar la colchoneta; zona lumbar estable.",
            "6": "Reinicio técnico: RIR 3. Alternar lados sin abandonar la colchoneta; zona lumbar estable.",
            "7": "Progresar repeticiones o carga moderada. Alternar lados sin abandonar la colchoneta; zona lumbar estable.",
            "8": "Consolidar y registrar comparación con S1. Alternar lados sin abandonar la colchoneta; zona lumbar estable."
          },
          "programNote": "Alternar lados sin abandonar la colchoneta; zona lumbar estable. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        }
      ]
    },
    {
      "id": "dia-2",
      "name": "Upper A",
      "estimatedDuration": "45-50 min",
      "exercises": [
        {
          "key": "jalon-pecho",
          "name": "Jalón al pecho",
          "sets": 3,
          "reps": "8-10",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "8-10",
            "2": "8-10",
            "3": "8-10",
            "4": "8-10",
            "5": "8-10",
            "6": "8-10",
            "7": "8-10",
            "8": "8-10"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "20"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Alternar amplitud de agarre solo entre semanas; misma estación durante las 3 series. Referencia anterior: 20 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Alternar amplitud de agarre solo entre semanas; misma estación durante las 3 series.",
            "3": "Doble progresión: reps y luego peso. Alternar amplitud de agarre solo entre semanas; misma estación durante las 3 series.",
            "4": "Consolidación sin fallo. Alternar amplitud de agarre solo entre semanas; misma estación durante las 3 series.",
            "5": "Descarga: menos series, RIR 4. Alternar amplitud de agarre solo entre semanas; misma estación durante las 3 series.",
            "6": "Reinicio técnico: RIR 3. Alternar amplitud de agarre solo entre semanas; misma estación durante las 3 series.",
            "7": "Progresar repeticiones o carga moderada. Alternar amplitud de agarre solo entre semanas; misma estación durante las 3 series.",
            "8": "Consolidar y registrar comparación con S1. Alternar amplitud de agarre solo entre semanas; misma estación durante las 3 series."
          },
          "programNote": "Alternar amplitud de agarre solo entre semanas; misma estación durante las 3 series. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "press-pecho-inclinado-ana",
          "name": "Press de pecho inclinado en máquina",
          "sets": 3,
          "reps": "8-10",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "8-10",
            "2": "8-10",
            "3": "8-10",
            "4": "8-10",
            "5": "8-10",
            "6": "8-10",
            "7": "8-10",
            "8": "8-10"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "5"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Empuje controlado, hombros estables. Comprobar si esta máquina usa kg totales. Referencia anterior: 5 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Empuje controlado, hombros estables. Comprobar si esta máquina usa kg totales.",
            "3": "Doble progresión: reps y luego peso. Empuje controlado, hombros estables. Comprobar si esta máquina usa kg totales.",
            "4": "Consolidación sin fallo. Empuje controlado, hombros estables. Comprobar si esta máquina usa kg totales.",
            "5": "Descarga: menos series, RIR 4. Empuje controlado, hombros estables. Comprobar si esta máquina usa kg totales.",
            "6": "Reinicio técnico: RIR 3. Empuje controlado, hombros estables. Comprobar si esta máquina usa kg totales.",
            "7": "Progresar repeticiones o carga moderada. Empuje controlado, hombros estables. Comprobar si esta máquina usa kg totales.",
            "8": "Consolidar y registrar comparación con S1. Empuje controlado, hombros estables. Comprobar si esta máquina usa kg totales."
          },
          "programNote": "Empuje controlado, hombros estables. Comprobar si esta máquina usa kg totales. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "remo-polea-baja",
          "name": "Remo en polea baja",
          "sets": 3,
          "reps": "10-12",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "10-12",
            "2": "10-12",
            "3": "10-12",
            "4": "10-12",
            "5": "10-12",
            "6": "10-12",
            "7": "10-12",
            "8": "10-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "20"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Pausa 1 s con escápulas atrás; no balancear tronco. Referencia anterior: 20 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Pausa 1 s con escápulas atrás; no balancear tronco.",
            "3": "Doble progresión: reps y luego peso. Pausa 1 s con escápulas atrás; no balancear tronco.",
            "4": "Consolidación sin fallo. Pausa 1 s con escápulas atrás; no balancear tronco.",
            "5": "Descarga: menos series, RIR 4. Pausa 1 s con escápulas atrás; no balancear tronco.",
            "6": "Reinicio técnico: RIR 3. Pausa 1 s con escápulas atrás; no balancear tronco.",
            "7": "Progresar repeticiones o carga moderada. Pausa 1 s con escápulas atrás; no balancear tronco.",
            "8": "Consolidar y registrar comparación con S1. Pausa 1 s con escápulas atrás; no balancear tronco."
          },
          "programNote": "Pausa 1 s con escápulas atrás; no balancear tronco. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "press-hombro-sentado",
          "name": "Press de hombros sentado",
          "sets": 2,
          "reps": "8-10",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "8-10",
            "2": "8-10",
            "3": "8-10",
            "4": "8-10",
            "5": "8-10",
            "6": "8-10",
            "7": "8-10",
            "8": "8-10"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "5"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Mantener control escapular; parar antes de compensar con espalda. Referencia anterior: 5 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Mantener control escapular; parar antes de compensar con espalda.",
            "3": "Doble progresión: reps y luego peso. Mantener control escapular; parar antes de compensar con espalda.",
            "4": "Consolidación sin fallo. Mantener control escapular; parar antes de compensar con espalda.",
            "5": "Descarga: menos series, RIR 4. Mantener control escapular; parar antes de compensar con espalda.",
            "6": "Reinicio técnico: RIR 3. Mantener control escapular; parar antes de compensar con espalda.",
            "7": "Progresar repeticiones o carga moderada. Mantener control escapular; parar antes de compensar con espalda.",
            "8": "Consolidar y registrar comparación con S1. Mantener control escapular; parar antes de compensar con espalda."
          },
          "programNote": "Mantener control escapular; parar antes de compensar con espalda. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "elevaciones-laterales-ana",
          "name": "Elevaciones laterales con mancuernas",
          "sets": 2,
          "reps": "12-15",
          "rest": 45,
          "unit": "kg manc.",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "12-15",
            "2": "12-15",
            "3": "12-15",
            "4": "12-15",
            "5": "12-15",
            "6": "12-15",
            "7": "12-15",
            "8": "12-15"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "3"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Subida progresiva y bajada de 2 segundos. Referencia anterior: 3 kg manc.; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Subida progresiva y bajada de 2 segundos.",
            "3": "Doble progresión: reps y luego peso. Subida progresiva y bajada de 2 segundos.",
            "4": "Consolidación sin fallo. Subida progresiva y bajada de 2 segundos.",
            "5": "Descarga: menos series, RIR 4. Subida progresiva y bajada de 2 segundos.",
            "6": "Reinicio técnico: RIR 3. Subida progresiva y bajada de 2 segundos.",
            "7": "Progresar repeticiones o carga moderada. Subida progresiva y bajada de 2 segundos.",
            "8": "Consolidar y registrar comparación con S1. Subida progresiva y bajada de 2 segundos."
          },
          "programNote": "Subida progresiva y bajada de 2 segundos. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "pajaros-peck-deck",
          "name": "Pájaros en peck deck",
          "sets": 2,
          "reps": "12-15",
          "rest": 45,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "12-15",
            "2": "12-15",
            "3": "12-15",
            "4": "12-15",
            "5": "12-15",
            "6": "12-15",
            "7": "12-15",
            "8": "12-15"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "2.5"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Activar deltoides posterior; una sola visita a la máquina. Referencia anterior: 2.5 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Activar deltoides posterior; una sola visita a la máquina.",
            "3": "Doble progresión: reps y luego peso. Activar deltoides posterior; una sola visita a la máquina.",
            "4": "Consolidación sin fallo. Activar deltoides posterior; una sola visita a la máquina.",
            "5": "Descarga: menos series, RIR 4. Activar deltoides posterior; una sola visita a la máquina.",
            "6": "Reinicio técnico: RIR 3. Activar deltoides posterior; una sola visita a la máquina.",
            "7": "Progresar repeticiones o carga moderada. Activar deltoides posterior; una sola visita a la máquina.",
            "8": "Consolidar y registrar comparación con S1. Activar deltoides posterior; una sola visita a la máquina."
          },
          "programNote": "Activar deltoides posterior; una sola visita a la máquina. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "curl-biceps-mancuernas-ana",
          "name": "Curl de bíceps con mancuernas",
          "sets": 2,
          "reps": "10-12",
          "rest": 45,
          "unit": "kg manc.",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "10-12",
            "2": "10-12",
            "3": "10-12",
            "4": "10-12",
            "5": "10-12",
            "6": "10-12",
            "7": "10-12",
            "8": "10-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Brazos alternos sin desplazarse; elegir carga inicial por RIR.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Brazos alternos sin desplazarse; elegir carga inicial por RIR.",
            "3": "Doble progresión: reps y luego peso. Brazos alternos sin desplazarse; elegir carga inicial por RIR.",
            "4": "Consolidación sin fallo. Brazos alternos sin desplazarse; elegir carga inicial por RIR.",
            "5": "Descarga: menos series, RIR 4. Brazos alternos sin desplazarse; elegir carga inicial por RIR.",
            "6": "Reinicio técnico: RIR 3. Brazos alternos sin desplazarse; elegir carga inicial por RIR.",
            "7": "Progresar repeticiones o carga moderada. Brazos alternos sin desplazarse; elegir carga inicial por RIR.",
            "8": "Consolidar y registrar comparación con S1. Brazos alternos sin desplazarse; elegir carga inicial por RIR."
          },
          "programNote": "Brazos alternos sin desplazarse; elegir carga inicial por RIR. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "extension-triceps-polea",
          "name": "Extensión de tríceps en polea",
          "sets": 2,
          "reps": "10-12",
          "rest": 45,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "10-12",
            "2": "10-12",
            "3": "10-12",
            "4": "10-12",
            "5": "10-12",
            "6": "10-12",
            "7": "10-12",
            "8": "10-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "7.5"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Codos estables, un solo bloque de trabajo en polea. Referencia anterior: 7.5 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Codos estables, un solo bloque de trabajo en polea.",
            "3": "Doble progresión: reps y luego peso. Codos estables, un solo bloque de trabajo en polea.",
            "4": "Consolidación sin fallo. Codos estables, un solo bloque de trabajo en polea. Opcional: UNA reducción de carga 20–25% tras la última serie, 5–8 reps controladas, solo si hay buena recuperación.",
            "5": "Descarga: menos series, RIR 4. Codos estables, un solo bloque de trabajo en polea.",
            "6": "Reinicio técnico: RIR 3. Codos estables, un solo bloque de trabajo en polea.",
            "7": "Progresar repeticiones o carga moderada. Codos estables, un solo bloque de trabajo en polea.",
            "8": "Consolidar y registrar comparación con S1. Codos estables, un solo bloque de trabajo en polea. Opcional: UNA reducción de carga 20–25% tras la última serie, 5–8 reps controladas, solo si hay buena recuperación."
          },
          "programNote": "Codos estables, un solo bloque de trabajo en polea. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "farmer-walk",
          "name": "Farmer walk",
          "sets": 2,
          "reps": "30-40 s",
          "rest": 45,
          "unit": "kg manc.",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "30-40 s",
            "2": "30-40 s",
            "3": "30-40 s",
            "4": "30-40 s",
            "5": "30-40 s",
            "6": "30-40 s",
            "7": "30-40 s",
            "8": "30-40 s"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "20"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Caminar erguida, respiración continua; terminar tras completar ambas pasadas. Referencia anterior: 20 kg manc.; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Caminar erguida, respiración continua; terminar tras completar ambas pasadas.",
            "3": "Doble progresión: reps y luego peso. Caminar erguida, respiración continua; terminar tras completar ambas pasadas.",
            "4": "Consolidación sin fallo. Caminar erguida, respiración continua; terminar tras completar ambas pasadas.",
            "5": "Descarga: menos series, RIR 4. Caminar erguida, respiración continua; terminar tras completar ambas pasadas.",
            "6": "Reinicio técnico: RIR 3. Caminar erguida, respiración continua; terminar tras completar ambas pasadas.",
            "7": "Progresar repeticiones o carga moderada. Caminar erguida, respiración continua; terminar tras completar ambas pasadas.",
            "8": "Consolidar y registrar comparación con S1. Caminar erguida, respiración continua; terminar tras completar ambas pasadas."
          },
          "programNote": "Caminar erguida, respiración continua; terminar tras completar ambas pasadas. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        }
      ]
    },
    {
      "id": "dia-3",
      "name": "Lower B",
      "estimatedDuration": "45-50 min",
      "exercises": [
        {
          "key": "step-up-alto",
          "name": "Step-up con mancuernas",
          "sets": 2,
          "reps": "8/lado",
          "rest": 60,
          "unit": "kg manc.",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "8/lado",
            "2": "8/lado",
            "3": "8/lado",
            "4": "8/lado",
            "5": "8/lado",
            "6": "8/lado",
            "7": "8/lado",
            "8": "8/lado"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "8"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Comenzar con pierna izquierda, controlar el descenso. Reducido a 2 series por fatiga previa; si falla control, bajar altura. Referencia anterior: 8 kg manc.; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Comenzar con pierna izquierda, controlar el descenso. Reducido a 2 series por fatiga previa; si falla control, bajar altura.",
            "3": "Doble progresión: reps y luego peso. Comenzar con pierna izquierda, controlar el descenso. Reducido a 2 series por fatiga previa; si falla control, bajar altura.",
            "4": "Consolidación sin fallo. Comenzar con pierna izquierda, controlar el descenso. Reducido a 2 series por fatiga previa; si falla control, bajar altura.",
            "5": "Descarga: menos series, RIR 4. Comenzar con pierna izquierda, controlar el descenso. Reducido a 2 series por fatiga previa; si falla control, bajar altura.",
            "6": "Reinicio técnico: RIR 3. Comenzar con pierna izquierda, controlar el descenso. Reducido a 2 series por fatiga previa; si falla control, bajar altura.",
            "7": "Progresar repeticiones o carga moderada. Comenzar con pierna izquierda, controlar el descenso. Reducido a 2 series por fatiga previa; si falla control, bajar altura.",
            "8": "Consolidar y registrar comparación con S1. Comenzar con pierna izquierda, controlar el descenso. Reducido a 2 series por fatiga previa; si falla control, bajar altura."
          },
          "programNote": "Comenzar con pierna izquierda, controlar el descenso. Reducido a 2 series por fatiga previa; si falla control, bajar altura. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "hip-thrust-ana-2026-11",
          "name": "Hip thrust",
          "sets": 3,
          "reps": "8-12",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "8-12",
            "2": "8-12",
            "3": "8-12",
            "4": "8-12",
            "5": "8-12",
            "6": "8-12",
            "7": "8-12",
            "8": "8-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Pausa 1–2 s en extensión. Elegir carga inicial por RIR 3; no extrapolar del pull-through.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Pausa 1–2 s en extensión. Elegir carga inicial por RIR 3; no extrapolar del pull-through.",
            "3": "Doble progresión: reps y luego peso. Pausa 1–2 s en extensión. Elegir carga inicial por RIR 3; no extrapolar del pull-through.",
            "4": "Consolidación sin fallo. Pausa 1–2 s en extensión. Elegir carga inicial por RIR 3; no extrapolar del pull-through.",
            "5": "Descarga: menos series, RIR 4. Pausa 1–2 s en extensión. Elegir carga inicial por RIR 3; no extrapolar del pull-through.",
            "6": "Reinicio técnico: RIR 3. Pausa 1–2 s en extensión. Elegir carga inicial por RIR 3; no extrapolar del pull-through.",
            "7": "Progresar repeticiones o carga moderada. Pausa 1–2 s en extensión. Elegir carga inicial por RIR 3; no extrapolar del pull-through.",
            "8": "Consolidar y registrar comparación con S1. Pausa 1–2 s en extensión. Elegir carga inicial por RIR 3; no extrapolar del pull-through."
          },
          "programNote": "Pausa 1–2 s en extensión. Elegir carga inicial por RIR 3; no extrapolar del pull-through. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "prensa-unilateral",
          "name": "Prensa unilateral",
          "sets": 2,
          "reps": "10-12/lado",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "10-12/lado",
            "2": "10-12/lado",
            "3": "10-12/lado",
            "4": "10-12/lado",
            "5": "10-12/lado",
            "6": "10-12/lado",
            "7": "10-12/lado",
            "8": "10-12/lado"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "20"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Completar ambas piernas durante la misma serie; no despegar pelvis. Referencia anterior: 20 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Completar ambas piernas durante la misma serie; no despegar pelvis.",
            "3": "Doble progresión: reps y luego peso. Completar ambas piernas durante la misma serie; no despegar pelvis.",
            "4": "Consolidación sin fallo. Completar ambas piernas durante la misma serie; no despegar pelvis.",
            "5": "Descarga: menos series, RIR 4. Completar ambas piernas durante la misma serie; no despegar pelvis.",
            "6": "Reinicio técnico: RIR 3. Completar ambas piernas durante la misma serie; no despegar pelvis.",
            "7": "Progresar repeticiones o carga moderada. Completar ambas piernas durante la misma serie; no despegar pelvis.",
            "8": "Consolidar y registrar comparación con S1. Completar ambas piernas durante la misma serie; no despegar pelvis."
          },
          "programNote": "Completar ambas piernas durante la misma serie; no despegar pelvis. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "curl-femoral-sentado-lower-b",
          "name": "Curl femoral sentado",
          "sets": 3,
          "reps": "10-12",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "10-12",
            "2": "10-12",
            "3": "10-12",
            "4": "10-12",
            "5": "10-12",
            "6": "10-12",
            "7": "10-12",
            "8": "10-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "15"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Subir repeticiones antes de peso; carga conservadora tras variabilidad previa. Referencia anterior: 15 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Subir repeticiones antes de peso; carga conservadora tras variabilidad previa.",
            "3": "Doble progresión: reps y luego peso. Subir repeticiones antes de peso; carga conservadora tras variabilidad previa.",
            "4": "Consolidación sin fallo. Subir repeticiones antes de peso; carga conservadora tras variabilidad previa.",
            "5": "Descarga: menos series, RIR 4. Subir repeticiones antes de peso; carga conservadora tras variabilidad previa.",
            "6": "Reinicio técnico: RIR 3. Subir repeticiones antes de peso; carga conservadora tras variabilidad previa.",
            "7": "Progresar repeticiones o carga moderada. Subir repeticiones antes de peso; carga conservadora tras variabilidad previa.",
            "8": "Consolidar y registrar comparación con S1. Subir repeticiones antes de peso; carga conservadora tras variabilidad previa."
          },
          "programNote": "Subir repeticiones antes de peso; carga conservadora tras variabilidad previa. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "patada-gluteo-polea",
          "name": "Patada de glúteo en polea",
          "sets": 2,
          "reps": "12-15/lado",
          "rest": 45,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "12-15/lado",
            "2": "12-15/lado",
            "3": "12-15/lado",
            "4": "12-15/lado",
            "5": "12-15/lado",
            "6": "12-15/lado",
            "7": "12-15/lado",
            "8": "12-15/lado"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "7.5"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Una sola ocupación de la polea para ambas piernas y todas las series. Referencia anterior: 7.5 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Una sola ocupación de la polea para ambas piernas y todas las series.",
            "3": "Doble progresión: reps y luego peso. Una sola ocupación de la polea para ambas piernas y todas las series.",
            "4": "Consolidación sin fallo. Una sola ocupación de la polea para ambas piernas y todas las series.",
            "5": "Descarga: menos series, RIR 4. Una sola ocupación de la polea para ambas piernas y todas las series.",
            "6": "Reinicio técnico: RIR 3. Una sola ocupación de la polea para ambas piernas y todas las series.",
            "7": "Progresar repeticiones o carga moderada. Una sola ocupación de la polea para ambas piernas y todas las series.",
            "8": "Consolidar y registrar comparación con S1. Una sola ocupación de la polea para ambas piernas y todas las series."
          },
          "programNote": "Una sola ocupación de la polea para ambas piernas y todas las series. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "abduccion-maquina-lower-b",
          "name": "Abducción en máquina",
          "sets": 2,
          "reps": "15-20",
          "rest": 45,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "15-20",
            "2": "15-20",
            "3": "15-20",
            "4": "15-20",
            "5": "15-20",
            "6": "15-20",
            "7": "15-20",
            "8": "15-20"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "35"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Pausa 1 s en la apertura, sin usar impulso. Referencia anterior: 35 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Pausa 1 s en la apertura, sin usar impulso.",
            "3": "Doble progresión: reps y luego peso. Pausa 1 s en la apertura, sin usar impulso.",
            "4": "Consolidación sin fallo. Pausa 1 s en la apertura, sin usar impulso. Opcional: UNA reducción de carga 20–25% tras la última serie, 5–8 reps controladas, solo si hay buena recuperación.",
            "5": "Descarga: menos series, RIR 4. Pausa 1 s en la apertura, sin usar impulso.",
            "6": "Reinicio técnico: RIR 3. Pausa 1 s en la apertura, sin usar impulso.",
            "7": "Progresar repeticiones o carga moderada. Pausa 1 s en la apertura, sin usar impulso.",
            "8": "Consolidar y registrar comparación con S1. Pausa 1 s en la apertura, sin usar impulso. Opcional: UNA reducción de carga 20–25% tras la última serie, 5–8 reps controladas, solo si hay buena recuperación."
          },
          "programNote": "Pausa 1 s en la apertura, sin usar impulso. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "gemelo-pie-prensa",
          "name": "Gemelo de pie",
          "sets": 2,
          "reps": "12-15",
          "rest": 45,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "12-15",
            "2": "12-15",
            "3": "12-15",
            "4": "12-15",
            "5": "12-15",
            "6": "12-15",
            "7": "12-15",
            "8": "12-15"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "20"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Usar máquina de gemelos o mancuernas, NO volver a prensa ya liberada. Referencia anterior: 20 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Usar máquina de gemelos o mancuernas, NO volver a prensa ya liberada.",
            "3": "Doble progresión: reps y luego peso. Usar máquina de gemelos o mancuernas, NO volver a prensa ya liberada.",
            "4": "Consolidación sin fallo. Usar máquina de gemelos o mancuernas, NO volver a prensa ya liberada.",
            "5": "Descarga: menos series, RIR 4. Usar máquina de gemelos o mancuernas, NO volver a prensa ya liberada.",
            "6": "Reinicio técnico: RIR 3. Usar máquina de gemelos o mancuernas, NO volver a prensa ya liberada.",
            "7": "Progresar repeticiones o carga moderada. Usar máquina de gemelos o mancuernas, NO volver a prensa ya liberada.",
            "8": "Consolidar y registrar comparación con S1. Usar máquina de gemelos o mancuernas, NO volver a prensa ya liberada."
          },
          "programNote": "Usar máquina de gemelos o mancuernas, NO volver a prensa ya liberada. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "suitcase-carry",
          "name": "Suitcase carry",
          "sets": 2,
          "reps": "30-40 s/lado",
          "rest": 45,
          "unit": "kg manc.",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "30-40 s/lado",
            "2": "30-40 s/lado",
            "3": "30-40 s/lado",
            "4": "30-40 s/lado",
            "5": "30-40 s/lado",
            "6": "30-40 s/lado",
            "7": "30-40 s/lado",
            "8": "30-40 s/lado"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "12"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Caminar erguida evitando inclinación lateral. Referencia anterior: 12 kg manc.; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Caminar erguida evitando inclinación lateral.",
            "3": "Doble progresión: reps y luego peso. Caminar erguida evitando inclinación lateral.",
            "4": "Consolidación sin fallo. Caminar erguida evitando inclinación lateral.",
            "5": "Descarga: menos series, RIR 4. Caminar erguida evitando inclinación lateral.",
            "6": "Reinicio técnico: RIR 3. Caminar erguida evitando inclinación lateral.",
            "7": "Progresar repeticiones o carga moderada. Caminar erguida evitando inclinación lateral.",
            "8": "Consolidar y registrar comparación con S1. Caminar erguida evitando inclinación lateral."
          },
          "programNote": "Caminar erguida evitando inclinación lateral. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "plancha-lateral-ana",
          "name": "Plancha lateral",
          "sets": 2,
          "reps": "25-35 s/lado",
          "rest": 45,
          "unit": "peso corporal",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "25-35 s/lado",
            "2": "25-35 s/lado",
            "3": "25-35 s/lado",
            "4": "25-35 s/lado",
            "5": "25-35 s/lado",
            "6": "25-35 s/lado",
            "7": "25-35 s/lado",
            "8": "25-35 s/lado"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Mantener pelvis alineada; sustituye woodchop para no regresar a polea.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Mantener pelvis alineada; sustituye woodchop para no regresar a polea.",
            "3": "Doble progresión: reps y luego peso. Mantener pelvis alineada; sustituye woodchop para no regresar a polea.",
            "4": "Consolidación sin fallo. Mantener pelvis alineada; sustituye woodchop para no regresar a polea.",
            "5": "Descarga: menos series, RIR 4. Mantener pelvis alineada; sustituye woodchop para no regresar a polea.",
            "6": "Reinicio técnico: RIR 3. Mantener pelvis alineada; sustituye woodchop para no regresar a polea.",
            "7": "Progresar repeticiones o carga moderada. Mantener pelvis alineada; sustituye woodchop para no regresar a polea.",
            "8": "Consolidar y registrar comparación con S1. Mantener pelvis alineada; sustituye woodchop para no regresar a polea."
          },
          "programNote": "Mantener pelvis alineada; sustituye woodchop para no regresar a polea. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        }
      ]
    },
    {
      "id": "dia-4",
      "name": "Upper B / Full Body",
      "estimatedDuration": "45-50 min",
      "exercises": [
        {
          "key": "goblet-squat",
          "name": "Goblet squat",
          "sets": 3,
          "reps": "10-12",
          "rest": 60,
          "unit": "kg manc.",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "10-12",
            "2": "10-12",
            "3": "10-12",
            "4": "10-12",
            "5": "10-12",
            "6": "10-12",
            "7": "10-12",
            "8": "10-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "10"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Descenso 2 s, subida fluida; controlar profundidad. Referencia anterior: 10 kg manc.; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Descenso 2 s, subida fluida; controlar profundidad.",
            "3": "Doble progresión: reps y luego peso. Descenso 2 s, subida fluida; controlar profundidad.",
            "4": "Consolidación sin fallo. Descenso 2 s, subida fluida; controlar profundidad.",
            "5": "Descarga: menos series, RIR 4. Descenso 2 s, subida fluida; controlar profundidad.",
            "6": "Reinicio técnico: RIR 3. Descenso 2 s, subida fluida; controlar profundidad.",
            "7": "Progresar repeticiones o carga moderada. Descenso 2 s, subida fluida; controlar profundidad.",
            "8": "Consolidar y registrar comparación con S1. Descenso 2 s, subida fluida; controlar profundidad."
          },
          "programNote": "Descenso 2 s, subida fluida; controlar profundidad. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "remo-maquina-apoyo",
          "name": "Remo en máquina con apoyo",
          "sets": 3,
          "reps": "8-12",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "8-12",
            "2": "8-12",
            "3": "8-12",
            "4": "8-12",
            "5": "8-12",
            "6": "8-12",
            "7": "8-12",
            "8": "8-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "15"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Progresar de 8 a 12 reps antes de subir peso. Referencia anterior: 15 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Progresar de 8 a 12 reps antes de subir peso.",
            "3": "Doble progresión: reps y luego peso. Progresar de 8 a 12 reps antes de subir peso.",
            "4": "Consolidación sin fallo. Progresar de 8 a 12 reps antes de subir peso.",
            "5": "Descarga: menos series, RIR 4. Progresar de 8 a 12 reps antes de subir peso.",
            "6": "Reinicio técnico: RIR 3. Progresar de 8 a 12 reps antes de subir peso.",
            "7": "Progresar repeticiones o carga moderada. Progresar de 8 a 12 reps antes de subir peso.",
            "8": "Consolidar y registrar comparación con S1. Progresar de 8 a 12 reps antes de subir peso."
          },
          "programNote": "Progresar de 8 a 12 reps antes de subir peso. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "press-pecho-maquina-inclinada",
          "name": "Press de pecho en máquina inclinada",
          "sets": 3,
          "reps": "10-12",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 3,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 3,
            "7": 3,
            "8": 3
          },
          "weeklyReps": {
            "1": "10-12",
            "2": "10-12",
            "3": "10-12",
            "4": "10-12",
            "5": "10-12",
            "6": "10-12",
            "7": "10-12",
            "8": "10-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "5"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Última serie técnica sin fallo; kg orientativos según máquina. Referencia anterior: 5 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Última serie técnica sin fallo; kg orientativos según máquina.",
            "3": "Doble progresión: reps y luego peso. Última serie técnica sin fallo; kg orientativos según máquina.",
            "4": "Consolidación sin fallo. Última serie técnica sin fallo; kg orientativos según máquina.",
            "5": "Descarga: menos series, RIR 4. Última serie técnica sin fallo; kg orientativos según máquina.",
            "6": "Reinicio técnico: RIR 3. Última serie técnica sin fallo; kg orientativos según máquina.",
            "7": "Progresar repeticiones o carga moderada. Última serie técnica sin fallo; kg orientativos según máquina.",
            "8": "Consolidar y registrar comparación con S1. Última serie técnica sin fallo; kg orientativos según máquina."
          },
          "programNote": "Última serie técnica sin fallo; kg orientativos según máquina. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "jalon-unilateral-polea",
          "name": "Jalón unilateral en máquina/polea",
          "sets": 2,
          "reps": "10-12/lado",
          "rest": 60,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "10-12/lado",
            "2": "10-12/lado",
            "3": "10-12/lado",
            "4": "10-12/lado",
            "5": "10-12/lado",
            "6": "10-12/lado",
            "7": "10-12/lado",
            "8": "10-12/lado"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "10"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Completar ambos lados y liberar la máquina. No regresar después. Referencia anterior: 10 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Completar ambos lados y liberar la máquina. No regresar después.",
            "3": "Doble progresión: reps y luego peso. Completar ambos lados y liberar la máquina. No regresar después.",
            "4": "Consolidación sin fallo. Completar ambos lados y liberar la máquina. No regresar después.",
            "5": "Descarga: menos series, RIR 4. Completar ambos lados y liberar la máquina. No regresar después.",
            "6": "Reinicio técnico: RIR 3. Completar ambos lados y liberar la máquina. No regresar después.",
            "7": "Progresar repeticiones o carga moderada. Completar ambos lados y liberar la máquina. No regresar después.",
            "8": "Consolidar y registrar comparación con S1. Completar ambos lados y liberar la máquina. No regresar después."
          },
          "programNote": "Completar ambos lados y liberar la máquina. No regresar después. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "elevaciones-laterales-upper-b",
          "name": "Elevaciones laterales con mancuernas",
          "sets": 2,
          "reps": "12-15",
          "rest": 45,
          "unit": "kg manc.",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "12-15",
            "2": "12-15",
            "3": "12-15",
            "4": "12-15",
            "5": "12-15",
            "6": "12-15",
            "7": "12-15",
            "8": "12-15"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "3"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Subir y bajar de forma controlada; sin compensaciones. Referencia anterior: 3 kg manc.; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Subir y bajar de forma controlada; sin compensaciones.",
            "3": "Doble progresión: reps y luego peso. Subir y bajar de forma controlada; sin compensaciones.",
            "4": "Consolidación sin fallo. Subir y bajar de forma controlada; sin compensaciones.",
            "5": "Descarga: menos series, RIR 4. Subir y bajar de forma controlada; sin compensaciones.",
            "6": "Reinicio técnico: RIR 3. Subir y bajar de forma controlada; sin compensaciones.",
            "7": "Progresar repeticiones o carga moderada. Subir y bajar de forma controlada; sin compensaciones.",
            "8": "Consolidar y registrar comparación con S1. Subir y bajar de forma controlada; sin compensaciones."
          },
          "programNote": "Subir y bajar de forma controlada; sin compensaciones. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "pajaros-peck-deck-upper-b",
          "name": "Pájaros en peck deck",
          "sets": 2,
          "reps": "12-15",
          "rest": 45,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "12-15",
            "2": "12-15",
            "3": "12-15",
            "4": "12-15",
            "5": "12-15",
            "6": "12-15",
            "7": "12-15",
            "8": "12-15"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "2.5"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Pausa arriba. Solo una visita a la estación. Referencia anterior: 2.5 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Pausa arriba. Solo una visita a la estación.",
            "3": "Doble progresión: reps y luego peso. Pausa arriba. Solo una visita a la estación.",
            "4": "Consolidación sin fallo. Pausa arriba. Solo una visita a la estación.",
            "5": "Descarga: menos series, RIR 4. Pausa arriba. Solo una visita a la estación.",
            "6": "Reinicio técnico: RIR 3. Pausa arriba. Solo una visita a la estación.",
            "7": "Progresar repeticiones o carga moderada. Pausa arriba. Solo una visita a la estación.",
            "8": "Consolidar y registrar comparación con S1. Pausa arriba. Solo una visita a la estación."
          },
          "programNote": "Pausa arriba. Solo una visita a la estación. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "curl-martillo",
          "name": "Curl martillo",
          "sets": 2,
          "reps": "10-12",
          "rest": 45,
          "unit": "kg manc.",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "10-12",
            "2": "10-12",
            "3": "10-12",
            "4": "10-12",
            "5": "10-12",
            "6": "10-12",
            "7": "10-12",
            "8": "10-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "7.5"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Alternar brazos; sin balanceos. Referencia anterior: 7.5 kg manc.; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Alternar brazos; sin balanceos.",
            "3": "Doble progresión: reps y luego peso. Alternar brazos; sin balanceos.",
            "4": "Consolidación sin fallo. Alternar brazos; sin balanceos.",
            "5": "Descarga: menos series, RIR 4. Alternar brazos; sin balanceos.",
            "6": "Reinicio técnico: RIR 3. Alternar brazos; sin balanceos.",
            "7": "Progresar repeticiones o carga moderada. Alternar brazos; sin balanceos.",
            "8": "Consolidar y registrar comparación con S1. Alternar brazos; sin balanceos."
          },
          "programNote": "Alternar brazos; sin balanceos. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "extension-triceps-cuerda",
          "name": "Extensión de tríceps con cuerda",
          "sets": 2,
          "reps": "10-12",
          "rest": 45,
          "unit": "kg",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "10-12",
            "2": "10-12",
            "3": "10-12",
            "4": "10-12",
            "5": "10-12",
            "6": "10-12",
            "7": "10-12",
            "8": "10-12"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyWeight": {
            "1": "7.5"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Todas las series seguidas en una sola visita a polea. Referencia anterior: 7.5 kg; ajustar a RIR 3.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Todas las series seguidas en una sola visita a polea.",
            "3": "Doble progresión: reps y luego peso. Todas las series seguidas en una sola visita a polea.",
            "4": "Consolidación sin fallo. Todas las series seguidas en una sola visita a polea. Opcional: UNA reducción de carga 20–25% tras la última serie, 5–8 reps controladas, solo si hay buena recuperación.",
            "5": "Descarga: menos series, RIR 4. Todas las series seguidas en una sola visita a polea.",
            "6": "Reinicio técnico: RIR 3. Todas las series seguidas en una sola visita a polea.",
            "7": "Progresar repeticiones o carga moderada. Todas las series seguidas en una sola visita a polea.",
            "8": "Consolidar y registrar comparación con S1. Todas las series seguidas en una sola visita a polea. Opcional: UNA reducción de carga 20–25% tras la última serie, 5–8 reps controladas, solo si hay buena recuperación."
          },
          "programNote": "Todas las series seguidas en una sola visita a polea. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        },
        {
          "key": "sentadilla-elevacion-brazos",
          "name": "Sentadilla sin carga + elevación de brazos",
          "sets": 2,
          "reps": "40 s",
          "rest": 45,
          "unit": "peso corporal",
          "weeklySets": {
            "1": 2,
            "2": 2,
            "3": 2,
            "4": 2,
            "5": 1,
            "6": 2,
            "7": 2,
            "8": 2
          },
          "weeklyReps": {
            "1": "40 s",
            "2": "40 s",
            "3": "40 s",
            "4": "40 s",
            "5": "40 s",
            "6": "40 s",
            "7": "40 s",
            "8": "40 s"
          },
          "weeklyRir": {
            "1": "3",
            "2": "2-3",
            "3": "2",
            "4": "2",
            "5": "4",
            "6": "3",
            "7": "2-3",
            "8": "2"
          },
          "weeklyTargetNote": {
            "1": "Adaptación; comprobar técnica y referencia inicial. Final dinámico moderado, sin saltos ni HIIT; omitir si hay fatiga de piernas.",
            "2": "Aumentar 1 repetición si se conserva el RIR. Final dinámico moderado, sin saltos ni HIIT; omitir si hay fatiga de piernas.",
            "3": "Doble progresión: reps y luego peso. Final dinámico moderado, sin saltos ni HIIT; omitir si hay fatiga de piernas.",
            "4": "Consolidación sin fallo. Final dinámico moderado, sin saltos ni HIIT; omitir si hay fatiga de piernas.",
            "5": "Descarga: menos series, RIR 4. Final dinámico moderado, sin saltos ni HIIT; omitir si hay fatiga de piernas.",
            "6": "Reinicio técnico: RIR 3. Final dinámico moderado, sin saltos ni HIIT; omitir si hay fatiga de piernas.",
            "7": "Progresar repeticiones o carga moderada. Final dinámico moderado, sin saltos ni HIIT; omitir si hay fatiga de piernas.",
            "8": "Consolidar y registrar comparación con S1. Final dinámico moderado, sin saltos ni HIIT; omitir si hay fatiga de piernas."
          },
          "programNote": "Final dinámico moderado, sin saltos ni HIIT; omitir si hay fatiga de piernas. Una sola ocupación de máquina; completar todas las series antes de cambiar."
        }
      ]
    }
  ];

  const VISUALS={
    'dia-1':{icon:'lower',cls:'blue',label:'Lower A',code:'LA'},
    'dia-2':{icon:'upper',cls:'orange',label:'Upper A',code:'UA'},
    'dia-3':{icon:'lower',cls:'red',label:'Lower B',code:'LB'},
    'dia-4':{icon:'upper',cls:'purple',label:'Upper B',code:'UB'}
  };

  function isAna(){
    const gate=document.getElementById('profileGate');
    const btn=document.getElementById('profileSwitchBtn');
    return !!btn && btn.textContent.trim()==='Ana' && (!gate || gate.classList.contains('hidden'));
  }

  function findAnaExercise(key){
    for(const r of routines||[]){
      const e=r.exercises?.find(x=>x.key===key);
      if(e) return e;
    }
    return null;
  }

  function applyWeekTargets(){
    if(!isAna() || plan?.id!==PLAN_ID || !Array.isArray(routines)) return false;
    const week=String(typeof getWeek==='function'?getWeek():1);
    let changed=false;
    routines.forEach(r=>r.exercises?.forEach(e=>{
      const nextSets=e.weeklySets?.[week];
      if(nextSets!=null && Number(e.sets)!==Number(nextSets)){e.sets=Number(nextSets);changed=true;}
      const nextReps=e.weeklyReps?.[week];
      if(nextReps && e.reps!==nextReps){e.reps=nextReps;changed=true;}
      if(Number(e.rest)>60){e.rest=60;changed=true;}
    }));
    return changed;
  }

  function ensureAnaPlan(){
    if(!isAna() || typeof plan==='undefined' || typeof routines==='undefined') return;
    let changed=false;
    if(plan?.id!==PLAN_ID){
      plan=JSON.parse(JSON.stringify(PLAN));
      routines=JSON.parse(JSON.stringify(ROUTINES));
      changed=true;
      if(typeof activeWorkout!=='undefined' && activeWorkout){
        const hasSeries=activeWorkout.exercises?.some(e=>e.sets?.some(s=>s.completed));
        if(!hasSeries){activeWorkout=null;try{localStorage.removeItem(STORAGE.active);}catch(e){}}
      }
    }
    if(applyWeekTargets()) changed=true;
    if(changed){
      try{
        localStorage.setItem(STORAGE.plan,JSON.stringify(plan));
        localStorage.setItem(STORAGE.routines,JSON.stringify(routines));
      }catch(e){}
      try{renderAll();}catch(e){}
    }
  }

  function patchHistoryByPlan(){
    if(typeof getCurrentWeekWorkout!=='function' || getCurrentWeekWorkout.__nexusAnaNewCycleV291) return;
    const original=getCurrentWeekWorkout;
    const wrapped=function(routineId){
      if(isAna() && plan?.id===PLAN_ID){
        const week=typeof getWeek==='function'?Number(getWeek()):1;
        return (workouts||[]).find(w=>w?.routineId===routineId && Number(w?.mesocycleWeek)===week && w?.planId===PLAN_ID && !!w?.finishedAt) || null;
      }
      return original(routineId);
    };
    wrapped.__nexusAnaNewCycleV291=true;
    getCurrentWeekWorkout=wrapped;
  }

  function patchRepRanges(){
    if(typeof getTargetRepRange==='function' && !getTargetRepRange.__nexusAnaV216){
      const original=getTargetRepRange;
      const wrapped=function(key,week=getWeek(),fallback=''){
        if(isAna() && plan?.id===PLAN_ID){
          const e=findAnaExercise(key);
          if(e) return e.weeklyReps?.[String(week)] || e.reps || fallback || '—';
        }
        return original(key,week,fallback);
      };
      wrapped.__nexusAnaV216=true;
      getTargetRepRange=wrapped;
    }

    if(typeof startWorkout==='function' && !startWorkout.__nexusAnaV216){
      const original=startWorkout;
      const wrapped=function(routineId){
        if(isAna() && plan?.id===PLAN_ID) applyWeekTargets();
        return original(routineId);
      };
      wrapped.__nexusAnaV216=true;
      startWorkout=wrapped;
    }
  }

  function patchVisuals(){
    if(typeof getRoutineVisual==='function' && !getRoutineVisual.__nexusAnaV216){
      const original=getRoutineVisual;
      const wrapped=function(routineId){
        if(isAna() && VISUALS[routineId]) return VISUALS[routineId];
        return original(routineId);
      };
      wrapped.__nexusAnaV216=true;
      getRoutineVisual=wrapped;
    }
  }

  function updateHomePill(){
    const list=document.getElementById('routineList');
    const card=list?.closest('.card');
    const pill=card?.querySelector('.pill');
    if(!pill) return;
    if(isAna()) pill.textContent='4 días fuerza';
    else if(pill.textContent==='4 días fuerza') pill.textContent='5 días';
  }

  function ensurePilatesOption(){
    const select=document.getElementById('activityTypeInput');
    if(!select || select.querySelector('option[value="pilates"]')) return;
    const opt=document.createElement('option');
    opt.value='pilates'; opt.textContent='Pilates';
    const other=select.querySelector('option[value="other"]');
    if(other) select.insertBefore(opt,other); else select.appendChild(opt);
  }

  function patchActivityVisual(){
    if(typeof getActivityVisual==='function' && !getActivityVisual.__nexusAnaV216){
      const original=getActivityVisual;
      const wrapped=function(type){
        if(type==='pilates') return {icon:'other',cls:'other',label:'Pilates'};
        return original(type);
      };
      wrapped.__nexusAnaV216=true;
      getActivityVisual=wrapped;
    }
  }

  function updateVersion(){ /* Version centralizada en polar-intelligence-v222.js */ }

  function tick(){
    patchRepRanges();
    patchHistoryByPlan();
    patchVisuals();
    patchActivityVisual();
    ensurePilatesOption();
    ensureAnaPlan();
    updateHomePill();
    updateVersion();
  }

  function boot(){
    tick();
    let n=0;
    const fast=setInterval(()=>{tick();if(++n>=20)clearInterval(fast);},750);
    setInterval(tick,30000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')tick();});
    document.addEventListener('click',e=>{if(e.target.closest?.('[data-profile]'))setTimeout(tick,450);},true);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();