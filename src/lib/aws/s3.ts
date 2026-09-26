import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

let s3Client: S3Client | null = null;

export function getS3Client(): S3Client | null {
  if (s3Client) return s3Client;

  const region = process.env.AWS_REGION || "ap-south-1";
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return null;
  }

  try {
    s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN,
      },
    });

    return s3Client;
  } catch (err) {
    console.warn("Failed to initialize S3 client:", err);
    return null;
  }
}

export async function uploadToS3(
  buffer: Buffer,
  mimeType: string,
  key: string
): Promise<{ success: boolean; url: string }> {
  const client = getS3Client();
  const bucket = process.env.S3_ASSETS_BUCKET || "krishinova-crop-assets-dev";

  if (!client) {
    // Local development fallback: returns data URI representation
    return {
      success: true,
      url: `data:${mimeType};base64,${buffer.toString("base64")}`,
    };
  }

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: mimeType,
    ServerSideEncryption: "AES256",
  });

  await client.send(command);
  return {
    success: true,
    url: `https://${bucket}.s3.${process.env.AWS_REGION || "ap-south-1"}.amazonaws.com/${key}`,
  };
}
