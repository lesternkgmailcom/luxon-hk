/* ============================================================
   Chat Story — Scroll-driven animation engine
   Uses IntersectionObserver for staggered bubble reveals.
   No dependencies. IIFE to avoid globals.
   ============================================================ */
(function () {
  'use strict';

  const STAGGER_DELAY = 120;   // ms between bubbles in a group
  const TYPING_DELAY = 400;    // ms before typing indicator hides

  function initChatStory(root) {
    const container = root || document;
    const groups = container.querySelectorAll('.chat-story__group');

    if (!groups.length) return;

    groups.forEach(function (group) {
      const bubbles = group.querySelectorAll('.chat-story__bubble');
      const typing = group.querySelector('.chat-story__typing');
      const divider = group.querySelector('.chat-story__divider');

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              revealGroup(bubbles, typing, divider);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(group);
    });

    // Also handle standalone dividers and narration blocks
    const standalones = container.querySelectorAll(
      '.chat-story__divider:not(.chat-story__group .chat-story__divider), ' +
      '.chat-story__narration'
    );

    standalones.forEach(function (el) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(el);
    });
  }

  function revealGroup(bubbles, typing, divider) {
    var delay = 0;

    // Reveal divider first if present
    if (divider) {
      setTimeout(function () {
        divider.classList.add('is-visible');
      }, 0);
      delay += STAGGER_DELAY;
    }

    // Stagger each bubble
    bubbles.forEach(function (bubble, i) {
      setTimeout(function () {
        bubble.classList.add('is-visible');
      }, delay + i * STAGGER_DELAY);
    });

    // If there's a typing indicator, show it briefly before last bubble
    if (typing) {
      var typingStart = delay + (bubbles.length - 1) * STAGGER_DELAY - STAGGER_DELAY * 0.5;
      setTimeout(function () {
        typing.classList.add('is-visible');
      }, Math.max(0, typingStart));

      setTimeout(function () {
        typing.classList.remove('is-visible');
      }, typingStart + STAGGER_DELAY * 1.5);
    }
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initChatStory();
    });
  } else {
    initChatStory();
  }
})();
