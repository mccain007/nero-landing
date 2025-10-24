const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;
function applyReduced(on){ root.setAttribute('data-reduce-motion', on ? 'true' : 'false'); }
applyReduced(prefersReduced.matches);
prefersReduced.addEventListener?.('change', e => applyReduced(e.matches));

