/* The wine connoisseur: every so often he strolls across the bottom of the page,
   stops to offer a cheeky tasting note, then wanders off. Click him for another. */
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

  /* Drawn facing right, three-quarter view. Shading comes from gradients lit from the
     upper left; the far leg and far arm are darker to give depth. */
  var SVG = '' +
  '<svg viewBox="0 0 130 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
  '<defs>' +
  '<radialGradient id="wmSkin" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#ffe1c8"/><stop offset=".55" stop-color="#f2c29d"/><stop offset="1" stop-color="#d7976e"/></radialGradient>' +
  '<radialGradient id="wmVest" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#b23a55"/><stop offset=".5" stop-color="#7f1f37"/><stop offset="1" stop-color="#4a0f1f"/></radialGradient>' +
  '<radialGradient id="wmShirt" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd3df"/></radialGradient>' +
  '<linearGradient id="wmLegNear" x1="0" x2="1"><stop offset="0" stop-color="#4a5070"/><stop offset=".45" stop-color="#2f3450"/><stop offset="1" stop-color="#1b1e30"/></linearGradient>' +
  '<linearGradient id="wmLegFar" x1="0" x2="1"><stop offset="0" stop-color="#2e3248"/><stop offset="1" stop-color="#14162a"/></linearGradient>' +
  '<radialGradient id="wmShoe" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#6a4a3a"/><stop offset=".5" stop-color="#3a2419"/><stop offset="1" stop-color="#1a0f0a"/></radialGradient>' +
  '<linearGradient id="wmSleeve" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#bfc4d2"/></linearGradient>' +
  '<linearGradient id="wmSleeveFar" x1="0" x2="1"><stop offset="0" stop-color="#d9dce6"/><stop offset="1" stop-color="#9aa0b3"/></linearGradient>' +
  '<linearGradient id="wmBottle" x1="0" x2="1"><stop offset="0" stop-color="#0f3018"/><stop offset=".3" stop-color="#2f7a43"/><stop offset=".55" stop-color="#1d5a2f"/><stop offset="1" stop-color="#0a2311"/></linearGradient>' +
  '<radialGradient id="wmHair" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="#f2f2f5"/><stop offset="1" stop-color="#a5a6b1"/></radialGradient>' +
  '<filter id="wmBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter>' +
  '</defs>' +

  // ground shadow (pulses with each step)
  '<ellipse class="wm-shadow" cx="64" cy="183" rx="30" ry="5" fill="rgba(8,21,73,.30)" filter="url(#wmBlur)"/>' +

  '<g class="wm-body">' +
  // far leg (behind)
  '<g class="wm-leg wm-leg-far">' +
  '<path d="M52 124 L50 168" stroke="url(#wmLegFar)" stroke-width="13" stroke-linecap="round"/>' +
  '<path d="M43 167 Q44 160 54 161 Q66 162 66 168 Q66 173 54 173 Q43 173 43 167Z" fill="#120a07"/>' +
  '</g>' +
  // far arm with wine glass (behind body)
  '<g class="wm-arm wm-arm-far">' +
  '<path d="M44 92 Q36 108 40 122" stroke="url(#wmSleeveFar)" stroke-width="11" stroke-linecap="round" fill="none"/>' +
  '<circle cx="41" cy="124" r="5.5" fill="#d9a07a"/>' +
  '<g class="wm-glass">' +
  '<path d="M33 104 Q34 117 42 119 Q50 117 51 104Z" fill="rgba(255,255,255,.45)" stroke="#aab2c6" stroke-width="1"/>' +
  '<path d="M35 111 Q36 117 42 118 Q48 117 49 111Z" fill="#8e1330"/>' +
  '<path d="M37 106 Q38 112 40 114" stroke="rgba(255,255,255,.8)" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
  '<line x1="42" y1="119" x2="42" y2="126" stroke="#aab2c6" stroke-width="1.5"/>' +
  '</g></g>' +
  // near leg
  '<g class="wm-leg wm-leg-near">' +
  '<path d="M68 124 L70 168" stroke="url(#wmLegNear)" stroke-width="14" stroke-linecap="round"/>' +
  '<path d="M62 168 Q63 160 73 161 Q88 162 88 169 Q88 175 74 175 Q62 175 62 168Z" fill="url(#wmShoe)"/>' +
  '<ellipse cx="77" cy="164.5" rx="5" ry="1.6" fill="rgba(255,255,255,.35)"/>' +
  '</g>' +
  // torso: shirt belly with waistcoat over it
  '<ellipse cx="60" cy="104" rx="32" ry="30" fill="url(#wmShirt)"/>' +
  '<path d="M30 94 Q27 134 60 136 Q92 134 90 94 Q84 80 70 79 L62 112 L55 79 Q38 80 30 94Z" fill="url(#wmVest)"/>' +
  '<path d="M33 100 Q40 90 50 88" stroke="rgba(255,255,255,.18)" stroke-width="4" fill="none" stroke-linecap="round"/>' +
  '<circle cx="62" cy="116" r="2" fill="#f0cf7a"/><circle cx="62" cy="125" r="2" fill="#f0cf7a"/>' +
  '<path d="M62 121 Q72 116 82 120" stroke="#f0cf7a" stroke-width="1.2" fill="none"/>' +
  '<circle cx="82" cy="121" r="2.2" fill="#f0cf7a"/>' +
  // neck + bow tie
  '<path d="M53 66 h15 v13 h-15z" fill="url(#wmSkin)"/>' +
  '<path d="M61 80 L50 74 L50 86Z M61 80 L72 74 L72 86Z" fill="#1d2b5c"/><circle cx="61" cy="80" r="3" fill="#2c3f80"/>' +
  // head (three-quarter, facing right)
  '<g class="wm-head">' +
  '<ellipse cx="62" cy="44" rx="23" ry="24" fill="url(#wmSkin)"/>' +
  '<path d="M39 48 Q37 32 44 28 Q42 42 46 54Z" fill="url(#wmHair)"/>' +
  '<ellipse cx="41" cy="47" rx="4.5" ry="6" fill="#e3a982"/>' +
  '<ellipse cx="54" cy="27" rx="9" ry="3.5" fill="rgba(255,255,255,.55)"/>' +
  '<path class="wm-eye" d="M58 42 Q62 39 66 42" stroke="#2b2230" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
  '<path class="wm-eye" d="M72 42 Q75.5 39.5 79 42" stroke="#2b2230" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
  '<path d="M57 36 Q62 33 67 35 M71 35 Q75 33 80 36" stroke="#b8b8c2" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
  '<circle cx="58" cy="52" r="5" fill="#ee8e8a" opacity=".5"/><circle cx="80" cy="51" r="4" fill="#ee8e8a" opacity=".5"/>' +
  '<ellipse cx="74" cy="49" rx="5.5" ry="5" fill="#e79a7c"/><ellipse cx="72.5" cy="47.5" rx="1.8" ry="1.3" fill="rgba(255,255,255,.6)"/>' +
  '<path d="M73 55 Q64 54 58 59 Q55 56 57 53 M73 55 Q81 54 85 59 Q88 56 86 53" stroke="url(#wmHair)" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
  '<path class="wm-mouth" d="M69 60 Q73 63 77 60" stroke="#8a3b3b" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
  '</g>' +
  // near arm holding the bottle
  '<g class="wm-arm wm-arm-near">' +
  '<path d="M82 92 Q92 108 88 122" stroke="url(#wmSleeve)" stroke-width="12" stroke-linecap="round" fill="none"/>' +
  '<circle cx="88" cy="124" r="6" fill="url(#wmSkin)"/>' +
  '<g transform="rotate(-14 88 121)">' +
  '<rect x="82" y="92" width="13" height="38" rx="5" fill="url(#wmBottle)"/>' +
  '<rect x="85.5" y="78" width="6" height="16" rx="2.5" fill="url(#wmBottle)"/>' +
  '<rect x="85" y="75" width="7" height="8" rx="2" fill="#a3192f"/>' +
  '<rect x="83.5" y="104" width="10" height="13" rx="1.5" fill="#f3e6c8"/>' +
  '<path d="M85.5 109 h6 M85.5 112 h4" stroke="#7a1f35" stroke-width="1"/>' +
  '<rect x="85" y="94" width="2.2" height="32" rx="1.1" fill="rgba(255,255,255,.35)"/>' +
  '</g></g>' +
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
    var r = wrap.getBoundingClientRect();
    wrap.classList.toggle('wm-left', r.left > window.innerWidth - 300);
    wrap.classList.add('wm-talking');
    bubbleTimer = setTimeout(function () { wrap.classList.remove('wm-talking'); }, ms || 4200);
  }

  function place(x, y) {
    wrap.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
  }

  // one stroll along the bottom of the screen, stopping part-way to talk
  function trip() {
    if (document.hidden || busy) { schedule(); return; }
    busy = true;
    var W = window.innerWidth, H = window.innerHeight;
    var w = wrap.offsetWidth || 110, h = wrap.offsetHeight || 160;
    var fromLeft = Math.random() < 0.5;
    var x0 = fromLeft ? -w - 10 : W + 10;
    var x1 = fromLeft ? W + 10 : -w - 10;
    var y = H - h - 4;
    var speed = W < 768 ? 0.06 : 0.085;      // px per ms – a leisurely stroll
    var dist = Math.abs(x1 - x0);
    var dur = dist / speed;
    var stopAt = 0.3 + Math.random() * 0.35;  // where along the walk he stops
    var TALK = 4800;
    var start = null, stopped = false, resumeAt = 0, pausedTotal = 0, done = false;

    man.classList.toggle('wm-flip', !fromLeft);
    wrap.style.clipPath = '';
    wrap.classList.add('wm-walking');
    wrap.style.opacity = '1';

    function step(t) {
      if (!start) start = t;
      if (stopped) {
        if (t < resumeAt) { requestAnimationFrame(step); return; }
        stopped = false; pausedTotal += TALK;
        wrap.classList.add('wm-walking');
      }
      var p = Math.min(1, (t - start - pausedTotal) / dur);
      place(x0 + (x1 - x0) * p, y);
      if (!done && p >= stopAt) {
        done = true; stopped = true; resumeAt = t + TALK;
        wrap.classList.remove('wm-walking');
        say(nextLine(), TALK - 300);
      }
      if (p < 1) requestAnimationFrame(step);
      else { busy = false; wrap.classList.remove('wm-walking'); wrap.style.opacity = '0'; schedule(); }
    }
    requestAnimationFrame(step);
  }

  /* ---------- peeking out from behind a photo ---------- */
  // photos on screen with room beside them for him to hide behind
  function findHidingSpot() {
    var W = window.innerWidth, H = window.innerHeight;
    var w = wrap.offsetWidth || 110, h = wrap.offsetHeight || 160;
    var spots = [];
    document.querySelectorAll('img').forEach(function (img) {
      if (img.closest('header, footer, [data-elementor-type="header"], [data-elementor-type="footer"], #wine-man, .oc-popup')) return;
      var r = img.getBoundingClientRect();
      if (r.width < 160 || r.height < h * 0.7) return;
      if (r.top < 60 || r.bottom > H - 10) return;          // whole photo on screen
      var room = Math.min(260, W * 0.4);                // space for him and his speech bubble
      if (r.left >= room) spots.push({ img: img, side: 'left' });
      if (W - r.right >= room) spots.push({ img: img, side: 'right' });
    });
    return spots.length ? spots[Math.floor(Math.random() * spots.length)] : null;
  }

  function peek(spot) {
    busy = true;
    var w = wrap.offsetWidth || 110, h = wrap.offsetHeight || 160;
    var maxOut = w * 0.78;                      // how much of him leans out at most
    var OUT = 700, HOLD = 4800, BACK = 700;
    var start = null, said = false;
    var left = spot.side === 'left';
    man.classList.toggle('wm-flip', left);        // face away from the photo
    wrap.classList.remove('wm-walking');
    wrap.classList.add('wm-peeking');
    wrap.classList.toggle('wm-left', left);       // bubble opens away from the photo

    function frame(t) {
      if (!start) start = t;
      var e = t - start, out;
      if (e < OUT) out = easeOut(e / OUT);
      else if (e < OUT + HOLD) out = 1;
      else out = 1 - easeIn(Math.min(1, (e - OUT - HOLD) / BACK));
      var r = spot.img.getBoundingClientRect();      // follow the photo if the page scrolls
      var y = Math.min(r.bottom - h, window.innerHeight - h - 4);
      var v = 6 + (maxOut - 6) * out;                // visible width
      var x, clip;
      if (left) {
        x = r.left - v;
        clip = 'inset(-400px ' + Math.max(0, w - v) + 'px -60px -400px)';
      } else {
        x = r.right - (w - v);
        clip = 'inset(-400px -400px -60px ' + Math.max(0, w - v) + 'px)';
      }
      wrap.style.clipPath = clip;
      place(x, y);
      if (e > 60) wrap.style.opacity = '1';
      if (!said && e >= OUT) {
        said = true;
        bubble.innerHTML = nextLine();
        wrap.classList.add('wm-talking');
        clearTimeout(bubbleTimer);
        bubbleTimer = setTimeout(function () { wrap.classList.remove('wm-talking'); }, HOLD - 250);
      }
      if (e < OUT + HOLD + BACK) requestAnimationFrame(frame);
      else {
        wrap.style.opacity = '0';
        setTimeout(function () {
          wrap.style.clipPath = '';
          wrap.classList.remove('wm-peeking', 'wm-left');
          busy = false;
          schedule();
        }, 500);
      }
    }
    requestAnimationFrame(frame);
  }
  function easeOut(p) { return 1 - Math.pow(1 - p, 3); }
  function easeIn(p) { return p * p * p; }

  // each appearance: sometimes a stroll, sometimes a sneaky peek
  function appear() {
    if (document.hidden || busy) { schedule(); return; }
    var spot = Math.random() < 0.45 ? findHidingSpot() : null;
    if (spot) peek(spot); else trip();
  }

  function schedule(first) {
    clearTimeout(timer);
    var wait = first ? 3000 + Math.random() * 4000 : 15000 + Math.random() * 17000;
    timer = setTimeout(appear, wait);
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
    place(-300, window.innerHeight - 200);
    window.addEventListener('resize', function () {
      if (!busy) place(-300, window.innerHeight - 200);
    });
    if (location.hash === '#winetest') {          // testing only
      window.__wm = { trip: trip, peek: function () { var s = findHidingSpot(); if (s) peek(s); return !!s; } };
      return;
    }
    schedule(true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
