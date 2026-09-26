import { z } from "zod";

export const SchemeQuerySchema = z.object({
  category: z.enum(["ALL", "INCOME_SUPPORT", "INSURANCE", "IRRIGATION", "CREDIT", "ORGANIC", "MACHINERY"]).optional().default("ALL"),
  search: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
});

export type SchemeQueryParams = z.infer<typeof SchemeQuerySchema>;
