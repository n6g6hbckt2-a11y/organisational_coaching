/* Organisational Coaching – static replacement for the WordPress/Elementor front-end scripts.
   Handles: entrance animations, header menu (desktop + burger), popups, clickable columns,
   toggles, share buttons and the contact forms. No dependencies. */
(function () {
  'use strict';

  function settingsOf(el) {
    try { return JSON.parse(el.getAttribute('data-settings') || '{}'); } catch (e) { return {}; }
  }
  function device() {
    var w = window.innerWidth;
    return w <= 767 ? 'mobile' : (w <= 1024 ? 'tablet' : 'desktop');
  }

  /* ---------- Entrance animations ---------- */
  function initAnimations() {
    var els = document.querySelectorAll('.elementor-invisible');
    var dev = device();
    function pick(s, base) {
      var keys = dev === 'mobile' ? [base + '_mobile', base + '_tablet', base]
        : dev === 'tablet' ? [base + '_tablet', base] : [base];
      for (var i = 0; i < keys.length; i++) if (s[keys[i]]) return s[keys[i]];
      return null;
    }
    function reveal(el) {
      var s = settingsOf(el);
      var name = pick(s, '_animation') || pick(s, 'animation');
      var delay = parseInt(s._animation_delay || s.animation_delay || 0, 10) || 0;
      setTimeout(function () {
        el.classList.remove('elementor-invisible');
        if (name && name !== 'none') el.classList.add('animated', name);
      }, delay);
    }
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.remove('elementor-invisible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { io.unobserve(en.target); reveal(en.target); }
      });
    }, { rootMargin: '0px 0px -5% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Header menu ---------- */
  function initMenus() {
    document.querySelectorAll('.elementor-widget-nav-menu').forEach(function (widget) {
      var toggle = widget.querySelector('.elementor-menu-toggle');
      var dropdown = widget.querySelector('nav.elementor-nav-menu--dropdown');
      if (!toggle || !dropdown) return;

      function stretch() {
        dropdown.style.top = (toggle.offsetTop + toggle.offsetHeight) + 'px';
        if (!widget.classList.contains('elementor-nav-menu--stretch')) return;
        dropdown.style.width = document.documentElement.clientWidth + 'px';
        dropdown.style.left = '0px';
        var left = dropdown.getBoundingClientRect().left;
        dropdown.style.left = (-left) + 'px';
      }
      function setHeight() {
        dropdown.style.setProperty('--menu-height', '1000vmax');
      }
      function setOpen(open) {
        toggle.classList.toggle('elementor-active', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        dropdown.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (open) { stretch(); setHeight(); }
      }
      toggle.addEventListener('click', function () {
        setOpen(!toggle.classList.contains('elementor-active'));
      });
      toggle.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); }
      });
      window.addEventListener('resize', function () {
        if (toggle.classList.contains('elementor-active')) { stretch(); setHeight(); }
      });

      // Sub-menus inside the burger dropdown: first tap opens, second tap follows the link
      dropdown.querySelectorAll('li.menu-item-has-children > a').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var li = a.parentElement;
          var arrowClicked = e.target.closest && e.target.closest('.sub-arrow');
          if (!li.classList.contains('oc-open') || arrowClicked) {
            e.preventDefault();
            li.classList.toggle('oc-open');
            a.setAttribute('aria-expanded', li.classList.contains('oc-open') ? 'true' : 'false');
            setHeight();
          }
        });
      });
    });

    // Desktop menu: short close delay (as the original menu had) so the drop-down
    // doesn't vanish if the cursor briefly leaves it
    document.querySelectorAll('.elementor-nav-menu--main .elementor-nav-menu > li.menu-item-has-children').forEach(function (li) {
      var a = li.querySelector(':scope > a');
      a.setAttribute('aria-haspopup', 'true');
      a.classList.add('has-submenu');
      var timer = null;
      li.addEventListener('mouseenter', function () {
        clearTimeout(timer);
        li.parentElement.querySelectorAll(':scope > li.oc-hover').forEach(function (o) { if (o !== li) o.classList.remove('oc-hover'); });
        li.classList.add('oc-hover');
      });
      li.addEventListener('mouseleave', function () {
        timer = setTimeout(function () { li.classList.remove('oc-hover'); }, 400);
      });
    });
  }

  /* ---------- Popups ---------- */
  var popups = {};
  function buildPopup(id) {
    if (popups[id]) return popups[id];
    var src = document.querySelector('[data-elementor-type="popup"][data-elementor-id="' + id + '"]');
    if (!src) return null;
    var wrap = document.createElement('div');
    wrap.id = 'elementor-popup-modal-' + id;
    wrap.className = 'oc-popup elementor-popup-modal dialog-widget dialog-lightbox-widget dialog-type-buttons dialog-type-lightbox';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.hidden = true;
    var content = document.createElement('div');
    content.className = 'dialog-widget-content dialog-lightbox-widget-content';
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'dialog-close-button dialog-lightbox-close-button';
    close.setAttribute('aria-label', 'Close');
    close.innerHTML = '<i class="eicon-close" aria-hidden="true"></i>';
    var msg = document.createElement('div');
    msg.className = 'dialog-message dialog-lightbox-message';
    src.classList.add('oc-in-popup');
    msg.appendChild(src);
    content.appendChild(close);
    content.appendChild(msg);
    wrap.appendChild(content);
    document.body.appendChild(wrap);
    close.addEventListener('click', function () { closePopup(wrap); });
    wrap.addEventListener('click', function (e) { if (e.target === wrap) closePopup(wrap); });
    popups[id] = wrap;
    return wrap;
  }
  var lastFocus = null;
  function openPopup(id) {
    var p = buildPopup(id);
    if (!p) return;
    lastFocus = document.activeElement;
    p.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    var f = p.querySelector('input, textarea, button');
    if (f) setTimeout(function () { f.focus(); }, 50);
  }
  function closePopup(p) {
    p.hidden = true;
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function parseAction(href) {
    var m = decodeURIComponent(href).match(/#elementor-action:action=([^&]+)(?:&settings=(.+))?/);
    if (!m) return null;
    var settings = {};
    try { settings = JSON.parse(atob(m[2] || '')); } catch (e) { }
    return { action: m[1], settings: settings };
  }
  function initPopups() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href*="elementor-action"]');
      if (!a) return;
      var act = parseAction(a.getAttribute('href'));
      if (!act) return;
      e.preventDefault();
      if (act.action === 'popup:open' && act.settings.id) openPopup(act.settings.id);
      if (act.action === 'popup:close') {
        var p = a.closest('.oc-popup');
        if (p) closePopup(p);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.oc-popup:not([hidden])').forEach(closePopup);
    });
  }

  /* ---------- Clickable columns ---------- */
  function initClickable() {
    document.addEventListener('click', function (e) {
      var col = e.target.closest && e.target.closest('[data-column-clickable]');
      if (!col || e.target.closest('a, button, input, textarea')) return;
      var url = col.getAttribute('data-column-clickable');
      if (!url) return;
      if (col.getAttribute('data-column-clickable-blank') === '_blank') window.open(url, '_blank', 'noopener');
      else window.location.href = url;
    });
  }

  /* ---------- Toggle widget ---------- */
  function initToggles() {
    document.querySelectorAll('.elementor-toggle .elementor-tab-title').forEach(function (t) {
      t.addEventListener('click', function () {
        var open = !t.classList.contains('elementor-active');
        t.classList.toggle('elementor-active', open);
        t.setAttribute('aria-expanded', open ? 'true' : 'false');
        var c = document.getElementById(t.getAttribute('aria-controls'));
        if (c) c.classList.toggle('elementor-active', open);
      });
      var a = t.querySelector('.elementor-toggle-title');
      if (a) a.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.click(); }
      });
    });
  }

  /* ---------- Share buttons ---------- */
  function initShare() {
    var canon = document.querySelector('link[rel="canonical"]');
    var url = encodeURIComponent(canon ? canon.href : location.href);
    var title = encodeURIComponent(document.title);
    var map = {
      facebook: 'https://www.facebook.com/sharer.php?u=' + url,
      'x-twitter': 'https://x.com/intent/tweet?text=' + title + '&url=' + url,
      twitter: 'https://x.com/intent/tweet?text=' + title + '&url=' + url,
      linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title,
      whatsapp: 'https://api.whatsapp.com/send?text=' + title + '%20' + url,
      email: 'mailto:?subject=' + title + '&body=' + url,
      pinterest: 'https://www.pinterest.com/pin/create/button/?url=' + url,
      reddit: 'https://reddit.com/submit?url=' + url + '&title=' + title,
      telegram: 'https://telegram.me/share/url?url=' + url + '&text=' + title
    };
    document.querySelectorAll('.elementor-share-btn').forEach(function (btn) {
      var m = btn.className.match(/elementor-share-btn_([\w-]+)/);
      if (!m) return;
      function go() {
        if (m[1] === 'print') { window.print(); return; }
        var href = map[m[1]];
        if (!href) return;
        if (m[1] === 'email') location.href = href;
        else window.open(href, '_blank', 'noopener,width=600,height=500');
      }
      btn.addEventListener('click', go);
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    });
  }

  /* ---------- Forms (sent via FormSubmit) ---------- */
  function initForms() {
    document.querySelectorAll('form.elementor-form[action*="formsubmit.co/"]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        if (!window.fetch || !window.FormData) return; // fall back to normal post
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        var old = form.querySelector('.oc-form-note');
        if (old) old.remove();
        if (btn) btn.disabled = true;
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        data._url = location.href;
        var ajax = form.getAttribute('action').replace('formsubmit.co/', 'formsubmit.co/ajax/');
        fetch(ajax, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        }).then(function (r) { return r.json(); }).then(function (res) {
          var ok = res && (res.success === true || res.success === 'true');
          note(ok ? 'Thank you – your message has been sent. We will be in touch soon.'
            : 'Sorry, something went wrong. Please email connect@organisational-coaching.com.', ok);
          if (ok) form.reset();
        }).catch(function () {
          note('Sorry, something went wrong. Please email connect@organisational-coaching.com.', false);
        }).then(function () { if (btn) btn.disabled = false; });
        function note(text, ok) {
          var d = document.createElement('div');
          d.className = 'oc-form-note elementor-message ' + (ok ? 'elementor-message-success' : 'elementor-message-danger');
          d.setAttribute('role', 'alert');
          d.textContent = text;
          form.appendChild(d);
        }
      });
    });
  }

  function init() {
    initAnimations();
    initMenus();
    initPopups();
    initClickable();
    initToggles();
    initShare();
    initForms();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
