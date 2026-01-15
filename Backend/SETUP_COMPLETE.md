# ID Card Generation System - Complete Setup

## ✅ What's Been Implemented

### 1. **High-Quality ID Card Generation** 🖼️
- **Resolution**: 2x (2022×1278 pixels) for crisp, professional output
- **Compression**: Zero compression for maximum quality
- **Antialiasing**: High-quality rendering with subpixel antialiasing
- **DPI**: 300 for print-ready quality
- **Templates**: Three role-based templates
  - `id-template-contributor.png` - For Contributors
  - `id-template-mentor.png` - For Mentors
  - `id-template-admin.png` - For Project Admins

### 2. **Beautiful Modal Preview System** 🎨
- Preview ID card before download
- Animated modal with fade and scale effects
- Download button with role-specific filename
- "Generate Another" option for multiple generations

### 3. **Role-Based ID Cards** 🎯
- Automatically detects user role from database
- Selects appropriate template based on role
- Role displayed in sidebar and modal header
- Role included in download filename

### 4. **Generation Limits** ⏳
- **Max 2 ID cards per person** (enforced in database)
- Progress bar showing generations left (2/2)
- Button disables when limit reached
- Tracks `idGeneratedCount` per user

### 5. **Database Import** 📊
- **186 users imported** from CSV
  - 184 Contributors
  - 2 Project Admins
  - 0 Mentors (CSV didn't contain mentor data)
- CSV parsing handles complex form structure
- Duplicate prevention (email & GitHub username)
- Data validation for required fields

## 📋 Database Structure

### User Fields
```
email              - Unique, lowercase
fullName           - User's display name
github_username    - GitHub profile
github_id          - OAuth ID
role               - Contributor | Mentor | Admin
yearOfStudy        - 1-5 (optional)
linkedinUrl        - LinkedIn profile
avatar_url         - Profile picture URL
idGeneratedCount   - 0-2 (generation limit)
authKey            - DSW-26-XXXX (unique auth code)
isActive           - true/false
```

## 🔧 How It Works

### Frontend Flow ([GenerateId.jsx](Frontend/src/pages/GenerateId.jsx))
1. User fills form with personal details + photo
2. Submit triggers API call
3. Backend validates email in database
4. Backend checks generation limit (max 2)
5. Backend generates high-quality ID card
6. Returns image + role in response headers
7. Modal preview shows ID card
8. User downloads or generates another

### Backend Flow ([id.controller.js](Backend/src/controllers/id.controller.js))
1. Receive form data with photo
2. Query User by email from database
3. Validate user exists and has generations left
4. Generate unique auth key (DSW-26-XXXX)
5. Generate QR code with auth key
6. Select template based on user.role
7. Draw ID card on high-res canvas
8. Increment idGeneratedCount
9. Return PNG with metadata headers

## 📥 Importing More Users

```bash
cd Backend
node import-users.js "/path/to/your.csv"
```

The script will:
- Parse complex CSV structures
- Detect role based on filled columns
- Validate emails and GitHub usernames
- Skip duplicates automatically
- Show detailed import summary

## 🔐 Security Features

✅ Role verification from database (can't fake role)
✅ Generation limit enforcement (max 2 per person)
✅ Duplicate prevention (email + GitHub)
✅ Unique auth keys for verification
✅ QR code for identity verification

## 📝 Next Steps

1. **If you have Mentor data**: Provide separate CSV for mentors
2. **If you need to re-import**: Clear Users collection first:
   ```js
   db.users.deleteMany({})
   ```
3. **To update a user's role**: 
   ```js
   db.users.updateOne(
     { email: "user@email.com" },
     { $set: { role: "Mentor" } }
   )
   ```

## ✨ Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| High Quality ID Cards | ✅ | 2x resolution, 0 compression |
| Role Detection | ✅ | Auto-detects from database |
| Template System | ✅ | 3 role-based templates |
| Modal Preview | ✅ | Beautiful popup with animations |
| Generation Limits | ✅ | Max 2 per person, tracked |
| CSV Import | ✅ | 186 users imported |
| Auth Keys | ✅ | Unique DSW-26-XXXX format |
| QR Codes | ✅ | For verification |
| Database Validation | ✅ | Email checks, limit enforcement |

---

**System Ready for Production!** 🚀
