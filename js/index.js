  // ── NAV スクロール時に背景表示 ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ── パララックス ──
  const heroP = document.getElementById('heroParallax');
  const ctaP  = document.getElementById('ctaParallax');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroP) heroP.style.transform = `translateY(${y * 0.35}px)`;
    if (ctaP) {
      const rect = ctaP.parentElement.getBoundingClientRect();
      ctaP.style.transform = `translateY(${-rect.top * 0.25}px)`;
    }
  }, { passive: true });

  // ── スクロールアニメーション ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // カウントアップ
        const counter = e.target.querySelector('.count');
        if (counter && !counter.dataset.done) {
          counter.dataset.done = '1';
          const target = parseInt(counter.dataset.target);
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            counter.textContent = current;
            if (current >= target) clearInterval(timer);
          }, 40);
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

  // ── フォーム送信 ──
  async function handleForm(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert('ありがとうございます！後ほどご連絡いたします。');
        form.reset();
      } else {
        const err = await res.json().catch(() => ({}));
        console.error('DEBUG full error:', err);
        alert(`送信失敗\n${err.error || ''}\n\ndetail: ${err.detail || ''}\nkey: ${err.keyHint || ''}`);
      }
    } catch (err) {
      alert('通信エラーが発生しました。もう一度お試しください。');
      console.error(err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
  window.handleForm = handleForm;

  // ── ハンバーガーメニュー ──
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
