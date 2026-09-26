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

    const backup = {
        workouts:
            getWorkouts(),
        catalogAdditions:
            loadCatalogOverrides(),
        programsRaw:
            loadProgramOverrides()
    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    backup,
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


    setLastBackupAt(
        new Date().toISOString()
    );

}


/* =====================================================
   یادآوری پشتیبان‌گیری

   تاریخ آخرین پشتیبان‌گیری موفق و تاریخ اولین
   اجرای برنامه را نگه می‌داریم تا بشود تشخیص داد
   چند روز از آخرین پشتیبان گذشته و در صورت لزوم
   هشدار نشان داد.
===================================================== */

const LAST_BACKUP_KEY =
    "gymProgressTracker_lastBackupAt";

const FIRST_USE_KEY =
    "gymProgressTracker_firstUseAt";

const MS_PER_DAY = 1000 * 60 * 60 * 24;


function getLastBackupAt() {

    return localStorage.getItem(
        LAST_BACKUP_KEY
    );

}


function setLastBackupAt(iso) {

    localStorage.setItem(
        LAST_BACKUP_KEY,
        iso
    );

}


function getFirstUseAt() {

    let firstUse =
        localStorage.getItem(
            FIRST_USE_KEY
        );

    if (!firstUse) {

        firstUse =
            new Date().toISOString();

        localStorage.setItem(
            FIRST_USE_KEY,
            firstUse
        );

    }

    return firstUse;

}


function hasBackableData() {

    const workouts =
        getWorkouts();

    const programOverrides =
        loadProgramOverrides();

    const catalogOverrides =
        loadCatalogOverrides();

    return (
        workouts.length > 0 ||
        Object.keys(programOverrides).length > 0 ||
        Object.keys(catalogOverrides).length > 0
    );

}


/* -------------------------
   وضعیت هشدار پشتیبان‌گیری

   اگر هیچ داده‌ای برای از دست دادن وجود نداشته
   باشد، هشداری لازم نیست. در غیر این صورت، تاریخ
   آخرین پشتیبان‌گیری (یا اگر هیچ‌وقت پشتیبان
   گرفته نشده، تاریخ اولین اجرای برنامه) به‌عنوان
   مبنا در نظر گرفته می‌شود؛ اگر بیش از ۷ روز از
   آن گذشته باشد، هشدار نشان داده می‌شود.
------------------------- */

function getBackupWarningInfo() {

    if (!hasBackableData()) {

        return {
            shouldWarn: false,
            daysSince: 0
        };

    }


    const reference =
        getLastBackupAt() ||
        getFirstUseAt();

    const diffMs =
        Date.now() -
        new Date(reference).getTime();

    const daysSince =
        Math.max(
            0,
            Math.floor(diffMs / MS_PER_DAY)
        );

    return {
        shouldWarn: daysSince >= 7,
        daysSince
    };

}


/* =====================================================
   برنامه‌ی تمرینی آپلودی

   کاتالوگ و برنامه‌ی پیش‌فرض (exerciseCatalog و
   workoutProgramsRaw) داخل کد هستند و تغییر نمی‌کنند.
   هر برنامه‌ی جدیدی که از تنظیمات آپلود می‌شود، اینجا
   در localStorage به‌عنوان "اضافه" نگه‌داری می‌شود و
   روی پیش‌فرض‌ها merge می‌گردد — یعنی برنامه‌های قبلی
   و سابقه‌ی تمرین‌ها هیچ‌وقت پاک نمی‌شوند.
===================================================== */

const CATALOG_OVERRIDES_KEY =
    "gymProgressTracker_catalogOverrides";

const PROGRAM_OVERRIDES_KEY =
    "gymProgressTracker_programOverrides";


function loadCatalogOverrides() {

    const raw =
        localStorage.getItem(
            CATALOG_OVERRIDES_KEY
        );

    if (!raw) {

        return {};

    }

    try {

        return JSON.parse(raw);

    }
    catch (error) {

        console.error(
            "خطا در خواندن کاتالوگ آپلودی:",
            error
        );

        return {};

    }

}


function loadProgramOverrides() {

    const raw =
        localStorage.getItem(
            PROGRAM_OVERRIDES_KEY
        );

    if (!raw) {

        return {};

    }

    try {

        return JSON.parse(raw);

    }
    catch (error) {

        console.error(
            "خطا در خواندن برنامه‌های آپلودی:",
            error
        );

        return {};

    }

}


/* -------------------------
   کاتالوگ + برنامه‌ی نهایی
   (پیش‌فرض + آپلودی)
------------------------- */

function getEffectiveCatalog() {

    return {
        ...exerciseCatalog,
        ...loadCatalogOverrides()
    };

}


function getEffectiveProgramsRaw() {

    return {
        ...workoutProgramsRaw,
        ...loadProgramOverrides()
    };

}


/* -------------------------
   اعتبارسنجی ساده‌ی فایل آپلودی

   انتظار داریم فایل شامل حداقل یکی از
   دو بخش زیر باشد:
   { catalogAdditions: {...}, programsRaw: {...} }
------------------------- */

function validateProgramPackage(pkg) {

    if (
        !pkg ||
        typeof pkg !== "object"
    ) {

        return "فایل معتبر نیست.";

    }


    const hasCatalog =
        pkg.catalogAdditions &&
        typeof pkg.catalogAdditions === "object";

    const hasPrograms =
        pkg.programsRaw &&
        typeof pkg.programsRaw === "object";


    if (
        !hasCatalog &&
        !hasPrograms
    ) {

        return "فایل هیچ برنامه یا حرکت جدیدی ندارد.";

    }


    if (hasPrograms) {

        const effectiveCatalog =
            getEffectiveCatalog();

        const catalogAdditions =
            hasCatalog
                ? pkg.catalogAdditions
                : {};


        for (const monthKey in pkg.programsRaw) {

            const month =
                pkg.programsRaw[monthKey];

            if (
                !month ||
                !month.sessions
            ) {

                return `ماه "${monthKey}" ساختار درستی ندارد.`;

            }


            for (const sessionKey in month.sessions) {

                const exercises =
                    month.sessions[sessionKey]
                        .exercises || [];


                for (const exercise of exercises) {

                    const existsInCatalog =
                        effectiveCatalog[exercise.id] ||
                        catalogAdditions[exercise.id];


                    if (!existsInCatalog) {

                        return `حرکتی با id "${exercise.id}" نه در کاتالوگ فعلی و نه در فایل آپلودی وجود ندارد.`;

                    }

                }

            }

        }

    }


    return null;

}


/* -------------------------
   افزودن برنامه‌ی آپلودی
------------------------- */

function saveDataToKey(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


function importProgramPackage(pkg) {

    if (pkg.catalogAdditions) {

        saveDataToKey(
            CATALOG_OVERRIDES_KEY,
            {
                ...loadCatalogOverrides(),
                ...pkg.catalogAdditions
            }
        );

    }


    if (pkg.programsRaw) {

        saveDataToKey(
            PROGRAM_OVERRIDES_KEY,
            {
                ...loadProgramOverrides(),
                ...pkg.programsRaw
            }
        );

    }

}
