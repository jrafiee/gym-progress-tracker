/* =====================================================
   ترکیب کاتالوگ + برنامه

   این فایل به exerciseCatalog (از exercise-catalog.js)
   و workoutProgramsRaw (از workout-programs.js) نیاز
   دارد، پس در index.html باید بعد از هر دوی آن‌ها
   لود شود.

   خروجی این تابع دقیقاً همان ساختاری است که همیشه
   در برنامه استفاده می‌شده (هر حرکت هم شامل
   id/target/rest/sets و هم name/images/instructions
   است)، پس بقیه‌ی فایل‌ها (app.js, storage.js) اصلاً
   نیازی به تغییر ندارند و همچنان با global
   "workoutPrograms" کار می‌کنند.

   این همان تابعی است که بعداً، وقتی امکان آپلود
   برنامه از داخل برنامه اضافه شود، دوباره روی
   کاتالوگ + برنامه‌ی وارد‌شده توسط کاربر هم صدا
   زده خواهد شد.
===================================================== */

function buildWorkoutPrograms(catalog, programsRaw) {

    const result = {};

    Object.keys(programsRaw).forEach(monthKey => {

        const month = programsRaw[monthKey];
        const sessions = {};

        Object.keys(month.sessions).forEach(sessionKey => {

            const session = month.sessions[sessionKey];

            const exercises = session.exercises.map(exercise => {

                const catalogEntry = catalog[exercise.id];

                if (!catalogEntry) {

                    console.error(
                        `حرکتی با id "${exercise.id}" در کاتالوگ پیدا نشد.`
                    );

                }

                return {
                    id: exercise.id,
                    target: exercise.target,
                    rest: exercise.rest,
                    sets: exercise.sets,
                    name: catalogEntry ? catalogEntry.name : exercise.id,
                    images: catalogEntry ? catalogEntry.images : [],
                    instructions: catalogEntry ? catalogEntry.instructions : []
                };

            });

            sessions[sessionKey] = {
                title: session.title,
                exercises: exercises
            };

        });

        result[monthKey] = {
            title: month.title,
            sessions: sessions
        };

    });

    return result;

}


const workoutPrograms = buildWorkoutPrograms(
    exerciseCatalog,
    workoutProgramsRaw
);
