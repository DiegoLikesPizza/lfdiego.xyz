// Parse and validate a model's JSON answer before using it. No dependencies (Zod would be shorter).
const answer = `[
  { "owner": "Ada", "task": "Send the Q3 numbers", "due": "Friday" },
  { "owner": "Grace", "task": "Check EU server readiness", "due": null }
]`;

function validateActionItems(text) {
  let data;
  try { data = JSON.parse(text); } catch (e) { return { ok: false, error: `not JSON: ${e.message}` }; }
  if (!Array.isArray(data)) return { ok: false, error: "expected an array" };
  for (const [i, item] of data.entries()) {
    if (typeof item.owner !== "string" || !item.owner) return { ok: false, error: `item ${i}: owner must be a non-empty string` };
    if (typeof item.task !== "string" || !item.task) return { ok: false, error: `item ${i}: task must be a non-empty string` };
    if (!(item.due === null || typeof item.due === "string")) return { ok: false, error: `item ${i}: due must be a string or null` };
  }
  return { ok: true, data };
}

console.log(validateActionItems(answer));
console.log(validateActionItems('Sure! Here are the action items: [{"owner": "Ada"}]'));
console.log(validateActionItems('[{"owner": "Ada", "task": "", "due": "Friday"}]'));
