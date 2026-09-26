import { CropDiagnosticResult } from "@/types/crop";

export interface ICropAnalysisProvider {
  analyzeCropHealth(
    crop: string,
    imageBase64: string,
    mimeType: string,
    fileName?: string
  ): Promise<CropDiagnosticResult>;
}
