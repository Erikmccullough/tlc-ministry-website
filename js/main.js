// ===== Mobile nav toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // ===== Reveal on scroll =====
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
    // Safety net: reveal anything still hidden after a short delay (e.g. odd viewport/print states)
    setTimeout(() => revealEls.forEach(el => el.classList.add('in')), 2500);
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ===== Form success handling (FormSubmit redirects with ?submitted=true, but we intercept for same-page UX) =====
  document.querySelectorAll('form[data-ajax="true"]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const successBox = form.parentElement.querySelector('.form-success');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.textContent = 'Sending...'; submitBtn.disabled = true; }
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          form.reset();
          form.style.display = 'none';
          if (successBox) successBox.style.display = 'block';
        } else {
          alert('Something went wrong sending your message. Please try emailing erik@tacosloveandcreation.org directly.');
        }
      } catch (err) {
        alert('Something went wrong sending your message. Please try emailing erik@tacosloveandcreation.org directly.');
      } finally {
        if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
      }
    });
  });

  initBubbles();
});

// ===== Bubble Fundraiser Canvas =====
function initBubbles() {
  const canvas = document.getElementById('bubbleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let bubbles = [];
  let width, height;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width * devicePixelRatio;
    height = canvas.height = rect.height * devicePixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  function createBubble() {
    const w = canvas.width / devicePixelRatio;
    const h = canvas.height / devicePixelRatio;
    return {
      x: Math.random() * w,
      y: h + Math.random() * 60,
      r: 6 + Math.random() * 26,
      speed: 0.4 + Math.random() * 1.1,
      drift: (Math.random() - 0.5) * 0.6,
      opacity: 0.15 + Math.random() * 0.35,
      hueShift: Math.random()
    };
  }

  function initBubbleList() {
    bubbles = [];
    const count = Math.min(45, Math.floor((canvas.width / devicePixelRatio) / 20));
    for (let i = 0; i < count; i++) {
      const b = createBubble();
      b.y = Math.random() * (canvas.height / devicePixelRatio);
      bubbles.push(b);
    }
  }

  function draw() {
    const w = canvas.width / devicePixelRatio;
    const h = canvas.height / devicePixelRatio;
    ctx.clearRect(0, 0, w, h);
    bubbles.forEach(b => {
      b.y -= b.speed;
      b.x += b.drift;
      if (b.y < -b.r * 2) {
        Object.assign(b, createBubble());
      }
      const grad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
      grad.addColorStop(0, `rgba(255, 244, 214, ${b.opacity + 0.25})`);
      grad.addColorStop(0.6, `rgba(240, 175, 100, ${b.opacity})`);
      grad.addColorStop(1, `rgba(240, 175, 100, 0)`);
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${b.opacity + 0.3})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  initBubbleList();
  draw();
  window.addEventListener('resize', () => { resize(); });
}
