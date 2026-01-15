# ID Card Templates

## Overview
The ID card generation system now supports role-based templates for different user types.

## Template Files
Located in `/Backend/assets/`:

- **id-template-contributor.png** - For Contributors (default/participants)
- **id-template-mentor.png** - For Mentors
- **id-template-admin.png** - For Project Admins

## How It Works

1. When a user generates an ID card, the system checks their role from the User model
2. The appropriate template is selected based on their role:
   - `role: 'Contributor'` → uses contributor template
   - `role: 'Mentor'` → uses mentor template  
   - `role: 'Admin'` → uses admin template
   - Any other role (including 'Participant') → defaults to contributor template

3. The system overlays user information on the selected template:
   - User photo (oval shape)
   - Full name
   - GitHub username
   - LinkedIn profile
   - Email
   - Auth key (format: DSW-26-XXXX)
   - QR code for verification

## Image Quality

The ID cards are now generated with **high quality settings**:
- Compression level: 3 (lower = better quality, range 0-9)
- PNG filters: None (faster and better quality)
- Output format: PNG with no quality loss

This ensures crisp, professional-looking ID cards suitable for printing or digital display.

## Code Reference

- Template selection: `/Backend/src/controllers/id.controller.js` - `getTemplatePath()` function
- Image generation: `/Backend/src/utils/drawIdCard.js` - `canvas.toBuffer()` with quality settings
- User roles: `/Backend/src/models/User.model.js` - `role` field enum

## Testing

In testing mode (database lookup disabled), users are assigned 'Participant' role which defaults to the contributor template. In production, actual user roles from the database will be used.
