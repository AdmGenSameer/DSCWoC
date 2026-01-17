# 🔒 SECURITY INCIDENT RECOVERY GUIDE

## ⚠️ IMMEDIATE ACTIONS COMPLETED
- ✅ User data deleted from Supabase
- ✅ Need to regenerate Supabase keys
- ✅ .gitignore created for Frontend

---

## 📋 STEP-BY-STEP RECOVERY PROCESS

### 1. **Remove .env from Git History** (DO THIS FIRST!)

The .env file is currently tracked in git. Remove it completely:

```bash
cd /home/samarcher/Documents/DSCWoC

# Remove .env from git tracking (but keep local file)
git rm --cached Frontend/.env

# Commit the removal
git commit -m "chore: remove .env from version control for security"

# Remove from entire git history (IMPORTANT!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch Frontend/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push to remote (WARNING: This rewrites history)
git push origin --force --all
```

**Alternative (if filter-branch fails):** Use BFG Repo Cleaner:
```bash
# Install BFG (if not installed)
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Run BFG to remove .env
java -jar bfg.jar --delete-files .env
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push origin --force --all
```

---

### 2. **Regenerate Supabase Keys** 🔑

#### Go to Supabase Dashboard:
1. Visit: https://app.supabase.com/project/gcnkrugnklihpsvweuop
2. Go to **Settings** → **API**
3. Under "Project API keys" section:
   - Click **"Reset anon key"** → Confirm
   - Click **"Reset service_role key"** → Confirm (if backend uses it)
4. Copy the new keys to your local `.env` file

#### Update Frontend/.env with NEW keys:
```env
VITE_SUPABASE_URL=https://gcnkrugnklihpsvweuop.supabase.co
VITE_SUPABASE_ANON_KEY=<NEW_ANON_KEY_HERE>
VITE_SITE_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

#### Update Backend/.env with NEW keys (if applicable):
```env
SUPABASE_URL=https://gcnkrugnklihpsvweuop.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<NEW_SERVICE_ROLE_KEY_HERE>
```

---

### 3. **Configure Supabase Security Settings** 🛡️

#### A. Enable Row Level Security (RLS)
1. Go to **Database** → **Tables**
2. For each table, enable RLS:
   - Click on table → **RLS** tab
   - Enable RLS
   - Add policies (examples below)

**Example RLS Policies:**

```sql
-- Users table: Users can only read their own data
CREATE POLICY "Users can view own data"
ON public.users FOR SELECT
USING (auth.uid() = id);

-- Users table: Only admins can update roles
CREATE POLICY "Only admins can update roles"
ON public.users FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'Admin'
  )
);
```

#### B. Configure Auth Settings
1. Go to **Authentication** → **Providers**
2. **GitHub OAuth:**
   - Keep existing GitHub OAuth app credentials
   - Add authorized callback URLs:
     ```
     http://localhost:5173/auth/callback
     https://your-production-domain.com/auth/callback
     ```

3. **URL Configuration:**
   - Go to **Authentication** → **URL Configuration**
   - Site URL: `http://localhost:5173` (for local)
   - Redirect URLs: Add all valid callback URLs

#### C. Email Rate Limiting
1. Go to **Authentication** → **Rate Limits**
2. Enable rate limiting:
   - Max requests per hour: 10-20
   - Prevents abuse

#### D. Database Connection Pooling
1. Go to **Settings** → **Database**
2. Enable **Connection Pooler**
3. Use pooled connection string in production

---

### 4. **Backend Security Enhancements** 🔐

#### Update Backend Environment Variables:
Ensure Backend/.env has:

```env
# Database
MONGODB_URI=your_mongodb_uri_here

# JWT Secret (GENERATE NEW ONE!)
JWT_SECRET=<GENERATE_NEW_RANDOM_STRING_64_CHARS>

# Supabase (NEW KEYS!)
SUPABASE_URL=https://gcnkrugnklihpsvweuop.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<NEW_SERVICE_ROLE_KEY>

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://your-production-domain.com

# Session Secret (GENERATE NEW!)
SESSION_SECRET=<GENERATE_NEW_RANDOM_STRING_64_CHARS>
```

**Generate new secrets:**
```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Add Security Headers:
Update Backend/src/app.js with helmet:

```javascript
import helmet from 'helmet';

// Add security headers
app.use(helmet({
  contentSecurityPolicy: false, // Configure as needed
  crossOriginEmbedderPolicy: false,
}));
```

---

### 5. **Additional Security Measures** 🚨

#### A. Environment Variable Validation
Create `Frontend/src/config/env.js`:

```javascript
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_SITE_URL',
  'VITE_API_BASE_URL'
];

requiredEnvVars.forEach(varName => {
  if (!import.meta.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  siteUrl: import.meta.env.VITE_SITE_URL,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
};
```

#### B. Add .env to .gitignore (DONE ✅)
Already created Frontend/.gitignore

#### C. Enable 2FA on Critical Accounts
- Enable 2FA on your GitHub account
- Enable 2FA on Supabase account
- Enable 2FA on Railway/hosting accounts

#### D. Rotate Other Secrets
If you use any of these, rotate them:
- MongoDB connection strings
- Railway API tokens
- GitHub OAuth app secrets
- Any other API keys

---

### 6. **Update Production Environment Variables** 🌐

#### Railway (or your hosting platform):
1. Go to your Railway project
2. Navigate to **Variables** tab
3. Update all environment variables with NEW values
4. Redeploy the application

#### Vercel (if using for Frontend):
1. Go to project settings
2. **Environment Variables**
3. Update all VITE_* variables
4. Redeploy

---

### 7. **Verification Checklist** ✅

After completing all steps:

- [ ] `.env` removed from git history
- [ ] `.env` added to `.gitignore`
- [ ] New Supabase keys generated and updated
- [ ] JWT_SECRET regenerated
- [ ] SESSION_SECRET regenerated
- [ ] Row Level Security enabled on Supabase
- [ ] Supabase auth callback URLs configured
- [ ] Backend security headers added
- [ ] Production environment variables updated
- [ ] 2FA enabled on critical accounts
- [ ] Test login flow works with new keys
- [ ] Test API endpoints work correctly

---

### 8. **GitHub Security Scan** 🔍

GitHub may have detected exposed secrets. Check:

1. Go to your GitHub repo
2. **Security** tab → **Secret scanning alerts**
3. Mark any alerts as "Revoked" (since you've regenerated keys)

---

### 9. **Future Prevention** 🛡️

#### Pre-commit Hook to Prevent .env Commits:

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash

# Check for .env files
if git diff --cached --name-only | grep -E '\.env$'; then
  echo "❌ ERROR: Attempting to commit .env file!"
  echo "Please remove .env from staging area:"
  echo "  git reset HEAD .env"
  exit 1
fi

# Check for potential secrets
if git diff --cached | grep -E 'SUPABASE.*KEY|JWT_SECRET|MONGODB_URI'; then
  echo "⚠️  WARNING: Potential secret detected in commit!"
  echo "Please review your changes carefully."
  read -p "Continue anyway? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

#### Use git-secrets or gitleaks:
```bash
# Install git-secrets
brew install git-secrets  # macOS
# or download from: https://github.com/awslabs/git-secrets

# Setup
git secrets --install
git secrets --register-aws
git secrets --add 'SUPABASE.*KEY'
git secrets --add 'JWT_SECRET'
```

---

## 📞 Need Help?

- **Supabase Support:** https://supabase.com/support
- **GitHub Secret Scanning:** https://docs.github.com/en/code-security/secret-scanning

---

## 🎯 Next Steps

1. **Remove .env from git** (most critical!)
2. **Regenerate ALL Supabase keys**
3. **Generate new JWT and session secrets**
4. **Enable Supabase RLS**
5. **Update production environment variables**
6. **Test everything works**
7. **Setup pre-commit hooks**

Good luck! 🚀
