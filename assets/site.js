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
  });
  function closeMenu() { if (mb && mm && !mm.hidden) { mm.hidden = true; mb.setAttribute('aria-expanded', 'false'); } }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
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
    document.getElementById('pe-sent').hidden = false;
  });
  var reset = document.getElementById('pe-reset');
  if (reset) reset.addEventListener('click', function () {
    document.getElementById('pe-form-wrap').hidden = false;
    document.getElementById('pe-sent').hidden = true;
  });
})();
