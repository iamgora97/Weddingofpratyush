(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }

  // This function is intentionally global so the opening screen works even
  // if another optional feature on the page fails to initialize.
  window.openInvitation = function () {
    var opening = $('intro');
    var site = $('mainContent');
    var btn = $('enterBtn');
    if (!opening || !site) return;

    if (btn) btn.disabled = true;
    site.classList.remove('hidden');
    opening.style.opacity = '0';
    opening.style.visibility = 'hidden';
    opening.style.pointerEvents = 'none';
    document.body.classList.remove('locked');

    setTimeout(function () {
      if (opening && opening.parentNode) opening.parentNode.removeChild(opening);
    }, 900);

    var music = $('weddingMusic');
    var musicBtn = $('musicBtn');
    if (music) {
      music.play().then(function () {
        if (musicBtn) musicBtn.classList.add('playing');
      }).catch(function () {});
    }

    if (window.startReveal) window.startReveal();
  };

  document.addEventListener('DOMContentLoaded', function () {
    var opening = $('intro');
    var site = $('mainContent');
    var btn = $('enterBtn');
    var music = $('weddingMusic');
    var musicBtn = $('musicBtn');
    var menuBtn = $('menuBtn');
    var nav = $('navLinks');

    if (btn) btn.addEventListener('click', window.openInvitation);

    if (musicBtn && music) {
      musicBtn.addEventListener('click', function () {
        if (music.paused) {
          music.play().then(function () { musicBtn.classList.add('playing'); }).catch(function () {});
        } else {
          music.pause();
          musicBtn.classList.remove('playing');
        }
      });
    }

    if (menuBtn && nav) {
      menuBtn.addEventListener('click', function () { nav.classList.toggle('open'); });
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { nav.classList.remove('open'); });
      });
    }

    var weddingDate = new Date(2026, 10, 25, 0, 0, 0);
    function updateCountdown() {
      var distance = weddingDate.getTime() - Date.now();
      var values = distance > 0 ? [
        Math.floor(distance / 86400000),
        Math.floor(distance / 3600000) % 24,
        Math.floor(distance / 60000) % 60,
        Math.floor(distance / 1000) % 60
      ] : [0, 0, 0, 0];
      ['days','hours','minutes','seconds'].forEach(function (id, i) {
        var el = $(id); if (el) el.textContent = String(values[i]).padStart(2, '0');
      });
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    var calendarBtn = $('calendarBtn');
    if (calendarBtn) calendarBtn.addEventListener('click', function () {
      var ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Sarbajoya Tapasundar Wedding//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH',
        'BEGIN:VEVENT','UID:sarbajoya-tapasundar-wedding-2026@invitation',
        'DTSTAMP:20260915T000000Z','DTSTART;VALUE=DATE:20261125','DTEND;VALUE=DATE:20261126',
        'SUMMARY:Sarbajoya & Tapasundar — Wedding','LOCATION:Ashirbaad Lodge','DESCRIPTION:Wedding ceremony at Ashirbaad Lodge.','END:VEVENT',
        'BEGIN:VEVENT','UID:sarbajoya-tapasundar-reception-2026@invitation',
        'DTSTAMP:20260915T000000Z','DTSTART;VALUE=DATE:20261126','DTEND;VALUE=DATE:20261127',
        'SUMMARY:Sarbajoya & Tapasundar — Reception','LOCATION:Ashirbaad Lodge','DESCRIPTION:Reception party at Ashirbaad Lodge.','END:VEVENT','END:VCALENDAR'].join('\r\n');
      var url = URL.createObjectURL(new Blob([ics], {type:'text/calendar;charset=utf-8'}));
      var a = document.createElement('a'); a.href = url; a.download = 'Sarbajoya-Tapasundar-Wedding.ics'; a.click();
      setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
    });

    document.querySelectorAll('.details-btn').forEach(function (b) {
      b.addEventListener('click', function () { b.closest('.event-card').classList.toggle('open'); });
    });

    var lightbox = $('lightbox'), lightboxImg = $('lightboxImg'), close = $('closeLightbox');
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        if (lightboxImg) lightboxImg.src = item.dataset.full || item.querySelector('img').src;
        if (lightbox) { lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); }
      });
    });
    if (close) close.addEventListener('click', function () { if(lightbox) lightbox.classList.remove('open'); });
    if (lightbox) lightbox.addEventListener('click', function(e){ if(e.target === lightbox) lightbox.classList.remove('open'); });

    window.startReveal = function () {
      if (window._revealStarted) return;
      window._revealStarted = true;
      if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible');}); return;
      }
      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
      }, {threshold:0.1});
      document.querySelectorAll('.reveal').forEach(function(el){observer.observe(el);});
    };

    // Do not require any other initialization for the opening button.
    if (site && !site.classList.contains('hidden')) window.startReveal();
  });
}());
