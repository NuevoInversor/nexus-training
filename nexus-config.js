window.NEXUS_CLOUD = {
  url: 'https://ecfxzsddqgnbkgjrwpri.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7',
  publishableKey: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7'
};

(() => {
  const loadHomeMesocycle = () => {
    if (document.querySelector('script[data-nexus-home-mesocycle]')) return;
    const script = document.createElement('script');
    script.src = 'home-mesocycle-v221.js?v=2.21';
    script.dataset.nexusHomeMesocycle = 'v2.21';
    script.async = false;
    document.head.appendChild(script);
  };

  const loadPlanEditor = () => {
    if (document.querySelector('script[data-nexus-plan-editor]')) {
      loadHomeMesocycle();
      return;
    }
    const script = document.createElement('script');
    script.src = 'plan-editor-v220.js?v=2.20';
    script.dataset.nexusPlanEditor = 'v2.20';
    script.async = false;
    script.onload = loadHomeMesocycle;
    script.onerror = loadHomeMesocycle;
    document.head.appendChild(script);
  };

  const loadPolar = () => {
    if (document.querySelector('script[data-nexus-polar]')) {
      loadPlanEditor();
      return;
    }
    const script = document.createElement('script');
    script.src = 'polar-v218.js?v=2.19';
    script.dataset.nexusPolar = 'v2.19';
    script.async = false;
    script.onload = loadPlanEditor;
    script.onerror = loadPlanEditor;
    document.head.appendChild(script);
  };

  const loadProfileCardioAccess = () => {
    if (document.querySelector('script[data-nexus-profile-cardio-access]')) {
      loadPolar();
      return;
    }
    const script = document.createElement('script');
    script.src = 'profile-cardio-access-v217.js?v=2.17';
    script.dataset.nexusProfileCardioAccess = 'v2.17';
    script.async = false;
    script.onload = loadPolar;
    script.onerror = loadPolar;
    document.head.appendChild(script);
  };

  const loadAnaPlan = () => {
    if (document.querySelector('script[data-nexus-ana-plan]')) return;
    const script = document.createElement('script');
    script.src = 'ana-plan-v216.js?v=2.16';
    script.dataset.nexusAnaPlan = 'v2.16';
    script.async = false;
    document.head.appendChild(script);
  };

  const loadCardioReport = () => {
    if (document.querySelector('script[data-nexus-cardio-report]')) return;
    const script = document.createElement('script');
    script.src = 'cardio-report-v215.js?v=2.15';
    script.dataset.nexusCardioReport = 'v2.15';
    script.async = false;
    document.head.appendChild(script);
  };

  const loadDavidCardio = () => {
    if (document.querySelector('script[data-nexus-david-cardio]')) {
      loadCardioReport();
      loadAnaPlan();
      loadProfileCardioAccess();
      return;
    }
    const script = document.createElement('script');
    script.src = 'cardio-david-v214.js?v=2.14';
    script.dataset.nexusDavidCardio = 'v2.14';
    script.async = false;
    script.onload = () => { loadCardioReport(); loadAnaPlan(); loadProfileCardioAccess(); };
    script.onerror = () => { loadCardioReport(); loadAnaPlan(); loadProfileCardioAccess(); };
    document.head.appendChild(script);
  };

  const loadDavidMesocycle = () => {
    if (document.querySelector('script[data-nexus-david-mesocycle]')) {
      loadDavidCardio();
      return;
    }
    const script = document.createElement('script');
    script.src = 'mesocycle-david-v213.js?v=2.13';
    script.dataset.nexusDavidMesocycle = 'v2.13';
    script.async = false;
    script.onload = loadDavidCardio;
    script.onerror = loadDavidCardio;
    document.head.appendChild(script);
  };

  const loadWorkoutControls = () => {
    if (document.querySelector('script[data-nexus-workout-controls]')) {
      loadDavidMesocycle();
      return;
    }
    const controls = document.createElement('script');
    controls.src = 'workout-controls-v212.js?v=2.12';
    controls.dataset.nexusWorkoutControls = 'v2.12';
    controls.async = false;
    controls.onload = loadDavidMesocycle;
    controls.onerror = loadDavidMesocycle;
    document.head.appendChild(controls);
  };

  const loadProfileUI = () => {
    if (document.querySelector('script[data-nexus-profile-ui]')) {
      loadWorkoutControls();
      return;
    }

    const NativeMutationObserver = window.MutationObserver;
    if (NativeMutationObserver) {
      window.MutationObserver = class NexusOneShotObserver {
        constructor() {}
        observe() {}
        disconnect() {}
        takeRecords() { return []; }
      };
    }

    const finishProfileLoad = () => {
      if (NativeMutationObserver) window.MutationObserver = NativeMutationObserver;
      loadWorkoutControls();
    };

    const script = document.createElement('script');
    script.src = 'profile-ui-v211.js?v=2.11.1';
    script.dataset.nexusProfileUi = 'v2.11.1';
    script.async = false;
    script.onload = finishProfileLoad;
    script.onerror = finishProfileLoad;
    document.head.appendChild(script);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProfileUI, { once: true });
  } else {
    loadProfileUI();
  }
})();
