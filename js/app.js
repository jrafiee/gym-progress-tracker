/*
   کاتالوگ + برنامه‌ی نهایی: پیش‌فرض‌های
   داخل کد به‌علاوه‌ی هر برنامه‌ای که کاربر
   از تنظیمات آپلود کرده است.
*/

let workoutPrograms =
    buildWorkoutPrograms(
        getEffectiveCatalog(),
        getEffectiveProgramsRaw()
    );


/*
   ماه جاری = آخرین (جدیدترین) ماهی که در
   برنامه وجود دارد؛ ماه‌های قبلی فقط برای
   مشاهده هستند.
*/

function getLatestMonthKey() {

    return Object.keys(workoutPrograms)
        .sort(
            (a, b) =>
                parseInt(a.replace(/\D/g, ""), 10) -
                parseInt(b.replace(/\D/g, ""), 10)
        )
        .pop();

}


let currentMonth = getLatestMonthKey();

let viewingMonth = currentMonth;

let currentSession = 1;

let keepSelectedWeek = false;


/* -------------------------
عناصر صفحه
------------------------- */

const workoutDate =
    document.getElementById(
        "workoutDate"
    );

const persianWorkoutDate =
    document.getElementById(
        "persianWorkoutDate"
    );

const workoutDateBtn =
    document.getElementById(
        "workoutDateBtn"
    );

const weekNumber =
    document.getElementById(
        "weekNumber"
    );

const exerciseList =
    document.getElementById(
        "exerciseList"
    );

const sessionTitle =
    document.getElementById(
        "sessionTitle"
    );

const sessionButtons =
    document.getElementById(
        "sessionButtons"
    );

const emptyProgramState =
    document.getElementById(
        "emptyProgramState"
    );

const programContent =
    document.getElementById(
        "programContent"
    );

const openSettingsBtn =
    document.getElementById(
        "openSettingsBtn"
    );

const settingsPage =
    document.getElementById(
        "settingsPage"
    );

const closeSettingsBtn =
    document.getElementById(
        "closeSettingsBtn"
    );


/* =========================
صفحه‌ی تنظیمات (تمام‌صفحه)
========================= */

function openSettingsPage() {

    if (!settingsPage) {

        return;

    }

    settingsPage.style.display =
        "";

    document.addEventListener(
        "keydown",
        closeSettingsWithEscape
    );

}


function closeSettingsPage() {

    if (!settingsPage) {

        return;

    }

    settingsPage.style.display =
        "none";

    document.removeEventListener(
        "keydown",
        closeSettingsWithEscape
    );

}


function closeSettingsWithEscape(
    event
) {

    if (event.key === "Escape") {

        closeSettingsPage();

    }

}


if (openSettingsBtn) {

    openSettingsBtn.addEventListener(
        "click",
        openSettingsPage
    );

}


if (closeSettingsBtn) {

    closeSettingsBtn.addEventListener(
        "click",
        closeSettingsPage
    );

}

const totalVolume =
    document.getElementById(
        "totalVolume"
    );

const volumeChange =
    document.getElementById(
        "volumeChange"
    );

const themeToggleBtn =
    document.getElementById(
        "themeToggleBtn"
    );

const finishWorkoutBtn =
    document.getElementById(
        "finishWorkoutBtn"
    );


/* -------------------------
تاریخ امروز
------------------------- */

function getToday() {

    const now =
        new Date();

    const year =
        now.getFullYear();

    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );

    return `${year}-${month}-${day}`;

}


/* -------------------------
تبدیل تاریخ میلادی ↔ شمسی
(الگوریتم استاندارد jalaali، برای
ساخت شبکه‌ی تقویم سفارشی — تست‌شده
روی هزاران روز در برابر Intl خودِ مرورگر)
------------------------- */

function jalaliDiv(
    a,
    b
) {

    return ~~(a / b);

}


function jalaliMod(
    a,
    b
) {

    return a - ~~(a / b) * b;

}


function jalCal(
    jy
) {

    const breaks = [
        -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181,
        1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
    ];

    const bl =
        breaks.length;

    const gy =
        jy + 621;

    let leapJ = -14,
        jp = breaks[0],
        jm,
        jump,
        leap,
        n,
        i;


    if (
        jy < jp ||
        jy >= breaks[bl - 1]
    ) {

        throw new Error(
            "Invalid Jalali year " + jy
        );

    }


    for (i = 1; i < bl; i += 1) {

        jm = breaks[i];

        jump = jm - jp;

        if (jy < jm) {

            break;

        }

        leapJ =
            leapJ +
            jalaliDiv(jump, 33) * 8 +
            jalaliDiv(jalaliMod(jump, 33), 4);

        jp = jm;

    }

    n = jy - jp;

    leapJ =
        leapJ +
        jalaliDiv(n, 33) * 8 +
        jalaliDiv(jalaliMod(n, 33) + 3, 4);

    if (
        jalaliMod(jump, 33) === 4 &&
        jump - n === 4
    ) {

        leapJ += 1;

    }

    const leapG =
        jalaliDiv(gy, 4) -
        jalaliDiv((jalaliDiv(gy, 100) + 1) * 3, 4) -
        150;

    const march =
        20 + leapJ - leapG;

    if (jump - n < 6) {

        n = n - jump + jalaliDiv(jump, 33) * 33;

    }

    leap =
        jalaliMod(
            jalaliMod(n + 1, 33) - 1,
            4
        );

    if (leap === -1) {

        leap = 4;

    }


    return {
        leap: leap,
        gy: gy,
        march: march
    };

}


function isLeapJalaliYear(
    jy
) {

    return jalCal(jy).leap === 0;

}


function jalaliMonthLength(
    jy,
    jm
) {

    if (jm <= 6) {

        return 31;

    }

    if (jm <= 11) {

        return 30;

    }

    return isLeapJalaliYear(jy)
        ? 30
        : 29;

}


function g2d(
    gy,
    gm,
    gd
) {

    let d =
        jalaliDiv(
            (gy + jalaliDiv(gm - 8, 6) + 100100) * 1461,
            4
        ) +
        jalaliDiv(153 * jalaliMod(gm + 9, 12) + 2, 5) +
        gd -
        34840408;

    d =
        d -
        jalaliDiv(
            jalaliDiv(gy + 100100 + jalaliDiv(gm - 8, 6), 100) * 3,
            4
        ) +
        752;

    return d;

}


function d2g(
    jdn
) {

    let j =
        4 * jdn + 139361631;

    j =
        j +
        jalaliDiv(
            jalaliDiv(4 * jdn + 183187720, 146097) * 3,
            4
        ) * 4 -
        3908;

    const i =
        jalaliDiv(jalaliMod(j, 1461), 4) * 5 + 308;

    const gd =
        jalaliDiv(jalaliMod(i, 153), 5) + 1;

    const gm =
        jalaliMod(jalaliDiv(i, 153), 12) + 1;

    const gy =
        jalaliDiv(j, 1461) - 100100 + jalaliDiv(8 - gm, 6);


    return {
        gy: gy,
        gm: gm,
        gd: gd
    };

}


function j2d(
    jy,
    jm,
    jd
) {

    const r =
        jalCal(jy);

    return (
        g2d(r.gy, 3, r.march) +
        (jm - 1) * 31 -
        jalaliDiv(jm, 7) * (jm - 7) +
        jd -
        1
    );

}


function d2j(
    jdn
) {

    const gy =
        d2g(jdn).gy;

    let jy =
        gy - 621;

    const r =
        jalCal(jy);

    const jdn1f =
        g2d(gy, 3, r.march);

    let k =
        jdn - jdn1f;

    let jm,
        jd;


    if (k >= 0) {

        if (k <= 185) {

            jm = 1 + jalaliDiv(k, 31);

            jd = jalaliMod(k, 31) + 1;

            return {
                jy: jy,
                jm: jm,
                jd: jd
            };

        }
        else {

            k -= 186;

        }

    }
    else {

        jy -= 1;

        k += 179;

        if (r.leap === 1) {

            k += 1;

        }

    }

    jm = 7 + jalaliDiv(k, 30);

    jd = jalaliMod(k, 30) + 1;


    return {
        jy: jy,
        jm: jm,
        jd: jd
    };

}


function gregorianToJalali(
    gy,
    gm,
    gd
) {

    return d2j(
        g2d(gy, gm, gd)
    );

}


function jalaliToGregorian(
    jy,
    jm,
    jd
) {

    return d2g(
        j2d(jy, jm, jd)
    );

}


function isoToJalali(
    isoDate
) {

    const [
        y,
        m,
        d
    ] =
        isoDate
            .split("-")
            .map(Number);

    return gregorianToJalali(
        y,
        m,
        d
    );

}


function jalaliToIsoDate(
    jy,
    jm,
    jd
) {

    const g =
        jalaliToGregorian(
            jy,
            jm,
            jd
        );

    const pad =
        n =>
            String(n).padStart(2, "0");

    return `${g.gy}-${pad(g.gm)}-${pad(g.gd)}`;

}


/* -------------------------
تبدیل تاریخ میلادی به شمسی
فقط برای نمایش
------------------------- */

function formatPersianDate(
    dateString,
    longFormat = false
) {

    if (!dateString) {

        return "";

    }


    const [
        year,
        month,
        day
    ] =
        dateString
            .split("-")
            .map(Number);


    const date =
        new Date(
            year,
            month - 1,
            day,
            12,
            0,
            0
        );


    return new Intl.DateTimeFormat(
        "fa-IR-u-ca-persian",
        longFormat
            ? {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
            : {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }
    ).format(date);

}


/* -------------------------
نمایش تاریخ شمسی زیر تاریخ
------------------------- */

function updatePersianWorkoutDate() {

    if (!persianWorkoutDate) {

        return;

    }


    persianWorkoutDate.textContent =
        formatPersianDate(
            workoutDate.value,
            true
        );

}


/* -------------------------
تاریخ اولیه
------------------------- */

workoutDate.value =
    getToday();

updatePersianWorkoutDate();


/* =========================
برنامه
========================= */

function getViewingMonth() {

    return workoutPrograms[
        viewingMonth
    ];

}


function getCurrentMonth() {

    return workoutPrograms[
        currentMonth
    ];

}


function getCurrentProgram() {

    return getViewingMonth().sessions[
        currentSession
    ];

}


/* =========================
دریافت رکورد ذخیره‌شده
برای تاریخ و جلسه جاری
========================= */

function getCurrentSavedWorkout() {

    const workouts =
        getSessionWorkouts(
            viewingMonth,
            currentSession
        );


    return workouts.find(
        workout =>
            workout.date ===
            workoutDate.value
    ) || null;

}


/* =========================
برنامه‌های من (صفحه‌ی تمام‌صفحه)
فقط نمایش عنوان، بازه‌ی تاریخ و
جزئیات هر برنامه — بدون امکان ثبت.
========================= */

function getMonthDateRangeText(
    monthKey
) {

    const month =
        workoutPrograms[monthKey];

    const sessionKeys =
        Object.keys(
            month.sessions
        );


    const dates =
        sessionKeys
            .flatMap(
                sessionKey =>
                    getSessionWorkouts(
                        monthKey,
                        Number(sessionKey)
                    )
            )
            .map(
                workout =>
                    workout.date
            )
            .sort();


    if (dates.length === 0) {

        return "هنوز تمرینی ثبت نشده";

    }


    const startDate =
        dates[0];

    const endDate =
        dates[dates.length - 1];


    if (startDate === endDate) {

        return formatPersianDate(
            startDate,
            true
        );

    }


    return (
        formatPersianDate(startDate, true) +
        " تا " +
        formatPersianDate(endDate, true)
    );

}


function buildMyProgramCardHtml(
    monthKey
) {

    const month =
        workoutPrograms[monthKey];

    const isCurrent =
        monthKey === currentMonth;


    const sessionsHtml =
        Object.values(month.sessions)
            .map(
                session => `

                    <div class="my-program-session">

                        <h4>
                            ${session.title}
                        </h4>

                        <ul class="my-program-exercise-list">

                            ${
                                session.exercises
                                    .map(
                                        exercise => `
                                            <li>
                                                <span class="my-program-exercise-name">
                                                    ${exercise.name}
                                                </span>
                                                <span class="my-program-exercise-meta">
                                                    ${exercise.sets} ست ×
                                                    ${exercise.target} —
                                                    استراحت ${exercise.rest}
                                                </span>
                                            </li>
                                        `
                                    )
                                    .join("")
                            }

                        </ul>

                    </div>

                `
            )
            .join("");


    return `

        <div
            class="my-program-card"
            data-month="${monthKey}"
        >

            <div class="my-program-summary">

                <div class="my-program-summary-info">

                    <h3>
                        ${month.title}
                        ${
                            isCurrent
                                ? '<span class="my-program-current-badge">برنامه جاری</span>'
                                : ""
                        }
                    </h3>

                    <span class="my-program-dates">
                        ${getMonthDateRangeText(monthKey)}
                    </span>

                </div>


                <button
                    type="button"
                    class="secondary-btn my-program-toggle-btn"
                >
                    مشاهده برنامه
                </button>

            </div>


            <div
                class="my-program-details"
                style="display: none;"
            >
                ${sessionsHtml}
            </div>

        </div>

    `;

}


function showMyProgramsPage() {

    const monthKeys =
        Object.keys(
            workoutPrograms
        );


    const listHtml =
        monthKeys.length === 0
            ? `
                <p class="my-programs-empty">
                    هنوز هیچ برنامه‌ای بارگذاری نشده است.
                </p>
            `
            : monthKeys
                .map(buildMyProgramCardHtml)
                .join("");


    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "my-programs-overlay";


    overlay.innerHTML = `

        <div class="my-programs-page">

            <div class="my-programs-header">

                <h2>
                    برنامه‌های من
                </h2>

                <button
                    type="button"
                    class="exercise-guide-close my-programs-close"
                    aria-label="بستن"
                >
                    ×
                </button>

            </div>


            <div class="my-programs-list">
                ${listHtml}
            </div>

        </div>

    `;


    function closeOverlay() {

        overlay.remove();

        document.removeEventListener(
            "keydown",
            closeWithEscape
        );

    }


    const closeWithEscape =
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeOverlay();

            }

        };


    overlay
        .querySelector(
            ".my-programs-close"
        )
        .addEventListener(
            "click",
            closeOverlay
        );


    overlay
        .querySelectorAll(
            ".my-program-toggle-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const card =
                            button.closest(
                                ".my-program-card"
                            );

                        const details =
                            card.querySelector(
                                ".my-program-details"
                            );

                        const isHidden =
                            details.style.display ===
                            "none";


                        details.style.display =
                            isHidden
                                ? ""
                                : "none";

                        button.textContent =
                            isHidden
                                ? "بستن برنامه"
                                : "مشاهده برنامه";

                    }
                );

            }
        );


    document.addEventListener(
        "keydown",
        closeWithEscape
    );


    document.body.appendChild(
        overlay
    );

}


const openMyProgramsBtn =
    document.getElementById(
        "openMyProgramsBtn"
    );


if (openMyProgramsBtn) {

    openMyProgramsBtn.addEventListener(
        "click",
        showMyProgramsPage
    );

}


/* =========================
دکمه‌های جلسات
========================= */

function renderSessionButtons() {

    sessionButtons.innerHTML =
        "";

    const sessions =
        getViewingMonth().sessions;


    Object.keys(
        sessions
    ).forEach(
        session => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "session-btn";


            if (
                Number(session) ===
                currentSession
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.innerHTML = `

                <strong>
                    جلسه ${session}
                </strong>

                <span>
                    ${
                        sessions[
                            session
                        ].title
                    }
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    currentSession =
                        Number(session);

                    renderAll();

                }
            );


            sessionButtons.appendChild(
                button
            );

        }
    );

}


/* =========================
ساخت حرکات
========================= */

function renderExercises() {

    const program =
        getCurrentProgram();


    sessionTitle.textContent =
        getCurrentMonth().title;


    exerciseList.innerHTML =
        "";


    const previous =
        getPreviousWorkout(
            workoutDate.value,
            viewingMonth,
            currentSession
        );


    /*
       رکورد ذخیره‌شده برای همین
       تاریخ و جلسه
    */

    const currentWorkout =
        getCurrentSavedWorkout();


    /*
       اگر برای این تاریخ رکورد
       ذخیره شده باشد، هفته آن را
       نیز برمی‌گردانیم.
    */

    if (
        !keepSelectedWeek &&
        currentWorkout &&
        currentWorkout.week
    ) {

        weekNumber.value =
            currentWorkout.week;

    }


    program.exercises.forEach(
        (exercise, index) => {

            const previousExercise =
                previous?.exercises?.find(
                    item =>
                        item.id ===
                        exercise.id
                );


            const currentExercise =
                currentWorkout?.exercises?.find(
                    item =>
                        item.id ===
                        exercise.id
                );


            const card =
                document.createElement(
                    "section"
                );


            card.className =
                "exercise-card";


            card.innerHTML = `

                <div class="exercise-header">

                    <div class="exercise-title">

                        <div class="exercise-number">
                            ${index + 1}
                        </div>

                        <div>

                            <h2>
                                ${exercise.name}
                            </h2>

                            <div class="exercise-meta">

                                هدف:
                                ${exercise.target}

                                &nbsp; | &nbsp;

                                استراحت:
                                ${exercise.rest}

                            </div>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="exercise-help-btn"
                        data-exercise-id="${exercise.id}"
                    >
                        🖼 نحوه اجرا
                    </button>


                    <button
                        type="button"
                        class="exercise-history-btn"
                        data-exercise-id="${exercise.id}"
                    >
                        📈 سابقه حرکت
                    </button>




                </div>


                <div
                    class="sets-container"
                    data-exercise="${exercise.id}"
                >

                    ${createSetRows(
                        exercise,
                        previousExercise,
                        currentExercise
                    )}

                </div>

            `;


            exerciseList.appendChild(
                card
            );

        }
    );


    attachInputEvents();

    attachExerciseHelpEvents();

    attachExerciseHistoryEvents();

    updateSummary();


}


/* =========================
راهنمای حرکت
========================= */

function attachExerciseHelpEvents() {

    document
        .querySelectorAll(
            ".exercise-help-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const exerciseId =
                            button.dataset.exerciseId;


                        showExerciseGuide(
                            exerciseId
                        );

                    }
                );

            }
        );

}


/* =========================
سابقه حرکت
========================= */

function attachExerciseHistoryEvents() {

    document
        .querySelectorAll(
            ".exercise-history-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const exerciseId =
                            button.dataset
                                .exerciseId;


                        showExerciseHistory(
                            exerciseId
                        );

                    }
                );

            }
        );

}


/* =========================
پیدا کردن سابقه یک حرکت
در کل برنامه
========================= */

function getExerciseHistory(
    exerciseId
) {

    const raw =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!raw) {

        return [];

    }


    const data =
        JSON.parse(
            raw
        );


    if (
        !data ||
        !Array.isArray(
            data.workouts
        )
    ) {

        return [];

    }


    const history = [];


    data.workouts.forEach(
        workout => {

            const exercise =
                workout.exercises?.find(
                    item =>
                        item.id ===
                        exerciseId
                );


            if (!exercise) {

                return;

            }


            const hasData =
                exercise.sets?.some(
                    set =>
                        set.weight !== "" ||
                        set.reps !== ""
                );


            if (!hasData) {

                return;

            }


            history.push({

                date:
                    workout.date,

                week:
                    workout.week,

                month:
                    workout.month,

                session:
                    workout.session,

                sets:
                    exercise.sets

            });

        }
    );


    /*
       جدیدترین رکورد اول
    */

    history.sort(
        (a, b) =>
            b.date.localeCompare(
                a.date
            )
    );


    return history;

}


/* =========================
نمایش سابقه یک حرکت
========================= */

function showExerciseHistory(
    exerciseId
) {

    const exercise =
        getCurrentProgram()
            .exercises
            .find(
                item =>
                    item.id ===
                    exerciseId
            );


    if (!exercise) {

        return;

    }


    const history =
        getExerciseHistory(
            exerciseId
        );


    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "exercise-guide-overlay";


    let historyHtml =
        "";


    if (
        history.length === 0
    ) {

        historyHtml = `

            <div class="history-empty">

                هنوز سابقه‌ای برای این حرکت ثبت نشده است.

            </div>

        `;

    }
    else {

        historyHtml = `

            <div class="exercise-history-list">

                ${
                    history
                        .map(
                            record => `

                                <div class="exercise-history-item">

                                    <div class="exercise-history-info">

                                        <strong>
                                            ${formatPersianDate(
                                                record.date,
                                                true
                                            )}
                                        </strong>

                                        <span>
                                            هفته ${record.week}
                                            |
                                            جلسه ${record.session}
                                        </span>

                                    </div>


                                    <div class="exercise-history-sets">

                                        ${
                                            formatHistorySets(
                                                record.sets
                                            )
                                        }

                                    </div>

                                </div>

                            `
                        )
                        .join("")
                }

            </div>

        `;

    }


    overlay.innerHTML = `

        <div class="exercise-guide-modal">

            <div class="exercise-guide-header">

                <h2>
                    سابقه — ${exercise.name}
                </h2>


                <button
                    type="button"
                    class="exercise-guide-close"
                    aria-label="بستن"
                >
                    ×
                </button>

            </div>


            ${historyHtml}


            <button
                type="button"
                class="primary-btn exercise-guide-done"
            >
                بستن
            </button>

        </div>

    `;


    overlay
        .querySelector(
            ".exercise-guide-close"
        )
        .addEventListener(
            "click",
            () => {

                overlay.remove();

            }
        );


    overlay
        .querySelector(
            ".exercise-guide-done"
        )
        .addEventListener(
            "click",
            () => {

                overlay.remove();

            }
        );


    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                overlay
            ) {

                overlay.remove();

            }

        }
    );


    const closeWithEscape =
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                overlay.remove();

                document.removeEventListener(
                    "keydown",
                    closeWithEscape
                );

            }

        };


    document.addEventListener(
        "keydown",
        closeWithEscape
    );


    document.body.appendChild(
        overlay
    );

}


/* =========================
فرمت ست‌های سابقه
========================= */

function formatHistorySets(
    sets
) {

    if (
        !sets ||
        sets.length === 0
    ) {

        return "—";

    }


    return sets
        .map(
            set => {

                if (
                    set.weight === "" &&
                    set.reps === ""
                ) {

                    return "—";

                }


                return `
                    <span class="history-set">
                        ${set.weight || "—"}kg ×
                        ${set.reps || "—"}
                    </span>
                `;

            }
        )
        .join("");

}


/* =========================
ساخت HTML رسانه حرکت
========================= */

function createExerciseMedia(
    mediaPath,
    exerciseName
) {

    const extension =
        mediaPath
            .split("?")[0]
            .split(".")
            .pop()
            .toLowerCase();


    if (
        extension === "mp4"
    ) {

        return `

            <video
                class="exercise-guide-video"
                controls
                playsinline
                muted
                loop
                preload="metadata"
                onerror="handleExerciseMediaError(this)"
            >

                <source
                    src="${mediaPath}"
                    type="video/mp4"
                >

                مرورگر شما از پخش این ویدئو پشتیبانی نمی‌کند.

            </video>

        `;

    }


    return `

        <img
            class="exercise-guide-image"
            src="${mediaPath}"
            alt="${exerciseName}"
            loading="lazy"
            onerror="handleExerciseMediaError(this)"
        >

    `;

}


/* =========================
جایگزینی رسانه‌ی پیدانشده با پیام
(وقتی مسیر در کاتالوگ درست است ولی خود
فایل هنوز به assets/exercises اضافه نشده)
========================= */

function handleExerciseMediaError(
    element
) {

    const fallback =
        document.createElement(
            "div"
        );

    fallback.className =
        "exercise-guide-no-image";

    fallback.textContent =
        "فایل تصویر/ویدیوی این حرکت پیدا نشد.";


    element.replaceWith(
        fallback
    );

}


function showExerciseGuide(
    exerciseId
) {

    const exercise =
        getCurrentProgram()
            .exercises
            .find(
                item =>
                    item.id ===
                    exerciseId
            );


    if (!exercise) {

        return;

    }


    const images =
        exercise.images || [];


    const instructions =
        exercise.instructions || [];


    let imagesHtml =
        "";


    if (
        images.length > 0
    ) {

        imagesHtml = `

            <div class="exercise-guide-images">

                ${
                    images
                        .map(
                            media =>
                                createExerciseMedia(
                                    media,
                                    exercise.name
                                )
                        )
                        .join("")
                }

            </div>

        `;

    }
    else {

        imagesHtml = `

            <div class="exercise-guide-no-image">

                تصویر این حرکت هنوز اضافه نشده است.

            </div>

        `;

    }


    let instructionsHtml =
        "";


    if (
        instructions.length > 0
    ) {

        instructionsHtml = `

            <ul class="exercise-guide-instructions">

                ${
                    instructions
                        .map(
                            instruction => `
                                <li>
                                    ${instruction}
                                </li>
                            `
                        )
                        .join("")
                }

            </ul>

        `;

    }


    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "exercise-guide-overlay";


    overlay.innerHTML = `

        <div class="exercise-guide-modal">

            <div class="exercise-guide-header">

                <h2>
                    ${exercise.name}
                </h2>

                <button
                    type="button"
                    class="exercise-guide-close"
                    aria-label="بستن"
                >
                    ×
                </button>

            </div>


            ${imagesHtml}


            ${instructionsHtml}


            <button
                type="button"
                class="primary-btn exercise-guide-done"
            >
                بستن
            </button>

        </div>

    `;


    overlay
        .querySelector(
            ".exercise-guide-close"
        )
        .addEventListener(
            "click",
            () => {

                overlay.remove();

            }
        );


    overlay
        .querySelector(
            ".exercise-guide-done"
        )
        .addEventListener(
            "click",
            () => {

                overlay.remove();

            }
        );


    overlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                overlay
            ) {

                overlay.remove();

            }

        }
    );


    const closeWithEscape =
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                overlay.remove();

                document.removeEventListener(
                    "keydown",
                    closeWithEscape
                );

            }

        };


    document.addEventListener(
        "keydown",
        closeWithEscape
    );


    document.body.appendChild(
        overlay
    );

}


/* =========================
جلسه قبل
========================= */

function formatPreviousExercise(
    exercise
) {

    if (!exercise) {

        return "ثبت نشده";

    }


    return exercise.sets
        .map(
            set => {

                if (
                    set.weight === "" &&
                    set.reps === ""
                ) {

                    return "—";

                }


                return `${ 
                    set.weight || "—"
                }kg × ${ 
                    set.reps || "—"
                }`;

            }
        )
        .join(" | ");

}


/* =========================
ساخت ست‌ها
========================= */

function createSetRows(
    exercise,
    previousExercise,
    currentExercise
) {

    let html =
        "";


    for (
        let i = 0;
        i < exercise.sets;
        i++
    ) {

        const previousSet =
            previousExercise?.sets?.[i];


        /*
           اطلاعات ذخیره‌شده فعلی
        */

        const currentSet =
            currentExercise?.sets?.[i];


        const currentWeight =
            currentSet?.weight || "";


        const currentReps =
            currentSet?.reps || "";


        html += `

            <div
                class="set-row"
                data-set="${i}"
            >

                <div class="set-label">
                    ست ${i + 1}
                </div>


                <div>

                    <input
                        type="number"
                        class="weight-input"
                        placeholder="وزنه (kg)"
                        min="0"
                        step="0.5"
                        value="${currentWeight}"
                    >

                </div>


                <div>

                    <input
                        type="number"
                        class="reps-input"
                        placeholder="تکرار"
                        min="0"
                        step="1"
                        value="${currentReps}"
                    >

                </div>


                <div class="set-difference">

                    ${
                        previousSet &&
                        (
                            previousSet.weight ||
                            previousSet.reps
                        )
                            ? `جلسه قبل:
                                ${
                                    previousSet.weight ||
                                    "—"
                                }kg ×
                                ${
                                    previousSet.reps ||
                                    "—"
                                }`
                            : ""
                    }

                </div>

            </div>

        `;

    }


    return html;

}


/* =========================
جمع‌آوری اطلاعات
========================= */

function collectWorkout() {

    const result = {

        id:
            Date.now(),

        date:
            workoutDate.value,

        week:
            Number(
                weekNumber.value
            ),

        month:
            viewingMonth,

        session:
            currentSession,

        exercises: []

    };


    document
        .querySelectorAll(
            ".sets-container"
        )
        .forEach(
            container => {

                const exerciseId =
                    container.dataset
                        .exercise;


                const sets = [];


                container
                    .querySelectorAll(
                        ".set-row"
                    )
                    .forEach(
                        row => {

                            const weight =
                                row.querySelector(
                                    ".weight-input"
                                ).value;


                            const reps =
                                row.querySelector(
                                    ".reps-input"
                                ).value;


                            sets.push({

                                weight:
                                    weight,

                                reps:
                                    reps

                            });

                        }
                    );


                result.exercises.push({

                    id:
                        exerciseId,

                    sets:
                        sets

                });

            }
        );


    return result;

}


/* =========================
بررسی وجود اطلاعات
========================= */

function workoutHasData(
    workout
) {

    return workout.exercises.some(
        exercise =>
            exercise.sets.some(
                set =>
                    set.weight !== "" ||
                    set.reps !== ""
            )
    );

}


/* =========================
ذخیره خودکار
========================= */

function autoSaveWorkout() {

    /*
       اگر تاریخ وجود نداشته باشد
       چیزی ذخیره نمی‌کنیم.
    */

    if (!workoutDate.value) {

        return;

    }


    /*
       فقط ماه جاری قابل ذخیره است.
    */

    if (
        viewingMonth !==
        currentMonth
    ) {

        return;

    }


    const workout =
        collectWorkout();


    /*
       اگر هنوز هیچ چیزی وارد نشده
       چیزی ذخیره نمی‌کنیم.
    */

    if (
        !workoutHasData(
            workout
        )
    ) {

        return;

    }


    /*
       فقط ذخیره.
       
       مهم:
       این تابع هرگز جلسه یا هفته
       را تغییر نمی‌دهد.
    */

    addWorkout(
        workout
    );

}


/* =========================
حرکت به جلسه بعد
========================= */

function goToNextWorkout() {

    const currentWeek =
        Number(
            weekNumber.value
        );


    /*
       جلسه ۱ → جلسه ۲
    */

    if (
        currentSession === 1
    ) {

        currentSession =
            2;

    }


    /*
       جلسه ۲ → جلسه ۳
    */

    else if (
        currentSession === 2
    ) {

        currentSession =
            3;

    }


    /*
       جلسه ۳ → جلسه ۱ هفته بعد
    */

    else if (
        currentSession === 3 &&
        currentWeek < 4
    ) {

        weekNumber.value =
            currentWeek + 1;

        currentSession =
            1;

    }


    /*
       هفته ۴ جلسه ۳
    */

    else {

        alert(
            "تبریک! هفته چهارم و جلسه سوم را هم به پایان رساندید."
        );

        return;

    }


    /*
       هفته‌ای که همینجا تعیین کردیم
       باید بعد از renderAll نیز حفظ شود.
    */

    keepSelectedWeek = true;

    renderAll();

    keepSelectedWeek = false;

}


/* =========================
پایان جلسه و رفتن به بعدی
========================= */

if (
    finishWorkoutBtn
) {

    finishWorkoutBtn.addEventListener(
        "click",
        () => {

            /*
               ماه‌های قبلی فقط برای مشاهده هستند.
            */

            if (
                viewingMonth !==
                currentMonth
            ) {

                alert(
                    "برنامه‌های قبلی فقط برای مشاهده هستند."
                );

                return;

            }


            /*
               اطلاعات فعلی را جمع می‌کنیم.
            */

            const workout =
                collectWorkout();


            /*
               بدون ثبت اطلاعات،
               جلسه تمام نشده است.
            */

            if (
                !workoutHasData(
                    workout
                )
            ) {

                alert(
                    "هنوز اطلاعاتی برای این جلسه ثبت نشده است."
                );

                return;

            }


            /*
               آخرین تغییرات را ذخیره کن.
            */

            autoSaveWorkout();


            /*
               حالا برو به جلسه بعد.
            */

            goToNextWorkout();

        }
    );

}


/* =========================
حجم تمرین
========================= */

function calculateVolume(
    workout
) {

    if (!workout) {

        return 0;

    }


    let volume =
        0;


    workout.exercises.forEach(
        exercise => {

            exercise.sets.forEach(
                set => {

                    const weight =
                        parseFloat(
                            set.weight
                        );


                    const reps =
                        parseFloat(
                            set.reps
                        );


                    if (
                        !isNaN(weight) &&
                        !isNaN(reps)
                    ) {

                        volume +=
                            weight * reps;

                    }

                }
            );

        }
    );


    return volume;

}


/* =========================
خلاصه تمرین
========================= */

function updateSummary() {

    const workout =
        collectWorkout();


    const volume =
        calculateVolume(
            workout
        );


    totalVolume.textContent =
        Math.round(
            volume
        ).toLocaleString(
            "fa-IR"
        );


    const previous =
        getPreviousWorkout(
            workout.date,
            viewingMonth,
            currentSession
        );


    if (!previous) {

        volumeChange.textContent =
            "—";

        return;

    }


    const previousVolume =
        calculateVolume(
            previous
        );


    if (
        previousVolume === 0
    ) {

        volumeChange.textContent =
            "—";

        return;

    }


    const change =
        (
            (
                volume -
                previousVolume
            ) /
            previousVolume
        ) *
        100;


    const rounded =
        Math.round(
            change * 10
        ) / 10;


    volumeChange.textContent =
        `${ 
            rounded > 0
                ? "+"
                : ""
        }${rounded}%`;

}


/* =========================
ذخیره دستی جلسه
========================= */

/*
   این بخش دیگر لازم نیست،
   چون دکمه «ثبت جلسه» حذف شده است.

   اگر دکمه قدیمی هنوز در HTML وجود داشته باشد،
   این کد همچنان از آن پشتیبانی می‌کند.
*/

const saveWorkoutBtn =
    document.getElementById(
        "saveWorkoutBtn"
    );


if (saveWorkoutBtn) {

    saveWorkoutBtn.addEventListener(
        "click",
        () => {

            const workout =
                collectWorkout();


            const hasData =
                workoutHasData(
                    workout
                );


            if (!hasData) {

                alert(
                    "هنوز اطلاعاتی وارد نشده است."
                );

                return;

            }


            if (
                viewingMonth !==
                currentMonth
            ) {

                alert(
                    "برنامه‌های قبلی فقط برای مشاهده هستند."
                );

                return;

            }


            addWorkout(
                workout
            );


            alert(
                "اطلاعات جلسه ذخیره شد."
            );

        }
    );

}


/* =========================
تقویم انتخاب تاریخ (شمسی)
هایلایت روزهایی که تمرین ثبت شده
========================= */

const PERSIAN_WEEKDAY_LABELS = [
    "ش", "ی", "د", "س", "چ", "پ", "ج"
];

const PERSIAN_MONTH_NAMES = [
    "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
    "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];


function getWorkoutDatesSet() {

    return new Set(
        getWorkouts()
            .map(
                workout =>
                    workout.date
            )
    );

}


function buildDatePickerGrid(
    jy,
    jm,
    selectedIso,
    todayIso,
    workoutDatesSet
) {

    const monthLength =
        jalaliMonthLength(jy, jm);

    const firstGregorian =
        jalaliToGregorian(jy, jm, 1);

    const firstDate =
        new Date(
            firstGregorian.gy,
            firstGregorian.gm - 1,
            firstGregorian.gd
        );

    /*
       هفته‌ی فارسی از شنبه شروع می‌شود؛
       getDay() در جاوااسکریپت یکشنبه=۰ است.
    */

    const startWeekday =
        (firstDate.getDay() + 1) % 7;


    let cellsHtml =
        "";


    for (let i = 0; i < startWeekday; i++) {

        cellsHtml +=
            `<div class="date-picker-day empty"></div>`;

    }


    for (let day = 1; day <= monthLength; day++) {

        const iso =
            jalaliToIsoDate(jy, jm, day);

        const classes =
            ["date-picker-day"];

        if (iso === todayIso) {

            classes.push("today");

        }

        if (iso === selectedIso) {

            classes.push("selected");

        }


        cellsHtml += `
            <button
                type="button"
                class="${classes.join(" ")}"
                data-iso="${iso}"
            >
                <span class="date-picker-day-number">
                    ${day}
                </span>
                ${
                    workoutDatesSet.has(iso)
                        ? '<span class="date-picker-day-dot"></span>'
                        : ""
                }
            </button>
        `;

    }


    return cellsHtml;

}


function showDatePickerCalendar() {

    const todayIso =
        getToday();

    const selectedIso =
        workoutDate.value ||
        todayIso;

    const workoutDatesSet =
        getWorkoutDatesSet();

    const view =
        isoToJalali(selectedIso);


    const overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "date-picker-overlay";


    function closeOverlay() {

        overlay.remove();

        document.removeEventListener(
            "keydown",
            closeWithEscape
        );

    }


    const closeWithEscape =
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeOverlay();

            }

        };


    function render() {

        overlay.innerHTML = `

            <div class="date-picker-modal">

                <div class="date-picker-header">

                    <button
                        type="button"
                        class="date-picker-nav"
                        data-dir="prev"
                        aria-label="ماه قبل"
                    >
                        ‹
                    </button>

                    <h3>
                        ${PERSIAN_MONTH_NAMES[view.jm - 1]}
                        ${view.jy}
                    </h3>

                    <button
                        type="button"
                        class="date-picker-nav"
                        data-dir="next"
                        aria-label="ماه بعد"
                    >
                        ›
                    </button>

                </div>


                <div class="date-picker-weekdays">
                    ${
                        PERSIAN_WEEKDAY_LABELS
                            .map(
                                label =>
                                    `<span>${label}</span>`
                            )
                            .join("")
                    }
                </div>


                <div class="date-picker-grid">
                    ${
                        buildDatePickerGrid(
                            view.jy,
                            view.jm,
                            selectedIso,
                            todayIso,
                            workoutDatesSet
                        )
                    }
                </div>


                <div class="date-picker-legend">
                    <span class="date-picker-day-dot"></span>
                    روزهایی که تمرین ثبت شده
                </div>


                <button
                    type="button"
                    class="secondary-btn date-picker-close"
                >
                    بستن
                </button>

            </div>

        `;


        overlay
            .querySelector(
                ".date-picker-close"
            )
            .addEventListener(
                "click",
                closeOverlay
            );


        overlay
            .querySelectorAll(
                ".date-picker-nav"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const direction =
                                button.dataset.dir === "prev"
                                    ? -1
                                    : 1;

                            view.jm += direction;

                            if (view.jm < 1) {

                                view.jm = 12;

                                view.jy -= 1;

                            }

                            if (view.jm > 12) {

                                view.jm = 1;

                                view.jy += 1;

                            }

                            render();

                        }
                    );

                }
            );


        overlay
            .querySelectorAll(
                ".date-picker-day:not(.empty)"
            )
            .forEach(
                cell => {

                    cell.addEventListener(
                        "click",
                        () => {

                            workoutDate.value =
                                cell.dataset.iso;

                            updatePersianWorkoutDate();

                            renderAll();

                            closeOverlay();

                        }
                    );

                }
            );

    }


    overlay.addEventListener(
        "click",
        event => {

            if (event.target === overlay) {

                closeOverlay();

            }

        }
    );


    document.addEventListener(
        "keydown",
        closeWithEscape
    );


    render();

    document.body.appendChild(
        overlay
    );

}


if (workoutDateBtn) {

    workoutDateBtn.addEventListener(
        "click",
        showDatePickerCalendar
    );

}


/* =========================
تغییر هفته
========================= */

weekNumber.addEventListener(
    "change",
    () => {

        /*
           تغییر هفته فقط جابه‌جایی بین
           هفته‌های برنامه است.

           چون اطلاعات هنگام ورود هر
           وزن/تکرار خودکار ذخیره شده،
           اینجا دیگر نباید autoSaveWorkout()
           اجرا شود.
        */

        let week =
            Number(
                weekNumber.value
            );


        if (
            week < 1
        ) {

            week = 1;

        }


        if (
            week > 4
        ) {

            week = 4;

        }


        weekNumber.value =
            week;


        renderAll();

    }
);


/* =========================
تغییر ورودی‌ها
========================= */

function attachInputEvents() {

    document
        .querySelectorAll(
            ".weight-input, .reps-input"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    () => {

                        /*
                           اول خلاصه را
                           به‌روزرسانی می‌کنیم.
                        */

                        updateSummary();


                        /*
                           سپس اطلاعات را
                           بلافاصله ذخیره می‌کنیم.
                        */

                        autoSaveWorkout();

                    }
                );

            }
        );

}


/* =========================
تاریخچه
========================= */

function renderHistory() {

    const container =
        document.getElementById(
            "historyContainer"
        );


    const workouts =
        getSessionWorkouts(
            viewingMonth,
            currentSession
        );


    if (
        workouts.length === 0
    ) {

        container.innerHTML = `

            <div class="history-empty">

                هنوز برای این جلسه رکوردی ثبت نشده است.

            </div>

        `;

        return;

    }


    let html = `

        <div class="history-table-wrapper">

            <table class="history-table">

                <thead>

                    <tr>

                        <th>
                            تاریخ
                        </th>

                        <th>
                            هفته
                        </th>

                        <th>
                            حجم کل
                        </th>

                        <th>
                            تغییر
                        </th>

                    </tr>

                </thead>

                <tbody>

    `;


    workouts.forEach(
        (workout, index) => {

            const volume =
                calculateVolume(
                    workout
                );


            let change =
                "—";


            if (
                index > 0
            ) {

                const previous =
                    calculateVolume(
                        workouts[index - 1]
                    );


                if (
                    previous > 0
                ) {

                    const percent =
                        (
                            (
                                volume -
                                previous
                            ) /
                            previous
                        ) *
                        100;


                    change =
                        `${ 
                            percent > 0
                                ? "+"
                                : ""
                        }${ 
                            Math.round(
                                percent * 10
                            ) / 10
                        }%`;

                }

            }


            html += `

                <tr>

                    <td>
                        ${formatPersianDate(
                            workout.date
                        )}
                    </td>

                    <td>
                        هفته ${workout.week}
                    </td>

                    <td>
                        ${
                            Math.round(
                                volume
                            ).toLocaleString(
                                "fa-IR"
                            )
                        }
                    </td>

                    <td>
                        ${change}
                    </td>

                </tr>

            `;

        }
    );


    html += `

                </tbody>

            </table>

        </div>

    `;


    container.innerHTML =
        html;

}


/* =========================
Backup
========================= */

document
    .getElementById(
        "exportBtn"
    )
    .addEventListener(
        "click",
        () => {

            exportData();

        }
    );


/* =========================
Restore
(هر دو فایل پشتیبان — تاریخچه‌ی
تمرین‌ها یا برنامه — از هر دو دکمه
قابل بازیابی‌اند؛ نوع فایل خودکار
تشخیص داده می‌شود)
========================= */

document
    .getElementById(
        "importInput"
    )
    .addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {

                return;

            }


            handleBackupFileSelected(
                file
            );


            event.target.value =
                "";

        }
    );


/* =========================
بررسی وجود فایل‌های رسانه‌ی
حرکات تازه‌آپلودشده (غیرمسدودکننده)
========================= */

function checkSingleMediaPath(
    path
) {

    return new Promise(
        resolve => {

            const extension =
                path
                    .split("?")[0]
                    .split(".")
                    .pop()
                    .toLowerCase();


            if (extension === "mp4") {

                const video =
                    document.createElement(
                        "video"
                    );

                video.preload =
                    "metadata";

                video.onloadedmetadata =
                    () => resolve(true);

                video.onerror =
                    () => resolve(false);

                video.src =
                    path;

                return;

            }


            const image =
                new Image();

            image.onload =
                () => resolve(true);

            image.onerror =
                () => resolve(false);

            image.src =
                path;

        }
    );

}


async function findMissingMediaPaths(
    paths
) {

    const results =
        await Promise.all(
            paths.map(
                checkSingleMediaPath
            )
        );


    return paths.filter(
        (path, index) =>
            !results[index]
    );

}


/* =========================
بارگذاری برنامه‌ی تمرینی جدید
========================= */

const programImportInput =
    document.getElementById(
        "programImportInput"
    );


if (programImportInput) {

    programImportInput.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {

                return;

            }


            handleBackupFileSelected(
                file
            );


            event.target.value =
                "";

        }
    );

}


/* =========================
تشخیص خودکار نوع فایل پشتیبان
و بازیابی مناسب
========================= */

async function restoreFullBackup(
    data
) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
            { workouts: data.workouts }
        )
    );


    saveDataToKey(
        CATALOG_OVERRIDES_KEY,
        data.catalogAdditions || {}
    );


    saveDataToKey(
        PROGRAM_OVERRIDES_KEY,
        data.programsRaw || {}
    );


    const newMediaPaths =
        data.catalogAdditions
            ? Object.values(data.catalogAdditions)
                .flatMap(
                    entry =>
                        entry.images || []
                )
            : [];


    const missingPaths =
        await findMissingMediaPaths(
            newMediaPaths
        );


    let message =
        "پشتیبان با موفقیت بازیابی شد.";


    if (missingPaths.length > 0) {

        message +=
            "\n\nاین فایل‌های رسانه پیدا نشدند، بعداً به assets/exercises اضافه‌شان کن:\n" +
            missingPaths.join("\n");

    }


    alert(
        message
    );


    /*
       ساده‌ترین و مطمئن‌ترین راه برای
       این‌که همه‌ی صفحه (از جمله ماه
       جاری) با داده‌ی تازه بازسازی شود.
    */

    location.reload();

}


async function restoreProgramBackup(
    pkg
) {

    const validationError =
        validateProgramPackage(
            pkg
        );


    if (validationError) {

        alert(
            "فایل قابل بازیابی نیست:\n" +
            validationError
        );

        return;

    }


    importProgramPackage(
        pkg
    );


    /*
       فقط تصاویر/ویدیوهای حرکاتی که
       همین حالا اضافه شدند چک می‌شوند
       (نه کل کاتالوگ) — و این کار
       جلوی ذخیره‌شدن برنامه را نمی‌گیرد،
       فقط در پیام موفقیت گزارش می‌شود.
    */

    const newMediaPaths =
        pkg.catalogAdditions
            ? Object.values(pkg.catalogAdditions)
                .flatMap(
                    entry =>
                        entry.images || []
                )
            : [];


    const missingPaths =
        await findMissingMediaPaths(
            newMediaPaths
        );


    let message =
        "برنامه با موفقیت بازیابی شد.";


    if (missingPaths.length > 0) {

        message +=
            "\n\nاین فایل‌های رسانه پیدا نشدند، بعداً به assets/exercises اضافه‌شان کن:\n" +
            missingPaths.join("\n");

    }


    alert(
        message
    );


    /*
       ساده‌ترین و مطمئن‌ترین راه برای
       این‌که همه‌ی صفحه (از جمله ماه
       جاری) با داده‌ی تازه بازسازی شود.
    */

    location.reload();

}


function handleBackupFileSelected(
    file
) {

    const reader =
        new FileReader();


    reader.onload =
        function () {

            let data;

            try {

                data =
                    JSON.parse(
                        reader.result
                    );

            }
            catch {

                alert(
                    "فایل معتبر نیست (JSON قابل خواندن نیست)."
                );

                return;

            }


            const isWorkoutBackup =
                data &&
                Array.isArray(
                    data.workouts
                );

            const isProgramBackup =
                data &&
                (
                    data.catalogAdditions ||
                    data.programsRaw
                );


            if (isWorkoutBackup) {

                restoreFullBackup(
                    data
                );

                return;

            }


            if (isProgramBackup) {

                restoreProgramBackup(
                    data
                );

                return;

            }


            alert(
                "این فایل، فایل پشتیبان تاریخچه‌ی تمرین‌ها یا برنامه نیست."
            );

        };


    reader.readAsText(
        file
    );

}


/* =========================
حذف اطلاعات
========================= */

document
    .getElementById(
        "clearBtn"
    )
    .addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "تاریخچه‌ی تمرین‌ها (وزنه/تکرارهای ثبت‌شده) حذف شود؟ برنامه‌ی تمرینی دست‌نخورده می‌ماند. این کار قابل بازگشت نیست."
                );


            if (!confirmed) {

                return;

            }


            deleteAllData();

            renderAll();

        }
    );


/* =========================
بازنشانی کامل
(تاریخچه + برنامه‌ی آپلودی)
========================= */

const fullResetBtn =
    document.getElementById(
        "fullResetBtn"
    );


if (fullResetBtn) {

    fullResetBtn.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "همه‌چیز حذف شود؟ هم تاریخچه‌ی تمرین‌ها و هم خودِ برنامه‌ی آپلودی پاک می‌شود و برنامه به حالت بدون‌برنامه برمی‌گردد. این کار قابل بازگشت نیست."
                );


            if (!confirmed) {

                return;

            }


            deleteAllData();

            saveDataToKey(
                CATALOG_OVERRIDES_KEY,
                {}
            );

            saveDataToKey(
                PROGRAM_OVERRIDES_KEY,
                {}
            );

            location.reload();

        }
    );

}


/* =========================
Dark Mode
========================= */

function applyTheme(
    theme
) {

    if (!themeToggleBtn) {

        return;

    }


    if (
        theme === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );


        themeToggleBtn.textContent =
            "☀️ حالت روشن";

    }
    else {

        document.body.classList.remove(
            "dark-mode"
        );


        themeToggleBtn.textContent =
            "🌙 حالت تاریک";

    }

}


const savedTheme =
    localStorage.getItem(
        "gymTrackerTheme"
    );


applyTheme(
    savedTheme === "dark"
        ? "dark"
        : "light"
);


if (themeToggleBtn) {

    themeToggleBtn.addEventListener(
        "click",
        () => {

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            const newTheme =
                isDark
                    ? "light"
                    : "dark";


            localStorage.setItem(
                "gymTrackerTheme",
                newTheme
            );


            applyTheme(
                newTheme
            );

        }
    );

}


/* =========================
رندر کامل
========================= */

function renderAll() {

    const hasAnyProgram =
        Object.keys(workoutPrograms).length > 0;


    if (emptyProgramState) {

        emptyProgramState.style.display =
            hasAnyProgram ? "none" : "";

    }


    if (programContent) {

        programContent.style.display =
            hasAnyProgram ? "" : "none";

    }


    if (!hasAnyProgram) {

        return;

    }


    renderSessionButtons();

    renderExercises();

    renderHistory();

}


/* =========================
شروع برنامه
========================= */

renderAll();