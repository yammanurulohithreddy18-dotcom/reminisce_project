// Real-time Dignity Protocol Response Generator
// Based on Tom Kitwood's Person-Centered Dementia Framework

export function generateDignityResponse(patientStatement, patientProfile = null) {
  if (!patientStatement || !patientStatement.trim()) return null;

  const text = patientStatement.toLowerCase();
  const patientName = patientProfile?.name?.split(' ')[0] || "Rajan";
  const daughterName = patientProfile?.familyContact?.name?.split(' ')[0] || "Priya";
  const spouseName = patientProfile?.spouse?.name?.split(' ')[0] || "Meena";

  let detectedTheme = "general";
  let harmfulCorrection = "";
  let dignityResponse = "";
  let dignityRule = "";

  if (text.includes("lecture") || text.includes("class") || text.includes("student") || text.includes("teach") || text.includes("work") || text.includes("office") || text.includes("meeting")) {
    detectedTheme = "professional_identity";
    harmfulCorrection = `✗ "You are retired! You don't teach or work anymore. You haven't worked at the university in years." (Provokes acute loss of identity, agitation, and anger)`;
    dignityResponse = `✓ "Your students always loved your lectures, Professor ${patientName}. You prepared such thoughtful notes. While we wait for the morning schedule, let's have a hot cup of filter coffee together and look at the campus photos."`;
    dignityRule = "Validates professional dignity and self-worth; avoids confrontation; redirects with familiar morning sensory anchor.";
  } else if (text.includes("mother") || text.includes("father") || text.includes("mom") || text.includes("dad") || text.includes("parents")) {
    detectedTheme = "longing_for_safety";
    harmfulCorrection = `✗ "Your parents passed away decades ago. Don't you remember?" (Forces the patient to experience catastrophic fresh bereavement over and over)`;
    dignityResponse = `✓ "You are thinking about your mother's warmth today. She loved you so deeply and taught you so much kindness. ${spouseName} is here right now to take care of you with that same gentleness. Let's listen to that song you two love."`;
    dignityRule = "Honors the underlying emotional longing for unconditional safety; bridges softly to present loved ones; activates musical pathway.";
  } else if (text.includes("who are you") || text.includes("who is that") || text.includes("stranger") || text.includes("lady") || text.includes("man")) {
    detectedTheme = "face_anomia";
    harmfulCorrection = `✗ "How can you ask that?! That's ${spouseName}, your wife of 42 years! How can you not know her?" (Triggers severe shame, defensiveness, and guilt)`;
    dignityResponse = `✓ "This is ${spouseName}, your dearest companion who has loved you for 42 years since your days at Osmania. You two have shared so many peaceful evenings together. Look at this photo of her smiling with you."`;
    dignityRule = "Removes cognitive burden of recall; provides immediate loving context without demanding memory performance.";
  } else if (text.includes("home") || text.includes("go home") || text.includes("leave") || text.includes("bus") || text.includes("train") || text.includes("travel")) {
    detectedTheme = "search_for_home";
    harmfulCorrection = `✗ "You ARE home! This has been your house for 20 years. Stop trying to leave." (Traps the patient in a place that feels alien, driving door-rattling or escape attempts)`;
    dignityResponse = `✓ "You want to feel comfortable and safe, like in your childhood courtyard. We are going to make sure you are completely looked after here today. Let's sit in this soft cane chair together and listen to the rain soundscape."`;
    dignityRule = "'Home' is an emotional state of safety, not a physical address. Validates the desire for peace; stabilizes somatic anxiety.";
  } else if (text.includes("stolen") || text.includes("thief") || text.includes("wallet") || text.includes("money") || text.includes("keys") || text.includes("bag")) {
    detectedTheme = "misplaced_items";
    harmfulCorrection = `✗ "Nobody stole your things! You always misplace them yourself. Stop accusing people." (Causes intense paranoia and feeling under siege)`;
    dignityResponse = `✓ "It is so frustrating when important things aren't where you expect them to be. I am right here with you. We will keep everything safe. Let's rest our hands for a moment while I help look for it."`;
    dignityRule = "Validates the distress of loss without arguing about facts; joins as an ally against fear.";
  } else {
    detectedTheme = "general_connection";
    harmfulCorrection = `✗ "What you're saying doesn't make sense. Try to focus and speak properly." (Causes communicative withdrawal and depression)`;
    dignityResponse = `✓ "I hear you, ${patientName}. You are safe here, and your thoughts matter to us. Let's take a calm breath together while we listen to a familiar melody."`;
    dignityRule = "Core Kitwood Rule: Connection over correction. Personhood is affirmed unconditionally.";
  }

  return {
    theme: detectedTheme,
    harmfulCorrection,
    dignityResponse,
    dignityRule
  };
}
