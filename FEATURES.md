# Luxe Raffle Platform - Feature Documentation

## Overview

The Luxe Raffle Platform is a modern web application that enables users to participate in luxury item raffles with interactive features, secure authentication, and gamification mechanics. This document provides comprehensive explanations of all features for both technical and non-technical audiences.

---

## Core Features

### 1. 🎫 Raffle Gallery with Smart Filtering

**Why This Feature:**

*Business Value:*
- Increases user engagement by showcasing luxury items attractively
- Drives conversions through easy product discovery
- Real-time countdown creates urgency to purchase
- Smart filtering reduces bounce rates by helping users find relevant items quickly

*User Value:*
- Find your dream luxury items in seconds with intelligent filtering
- Visual countdown timers create excitement and time-sensitive urgency
- See ticket availability and pricing at a glance
- Beautiful design creates premium shopping experience

**What It Does (Non-Technical):**
- Browse a beautiful grid of available luxury raffles
- Filter raffles by name or product category to find items you're interested in
- See real-time ticket counts and pricing information
- Visual countdown timers showing when each raffle ends

**Technical Implementation:**
- **Component**: [RafflesGrid](src/components/raffles-grid/raffles-grid.tsx) with [FilterChips](src/components/filter-chips/filter-chips.tsx)
- **Data Source**: Server-side fetched from `getRaffles()` using Next.js server functions
- **Filtering**: Client-side filter state management using React hooks
- **Countdown**: Real-time timer using `performanceNow()` with React state updates
- **Styling**: Responsive TailwindCSS grid (1 column mobile, 2 columns tablet, 3+ desktop)
- **Performance**: Memoized components to prevent unnecessary re-renders

**Key Technologies:**
```
- React Server Components for initial data loading
- Client-side state management (useState, useEffect)
- CSS Grid responsive layout
- Real-time countdown calculations
```

---

### 2. 🔐 Secure Authentication System

**Why This Feature:**

*Business Value:*
- Builds user trust through secure password handling
- Enables personalization and repeat purchases
- Protects user data and prevents unauthorized access
- Creates user accounts for tracking orders and referrals
- Complies with data protection regulations (GDPR, etc.)

*User Value:*
- Feel secure knowing your data is protected with industry-standard encryption
- Stay logged in without re-entering credentials every time
- Personal account to track your order history and purchases
- Only you can access your cart and personal information
- One-click logout for privacy on shared devices

**What It Does (Non-Technical):**
- Users can create accounts with email and password
- Secure login with token-based authentication
- Stay logged in across browser sessions (persistent sessions)
- One-click logout from any page
- Protected pages that redirect to login if not authenticated

**Technical Implementation:**
- **Authentication Flow**:
  - Server-side token generation in [token route](src/app/(please-ignore)/api/auth/token/route.ts)
  - JWT tokens stored in secure HTTP-only cookies
  - Middleware-based route protection in [middleware.ts](src/middleware.ts)
  - Client-side auth context in [AuthContext](src/context/AuthContext.tsx)

- **Core Functions**:
  - [login.ts](src/server-functions/login.ts): Validates credentials, generates JWT token
  - [logout.ts](src/server-functions/logout.ts): Clears authentication cookies
  - [auth-cookies.ts](src/lib/auth-cookies.ts): Manages cookie operations
  - [token.ts](src/lib/token.ts): Token encryption/decryption using crypto

- **Security Features**:
  - Passwords hashed server-side (not transmitted in plaintext)
  - HTTP-only cookies prevent JavaScript access
  - Token expiration handling
  - CSRF protection through middleware
  - Dynamic server-side rendering for protected routes

---

### 3. 🛒 Shopping Cart System

**Why This Feature:**

*Business Value:*
- Reduces cart abandonment through persistent storage
- Increases average order value by allowing users to combine multiple raffles
- Cart persistence leads to higher conversion rates (users return to complete purchase)
- Detailed pricing breakdown builds trust and transparency

*User Value:*
- Compare multiple raffles side-by-side before committing to purchase
- Change your mind about quantities without losing your cart
- Your cart is saved even if you close the browser
- See exact cost breakdown before checkout
- Easy quantity control with simple increment/decrement buttons

**What It Does (Non-Technical):**
- Add raffle tickets to your personal shopping cart
- View cart contents with ticket counts and pricing
- Update quantities or remove items
- See real-time total cost calculation
- Persistent cart (saved across sessions)

**Technical Implementation:**
- **Component**: [Cart Page](src/app/cart/page.tsx)
- **State Management**: React Context API ([CartContext](src/context/CartContext.tsx))
- **Persistence**: LocalStorage for cart data retention
- **Features**:
  - Real-time price calculation with TypeScript type safety
  - Quantity controls with min/max validation
  - Remove item functionality
  - Empty state messaging with call-to-action
  - Responsive design (vertical layout on mobile, horizontal on desktop)

- **Data Structure**:
```typescript
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
```

---

### 4. 💳 Secure Checkout Process

**Why This Feature:**

*Business Value:*
- Converts browsers into buyers through streamlined checkout
- Reduces checkout abandonment with minimal steps
- Validates all data to prevent payment failures
- Secure payment handling protects both users and business
- Confirmation increases customer confidence in their purchase

*User Value:*
- Quick, intuitive checkout process (no unnecessary steps)
- See order summary before paying for peace of mind
- Secure payment processing protects your financial information
- Instant confirmation so you know your order went through
- Order ID for easy tracking and support reference

**What It Does (Non-Technical):**
- Review your cart items and total cost before purchase
- Enter your credit card information securely
- Review order details one final time
- Confirmation after successful purchase
- See your purchase in the Account dashboard

**Technical Implementation:**
- **Component**: [Checkout Page](src/app/checkout/page.tsx)
- **State Management**: React hooks with validation
- **Security**:
  - Zod validation for form inputs
  - Type-safe form handling
  - Order creation via server function

- **Process Flow**:
  1. Cart items fetched from CartContext
  2. Card details validated against Zod schema
  3. Order submitted to server via [order.ts](src/server-functions/order.ts)
  4. Success redirect to Account page with confirmation
  5. Order stored in database and related raffles updated

- **Features**:
  - Total price calculation with tax/fees (if any)
  - Order confirmation with order ID
  - Automatic redirect on successful purchase
  - Error handling with user-friendly messages
  - Responsive form layout

---

### 5. 👤 User Account Dashboard

**Why This Feature:**

*Business Value:*
- Increases customer lifetime value through repeat purchases
- Provides customer analytics on purchase patterns
- Encourages users to return to check order status
- Reduces customer support inquiries (users can self-serve)
- Enables personalized marketing based on purchase history

*User Value:*
- Track all your raffle entries in one place
- See which raffles you've purchased tickets for
- Check your reward points and bonuses earned
- Monitor your referral progress and commissions
- Quick access to everything you need in your account

**What It Does (Non-Technical):**
- View all your purchased raffle tickets
- See order history with dates and details
- Browse the raffles you've purchased tickets for
- Check your referral stats and rewards
- Quick access to logout

**Technical Implementation:**
- **Component**: [Account Page](src/app/account/page.tsx)
- **Data Fetching**:
  - Server functions: `getOrders()` and `getRaffles()`
  - Real-time data from database
  - Parallel data fetching with `Promise.all()`

- **Features Displayed**:
  - Active tickets count
  - Order history table
  - Raffle details for purchased items
  - Dashboard metrics (rewards, spins available)
  - Referral program statistics
  - Loading states with skeleton UI

- **Security**:
  - Auth check on mount - redirects to login if not authenticated
  - User data validation against stored session
  - Protected server functions

---

### 6. 🎡 Daily Spin Wheel Reward System

**Why This Feature:**

*Business Value:*
- Increases daily active users engagement through daily spin mechanic
- Gamification drives higher engagement and time-on-site
- Spin wheel creates viral moments users share on social media
- Rewards build loyalty and encourage repeat visits
- Psychological hook keeps users coming back daily

*User Value:*
- Exciting daily reward opportunity - even small wins feel thrilling
- Free bonus entries and prizes encourages more playing
- Fun, interactive experience breaks up shopping monotony
- Daily habit formation (users check back regularly)
- Floating button is always accessible while browsing

**What It Does (Non-Technical):**
- Spin a wheel once per day as a logged-in user
- Win points, coins, or bonus entries randomly
- See your rewards instantly
- Floating wheel button stays visible while scrolling
- Mobile-friendly spinning experience

**Technical Implementation:**
- **Component**: [SpinWheel](src/components/spin-wheel/spin-wheel.tsx)
- **State Management**:
  - React hooks for rotation angle, winner selection
  - Daily spin limit tracking via localStorage
  - Timestamp-based cooldown enforcement

- **Technical Highlights**:
  - CSS Transform animations for smooth spinning
  - JavaScript randomization for fair prize selection
  - Floating button with fixed positioning
  - Mobile responsive: Adjusts wheel size and button placement
  - Proper React hooks ordering (moved before conditional login check for compliance)

- **User Experience**:
  - Login guard: Hidden until user is authenticated
  - Clear spin mechanics explanation
  - Instant winner announcement
  - Visual feedback through animations
  - Daily reset with countdown timer

---

### 7. 🎁 Gift & Referral System

**Why This Feature:**

*Business Value:*
- Viral growth through first-degree network effects
- Users become brand ambassadors by referring friends
- Lower customer acquisition cost (referrals cheaper than ads)
- Increases lifetime value (referred users have higher retention)
- Creates community and network effects

*User Value:*
- Share the fun with friends and earn rewards
- Get bonuses when your friends join and purchase
- Easy-to-share referral links via social media or email
- Track how many friends you've referred
- Earn real rewards from referrals (points, free entries)

**What It Does (Non-Technical):**
- Send purchased raffle tickets as gifts to friends
- Refer friends and earn rewards when they buy tickets
- Track referral statistics
- See recent referrals and notifications
- Bonus entries for successful referrals

**Technical Implementation:**
- **Components**:
  - [ReferralProgram](src/components/referral-program/referral-program.tsx)
  - [ReferralModal](src/components/referral-modal/referral-modal.tsx)
  - [ReferralNotificationCenter](src/components/referral-notification-center/referral-notification-center.tsx)
  - [GiftModal](src/components/gift-modal/gift-modal.tsx)

- **Feature Breakdown**:
  - **Referral Rewards**: Calculated from [referral-rewards.ts](src/lib/referral-rewards.ts)
  - **Tracking**: Server-side tracking of referral conversions
  - **Notifications**: Real-time updates when friends purchase
  - **Incentives**: Tiered rewards based on number of referrals

- **Data Flow**:
  1. User generates referral link from dashboard
  2. Friend clicks link and registers
  3. Server tracks referral conversion
  4. Original user receives rewards
  5. Referral center updated in real-time
  6. Bonus entries added to user's account

---

### 8. ⏰ Timed Reward Banner

**Why This Feature:**

*Business Value:*
- Creates urgency through time-limited offers
- Increases conversion rates with FOMO (fear of missing out)
- Promotional tool that drives purchases during peak times
- A/B testing lever for marketing campaigns
- Keeps homepage fresh and engaging with rotating offers

*User Value:*
- Know about special limited-time offers before they expire
- Feel like they're getting exclusive deals
- Countdown timer shows exactly how much time to act
- Exciting way to discover bonus promotions
- Easy to claim bonuses with one click

**What It Does (Non-Technical):**
- See limited-time bonus offers
- Know how much time is left to claim bonuses
- Get notified of special promotions
- Click to activate bonus offers

**Technical Implementation:**
- **Component**: [TimedRewardBanner](src/components/timed-reward-banner/timed-reward-banner.tsx)
- **Features**:
  - Server-side timer for accuracy
  - Client-side countdown display
  - Automatic hide when timer expires
  - Responsive banner layout
  - Only shows to logged-in users

---

### 9. 🔔 Recent Entries Widget
**Why This Feature:**

*Business Value:*
- Social proof showing active platform participation
- Creates FOMO by showing others winning
- Increases engagement through activity notifications
- Builds community feeling and network effects
- Encourages user retention (users want to see if they won)

*User Value:*
- See who recently won raffles (inspiration)
- Feel like you're part of an active community
- Know about recent activity to understand platform popularity
- Get inspired by recent winners
- Real-time updates keep the platform feeling alive
**What It Does (Non-Technical):**
- See recent raffle entries by all users
- Stay updated on platform activity
- See who won recent raffles
- Get inspired by recent winners

**Technical Implementation**:
- **Component**: [RecentEntriesWidget](src/components/recent-entries-widget/recent-entries-widget.tsx)
- **Data Source**: Real-time fetched from database
- **Features**:
  - Live activity feed
  - User anonymization (optional)
  - Timestamp for each entry
  - Entry amount displayed

---

### 10. 🎨 Responsive Design & Mobile Experience
**Why This Feature:**

*Business Value:*
- Over 60% of users browse on mobile - can't ignore
- Better mobile experience = higher conversion rates
- Reduces bounce rates from mobile users
- Improves SEO rankings (Google prioritizes mobile-friendly sites)
- Supports growth in emerging markets (mobile-first populations)

*User Value:*
- Shop for raffles anywhere, anytime on any device
- Touch-friendly buttons obvious on phone screens
- Text readable without zooming on mobile
- Fast loading even on slower mobile networks
- Responsive design adapts to your screen size automatically
**What It Does (Non-Technical):**
- Perfect viewing on phones, tablets, and desktops
- Touch-friendly button sizes on mobile
- Readable text on any screen size
- Fast loading even on slower connections
- Works correctly with keyboard and screen readers

**Technical Implementation**:
- **Framework**: TailwindCSS with responsive utilities
- **Breakpoints**:
  - `sm`: 640px (phones)
  - `md`: 768px (tablets)
  - `lg`: 1024px (desktops)
  - `xl`: 1280px (large displays)

- **Mobile-First Approach**:
  - Spin wheel: Responsive sizing
  - Header: Hamburger menu or full navigation based on screen size
  - Grid layouts: Reflow from 1 column to 3+ columns
  - Forms: Full-width on mobile, centered on desktop
  - Modals: Full-screen on mobile with slide-in animation

- **Performance Optimizations**:
  - Next.js Image optimization
  - CSS-in-JS for component-level styling
  - Responsive images with srcset
  - Lazy loading for off-screen content

---

### 11. 🛡️ Global Error Boundary
**Why This Feature:**

*Business Value:*
- Prevents revenue loss from complete app crashes
- Reduces customer support tickets from broken experiences
- Improves trust (users see helpful error messages, not blank screens)
- Enables graceful degradation instead of total failure
- Provides error data for debugging and preventing future issues

*User Value:*
- App doesn't crash completely when something goes wrong
- See a friendly apologetic message instead of a blank screen
- Easy "Try Again" button to recover quickly
- Know that the app is robust and production-quality
- Don't lose your work when unexpected errors occur
**What It Does (Non-Technical):**
- App doesn't crash completely if something goes wrong
- Users see a friendly error message instead of a blank screen
- Easy "Try Again" button to recover
- Errors are logged for developers to fix

**Technical Implementation**:
- **Component**: [ErrorBoundary](src/components/error-boundary.tsx)
- **Wrapper**: [ClientWrapper](src/components/client-wrapper.tsx)
- **Features**:
  - React Error Boundary for component errors
  - Custom fallback UI
  - Error logging to console (could integrate with external service)
  - Development vs. Production error display
  - Retry mechanism via page reload

- **Integration**:
  - Wraps entire app in layout root
  - Provides automatic error catching
  - Does NOT catch async errors (handled separately)
  - Integrates with React Query error handling

---

### 12. 🧪 Comprehensive Test Suite
**Why This Feature:**

*Business Value:*
- Prevents costly bugs from reaching production
- Reduces technical debt and maintenance costs
- Enables confident code changes and refactoring
- Demonstrates professional engineering practices to investors/partners
- Reduces manual testing time and QA overhead

*User Value:*
- Know that features work as intended
- Fewer bugs and regressions in updates
- Platform reliability improves over time
- New features don't break existing functionality
- Trust in platform quality and stability
**What It Does (Non-Technical):**
- Automated checks to ensure features work correctly
- Tests run before every code push
- Coverage tracking to ensure critical code is tested
- Prevents bugs from going into production

**Technical Implementation**:
- **Framework**: Vitest 4.1.4 (blazing fast unit testing)
- **Testing Library**: React Testing Library for component tests
- **Coverage Threshold**: 80% enforced via CI/CD pipeline

- **Test Files:**
  - Component tests: 15 test suites covering major components
  - Server function tests (ready for expansion)
  - Hook tests for state management
  - Utility function tests

- **Example Tests:**
  - ErrorBoundary: Catches React errors, shows fallback UI
  - SpinWheel: Spins on click, shows winner
  - Cart: Add/remove items, calculate totals
  - Auth: Login flow, token generation
  - Raffle sorting: Filter and sort raffles correctly

- **Running Tests:**
  ```bash
  npm run test              # Run tests in watch mode
  npm run test -- --run     # Single test run
  npm run coverage          # Generate coverage report
  ```

---

### 13. 🚀 CI/CD Pipeline with Coverage Enforcement
**Why This Feature:**

*Business Value:*
- Enables rapid iteration and deployment velocity
- Reduces human error in release process
- Scales quality as team grows
- Provides audit trail for compliance and debugging
- Enables safe rapid releases (daily/hourly if needed)

*User Value:*
- Get bug fixes and new features faster
- Know that everything that ships has passed automated tests
- Fewer production issues and rollbacks
- Continuous improvement without waiting for release day
- Feature rollouts are safe and reliable
**What It Does (Non-Technical):**
- Automatically runs tests when code is pushed
- Blocks merging if tests fail or coverage drops below 80%
- Ensures code quality before deployment
- Developers get immediate feedback

**Technical Implementation**:
- **Tool**: GitHub Actions workflow
- **Configuration**: [.github/workflows/ci.yml](.github/workflows/ci.yml)

- **Pipeline Steps**:
  1. Install dependencies
  2. Run linting (ESLint)
  3. Build Next.js app
  4. Run test suite with Vitest
  5. Check coverage with Codecov
  6. Block push if coverage < 80%

- **Pre-commit Hooks**:
  - Tool: Husky + lint-staged
  - Runs tests on staged files before commit
  - Prevents commits that break tests
  - Auto-formats code to maintain standards

---

## Advanced Features

### User Experience Enhancements

1. **Activity Tracking**: Shows when users join raffles
2. **Real-time Notifications**: Updates when referrals convert
3. **Success Messages**: Green confirmation banners
4. **Error Recovery**: Clear error messages with retry options
5. **Loading States**: Skeleton screens while data loads

### Performance Optimizations

1. **Server-Side Rendering (SSR)**: Faster initial page loads for SEO
2. **Client-Side Hydration**: Interactive components load progressively
3. **Memoization**: Components skip re-renders when props don't change
4. **Image Optimization**: Automatic compression and resizing
5. **Code Splitting**: Routes load only needed JavaScript

### Security Measures

1. **HTTP-Only Cookies**: XSS attack protection
2. **CSRF Tokens**: Cross-site request forgery prevention
3. **Input Validation**: Zod schemas validate all user inputs
4. **Type Safety**: TypeScript prevents runtime type errors
5. **Protected Routes**: Middleware blocks unauthorized access

---

## Technical Architecture

### Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | 15.4.5 | Full-stack React framework with built-in optimizations |
| **Language** | TypeScript | Latest | Type safety and better developer experience |
| **UI Library** | React | 19 | Component-based UI development |
| **Styling** | TailwindCSS | 3+ | Utility-first CSS framework |
| **State Mgmt** | React Context API | - | Lightweight state management |
| **Testing** | Vitest | 4.1.4 | Fast unit testing framework |
| **Validation** | Zod | Latest | Schema validation library |
| **Icons** | Lucide React | Latest | Modern icon library |
| **Database** | JSON (db.json) | - | Development database |
| **CI/CD** | GitHub Actions | - | Automated testing and deployment |

### Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── checkout/          # Checkout flow
│   ├── account/           # User dashboard
│   ├── cart/              # Shopping cart
│   └── login/             # Authentication
├── components/            # Reusable React components
│   ├── error-boundary.tsx # Global error handling
│   ├── spin-wheel/        # Daily reward wheel
│   ├── raffles-grid/      # Raffle listing
│   └── ui/                # Shadcn UI components
├── context/               # React Context providers
│   ├── AuthContext.tsx    # User authentication
│   └── CartContext.tsx    # Shopping cart state
├── lib/                   # Utility functions
│   ├── auth-cookies.ts    # Cookie management
│   ├── token.ts           # JWT handling
│   └── constants.ts       # App constants
├── server-functions/      # Server-only functions
│   ├── login.ts           # Authentication
│   ├── getOrders.ts       # Fetch user orders
│   └── getRaffles.ts      # Fetch raffle list
└── types/                 # TypeScript type definitions
    ├── User.ts            # User type
    ├── Order.ts           # Order type
    ├── Raffle.ts          # Raffle type
    └── OrderItem.ts       # Cart item type
```

---

## How Features Work Together

### User Journey: First-Time Purchase

1. **Discovery**: User lands on home page, browses raffle gallery (Feature #1)
2. **Authentication**: User logs in or creates account (Feature #2)
3. **Selection**: User adds raffle tickets to cart (Feature #3)
4. **Checkout**: User reviews and completes purchase (Feature #4)
5. **Confirmation**: Order appears in Account dashboard (Feature #5)
6. **Rewards**: User gets daily spin opportunity (Feature #6)
7. **Referral**: User shares referral code with friends (Feature #7)

### Data Flow Diagram

```
User Interface (React Components)
    ↓
State Management (Context API)
    ↓
Server Functions (Next.js API Routes)
    ↓
Database (JSON/Backend)
    ↓
Response Data
    ↓
UI Re-renders (React)
```

---

## Quality Assurance

### Testing Strategy

1. **Unit Tests**: Individual component behavior
2. **Integration Tests**: Component interactions
3. **E2E Testing**: Full user journeys (ready for Cypress/Playwright)
4. **Manual Testing**: User experience validation

### Coverage Goals

- Components: 85%+ coverage
- Utilities: 90%+ coverage
- Server Functions: 80%+ coverage
- Overall: 80%+ threshold enforced by CI/CD

### Deployment Checklist

- ✅ All tests passing
- ✅ Coverage above 80%
- ✅ TypeScript compilation successful
- ✅ ESLint checks pass
- ✅ Build completes without warnings
- ✅ Manual testing on multiple browsers/devices

---

## Conclusion

The Luxe Raffle Platform combines modern web technologies with robust engineering practices to deliver a secure, scalable, and user-friendly raffle experience. Every feature is designed with both user experience and code quality in mind.

For developers looking to extend this platform:
- All components are type-safe with TypeScript
- Tests provide examples of expected behavior
- Error boundaries and middleware ensure reliability
- CI/CD pipeline maintains code quality standards

For users:
- Platform is intuitive and responsive
- Authentication protects personal data
- Multiple features create engaging experience
- Regular updates via automated deployment
