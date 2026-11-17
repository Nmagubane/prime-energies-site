(function () {
  // Platform console tabs
  document.querySelectorAll('[data-console]').forEach(function (root) {
    var btns = root.querySelectorAll('[data-tab]');
    var panels = root.querySelectorAll('[data-panel]');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        panels.forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== b.getAttribute('data-tab'); });
      });
    });
  });
  // Mobile menu
  var mb = document.querySelector('.pe-menu-btn'), mm = document.getElementById('pe-mobile-menu');
  if (mb && mm) mb.addEventListener('click', function () {
    var open = mb.getAttribute('aria-expanded') === 'true';
    mb.setAttribute('aria-expanded', open ? 'false' : 'true'); mm.hidden = open;
    document.body.classList.toggle('pe-menu-open', !open);
  });
  // Ticker pause
  document.querySelectorAll('.pe-tick-pause').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.closest('.pe-ticker'), on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.setAttribute('aria-label', on ? 'Play news ticker' : 'Pause news ticker');
      t.classList.toggle('is-paused', on);
    });
  });
  // Pause decorative animation in sections that are off screen
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('pe-paused', !e.isIntersecting); });
    }, { rootMargin: '200px 0px' });
    document.querySelectorAll('main > section, main > div > section').forEach(function (sec) { io.observe(sec); });
  }
  // Copy email
  var cp = document.getElementById('pe-copy');
  if (cp) cp.addEventListener('click', function () {
    var done = function () { cp.textContent = 'Copied'; setTimeout(function () { cp.textContent = 'Copy email address'; }, 2000); };
    try { navigator.clipboard.writeText('info@primeenergies.co.za').then(done, function () {}); } catch (err) {}
  });
  function closeMenu(refocus) { if (mb && mm && !mm.hidden) { mm.hidden = true; mb.setAttribute('aria-expanded', 'false'); document.body.classList.remove('pe-menu-open'); if (refocus) mb.focus(); } }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(true); });
  document.addEventListener('click', function (e) { if (mm && mb && !mm.contains(e.target) && !mb.contains(e.target)) closeMenu(); });
  // Contact form: opens the visitor's email app with the message filled in
  var form = document.getElementById('pe-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var subject = 'Briefing request: ' + f.company.value + ' (' + f.area.value + ')';
    var body = 'Name: ' + f.name.value + '\nCompany: ' + f.company.value + '\nEmail: ' + f.email.value +
               '\nArea of interest: ' + f.area.value + '\n\n' + f.message.value;
    window.location.href = 'mailto:info@primeenergies.co.za?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    document.getElementById('pe-form-wrap').hidden = true;
    var sent = document.getElementById('pe-sent');
    sent.hidden = false;
    var h = sent.querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
  });
  var reset = document.getElementById('pe-reset');
  if (reset) reset.addEventListener('click', function () {
    document.getElementById('pe-form-wrap').hidden = false;
    document.getElementById('pe-sent').hidden = true;
  });
})();
