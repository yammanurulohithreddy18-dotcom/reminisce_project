// Real-time Linguistic & Biomarker Analyzer for REMINISCE Phase 2

export function analyzeLinguisticText(text, baselineProfile = null) {
  if (!text || text.trim().length === 0) {
    return null;
  }

  const rawWords = text.trim().toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
  const totalWords = rawWords.length;
  if (totalWords === 0) return null;

  // 1. Vocabulary Richness (Type-Token Ratio)
  const uniqueWords = new Set(rawWords);
  const ttr = Number((uniqueWords.size / totalWords).toFixed(3));

  // Indefinite/vague filler nouns (anomia markers)
  const vagueNouns = ['thing', 'things', 'stuff', 'place', 'places', 'item', 'device', 'person', 'somebody', 'someone', 'whatsit', 'whatchamacallit'];
  const vagueNounCount = rawWords.filter(w => vagueNouns.includes(w)).length;
  const anomiaIndex = Number((vagueNounCount / totalWords).toFixed(3));

  // 2. Syntactic Complexity (Subordinate & Conditional Clauses)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = sentences.length > 0 ? Number((totalWords / sentences.length).toFixed(1)) : totalWords;
  
  const subordinateMarkers = ['because', 'although', 'even though', 'while', 'since', 'if', 'unless', 'whether', 'which', 'that', 'who', 'whose', 'where', 'whereas', 'provided that'];
  let subordinateCount = 0;
  const lowerText = text.toLowerCase();
  subordinateMarkers.forEach(m => {
    const regex = new RegExp(`\\b${m}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) subordinateCount += matches.length;
  });
  const clauseDepth = sentences.length > 0 ? Number((1.5 + (subordinateCount / sentences.length) * 1.8).toFixed(1)) : 2.0;

  // 3. Time Horizon (Tense Distribution)
  const futureMarkers = ['will', 'shall', 'tomorrow', 'next', 'upcoming', 'planning', 'intend', 'hope', 'later', 'future', 'soon'];
  const futureCount = rawWords.filter(w => futureMarkers.includes(w)).length;
  const futureRatio = Number(((futureCount / totalWords) * 100).toFixed(1));

  // 4. Repetition Frequency
  const wordFrequency = {};
  rawWords.forEach(w => {
    if (w.length > 3) {
      wordFrequency[w] = (wordFrequency[w] || 0) + 1;
    }
  });
  let repeatedContentWords = 0;
  Object.values(wordFrequency).forEach(cnt => {
    if (cnt > 2) repeatedContentWords += (cnt - 2);
  });
  const repetitionScore = Number(Math.min(5, (repeatedContentWords / Math.max(1, totalWords)) * 20).toFixed(1));

  // 5. Social Reference Network (NER-like detection)
  const socialTerms = ['priya', 'meena', 'kabir', 'daughter', 'wife', 'grandson', 'mother', 'father', 'colleague', 'friend', 'doctor', 'student', 'students', 'professor', 'family'];
  const socialCount = rawWords.filter(w => socialTerms.includes(w)).length;

  // 6. Pause latency estimation (heuristic based on anomia & length)
  const estimatedPreNounPause = Math.round(180 + (anomiaIndex * 1200) + (ttr < 0.5 ? (0.5 - ttr) * 500 : 0));

  // Compute Composite Drift Score (0.00 to 1.00)
  // Drift rises if TTR is low (<0.65), anomia is high, clause depth is low (<3.0), repetition is high, future ratio is low
  let driftScore = 0.15; // baseline

  if (ttr < 0.65) driftScore += (0.65 - ttr) * 0.9;
  if (anomiaIndex > 0.03) driftScore += Math.min(0.25, anomiaIndex * 3.5);
  if (clauseDepth < 3.2) driftScore += (3.2 - clauseDepth) * 0.12;
  if (repetitionScore > 1.0) driftScore += Math.min(0.2, repetitionScore * 0.05);
  if (futureRatio < 5.0 && totalWords > 20) driftScore += 0.08;

  driftScore = Math.min(0.98, Math.max(0.12, Number(driftScore.toFixed(2))));

  // Alert Level
  let alertLevel = 0;
  let alertTitle = "Healthy / Personal Baseline";
  let alertColor = "#0F6E56";

  if (driftScore >= 0.72) {
    alertLevel = 3;
    alertTitle = "Level 3: Urgent Clinical Neurological Alert";
    alertColor = "#A32D2D";
  } else if (driftScore >= 0.61) {
    alertLevel = 2;
    alertTitle = "Level 2: Gentle Family Notice (Dispatched to Family)";
    alertColor = "#D35400";
  } else if (driftScore >= 0.45) {
    alertLevel = 1;
    alertTitle = "Level 1: Internal Watchful Monitoring";
    alertColor = "#854F0B";
  }

  // SHAP Factors
  const shapFactors = [
    {
      feature: "Lexical Diversity (TTR)",
      contribution: Number(((0.75 - ttr) * 0.4).toFixed(2)),
      description: `TTR is ${ttr} (healthy baseline is ~0.75)`
    },
    {
      feature: "Anomia / Vague Noun Substitutions",
      contribution: Number((anomiaIndex * 4.0).toFixed(2)),
      description: `${vagueNounCount} indefinite words found ('${vagueNouns.filter(v => rawWords.includes(v)).join("', '") || 'none'}')`
    },
    {
      feature: "Syntactic Tree Clause Depth",
      contribution: Number(((3.8 - clauseDepth) * 0.15).toFixed(2)),
      description: `Average clause depth ${clauseDepth} (baseline is 4.2)`
    },
    {
      feature: "Semantic Repetition Rate",
      contribution: Number((repetitionScore * 0.04).toFixed(2)),
      description: `Repetition factor ${repetitionScore}`
    }
  ];

  return {
    totalWords,
    uniqueWordsCount: uniqueWords.size,
    ttr,
    clauseDepth,
    anomiaIndex,
    vagueNounCount,
    estimatedPreNounPause,
    futureRatio,
    repetitionScore,
    socialCount,
    driftScore,
    alertLevel,
    alertTitle,
    alertColor,
    shapFactors
  };
}
