/* =========================================================
   PRATYUSH & MINAKSHI
   Wedding Website JavaScript
========================================================= */

(() => {

  "use strict";


  /* =======================================================
     ELEMENT HELPER
  ======================================================= */

  const $ = id => document.getElementById(id);


  /* =======================================================
     OPEN INVITATION
  ======================================================= */

  const intro = $("intro");
  const main = $("mainContent");
  const enterBtn = $("enterBtn");


  function openInvitation() {

    if (!intro || !main) return;

    main.classList.remove("hidden");

    document.body.classList.remove("locked");

    intro.classList.add("closing");

    setTimeout(() => {
      startReveal();
    }, 250);

  }


  window.openInvitation = openInvitation;


  if (enterBtn) {
    enterBtn.addEventListener("click", openInvitation);
  }


  /* =======================================================
     MUSIC
  ======================================================= */

  const music = $("weddingMusic");
  const musicBtn = $("musicBtn");


  if (music && musicBtn) {

    musicBtn.addEventListener("click", () => {

      if (music.paused) {

        music.play()
          .then(() => {
            musicBtn.classList.add("playing");
          })
          .catch(() => {
            /*
              Browser may block autoplay/audio until
              another user interaction.
            */
          });

      } else {

        music.pause();

        musicBtn.classList.remove("playing");

      }

    });

  }


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuBtn = $("menuBtn");
  const navLinks = $("navLinks");


  if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

      navLinks.classList.toggle("open");

    });


    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

      });

    });

  }


  /* =======================================================
     COUNTDOWN
     
     WEDDING:
     25 NOVEMBER 2026
     
     The reception date does NOT control the countdown.
  ======================================================= */

  const weddingDate = new Date(
    2026,
    10,
    25,
    0,
    0,
    0
  );


  function updateCountdown() {

    const now = new Date();

    const difference =
      weddingDate.getTime() - now.getTime();


    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;


    if (difference > 0) {

      days = Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );

      hours = Math.floor(
        (difference /
          (1000 * 60 * 60)) % 24
      );

      minutes = Math.floor(
        (difference /
          (1000 * 60)) % 60
      );

      seconds = Math.floor(
        (difference / 1000) % 60
      );

    }


    const daysEl = $("days");
    const hoursEl = $("hours");
    const minutesEl = $("minutes");
    const secondsEl = $("seconds");


    if (daysEl) {
      daysEl.textContent =
        String(days).padStart(2, "0");
    }

    if (hoursEl) {
      hoursEl.textContent =
        String(hours).padStart(2, "0");
    }

    if (minutesEl) {
      minutesEl.textContent =
        String(minutes).padStart(2, "0");
    }

    if (secondsEl) {
      secondsEl.textContent =
        String(seconds).padStart(2, "0");
    }

  }


  updateCountdown();

  setInterval(updateCountdown, 1000);


  /* =======================================================
     ADD TO CALENDAR
     
     Creates one .ics file containing:
     
     25 Nov 2026 - Wedding
     27 Nov 2026 - Reception
  ======================================================= */

  const calendarBtn = $("calendarBtn");


  if (calendarBtn) {

    calendarBtn.addEventListener("click", () => {

      const ics = [

        "BEGIN:VCALENDAR",

        "VERSION:2.0",

        "PRODID:-//Pratyush & Minakshi Wedding//EN",

        "CALSCALE:GREGORIAN",

        "METHOD:PUBLISH",


        /* Wedding */

        "BEGIN:VEVENT",

        "UID:pratyush-minakshi-wedding-2026@invitation",

        "DTSTAMP:20260915T000000Z",

        "DTSTART;VALUE=DATE:20261125",

        "DTEND;VALUE=DATE:20261126",

        "SUMMARY:Pratyush & Minakshi — Wedding",

        "LOCATION:Bengal Taj Guest House, Bankura, West Bengal",

        "DESCRIPTION:Wedding ceremony of Pratyush Ghosh and Minakshi Banerjee at Bengal Taj Guest House, Bankura.",

        "END:VEVENT",


        /* Reception */

        "BEGIN:VEVENT",

        "UID:pratyush-minakshi-reception-2026@invitation",

        "DTSTAMP:20260915T000000Z",

        "DTSTART;VALUE=DATE:20261127",

        "DTEND;VALUE=DATE:20261128",

        "SUMMARY:Pratyush & Minakshi — Reception",

        "LOCATION:Ananya Marriage Hall / Lodge, Katjuridanga, Bankura, West Bengal",

        "DESCRIPTION:Reception celebration of Pratyush Ghosh and Minakshi Banerjee at Ananya Marriage Hall / Lodge.",

        "END:VEVENT",


        "END:VCALENDAR"

      ].join("\r\n");


      const blob = new Blob(
        [ics],
        {
          type:
            "text/calendar;charset=utf-8"
        }
      );


      const url =
        URL.createObjectURL(blob);


      const link =
        document.createElement("a");


      link.href = url;

      link.download =
        "Pratyush-Minakshi-Wedding.ics";


      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);


      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

    });

  }


  /* =======================================================
     EVENT DETAILS
  ======================================================= */

  document
    .querySelectorAll(".details-btn")
    .forEach(button => {

      button.addEventListener("click", () => {

        const card =
          button.closest(".event-card");

        if (!card) return;


        card.classList.toggle("open");


        const plus =
          button.querySelector("span");


        if (plus) {

          plus.textContent =
            card.classList.contains("open")
              ? "−"
              : "+";

        }

      });

    });


  /* =======================================================
     GALLERY LIGHTBOX
     
     Currently the gallery contains placeholders.
     When you add real gallery images later, the same
     lightbox logic can be used.
  ======================================================= */

  const lightbox = $("lightbox");
  const lightboxImg = $("lightboxImg");
  const closeLightbox = $("closeLightbox");


  function closeGallery() {

    if (!lightbox) return;

    lightbox.classList.remove("open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  document
    .querySelectorAll(".gallery-item")
    .forEach(item => {

      item.addEventListener("click", () => {

        const image =
          item.dataset.full;


        /*
          Placeholder gallery items currently don't
          contain images. Therefore, don't open the
          lightbox for them.
        */

        if (!image || !lightboxImg) {
          return;
        }


        lightboxImg.src = image;

        lightbox.classList.add("open");

        lightbox.setAttribute(
          "aria-hidden",
          "false"
        );

      });

    });


  if (closeLightbox) {
    closeLightbox.addEventListener(
      "click",
      closeGallery
    );
  }


  if (lightbox) {

    lightbox.addEventListener(
      "click",
      event => {

        if (event.target === lightbox) {
          closeGallery();
        }

      }
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closeGallery();
      }

    }
  );


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  function startReveal() {

    const elements =
      document.querySelectorAll(".reveal");


    if (
      !("IntersectionObserver" in window)
    ) {

      elements.forEach(element => {
        element.classList.add("visible");
      });

      return;

    }


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold:0.1
        }
      );


    elements.forEach(element => {
      observer.observe(element);
    });

  }


  window.startReveal = startReveal;


  /* =======================================================
     ESCAPE KEY ON INTRO
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        intro &&
        !intro.classList.contains("closing")
      ) {

        openInvitation();

      }

    }
  );


})();
