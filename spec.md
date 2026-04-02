# Anshika Udhyog SHG Portal

## Current State
Full NGO management portal with React/TypeScript frontend, yellow theme (#FFC107). Has: Homepage with slider/stats/services/gallery, Admin dashboard with stats cards + quick actions, Gallery admin (photo upload + YouTube URL video), HomepageEditor (site title, tagline, logo URL, slider, about, stats, contact), PublicLayout with 22-item slide menu, AppContext with full CRUD for SHG/loans/training/rewards/staff/branches/wallet/notifications/mlm/gallery/ticker/products/vacancies/page-contents/site-settings.

## Requested Changes (Diff)

### Add
- `Member` type: id, name, photo, location, designation, idNumber, active — for Members Slider on homepage and menu verify
- `TeamMember` type: id, name, photo, designation, shortMessage, active — for Our Team section on homepage
- `TeamReview` type: id, memberName, photo, rating, message, active — for Happy Team Reviews on homepage
- `Award` type: id, title, description, imageUrl, year, active — for Best Awards section on homepage
- CRUD for all four in AppContext and seedData (3-5 sample items each)
- `MemberManager` admin page — add/edit/delete members with photo upload from file
- `TeamManager` admin page — add/edit/delete team members with photo upload
- `ReviewManager` admin page — add/edit/delete happy team reviews
- `AwardManager` admin page — add/edit/delete best awards
- Members Slider section on HomePage: smooth auto-sliding cards showing member photo, name, location, designation
- Our Team section on HomePage: special font/frame/card design with photo, name, short message, designation
- Happy Team Review section on HomePage: review cards with photo, name, message, star rating
- Best Awards section on HomePage: award cards with image/icon, title, description, year
- Video file upload in Gallery admin (video file input alongside YouTube URL option)
- Logo file upload in HomepageEditor Site tab (upload from device, store as base64 dataURL)
- Slider image upload from gallery in HomepageEditor Slider tab (button to pick from galleryItems photos)
- Member Verify section in slide menu: input field for ID number, shows member details if found
- All new admin pages added to AdminDashboard quick actions and sidebar navigation
- All public pages linked to their admin edit equivalents in admin nav

### Modify
- Service cards on HomePage: each card gets onClick that navigates to the related page (loan→shg_program, training→training_pub, rewards→rewards_pub, wallet→login, mlm→cottage, id card→login/signup)
- Gallery admin: add third button "📹 Upload Video File" with file input for video files
- HomepageEditor Site tab: replace logo URL input with file upload button + keep URL fallback
- HomepageEditor Slider tab: each slide gets a "Pick from Gallery" button that opens gallery photos as thumbnails to select as imageUrl
- AdminDashboard: add section "Content Management" with quick links to all content admin pages (Homepage Editor, Gallery, Page Content, Ticker, Members, Team, Reviews, Awards, Shopping, Vacancies, Menus)
- App.tsx: add routes for admin_members, admin_team, admin_reviews, admin_awards
- PublicLayout slide menu: add Member Verify item that opens inline verify panel
- Layout.tsx (admin sidebar): add new admin pages to sidebar nav

### Remove
- Nothing removed

## Implementation Plan
1. Update `types.ts` — add Member, TeamMember, TeamReview, Award interfaces; update AppState
2. Update `seedData.ts` — add sample members, teamMembers, teamReviews, awards arrays in initialState
3. Update `AppContext.tsx` — add CRUD functions for all four new types; add to context interface and provider
4. Update `Gallery.tsx` admin — add video file upload option (file input reads as base64 dataURL)
5. Update `HomepageEditor.tsx` — logo file upload button + slider gallery picker
6. Update `HomePage.tsx` — add Members Slider, Our Team, Happy Reviews, Best Awards sections; add page links to service cards
7. Create `src/frontend/src/pages/admin/MemberManager.tsx`
8. Create `src/frontend/src/pages/admin/TeamManager.tsx`
9. Create `src/frontend/src/pages/admin/ReviewManager.tsx`
10. Create `src/frontend/src/pages/admin/AwardManager.tsx`
11. Update `AdminDashboard.tsx` — add content management section
12. Update `Layout.tsx` — add new admin pages to sidebar
13. Update `PublicLayout.tsx` — add member verify panel in menu
14. Update `App.tsx` — add new routes
