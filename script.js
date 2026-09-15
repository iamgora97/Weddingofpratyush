/* =========================================
   OPEN INVITATION
========================================= */

const openingScreen =
    document.getElementById("opening-screen");

const mainContent =
    document.getElementById("main-content");

const openInvitation =
    document.getElementById("openInvitation");


openInvitation.addEventListener("click", () => {

    openingScreen.classList.add("hide");

    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");

    document.body.style.overflow = "auto";

    setTimeout(() => {
        document.querySelectorAll(".reveal")
            .forEach(element => {
                element.classList.add("active");
            });
    }, 400);

});


/* Prevent scrolling while opening screen is visible */

document.body.style.overflow = "hidden";


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   COUNTDOWN
========================================= */

/*
   Wedding date:
   25 November 2026

   Midnight local time.
*/

const weddingDate =
    new Date("November 25, 2026 00:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    document.getElementById("days")
        .textContent = String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent = String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent = String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent = String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   CALENDAR
========================================= */

const calendarMonth =
    document.getElementById("calendarMonth");

const calendarDays =
    document.getElementById("calendarDays");

const previousMonth =
    document.getElementById("previousMonth");

const nextMonth =
    document.getElementById("nextMonth");


let currentMonth =
    new Date(2026, 10, 1);


/* Wedding date */

const weddingYear = 2026;
const weddingMonth = 10;
const weddingDay = 25;


function renderCalendar() {

    const year =
        currentMonth.getFullYear();

    const month =
        currentMonth.getMonth();


    const monthName =
        currentMonth.toLocaleString(
            "en-US",
            {
                month: "long"
            }
        );


    calendarMonth.textContent =
        `${monthName} ${year}`;


    calendarDays.innerHTML = "";


    /*
       First day of month
       0 = Sunday
    */

    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /*
       Empty cells
    */

    for (let i = 0; i < firstDay; i++) {

        const empty =
            document.createElement("div");

        empty.classList.add("empty");

        calendarDays.appendChild(empty);

    }


    /*
       Actual days
    */

    for (let day = 1; day <= daysInMonth; day++) {

        const dayElement =
            document.createElement("div");

        dayElement.textContent = day;


        if (
            year === weddingYear &&
            month === weddingMonth &&
            day === weddingDay
        ) {

            dayElement.classList.add(
                "wedding-day"
            );

        }


        calendarDays.appendChild(dayElement);

    }

}


previousMonth.addEventListener(
    "click",
    () => {

        currentMonth.setMonth(
            currentMonth.getMonth() - 1
        );

        renderCalendar();

    }
);


nextMonth.addEventListener(
    "click",
    () => {

        currentMonth.setMonth(
            currentMonth.getMonth() + 1
        );

        renderCalendar();

    }
);


renderCalendar();


/* =========================================
   ADD TO CALENDAR
========================================= */

const calendarButton =
    document.getElementById("calendarButton");


calendarButton.addEventListener(
    "click",
    () => {

        /*
           Google Calendar link
        */

        const title =
            encodeURIComponent(
                "Wedding of Pratyush & Minakshi"
            );


        const details =
            encodeURIComponent(
                "Wedding Ceremony of Pratyush Ghosh and Minakshi Banerjee"
            );


        const location =
            encodeURIComponent(
                "Bengal Taj Guest House, Panchbaga Bypass Road, Bankura, West Bengal 722101"
            );


        /*
           25 Nov 2026
           00:00 → 23:59
        */

        const start =
            "20261125T000000";

        const end =
            "20261126T000000";


        const url =
            `https://calendar.google.com/calendar/render?action=TEMPLATE` +
            `&text=${title}` +
            `&dates=${start}/${end}` +
            `&details=${details}` +
            `&location=${location}`;


        window.open(
            url,
            "_blank",
            "noopener"
        );

    }
);


/* =========================================
   EVENT SCROLL
========================================= */

function scrollToVenue(id) {

    const element =
        document.getElementById(id);

    if (!element) return;


    element.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            openingScreen.classList.add("hide");

            mainContent.classList.remove("hidden");
            mainContent.classList.add("visible");

            document.body.style.overflow = "auto";

        }

    }
);
