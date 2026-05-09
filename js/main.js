// TLC Ministry website scripts (light version)

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const canvas = document.getElementById('bubbleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const bubbles = [];

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const spawnBubble = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    bubbles.push({
      x: w * 0.5 + (Math.random() - 0.5) * 80,
      y: h - 140,
      r: 30 + Math.random() * 120,
      vx: -1 + Math.random() * 2,
      vy: -1.5 - Math.random() * 1.4,
      life: 0,
      maxLife: 260 + Math.random() * 140,
      wobble: Math.random() * Math.PI * 2
    });
  };

  const drawBubble = (b) => {
    const g = ctx.createRadialGradient(b.x - b.r * 0.2, b.y - b.r * 0.2, b.r * 0.1, b.x, b.y, b.r);
    g.addColorStop(0, 'rgba(255,255,255,0.24)');
    g.addColorStop(0.6, 'rgba(151,224,255,0.12)');
    g.addColorStop(1, 'rgba(255,105,196,0.2)');

    ctx.beginPath();
    ctx.ellipse(b.x, b.y, b.r * (1 + Math.sin(b.wobble) * 0.08), b.r * (0.55 + Math.cos(b.wobble) * 0.06), Math.sin(b.wobble) * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.stroke();
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    if (Math.random() < 0.12 && bubbles.length < 14) spawnBubble();

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.life += 1;
      b.x += b.vx + Math.sin(b.life * 0.03 + b.wobble) * 0.6;
      b.y += b.vy;
      b.wobble += 0.03;
      b.r *= 0.999;

      drawBubble(b);

      if (b.life > b.maxLife || b.y + b.r < -20) bubbles.splice(i, 1);
    }

    requestAnimationFrame(animate);
  };

  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 8; i++) spawnBubble();
  animate();
});
