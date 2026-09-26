# KrishiNova: Production Deployment & AWS Infrastructure Guide

**Target Cloud:** Amazon Web Services (AWS)  
**Hosting Platform:** AWS Amplify Hosting (Next.js SSR & Serverless Compute)  
**Region:** `ap-south-1` (Mumbai, India) for lowest latency to Indian agricultural regions  

---

## 1. Prerequisites & AWS Resources

Before launching to production, ensure the following AWS resources are provisioned in the `ap-south-1` region:
1. **AWS Account** with administrative or DevOps IAM credentials.
2. **Amazon Bedrock Model Access:**
   - Enable model access in the AWS Bedrock Console for:
     - `amazon.nova-lite-v1:0` (Text agronomic advisory)
     - `amazon.nova-pro-v1:0` (Multimodal vision crop diagnostics)
3. **Amazon DynamoDB Table:**
   - Table Name: `KrishiNovaTable-prod`
   - Partition Key: `PK` (String)
   - Sort Key: `SK` (String)
   - Indexes: `GSI1` (`GSI1PK`, `GSI1SK`), `GSI2` (`GSI2PK`, `GSI2SK`)
   - TTL Attribute: `ttl`
4. **Amazon S3 Bucket:**
   - Bucket Name: `krishinova-crop-assets-prod`
   - Default encryption: SSE-KMS
   - Public access: Block all public access enabled
5. **Amazon Cognito User Pool:**
   - Name: `KrishiNova-UserPool-prod`
   - Attributes: Email (required, verified)

---

## 2. Environment Variables Configuration

Create and populate the environment variables in the AWS Amplify Console under **App Settings > Environment Variables**:

| Variable Name | Environment | Description | Example / Required Format |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | Production | Node runtime mode | `production` |
| `AWS_REGION` | All | Deployment region | `ap-south-1` |
| `BEDROCK_REGION` | All | Amazon Bedrock region | `ap-south-1` or `us-east-1` |
| `BEDROCK_MODEL_ID` | Production | Bedrock model identifier | `amazon.nova-lite-v1:0` |
| `BEDROCK_VISION_MODEL_ID`| Production | Vision model identifier | `amazon.nova-pro-v1:0` |
| `AWS_ACCESS_KEY_ID` | Optional | AWS credentials (IAM role preferred) | IAM User or Lambda Execution Role |
| `AWS_SECRET_ACCESS_KEY` | Optional | AWS secret key | IAM User or Lambda Execution Role |
| `DYNAMODB_TABLE_NAME` | Production | DynamoDB table name | `KrishiNovaTable-prod` |
| `S3_ASSETS_BUCKET` | Production | S3 crop upload bucket | `krishinova-crop-assets-prod` |
| `NEXTAUTH_SECRET` | Production | Cryptographic session salt | 64-char random hex string |
| `NEXT_PUBLIC_APP_URL` | Production | Canonical public URL | `https://krishinova.in` |

---

## 3. Step-by-Step AWS Amplify Deployment

### Step 3.1: Connect Repository to AWS Amplify
1. Open the [AWS Amplify Console](https://console.aws.amazon.com/amplify/).
2. Click **Create new app** > **Host web app**.
3. Choose your Git provider (GitHub, GitLab, AWS CodeCommit, or Bitbucket) and authorize access.
4. Select the repository `AWS krushi project` and the target branch (`main` or `production`).

### Step 3.2: Configure Build Settings
Amplify automatically detects Next.js SSR. Verify the build specifications in `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Step 3.3: Deploy & Verify Staging URL
1. Click **Save and Deploy**.
2. Amplify will execute Provision -> Build -> Deploy -> Verify.
3. Access the generated preview URL (e.g. `https://main.d12345abcdef.amplifyapp.com`).
4. Inspect logs to confirm zero SSR build errors.

---

## 4. Custom Domain Connection & HTTPS Configuration

In accordance with Section 36 of the specification, the application cannot be declared production-ready until connected to a custom domain with valid SSL/TLS certificates.

### Step 4.1: Add Custom Domain in Amplify
1. In the Amplify console, navigate to **App Settings > Domain management**.
2. Click **Add domain**.
3. Enter your registered domain: e.g. `krishinova.in` (and `www.krishinova.in`).
4. Click **Configure domain**.

### Step 4.2: DNS & SSL/TLS Verification (Route 53 or External DNS)
- **If using AWS Route 53:** Amplify automatically configures alias records (`A`) and issues an ACM SSL certificate.
- **If using external DNS (Cloudflare / GoDaddy / Namecheap):**
  1. Add the `CNAME` record provided by AWS Amplify for SSL certificate verification.
  2. Add the `CNAME` record pointing `www.krishinova.in` to `d12345abcdef.cloudfront.net`.
  3. Add the `ANAME` or `ALIAS` record for the root apex domain `@` pointing to the CloudFront distribution.
  4. Wait for DNS propagation (typically 5 to 15 minutes).

### Step 4.3: Validate HTTPS & Redirection
1. Verify that `http://krishinova.in` automatically redirects to `https://krishinova.in` with a 301 permanent redirect.
2. Confirm SSL certificate displays valid chain issued by Amazon Trust Services.
3. Verify that all API routes (`/api/weather`, `/api/markets`, `/api/ai/advice`) respond with valid CORS headers matching the custom domain.

---

## 5. Post-Deployment Verification Checklist

- [ ] HTTPS lock icon verified in Chrome, Firefox, Safari, and Mobile browsers.
- [ ] Root redirect (`www` -> apex or apex -> `www`) operating cleanly.
- [ ] Real weather coordinates test for major agricultural hubs:
  - Nashik, Maharashtra (`20.0059, 73.7997`)
  - Guntur, Andhra Pradesh (`16.3067, 80.4365`)
  - Ludhiana, Punjab (`30.9010, 75.8573`)
- [ ] Mandi rates endpoint tested for live data and empty states.
- [ ] Image upload scanner tested with valid JPG (< 5MB) and invalid non-image payload.
- [ ] Structured AI response verified with agronomic disclaimers.
- [ ] Zero console errors in browser dev tools.
