/* Scroll-reveal — vanilla JS, no libraries.
   Auto-tags content blocks with .reveal, then fades/rises them in
   as they enter the viewport. No HTML edits required. */
document.addEventListener('DOMContentLoaded', function () {
  var selector = '.card, .section-head, .tl-item, .person';
  var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));

  // Tag targets with the reveal class before observing.
  nodes.forEach(function (el) { el.classList.add('reveal'); });

  // Fallback: if IntersectionObserver is unavailable, just show everything.
  if (!('IntersectionObserver' in window)) {
    nodes.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  nodes.forEach(function (el) { observer.observe(el); });
});
