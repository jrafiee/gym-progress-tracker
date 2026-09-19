/* =====================================================
   برنامه‌های تمرینی

   هر برنامه فقط به id حرکات کاتالوگ بالا ارجاع
   می‌دهد، و هدف تکرار (target)، زمان استراحت (rest)
   و تعداد ست (sets) را مشخص می‌کند — یعنی همان چیزی
   که واقعاً از یک برنامه به برنامه‌ی بعدی عوض می‌شود.

   این همان بخشی است که با هر برنامه‌ی جدیدِ باشگاه
   جایگزین/آپلود خواهد شد.
===================================================== */

const workoutProgramsRaw = {

    month1: {

        title: "ماه اول",

        sessions: {

            1: {
                title: "سینه + پشت بازو + شکم",
                exercises: [
                    { id: "machine_chest_press", target: "3 × 6–10", rest: "2–3 دقیقه", sets: 3 },
                    { id: "incline_dumbbell_press", target: "3 × 8–12", rest: "2 دقیقه", sets: 3 },
                    { id: "dumbbell_fly", target: "2 × 10–15", rest: "90 ثانیه", sets: 2 },
                    { id: "elevated_pushup", target: "2 × 8–15", rest: "90 ثانیه", sets: 2 },
                    { id: "rope_triceps_pushdown", target: "3 × 8–12", rest: "90 ثانیه", sets: 3 },
                    { id: "overhead_cable_triceps", target: "2 × 10–15", rest: "90 ثانیه", sets: 2 },
                    { id: "dead_bug", target: "3 × 8–12 هر طرف", rest: "45–60 ثانیه", sets: 3 },
                    { id: "crunch", target: "2 × 10–15", rest: "60 ثانیه", sets: 2 }
                ]
            },

            2: {
                title: "پشت + سرشانه + شکم",
                exercises: [
                    { id: "wide_lat_pulldown", target: "3 × 8–12", rest: "2 دقیقه", sets: 3 },
                    { id: "seated_cable_row", target: "3 × 8–12", rest: "2 دقیقه", sets: 3 },
                    { id: "chest_supported_row", target: "3 × 8–12", rest: "2 دقیقه", sets: 3 },
                    { id: "straight_arm_pullover", target: "2 × 10–15", rest: "90 ثانیه", sets: 2 },
                    { id: "dumbbell_shoulder_press", target: "3 × 8–12", rest: "2 دقیقه", sets: 3 },
                    { id: "dumbbell_lateral_raise", target: "3 × 10–15", rest: "60–90 ثانیه", sets: 3 },
                    { id: "rear_delt_fly", target: "2 × 12–15", rest: "60–90 ثانیه", sets: 2 },
                    { id: "pallof_press", target: "3 × 10–12 هر طرف", rest: "45–60 ثانیه", sets: 3 }
                ]
            },

            3: {
                title: "پا + جلو بازو + شکم",
                exercises: [
                    { id: "leg_press", target: "3 × 6–10", rest: "2–3 دقیقه", sets: 3 },
                    { id: "smith_squat", target: "3 × 8–12", rest: "2–3 دقیقه", sets: 3 },
                    { id: "lying_leg_curl", target: "3 × 8–12", rest: "90 ثانیه", sets: 3 },
                    { id: "leg_extension", target: "2 × 10–15", rest: "90 ثانیه", sets: 2 },
                    { id: "smith_calf_raise", target: "3 × 10–15", rest: "60–90 ثانیه", sets: 3 },
                    { id: "hammer_curl", target: "3 × 8–12", rest: "90 ثانیه", sets: 3 },
                    { id: "cable_curl", target: "2 × 10–15", rest: "60–90 ثانیه", sets: 2 },
                    { id: "plank", target: "3 × 30–60 ثانیه", rest: "60 ثانیه", sets: 3 }
                ]
            }

        }

    }

};
