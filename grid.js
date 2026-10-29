/**
 * FLIP-animate grid reflow when fixed-size tracks change column count.
 * Tile footprints stay constant (--cell); only positions move.
 */
(() => {
  const gallery = document.querySelector(".gallery");
  if (!gallery) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const items = () => [...gallery.querySelectorAll(".project")];

  /** @type {Map<Element, { left: number, top: number }>} */
  let previous = new Map();
  let frame = 0;

  function durationMs() {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--reflow-ms")
      .trim();
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) ? n : 420;
  }

  /** Layout position — ignores CSS transforms / in-flight animations */
  function layoutPos(el) {
    return { left: el.offsetLeft, top: el.offsetTop };
  }

  function snapshot(els) {
    const map = new Map();
    for (const el of els) map.set(el, layoutPos(el));
    previous = map;
  }

  function playFlip() {
    const els = items();
    const ms = durationMs();
    const reduce = prefersReduced.matches || ms <= 0;

    for (const el of els) {
      const last = layoutPos(el);
      const first = previous.get(el);

      if (!first) {
        previous.set(el, last);
        continue;
      }

      const dx = first.left - last.left;
      const dy = first.top - last.top;
      previous.set(el, last);

      if (reduce) continue;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;

      el.getAnimations().forEach((a) => a.cancel());
      el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)` },
          { transform: "translate(0px, 0px)" },
        ],
        {
          duration: ms,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "none",
        }
      );
    }
  }

  function scheduleFlip() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(playFlip);
  }

  snapshot(items());

  const ro = new ResizeObserver(scheduleFlip);
  ro.observe(gallery);
  window.addEventListener("resize", scheduleFlip, { passive: true });
})();
