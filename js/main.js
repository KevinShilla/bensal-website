// Bensal Pre & Primary School — small site helpers

(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Footer year
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Home page slideshow: next photo every 5 seconds, dots to jump
  document.querySelectorAll('.slideshow').forEach(function (show) {
    var slides = show.querySelectorAll('.slide');
    slides.forEach(function (s) {
      var img = s.querySelector('img');
      if (img) s.style.setProperty('--bg', 'url("' + img.getAttribute('src') + '")');
    });
    if (slides.length < 2) return;
    var delay = parseInt(show.dataset.interval, 10) || 5000;
    var current = 0, timer = null;

    var dots = document.createElement('div');
    dots.className = 'slide-dots';
    slides.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Show photo ' + (i + 1));
      b.addEventListener('click', function () { go(i); start(); });
      dots.appendChild(b);
    });
    show.appendChild(dots);

    function go(i) {
      slides[current].classList.remove('is-active');
      dots.children[current].removeAttribute('aria-current');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots.children[current].setAttribute('aria-current', 'true');
      // start loading the next photo now, so it's ready when its turn comes
      var next = slides[(current + 1) % slides.length].querySelector('img');
      if (next) next.loading = 'eager';
    }
    function start() {
      clearInterval(timer);
      timer = setInterval(function () { if (!document.hidden) go(current + 1); }, delay);
    }
    go(0);
    start();
  });

  // School Life video: play the next clip when one ends, buttons to switch
  document.querySelectorAll('.video-playlist').forEach(function (frame) {
    var video = frame.querySelector('video');
    var caption = frame.querySelector('figcaption');
    var buttons = Array.prototype.slice.call(frame.querySelectorAll('.clip-list button'));
    var current = 0;
    function load(i, autoplay) {
      var b = buttons[i];
      current = i;
      buttons.forEach(function (x) { x.setAttribute('aria-current', x === b ? 'true' : 'false'); });
      frame.classList.toggle('wide', b.hasAttribute('data-wide'));
      caption.textContent = b.dataset.caption;
      video.poster = b.dataset.poster;
      video.src = b.dataset.src;
      if (autoplay) video.play().catch(function () {});
    }
    buttons.forEach(function (b, i) {
      b.addEventListener('click', function () { load(i, true); });
    });
    video.addEventListener('ended', function () {
      if (current < buttons.length - 1) load(current + 1, true);
      else load(0, false);
    });
  });

  // Animate charts and fade sections in as they scroll into view
  function show(el) {
    el.classList.add('in');
    el.querySelectorAll('[data-h]').forEach(function (b) { b.style.height = b.dataset.h + '%'; });
    el.querySelectorAll('[data-w]').forEach(function (s) { s.style.width = s.dataset.w + '%'; });
  }

  var targets = document.querySelectorAll('.reveal, .chart, .stack-list');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(show);
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  targets.forEach(function (t) { io.observe(t); });
})();
