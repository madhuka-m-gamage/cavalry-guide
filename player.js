// Frame player for the workflow animations, the copy buttons, the saved checklist, and the edge-case filters.
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.player').forEach((el) => {
    const name = el.dataset.anim;
    const durations = JSON.parse(el.dataset.durations);
    const n = durations.length;
    const img = el.querySelector('.stage img');
    const play = el.querySelector('.play');
    const range = el.querySelector('input[type="range"]');
    const count = el.querySelector('.count');
    const src = (i) => `assets/${name}/${String(i).padStart(2, '0')}.jpg`;
    for (let i = 1; i < n; i++) new Image().src = src(i);
    let i = 0;
    let timer = null;

    function show(k) {
      i = (k + n) % n;
      img.src = src(i);
      range.value = i;
      count.textContent = `${i + 1} / ${n}`;
    }
    function tick() {
      timer = setTimeout(() => { show(i + 1); tick(); }, durations[i]);
    }
    function setPlaying(on) {
      clearTimeout(timer);
      timer = null;
      if (on) tick();
      play.textContent = on ? 'Pause' : 'Play';
      play.setAttribute('aria-pressed', String(on));
    }
    play.addEventListener('click', () => setPlaying(!timer));
    el.querySelector('.prev').addEventListener('click', () => { setPlaying(false); show(i - 1); });
    el.querySelector('.nxt').addEventListener('click', () => { setPlaying(false); show(i + 1); });
    range.addEventListener('input', () => { setPlaying(false); show(Number(range.value)); });
    show(0);
    // Play only while visible, and never automatically for reduced-motion users.
    if (!reduce && 'IntersectionObserver' in window) {
      let started = false;
      new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) { started = true; setPlaying(true); }
          if (!e.isIntersecting && started && timer) { setPlaying(false); started = false; }
        });
      }, { threshold: 0.4 }).observe(el);
    }
  });

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      const done = () => { btn.textContent = 'Copied'; setTimeout(() => (btn.textContent = 'Copy'), 1500); };
      navigator.clipboard?.writeText(text).then(done, () => {
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(btn.previousElementSibling);
        sel.removeAllRanges();
        sel.addRange(range);
        btn.textContent = 'Selected: press Ctrl+C';
      });
    });
  });

  const boxes = document.querySelectorAll('.check input');
  if (boxes.length) {
    const key = 'cavalry-ready';
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch { saved = {}; }
    const out = document.querySelector('.progress');
    const update = () => {
      const done = [...boxes].filter((b) => b.checked).length;
      if (out) out.textContent = `${done} of ${boxes.length} ready`;
    };
    boxes.forEach((b) => {
      b.checked = !!saved[b.id];
      b.addEventListener('change', () => {
        saved[b.id] = b.checked;
        try { localStorage.setItem(key, JSON.stringify(saved)); } catch { /* storage unavailable: progress lasts this visit only */ }
        update();
      });
    });
    update();
  }

  const filters = document.querySelector('.filters');
  if (filters) {
    filters.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      filters.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const area = b.dataset.area;
      document.querySelectorAll('[data-area-section]').forEach((s) => { s.hidden = area !== 'all' && s.dataset.areaSection !== area; });
    });
  }
})();
