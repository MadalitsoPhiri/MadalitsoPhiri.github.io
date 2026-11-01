// Profile links. Leave a value empty to hide everything that points to it.
const LINKS = {
  github: 'https://github.com/MadalitsoPhiri',
  upwork: 'https://www.upwork.com/freelancers/~014a5ea5e7810e201f',
};

document.querySelectorAll('[data-link]').forEach((el) => {
  const url = LINKS[el.dataset.link];
  const link = el.tagName === 'A' ? el : el.querySelector('a');
  if (url && link) link.href = url;
  else el.classList.add('is-hidden');
});

// Theme toggle: flips whichever theme is showing and remembers the choice.
const root = document.documentElement;
document.getElementById('themeToggle').addEventListener('click', () => {
  const current = root.dataset.theme
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Logo strip: clone the list once so the scroll loops without a gap.
document.querySelectorAll('.marquee__track').forEach((track) => {
  const clone = track.firstElementChild.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  clone.querySelectorAll('img').forEach((img) => { img.alt = ''; });
  track.appendChild(clone);
});

// Copy email
const toast = document.getElementById('toast');
const showToast = (msg) => {
  toast.textContent = msg;
  toast.classList.add('is-visible');
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => toast.classList.remove('is-visible'), 1800);
};
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      showToast('Email copied');
    } catch {
      showToast(btn.dataset.copy);
    }
  });
});

// "How I work" steps
const STEPS = [
  ['01 Understand the problem', 'We talk through the product, the users and what success looks like. I ask about constraints early: budget, deadlines, existing systems.'],
  ['02 Plan the build', 'I break the work into small, shippable pieces and agree the data model and API shape before writing screens.'],
  ['03 Build and show progress', 'I ship to a staging environment as I go, so you can click through real features every week rather than wait for a big reveal.'],
  ['04 Launch and support', 'Production deploys, app store releases, monitoring, and fixes after launch. I document what I build so your team can take it over.'],
];
document.querySelectorAll('[data-steps]').forEach((root) => {
  const title = root.querySelector('[data-step-title]');
  const text = root.querySelector('[data-step-text]');
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    const i = Number(tab.dataset.i);
    title.textContent = STEPS[i][0];
    text.textContent = STEPS[i][1];
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
  }));
});

document.getElementById('year').textContent = new Date().getFullYear();
