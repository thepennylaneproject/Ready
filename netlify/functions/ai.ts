// netlify/functions/ai.ts
import type { Handler } from "@netlify/functions";
import {
  createResponse,
  handleCORS,
  verifyToken,
  createAdminClient,
} from "./utils/supabase";
import { runAI } from "./ai/run";
import type { UserTier } from "../src/lib/ai/types";

async function getUserTier(userId: string): Promise<UserTier> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("tier")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return "free";
  }
  return (data.tier as UserTier) || "free";
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return handleCORS();
  }

  if (event.httpMethod !== "POST") {
    return createResponse(405, { error: "Method not allowed" });
  }

  const authHeader = event.headers.authorization || event.headers.Authorization;
  const { userId, error: authError } = await verifyToken(authHeader);

  // Some tasks might be public, but for now we require auth for all AI tasks
  if (authError || !userId) {
    return createResponse(401, { error: authError || "Unauthorized" });
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { task, input, quality, jsonSchema, traceId } = body;

    if (!task || !input) {
      return createResponse(400, { error: "Missing task or input" });
    }

    const tier = await getUserTier(userId);

    const result = await runAI({
      task,
      input,
      userId,
      tier,
      quality,
      jsonSchema,
      traceId,
    });

    if (!result.ok) {
      return createResponse(502, {
        success: false,
        error: result.error_message || "AI Generation failed",
        reason: result.reason,
        trace_id: result.trace_id,
      });
    }

    return createResponse(200, {
      success: true,
      data: result.output,
      provider: result.provider,
      model: result.model,
      latency_ms: result.latency_ms,
      cost_estimate: result.cost_estimate,
      trace_id: result.trace_id,
    });
  } catch (err: any) {
    console.error("[AI Function] Handler error:", err);
    return createResponse(500, {
      error: "Internal server error",
      details: err.message,
    });
  }
};
