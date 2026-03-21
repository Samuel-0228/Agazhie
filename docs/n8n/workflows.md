# n8n Workflow Documentation – Agazhie Platform

This document describes the n8n automation workflows used to power Agazhie's backend operations.
Connect your n8n instance to Supabase using the Supabase node or HTTP Request nodes with your service role key.

---

## Overview

| Workflow | Trigger | Purpose |
|---|---|---|
| tutor-verification | Webhook (new application) | Route new tutor docs to admin for review |
| session-reminder | Cron (15 min interval) | Send SMS/push 1h and 24h before sessions |
| escrow-auto-release | Cron (hourly) | Auto-release escrow after 48h confirmation window |
| assignment-broadcast | Webhook (new assignment) | Notify matching tutors of new assignments |
| daily-metrics | Cron (daily 6 AM) | Generate and email platform metrics summary |
| tutor-approved-notify | Webhook (status update) | Email/SMS tutors when verified |
| dispute-alert | Webhook (new dispute) | Alert admin team of new disputes |

---

## Workflow 1: Tutor Verification Routing

**File:** `n8n-tutor-verification.json`

**Trigger:** HTTP Webhook (called from Supabase Edge Function on `tutor_applications` insert)

**Steps:**
1. Receive webhook with application data (name, email, documents, subjects)
2. Create a Trello/Notion card (or send email to `admin@agazhie.et`) with applicant details
3. Send confirmation SMS/email to the tutor: "We received your application. You will hear from us within 48 hours."
4. Update `tutor_applications.status` to `'reviewing'` via Supabase REST API

**Config:**
```json
{
  "webhook_url": "https://your-n8n.instance/webhook/tutor-new-application",
  "admin_email": "admin@agazhie.et",
  "sms_gateway": "Afro SMS API",
  "supabase_url": "https://your-project.supabase.co"
}
```

---

## Workflow 2: Session Reminder (SMS & Push)

**File:** `n8n-session-reminders.json`

**Trigger:** Cron – every 15 minutes

**Steps:**
1. Query Supabase for sessions where `scheduled_at` is between `now() + 55min` and `now() + 65min` (1-hour reminders)
2. Query for sessions where `scheduled_at` is between `now() + 23h` and `now() + 25h` (24-hour reminders)
3. For each matching session:
   - Send SMS to student's phone via Afro SMS API: "Your [Subject] session with [Tutor Name] starts in [X]. Join here: [link]"
   - Send SMS to tutor
   - Send Firebase push notification if app is installed
4. Log sent reminders in Supabase `notifications` table

**SMS Template (24h):**
> "Hi [Name]! Reminder: Your [Subject] tutoring session with [Tutor] is scheduled for tomorrow at [Time]. Be prepared! – አጋዤ"

**SMS Template (1h):**
> "Your [Subject] session starts in 1 hour! Join via Jitsi: https://meet.jit.si/[room_code] – አጋዤ"

---

## Workflow 3: Escrow Auto-Release

**File:** `n8n-escrow-auto-release.json`

**Trigger:** Cron – every hour

**Steps:**
1. Query `public.escrow` for records where `status = 'held'` and `release_deadline < now()`
2. For each expired escrow:
   - Update `escrow.status` to `'released'`
   - Update payee's wallet balance via Supabase function
   - Deduct platform commission (15–25%, configurable)
   - Send notification to payee: "Payment released: [amount] ETB for [session/assignment]"
   - Send notification to payer: "Payment was automatically released to the tutor after 48 hours."
3. Log transaction in `wallet_transactions`

**Commission Logic:**
```
commission_rate = 0.15  // 15% default
net_payout = escrow.amount * (1 - commission_rate)
platform_fee = escrow.amount * commission_rate
```

---

## Workflow 4: Assignment Broadcast

**File:** `n8n-assignment-broadcast.json`

**Trigger:** HTTP Webhook (called from Supabase on `assignments` insert)

**Steps:**
1. Receive new assignment data (subject, grade, budget, deadline)
2. Query `public.tutors` for active tutors where subject matches
3. For each matching tutor (max 20):
   - Create an in-app notification in `public.notifications`
   - Send SMS (if budget > 150 ETB or deadline < 24h): "New assignment posted: [Subject], [Budget] ETB, due in [hours]h. Log in to apply: agazhie.et"
4. Update assignment with `broadcast_sent = true`

---

## Workflow 5: Daily Metrics Summary

**File:** `n8n-daily-metrics.json`

**Trigger:** Cron – daily at 6:00 AM EAT

**Steps:**
1. Query Supabase for:
   - New users registered in last 24h (parents + tutors)
   - Sessions completed in last 24h
   - Assignments completed in last 24h
   - Total GMV (sum of escrow released)
   - Platform commission earned
   - Active disputes
2. Format as email/Slack message
3. Send to admin email: `admin@agazhie.et`
4. Insert daily snapshot into `public.analytics_snapshots` (for historical tracking)

**Email Template:**
```
Subject: 📊 Daily Metrics – [Date]

New Users: [N] parents, [N] tutors
Sessions Completed: [N] (↑/↓ N% vs yesterday)
Assignments Completed: [N]
GMV: [amount] ETB
Commission: [amount] ETB
Open Disputes: [N]

Top Subject: [Subject]
Top City: [City]
```

---

## Workflow 6: Tutor Approved Notification

**File:** `n8n-tutor-approved.json`

**Trigger:** Supabase Webhook on `tutor_applications` UPDATE where status changes to `'approved'`

**Steps:**
1. Fetch tutor details (name, email, phone)
2. Send email: "Congratulations! Your application to Agazhie has been approved. Your Verified Tutor badge is now live."
3. Send SMS: "Congrats [Name]! You are now a Verified Tutor on አጋዤ. Log in to complete your profile: agazhie.et"
4. Create Supabase record in `public.notifications`

---

## Workflow 7: Dispute Alert to Admin

**File:** `n8n-dispute-alert.json`

**Trigger:** HTTP Webhook (called from Supabase on `disputes` insert)

**Steps:**
1. Receive dispute data
2. Send Slack/email alert to admin: "New [priority] dispute: [title] – [amount] ETB"
3. If priority = 'high': Also send SMS to admin phone
4. Update dispute status to `'reviewing'`
5. Send acknowledgement to reporter: "We received your dispute. Our team will review and respond within 24 hours."

---

## Setup Instructions

### 1. Install n8n
```bash
# Using Docker
docker run -d --name n8n -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=yourpassword \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 2. Configure Credentials in n8n
- **Supabase**: Add credentials with your project URL and service role key
- **Afro SMS (Ethiopia)**: Add API key for SMS gateway
- **Firebase**: Add service account JSON for push notifications
- **Email (SMTP)**: Configure outbound email via Gmail or SendGrid

### 3. Import Workflow JSON Files
Upload each JSON file from `docs/n8n/` to your n8n instance via the import feature.

### 4. Configure Environment Variables
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
AFRO_SMS_API_KEY=your-afro-sms-key
ADMIN_EMAIL=admin@agazhie.et
ADMIN_PHONE=+251911000000
PLATFORM_COMMISSION_RATE=0.15
ESCROW_AUTO_RELEASE_HOURS=48
```

### 5. Set Up Supabase Webhooks
In Supabase > Database > Webhooks, create webhooks that POST to your n8n webhook URLs for:
- `tutor_applications` INSERT
- `tutor_applications` UPDATE
- `assignments` INSERT
- `disputes` INSERT

---

## SMS Gateway (Afro SMS / Ethio Telecom)
Ethiopia has several SMS gateway options:
- **Afro SMS** (`afrosms.com`) – Best coverage, supports Amharic
- **Ethio Telecom Bulk SMS** – Direct carrier integration
- **SMS Ethiopia** – Cost-effective for high volume

Configure the gateway URL and API key in your n8n credentials.

---

## Testing Workflows
Each workflow has a "Test" mode in n8n. Use sample data to verify:
1. SMS delivery to +251 numbers
2. Supabase data updates
3. Email delivery

Set up a test Supabase project for staging before deploying to production.
