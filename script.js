(() => {
  const root = document.documentElement;
  const body = document.body;
  const toast = document.getElementById('toast');
  let toastTimer;
  const showToast = (text) => {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2100);
  };

  // Theme preference is intentionally stored locally in the browser.
  let savedTheme = '';
  try { savedTheme = localStorage.getItem('gitbook-theme') || ''; } catch (err) { /* Local-file previews may have storage disabled. */ }
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('gitbook-theme', next); } catch (err) { /* Theme still works for this page view. */ }
    showToast(next === 'dark' ? 'پوستهٔ تیره فعال شد' : 'پوستهٔ روشن فعال شد');
  });

  // Copy buttons: supports terminal rows and code blocks.
  async function copyText(text) {
    const clean = String(text).replaceAll('&quot;', '"').replaceAll('&#10;', '\n').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
    try {
      await navigator.clipboard.writeText(clean);
      showToast('کپی شد');
    } catch (err) {
      const area = document.createElement('textarea');
      area.value = clean;
      area.style.position = 'fixed'; area.style.opacity = '0';
      document.body.appendChild(area); area.select();
      const ok = document.execCommand('copy'); area.remove();
      showToast(ok ? 'کپی شد' : 'کپی خودکار نشد؛ دستور را دستی انتخاب کن');
    }
  }
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', () => copyText(button.dataset.copy)));
  document.getElementById('printButton').addEventListener('click', () => window.print());

  const chapters = [...document.querySelectorAll('.chapter')];
  const navLinks = [...document.querySelectorAll('.toc-link')];
  const main = document.getElementById('mainContent');
  function setActive(id) {
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
    if (body.classList.contains('present')) {
      chapters.forEach(chapter => chapter.classList.toggle('presentation-current', chapter.id === id));
      const current = chapters.findIndex(chapter => chapter.id === id);
      window.presentationIndex = current < 0 ? 0 : current;
    }
  }
  navLinks.forEach(link => link.addEventListener('click', () => {
    const id = link.getAttribute('href').slice(1);
    setActive(id);
    document.getElementById('sidebar').classList.remove('open');
  }));
  const observer = new IntersectionObserver(entries => {
    if (body.classList.contains('present')) return;
    entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
  }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
  chapters.forEach(chapter => observer.observe(chapter));

  const progressBar = document.getElementById('progressBar');
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${max <= 0 ? 0 : Math.min(100, Math.max(0, window.scrollY / max * 100))}%`;
  }
  window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress();

  document.getElementById('menuToggle').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
  document.addEventListener('click', event => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('menuToggle');
    if (window.innerWidth <= 850 && sidebar.classList.contains('open') && !sidebar.contains(event.target) && !toggle.contains(event.target)) sidebar.classList.remove('open');
  });

  // Filter the contents list by visible chapter title.
  const navSearch = document.getElementById('navSearch');
  navSearch.addEventListener('input', () => {
    const query = navSearch.value.trim().toLocaleLowerCase('fa');
    let visible = 0;
    navLinks.forEach(link => {
      const show = link.textContent.toLocaleLowerCase('fa').includes(query);
      link.hidden = !show;
      if (show) visible++;
    });
    let message = document.getElementById('noNavResults');
    if (visible === 0 && !message) {
      message = document.createElement('div'); message.id = 'noNavResults'; message.className = 'no-results'; message.textContent = 'فصلی پیدا نشد.'; document.getElementById('toc').appendChild(message);
    } else if (visible > 0 && message) message.remove();
  });

  // Slide-like presentation mode: one chapter at a time.
  const presentButton = document.getElementById('presentationToggle');
  function moveSlide(delta) {
    if (!body.classList.contains('present')) return;
    const next = Math.max(0, Math.min(chapters.length - 1, (window.presentationIndex || 0) + delta));
    setActive(chapters[next].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  presentButton.addEventListener('click', () => {
    const enable = !body.classList.contains('present');
    if (enable) {
      const current = navLinks.find(link => link.classList.contains('active'))?.getAttribute('href')?.slice(1) || 'home';
      body.classList.add('present'); setActive(current); window.scrollTo({ top: 0, behavior: 'auto' });
      presentButton.innerHTML = '<span aria-hidden="true">▣</span> خروج از ارائه';
      showToast('حالت ارائه فعال شد · با کلیدهای جهت حرکت کن');
    } else {
      const id = chapters[window.presentationIndex || 0].id;
      body.classList.remove('present');
      chapters.forEach(chapter => chapter.classList.remove('presentation-current'));
      presentButton.innerHTML = '<span aria-hidden="true">▣</span> حالت ارائه';
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      showToast('به حالت مطالعه برگشتی');
    }
  });
  document.addEventListener('keydown', event => {
    if (!body.classList.contains('present')) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'PageDown') { event.preventDefault(); moveSlide(1); }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'PageUp') { event.preventDefault(); moveSlide(-1); }
    if (event.key === 'Escape') presentButton.click();
  });

  // Small classroom quiz.
  const questions = [
    { q: 'فایلی را تغییر داده‌ای، اما هنوز git add نزده‌ای. اگر همین حالا Commit کنی چه می‌شود؟', options: ['تغییر جدید خودکار وارد Commit می‌شود', 'تغییر جدید وارد Commit نمی‌شود؛ فقط تغییرهای Stage شده ثبت می‌شوند', 'Git خودش فایل را Stage می‌کند'], answer: 1, why: 'Commit تغییرهای Stage شده را ثبت می‌کند. با git status و git diff وضعیت را بررسی کن.' },
    { q: 'Commit انجام شده اما Push نکرده‌ای. آیا این Commit روی GitHub قرار دارد؟', options: ['بله، Commit و Push یکی هستند', 'خیر؛ Commit محلی است تا وقتی به Remote ارسال شود', 'فقط اگر روی main باشی'], answer: 1, why: 'Commit تاریخچهٔ محلی را به‌روزرسانی می‌کند؛ Push Commitها را به مخزن راه دور می‌فرستد.' },
    { q: 'چرا برای قابلیت جدید Branch جدا می‌سازیم؟', options: ['چون Git بدون Branch کار نمی‌کند', 'برای جدا نگه‌داشتن توسعه از شاخهٔ اصلی و امکان بررسی قبل از ادغام', 'تا از Commit کردن بی‌نیاز شویم'], answer: 1, why: 'Branch یک مسیر کاری جدا می‌دهد و کمک می‌کند تغییرها مستقل توسعه داده شوند.' },
    { q: 'دو شاخه یک خط را به شکل ناسازگار تغییر داده‌اند و هنگام Merge تعارض رخ می‌دهد. قدم درست چیست؟', options: ['همیشه نسخهٔ main را حذف کنیم', 'پوشهٔ .git را پاک کنیم', 'هر دو تغییر را بررسی کنیم، نسخهٔ نهایی را ویرایش و فایل را Stage کنیم'], answer: 2, why: 'Git نمی‌تواند نیت کد را بفهمد. پس از انتخاب محتوای نهایی، نشانگرها را حذف کن، تست کن و status را بررسی کن.' },
    { q: 'یک Commit اشتباه در شاخهٔ مشترک Push شده است. کدام گزینه معمولاً تاریخچه را بدون بازنویسی خنثی می‌کند؟', options: ['git revert <hash>', 'git reset --hard HEAD~1', 'rm -rf .git'], answer: 0, why: 'Revert یک Commit جدید می‌سازد که تغییرهای قبلی را معکوس می‌کند. Reset می‌تواند اشاره‌گر تاریخچه را جابه‌جا کند و گزینهٔ --hard تغییرات محلی را نیز پاک می‌کند.' }
  ];
  let qIndex = 0; const selected = {}; const checked = {};
  const quizContent = document.getElementById('quizContent');
  const quizCount = document.getElementById('quizCount'); const quizProgress = document.getElementById('quizProgress');
  const quizPrev = document.getElementById('quizPrev'); const quizNext = document.getElementById('quizNext'); const quizScore = document.getElementById('quizScore');
  function renderQuiz() {
    const q = questions[qIndex];
    quizCount.textContent = `سؤال ${qIndex + 1} از ${questions.length}`;
    quizProgress.style.width = `${(qIndex + 1) / questions.length * 100}%`;
    quizPrev.disabled = qIndex === 0;
    quizNext.textContent = qIndex === questions.length - 1 ? (checked[qIndex] ? 'دیدن نتیجه' : 'ثبت پاسخ') : 'سؤال بعدی ←';
    quizContent.innerHTML = '';
    const question = document.createElement('div'); question.className = 'quiz-question'; question.textContent = q.q; quizContent.appendChild(question);
    const options = document.createElement('div'); options.className = 'quiz-options';
    q.options.forEach((label, index) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'quiz-option';
      if (selected[qIndex] === index) button.classList.add('selected');
      if (checked[qIndex] && index === q.answer) button.classList.add('correct');
      if (checked[qIndex] && selected[qIndex] === index && index !== q.answer) button.classList.add('wrong');
      const letter = document.createElement('span'); letter.className = 'option-letter'; letter.textContent = String.fromCharCode(65 + index);
      const text = document.createElement('span'); text.textContent = label;
      button.append(letter, text); button.disabled = Boolean(checked[qIndex]);
      button.addEventListener('click', () => { selected[qIndex] = index; renderQuiz(); });
      options.appendChild(button);
    }); quizContent.appendChild(options);
    if (checked[qIndex]) { const feedback = document.createElement('div'); feedback.className = 'quiz-feedback' + (selected[qIndex] === q.answer ? '' : ' wrong'); feedback.textContent = (selected[qIndex] === q.answer ? 'درست است. ' : `پاسخ درست: ${q.options[q.answer]} — `) + q.why; quizContent.appendChild(feedback); }
    quizScore.hidden = true;
  }
  quizPrev.addEventListener('click', () => { qIndex = Math.max(0, qIndex - 1); renderQuiz(); });
  quizNext.addEventListener('click', () => {
    if (quizNext.dataset.restart === 'true') {
      qIndex = 0;
      Object.keys(selected).forEach(k => delete selected[k]);
      Object.keys(checked).forEach(k => delete checked[k]);
      delete quizNext.dataset.restart;
      renderQuiz();
      return;
    }
    if (!checked[qIndex]) {
      if (selected[qIndex] === undefined) { showToast('ابتدا یک گزینه انتخاب کن'); return; }
      checked[qIndex] = true; renderQuiz(); return;
    }
    if (qIndex < questions.length - 1) { qIndex++; renderQuiz(); }
    else {
      const score = questions.reduce((sum, q, i) => sum + (selected[i] === q.answer ? 1 : 0), 0);
      quizScore.hidden = false; quizScore.textContent = `نتیجه: ${score} از ${questions.length} پاسخ درست. برای یادگیری، توضیح هر پاسخ را هم مرور کن.`;
      quizNext.textContent = 'شروع دوباره'; quizNext.dataset.restart = 'true';
    }
  });
  renderQuiz();
})();
