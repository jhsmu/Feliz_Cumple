(() => {
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d', { alpha: true });
  
    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const CONFIG = { starCount: 200, twinkleSpeed: 0.02, starMinR: 0.3, starMaxR: 1.8 };
    const stars = [];
  
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    }
    function rand(min,max){ return Math.random()*(max-min)+min; }
    function initStars() {
      stars.length = 0;
      for(let i=0;i<CONFIG.starCount;i++) stars.push(createStar());
    }
    function createStar() {
      return {
        x: Math.random()*width,
        y: Math.random()*height,
        r: rand(CONFIG.starMinR, CONFIG.starMaxR),
        alpha: rand(0.4,1),
        twinkleSpeed: rand(CONFIG.twinkleSpeed*0.5, CONFIG.twinkleSpeed*1.5),
        phase: Math.random()*Math.PI*2,
      };
    }
    function drawStar(s) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    }
    function updateStars() {
      for(const s of stars){
        s.phase += s.twinkleSpeed;
        s.alpha = 0.5 + 0.5*Math.sin(s.phase);
      }
    }
    function loop() {
      ctx.fillStyle = 'rgba(11,18,32,0.9)';
      ctx.fillRect(0,0,width,height);
      updateStars();
      for(const s of stars) drawStar(s);
      requestAnimationFrame(loop);
    }
    resize();
    window.addEventListener('resize', resize);
    loop();
  })();

