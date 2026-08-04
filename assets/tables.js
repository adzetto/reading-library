/* Makalenin dört tablosu — PDF'ten birebir aktarılan veriler.
   Tablo 3 ve 4 etkileşimli olarak (sıralanabilir, çubuklu) çizilir. */
window.__TABLES__ = {

/* ----------------------------- Tablo 1 ----------------------------- */
1: {
  kind: "grid",
  caption: "Search strategy and key terms used in databases.",
  head: ["#", "EMBASE", "MEDLINE", "PsycInfo", "CINAHL", "Web of Science"],
  rows: [
    ["1", "“MENTAL”", "Psychological*", "“MENTAL HEALTH”",
     "“Mental Health” OR “Psychological Problem” OR “Psychological Disorder” OR “Psychopathology” OR “Mental Illness” AND “Prevalence” AND “Syrian”",
     "“Mental Health Problem*” OR “Psychological Disorder*” OR “Psychological Problem*” OR “Psychopatholog*” AND “Prevalence” AND “Syrian” NOT “Adolescen*” NOT “Children” NOT “Systematic Review”"],
    ["2", "“PSYCHOLOGIC*”", "Mental Health/ or Mental* or Mental Disorders/", "“PSYCHOLOGICAL PROBLEM*”", "", ""],
    ["3", "“PSYCHOPATHOLOG*”", "Psychopatholog*", "“PSYCHOLOGICAL DISORDER*”", "", ""],
    ["4", "“PREVALENCE*”", "Prevalen*", "“PSYCHOPATHOLOGY”", "", ""],
    ["5", "“SYRIAN*”", "Syria*", "“PREVALENCE”", "", ""],
    ["6", "1 OR 2 OR 3", "1 OR 2 OR 3", "“SYRIAN*”", "", ""],
    ["7", "4 AND 6", "4 AND 6", "1 OR 2 OR 3 OR 4", "", ""],
    ["8", "5 AND 7", "5 AND 7", "5 AND 7", "", ""],
    ["9", "Limit 8 to “adult (18–65) and (65+ years)”", "Limit 8 to “all adult”", "6 AND 8", "", ""]
  ]
},

/* ----------------------------- Tablo 2 ----------------------------- */
2: {
  kind: "grid",
  caption: "Inclusion and Exclusion criteria of studies.",
  head: ["", "Inclusion Criteria", "Exclusion Criteria", "Rationale"],
  rows: [
    ["Sample Characteristics",
     "Externally displaced Syrian population (residing out of Syria); Syrians affected by the Syrian Civil war; Adult Syrians (18 and over); no gender restriction",
     "Internally Displaced Syrian population; mixed ethnicity (presence of other refugee populations with Syrians); specified population (e.g., only women or elderly people, children, only parents, married couples)",
     "The aim of the study"],
    ["Method",
     "Quantitative Studies only utilising validated Diagnostic or Screening methods",
     "Qualitative Studies, Randomized Controlled Studies, Systematic Literature Reviews, Case-studies",
     "To investigate the prevalence/percentages of mental health problems"],
    ["Study design",
     "Only Cross-sectional studies and Cohort studies (only baseline measurements were considered)",
     "Further studies of longitudinal research",
     "To capture mental health problems and their percentage in a point of time, obtaining multiple variables at the time of the data snapshot"],
    ["Outcomes", "Percentages or cut-offs", "Mean scores, poor statistical reporting",
     "To obtain prevalence data"],
    ["Types of diagnosis", "PTSD, Depression, and Anxiety", "",
     "The most common mental health disorders of refugees"],
    ["Publication date", "March 2011 to March 2021", "",
     "Beginning of the Syrian Civil War and the end of the literature search"],
    ["Publication Location", "Online bibliographic databases (only peer-reviewed/scholarly journals)",
     "Dissertations, Conference Proceedings, Gray Literature, Reports",
     "To obtain reliable and trustworthy data"]
  ]
},

/* ----------------------------- Tablo 3 ----------------------------- */
3: {
  kind: "demographics",
  caption: "Demographics of the included studies.",
  note: "TEE = Traumatic Event Experienced. Marital status: M = Married, S = Single, O = Others. " +
        "Education: Non = 0 years, Low = 1–6 years, Med = 7–12 years, High = above 12 years. " +
        "* This study sampled Syrian population living in Nizip (Turkey) and Jarabulus (Syria); only the " +
        "demographics of Syrian refugees residing in Turkey are represented. " +
        "a from sixteen studies · b from three studies · c from seven studies. " +
        "Because of missing cases the numbers do not add up to the total; they are presented as they were " +
        "reflected in the original articles.",
  // [#, article, N, women n, women %, men n, men %, TEE, marital, edu(non,low,med,high), econ(low,enough), emp(yes,no)]
  rows: [
    [1,  "Alpak et al. (2015)",         352,  173, 49.1, 179, 50.9, 3.71, "M 304 (86.4); S 46 (13.1); O 2 (0.5)",    [60,149,121,22],  [null,null], [164,188]],
    [2,  "Chung et al. (2018)",         564,  183, 34.0, 381, 66.0, 8.36, "M 85 (51.0); S 72 (43.0); O 11 (6.0)",    [65,null,101,null], [null,null], [null,null]],
    [3,  "Gammouh et al. (2015)",       765,  425, 55.6, 340, 44.4, null, "M 656 (85.8); S 109 (14.2)",              [97,668,null,null], [651,114],  [111,335]],
    [4,  "Kazour et al. (2017)",        452,  252, 55.6, 200, 44.2, null, "M 356 (81.7); S 68 (15.6); O 12 (2.8)",   [167,219,40,19],  [null,null], [null,null]],
    [5,  "Naja et al. (2016)",          310,  189, 61.2, 120, 38.7, null, "M 262 (84.5); S 31 (10.0); O 17 (5.5)",   [52,199,45,14],   [null,null], [94,116]],
    [6,  "Tinghög et al. (2017)",      1215,  452, 37.2, 763, 63.8, 4.2,  "M 771 (63.5); S 386 (31.8); O 58 (4.7)",  [null,744,471,null], [null,null], [null,null]],
    [7,  "Jefee-Bahloul et al. (2014)", 354,  168, 47.5, 186, 52.5, null, "—",                                       [null,null,null,null], [null,null], [null,null]],
    [8,  "Taha et al. (2016)",          820,  506, 61.7, 313, 38.2, 8.1,  "M 743 (91.6); S 53 (6.6); O 15 (1.8)",    [null,308,233,63], [null,null], [90,728]],
    [9,  "Poole et al. (2018)",         135,   55, 40.7,  80, 59.3, null, "M 99 (74.4); S 34 (25.6)",                [15,29,38,50],    [null,null], [null,null]],
    [10, "Tekeli-Yesil et al. (2018)*", 285,  141, 49.5, 144, 50.5, null, "M 228 (81.2); S 41 (14.6); O 12 (4.3)",   [16,115,123,31],  [null,null], [103,182]],
    [11, "Acarturk et al. (2018)",      781,  444, 60.6, 289, 39.4, null, "M 628 (86.4); S 61 (8.4); O 38 (5.2)",    [96,642,null,null], [null,null], [266,515]],
    [12, "Basheti et al. (2019)",       186,   87, 46.8,  99, 53.2, null, "M 82 (44.0); S 82 (44.0); O 23 (12.0)",   [20,32,38,96],    [null,null], [null,null]],
    [13, "Georgiadou et al. (2018)",    200,   61, 30.5, 139, 69.5, null, "M 119 (59.5); S 74 (37.0); O 7 (3.5)",    [null,null,null,null], [null,null], [null,null]],
    [14, "Acarturk et al. (2020)",     1678,  866, 51.6, 812, 48.4, null, "M 145 (84.9); S 131 (7.8); O 118 (7.0)",  [137,765,650,116], [731,942],  [null,null]],
    [15, "Sagaltici et al. (2019)",     342,  179, 52.3, 163, 47.7, null, "M 284 (83.0); S/O 58 (17.0)",             [null,216,126,null], [null,null], [null,null]],
    [16, "Javanbakht et al. (2019)",    157,   74, 47.1,  83, 52.9, null, "M 116 (74.4); S 32 (20.5); O 8 (5.1)",    [11,50,34,12],    [null,null], [null,null]],
    [17, "Kaya et al. (2019)",          420,  237, 56.4, 183, 43.6, 13.7, "M 356 (84.7); O 66 (15.3)",               [375,null,45,null], [255,165],  [118,302]]
  ],
  total: {N: 9061, women: [4492, 50.1], men: [4474, 49.9],
          marital: "M 5234ᵃ (75.8); S/O 1665 (24.2)",
          econ: [[1637, 57.3], [1221, 42.7]], emp: [[946, 29.2], [2296, 70.8]]}
},

/* ----------------------------- Tablo 4 ----------------------------- */
4: {
  kind: "outcomes",
  caption: "The outcomes PTSD, Depression, and Anxiety prevalence and the characteristics of the studies.",
  note: "a = having/guaranteed residency permit · m = month, y = year. " +
        "BDI = Beck Depression Inventory; CAPS = Clinician Administered PTSD Scale; ETI = Essen Trauma " +
        "Inventory; GAD = Generalized Anxiety Scale; GHQ = General Health Questionnaire; HADStress = a " +
        "somatic symptom screening for PTSD; HSCL = Hopkins Symptom Checklist; HTQ = Harvard Trauma " +
        "Questionnaire; IES-R = Impact of Event Scale-Revised; MINI = Mini International Neuropsychiatric " +
        "Interview; PCL = PTSD Checklist; PHQ = Patient Health Questionnaire; SLESQ = Stressful Life-events " +
        "Screening Questionnaire. * The measurements are mainly self-administered but some are " +
        "interviewer-administered. ** Legal status is reflected as addressed in the original article.",
  // [#, article, country, iso, legal, settlement, duration, ptsd, depression, anxiety, measures]
  rows: [
    [1,  "Alpak et al. (2015)",         "Turkey",         "TR", "Refugee",       "Camp",        "6.52 m",  33.5, null, null, "SLESQ"],
    [2,  "Chung et al. (2018)",         "Sweden",         "SE", "Refugee",       "Out of Camp", "24.45 m", 30.0, null, null, "GHQ, HTQ"],
    [3,  "Gammouh et al. (2015)",       "Jordan",         "JO", "Refugee",       "Out of Camp", "—",       null, 29.5, null, "BDI"],
    [4,  "Kazour et al. (2017)",        "Lebanon",        "LB", "Refugee",       "Camp",        "10.02 m", 27.2, null, null, "MINI"],
    [5,  "Naja et al. (2016)",          "Lebanon",        "LB", "Refugee",       "Out of Camp", "—",       null, 43.9, null, "MINI-Arabic"],
    [6,  "Tinghög et al. (2017)",       "Sweden",         "SE", "Refugeeᵃ",      "Out of Camp", "—",       29.9, 40.2, 31.8, "HSCL, HTQ"],
    [7,  "Jefee-Bahloul et al. (2014)", "Turkey",         "TR", "Refugee",       "Out of Camp", "—",       41.8, null, null, "HADStress"],
    [8,  "Taha et al. (2016)",          "Iraqi Kurdistan","IQ", "Refugee",       "Camp",        "—",       16.3, null, null, "HTQ"],
    [9,  "Poole et al. (2018)",         "Greece",         "GR", "Asylum Seeker", "Camp",        "12.1 m",  null, 44.0, null, "PHQ"],
    [10, "Tekeli-Yesil et al. (2018)",  "Turkey",         "TR", "Refugees",      "Out of Camp", "—",       29.8, 70.5, 38.8, "MINI"],
    [11, "Acarturk et al. (2018)",      "Turkey",         "TR", "Refugees",      "Camp",        "14.1 m",  83.4, 37.4, null, "IES-R, BDI"],
    [12, "Basheti et al. (2019)",       "Jordan",         "JO", "Refugees",      "Out of Camp", "—",       38.7, null, null, "HTQ"],
    [13, "Georgiadou et al. (2018)",    "Germany",        "DE", "Refugeesᵃ",     "Mixed",       "—",       11.4, 14.5, 13.5, "ETI, PHQ, GAD-7"],
    [14, "Acarturk et al. (2020)",      "Turkey",         "TR", "Refugees",      "Out of Camp", "3.4 y",   19.6, 36.1, 34.7, "HSCL-25, PCL-5"],
    [15, "Sagaltici et al. (2019)",     "Turkey",         "TR", "Refugees",      "Camp",        "33.74 m", 31.0, null, null, "CAPS, SLESQ"],
    [16, "Javanbakht et al. (2019)",    "USA",            "US", "Refugees",      "Out of Camp", "—",       32.2, 40.3, 47.7, "PCL, HSCL-25"],
    [17, "Kaya et al. (2019)",          "Turkey",         "TR", "Refugees",      "Out of Camp", "2.2 y",   36.5, 47.7, null, "HTQ, BDI"]
  ],
  pooled: {ptsd: [32.95, 23.26, 42.63], depression: [40.41, 30.29, 50.53], anxiety: [33.30, 17.66, 48.93]}
}
};
