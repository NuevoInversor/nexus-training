window.NEXUS_CLOUD = {
  url: 'https://ecfxzsddqgnbkgjrwpri.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7',
  publishableKey: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7'
};

(() => {
  const loadWorkoutControls = () => {
    if (document.querySelector('script[data-nexus-workout-controls]')) return;
    const controls = document.createElement('script');
    controls.src = 'workout-controls-v212.js?v=2.12';
    controls.dataset.nexusWorkoutControls = 'v2.12';
    controls.async = false;
    document.head.appendChild(controls);
  };

  const loadProfileUI = () => {
    if (document.querySelector('script[data-nexus-profile-ui]')) {
      loadWorkoutControls();
      return;
    }

    // profile-ui-v211 only needs one initial render. Its MutationObserver was
    // repeatedly re-applying textContent and could starve pointer/click events
    // on some mobile browsers. Disable observers only while this branding
    // script boots, then immediately restore the native implementation.
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
