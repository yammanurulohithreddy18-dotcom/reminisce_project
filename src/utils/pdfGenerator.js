// Clinical Neurological PDF & Document Generator for REMINISCE Phase 2 Level 3 Alert

export function printClinicalReport() {
  window.print();
}

export function generateReportData(patient, signals, shapFactors) {
  return {
    reportId: `NIMHANS-REM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    generatedDate: "October 27, 2026",
    patientName: patient.name,
    patientAge: patient.age,
    patientId: patient.id,
    longitudinalDuration: "25 Years Baseline (2001–2026)",
    compositeDriftScore: 0.74,
    status: "Level 3 - Urgent Neurological Evaluation Recommended",
    neurologistSummary: `Longitudinal analysis across 4,892 daily speech journals indicates statistically significant linguistic and acoustic drift exceeding 2.8 standard deviations from patient's 25-year personal baseline. 

Key markers include severe lexical anomia (TTR collapsed from 0.78 to 0.41), prolonged pre-noun hesitation latency (185ms -> 440ms), syntactic simplification (loss of embedded subordinate structures), and an elevation in unacknowledged semantic repetition (3.4 events/month). 

These findings correlate strongly with early neurofibrillary tau aggregation in the temporoparietal network, consistent with Mild Cognitive Impairment (MCI) progressing to Early-Stage Alzheimer's Disease (NIA-AA criteria). Immediate clinical neuropsychological testing (MoCA, PET-tau/amyloid, CSF biomarker panel) is advised.`,
    signalMetrics: signals,
    shapFactors: shapFactors,
    annotatedTranscripts: [
      {
        date: "October 14, 2026 (Journal Entry #4882)",
        baselineSample: "2018: 'We walked across the botanical garden near the Arts College, observing the bougainvillea in full vibrant bloom.'",
        currentSample: "2026: 'We walked to the... [460ms pause] ...thing with flowers. The place near my old... [520ms pause] ...room.'",
        clinicianNote: "Severe lexical access failure on low-frequency nouns ('botanical garden', 'Arts College'). Replaced by indefinite deictic markers ('thing', 'place')."
      },
      {
        date: "October 02, 2026 (Journal Entry #4870)",
        baselineSample: "2020: 'If Priya visits next month, I intend to finish the wooden bookstand so we can place Kabir's illustrated encyclopedias together.'",
        currentSample: "2026: 'Priya is coming. I sit here. The book is here.'",
        clinicianNote: "Complete syntactic collapse of counterfactual/future conditional clauses ('If... then'). Syntactic depth reduced to 1.8 clauses per utterance."
      }
    ]
  };
}
