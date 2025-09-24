# Swaach Saathi (Demo)

Swaach Saathi is a demo web app showcasing a smart waste management companion for citizens, workers, green champions, and ULB admins.

## Tech Stack

- Vite
- React + TypeScript
- Tailwind CSS
- shadcn-ui

## Getting Started

Prerequisites: Node.js and npm

```sh
npm install
npm run dev
```

## Project Structure

- `src/pages`: Role-based dashboards (Citizen, Worker, Champion, Admin)
- `src/components`: UI components and layout
- `src/contexts`: Auth context

## Pages & Features

- Citizen Dashboard
  - Training modules with completion action and toasts
  - Photo upload with preview and submit-for-review action
  - Live truck tracking (requires Mapbox token)
  - Leaderboard and nearby smart bins (simulated live updates)

- Worker Dashboard
  - Daily task checklist with toggle completion
  - Report issue form with photo upload and success toast
  - Progress summary

- Green Champion Dashboard
  - Manage citizen reports; update status (in progress / resolved)
  - Field audit form with validations and submission toast

- Admin Dashboard
  - City-wide vehicle tracking (Mapbox)
  - Smart bin monitoring and facility queue status
  - Smart bin distribution and compliance charts
  - Live roster: drivers/workers with demo Indian phone numbers; quick Call/SMS links
  - Quick links to view other role dashboards

## Notes

- This is a demo build for presentation and prototyping purposes.
- Branding: "Swaach Saathi".

