let currentSession = 1;


/* -------------------------
   عناصر صفحه
------------------------- */

const workoutDate =
    document.getElementById(
        "workoutDate"
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


const totalVolume =
    document.getElementById(
        "totalVolume"
    );


const volumeChange =
    document.getElementById(
        "volumeChange"
    );


const exerciseCount =
    document.getElementById(
        "exerciseCount"
    );


const setCount =
    document.getElementById(
        "setCount"
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


workoutDate.value =
    getToday();


/* -------------------------
   برنامه فعلی
------------------------- */

function getCurrentProgram() {

    return workoutPrograms[
        currentSession
    ];

}


/* -------------------------
   دکمه‌های جلسات
------------------------- */

function renderSessionButtons() {

    sessionButtons.innerHTML =
        "";


    Object.keys(
        workoutPrograms
    )
    .forEach(
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
                        workoutPrograms[
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


/* -------------------------
   ساخت حرکات
------------------------- */

function renderExercises() {

    const program =
        getCurrentProgram();


    sessionTitle.textContent =
        `جلسه ${currentSession} — ${program.title}`;


    exerciseList.innerHTML =
        "";


    const previous =
        getPreviousWorkout(
            workoutDate.value,
            currentSession
        );


    program.exercises.forEach(
        (exercise, index) => {

            const previousExercise =
                previous?.exercises?.find(
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


                    <div class="previous-result">

                        جلسه قبل:

                        <strong>

                            ${
                                formatPreviousExercise(
                                    previousExercise
                                )
                            }

                        </strong>

                    </div>

                </div>


                <div
                    class="sets-container"
                    data-exercise="${exercise.id}"
                >

                    ${createSetRows(
                        exercise,
                        previousExercise
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

    updateSummary();

}


/* -------------------------
   راهنمای حرکت
------------------------- */

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
                            image => `
                                <img
                                    src="${image}"
                                    alt="${exercise.name}"
                                >
                            `
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


    /* -------------------------
       بستن با دکمه ×
    ------------------------- */

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


    /* -------------------------
       بستن با دکمه پایین
    ------------------------- */

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


    /* -------------------------
       بستن با لمس بیرون
    ------------------------- */

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


    /* -------------------------
       ESC روی دسکتاپ
    ------------------------- */

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


/* -------------------------
   جلسه قبل
------------------------- */

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


/* -------------------------
   ساخت ست‌ها
------------------------- */

function createSetRows(
    exercise,
    previousExercise
) {

    let html = "";


    for (
        let i = 0;
        i < exercise.sets;
        i++
    ) {

        const previousSet =
            previousExercise?.sets?.[i];


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
                    >

                </div>


                <div>

                    <input
                        type="number"
                        class="reps-input"
                        placeholder="تکرار"
                        min="0"
                        step="1"
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


/* -------------------------
   جمع‌آوری اطلاعات
------------------------- */

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


/* -------------------------
   حجم تمرین
------------------------- */

function calculateVolume(
    workout
) {

    if (!workout) {

        return 0;

    }


    let volume = 0;


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


/* -------------------------
   خلاصه
------------------------- */

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


    const program =
        getCurrentProgram();


    exerciseCount.textContent =
        program.exercises.length;


    setCount.textContent =
        program.exercises.reduce(
            (total, exercise) =>
                total + exercise.sets,
            0
        );


    const previous =
        getPreviousWorkout(
            workout.date,
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


/* -------------------------
   ذخیره جلسه
------------------------- */

document
    .getElementById(
        "saveWorkoutBtn"
    )
    .addEventListener(
        "click",
        () => {

            const workout =
                collectWorkout();


            const hasData =
                workout.exercises.some(
                    exercise =>
                        exercise.sets.some(
                            set =>
                                set.weight !== "" ||
                                set.reps !== ""
                        )
                );


            if (!hasData) {

                alert(
                    "هنوز اطلاعاتی وارد نشده است."
                );

                return;

            }


            addWorkout(
                workout
            );


            renderAll();


            alert(
                "جلسه با موفقیت ثبت شد."
            );

        }
    );


/* -------------------------
   جلسه جدید
------------------------- */

document
    .getElementById(
        "newWorkoutBtn"
    )
    .addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "اطلاعات واردشده پاک شود و جلسه جدید شروع شود؟"
                )
            ) {

                workoutDate.value =
                    getToday();


                renderExercises();

            }

        }
    );


/* -------------------------
   تغییر تاریخ
------------------------- */

workoutDate.addEventListener(
    "change",
    () => {

        renderAll();

    }
);


/* -------------------------
   تغییر هفته
------------------------- */

weekNumber.addEventListener(
    "change",
    () => {

        renderHistory();

    }
);


/* -------------------------
   تغییر ورودی‌ها
------------------------- */

function attachInputEvents() {

    document
        .querySelectorAll(
            ".weight-input, .reps-input"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    updateSummary
                );

            }
        );

}


/* -------------------------
   تاریخچه
------------------------- */

function renderHistory() {

    const container =
        document.getElementById(
            "historyContainer"
        );


    const workouts =
        getSessionWorkouts(
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
                        ${workout.date}
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


/* -------------------------
   Backup
------------------------- */

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


/* -------------------------
   Restore
------------------------- */

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


            const reader =
                new FileReader();


            reader.onload =
                function () {

                    try {

                        const imported =
                            JSON.parse(
                                reader.result
                            );


                        if (
                            !imported.workouts ||
                            !Array.isArray(
                                imported.workouts
                            )
                        ) {

                            throw new Error(
                                "Invalid backup"
                            );

                        }


                        localStorage.setItem(
                            STORAGE_KEY,
                            JSON.stringify(
                                imported
                            )
                        );


                        renderAll();


                        alert(
                            "اطلاعات با موفقیت بازیابی شد."
                        );

                    }
                    catch {

                        alert(
                            "فایل پشتیبان معتبر نیست."
                        );

                    }

                };


            reader.readAsText(
                file
            );

        }
    );


/* -------------------------
   حذف اطلاعات
------------------------- */

document
    .getElementById(
        "clearBtn"
    )
    .addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "همه اطلاعات تمرین‌ها حذف شود؟ این کار قابل بازگشت نیست."
                );


            if (!confirmed) {

                return;

            }


            deleteAllData();

            renderAll();

        }
    );


/* -------------------------
   رندر کامل
------------------------- */

function renderAll() {

    renderSessionButtons();

    renderExercises();

    renderHistory();

}


/* -------------------------
   شروع برنامه
------------------------- */

renderAll();