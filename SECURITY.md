# KrishiNova: Security & Data Protection Architecture

**Security Standard:** AWS Well-Architected Framework (Security Pillar) & OWASP Top 10  
**Classification:** Confidential / Public Interface Specification  

---

## 1. Zero Trust Architectural Principles

1. **Zero Client Secret Exposure:** No API keys, AWS credentials, database URIs, or internal service endpoints exist within client-side code (`NEXT_PUBLIC_*`).
2. **Server-Side Provider Isolation:** All external calls (Open-Meteo, Agmarknet, Amazon Bedrock, Amazon S3, DynamoDB) originate from serverless API routes or Lambda functions behind authenticated boundaries.
3. **Strict Input Sanitization & Validation:** All incoming payloads are validated using strict Zod schemas with rejection of extra properties (`strip` or `strict`).
4. **Sanitized Error Responses:** Client error responses contain structured, safe codes (e.g. `INVALID_INPUT`, `SERVICE_UNAVAILABLE`). Stack traces and internal AWS error messages are stripped and logged only to server-side telemetry.

---

## 2. Authentication & Authorization

### 2.1 Amazon Cognito Integration
- **User Pool Configuration:**
  - Username attribute: Email address.
  - Password complexity: Minimum 8 characters, requiring uppercase, lowercase, numbers, and special characters.
  - Multi-Factor Authentication (MFA): Optional SMS / TOTP for administrative and FPO accounts.
  - Account recovery: Secure email verification link.
- **Session Tokens:**
  - Cognito ID & Access Tokens are transmitted via secure `HttpOnly`, `SameSite=Lax`, `Secure` cookies.
  - Refresh tokens are stored encrypted and invalidated upon logout.

### 2.2 Role-Based Access Control (RBAC)
- `FARMER`: Access to own profile, personal crop diagnostic history, and public weather/market data.
- `EXTENSION_OFFICER`: Can review aggregated, anonymized district disease reports.
- `ADMIN`: Infrastructure monitoring and scheme catalog curation.

---

## 3. File & Image Upload Security (Crop Diagnostic Pipeline)

To protect against malicious payloads, remote code execution, and denial of service:
1. **Content-Length Limit:** Enforced at the edge (max 5,242,880 bytes / 5MB).
2. **MIME Type Whitelist:** Restricted to `image/jpeg`, `image/png`, and `image/webp`.
3. **Magic Byte Inspection:** Server-side validation inspects the first 8 bytes of the binary stream:
   - JPEG: `FF D8 FF`
   - PNG: `89 50 4E 47 0D 0A 1A 0A`
   - WebP: `52 49 46 46 ... 57 45 42 50`
4. **Filename Re-keying:** User-supplied filenames are discarded. Files are stored using cryptographic UUIDs (`uploads/crops/<userId>/<uuid>.<ext>`).
5. **S3 Bucket Restrictions:**
   - Public access blocked (`BlockPublicAcls`, `IgnorePublicAcls`, `BlockPublicPolicy`, `RestrictPublicBuckets`).
   - Server-Side Encryption with KMS (SSE-KMS) enforced.
   - Images accessed strictly via short-lived AWS presigned URLs (15-minute TTL).

---

## 4. HTTP Security Headers & Content Security Policy (CSP)

KrishiNova enforces strict HTTP response headers via `next.config.ts`:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https://*.amazonaws.com;
  connect-src 'self' https://api.open-meteo.com https://*.amazonaws.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';

Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(self), geolocation=(self), microphone=()
```

---

## 5. Rate Limiting & Denial of Service Protection

- **Public Endpoints (`/api/weather`, `/api/markets`):** Rate limited to 60 requests per minute per IP.
- **AI Inference Endpoints (`/api/ai/advice`, `/api/crop-analysis`):** Rate limited to 10 requests per minute per user to control Amazon Bedrock token expenditure.
- **Auth Endpoints (`/api/auth/*`):** Rate limited to 5 attempts per 15 minutes per IP to mitigate credential stuffing.

---

## 6. Secrets Management & Environment Isolation

- Secrets are never checked into version control (`.gitignore` excludes `.env*`, `.env.local`, `amplifyconfiguration.json`).
- In production, secrets are injected via AWS Amplify Environment Variables and AWS Secrets Manager.
- Continuous integration pipelines run `git-secrets` and `trufflehog` pre-commit checks.
