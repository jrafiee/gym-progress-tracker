const STORAGE_KEY =
    "gymProgressTracker_v2";


function loadData() {

    const raw =
        localStorage.getItem(
            STORAGE_KEY
        );

    if (!raw) {

        return {
            workouts: []
        };

    }

    try {

        return JSON.parse(raw);

    }
    catch (error) {

        console.error(
            "خطا در خواندن اطلاعات:",
            error
        );

        return {
            workouts: []
        };

    }

}


function saveData(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


/* -------------------------
   ذخیره جلسه
------------------------- */

function addWorkout(workout) {

    const data =
        loadData();


    const existingIndex =
        data.workouts.findIndex(
            item =>
                item.date === workout.date &&
                item.month === workout.month &&
                item.session === workout.session
        );


    if (existingIndex >= 0) {

        data.workouts[existingIndex] =
            workout;

    }
    else {

        data.workouts.push(
            workout
        );

    }


    data.workouts.sort(
        (a, b) =>
            new Date(a.date) -
            new Date(b.date)
    );


    saveData(data);

}


/* -------------------------
   همه تمرین‌ها
------------------------- */

function getWorkouts() {

    return loadData().workouts;

}


/* -------------------------
   تمرین‌های یک ماه و جلسه
------------------------- */

function getSessionWorkouts(
    month,
    session
) {

    return getWorkouts()
        .filter(
            workout =>
                workout.month === month &&
                workout.session === session
        );

}


/* -------------------------
   آخرین تمرین قبلی
------------------------- */

function getPreviousWorkout(
    currentDate,
    month,
    session
) {

    const workouts =
        getSessionWorkouts(
            month,
            session
        )
        .filter(
            workout =>
                workout.date < currentDate
        );


    if (
        workouts.length === 0
    ) {

        return null;

    }


    return workouts[
        workouts.length - 1
    ];

}


/* -------------------------
   حذف همه اطلاعات
------------------------- */

function deleteAllData() {

    localStorage.removeItem(
        STORAGE_KEY
    );

}


/* -------------------------
   Backup
------------------------- */

function exportData() {

    const data =
        loadData();


    const blob =
        new Blob(
            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "gym-progress-backup.json";


    link.click();


    URL.revokeObjectURL(
        url
    );

}