/* The wine connoisseur: drifts across the page every so often, pauses, swirls,
   and offers an opinion. Tap/click him for another one. */
(function () {
  'use strict';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var LINES = [
    'Full-bodied, a little bit fruity… I could swirl this all night.',
    'Ooh, what a lovely nose. The wine, darling. The <em>wine</em>.',
    'This one’s got legs. Not as good as mine, mind.',
    'Firm, well-rounded, with a cheeky finish. Rather like me.',
    'Let it breathe? Darling, I’ve barely had time to.',
    'Spit it out? Madam, I’m a connoisseur, not an animal.',
    'Notes of cherry, leather… and something we shan’t discuss before 9pm.',
    'One glass is tasting. Two is research. Three is team-building.',
    'Mature, complex, and still has a bit of bite. The wine’s not bad either.',
    'Screw caps? No thank you. I prefer a good firm cork.',
    'Lovely body. Excellent structure. Sorry, what were we drinking?',
    'Decanted, uncorked and thoroughly unbuttoned.',
    'Never judge a bottle by its cork. Judge it by how fast it empties.',
    'I like my reds like my evenings: long, warm and slightly scandalous.',
    'Coaching? I’ll coach this bottle straight into my glass.',
    'Pour me another and I’ll tell you what happened in Bordeaux in ’82.',
    'It’s not a drinking problem if you swirl it first.',
    'Oaky, smoky, a bit naughty. Pass the bottle, I’m going in again.'
  ];

  var SVG = '' +
  '<svg viewBox="0 0 120 170" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  // shadow of a floater
  '<ellipse class="wm-shadow" cx="60" cy="166" rx="26" ry="4" fill="rgba(0,0,0,.18)"/>' +
  // legs + shoes
  '<rect x="45" y="118" width="11" height="34" rx="5" fill="#2b2f45"/>' +
  '<rect x="64" y="118" width="11" height="34" rx="5" fill="#2b2f45"/>' +
  '<ellipse cx="49" cy="153" rx="10" ry="5" fill="#1b1b22"/>' +
  '<ellipse cx="72" cy="153" rx="10" ry="5" fill="#1b1b22"/>' +
  // body: shirt + burgundy waistcoat
  '<ellipse cx="60" cy="98" rx="31" ry="32" fill="#fbf7f0"/>' +
  '<path d="M33 86 Q30 128 60 130 Q90 128 87 86 Q80 74 66 74 L60 104 L54 74 Q40 74 33 86Z" fill="#7a1f35"/>' +
  '<circle cx="60" cy="108" r="1.8" fill="#e7c36b"/><circle cx="60" cy="117" r="1.8" fill="#e7c36b"/>' +
  '<path d="M56 114 Q66 110 76 114" stroke="#e7c36b" stroke-width="1" fill="none"/>' +
  // left arm with wine glass
  '<g class="wm-glass-arm">' +
  '<path d="M33 88 Q20 100 24 112" stroke="#7a1f35" stroke-width="10" stroke-linecap="round" fill="none"/>' +
  '<circle cx="24" cy="113" r="5" fill="#f1c6a2"/>' +
  '<g class="wm-glass"><path d="M15 92 Q16 104 24 106 Q32 104 33 92Z" fill="rgba(255,255,255,.55)" stroke="#9aa3b8" stroke-width="1"/>' +
  '<path d="M17 99 Q18 104 24 105 Q30 104 31 99Z" fill="#8e1330"/>' +
  '<line x1="24" y1="106" x2="24" y2="114" stroke="#9aa3b8" stroke-width="1.4"/>' +
  '<ellipse cx="24" cy="115" rx="5" ry="1.4" fill="#9aa3b8"/></g></g>' +
  // right arm with bottle (raised when speaking)
  '<g class="wm-bottle-arm">' +
  '<path d="M86 88 Q100 96 98 110" stroke="#7a1f35" stroke-width="10" stroke-linecap="round" fill="none"/>' +
  '<circle cx="98" cy="111" r="5" fill="#f1c6a2"/>' +
  '<g transform="rotate(-18 98 108)">' +
  '<rect x="93" y="84" width="11" height="34" rx="4" fill="#1f4d2b"/>' +
  '<rect x="96" y="72" width="5" height="14" rx="2" fill="#1f4d2b"/>' +
  '<rect x="95.5" y="70" width="6" height="7" rx="1.5" fill="#a3192f"/>' +
  '<rect x="94" y="94" width="9" height="12" rx="1" fill="#f3e6c8"/>' +
  '<path d="M95.5 99 h6 M95.5 102 h4" stroke="#7a1f35" stroke-width="1"/>' +
  '<rect x="95" y="86" width="2" height="26" rx="1" fill="rgba(255,255,255,.18)"/></g></g>' +
  // neck + bow tie
  '<rect x="54" y="62" width="12" height="10" fill="#f1c6a2"/>' +
  '<path d="M60 74 L50 69 L50 79Z M60 74 L70 69 L70 79Z" fill="#1d2b5c"/><circle cx="60" cy="74" r="2.6" fill="#1d2b5c"/>' +
  // head
  '<g class="wm-head">' +
  '<circle cx="60" cy="42" r="23" fill="#f4cba8"/>' +
  '<path d="M37 44 Q36 30 42 28 Q40 40 43 48Z M83 44 Q84 30 78 28 Q80 40 77 48Z" fill="#c9c9cf"/>' +
  '<ellipse cx="52" cy="24" rx="7" ry="2.5" fill="rgba(255,255,255,.45)"/>' +
  '<circle cx="37" cy="45" r="4" fill="#efbf9b"/><circle cx="83" cy="45" r="4" fill="#efbf9b"/>' +
  '<path class="wm-eye" d="M48 41 Q52 38 56 41" stroke="#2b2230" stroke-width="2" fill="none" stroke-linecap="round"/>' +
  '<path class="wm-eye" d="M64 41 Q68 38 72 41" stroke="#2b2230" stroke-width="2" fill="none" stroke-linecap="round"/>' +
  '<path d="M47 35 Q52 32 57 34 M63 34 Q68 32 73 35" stroke="#a8a8b0" stroke-width="2" fill="none" stroke-linecap="round"/>' +
  '<circle cx="47" cy="50" r="4.5" fill="#ec9a95" opacity=".55"/><circle cx="73" cy="50" r="4.5" fill="#ec9a95" opacity=".55"/>' +
  '<ellipse cx="60" cy="48" rx="5" ry="4.5" fill="#e9a487"/>' +
  '<path d="M60 53 Q52 52 47 57 Q44 54 46 51 M60 53 Q68 52 73 57 Q76 54 74 51" stroke="#b9b9c2" stroke-width="3" fill="none" stroke-linecap="round"/>' +
  '<path class="wm-mouth" d="M56 58 Q60 61 64 58" stroke="#8a3b3b" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
  '</g></svg>';

  var wrap, bubble, man, busy = false, lineIdx = Math.floor(Math.random() * LINES.length);
  var timer = null, bubbleTimer = null;

  function nextLine() {
    lineIdx = (lineIdx + 1 + Math.floor(Math.random() * (LINES.length - 1))) % LINES.length;
    return LINES[lineIdx];
  }

  function say(text, ms) {
    clearTimeout(bubbleTimer);
    bubble.innerHTML = text;
    // keep bubble on screen: flip to the other side near the right edge
    var r = wrap.getBoundingClientRect();
    wrap.classList.toggle('wm-left', r.left > window.innerWidth - 300);
    wrap.classList.add('wm-talking');
    bubbleTimer = setTimeout(function () { wrap.classList.remove('wm-talking'); }, ms || 4200);
  }

  function place(x, y) {
    wrap.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
  }

  // one trip across the screen, with a pause in the middle to talk
  function trip() {
    if (document.hidden || busy) { schedule(); return; }
    busy = true;
    var W = window.innerWidth, H = window.innerHeight;
    var size = wrap.offsetWidth || 90;
    var fromLeft = Math.random() < 0.5;
    var x0 = fromLeft ? -size - 20 : W + 20;
    var x1 = fromLeft ? W + 20 : -size - 20;
    var yTop = H * 0.18, yBot = Math.max(yTop + 10, H - size * 1.9 - 20);
    var y0 = yTop + Math.random() * (yBot - yTop);
    var y1 = yTop + Math.random() * (yBot - yTop);
    var pauseAt = 0.35 + Math.random() * 0.3;
    var dur = Math.max(9000, W * 11);           // ~11ms per pixel: an unhurried drift
    var start = null, paused = false, pauseUntil = 0, pausedTotal = 0;
    man.classList.toggle('wm-flip', !fromLeft);
    wrap.style.opacity = '1';

    function step(t) {
      if (!start) start = t;
      if (paused) {
        if (t < pauseUntil) { requestAnimationFrame(step); return; }
        paused = false; pausedTotal += 4600;
      }
      var p = Math.min(1, (t - start - pausedTotal) / dur);
      var e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      var x = x0 + (x1 - x0) * e;
      var y = y0 + (y1 - y0) * e + Math.sin(p * Math.PI * 6) * 10;
      place(x, y);
      if (!paused && pauseAt > 0 && p >= pauseAt) {
        pauseAt = -1; paused = true; pauseUntil = t + 4600;
        say(nextLine(), 4400);
      }
      if (p < 1) requestAnimationFrame(step);
      else { busy = false; wrap.style.opacity = '0'; schedule(); }
    }
    requestAnimationFrame(step);
  }

  function schedule(first) {
    clearTimeout(timer);
    var wait = first ? 4000 + Math.random() * 4000 : 18000 + Math.random() * 20000;
    timer = setTimeout(trip, wait);
  }

  function init() {
    wrap = document.createElement('div');
    wrap.id = 'wine-man';
    wrap.innerHTML = '<div class="wm-bubble" role="status" aria-live="polite"></div>' +
      '<button type="button" class="wm-figure" aria-label="The wine connoisseur – click for his opinion">' + SVG + '</button>';
    document.body.appendChild(wrap);
    bubble = wrap.querySelector('.wm-bubble');
    man = wrap.querySelector('.wm-figure');
    man.addEventListener('click', function () { say(nextLine(), 4800); });
    place(-200, window.innerHeight * 0.4);
    schedule(true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
