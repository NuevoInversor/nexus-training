window.NEXUS_CLOUD = {
  url: 'https://ecfxzsddqgnbkgjrwpri.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7',
  publishableKey: 'sb_publishable_AhFqvPDGXWmhLwkbI-dXdg_CbXvEui7'
};

(() => {
  const loadProfileUI = () => {
    if (document.querySelector('script[data-nexus-profile-ui]')) return;
    const script = document.createElement('script');
    script.src = 'profile-ui-v211.js';
    script.dataset.nexusProfileUi = 'v2.11';
    script.defer = true;
    document.head.appendChild(script);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProfileUI, { once: true });
  } else {
    loadProfileUI();
  }
})();
