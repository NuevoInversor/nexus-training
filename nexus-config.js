window.NEXUS_CLOUD = {
  url: 'https://ecfxzsddqgnbkgjrwpri.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7',
  publishableKey: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7'
};

(() => {
  const loadProfileUI = () => {
    if (document.querySelector('script[data-nexus-profile-ui]')) return;

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

    const restoreObserver = () => {
      if (NativeMutationObserver) window.MutationObserver = NativeMutationObserver;
    };

    const script = document.createElement('script');
    script.src = 'profile-ui-v211.js?v=2.11.1';
    script.dataset.nexusProfileUi = 'v2.11.1';
    script.defer = true;
    script.onload = restoreObserver;
    script.onerror = restoreObserver;
    document.head.appendChild(script);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProfileUI, { once: true });
  } else {
    loadProfileUI();
  }
})();
