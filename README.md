# Pathlo Data Notes

## Dataset Scope

Pathlo is a college discovery platform for modern Indian students.

The college dataset intentionally includes all of the following categories:

- Traditional colleges and engineering institutions such as IITs, NITs, BITS, IIITs, and major private universities
- Liberal arts and multidisciplinary universities such as Ashoka, FLAME, Krea, Ahmedabad University, and JGU
- Business and management pathways such as Masters' Union, NMIMS, Symbiosis, SSCBS, and IIM IPM programs
- New-age tech institutions such as Scaler, Newton School of Technology, Masai, Coding Ninjas, upGrad Campus, and NIIT University
- Research-focused institutes such as IISc, IISERs, NISER, ISI, ICT, and TIFR

These categories are all product requirements, not temporary experiments.

## Data Philosophy

- Keep real institutions across all intended categories
- Remove only clearly fake or placeholder entries
- Never shrink coverage by treating new-age or business institutions as invalid
- If a field is not verified, leave it empty or hide it in the UI
- Do not fabricate reviews, alumni, rankings, fee data, or placeholder college records

Rule of thumb:

> Prefer empty or hidden over fake.

## Current Goal

- Maintain a restored dataset in the 40 to 60 college range
- Keep category distribution balanced across tech, business, liberal arts, research, and new-age paths
- Keep `src/data/colleges.js` as the source of truth for listing data
- Keep `src/data/collegeDetails.js` synced to the same IDs and real institutions

## Data Files

- `src/data/colleges.js` -> source dataset for college listings
- `src/data/collegeDataset.js` -> normalized dataset used by listing and filter UI
- `src/data/collegeDetails.js` -> detail-page data derived from the same college IDs
- `src/data/examDataset.js` -> normalized exam dataset

## Guardrail

New-age tech schools and business institutions are core to Pathlo.

They must not be removed again during future data cleanup unless the institution itself is clearly fake or no longer relevant to the product.

## UI & Behavior Guardrails

- Do not redesign UI layouts unless explicitly asked
- Do not change routing structure (e.g., /colleges/:id)
- Do not rename or restructure major components (Navbar, CollegeCard, AuthPage, etc.)
- Do not introduce duplicate sections or repeated headings
- Do not auto-add placeholder text like "Information not available"

### Navigation Rules

- College pages must open smoothly at top without scroll jump
- Exam clicks should not redirect to a different page unless explicitly required
- External links (YouTube, Google, Reddit, Quora) should open search queries, not hardcoded fake links

### Auth Rules

- Auth uses Supabase email/password
- Do not modify auth logic unless explicitly requested
- UI should show clear messages (e.g., email verification required)

### Display Rules

- Show only verified data
- If data is missing → hide section instead of showing placeholder text
- Limit tags per college card (max 3–5)
- Use icons instead of redundant text where possible

### Data Integrity Rules

- Do not replace entire dataset
- Only add or update entries
- Maintain ID consistency between:
  - colleges.js
  - collegeDetails.js
