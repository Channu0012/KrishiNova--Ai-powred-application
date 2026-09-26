import { z } from "zod";

export const WeatherQuerySchema = z.object({
  lat: z.coerce.number().min(-90, "Latitude must be between -90 and 90").max(90, "Latitude must be between -90 and 90"),
  lon: z.coerce.number().min(-180, "Longitude must be between -180 and 180").max(180, "Longitude must be between -180 and 180"),
  crop: z.string().max(100).optional().default("General"),
  district: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
});

export type WeatherQueryParams = z.infer<typeof WeatherQuerySchema>;
