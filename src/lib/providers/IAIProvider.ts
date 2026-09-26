import { FarmContext, AIAdvisoryResponse } from "@/types/ai";

export interface IAIProvider {
  generateAgronomicAdvice(context: FarmContext, query: string): Promise<AIAdvisoryResponse>;
}
