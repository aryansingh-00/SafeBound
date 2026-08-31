# 🛡️ SafeBound — AI Travel Commerce Agent

> **Plan. Pay. Book. Adapt.**
> 
> *SafeBound is an AI Travel Commerce Agent that understands the dependencies between travel bookings and continuously manages the trip when reality changes.*

🌐 **Live Demo:** [https://safe-bound.vercel.app/](https://safe-bound.vercel.app/)  
🚀 **Buildathon Demo Hub:** [https://safe-bound.vercel.app/demo](https://safe-bound.vercel.app/demo)  
📦 **GitHub Repository:** [https://github.com/aryansingh-00/SafeBound](https://github.com/aryansingh-00/SafeBound)

---

## ⚡ The 30-Second Pitch

> "Today, travel is fragmented. We book a train separately, a hotel separately, a cab separately, and activities separately. But these bookings are connected. If the train is delayed, the cab and activities are affected — and the traveller has to manually solve the problem.
>
> **SafeBound is an AI Travel Commerce Agent** that understands these dependencies. It plans the trip based on budget, preferences, weather, and safety signals, builds and optimizes the package, processes payment through Razorpay, coordinates the bookings, and continuously monitors the trip.
>
> If something changes, SafeBound doesn't just notify the user — **it understands the impact, finds a recovery option, and updates the journey.**
>
> *Existing platforms help you book a trip. SafeBound helps you manage the trip when reality changes.*"

---

## 💎 3 Core USPs

1. **Dependency-Aware Trip Management:** SafeBound understands the connections between bookings (Train ➔ Cab ➔ Hotel Check-in ➔ Activities) and continuously manages the entire journey.
2. **Impact-First Recovery:** It doesn't just detect a disruption — it calculates downstream impact across the entire itinerary and executes recovery options.
3. **Bounded AI Agency:** The AI reasons and coordinates, but consequential actions (moving money, altering hotels, refunds) are strictly gated by deterministic backend rules and user approval.

---

## 🗺️ The Complete 28-Step Platform

| Step | Feature / Component | Route |
|:----:|:--------------------|:------|
| **1–8** | Consumer Lifecycle, Travel Discovery, Auth & Onboarding UI | `/`, `/dashboard` |
| **9–12** | Admin & Agent Swarm Monitoring Console | `/admin` |
| **13–16** | Backend Architecture, EventBus & Swarm Sandbox | `/architecture` |
| **17–18** | Multi-Agent Swarm Orchestration Engine | `/architecture` |
| **19** | 🎯 AI Travel Decision Agent | `/decision-agent` |
| **20** | 📦 Package Builder & Optimization Agent | `/package-builder` |
| **21** | 🛡️ Booking Orchestrator (Atomic, Rollback-Safe) | `/booking-orchestrator` |
| **22** | 🔌 Specialized Provider Agents (Transport, Hotel, Transfer, Activity) | `/provider-agents` |
| **23** | 💳 Razorpay Commerce & Payment Verification Layer | `/checkout/:tripId` |
| **24** | 📡 Live Trip Monitoring & Disruption Recovery Engine | `/live-monitoring` |
| **25** | 📋 Smart Itinerary, Document Vault & Email Engine | `/trips/:tripId/itinerary` |
| **26** | 🔐 Security, 5-Gate Authorization & Traveller Snapshot Gate | `/security` |
| **27** | 🧪 Test Lab, Failure Simulator & Agent Evaluation Suite | `/testing` |
| **28** | 🚀 Final End-to-End Demo & Buildathon Pitch Hub | `/demo` |

---

## 🏗️ Agent Architecture

```text
                     USER
                      │
                      ▼
                SAFEBOUND AI
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
      Decision      Package    Optimization
        Agent        Agent         Agent
          │           │             │
          └───────────┼─────────────┘
                      ▼
             RAZORPAY COMMERCE
                      │
                      ▼
             BOOKING ORCHESTRATOR
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
   Transport         Hotel        Transfer
     Agent           Agent          Agent
       │              │              │
       └──────────────┼──────────────┘
                      ▼
                 Activities
                      │
                      ▼
                  ITINERARY
                      │
                      ▼
                LIVE MONITORING
                      │
             ┌────────┴────────┐
             ▼                 ▼
         NO CHANGE          DISRUPTION
             │                 │
             ▼                 ▼
         TRIP OK           RECOVERY AGENT
                               │
                               ▼
                         UPDATED TRIP (v2)
```

---

## 🛡️ Bounded Agency & Security Model

```text
AI THINKS → AI RECOMMENDS → BACKEND VALIDATES → USER APPROVES* → SYSTEM EXECUTES → ACTION LOGGED
```
*\*User approval required only when actions involve cost impact or accommodation changes.*

- **5-Gate Authorization:** Authenticated? ➔ Resource Owner? ➔ Role Permission? ➔ State Valid? ➔ Execute.
- **Immutable Traveller Snapshots:** Traveller profile confirmed and snapshotted before payment.
- **Zero AI Overspending:** Max additional recovery cost policy strictly enforced.
- **Append-Only Audit Trail:** Every consequential agent and system action logged chronologically.

---

## 🧪 Testing, Reliability & Quality Gates

SafeBound includes an integrated Test Lab (`/testing`) evaluating 15 automated test cases:
- **TC001–TC005:** Constraint satisfaction (budget, dates, seats, weather, transport).
- **TC006:** Price change detection at checkout (blocks unauthorized payment delta).
- **TC007–TC010:** Disruption recovery (hotel sold-out, train delay, cab unavailable, activity cancel).
- **TC011:** Payment failure prevents booking initiation.
- **TC012:** Idempotent Razorpay webhook deduplication (never duplicate bookings).
- **TC013:** Provider timeout retry & fallback.
- **TC014:** 403 Forbidden on cross-user resource access.
- **TC015:** Recovery failure gracefully triggers support workflow.

### System Scores:
- **Payment Engine:** 100%
- **Security & Authorization:** 100%
- **Package Builder:** 98%
- **Recovery Agent:** 94%
- **Decision Agent:** 92%
- **Unauthorized Action Rate:** **0%**

---

## 💻 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Lucide Icons
- **Routing:** React Router v6
- **Payments:** Razorpay Commerce Simulation & Webhook Verification
- **Architecture:** Autonomous Agent Swarms + EventBus + Deterministic Security Gates
- **Hosting:** Vercel

---

## 🏁 Live Links

- **Main Website:** [https://safe-bound.vercel.app/](https://safe-bound.vercel.app/)
- **Demo Hub:** [https://safe-bound.vercel.app/demo](https://safe-bound.vercel.app/demo)
- **Test Lab:** [https://safe-bound.vercel.app/testing](https://safe-bound.vercel.app/testing)
- **Security Hub:** [https://safe-bound.vercel.app/security](https://safe-bound.vercel.app/security)
- **GitHub Repository:** [https://github.com/aryansingh-00/SafeBound](https://github.com/aryansingh-00/SafeBound)