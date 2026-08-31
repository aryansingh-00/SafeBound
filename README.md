# 🛡️ SafeBound — AI Travel Commerce Agent

> **One trip. One payment. Zero hassle.**

🌐 **Live Demo:** [https://safe-bound.vercel.app/](https://safe-bound.vercel.app/)

---

## What is SafeBound?

SafeBound is a full-stack AI-native travel commerce platform built to show what happens when you stop treating travel booking as a search problem and start treating it as an **intelligence + coordination problem**.

> *"I don't have to manage five different bookings. SafeBound turns them into one trip."*

SafeBound connects train tickets, hotels, cab transfers, activities, and payments into a **single, living, AI-managed trip** — and keeps monitoring it long after you pay.

---

## Core Principle

```
AI decides what should happen.
Razorpay handles the money.
Deterministic backend logic controls whether anything is actually allowed to happen.
```

Booking is not the end of the journey. It is the beginning of SafeBound's responsibility.

---

## The Full 25-Step Platform

| Step | Feature | Route |
|:----:|:--------|:------|
| 1–8  | Consumer Lifecycle, Onboarding, Auth | `/`, `/dashboard` |
| 9–12 | Admin & Agent Monitoring Console | `/admin` |
| 13–16 | Backend Architecture & Swarm Sandbox | `/architecture` |
| 17–18 | AI Swarm Agent Infrastructure | `/architecture` |
| 19 | 🎯 AI Travel Decision Agent | `/decision-agent` |
| 20 | 📦 Package Builder & Optimization Agent | `/package-builder` |
| 21 | 🛡️ Booking Orchestrator | `/booking-orchestrator` |
| 22 | 🔌 Specialized Provider Agents | `/provider-agents` |
| 23 | 💳 Razorpay Payment & Commerce Layer | `/checkout/:tripId` |
| 24 | 📡 Live Trip Monitoring & Recovery Engine | `/live-monitoring` |
| 25 | 📋 Smart Itinerary, Documents & Email Engine | `/trips/:tripId/itinerary` |

---

## Architecture

```
User Request
     ↓
AI Decision Agent         → Understand intent, extract constraints, score options
     ↓
Package Builder           → Optimize the full journey as one connected system
     ↓
Razorpay Commerce Layer   → Price revalidation → Order creation → Payment → Webhook → Verification
     ↓
Booking Orchestrator      → Sequential, atomic, rollback-safe multi-provider booking
     ↓
Specialized Provider Agents → Transport / Hotel / Transfer / Activity
     ↓
Itinerary Engine          → Unified versioned living timeline (v1 → v2 → v3)
     ↓
Document Vault            → Secure signed-URL document access
     ↓
Email Engine              → QUEUED → SENT → DELIVERED
     ↓
Live Monitoring Engine    → Detect → Impact → Recover → Update → Notify
```

---

## Tech Stack

| Layer | Technology |
|:------|:-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Payment | Razorpay Checkout |
| AI Layer | Swarm Agent Architecture (simulated) |
| Deployment | Vercel |
| Repository | GitHub |

---

## Key Buildathon Demos

### 🎯 Decision Agent Demo
Visit `/decision-agent` → Enter a natural language travel request → Watch the agent extract constraints, score destinations, and return only worth-seeing options.

### 📦 Package Builder Demo
Visit `/package-builder` → See how Transport + Hotel + Transfer + Activities are assembled into the optimal bundle under ₹40,000 constraint.

### 💳 Payment Demo
Visit `/checkout/SB-TRIP-MUSSOORIE-4D` → Full Razorpay Review & Pay flow with price revalidation, itemized commerce breakdown, and escrow simulation.

### 📡 Live Monitoring Demo
Visit `/live-monitoring` → Click **"Simulate IRCTC +80m Delay"** → Watch cascading impact analysis fire, 3-tier recovery options appear, chauffeur auto-rescheduled to 1:35 PM.

### 📋 Living Itinerary Demo
Visit `/trips/SB-TRIP-MUSSOORIE-4D/itinerary` → View the unified 4-day timeline → Click **"Simulate Train Delay → v2"** → Watch the itinerary version-stamp, Transfer node update, change history record appear, and disruption email queue.

---

## What Makes SafeBound Different

| Traditional Travel App | SafeBound |
|:----------------------|:----------|
| Search results → You decide | AI decides what's worth considering |
| Book each service separately | One coordinated booking transaction |
| Payment = done | Payment = start of SafeBound's responsibility |
| Static PDF itinerary | Living versioned itinerary (v1 → v2 → vN) |
| You manage disruptions | SafeBound detects, recovers, and notifies |

---

## Repository

[github.com/aryansingh-00/SafeBound](https://github.com/aryansingh-00/SafeBound)

---

Built for the Buildathon. Every step ships. Every step runs.