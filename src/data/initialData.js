// REMINISCE - Core Dataset for Rajan (Age 71, Baseline started Age 46)

export const PATIENT_PROFILE = {
  id: "rajan-71",
  name: "Rajan Sundaram",
  age: 71,
  formerProfession: "Professor of English Literature & Linguistics, Osmania University",
  currentStage: "Mild Cognitive Impairment (Early Stage Alzheimer's)",
  archiveStartAge: 46,
  totalJournalEntries: 4892,
  totalGraphNodes: 12480,
  familyContact: {
    name: "Priya Sundaram",
    relationship: "Daughter (Age 38, Architect)",
    phone: "+91 98490 12345",
    email: "priya.sundaram@designstudio.in"
  },
  spouse: {
    name: "Meena Sundaram",
    relationship: "Wife of 42 years",
    metYear: 1979,
    metLocation: "Osmania University Arts College Library"
  },
  neurologist: {
    name: "Dr. Ramesh Natarajan, MD (Neuro)",
    clinic: "NIMHANS Affiliated Cognitive Care, Bangalore",
    regNo: "KMC-48291"
  }
};

export const INITIAL_KNOWLEDGE_GRAPH = {
  nodes: [
    { id: "rajan", label: "Rajan (Self)", type: "Person", category: "self", weight: 10, color: "#0F6E56", radius: 32, details: "Professor of Literature, lover of poetry and old Hindi songs" },
    { id: "meena", label: "Meena (Wife)", type: "Person", category: "family", weight: 9.8, color: "#C0392B", radius: 26, details: "Married 42 years. Met 1979 at Osmania University Arts College Library. Her laughter brings instant calm." },
    { id: "priya", label: "Priya (Daughter)", type: "Person", category: "family", weight: 9.5, color: "#185FA5", radius: 24, details: "Architect in Bangalore. Calling her brings immense pride. Father-daughter dance at her 2015 wedding." },
    { id: "kabir", label: "Kabir (Grandson)", type: "Person", category: "family", weight: 8.9, color: "#27AE60", radius: 20, details: "Age 7. Rajan used to read him Ruskin Bond stories every Sunday morning." },
    { id: "wedding2015", label: "Priya's Wedding (2015)", type: "Event", category: "memory", weight: 9.7, color: "#854F0B", radius: 24, details: "December 2015, Hyderabad. Rajan gave an emotional 8-minute toast that had all 300 guests crying and laughing." },
    { id: "osmania", label: "Osmania University", type: "Location", category: "identity", weight: 9.2, color: "#534AB7", radius: 22, details: "Taught British & Indian literature from 1982 to 2018. Wrote his thesis under the granite arches." },
    { id: "kishore", label: "Kishore Kumar Songs", type: "SensoryAnchor", category: "music", weight: 9.6, color: "#E67E22", radius: 24, details: "'Pal Pal Dil Ke Paas' and 'O Mere Dil Ke Chain'. Played every Sunday morning on the vintage Philips turntable." },
    { id: "coffee", label: "Filter Coffee Ritual", type: "SensoryAnchor", category: "routine", weight: 8.7, color: "#795548", radius: 18, details: "Brass tumbler coffee in the front verandah at 6:30 AM while reading the newspaper." },
    { id: "childhood", label: "Hyderabad Childhood", type: "Location", category: "memory", weight: 8.5, color: "#16A085", radius: 20, details: "Old house in Chikkadpally with stone courtyard, mango tree, and sound of monsoon rain on tin roof." },
    { id: "petrichor", label: "Rain & Petrichor", type: "SensoryAnchor", category: "sensory", weight: 8.4, color: "#2980B9", radius: 18, details: "First summer rains on hot dry Deccan soil. Associated with writing poetry and feeling safe." },
    { id: "book_poetry", label: "Keats & Tagore Poetry", type: "Memory", category: "passion", weight: 8.8, color: "#8E44AD", radius: 20, details: "Recited 'Ode to a Nightingale' and 'Where the Mind is Without Fear' from heart." }
  ],
  links: [
    { source: "rajan", target: "meena", label: "MARRIED_TO (42 yrs)", weight: 1.0 },
    { source: "rajan", target: "priya", label: "PARENT_OF", weight: 0.95 },
    { source: "priya", target: "kabir", label: "PARENT_OF", weight: 0.9 },
    { source: "rajan", target: "kabir", label: "GRANDPARENT_OF", weight: 0.88 },
    { source: "rajan", target: "wedding2015", label: "GAVE_TOAST_AT", weight: 0.97 },
    { source: "priya", target: "wedding2015", label: "BRIDE_AT", weight: 0.95 },
    { source: "rajan", target: "osmania", label: "TAUGHT_AT (36 yrs)", weight: 0.92 },
    { source: "meena", target: "osmania", label: "MET_RAJAN_AT (1979)", weight: 0.94 },
    { source: "rajan", target: "kishore", label: "DEEPLY_LOVES", weight: 0.96 },
    { source: "meena", target: "kishore", label: "OUR_SONG", weight: 0.95 },
    { source: "rajan", target: "coffee", label: "DAILY_MORNING_RITUAL", weight: 0.87 },
    { source: "rajan", target: "childhood", label: "GREW_UP_IN", weight: 0.85 },
    { source: "childhood", target: "petrichor", label: "EVOKES_FEELING_OF", weight: 0.9 },
    { source: "rajan", target: "book_poetry", label: "RECITED_BY_HEART", weight: 0.88 },
    { source: "kishore", target: "wedding2015", label: "PLAYED_FIRST_DANCE", weight: 0.92 }
  ]
};

export const DETECTION_SIGNALS = [
  {
    id: "vocab",
    name: "Vocabulary Shrinkage (TTR)",
    weight: 0.88,
    baselineValue: "0.78 (Rich Lexicon)",
    driftValue: "0.41 (3SD Below Baseline)",
    unit: "Type-Token Ratio",
    category: "Lexical",
    description: "Tracks unique word diversity per 500 words. Pronounced drop in specific nouns with substitution by indefinite pronouns ('thing', 'that place').",
    clinicalLeadTime: "5–7 Years",
    citation: "Taler & Phillips, Psych Bull 2008"
  },
  {
    id: "complexity",
    name: "Sentence Parse Tree Depth",
    weight: 0.82,
    baselineValue: "4.4 Levels (Nested Subordinates)",
    driftValue: "2.1 Levels (Simple Subject-Verb)",
    unit: "Parse Tree Depth",
    category: "Syntactic",
    description: "Evaluates constituency clause depth using spaCy dependency parser. Subordinate and conditional clauses decline earliest.",
    clinicalLeadTime: "4–6 Years",
    citation: "Eyigoz et al., EClinicalMed 2020"
  },
  {
    id: "pauses",
    name: "Pre-Noun Hesitation Pauses",
    weight: 0.79,
    baselineValue: "185 ms (Fluent Retrieval)",
    driftValue: "440 ms (Pathological Anomia)",
    unit: "Milliseconds (ms)",
    category: "Acoustic",
    description: "Whisper word-level audio alignment measures silence preceding low-frequency nouns. The speaker experiences this merely as 'thinking'.",
    clinicalLeadTime: "3–5 Years",
    citation: "Boschi et al., Frontiers 2017"
  },
  {
    id: "repetition",
    name: "Semantic Repetition Frequency",
    weight: 0.74,
    baselineValue: "0.2 Events / Month",
    driftValue: "3.4 Events / Month",
    unit: "Cosine Similarity > 0.88",
    category: "Semantic",
    description: "BERT semantic embedding compares new journals against previous 30 days. Unacknowledged verbatim or near-verbatim retelling.",
    clinicalLeadTime: "3–4 Years",
    citation: "Beltrami et al., Brain & Lang 2018"
  },
  {
    id: "time_horizon",
    name: "Time-Horizon Collapse",
    weight: 0.68,
    baselineValue: "28% Future-Tense Verbs",
    driftValue: "4.2% Future-Tense Verbs",
    unit: "Verb Tense Ratio",
    category: "Temporal Cognition",
    description: "Linguistic projection into future plans collapses. The person inadvertently lives strictly within immediate sensory present.",
    clinicalLeadTime: "2–4 Years",
    citation: "Irish et al., Neuropsychologia 2011"
  },
  {
    id: "social",
    name: "Social Reference Network",
    weight: 0.61,
    baselineValue: "11.4 Unique People / Wk",
    driftValue: "3.2 Unique People / Wk",
    unit: "NER Extracted Entities",
    category: "Behavioral",
    description: "Peripheral friends and colleagues drop out of speech. Social universe quietly contracts years before clinical diagnosis.",
    clinicalLeadTime: "3–5 Years",
    citation: "Fratiglioni et al., Lancet 2004"
  },
  {
    id: "circadian",
    name: "Circadian Journaling Drift",
    weight: 0.54,
    baselineValue: "±18 min Variance (9:15 PM)",
    driftValue: "±165 min Disruption",
    unit: "Timestamp Variance",
    category: "Behavioral",
    description: "Sun-downing and circadian rhythm breakdown manifest as irregular, fragmented journaling habits across odd night hours.",
    clinicalLeadTime: "2–3 Years",
    citation: "Musiek et al., Science Trans Med 2018"
  },
  {
    id: "pronoun",
    name: "Pronoun Confusion Ratio",
    weight: 0.49,
    baselineValue: "1.2% Coreference Error",
    driftValue: "9.6% Coreference Error",
    unit: "Coreference Disparity %",
    category: "Syntactic",
    description: "Confusing 'he' and 'she' or ambiguous referents without antecedent. Indicative of working memory buffer constraints.",
    clinicalLeadTime: "2–3 Years",
    citation: "Almor et al., Brain & Cognition 1999"
  }
];

export const SHAP_EXPLANATION = [
  { feature: "Vocabulary Shrinkage (TTR)", shapValue: 0.28, direction: "risk", sample: "'I walked to the... you know, the big place with leaves' instead of 'botanical garden'." },
  { feature: "Pre-Noun Pause Duration", shapValue: 0.24, direction: "risk", sample: "460ms pause before naming 'Priya' on Oct 14 journal entry." },
  { feature: "Sentence Parse Depth", shapValue: 0.16, direction: "risk", sample: "Decline of conditional clauses ('if... then') by 64%." },
  { feature: "Repetition Frequency", shapValue: 0.14, direction: "risk", sample: "Repeated the story of buying the 1985 Bajaj Chetak scooter 4 times in 12 days." },
  { feature: "Time-Horizon Collapse", shapValue: 0.10, direction: "risk", sample: "Zero mentions of future upcoming holiday or next month's family visit." },
  { feature: "Social Reference Decline", shapValue: 0.08, direction: "risk", sample: "Stopped mentioning longtime faculty chess friend Dr. Rao." }
];

export const CAREGIVER_DAILY_REPORTS = [
  {
    date: "Today, Oct 27",
    summary: "Rajan had an exceptionally warm morning. When Priya's photo surfaced during the Phase 3 session, he recognized her immediately and whispered: 'My daughter Priya. She was the prettiest bride.'",
    calmMinutes: 42,
    agitationMinutes: 4,
    bestTrigger: "Priya's 2015 Wedding Photo + Kishore Kumar 'Pal Pal Dil Ke Paas'",
    status: "optimal",
    sessionScore: "9.4 / 10"
  },
  {
    date: "Yesterday, Oct 26",
    summary: "Mild mid-afternoon disorientation ('Where is my lecture hall?'). System activated Dignity Protocol: instead of correcting him, it validated his love for teaching and played soft sitar. He settled within 6 minutes.",
    calmMinutes: 38,
    agitationMinutes: 8,
    bestTrigger: "Osmania University Arts College Architecture Photo",
    status: "good",
    sessionScore: "8.6 / 10"
  },
  {
    date: "Oct 25",
    summary: "Meena sat beside him while the system narrated his childhood memories in Chikkadpally with petrichor soundscape. He held Meena's hand for 20 minutes unbroken.",
    calmMinutes: 45,
    agitationMinutes: 0,
    bestTrigger: "Rain Soundscape + Meena Face Recognition",
    status: "optimal",
    sessionScore: "9.8 / 10"
  }
];

export const RESEARCH_PAPERS = [
  {
    id: 1,
    title: "Musical memories in Alzheimer's disease",
    authors: "Jacobsen, J. H., Stelzer, J., Fritz, T. H., Chételat, G., La Joie, R., & Turner, R.",
    journal: "Brain, 138(9), 2738-2750",
    year: 2015,
    keyFinding: "Proved musical memory is stored in ventral pre-supplementary motor area and caudal anterior cingulate cortex — regions remarkably spared by neurofibrillary tau pathology until terminal stage.",
    implementation: "Forms the direct biological mandate for Phase 3's Emotion-Adaptive Music Engine. Kishore Kumar and retro melodies act as reliable backdoor keys to patient emotional regulation."
  },
  {
    id: 2,
    title: "Spaced retrieval therapy in dementia: An evidence-based review",
    authors: "Camp, C. J., Bird, M. J., & Cherry, K. E.",
    journal: "Neuropsychological Rehabilitation, 16(2), 139-158",
    year: 2006,
    keyFinding: "Demonstrated 80%+ success rate in helping patients retain and retrieve functional facts and family names over expanding temporal intervals (1m -> 2m -> 4m -> 8m -> 16m).",
    implementation: "Directly governs the algorithmic scheduling of Phase 3 daily memory sessions. Anchors are re-introduced along spaced retrieval curves to scaffold fading synaptic pathways."
  },
  {
    id: 3,
    title: "Linguistic markers of cognitive decline in normal aging and Alzheimer's disease",
    authors: "Taler, V., & Phillips, N. A.",
    journal: "Psychological Bulletin, 134(6), 829-855",
    year: 2008,
    keyFinding: "Confirmed measurable decline in lexical richness (TTR) and syntactic tree depth 5–7 years prior to clinical diagnosis on MMSE / MoCA.",
    implementation: "Direct foundation of Phase 2's 8 linguistic biomarkers. REMINISCE tracks personal drift from personal baseline, eliminating cross-sectional normative bias."
  },
  {
    id: 4,
    title: "Dementia Reconsidered: The Person Comes First",
    authors: "Kitwood, Tom",
    journal: "Open University Press, Buckingham",
    year: 1997,
    keyFinding: "Proved that 'Malignant Social Psychology' (correcting, out-arguing, or infantilizing dementia patients) triggers acute neurological distress and accelerated cognitive withdrawal.",
    implementation: "The philosophical and programmatic foundation of REMINISCE's Dignity Protocol. The AI NEVER corrects the patient; it validates emotional reality and gently guides."
  },
  {
    id: 5,
    title: "Predicting Alzheimer's disease and mild cognitive impairment using speech and language: A systematic review",
    authors: "Eyigoz, E. B., Mathur, S., Santamaria, M., Cecchi, G., & Naylor, M.",
    journal: "EClinicalMedicine (The Lancet), 25, 100473",
    year: 2020,
    keyFinding: "Demonstrated 82% prospective accuracy in predicting future Alzheimer's onset from continuous speech feature processing up to 7 years in advance.",
    implementation: "Validates Phase 2's temporal LSTM + BERT acoustic alignment pipeline utilizing everyday 2-minute voice journals."
  },
  {
    id: 6,
    title: "Knowledge graphs for healthcare: A review and framework",
    authors: "Rotmensch, M., Halpern, Y., Tlimat, A., Horng, S., & Sontag, D.",
    journal: "Nature Scientific Reports, 7(1), 2112",
    year: 2017,
    keyFinding: "Showed relational graph structures out-perform vector databases and flat tables in preserving complex multi-dimensional medical and autobiographical relationships.",
    implementation: "Underpins REMINISCE's choice of Neo4j Knowledge Graph to connect emotional weights, sensory triggers, people, and historical life events."
  },
  {
    id: 7,
    title: "Caregiver burden in Alzheimer's disease: A systematic review",
    authors: "Etters, L., Goodall, D., & Harrison, B. E.",
    journal: "Geriatric Nursing, 29(1), 23-30",
    year: 2008,
    keyFinding: "Documented 40%+ prevalence of clinical depression and physical morbidity among primary family dementia caregivers due to ambiguous grief and invisibility of care impact.",
    implementation: "Mandates Phase 4 as a clinical necessity rather than an accessory. Daily 'Good Moment' reports provide quantifiable proof of shared moments of joy."
  },
  {
    id: 8,
    title: "Autobiographical memory and the self in Alzheimer's disease",
    authors: "Irish, M., Addis, D. R., Hodges, J. R., & Hornberger, M.",
    journal: "Neuropsychologia, 50(9), 2178-2188",
    year: 2012,
    keyFinding: "Revealed that emotionally charged autobiographical identity narratives stored in the amygdalar-cortical axis resist degradation long after hippocampal episodic decay.",
    implementation: "Directs Phase 3 to open every session with the patient's core identity anchor ('You are Professor Rajan, scholar, beloved husband of Meena and father of Priya')."
  }
];
