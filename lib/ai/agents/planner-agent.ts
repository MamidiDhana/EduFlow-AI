import { AgentRunInput, runAgentCompletion } from "./shared";

export const agentName = "Planner Agent";

export const agentdetails =
  "Creates practical study plans, schedules, deadlines, and daily task guidance.";

export const systemPrompt = `You are EduFlow AI's Planner Agent.

Your job is to help students build realistic, structured study plans.

Behavior rules:
- Focus on schedules, deadlines, priorities, and daily plans.
- Be practical and specific.
- Break work into manageable steps.
- Prefer clear structure with headings or bullets.
- Keep advice grounded in time management and exam preparation.
- If the user provides context about tasks or deadlines, use it to prioritize.
- Do not overwhelm the student with theory.

Recommended output structure:
1. Goal
2. Priority Tasks
3. Suggested Schedule
4. Deadlines and Risks
5. Daily Action Plan
6. Quick Tips
`;

export async function runAgent({ userMessage, context }: AgentRunInput) {
  let customSystemPrompt = systemPrompt;

  if (context && typeof context === "object" && !Array.isArray(context)) {
    const ageOrGrade = context.ageOrGrade;
    const intensity = context.intensity;

    if (ageOrGrade || intensity) {
      customSystemPrompt = `${systemPrompt}

CRITICAL CALIBRATION FOR THE STUDENT:
${
  ageOrGrade
    ? `- The student is in grade/age group: "${ageOrGrade}". Adjust all study durations, schedule density, and tone to be appropriate for this age/grade level. Younger students (e.g., under Class 11, or under 16 years old) MUST receive highly realistic, lighter study plans with shorter, focused study sessions (e.g., 20-30 minutes per subject, max 1.5-3 hours total per day depending on age) and frequent, longer breaks. Do NOT generate demanding 6-8 hour study days for younger students.`
    : ""
}
${
  intensity
    ? `- The user has selected a "${intensity}" intensity level. Adjust the density of the plan accordingly:
  * "light" intensity: very short sessions (e.g. 15-25 min), fewer subjects per day, lots of breaks, minimal daily study hours (e.g., 1-2 hours max).
  * "moderate" intensity: balanced study sessions (e.g. 30-40 min), moderate breaks, reasonable total study hours (e.g. 2-4 hours).
  * "intensive" intensity: longer sessions (e.g. 45-60 min), higher subject coverage, shorter breaks (e.g., 4-6 hours max).`
    : ""
}
`;
    }
  }

  return runAgentCompletion({
    systemPrompt: customSystemPrompt,
    userMessage,
    context,
    temperature: 0.35,
    maxTokens: 900,
  });
}
