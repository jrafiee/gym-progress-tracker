const workoutPrograms = {

    /* =========================
       ماه اول
    ========================= */

    month1: {

        title:
            "ماه اول",

        sessions: {

            /* -------------------------
               جلسه ۱
               سینه + پشت بازو + شکم
            ------------------------- */

            1: {

                title:
                    "سینه + پشت بازو + شکم",

                exercises: [

                    {
                        id: "machine_chest_press",

                        name:
                            "پرس سینه دستگاه",

                        target:
                            "3 × 6–10",

                        rest:
                            "2–3 دقیقه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/machine-chest-press.svg"
                        ],

                        instructions: [
                            "کتف‌ها را عقب و پایین نگه دار.",
                            "دسته‌ها را بدون ضربه به جلو فشار بده.",
                            "در برگشت، وزنه را کاملاً کنترل کن."
                        ]
                    },


                    {
                        id: "incline_dumbbell_press",

                        name:
                            "پرس بالا سینه دمبل",

                        target:
                            "3 × 8–12",

                        rest:
                            "2 دقیقه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/incline-dumbbell-press.svg"
                        ],

                        instructions: [
                            "میز را حدود 30 تا 45 درجه تنظیم کن.",
                            "کتف‌ها را به نیمکت تکیه بده.",
                            "دمبل‌ها را کنترل‌شده پایین بیاور و به بالا فشار بده."
                        ]
                    },


                    {
                        id: "dumbbell_fly",

                        name:
                            "فلای دمبل",

                        target:
                            "2 × 10–15",

                        rest:
                            "90 ثانیه",

                        sets:
                            2,

                        images: [
                            "assets/exercises/dumbbell-fly.mp4"
                        ],

                        instructions: [
                            "آرنج‌ها را کمی خم نگه دار.",
                            "دست‌ها را با کنترل به طرفین باز کن.",
                            "دمبل‌ها را با فشار عضلات سینه به هم نزدیک کن."
                        ]
                    },


                    {
                        id: "elevated_pushup",

                        name:
                            "شنا روی پایه",

                        target:
                            "2 × 8–15",

                        rest:
                            "90 ثانیه",

                        sets:
                            2,

                        images: [
                            "assets/exercises/elevated-pushup.mp4"
                        ],

                        instructions: [
                            "بدن را از سر تا لگن در یک خط نگه دار.",
                            "سینه را به سمت پایه پایین بیاور.",
                            "در بالا آمدن، بدن را بدون خم شدن کمر کنترل کن."
                        ]
                    },


                    {
                        id: "rope_triceps_pushdown",

                        name:
                            "پشت بازو سیم‌کش طناب",

                        target:
                            "3 × 8–12",

                        rest:
                            "90 ثانیه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/rope-triceps-pushdown.mp4"
                        ],

                        instructions: [
                            "آرنج‌ها را نزدیک بدن ثابت نگه دار.",
                            "طناب را با حرکت آرنج به پایین بکش.",
                            "در برگشت، اجازه بده ساعدها کنترل‌شده بالا بیایند."
                        ]
                    },


                    {
                        id: "overhead_cable_triceps",

                        name:
                            "پشت بازو بالای سر با سیم‌کش",

                        target:
                            "2 × 10–15",

                        rest:
                            "90 ثانیه",

                        sets:
                            2,

                        images: [
                            "assets/exercises/overhead-cable-triceps.mp4"
                        ],

                        instructions: [
                            "آرنج‌ها را تا حد ممکن ثابت نگه دار.",
                            "دست‌ها را از پشت سر به جلو باز کن.",
                            "در تمام حرکت کشش پشت بازو را حفظ کن."
                        ]
                    },


                    {
                        id: "dead_bug",

                        name:
                            "Dead Bug",

                        target:
                            "3 × 8–12 هر طرف",

                        rest:
                            "45–60 ثانیه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/dead-bug.jpg"
                        ],

                        instructions: [
                            "کمر پایین را روی زمین ثابت نگه دار.",
                            "دست و پای مخالف را همزمان باز کن.",
                            "اجازه نده کمر هنگام باز کردن دست و پا از زمین جدا شود."
                        ]
                    },


                    {
                        id: "crunch",

                        name:
                            "کرانچ",

                        target:
                            "2 × 10–15",

                        rest:
                            "60 ثانیه",

                        sets:
                            2,

                        images: [
                            "assets/exercises/crunch.mp4"
                        ],

                        instructions: [
                            "کمر پایین را روی زمین نگه دار.",
                            "با جمع کردن عضلات شکم شانه‌ها را از زمین جدا کن.",
                            "حرکت را آرام انجام بده و با گردن خود را بالا نکش."
                        ]
                    }

                ]

            },


            /* -------------------------
               جلسه ۲
               پشت + سرشانه + شکم
            ------------------------- */

            2: {

                title:
                    "پشت + سرشانه + شکم",

                exercises: [

                    {
                        id: "wide_lat_pulldown",

                        name:
                            "زیربغل سیم‌کش دست باز از جلو",

                        target:
                            "3 × 8–12",

                        rest:
                            "2 دقیقه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/lat_pulldown_wide.mp4"
                        ],

                        instructions: [
                            "سینه را کمی بالا نگه دار.",
                            "میله را به سمت بالای سینه پایین بکش.",
                            "در برگشت، دست‌ها را کنترل‌شده باز کن."
                        ]
                    },


                    {
                        id: "seated_cable_row",

                        name:
                            "قایقی سیم‌کش",

                        target:
                            "3 × 8–12",

                        rest:
                            "2 دقیقه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/seated_cable_row.mp4"
                        ],

                        instructions: [
                            "کمر را صاف و سینه را باز نگه دار.",
                            "دسته را به سمت شکم بکش.",
                            "کتف‌ها را در انتهای حرکت به هم نزدیک کن."
                        ]
                    },


                    {
                        id: "chest_supported_row",

                        name:
                            "پارویی دمبل روی میز شیب‌دار",

                        target:
                            "3 × 8–12",

                        rest:
                            "2 دقیقه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/incline_dumbbell_row.mp4"
                        ],

                        instructions: [
                            "سینه را کاملاً روی نیمکت تکیه بده.",
                            "دمبل‌ها را به سمت بدن بکش.",
                            "در پایین حرکت، دست‌ها را کنترل‌شده پایین بیاور."
                        ]
                    },


                    {
                        id: "straight_arm_pullover",

                        name:
                            "پول‌اور سیم‌کش دست صاف با طناب",

                        target:
                            "2 × 10–15",

                        rest:
                            "90 ثانیه",

                        sets:
                            2,

                        images: [
                            "assets/exercises/straight_arm_cable_pullover.mp4"
                        ],

                        instructions: [
                            "آرنج‌ها را کمی خم ولی تقریباً ثابت نگه دار.",
                            "طناب را با عضلات پشت به سمت ران‌ها پایین بکش.",
                            "در برگشت، کشش عضلات زیر بغل را حفظ کن."
                        ]
                    },


                    {
                        id: "dumbbell_shoulder_press",

                        name:
                            "پرس سرشانه دمبل نشسته",

                        target:
                            "3 × 8–12",

                        rest:
                            "2 دقیقه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/dumbbell_shoulder_press_seated.mp4"
                        ],

                        instructions: [
                            "روی نیمکت با پشتی تقریباً عمودی بنشین.",
                            "دمبل‌ها را در کنار سر قرار بده.",
                            "بدون تاب دادن بدن، دمبل‌ها را به بالا فشار بده.",
                            "در پایین حرکت آرنج‌ها را بیش از حد پایین نبر."
                        ]
                    },


                    {
                        id: "dumbbell_lateral_raise",

                        name:
                            "نشر جانب دمبل",

                        target:
                            "3 × 10–15",

                        rest:
                            "60–90 ثانیه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/dumbbell_lateral_raise.mp4"
                        ],

                        instructions: [
                            "دمبل‌ها را با آرنج کمی خم نگه دار.",
                            "دست‌ها را تا حدود ارتفاع شانه بالا بیاور.",
                            "از تاب دادن بدن و بالا بردن بیش از حد دست‌ها خودداری کن."
                        ]
                    },


                    {
                        id: "rear_delt_fly",

                        name:
                            "نشر خم دمبل خوابیده روی میز شیب‌دار",

                        target:
                            "2 × 12–15",

                        rest:
                            "60–90 ثانیه",

                        sets:
                            2,

                        images: [
                            "assets/exercises/rear_delt_fly_incline_bench.mp4"
                        ],

                        instructions: [
                            "سینه را کاملاً روی میز شیب‌دار قرار بده.",
                            "دمبل‌ها را از زیر بدن به طرفین باز کن.",
                            "حرکت را با پشت سرشانه انجام بده و از تاب دادن وزنه خودداری کن."
                        ]
                    },


                    {
                        id: "pallof_press",

                        name:
                            "پرس پالوف",

                        target:
                            "3 × 10–12 هر طرف",

                        rest:
                            "45–60 ثانیه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/pallof_press.mp4"
                        ],

                        instructions: [
                            "در کنار دستگاه سیم‌کش بایست و بدن را کاملاً ثابت نگه دار.",
                            "دسته را جلوی سینه نگه دار.",
                            "دسته را به سمت جلو فشار بده.",
                            "اجازه نده کشش کابل بدن را به طرفین بچرخاند."
                        ]
                    }

                ]

            },


            /* -------------------------
               جلسه ۳
               پا + جلو بازو + شکم
            ------------------------- */

            3: {

                title:
                    "پا + جلو بازو + شکم",

                exercises: [

                    {
                        id: "leg_press",

                        name:
                            "پرس پا",

                        target:
                            "3 × 6–10",

                        rest:
                            "2–3 دقیقه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/leg_press.mp4"
                        ],

                        instructions: [
                            "پاها را با فاصله مناسب روی صفحه قرار بده.",
                            "زانوها را در مسیر پنجه‌ها حرکت بده.",
                            "در پایین حرکت لگن را از پشتی جدا نکن."
                        ]
                    },


                    {
                        id: "smith_squat",

                        name:
                            "اسکوات اسمیت",

                        target:
                            "3 × 8–12",

                        rest:
                            "2–3 دقیقه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/smith-squat.mp4"
                        ],

                        instructions: [
                            "پاها را در وضعیت پایدار زیر میله قرار بده.",
                            "با کنترل زانوها و لگن را خم کن.",
                            "در بالا آمدن زانوها را قفل نکن."
                        ]
                    },


                    {
                        id: "lying_leg_curl",

                        name:
                            "پشت پا خوابیده",

                        target:
                            "3 × 8–12",

                        rest:
                            "90 ثانیه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/lying_leg_curl.mp4"
                        ],

                        instructions: [
                            "لگن را روی دستگاه ثابت نگه دار.",
                            "پاشنه‌ها را به سمت باسن جمع کن.",
                            "در برگشت وزنه را آرام پایین بیاور."
                        ]
                    },


                    {
                        id: "leg_extension",

                        name:
                            "جلو پا دستگاه",

                        target:
                            "2 × 10–15",

                        rest:
                            "90 ثانیه",

                        sets:
                            2,

                        images: [
                            "assets/exercises/leg_extension.mp4"
                        ],

                        instructions: [
                            "زانو را با محور دستگاه هم‌راستا کن.",
                            "پاها را تا نزدیک صاف شدن بالا بیاور.",
                            "در پایین حرکت وزنه را رها نکن."
                        ]
                    },


                    {
                        id: "smith_calf_raise",

                        name:
                            "ساق پا ایستاده اسمیت",

                        target:
                            "3 × 10–15",

                        rest:
                            "60–90 ثانیه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/smith_standing_calf_raise.mp4"
                        ],

                        instructions: [
                            "پنجه‌ها را روی سطح مناسب قرار بده.",
                            "پاشنه‌ها را تا حد مناسب پایین بیاور.",
                            "با فشار عضلات ساق تا بالاترین نقطه بالا برو."
                        ]
                    },


                    {
                        id: "hammer_curl",

                        name:
                            "جلو بازو چکشی دمبل",

                        target:
                            "3 × 8–12",

                        rest:
                            "90 ثانیه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/dumbbell-hammer-curl.mp4"
                        ],

                        instructions: [
                            "کف دست‌ها را رو به یکدیگر نگه دار.",
                            "دمبل را بدون تاب دادن بدن بالا بیاور.",
                            "در پایین حرکت آرنج را کنترل کن."
                        ]
                    },


                    {
                        id: "cable_curl",

                        name:
                            "جلو بازو سیم‌کش",

                        target:
                            "2 × 10–15",

                        rest:
                            "60–90 ثانیه",

                        sets:
                            2,

                        images: [
                            "assets/exercises/cable-curl.mp4"
                        ],

                        instructions: [
                            "آرنج‌ها را کنار بدن ثابت نگه دار.",
                            "دسته را با عضلات جلو بازو بالا بیاور.",
                            "در پایین حرکت کشش را کنترل کن."
                        ]
                    },


                    {
                        id: "plank",

                        name:
                            "پلانک",

                        target:
                            "3 × 30–60 ثانیه",

                        rest:
                            "60 ثانیه",

                        sets:
                            3,

                        images: [
                            "assets/exercises/plank.mp4"
                        ],

                        instructions: [
                            "بدن را از سر تا پاشنه در یک خط نگه دار.",
                            "شکم و باسن را منقبض نگه دار.",
                            "اجازه نده کمر به سمت پایین قوس پیدا کند."
                        ]
                    }

                ]

            }

        }

    }

};