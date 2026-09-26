import { z } from "zod";

export const MarketQuerySchema = z.object({
  state: z.string().min(2, "State name must be at least 2 characters").max(100),
  district: z.string().max(100).optional(),
  commodity: z.string().max(100).optional(),
});

export type MarketQueryParams = z.infer<typeof MarketQuerySchema>;
