(function () {

  "use strict";


  /* =====================================================
     HELPER
  ===================================================== */

  function $(id) {
    return document.getElementById(id);
  }


  /* =====================================================
     OPEN INVITATION
     
     This is deliberately global and independent from
     all other website functions.
  ===================================================== */

  window.openInvitation = function () {

    const intro = $("intro");
    const main = $("mainContent");
    const button = $("enterBtn");

    if (!intro || !main) {
      return;
    }

    if (button) {
      button.disabled = true;
    }

    /*
      Show website first.
      Nothing else is required for this to work.
    */

    main.classList.remove("hidden");

    document.body.classList.remove("locked");

    intro.classList.add("closing");

    /*
      Start the page reveal.
    */

    if (typeof window.startReveal === "function") {
      window.startReveal();
    }

    /*
      Try to start music.
      Browser may block autoplay, which is completely fine.
    */

    const music = $("weddingMusic");
    const musicButton = $("musicBtn");

    if (music) {

      music.play()
        .then(function () {

          if (musicButton) {
            musicButton.classList.add("playing");
          }

        })
        .catch(function () {

          /*
            Autoplay blocked by browser.
            User can use the music button.
          */

        });

    }

    /*
      Remove opening screen after animation.
    */

    setTimeout(function () {

      if (intro && intro.parentNode) {
        intro.parentNode.removeChild(intro);
      }

    }, 850);

  };


  /* =====================================================
     DOM READY
  ===================================================== */

  document.addEventListener("DOMContentLoaded", function () {


    /* ===================================================
       ELEMENTS
    =================================================== */

    const music = $("weddingMusic");
    const musicButton = $("musicBtn");

    const menuButton = $("menuBtn");
    const nav = $("navLinks");

    const calendarButton = $("calendarBtn");


    /* ===================================================
       OPEN BUTTON
       
       Also attach a listener in addition to inline onclick.
       This provides extra compatibility.
    =================================================== */

    const enterButton = $("enterBtn");

    if (enterButton) {

      enterButton.addEventListener(
        "click",
        window.openInvitation
      );

    }


    /* ===================================================
       MUSIC
    =================================================== */

    if (musicButton && music) {

      musicButton.addEventListener(
        "click",
        function () {

          if (music.paused) {

            music.play()
              .then(function () {

                musicButton.classList.add("playing");

              })
              .catch(function () {});

          } else {

            music.pause();

            musicButton.classList.remove("playing");

          }

        }
      );

    }


    /* ===================================================
       MOBILE MENU
    =================================================== */

    if (menuButton && nav) {

      menuButton.addEventListener(
        "click",
        function () {

          nav.classList.toggle("open");

        }
      );


      nav.querySelectorAll("a").forEach(
        function (link) {

          link.addEventListener(
            "click",
            function () {

              nav.classList.remove("open");

            }
          );

        }
      );

    }


    /* ===================================================
       COUNTDOWN

       Wedding date:
       25 November 2026

       Midnight local time.
    =================================================== */

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
        weddingDate.getTime() -
        now.getTime();


      let days = 0;
      let hours = 0;
      let minutes = 0;
      let seconds = 0;


      if (difference > 0) {

        days = Math.floor(
          difference / (1000 * 60 * 60 * 24)
        );

        hours = Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        );

        minutes = Math.floor(
          (difference / (1000 * 60)) % 60
        );

        seconds = Math.floor(
          (difference / 1000) % 60
        );

      }


      const daysElement = $("days");
      const hoursElement = $("hours");
      const minutesElement = $("minutes");
      const secondsElement = $("seconds");


      if (daysElement) {
        daysElement.textContent =
          String(days).padStart(2, "0");
      }

      if (hoursElement) {
        hoursElement.textContent =
          String(hours).padStart(2, "0");
      }

      if (minutesElement) {
        minutesElement.textContent =
          String(minutes).padStart(2, "0");
      }

      if (secondsElement) {
        secondsElement.textContent =
          String(seconds).padStart(2, "0");
      }

    }


    updateCountdown();

    setInterval(
      updateCountdown,
      1000
    );


    /* ===================================================
       ADD TO CALENDAR

       Wedding:
       25 November 2026

       Reception:
       27 November 2026
    =================================================== */

    if (calendarButton) {

      calendarButton.addEventListener(
        "click",
        function () {

          const ics = [

            "BEGIN:VCALENDAR",
            "VERSION:2.0",

            "PRODID:-//Pratyush Minakshi Wedding//EN",

            "CALSCALE:GREGORIAN",

            "METHOD:PUBLISH",


            /* Wedding */

            "BEGIN:VEVENT",

            "UID:pratyush-minakshi-wedding-2026@invitation",

            "DTSTAMP:20260915T000000Z",

            "DTSTART;VALUE=DATE:20261125",

            "DTEND;VALUE=DATE:20261127",

            "SUMMARY:Pratyush & Minakshi — Wedding",

            "LOCATION:Bengal Taj Guest House, 63X4+78M, Panchbaga Bypass Road, Bankura, West Bengal 722101",

            "DESCRIPTION:Wedding ceremony of Pratyush Ghosh and Minakshi Banerjee and Pratyush Ghosh at Bengal Taj Guest House.",

            "END:VEVENT",


            /* Reception */

            "BEGIN:VEVENT",

            "UID:pratyush-minakshi-reception-2026@invitation",

            "DTSTAMP:20260915T000000Z",

            "DTSTART;VALUE=DATE:20261127",

            "DTEND;VALUE=DATE:20261127",

            "SUMMARY:Pratyush & Minakshi — Reception",

            "LOCATION:Ananya Marriage Hall / Lodge, 274/2/A/1, Katjuridanga, Bankura, West Bengal 722102",

            "DESCRIPTION:Reception party of Pratyush Ghosh and Minakshi Banerjee and Pratyush Ghosh at Ananya Marriage Hall / Lodge.",

            "END:VEVENT",


            "END:VCALENDAR"

          ].join("\r\n");


          const blob =
            new Blob(
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


          setTimeout(
            function () {

              URL.revokeObjectURL(url);

            },
            1000
          );

        }
      );

    }


    /* ===================================================
       EVENT DETAILS
    =================================================== */

    document
      .querySelectorAll(".details-btn")
      .forEach(
        function (button) {

          button.addEventListener(
            "click",
            function () {

              const card =
                button.closest(".event-card");

              if (!card) {
                return;
              }

              card.classList.toggle("open");

            }
          );

        }
      );


    /* ===================================================
       GALLERY LIGHTBOX
    =================================================== */

    const lightbox = $("lightbox");
    const lightboxImage = $("lightboxImg");
    const closeLightbox = $("closeLightbox");


    document
      .querySelectorAll(".gallery-item")
      .forEach(
        function (item) {

          item.addEventListener(
            "click",
            function () {

              const image =
                item.dataset.full ||
                item.querySelector("img").src;


              if (lightboxImage) {
                lightboxImage.src = image;
              }


              if (lightbox) {

                lightbox.classList.add("open");

                lightbox.setAttribute(
                  "aria-hidden",
                  "false"
                );

              }

            }
          );

        }
      );


    function closeGallery() {

      if (!lightbox) {
        return;
      }

      lightbox.classList.remove("open");

      lightbox.setAttribute(
        "aria-hidden",
        "true"
      );

    }


    if (closeLightbox) {

      closeLightbox.addEventListener(
        "click",
        closeGallery
      );

    }


    if (lightbox) {

      lightbox.addEventListener(
        "click",
        function (event) {

          if (event.target === lightbox) {
            closeGallery();
          }

        }
      );

    }


    document.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "Escape") {
          closeGallery();
        }

      }
    );


    /* ===================================================
       SCROLL REVEAL
    =================================================== */

    window.startReveal = function () {

      if (window._revealStarted) {
        return;
      }

      window._revealStarted = true;


      const elements =
        document.querySelectorAll(".reveal");


      /*
        Fallback for older browsers.
      */

      if (
        !("IntersectionObserver" in window)
      ) {

        elements.forEach(
          function (element) {

            element.classList.add("visible");

          }
        );

        return;
      }


      const observer =
        new IntersectionObserver(
          function (entries) {

            entries.forEach(
              function (entry) {

                if (
                  entry.isIntersecting
                ) {

                  entry.target.classList.add(
                    "visible"
                  );

                  observer.unobserve(
                    entry.target
                  );

                }

              }
            );

          },
          {
            threshold: 0.1
          }
        );


      elements.forEach(
        function (element) {

          observer.observe(element);

        }
      );

    };


    /*
      If website somehow loads without intro,
      still enable reveal.
    */

    const main =
      $("mainContent");

    if (
      main &&
      !main.classList.contains("hidden")
    ) {

      window.startReveal();

    }

  });

})();
