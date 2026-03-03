/* =========================
   i18n.js — AR / EN ONLY (FULL for index + footer)
   - Works with old keys (brandAr, navAbout...) AND new keys (brand.name...)
   - Binds [data-lang="ar|en"] buttons
   - Applies [data-i18n="key"] textContent
   - Saves language in localStorage
========================= */

(function () {
  "use strict";

  const SUPPORTED = ["ar", "en"];
  const DEFAULT_LANG = "ar";
  const STORAGE_KEY = "hoa_lang";

  const DICT = {
    ar: {

      navPress: "الصحافة",
navAuction: "المزاد",
navStore: "المتجر",
navInspect: "فحص وشراء",
navBooking: "الحجز",
navTour: "جولة افتراضية",

      /* ====== Brand (old + new) ====== */
      brandAr: "بيت التحفيات",
      brandEn: "House of Antiques",
      "brand.name": "بيت التحفيات",
      "brand.sub": "House of Antiques",

      /* ====== Nav ====== */
       navHome: "الرئيسية",
      navAbout: "نبذة",
      navExplore: "استكشف",
      navStats: "الأرقام",
      navTimeline: "الخط الزمني",
      navTour: "جولة افتراضية",
      navContact: "تواصل معنا",

      /* ====== Hero ====== */
      heroTopline: "STATUE",
      heroTitleBig1: "بيت التحفيات",
      heroTitleBig2: "ذاكرة بغداد",
      heroLead:
        "بيت بغدادي يجمع التحف النادرة والسجاد والنحاس والخشب والكريستال والأعمال الفنية… بتجربة متحفية فاخرة.",
      ctaExplore: "استكشف الأقسام",
      ctaMore: "اقرأ أكثر",

      heroInfo1K: "ساعات الزيارة",
      heroInfo1V: "حسب الحجز",
      heroInfo2K: "الموقع",
      heroInfo2V: "بغداد",
      heroInfo3K: "جولة 360",
      heroInfo3V: "داخل الموقع",

      /* ====== Entrances ====== */
      entrancesTitle: "بوابات بيت التحفيات",
      entrancesDesc: "اختر طريقك إلى الذاكرة… ولكل باب حكاية.",

      ex1K: "نبذة",
      ex1T: "نبذة عن بيت التحفيات",
      ex1P: "قصة بيت بغدادي جمع التحف النادرة… من ذاكرة العائلة إلى وجهة ثقافية اليوم.",
      ex1M1: "قصة • إرث",
      ex1M2: "قراءة 3 دقائق",
      moreAbout: "المزيد",

      ex2K: "المتجر",
      ex2T: "تسوّق التحف",
      ex2P: "قطع نادرة مختارة بعناية… اكتشف السجاد والنحاس والخشب والكريستال وغيرها.",
      ex2M1: "قطع نادرة",
      ex2M2: "تحديثات مستمرة",
      goStore: "ادخل المتجر",

      ex3K: "الحجز",
      ex3T: "احجز زيارتك",
      ex3P: "زيارة متحفية • تصوير • فعالية خاصة… احجزي بسهولة واختر وقتك.",
      ex3M1: "زيارة • تصوير",
      ex3M2: "حجز سريع",
      goBooking: "اذهب للحجز",

      ex4K: "صحافة",
      ex4T: "تغطيات وأخبار",
      ex4P: "مقالات • فيديو • أرشيف… تابع كل ما كُتب وقيل عن بيت التحفيات.",
      ex4M1: "مقالات",
      ex4M2: "فيديو",
      goPress: "ادخل",

      ex5K: "المزاد",
      ex5T: "المزاد القادم",
      ex5P: "قطع مختارة بعناية تُعرض قبل المزاد… تفاصيل الحضور والحجز قريباً.",
      ex5M1: "عرض مسبق",
      ex5M2: "حجز • تفاصيل",
      goAuction: "تفاصيل المزاد",

      ex6K: "جولة 360",
      ex6T: "جولة افتراضية داخل البيت",
      ex6P: "استكشف المكان قبل الزيارة… جولة تفاعلية داخل بيت التحفيات.",
      ex6M2: "داخل الصفحة",
      goTour: "ابدأ الجولة",

      inspectTitle: "فحص، تقييم وشراء التحف",
inspectDesc: "إذا عندك قطعة أثرية وتريد تقييم احترافي أو ترغب ببيعها... تواصل ويانا، ونرتب الفحص والشراء حسب الحالة والقيمة.",
inspectTags: "تقييم • شراء • واتساب • إيميل",
inspectBtn: "ابدأ الطلب",
inspectBadge: "فحص وشراء",


    dir: "rtl",
    brandTitle: "بيت التحفيات",
    brandSub: "House of Antiques",

    navHome: "الرئيسية",
    navAbout: "نبذة",
    navExplore: "استكشف",
    navTour: "جولة افتراضية",
    navContact: "تواصل",
        langBtn: "EN",


      /* ====== About + Stats ====== */
      aboutTitle: "بيت غنيّ بالتفاصيل",
      aboutDesc: "من متجر أنتيك إلى وجهة متحفية وثقافية…",
      s1: "عمر البيت (سنة)",
      s2: "عدد الغرف",
      s3: "عدد التحف التقريبي",
      s4: "عدد الزوار التقريبي منذ الثمانينات",
      c1t: "قرن من العمارة البغدادية",
      c1p: "شُيّد بيت التحفيات عام 1920، ويضم 14 غرفة تحيط بحوش بغدادي وحديقة داخلية، محافظًا على طراز العمارة البغدادية الأصيلة بتفاصيلها، ومساحاتها الواسعة، وتوزيعها التقليدي الذي يجعل من البيت نفسه قطعة تراثية حيّة.",
      c2t: "مقتنيات من حول العالم",
      c2p: "أكثر من 12,000 قطعة أنتيك تضم مجموعات بيت التحفيات آلاف القطع النادرة من السجاد، والنحاس، والفضة، والخشب، والكريستال، والأعمال الفنية، جُمعت بعناية على مدى عقود من العراق، والشرق الأوسط، وأوروبا، وآسيا، باقتناء مباشر قائم على المعرفة والتوثيق لا على الصدفة.",
      c3t: "محطة للثقافة والزائرين",
      c3p: "وجهة معروفة منذ الثمانينات استقبل بيت التحفيات منذ ثمانينات القرن الماضي عشرات الآلاف من الزوّار من دبلوماسيين، وسفراء، وباحثين، وسياح من مختلف دول العالم، ليكون محطة ثقافية معروفة لكل من يهتم بالتاريخ، والفن، والاقتناء الأصيل",

      /* ====== Footer (new keys) ====== */
      "footer.cta.title": "جاهز تستكشف بيت التحفيات؟",
      "footer.cta.sub": "احجز زيارتك أو شاهد الجولة الافتراضية",
      "footer.cta.book": "احجز الآن",
      "footer.cta.tour": "الجولة الافتراضية",
      "footer.note":
        "منصة تعريفية ثقافية توثق قصة البيت والعائلة والتحف، وتعرض خدمات الزيارات والفعاليات.",
      "footer.quick": "روابط سريعة",
      "footer.about": "نبذة",
      "footer.press": "الصحافة",
      "footer.store": "المتجر",
      "footer.auction": "المزاد",
      "footer.legal": "القانون والسياسات",
      "footer.terms": "الأحكام",
      "footer.privacy": "الخصوصية",
      "footer.contact": "تواصل",
      "footer.addr": "بغداد — شارع أبو نؤاس",
"footer.copy": "© 2026 بيت التحفيات — جميع الحقوق محفوظة",

/* =========================
   ABOUT PAGE (AR) — ADD
========================= */
"nav.home": "الرئيسية",

"about.title": "بيت التحفيات — ذاكرة بغداد",
"about.mapCta": "موقع البيت على الخريطة",

"about.kicker": "نبذة",
"about.subtitle": "حكاية بيت… وحكاية عائلة",

"about.meta1.label": "المكان",
"about.meta1.value": "بغداد — أبو نؤاس",
"about.meta2.label": "التأسيس",
"about.meta2.value": "1989",
"about.meta3.label": "الطراز",
"about.meta3.value": "بيت بغدادي (1920)",

"about.body1": "بيت التحفيات ليس مجرد مكان لعرض القطع، بل ذاكرة حيّة لبغداد…",

"about.table.key1": "المحتوى",
"about.table.val1": "تحف، سجاد، نحاس، فضة، كريستال، أعمال فنية",
"about.table.key2": "الهوية",
"about.table.val2": "متحف + متجر + قصة عائلة",
"about.table.key3": "الرؤية",
"about.table.val3": "إحياء التراث وإعادة تقديمه بمعايير معاصرة",

"about.chip1": "قصة عائلة",
"about.chip2": "متحف حي",
"about.chip3": "تراث بغداد",

"ui.more": "اكمل القصة",
"ui.less": "إخفاء",

"cta.tour": "الجولة الافتراضية",
"cta.press": "الصحافة",

/* ===== STAGE 0: HOUSE ===== */
"house.kicker": "البيت",
"house.title": "بيت التحفيات",
"house.sub": "بيت بغدادي — 1920",
"house.body": `بيت التحفيات هو دار بغدادية تراثية يعود تاريخ بنائها إلى عام 1920، شُيّدت وفق أسلوب العمارة البغدادية التقليدية الذي كان سائدًا في أوائل القرن العشرين، والمعتمد على الفناء الداخلي (الحوش)، والغرف المحيطة به، واستخدام المواد المحلية مثل الطابوق الفرشي، والخشب الطبيعي، والزخارف اليدوية البسيطة التي تجمع بين الوظيفة والجمال.

في عام 1989، قام طارق الألماني بشراء هذا البيت التراثي، ليحوّله من مسكن قديم إلى مشروع ثقافي متكامل، حيث أُعيد تأهيله بعناية ليصبح متحفًا ومحلًا متخصصًا بالتحف (أنتيك)، محافظًا في الوقت نفسه على هوية المبنى الأصلية دون تشويه أو تغيير جوهري في معالمه المعمارية.

يمتد بيت التحفيات على مساحة واسعة تضم 14 غرفة موزعة حول حوش بغدادي داخلي وحديقة، وهو توزيع يعكس النمط السكني التقليدي لبيوت بغداد القديمة، حيث كانت الخصوصية، والتهوية الطبيعية، والإنارة، عناصر أساسية في التصميم. وتتميّز الغرف بارتفاع أسقفها، وتنوّع استخداماتها، مما أتاح تحويلها لاحقًا إلى مساحات عرض مختلفة للقطع الفنية والتحف.

يحتوي البيت على مجموعات متنوعة من التحف تشمل السجاد، النحاسيات، الفضة، الأعمال الخشبية، الكريستال، والقطع الفنية النادرة، جرى عرضها بما يتناسب مع طبيعة المكان، بحيث يكون البيت نفسه جزءًا من تجربة العرض، لا مجرد حاوية للقطع.

بيت التحفيات ليس مبنى حديثًا أُعد للعرض، بل بيت تاريخي أُعيد توظيفه ثقافيًا، ليشكّل نموذجًا حيًا لدمج العمارة التراثية مع وظيفة المتحف والمتجر، محافظًا على ذاكرة المكان، ومقدّمًا نموذجًا أصيلًا لبيوت بغداد في القرن الماضي.`,

"house.m1k": "الموقع",
"house.m1v": "شارع أبو نؤاس",
"house.m2k": "محطة",
"house.m2v": "1989 — افتتاح البيت",

/* ===== STAGE 1: GRANDFATHER ===== */
"grand.kicker": "المؤسس",
"grand.title": "محمد علي طاهر الجزراوي الملقب بالألماني",
"grand.sub": "1896 — 1988",
"grand.body": `محمد علي طاهر الجزراوي، المعروف بلقب الألماني، يُعد من أبرز تجّار التحف في العراق في القرن العشرين، وقد ارتبط اسمه بعالم التراث والاقتناء المعرفي ارتباطًا وثيقًا، حتى أصبح مرجعًا في هذا المجال.

وُلد عام 1896 في جزيرة ابن عمر (جزيرة بوطان) التابعة حاليًا لتركيا، ونشأ في بيئة علمية، حيث تلقّى تعليمه في كردستان، وختم القرآن الكريم، وتعلّم على أيدي عدد من علماء الدين المعروفين في زمانه. ومنذ شبابه، عُرف بحبّه للعلم والمعرفة، فتنقّل بين القرى والأرياف باحثًا عن التعلم واكتساب الخبرة، قبل أن يشدّ الرحال إلى بغداد، حيث استقر في جامع الإمام أبي حنيفة النعمان، وكان طالبًا مجتهدًا ومثابرًا.

امتلك الجد محمد علي طاهر معرفة واسعة بعدة لغات، إذ أتقن اللغة التركية، والفارسية، والإنكليزية، إلى جانب العربية والكردية بلهجاتها، وهو ما ساعده على الاطلاع على ثقافات متعددة، وفهم أعمق للتاريخ والآثار، ومكّنه من التواصل مع تجّار ومقتنين من خلفيات مختلفة.

بدأ شغفه الحقيقي بعالم التحف من جمع السجاد والتحف القديمة، ثم تطوّر هذا الشغف إلى تجارة حقيقية اتخذها مهنة ومصدر رزق، دون أن يفقد بعدها المعرفي. لم يكن جمعه للتحف بدافع التجارة فقط، بل كان قائمًا على المعرفة، والتوثيق، وحفظ القيمة التاريخية، ولذلك عُدّ من أوائل روّاد هذا المجال في العراق.

امتلك ذاكرة استثنائية، وقدرة دقيقة على تمييز القطع، ومعرفة أعمارها، ومناشئها، وتاريخ تداولها، حتى أنه كان يعرف من اقتنى القطعة ومن باعها وفي أي فترة، وهي قدرة نادرة جعلته محل ثقة واحترام واسعَين. وكان معروفًا بتواضعه، وبشغفه الدائم بالحديث عن التحف، وتفاصيلها، وقصصها، دون كلل أو ملل، حتى في أواخر أيامه.

إلى جانب ذلك، كان ملمًّا بعدد كبير من الصناعات والحرف اليدوية الشعبية، ويدرك قيمتها المادية والتاريخية، ويرى فيها جزءًا أساسيًا من هوية المجتمع وذاكرته. وقد انعكس هذا الوعي في طريقته في الاقتناء، حيث لم يكن ينظر إلى القطعة كغرض، بل كوثيقة حيّة.

وكان من أحلامه أن تتحوّل التحف إلى واجهة ثقافية وسياحية، تحفظ التراث وتعرّف به، وقد عبّر عن ذلك بقوله إنه لو امتلك الإمكانيات، لأسّس دارًا واسعة تكون واجهة سياحية مهمّة تليق بقيمة هذا الإرث.

اليوم، يُعد محمد علي طاهر الجزراوي (الألماني) أحد الأسماء المؤسسة في تاريخ تجارة التحف في العراق، ورمزًا للمعرفة المرتبطة بالتراث، وقد شكّل إرثه الأساس الذي بُني عليه ما أصبح لاحقًا بيت التحفيات، استمرارًا لحلمٍ بدأه بعلم، وكرّسه بشغف، وتركه أمانةً للأجيال من بعده.`,

"grand.m1k": "محطة",
"grand.m1v": "محلات خان البغدادي",
"grand.m2k": "الأمنية",
"grand.m2v": "“لو كنت صاحب ثروة…”",

/* ===== STAGE 2: FATHER ===== */
"father.kicker": "الامتداد العملي لإرث التحف",
"father.title": "طارق محمد علي الألماني",
"father.sub": "1954 — 2014",
"father.body": `نشأ طارق الألماني في بيئة ارتبطت بالتحف منذ طفولته المبكرة، حيث كان ملازمًا لوالده، التاجر والباحث في عالم التراث محمد علي طاهر الجزراوي (الألماني). لم تكن التحف بالنسبة له عالمًا طارئًا أو هواية لاحقة، بل جزءًا من الحياة اليومية، تعلّم تفاصيله من الممارسة المباشرة لا من الكتب وحدها.

منذ سنواته الأولى، رافق والده في الأسواق، والمنازل القديمة، ومجالس التجّار، وتعرّف عن قرب على أساليب اقتناء القطع، وطرق تمييزها، وقيمتها التاريخية، وأصول صناعتها. هذا الاحتكاك المبكر كوّن لديه خبرة تراكمية، جعلته يفهم عالم الأنتيك كمنظومة متكاملة تشمل المعرفة، والذوق، والمسؤولية تجاه التراث.

قبل امتلاكه بيت التحفيات، كان لطارق الألماني محلات متخصصة بالأنتيك في منطقة الميدان، إحدى أبرز مناطق بغداد التجارية والتراثية، حيث مارس العمل بشكل مستقل، وبنى سمعة معروفة بين التجّار والمهتمين. وقد عُرف بلقب الألماني استمرارًا للقب والده، ليصبح الاسم علامة مرتبطة بالثقة والمعرفة في مجال التحف.

تعلّم طارق الألماني على يد والده أسس التعامل مع القطع النادرة، وأهمية حفظها، وعدم التفريط بقيمتها التاريخية مقابل الربح السريع. كما تعرّف على تنوّع المدارس الفنية، والحرف اليدوية، والمواد المستخدمة في السجاد، والنحاس، والفضة، والخشب، والكريستال، وغيرها من الأصناف التي شكّلت لاحقًا نواة مجموعاته الخاصة.

مع تقدّمه في العمر، لم يكتفِ بدور المرافق أو التلميذ، بل بدأ بممارسة التقييم والاقتناء بنفسه، مستفيدًا من إرث معرفي متين وتجربة عملية طويلة. وبمرور الوقت، تشكّلت لديه شخصية مستقلة في عالم التحف، تجمع بين احترام الأصل والقدرة على التوسّع المدروس.

في عام 1989، شكّل شراءه للبيت التراثي وتحويله إلى بيت التحفيات نقطة تحوّل مفصلية في مسيرته، حيث انتقل من المحلات التجارية إلى مشروع ثقافي ومعرفي واضح المعالم، يجمع بين المتحف والمتجر، ويضع التحف في سياق معماري يليق بقيمتها التاريخية. وقد حافظ في هذا المشروع على روح البيت البغدادي، وعلى فلسفة والده في الجمع بين المعرفة والحفظ، دون الإخلال بهوية المكان.

استمر بيت التحفيات في عهد طارق الألماني كمركز معروف لاقتناء وعرض التحف حتى عام 2004، حين توقّف العمل به نتيجة الظروف التي مرّ بها العراق آنذاك.

تمثّل تجربة طارق الألماني حلقة الوصل بين الجيل المؤسّس والجيل اللاحق، إذ لم يكن مجرد وريث لمجموعة تحف، بل حاملًا لاسمٍ وتجربةٍ ومعرفةٍ متراكمة، أسهمت في ترسيخ مكانة بيت التحفيات كعنوان معروف في عالم الأنتيك في بغداد.`,

"father.m1k": "محطة",
"father.m1v": "1989 — شراء البيت",
"father.m2k": "عصر",
"father.m2v": "1989–2004 — ازدهار البيت",

/* ===== STAGE 3: AZAD ===== */
"azad.kicker": "الجيل الثالث",
"azad.title": "أزاد طارق محمد علي الألماني",
"azad.sub": "إحياء البيت — 2022",
"azad.body": `يُمثّل أزاد طارق الألماني الجيل الثالث في مسيرة عائلة الألماني في عالم التحف، وهو الامتداد الذي أعاد وصل الماضي بالحاضر بعد مرحلة انقطاع طويلة فرضتها الظروف.

وُلد أزاد عام 1987، وهو نفس العام الذي تحوّل فيه البيت التراثي إلى بيت التحفيات، ما جعل طفولته وذكرياته الأولى مرتبطة بالمكان بشكل مباشر. قضى سنواته الأولى داخل البيت، مرافقًا لوالده طارق الألماني، ومتعرّفًا منذ الصغر على القطع، والغرف، والحوش البغدادي، وطريقة عرض التحف، وهو ما شكّل وعيه المبكر بقيمة المكان قبل أن يدرك أبعاده الثقافية.

في عام 2004، أُغلق بيت التحفيات نتيجة الحرب والظروف الأمنية التي مرّ بها العراق، وتوقّف المشروع رغم مكانته المعروفة آنذاك. وبعد سنوات، وتحديدًا مع وفاة والده في عام 2014، أصبحت مسؤولية الإرث معلّقة بين الذاكرة والواقع، في وقت كان أزاد يعيش خارج العراق.

تنقّل أزاد بين الولايات المتحدة ومصر، حيث عمل كـمنتج في مصر، ورجل أعمال في كل من أمريكا ومصر، مكتسبًا خبرة عملية في الإدارة، والإنتاج، وبناء المشاريع، بعيدًا عن عالم التحف بشكل مباشر، لكن دون أن ينقطع عن جذوره الثقافية.

لاحقًا، عاد أزاد إلى بغداد بدافع إعادة إحياء بيت التحفيات، لا كمشروع جديد، بل كمكان له تاريخ وهوية. عمل على ترميم البيت مع الحفاظ الكامل على شكله المعماري الأصلي، واحترام تفاصيله البغدادية، وفي الوقت نفسه أضاف لمسة معاصرة مدروسة في أسلوب العرض والتنظيم، بما ينسجم مع متطلبات الحاضر دون المساس بروح المكان.

لم تقتصر جهوده على الترميم فقط، بل استمر في اقتناء وشراء القطع النادرة، وتوسيع المجموعة بما يحافظ على مستوى البيت وقيمته التاريخية، مستندًا إلى الإرث المعرفي الذي نشأ عليه، وإلى خبرته العملية في إدارة المشاريع.

يمثّل أزاد طارق الألماني مرحلة التحوّل من الحفظ إلى الإحياء، حيث لم يكن هدفه إعادة فتح المكان فحسب، بل إعادة تعريف بيت التحفيات كمساحة ثقافية حيّة، تستند إلى تاريخ يمتد لثلاثة أجيال، وتخاطب الحاضر بلغة معاصرة، دون أن تنفصل عن جذورها.`,

"azad.m1k": "",
"azad.m1v": "",
"azad.m2k": "",
"azad.m2v": "2022 — ترميم وإعادة فتح",

"today.kicker": "اليوم",
"today.title": "البيت اليوم",
"today.body": "اليوم، بيت التحفيات لم يعد مجرد ذاكرة محفوظة، بل مساحة حيّة تستقبل الزائر، تحكي قصة بغداد عبر التحف، وتفتح أبوابها لجيل جديد يرى في التراث مستقبلًا، لا ماضيًا فقط.",
"today.cta.tour": "الجولة الافتراضية لبيت التحفيات",
"today.cta.press": "الصحافة والتغطيات",

"today.slider.prev": "السابق",
"today.slider.next": "التالي",
"today.slider.open": "فتح الصورة",
"today.slider.alt": "صورة من بيت التحفيات",
"today.slider.dots": "مؤشر الصور",

"today.lightbox.close": "إغلاق",
"today.lightbox.alt": "صورة مكبرة",

/* ====== Auction page ====== */
"auction.label1": "المزاد",
"auction.label2": "النص",

"auction.big": "مزاد الطارق — قريبًا",
"auction.mid": "تجربة مزايدة حصرية على قطع نادرة تحمل ذاكرة بغداد",
"auction.btn": "منصة المزاد",

"auction.s1": "أعمال نادرة · قطع أصلية · اختيار دقيق",
"auction.s2": "تحف · لوحات · مقتنيات تاريخية",
"auction.s3": "ومزايدة مباشرة في بث حي",
"auction.s4": "قطع مختارة بعناية",
"auction.phone": "+964 777 704 5599",
"auction.addr": "بغداد - شارع أبو نؤاس",

      /* =========================
         Brand (support BOTH styles)
      ========================= */
      "brandAr": "بيت التحفيات",
      "brandEn": "House of Antiques",

      "brand.ar": "بيت التحفيات",
      "brand.en": "House of Antiques",

      /* =========================
         Nav
      ========================= */
      "nav.home": "الرئيسية",
      "nav.about": "نبذة",
      "nav.press": "الصحافة",
      "nav.tour": "الجولة",
      "nav.contact": "تواصل",

      /* ARIA (optional) */
      "lang.switch": "تبديل اللغة",
      "nav.homeAria": "العودة للرئيسية",
      "nav.main": "التنقل الرئيسي",

      /* =========================
         Press — Hero
      ========================= */
     "press.tabTitle": "الصحافة | بيت التحفيات",

"press.heroAria": "مقدمة الصحافة",
"press.heroTitle": "ما كتبته الصحف والمجلات عن بيت التحفيات",
"press.heroSub": "مقالات • لقاءات • أرشيف… توثيق بصري مرتب",
"press.heroCta1": "ابدأ الأرشيف",
"press.heroCta2": "تواصل",

      /* some versions use press.desc, others press.heroDesc */
      "press.desc":
        "هنا نعرض ما نُشر عن بيت التحفيات في الصحف والمجلات عبر السنين: عناوين، تواريخ، وصور مواد أصلية.",
      "press.heroDesc":
        "هنا نعرض ما نُشر عن بيت التحفيات في الصحف والمجلات عبر السنين: عناوين، تواريخ، وصور مواد أصلية.",

      /* =========================
         Press — Filters / chips
      ========================= */
      "press.controlsAria": "أدوات التصفية",
      "press.searchPh": "ابحث باسم الجريدة… عنوان… سنة…",
      "press.hintKey": "نصيحة",
      "press.hintText": "اضغط على أي مادة لعرضها بحجم كامل.",

      /* some versions use press.yearTitle, others press.year */
      "press.yearTitle": "السنة",
      "press.year": "السنة",
      "press.yearFilterAria": "تصفية حسب السنة",

      /* =========================
         Press — Grid titles
      ========================= */
      /* some versions use itemsTitle/itemsSub */
      "press.itemsTitle": "المواد الصحفية",
      "press.itemsSub": "شبكة عرض متحفية — فهرسة + بحث سريع",

      /* some versions use materialsTitle/materialsSub */
      "press.materialsTitle": "المواد الصحفية",
      "press.materialsSub": "شبكة عرض متحفية — فهرسة + بحث سريع",

      /* =========================
         Press — Brochures section
      ========================= */
      "press.brochuresAria": "أرشيف البروشورات المطبوعة",
      "press.printedArchive": "أرشيف مطبوع",
      "press.brochuresTitle": "بروشورات بيت التحفيات",
      "press.brochuresSpan": "الثمانينات — التسعينات — 2001",
      "press.brochuresDesc":
        "يضم أرشيف بيت التحفيات ثلاث بروشورات مطبوعة فقط، تم إصدارها في فترات زمنية مختلفة: الأولى في الثمانينات، الثانية في التسعينات، والثالثة في عام 2001. هذه المطبوعات لم تكن دعائية فقط، بل وثائق تعريفية رافقت تطوّر هوية بيت التحفيات عبر العقود.",

      "press.b1.year": "الثمانينات",
      "press.b1.title": "بروشور بيت التحفيات — إصدار أول",
      "press.b1.desc":
        "وثيقة تعريفية مبكرة تسبق مرحلة الانتشار الواسع للمطبوعات الثقافية، وتظهر كيف كان بيت التحفيات يقدم نفسه كوجهة مختلفة داخل بغداد.",
      "press.b1.body":
        "وثيقة تعريفية مبكرة تسبق مرحلة الانتشار الواسع للمطبوعات الثقافية، وتظهر كيف كان بيت التحفيات يقدم نفسه كوجهة مختلفة داخل بغداد.",
      "press.b1.alt": "بروشور بيت التحفيات — الثمانينات",

      "press.b2.year": "التسعينات",
      "press.b2.title": "بروشور بيت التحفيات",
      "press.b2.desc":
        "أحد البروشورات الأصلية التي طُبعت للتعريف ببيت التحفيات، عندما كان التوثيق الورقي هو الوسيلة الأهم لحفظ هوية المكان.",
      "press.b2.body":
        "أحد البروشورات الأصلية التي طُبعت للتعريف ببيت التحفيات، عندما كان التوثيق الورقي هو الوسيلة الأهم لحفظ هوية المكان.",
      "press.b2.alt": "بروشور بيت التحفيات — التسعينات",

      "press.b3.year": "2001",
      "press.b3.title": "بروشور بيت التحفيات — إصدار 2001",
      "press.b3.desc":
        "إصدار يوثّق مرحلة أكثر نضجًا في تقديم بيت التحفيات، ويعكس تطور لغة العرض والاهتمام بتفاصيل الهوية البغدادية.",
      "press.b3.body":
        "إصدار يوثّق مرحلة أكثر نضجًا في تقديم بيت التحفيات، ويعكس تطور لغة العرض والاهتمام بتفاصيل الهوية البغدادية.",
      "press.b3.alt": "بروشور بيت التحفيات — 2001",

      /* =========================
   Press — Newspapers (Grid)
========================= */
"press.n1.title": "رجل مهنته البحث عن الحلي القديمة",
"press.n1.source": "جريدة التآخي — الخميس 22 تموز 1971",

"press.n2.title": "الزمن والأشياء في بيت التحفيات",
"press.n2.source": "جريدة الجمهورية — الخميس 23 آب 1973",

"press.n3.title": "وفاءً لأمنية والده أقام بيت التحفيات",
"press.n3.source": "جريدة الثورة — الخميس 1 حزيران 1989",

"press.n4.title": "بيت أم متحف للتحفيات البغدادية؟",
"press.n4.source": "جريدة الجمهورية — السبت 14 تشرين الأول 1989",

"press.n5.title": "متحف صغير لبيع مخلفات الماضي الجميل",
"press.n5.source": "جريدة النداء (الكويت) — كانون الأول 1990",

"press.n6.title": "حوار مجلة ألف باء مع الحفيدة هندرين طارق الألماني (مقتطف)",
"press.n6.source": "Issue No. 1786 — Wednesday, December 18, 2002",

"press.n7.title": "أخيراً… أصبحت الآثار موطنها بغداد",
"press.n7.source": "مجلة بغداد (باللغة الفرنسية) — لقاء مع طارق محمد علي",

"press.n8.title": "البيوت القديمة تحولت إلى متاحف — بغداد ترد الصفعة لهولاكو",
"press.n8.source": "مجلة/جريدة الحوادث",

"press.n9.title": "كتاب ألماني عن العراق يذكر بيت التحفيات كواجهة سياحية",
"press.n9.source": "كتاب باللغة الألمانية عن العراق",
      /* =========================
         Press — Lightbox
      ========================= */
      "press.lbAria": "عرض مادة صحفية",
      "press.lbClose": "إغلاق",
      "press.lbImgAlt": "مادة صحفية",
      "press.lbDetails": "تفاصيل",

      /* =========================
         Press — Footer (simple footer style)
      ========================= */
      "press.footerT1": "بيت التحفيات — أرشيف الصحافة",
      "press.footerT2": "إذا عندك نسخة نادرة أو قصاصة تخص البيت، راسلنا لإضافتها للأرشيف.",

      /* =========================
         Site Footer (if your press page uses the big site footer keys)
      ========================= */
      "footer.cta.title": "جاهز تستكشف بيت التحفيات؟",
      "footer.cta.sub": "احجز زيارتك أو شاهد الجولة الافتراضية",
      "footer.cta.book": "احجز الآن",
      "footer.cta.tour": "الجولة الافتراضية",

      "footer.note":
        "منصة تعريفية ثقافية توثق قصة البيت والعائلة والتحف، وتعرض خدمات الزيارات والفعاليات.",
      "footer.addr": "بغداد — شارع أبو نؤاس",
      "footer.quick": "روابط سريعة",
      "footer.about": "نبذة",
      "footer.press": "الصحافة",
      "footer.tour": "الجولة",
      "footer.home": "الرئيسية",
      "footer.contact": "تواصل معنا",


      /* =========================
   Press — Lightbox
========================= */
"press.lbAria": "عرض مادة صحفية",
"press.lbClose": "إغلاق",
"press.lbImgAlt": "مادة صحفية",
"press.lbDetails": "تفاصيل",

/* =========================
   Press — Footer (simple footer style)
========================= */
"press.footerT1": "بيت التحفيات — أرشيف الصحافة",
"press.footerT2": "إذا عندك نسخة نادرة أو قصاصة تخص البيت، راسلنا لإضافتها للأرشيف.",

/* =========================
   Site Footer (big site footer keys)
========================= */
"footer.cta.title": "جاهز تستكشف بيت التحفيات؟",
"footer.cta.sub": "احجز زيارتك أو شاهد الجولة الافتراضية",
"footer.cta.book": "احجز الآن",
"footer.cta.tour": "الجولة الافتراضية",

"footer.note":
  "منصة تعريفية ثقافية توثق قصة البيت والعائلة والتحف، وتعرض خدمات الزيارات والفعاليات.",
"footer.addr": "بغداد — شارع أبو نؤاس",
"footer.quick": "روابط سريعة",
"footer.about": "نبذة",
"footer.press": "الصحافة",
"footer.tour": "الجولة",
"footer.home": "الرئيسية",
"footer.contact": "تواصل معنا",

/* ===== TOUR PAGE (AR) ===== */
"tour.pageTitle": "الجولة الافتراضية | بيت التحفيات",
"tour.kicker": "360° • تجربة تفاعلية",
"tour.title": "الجولة الافتراضية",
"tour.sub": "استكشف بيت التحفيات داخل بغداد بتجربة تفاعلية سلسة.",
"tour.enter": "دخول الجولة",
"tour.startTitle": "ابدأ التجربة",
"tour.startSub": "إذا كان الإنترنت ضعيف: انتظر ثواني… التجربة تحمل تلقائياً.",
"tour.backTop": "⬆ رجوع للأعلى",
   

    "legal.terms.tabTitle": "الأحكام والشروط | بيت التحفيات",
"legal.terms.metaDesc": "الأحكام والشروط الخاصة بموقع بيت التحفيات.",
"legal.terms.title": "الأحكام والشروط",
"legal.terms.intro": "باستخدامك لموقع بيت التحفيات فإنك توافق على هذه الأحكام. إذا لا توافق، رجاءً لا تستخدم الموقع.",
"legal.terms.scopeP": "موقع بيت التحفيات منصة تعريفية ثقافية وسياحية توثق قصة البيت والعائلة والتحف، وقد تتضمن صفحات للتواصل والحجز وعرض جولة افتراضية وخدمات مرتبطة بالمكان.",
"legal.terms.acceptLi1": "استخدامك للموقع يعني موافقتك على هذه الأحكام بالكامل.",
"legal.terms.acceptLi2": "إذا لم توافق على أي بند، يرجى التوقف عن استخدام الموقع.",
"legal.terms.acceptLi3": "قد نُحدّث هذه الأحكام من وقت لآخر، واستمرار الاستخدام بعد التحديث يعد قبولًا لها.",
"legal.terms.contentTitle": "طبيعة المحتوى",
"legal.terms.contentLi1": "المحتوى تعريفي/ثقافي وقد يتضمن معلومات تاريخية، وصفًا للقطع، وصورًا أو مواد أرشيفية.",
"legal.terms.contentLi2": "المحتوى ليس استشارة قانونية أو أكاديمية أو تقييمًا احترافيًا ملزمًا.",
"legal.terms.contentLi3": "قد تُحدَّث بعض المعلومات عند توفر مصادر أدق أو توثيق إضافي.",
"legal.terms.ipTitle": "الملكية الفكرية",
"legal.terms.ipLi1": "النصوص، التصاميم، الهوية البصرية، وتنسيق الموقع مملوكة لبيت التحفيات أو مستخدمة بإذن.",
"legal.terms.ipLi2": "يُمنع النسخ أو إعادة النشر أو الاستخدام التجاري لأي جزء دون موافقة خطية مسبقة.",
"legal.terms.ipLi3": "يُسمح بمشاركة الروابط والاقتباس غير التجاري ضمن حدود عادلة مع ذكر المصدر بوضوح.",
"legal.terms.userConductTitle": "سلوك المستخدم",
"legal.terms.userConductLi1": "يُمنع محاولة اختراق الموقع أو تعطيله أو العبث بمحتواه أو استغلال الثغرات.",
"legal.terms.userConductLi2": "يُمنع انتحال صفة بيت التحفيات أو استخدام الاسم/الهوية بشكل مضلل.",
"legal.terms.userConductLi3": "يُمنع إرسال محتوى مسيء أو غير قانوني عبر نماذج التواصل.",
"legal.terms.linksTitle": "روابط وخدمات خارجية",
"legal.terms.linksP": "قد يحتوي الموقع على روابط لمصادر خارجية (مثل منصات التواصل أو أدوات حجز أو جولة افتراضية). بيت التحفيات غير مسؤول عن محتوى تلك المواقع أو سياساتها، ويُنصح بمراجعة شروطهم وسياساتهم.",
"legal.terms.disclaimerTitle": "إخلاء المسؤولية وحدودها",
"legal.terms.disclaimerLi1": "نُقدّم الموقع ومحتواه “كما هو” دون ضمانات مطلقة من حيث الدقة أو الاستمرارية أو الملاءمة لغرض محدد.",
"legal.terms.disclaimerLi2": "لا نتحمل مسؤولية أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو الاعتماد على محتواه.",
"legal.terms.disclaimerLi3": "قد يتوقف الموقع مؤقتًا لأسباب تقنية أو صيانة أو تحديثات دون إشعار مسبق.",
"legal.terms.changesP": "قد نقوم بتحديث هذه الأحكام عند الحاجة. سيتم نشر النسخة المحدثة على هذه الصفحة مع تحديث تاريخ “آخر تحديث”.",

"legal.privacy.tabTitle": "سياسة الخصوصية | بيت التحفيات",
"legal.privacy.metaDesc": "سياسة الخصوصية الخاصة بموقع بيت التحفيات.",
"legal.privacy.title": "سياسة الخصوصية",
"legal.privacy.intro": "توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات عند استخدام موقع بيت التحفيات.",
"legal.privacy.scopeTitle": "نطاق هذه السياسة",
"legal.privacy.scopeP": "تنطبق هذه السياسة على موقع بيت التحفيات وخدماته الرقمية (مثل صفحات المحتوى، نماذج التواصل أو الحجز إن وُجدت، وروابط الجولات/المنصات المرتبطة بالموقع).",
"legal.privacy.dataTitle": "المعلومات التي قد نجمعها",
"legal.privacy.dataLi1": "معلومات تقدمها أنت طوعًا: الاسم، رقم الهاتف، البريد الإلكتروني، ومحتوى الرسالة عند التواصل أو طلب حجز.",
"legal.privacy.dataLi2": "بيانات تقنية أساسية: نوع المتصفح، الجهاز، الصفحات الأكثر زيارة، وعناوين IP بشكل عام لأغراض أمنية وتحليلية.",
"legal.privacy.dataLi3": "معلومات الحجز (إن وُجدت): موعد مقترح، عدد الزوار، وملاحظات تنظيمية يقدمها المستخدم.",
"legal.privacy.useTitle": "كيف نستخدم المعلومات",
"legal.privacy.useLi1": "للرد على الاستفسارات والرسائل وتقديم الدعم.",
"legal.privacy.useLi2": "لتنظيم الحجوزات أو المواعيد وتأكيدها عند توفرها.",
"legal.privacy.useLi3": "لتحسين تجربة المستخدم وجودة المحتوى وأداء الموقع.",
"legal.privacy.useLi4": "لأغراض أمنية: منع إساءة الاستخدام، اكتشاف الأنشطة غير المصرح بها، وحماية الموقع.",
"legal.privacy.legalBasisTitle": "المبدأ والأساس",
"legal.privacy.legalBasisP": "نعتمد مبدأ “الحد الأدنى من البيانات”: نجمع فقط ما يلزم للتواصل أو لتقديم الخدمة التي طلبتها. لا نستخدم بياناتك للإعلانات المستهدفة أو البيع للغير.",
"legal.privacy.sharingTitle": "مشاركة البيانات",
"legal.privacy.sharingP": "لا نبيع بيانات المستخدم ولا نؤجرها. قد نشارك حدًا أدنى من البيانات مع مزودي خدمات موثوقين عند الضرورة التقنية فقط (مثل الاستضافة، البريد الإلكتروني، التحليلات، أو أدوات النماذج/الحجز) وبالقدر اللازم لتشغيل الخدمة.",
"legal.privacy.cookiesTitle": "الكوكيز والتحليلات",
"legal.privacy.cookiesP": "قد نستخدم ملفات تعريف الارتباط وتقنيات مشابهة لتحسين الأداء وفهم تفاعل الزوار. يمكنك التحكم بالكوكيز من إعدادات المتصفح. تعطيلها قد يؤثر على بعض الوظائف.",
"legal.privacy.securityTitle": "حماية البيانات",
"legal.privacy.securityP": "نتخذ إجراءات تقنية وتنظيمية معقولة لحماية البيانات من الوصول غير المصرح به أو التعديل أو الإفشاء. ومع ذلك، لا توجد وسيلة إلكترونية تضمن حماية مطلقة 100%.",
"legal.privacy.retentionTitle": "الاحتفاظ بالبيانات",
"legal.privacy.retentionP": "نحتفظ بالمعلومات للمدة اللازمة لتحقيق الغرض الذي جُمعت من أجله (مثل إكمال تواصل أو حجز)، ثم نحذفها أو نقللها قدر الإمكان ما لم يتطلب القانون خلاف ذلك.",
"legal.privacy.rightsTitle": "حقوق المستخدم",
"legal.privacy.rightsP": "يمكنك طلب الوصول إلى بياناتك التي زودتنا بها أو تعديلها أو حذفها عبر قنوات التواصل الرسمية في الموقع. سنستجيب خلال مدة معقولة حسب طبيعة الطلب والأنظمة المطبقة.",
"legal.privacy.childrenTitle": "خصوصية الأطفال",
"legal.privacy.childrenP": "لا نستهدف جمع بيانات الأطفال بشكل مقصود. إذا تم تزويدنا بمعلومات تخص طفل دون قصد، يمكن لولي الأمر التواصل معنا لطلب حذفها.",
"legal.privacy.externalTitle": "روابط خارجية",
"legal.privacy.externalP": "قد يحتوي الموقع على روابط لمنصات أو مواقع خارجية. لسنا مسؤولين عن محتواها أو سياسات خصوصيتها، ويُنصح بمراجعتها بشكل مستقل.",
"legal.privacy.changesP": "قد نقوم بتحديث هذه السياسة عند الحاجة. سيتم نشر النسخة المحدثة هنا ويُعد استمرار استخدام الموقع بعد التحديث موافقة على التغييرات.",

"legal.common.scopeTitle": "نطاق الموقع",
"legal.common.acceptTitle": "القبول واستخدام الموقع",
"legal.common.changesTitle": "التعديلات",
"legal.common.contactTitle": "التواصل",
"legal.common.contactP": "لأي استفسار بخصوص الخصوصية أو الأحكام أو البيانات، تواصل معنا عبر البريد أو واتساب الموجودين في الموقع.",
"legal.common.lastUpdated": "آخر تحديث: 2026",
"legal.common.location": "الموقع: بغداد — شارع أبو نؤاس",
"legal.common.backHome": "رجوع للرئيسية"
   },  

    en: {
      navPress: "Press",
navAuction: "Auction",
navStore: "Store",
navInspect: "Inspection",
navBooking: "Booking",
navTour: "Virtual Tour",
      /* ====== Brand (old + new) ====== */
      brandAr: "House of Antiques",
      brandEn: "House of Antiques",
      "brand.name": "House of Antiques",
      "brand.sub": "House of Antiques",

      /* ====== Nav ====== */
      navHome: "Home",
      navAbout: "About",
      navExplore: "Explore",
      navStats: "Stats",
      navTimeline: "Timeline",
      navTour: "Virtual Tour",
      navContact: "Contact",

      /* ====== Hero ====== */
      heroTopline: "STATUE",
      heroTitleBig1: "House of Antiques",
      heroTitleBig2: "Baghdad’s Memory",
      heroLead:
        "A Baghdadi house that gathers rare antiques, rugs, brass, wood, crystal, and artworks… in a refined museum-like experience.",
      ctaExplore: "Explore Sections",
      ctaMore: "Read More",

      heroInfo1K: "Visiting Hours",
      heroInfo1V: "By booking",
      heroInfo2K: "Location",
      heroInfo2V: "Baghdad",
      heroInfo3K: "360 Tour",
      heroInfo3V: "On-site",

      /* ====== Entrances ====== */
      entrancesTitle: "House of Antiques Gates",
      entrancesDesc: "Choose your path into memory… every gate has a story.",

      ex1K: "About",
      ex1T: "About the House",
      ex1P: "A Baghdadi house that gathered rare pieces… from family memory to a cultural destination today.",
      ex1M1: "Story • Heritage",
      ex1M2: "3 min read",
      moreAbout: "More",

      ex2K: "Store",
      ex2T: "Shop Antiques",
      ex2P: "Curated rare pieces… discover rugs, brass, wood, crystal, and more.",
      ex2M1: "Rare items",
      ex2M2: "Ongoing updates",
      goStore: "Enter Store",

      ex3K: "Booking",
      ex3T: "Book Your Visit",
      ex3P: "Museum visit • Photoshoot • Private event… book easily and pick your time.",
      ex3M1: "Visit • Photoshoot",
      ex3M2: "Fast booking",
      goBooking: "Go to Booking",

      ex4K: "Press",
      ex4T: "Coverage & News",
      ex4P: "Articles • Video • Archive… follow what’s been written and said about the House.",
      ex4M1: "Articles",
      ex4M2: "Video",
      goPress: "Enter",

      ex5K: "Auction",
      ex5T: "Upcoming Auction",
      ex5P: "Carefully selected items shown before the auction… attendance & booking details soon.",
      ex5M1: "Preview",
      ex5M2: "Booking • Details",
      goAuction: "Auction Details",

      ex6K: "360 Tour",
      ex6T: "Virtual Tour Inside",
      ex6P: "Explore before you visit… an interactive tour inside the House.",
      ex6M2: "In-page",
      goTour: "Start Tour",

      inspectTitle: "Inspection, Evaluation & Purchase",
inspectDesc: "If you own an antique piece and want a professional evaluation or wish to sell it, contact us. We arrange inspection and purchase based on condition and value.",
inspectTags: "Evaluation • Purchase • WhatsApp • Email",
inspectBtn: "Start Request",
inspectBadge: "Inspection",

      /* ====== About + Stats ====== */
      aboutTitle: "A House Rich in Detail",
      aboutDesc: "From an antique store to a museum & cultural destination…",
      s1: "House age (years)",
      s2: "Rooms",
      s3: "Approximate number of antiques",
s4: "Approximate number of visitors since the 1980s",

c1t: "A Century of Baghdadi Architecture",
c1p: "House of Antiques was built in 1920 and consists of 14 rooms surrounding a traditional Baghdadi courtyard and an inner garden. The house preserves the authentic Baghdadi architectural style with its rich details, spacious layout, and traditional distribution, making the building itself a living heritage piece.",

c2t: "Collections from Around the World",
c2p: "More than 12,000 antique pieces form the collections of House of Antiques, including thousands of rare carpets, copper, silver, wood, crystal, and artworks. These items were carefully collected over decades from Iraq, the Middle East, Europe, and Asia through direct acquisition based on knowledge and documentation rather than chance.",

c3t: "A Cultural Destination for Visitors",
c3p: "A well-known destination since the 1980s, House of Antiques has welcomed tens of thousands of visitors, including diplomats, ambassadors, researchers, and tourists from around the world, establishing itself as a recognized cultural stop for those interested in history, art, and authentic collecting.",


 dir: "ltr",
    brandTitle: "House of Antiques",
    brandSub: "بيت التحفيات",

    navHome: "Home",
    navAbout: "About",
    navExplore: "Explore",
    navTour: "Virtual Tour",
    navContact: "Contact",
        langBtn: "AR",

      /* ====== Footer ====== */
      "footer.cta.title": "Ready to explore the House of Antiques?",
      "footer.cta.sub": "Book your visit or view the virtual tour",
      "footer.cta.book": "Book Now",
      "footer.cta.tour": "Virtual Tour",
      "footer.note":
        "A cultural platform documenting the story of the house, the family, and the antiques—plus visits and events.",
      "footer.quick": "Quick Links",
      "footer.about": "About",
      "footer.press": "Press",
      "footer.store": "Store",
      "footer.auction": "Auction",
      "footer.legal": "Legal & Policies",
      "footer.terms": "Terms",
      "footer.privacy": "Privacy",
      "footer.contact": "Contact",
      "footer.addr": "Baghdad — Abu Nuwas St.",
      "footer.copy": "© 2026 House of Antiques — All rights reserved",



      /* =========================
   ABOUT PAGE (EN) — ADD
========================= */
"nav.home": "Home",

"about.title": "House of Antiques — Baghdad’s Memory",
"about.mapCta": "View the House on the Map",

"about.kicker": "About",
"about.subtitle": "A House Story… and a Family Story",

"about.meta1.label": "Location",
"about.meta1.value": "Baghdad — Abu Nuwas",
"about.meta2.label": "Founded",
"about.meta2.value": "1989",
"about.meta3.label": "Style",
"about.meta3.value": "Baghdadi House (1920)",

"about.body1": "The House of Antiques is not merely a place to display pieces—it's a living memory of Baghdad…",

"about.table.key1": "Collections",
"about.table.val1": "Antiques, rugs, brass, silver, crystal, artworks",
"about.table.key2": "Identity",
"about.table.val2": "Museum + Store + A Family Story",
"about.table.key3": "Vision",
"about.table.val3": "Reviving heritage and presenting it with contemporary standards",

"about.chip1": "A family story",
"about.chip2": "A living museum",
"about.chip3": "Baghdad heritage",

"ui.more": "Continue the story",
"ui.less": "Show less",

"cta.tour": "Virtual Tour",
"cta.press": "Press",

/* ===== STAGE 0: HOUSE ===== */
"house.kicker": "The House",
"house.title": "House of Antiques",
"house.sub": "Baghdadi House — 1920",
"house.body": `The House of Antiques is a heritage Baghdadi residence whose construction dates back to 1920. It was built in the traditional Baghdadi architectural style common in the early twentieth century—centered around an inner courtyard, surrounded rooms, and the use of local materials such as baked brick, natural wood, and modest hand-crafted ornamentation that blends function with beauty.

In 1989, Tariq Al-Almani purchased this heritage house and transformed it from an old residence into a complete cultural project. The house was carefully restored to become a museum and a specialized antiques store—while preserving the building’s original identity without distortion or major alteration to its architectural features.

The House spans a generous area that includes 14 rooms arranged around an inner Baghdadi courtyard and a garden—reflecting the classic residential pattern of old Baghdad homes, where privacy, natural ventilation, and daylight were essential design principles. The rooms are characterized by high ceilings and varied uses, which later allowed them to be repurposed into distinct exhibition spaces for artworks and antiques.

The house contains diverse collections, including rugs, brassware, silver, wooden works, crystal, and rare artistic pieces—displayed in harmony with the nature of the place, so that the house itself becomes part of the viewing experience rather than merely a container for objects.

This is not a modern building prepared for display; it is a historical home that has been culturally repurposed—offering a living model of how heritage architecture can merge with the function of a museum and a store, preserving the memory of place and presenting an authentic example of Baghdad’s homes from the last century.`,

"house.m1k": "Location",
"house.m1v": "Abu Nuwas Street",
"house.m2k": "Milestone",
"house.m2v": "1989 — Opening",

/* ===== STAGE 1: GRANDFATHER ===== */
"grand.kicker": "Founder",
"grand.title": "Mohammed Ali Taher Al-Jazrawi (Al-Almani)",
"grand.sub": "1896 — 1988",
"grand.body": `Mohammed Ali Taher Al-Jazrawi, known by the nickname “Al-Almani,” is regarded as one of Iraq’s most prominent antiques dealers in the twentieth century. His name became closely linked to heritage and knowledge-based collecting, until he became a trusted reference in this field.

He was born in 1896 in Jazirat Ibn Umar (Botan Island), now within Turkey. He grew up in an academic environment, studied in Kurdistan, memorized the Qur’an, and learned under well-known religious scholars of his time. From his youth, he was recognized for his love of knowledge, traveling between villages and rural areas to learn and gain experience before heading to Baghdad. There, he settled near the Imam Abu Hanifa Mosque as a diligent student.

He possessed broad linguistic knowledge, mastering Turkish, Persian, and English, in addition to Arabic and Kurdish dialects. This expanded his cultural awareness, deepened his understanding of history and artifacts, and enabled him to connect with collectors and dealers from diverse backgrounds.

His true passion began with collecting rugs and old artifacts, then developed into a real trade he pursued as a profession and livelihood—without losing its intellectual dimension. His collecting was not driven by commerce alone, but by knowledge, documentation, and preserving historical value, making him among the early pioneers of this field in Iraq.

He had an exceptional memory and remarkable precision in identifying pieces—their age, origin, and circulation history—often knowing who owned a piece and when it changed hands. This rare ability earned him broad trust and respect. He was also known for humility and a lasting enthusiasm for speaking about antiques, their details, and their stories, even late in life.

He understood many traditional crafts and recognized both their material and historical value, seeing them as essential to a society’s identity and memory. This awareness shaped the way he acquired pieces—viewing each item not as an object, but as a living document.

He dreamed of transforming antiques into a cultural and touristic front—preserving heritage and introducing it to the world. He once expressed that if he had the means, he would establish a grand house worthy of this legacy.

Today, Mohammed Ali Taher Al-Jazrawi (Al-Almani) remains a foundational name in Iraq’s antiques history—a symbol of knowledge connected to heritage. His legacy formed the base upon which the House of Antiques was later built, continuing a dream that began with learning, was devoted with passion, and was entrusted to the generations that followed.`,

"grand.m1k": "Milestone",
"grand.m1v": "Khan Al-Baghdadi shops",
"grand.m2k": "Wish",
"grand.m2v": "“If I were wealthy…”",

/* ===== STAGE 2: FATHER ===== */
"father.kicker": "The Practical Continuation of the Legacy",
"father.title": "Tariq Mohammed Ali Al-Almani",
"father.sub": "1954 — 2014",
"father.body": `Tariq Al-Almani grew up surrounded by antiques from his earliest childhood, closely accompanying his father, Mohammed Ali Taher Al-Jazrawi (Al-Almani)—a dealer and researcher in heritage. For Tariq, antiques were not a later hobby or a sudden world; they were part of daily life, learned through direct practice—not books alone.

From his early years, he accompanied his father through markets, old houses, and merchants’ gatherings, learning acquisition methods, how to distinguish pieces, their historical value, and the origins of their craftsmanship. This early exposure built a cumulative expertise and helped him understand antiques as a complete system combining knowledge, taste, and responsibility toward heritage.

Before owning the House of Antiques, Tariq ran specialized antiques shops in Al-Maydan—one of Baghdad’s most prominent commercial and heritage districts—where he worked independently and developed a strong reputation among dealers and enthusiasts. The nickname “Al-Almani” continued as a mark of trust and knowledge in the field.

Under his father’s guidance, he learned the principles of dealing with rare pieces, preserving them, and not sacrificing their historical value for quick profit. He also explored the diversity of artistic schools, handcraft traditions, and materials used in rugs, brass, silver, wood, crystal, and more—forming the core of his later collections.

As he matured, he moved beyond being a companion or student and began evaluating and acquiring pieces himself, benefiting from a solid intellectual legacy and long practical experience. Over time, he built an independent identity in the antiques world—balancing respect for origins with careful, thoughtful expansion.

In 1989, purchasing the heritage house and transforming it into the House of Antiques became a defining turning point. He shifted from commercial shops to a clearly outlined cultural and knowledge-based project that combined museum and store, placing antiques within an architectural context worthy of their value. He preserved the spirit of the Baghdadi house and continued his father’s philosophy of merging knowledge with preservation.

The House of Antiques remained a well-known center for acquiring and exhibiting antiques under Tariq until 2004, when the project paused due to the circumstances Iraq faced at the time.

Tariq’s experience represents the link between the founding generation and the next—he was not merely an heir to a collection, but a bearer of a name, a practice, and accumulated knowledge that reinforced the House’s position as a recognized destination in Baghdad’s antiques world.`,

"father.m1k": "Milestone",
"father.m1v": "1989 — Purchased the house",
"father.m2k": "Era",
"father.m2v": "1989–2004 — The peak",

/* ===== STAGE 3: AZAD ===== */
"azad.kicker": "Third Generation",
"azad.title": "Azad Tariq Mohammed Ali Al-Almani",
"azad.sub": "Revival — 2022",
"azad.body": `Azad Tariq Al-Almani represents the third generation in the Al-Almani family’s journey in the world of antiques—a continuation that reconnected past and present after a long pause imposed by circumstances.

Azad was born in 1987—the same year the heritage house became the House of Antiques—making his earliest memories deeply tied to the place. He spent his early years inside the house, accompanying his father Tariq, learning the pieces, the rooms, the courtyard, and the way antiques were displayed—forming an early awareness of the house’s value even before fully grasping its cultural depth.

In 2004, the House of Antiques closed due to war and security conditions in Iraq, and the project paused despite its strong reputation at the time. Later, and especially after his father’s passing in 2014, the legacy became suspended between memory and reality while Azad was living outside Iraq.

Azad moved between the United States and Egypt, working as a producer in Egypt and as a businessman in both the U.S. and Egypt, gaining practical experience in management, production, and building ventures—away from antiques directly, yet without disconnecting from his cultural roots.

Eventually, he returned to Baghdad driven by the desire to revive the House of Antiques—not as a new project, but as a place with history and identity. He restored the house while fully preserving its original architectural form and Baghdadi details, and at the same time introduced a carefully measured contemporary touch in organization and display—aligned with the present without harming the spirit of the place.

His efforts were not limited to restoration; he continued acquiring rare pieces and expanding the collection while maintaining the house’s level and historical value—drawing on his upbringing within this legacy and on his practical experience in running projects.

Azad represents the transition from preservation to revival: the goal was not only reopening the doors, but redefining the House of Antiques as a living cultural space—rooted in three generations of history and speaking to the present in a modern language while remaining faithful to its origins.`,

"azad.m1k": "",
"azad.m1v": "",
"azad.m2k": "",
"azad.m2v": "2022 — Restoration & reopening",

"today.kicker": "Today",
"today.title": "The House Today",
"today.body": "Today, the House of Antiques is no longer just a preserved memory, but a living space that welcomes visitors, tells Baghdad’s story through antiques, and opens its doors to a new generation that sees heritage as a future — not only the past.",
"today.cta.tour": "Virtual Tour of the House",
"today.cta.press": "Press & Coverage",

"today.slider.prev": "Previous",
"today.slider.next": "Next",
"today.slider.open": "Open image",
"today.slider.alt": "Image from the House of Antiques",
"today.slider.dots": "Gallery indicators",

"today.lightbox.close": "Close",
"today.lightbox.alt": "Enlarged image",

/* ====== Auction page ====== */
"auction.label1": "AUCTION",
"auction.label2": "BODY",

"auction.big": "Al-Tariq Auction — Coming Soon",
"auction.mid": "An exclusive bidding experience on rare pieces that carry Baghdad’s memory.",
"auction.btn": "Auction Platform",

"auction.s1": "Rare works · Authentic pieces · Curated selection",
"auction.s2": "Antiques · Paintings · Historical collectibles",
"auction.s3": "Live bidding in a real-time broadcast",
"auction.s4": "Carefully selected pieces",
"auction.phone": "+964 777 704 5599",
"auction.addr": "Baghdad — Abu Nuwas St.",

      /* =========================
         Press — Hero
========================= */
"press.tabTitle": "Press | House of Antiques",

"press.heroAria": "Press introduction",
"press.heroTitle": "What newspapers and magazines wrote about House of Antiques",
"press.heroSub": "Articles • Interviews • Archive — curated visual documentation",
"press.heroCta1": "Open the Archive",
"press.heroCta2": "Contact",
/* some versions use press.desc, others press.heroDesc */
"press.desc":
  "Here we showcase what has been published about House of Antiques in newspapers and magazines across the years: headlines, dates, and original archival images.",
"press.heroDesc":
  "Here we showcase what has been published about House of Antiques in newspapers and magazines across the years: headlines, dates, and original archival images.",

/* =========================
   Press — Filters / chips
========================= */
"press.controlsAria": "Filtering tools",
"press.searchPh": "Search by newspaper… title… year…",
"press.hintKey": "Tip",
"press.hintText": "Tap any item to view it in full size.",

/* some versions use press.yearTitle, others press.year */
"press.yearTitle": "Year",
"press.year": "Year",
"press.yearFilterAria": "Filter by year",

/* =========================
   Press — Grid titles
========================= */
/* some versions use itemsTitle/itemsSub */
"press.itemsTitle": "Press materials",
"press.itemsSub": "Museum-style grid — indexing + quick search",

/* some versions use materialsTitle/materialsSub */
"press.materialsTitle": "Press materials",
"press.materialsSub": "Museum-style grid — indexing + quick search",

/* =========================
   Press — Brochures section
========================= */
"press.brochuresAria": "Printed brochures archive",
"press.printedArchive": "Printed archive",
"press.brochuresTitle": "House of Antiques Brochures",
"press.brochuresSpan": "1980s — 1990s — 2001",
"press.brochuresDesc":
  "The House of Antiques archive includes only three printed brochures issued in different periods: the first in the 1980s, the second in the 1990s, and the third in 2001. These were not just promotional pieces—they were identity documents that accompanied the evolution of the House across decades.",

"press.b1.year": "1980s",
"press.b1.title": "House of Antiques Brochure — First Edition",
"press.b1.desc":
  "An early introductory document, before cultural print materials became widespread, showing how the House presented itself as a unique destination in Baghdad.",
"press.b1.body":
  "An early introductory document, before cultural print materials became widespread, showing how the House presented itself as a unique destination in Baghdad.",
"press.b1.alt": "House of Antiques brochure — 1980s",

"press.b2.year": "1990s",
"press.b2.title": "House of Antiques Brochure",
"press.b2.desc":
  "One of the original brochures printed to introduce House of Antiques, when paper documentation was the primary way to preserve a place’s identity.",
"press.b2.body":
  "One of the original brochures printed to introduce House of Antiques, when paper documentation was the primary way to preserve a place’s identity.",
"press.b2.alt": "House of Antiques brochure — 1990s",

"press.b3.year": "2001",
"press.b3.title": "House of Antiques Brochure — 2001 Edition",
"press.b3.desc":
  "An edition documenting a more mature stage of the House’s presentation, reflecting an evolved visual language and stronger attention to Baghdad’s cultural identity details.",
"press.b3.body":
  "An edition documenting a more mature stage of the House’s presentation, reflecting an evolved visual language and stronger attention to Baghdad’s cultural identity details.",
"press.b3.alt": "House of Antiques brochure — 2001",

/* =========================
   Press — Lightbox
========================= */
"press.lbAria": "View press item",
"press.lbClose": "Close",
"press.lbImgAlt": "Press item",
"press.lbDetails": "Details",

/* =========================
   Press — Footer (simple footer style)
========================= */
"press.footerT1": "House of Antiques — Press Archive",
"press.footerT2": "If you have a rare copy or a clipping related to the House, contact us to add it to the archive.",

/* =========================
   Site Footer (big site footer keys)
========================= */
"footer.cta.title": "Ready to discover House of Antiques?",
"footer.cta.sub": "Book your visit or explore the virtual tour",
"footer.cta.book": "Book now",
"footer.cta.tour": "Virtual tour",

"footer.note":
  "A cultural platform documenting the story of the house, the family, and the collections—offering visits and event services.",
"footer.addr": "Baghdad — Abu Nuwas Street",
"footer.quick": "Quick links",
"footer.about": "About",
"footer.press": "Press",
"footer.tour": "Tour",
"footer.home": "Home",
"footer.contact": "Contact",
/* =========================
   Press — Newspapers (Grid)
========================= */
"press.n1.title": "A man whose profession is searching for old jewelry",
"press.n1.source": "Al-Taakhi Newspaper — Thu, July 22, 1971",

"press.n2.title": "Time and objects at House of Antiques",
"press.n2.source": "Al-Jumhuriya Newspaper — Thu, Aug 23, 1973",

"press.n3.title": "Fulfilling his father’s wish, he founded the House of Antiques",
"press.n3.source": "Al-Thawra Newspaper — Thu, Jun 1, 1989",

"press.n4.title": "A home or a museum for Baghdadi antiques?",
"press.n4.source": "Al-Jumhuriya Newspaper — Sat, Oct 14, 1989",

"press.n5.title": "A small museum selling remnants of a beautiful past",
"press.n5.source": "Al-Nidaa (Kuwait) — December 1990",

"press.n6.title": "Alif Baa Magazine interview with Hindreen Tariq Al-Almani (Excerpt)",
"press.n6.source": "Issue No. 1786 — Wednesday, December 18, 2002",

"press.n7.title": "At last… Baghdad becomes home to antiquities",
"press.n7.source": "Baghdad Magazine (French) — Interview with Tariq Mohammed Ali",

"press.n8.title": "Old houses turned into museums — Baghdad answers Hulagu’s slap",
"press.n8.source": "Al-Hawadeth Magazine/Newspaper",

"press.n9.title": "A German book about Iraq mentions the House as a tourist landmark",
"press.n9.source": "A German-language book about Iraq",
/* ===== TOUR PAGE (EN) ===== */
"tour.pageTitle": "Virtual Tour | House of Antiques",
"tour.kicker": "360° • Interactive Experience",
"tour.title": "Virtual Tour",
"tour.sub": "Explore House of Antiques in Baghdad through a smooth interactive experience.",
"tour.enter": "Enter the Tour",
"tour.startTitle": "Start the Experience",
"tour.startSub": "If your connection is weak: wait a few seconds… the tour loads automatically.",
"tour.backTop": "⬆ Back to top",


"legal.terms.tabTitle": "Terms & Conditions | House of Antiques",
"legal.terms.metaDesc": "Terms and Conditions for the House of Antiques website.",
"legal.terms.title": "Terms & Conditions",
"legal.terms.intro": "By using the House of Antiques website, you agree to these terms. If you do not agree, please do not use the website.",
"legal.terms.scopeP": "House of Antiques is a cultural and tourism-oriented website documenting the house, the family, and the collection. It may include contact and booking pages, a virtual tour, and related services.",
"legal.terms.acceptLi1": "Your use of the website means you fully accept these terms.",
"legal.terms.acceptLi2": "If you do not agree to any clause, please stop using the website.",
"legal.terms.acceptLi3": "We may update these terms from time to time; continued use after updates constitutes acceptance.",
"legal.terms.contentTitle": "Nature of Content",
"legal.terms.contentLi1": "Content is informational/cultural and may include historical notes, item descriptions, and archival materials.",
"legal.terms.contentLi2": "Content is not legal, academic, or professional advice.",
"legal.terms.contentLi3": "Some information may be updated when more accurate sources become available.",
"legal.terms.ipTitle": "Intellectual Property",
"legal.terms.ipLi1": "Text, designs, visual identity, and site layout are owned by House of Antiques or used with permission.",
"legal.terms.ipLi2": "Commercial copying, redistribution, or reuse is prohibited without prior written consent.",
"legal.terms.ipLi3": "Non-commercial quoting and sharing links is allowed within fair limits with clear attribution.",
"legal.terms.userConductTitle": "User Conduct",
"legal.terms.userConductLi1": "You must not attempt to hack, disrupt, tamper with, or exploit vulnerabilities of the website.",
"legal.terms.userConductLi2": "You must not impersonate House of Antiques or use the name/identity in a misleading manner.",
"legal.terms.userConductLi3": "You must not submit abusive or unlawful content via contact forms.",
"legal.terms.linksTitle": "External Links and Services",
"legal.terms.linksP": "The website may contain links to third-party platforms (social media, booking tools, virtual tour providers). House of Antiques is not responsible for their content or policies; please review them independently.",
"legal.terms.disclaimerTitle": "Disclaimer and Limitation of Liability",
"legal.terms.disclaimerLi1": "The website and its content are provided “as is” without absolute warranties regarding accuracy, availability, or fitness for a particular purpose.",
"legal.terms.disclaimerLi2": "We are not liable for any direct or indirect damages arising from using the website or relying on its content.",
"legal.terms.disclaimerLi3": "The website may be temporarily unavailable due to maintenance, updates, or technical issues without prior notice.",
"legal.terms.changesP": "We may update these terms when needed. The updated version will be posted on this page along with the “Last updated” date.",

"legal.privacy.tabTitle": "Privacy Policy | House of Antiques",
"legal.privacy.metaDesc": "Privacy Policy for the House of Antiques website.",
"legal.privacy.title": "Privacy Policy",
"legal.privacy.intro": "This policy explains how we collect, use, and protect information when you use the House of Antiques website.",
"legal.privacy.scopeTitle": "Scope",
"legal.privacy.scopeP": "This policy applies to the House of Antiques website and its digital services (content pages, contact/booking forms if available, and linked tour/platform services).",
"legal.privacy.dataTitle": "Information We May Collect",
"legal.privacy.dataLi1": "Information you provide voluntarily: name, phone number, email address, and message content when contacting us or requesting a booking.",
"legal.privacy.dataLi2": "Basic technical data: browser type, device, popular pages, and IP addresses for security and analytics purposes.",
"legal.privacy.dataLi3": "Booking details (if applicable): suggested date/time, number of visitors, and organizational notes you provide.",
"legal.privacy.useTitle": "How We Use Information",
"legal.privacy.useLi1": "To respond to inquiries and provide support.",
"legal.privacy.useLi2": "To arrange and confirm bookings/appointments when available.",
"legal.privacy.useLi3": "To improve user experience, content quality, and website performance.",
"legal.privacy.useLi4": "For security: preventing misuse, detecting unauthorized activity, and protecting the website.",
"legal.privacy.legalBasisTitle": "Principle and Basis",
"legal.privacy.legalBasisP": "We follow a data-minimization approach: we collect only what is necessary to communicate or provide what you requested. We do not sell your data or use it for targeted advertising.",
"legal.privacy.sharingTitle": "Data Sharing",
"legal.privacy.sharingP": "We do not sell or rent user data. We may share a minimum amount of data with trusted service providers when technically necessary (hosting, email, analytics, forms/booking tools), strictly to operate the service.",
"legal.privacy.cookiesTitle": "Cookies and Analytics",
"legal.privacy.cookiesP": "We may use cookies and similar technologies to improve performance and understand visitor interaction. You can control cookies via browser settings; disabling cookies may affect certain features.",
"legal.privacy.securityTitle": "Data Security",
"legal.privacy.securityP": "We take reasonable technical and organizational measures to protect data from unauthorized access, alteration, or disclosure. However, no online method guarantees 100% security.",
"legal.privacy.retentionTitle": "Data Retention",
"legal.privacy.retentionP": "We keep information only as long as necessary to fulfill the purpose it was collected for (e.g., completing a contact/booking), then delete or minimize it unless law requires otherwise.",
"legal.privacy.rightsTitle": "Your Rights",
"legal.privacy.rightsP": "You may request access, correction, or deletion of the data you provided through our official contact channels. We will respond within a reasonable timeframe depending on the request and applicable rules.",
"legal.privacy.childrenTitle": "Children’s Privacy",
"legal.privacy.childrenP": "We do not knowingly collect children’s data. If a child’s information is submitted inadvertently, a parent/guardian may contact us to request deletion.",
"legal.privacy.externalTitle": "External Links",
"legal.privacy.externalP": "The website may include links to third-party platforms or websites. We are not responsible for their content or privacy practices; please review them independently.",
"legal.privacy.changesP": "We may update this policy when needed. The updated version will be posted here, and continued use after updates constitutes acceptance.",

"legal.common.scopeTitle": "Website Scope",
"legal.common.acceptTitle": "Acceptance and Use",
"legal.common.changesTitle": "Updates",
"legal.common.contactTitle": "Contact",
"legal.common.contactP": "For any questions about privacy, terms, or data, please contact us via the email or WhatsApp listed on the website.",
"legal.common.lastUpdated": "Last updated: 2026",
"legal.common.location": "Location: Baghdad — Abu Nawas Street",
"legal.common.backHome": "Back to Home"
    },


  };

  
  window.DICT = DICT;
  window.I18N = DICT;
/* =========================
   Helpers
========================= */

function normalize(lang) {
  return SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
}
/* =========================
   Apply language
========================= */

function applyLang(lang) {
  const L = normalize(lang);
  const dict = DICT[L] || DICT[DEFAULT_LANG] || {};

  // html lang + dir
  document.documentElement.lang = L;
  document.documentElement.dir = (L === "ar") ? "rtl" : "ltr";

  

  // document title (if <title data-i18n="...">)
  const t = document.querySelector("title[data-i18n]");
  if (t) {
    const tk = t.getAttribute("data-i18n");
    const tv = (dict && dict[tk] != null) ? dict[tk] : null;
    if (tv != null) document.title = tv;
  }
document.querySelectorAll("[data-i18n]").forEach((el) => {
  const key = el.getAttribute("data-i18n");
  const val =
    (DICT[L] && DICT[L][key] != null) ? DICT[L][key] :
    (DICT[DEFAULT_LANG] && DICT[DEFAULT_LANG][key] != null) ? DICT[DEFAULT_LANG][key] :
    key;
  el.textContent = val;
});


  // placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] != null) el.setAttribute("placeholder", dict[key]);
  });

  // aria-label
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (dict[key] != null) el.setAttribute("aria-label", dict[key]);
  });

  // title attribute
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (dict[key] != null) el.setAttribute("title", dict[key]);
  });

  // img alt
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (dict[key] != null) el.setAttribute("alt", dict[key]);
  });

  // save language
  try { localStorage.setItem("hoa_lang", L); } catch {}

  // update active button UI
  document.querySelectorAll("[data-lang]").forEach((b) => {
    const isOn = (b.getAttribute("data-lang") || "").toLowerCase() === L;
    b.classList.toggle("is-active", isOn);
    b.setAttribute("aria-pressed", isOn ? "true" : "false");
  });
}

window.setLang = applyLang;

/* =========================
   Language buttons
========================= */

  // Delegated listeners (works even if DOM changes)
  document.addEventListener("click", (e) => {
    const langBtn = e.target.closest("[data-lang]");
    if (langBtn) {
      e.preventDefault();
      e.stopPropagation();
      applyLang(langBtn.getAttribute("data-lang"));
      return;
    }

    const toggleBtn = e.target.closest("[data-lang-toggle]");
    if (toggleBtn) {
      e.preventDefault();
      e.stopPropagation();
      const current = (localStorage.getItem("hoa_lang") || DEFAULT_LANG).toLowerCase();
      const next = current === "ar" ? "en" : "ar";
      applyLang(next);
    }
  }, true);

/* =========================
   Init on load
========================= */

(function () {
  try {
    const saved = (localStorage.getItem("hoa_lang") || DEFAULT_LANG).toLowerCase();
    applyLang(saved);
  } catch {
    applyLang(DEFAULT_LANG);
  }
  
   })();
})();

