# Career Clarity AI

> Answer 12 questions. Get a clear career direction + action plan in 5 minutes.

AI-powered career guidance tool for young Indians (age 16-28) confused about their career direction.

## Features

- **Language Selection** — Hindi / English
- **12 Smart Questions** — Conversational, personality-mapping questions
- **AI Personality Engine** — GPT-powered trait analysis
- **Career Recommendations** — Top 3 career paths with context
- **"Avoid Careers" Section** — Honest, personality-based guidance
- **30-Day Action Plan** — Actionable next steps
- **Payment** — Razorpay integration (₹49)
- **PDF Report** — Downloadable career report
- **WhatsApp Sharing** — Share report via WhatsApp

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS + Framer Motion
- **AI**: OpenAI GPT-4o-mini
- **Payment**: Razorpay
- **PDF**: html2pdf.js (client-side)

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys:

```env
OPENAI_API_KEY=sk-your-openai-api-key
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Mode

The app works without API keys:
- **Without OpenAI key**: Returns a pre-built demo report
- **Without Razorpay keys**: Uses demo payment flow
- **"Demo Access" button**: Available on payment page to skip payment during testing

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── quiz/page.tsx         # Question flow
│   ├── payment/page.tsx      # Payment wall
│   ├── report/page.tsx       # Full report view
│   └── api/
│       ├── analyze/          # GPT analysis endpoint
│       └── payment/          # Razorpay order + verify
├── components/
│   ├── LanguageSelector.tsx   # Hindi/English picker
│   ├── QuestionCard.tsx       # Question UI
│   ├── ProgressBar.tsx        # Quiz progress
│   ├── DisclaimerModal.tsx    # Pre-quiz disclaimer
│   └── AnalyzingAnimation.tsx # Loading animation
├── context/
│   └── AppContext.tsx         # Global app state
└── lib/
    ├── types.ts              # TypeScript types
    ├── questions.ts          # 12 questions (Hindi + English)
    ├── prompts.ts            # GPT prompt builder
    └── utils.ts              # Utility functions
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | For AI analysis | OpenAI API key |
| `RAZORPAY_KEY_ID` | For payments | Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | For payments | Razorpay Key Secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | For payments | Razorpay Key ID (client) |
| `NEXT_PUBLIC_APP_URL` | Optional | App URL |

## Data Policy

- No personal data stored
- Temporary processing only
- No tracking beyond session
