document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  // Wire ARIA at runtime so no HTML changes are needed.
  if (!links.id) links.id = 'primary-nav';
  toggle.setAttribute('aria-controls', links.id);
  toggle.setAttribute('aria-expanded', 'false');
  if (!toggle.hasAttribute('type')) toggle.setAttribute('type', 'button');

  function isOpen() {
    return links.classList.contains('open');
  }

  function setOpen(open) {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function close(returnFocus) {
    if (!isOpen()) return;
    setOpen(false);
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!isOpen());
  });

  // Close when a link inside the menu is activated.
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) close(false);
  });

  // Close on outside tap/click.
  document.addEventListener('click', function (e) {
    if (!isOpen()) return;
    if (!links.contains(e.target) && !toggle.contains(e.target)) close(false);
  });

  // Close on Escape, returning focus to the toggle.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') close(true);
  });

  // If the viewport grows back to desktop, reset state so the
  // inline nav never inherits a stale "open" class.
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1200 && isOpen()) setOpen(false);
  });
});
