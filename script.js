document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.querySelector('.nav-links');
  if (!toggle || !drawer) return;

  // ARIA wired at runtime — no HTML change required on any page.
  if (!drawer.id) drawer.id = 'primary-nav';
  toggle.setAttribute('aria-controls', drawer.id);
  toggle.setAttribute('aria-expanded', 'false');
  if (!toggle.hasAttribute('type')) toggle.setAttribute('type', 'button');

  // Backdrop injected once (kept out of the header's stacking context).
  var backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  var lastFocus = null;

  function focusable() {
    return Array.prototype.slice
      .call(drawer.querySelectorAll('a[href], button:not([disabled])'))
      .filter(function (el) { return el.offsetParent !== null; });
  }
  function isOpen() { return drawer.classList.contains('open'); }

  function open() {
    lastFocus = document.activeElement;
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('nav-open');   // scroll-lock
    toggle.setAttribute('aria-expanded', 'true');
    var f = focusable();
    if (f.length) f[0].focus();
  }

  function close(returnFocus) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus !== false) (lastFocus || toggle).focus();
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isOpen()) { close(); } else { open(); }
  });

  backdrop.addEventListener('click', function () { close(); });

  // Tapping a link navigates away — close without stealing focus.
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('a')) close(false);
  });

  document.addEventListener('keydown', function (e) {
    if (!isOpen()) return;
    if (e.key === 'Escape' || e.key === 'Esc') { close(); return; }
    if (e.key === 'Tab') {                       // focus trap
      var f = focusable();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Growing back to desktop resets state so the inline nav never inherits "open".
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1200 && isOpen()) close(false);
  });
});
