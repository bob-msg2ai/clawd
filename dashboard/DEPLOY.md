# OpenClaw Mission Control Dashboard

## Deployment Guide

### Prerequisites
- Node.js 18+
- Vercel CLI (optional): `npm i -g vercel`
- Convex account

### Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Add your Convex URL to .env.local:
# NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

# Run Convex dev server
npx convex dev

# Run Next.js dev server
npm run dev
```

### Deploy to Vercel

#### Option 1: Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option 2: Git Integration

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Set environment variables:
   - `NEXT_PUBLIC_CONVEX_URL`
4. Deploy

#### Option 3: Manual Build

```bash
# Build locally
npm run build

# Deploy build output
vercel --prod --prebuilt
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL | Yes |
| `OPENCLAW_WORKSPACE_PATH` | Path to ~/.openclaw/workspace | No (defaults to homedir) |

### Convex Setup

1. Create Convex project:
   ```bash
   npx convex dev
   ```

2. Deploy Convex schema:
   ```bash
   npx convex deploy
   ```

3. Copy deployment URL for Vercel env var

### Post-Deployment

The API routes that read from filesystem (`/api/*`) will only work if:
- Deployed to a serverful environment (not static), OR
- You implement a remote file access pattern

For true filesystem access, consider:
- Running dashboard on same machine as OpenClaw
- Using a Node server/VPS instead of serverless
- Implementing a sync mechanism to cloud storage

### Build Output

```
.next/
├── server/
│   ├── app/
│   │   ├── page.js
│   │   └── api/
│   └── chunks/
├── static/
└── ...
```

### Troubleshooting

**Issue: API routes return 404**
- Ensure `vercel.json` has proper rewrites
- Check that API routes are in `app/api/*/route.ts`

**Issue: Convex connection fails**
- Verify `NEXT_PUBLIC_CONVEX_URL` is set
- Ensure Convex deployment is active

**Issue: Filesystem API fails**
- Serverless functions have ephemeral filesystem
- Consider mounting persistent storage or using remote sync
