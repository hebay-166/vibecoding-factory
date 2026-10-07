import { createAnthropic } from "@ai-sdk/anthropic";

// GLM via Anthropic-compatible endpoint (bigmodel.cn).
// All stations use the same GLM-5.3 model for Phase 1 (get it running first).
// Phase 2 can differentiate: implementer gets a stronger model, reviewer gets a different vendor.
const glm = createAnthropic({
  baseURL: `${process.env.GLM_BASE_URL ?? "https://open.bigmodel.cn/api/anthropic"}/v1`,
  apiKey: process.env.GLM_API_KEY,
});

const model = () => glm(process.env.GLM_MODEL ?? "glm-5.3");

export const MODELS = {
  analyst: model(),
  classifier: model(),
  implementer: model(), // Phase 2: consider a different model for coding
  orchestrator: model(),
  researcher: model(),
  reviewer: model(), // Phase 2: consider a different vendor for independent review
} as const;

export type FactoryAgent = keyof typeof MODELS;
