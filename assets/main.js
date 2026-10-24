/* Mina Lee — site scripts: bilingual toggle, nav, scroll reveal */
(function () {
  'use strict';

  var STORAGE_KEY = 'ml-lang';
  var html = document.documentElement;

  /* ---------- language ---------- */

  function applyLang(lang) {
    if (lang !== 'en') lang = 'zh';

    html.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');

    var nodes = document.querySelectorAll('[data-zh]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var val = el.getAttribute(lang === 'en' ? 'data-en' : 'data-zh');
      if (val === null) continue;
      if (el.hasAttribute('data-html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    }

    var titles = document.body.dataset;
    if (lang === 'en' && titles.titleEn) document.title = titles.titleEn;
    if (lang === 'zh' && titles.titleZh) document.title = titles.titleZh;

    var btns = document.querySelectorAll('.lang button');
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.toggle('is-active', btns[j].getAttribute('data-lang') === lang);
      btns[j].setAttribute('aria-pressed', btns[j].getAttribute('data-lang') === lang ? 'true' : 'false');
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  var saved = 'zh';
  try { saved = localStorage.getItem(STORAGE_KEY) || 'zh'; } catch (e) {}
  var qs = /[?&]lang=(en|zh)\b/.exec(window.location.search);
  if (qs) saved = qs[1];
  applyLang(saved);

  var langBtns = document.querySelectorAll('.lang button');
  for (var k = 0; k < langBtns.length; k++) {
    langBtns[k].addEventListener('click', function () {
      applyLang(this.getAttribute('data-lang'));
    });
  }

  /* ---------- mobile nav ---------- */

  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      nav.classList.toggle('is-open');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('is-open');
    });
  }

  /* ---------- scroll reveal ---------- */

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    for (var m = 0; m < reveals.length; m++) io.observe(reveals[m]);
  } else {
    for (var n = 0; n < reveals.length; n++) reveals[n].classList.add('is-in');
  }

  /* ---------- current year ---------- */

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
