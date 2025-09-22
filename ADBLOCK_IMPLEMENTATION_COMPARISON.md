# AdBlock Detection Implementation Comparison

## Overview

This project now includes two different approaches for ad-block detection:

1. **Custom Implementation** (`useAdBlockDetector` hook + `AdBlockProvider`)
2. **Package Implementation** (`adblock-detect-react` package)

## Custom Implementation

### Files Created:

- `hooks/useAdBlockDetector.js` - Custom detection logic
- `components/common/AdBlockProvider.js` - Context provider
- `components/common/AdBlockWarningModal.js` - Warning modal
- `components/common/AdBlockStatus.js` - Status components
- `types/adBlock.ts` - TypeScript types

### Features:

- ✅ Multiple detection methods (element blocking, script blocking, indicators)
- ✅ Configurable detection options
- ✅ Global state management with React Context
- ✅ Dismissible modal with localStorage persistence
- ✅ Banner component for subtle warnings
- ✅ Debug component for development
- ✅ TypeScript support
- ✅ SSR-safe (client-side only detection)
- ✅ Customizable UI and messages

### Pros:

- Full control over detection logic
- Highly customizable
- No external dependencies
- Can be tailored to specific needs

### Cons:

- More code to maintain
- Requires custom implementation of all features

## Package Implementation (adblock-detect-react)

### Files Created:

- `components/common/AdBlockDetectorPackage.js` - Wrapper using the package

### Features:

- ✅ Simple hook-based API
- ✅ Configurable delay
- ✅ Callback support
- ✅ Lightweight
- ✅ Well-tested by community
- ✅ Regular updates

### Pros:

- Less code to maintain
- Battle-tested by community
- Simple integration
- Regular updates and bug fixes

### Cons:

- Less customization options
- External dependency
- Limited control over detection methods

## Usage Examples

### Custom Implementation (Current)

```jsx
// In _app.js
import { AdBlockProvider } from "@/components/common/AdBlockProvider";

function MyApp({ Component, pageProps }) {
  const adBlockConfig = {
    detectionDelay: 200,
    clientSideOnly: true,
    onAdBlockDetected: () => console.log("Ad blocker detected"),
    showWarning: true,
    warningMessage: "Custom message here",
  };

  return (
    <AdBlockProvider {...adBlockConfig}>
      <Component {...pageProps} />
    </AdBlockProvider>
  );
}

// In any component
import { useAdBlock } from "@/components/common/AdBlockProvider";
import { AdBlockBanner } from "@/components/common/AdBlockStatus";

function MyComponent() {
  const { isAdBlocked, isDetecting } = useAdBlock();

  return (
    <div>
      <AdBlockBanner />
      {/* Your content */}
    </div>
  );
}
```

### Package Implementation (Alternative)

```jsx
// In _app.js
import AdBlockDetectorPackage from "@/components/common/AdBlockDetectorPackage";

function MyApp({ Component, pageProps }) {
  return (
    <AdBlockDetectorPackage
      showWarning={true}
      warningMessage="Package-based detection"
      onSubscribe={() => window.open("/subscribe")}
    >
      <Component {...pageProps} />
    </AdBlockDetectorPackage>
  );
}

// In any component
import { useAdBlockDetector } from "adblock-detect-react";

function MyComponent() {
  const { isAdBlocked } = useAdBlockDetector();

  return (
    <div>
      {isAdBlocked && <div>Ad blocker detected!</div>}
      {/* Your content */}
    </div>
  );
}
```

## Current Implementation Status

### ✅ Implemented (Custom Approach):

- Home page (`pages/index.js`)
- Article detail page (`pages/article/[slug].js`)
- Category pages (`pages/[category]/index.js`)
- Global provider in `_app.js`

### 🔄 Ready to Switch:

You can easily switch between implementations by:

1. **Keep Custom**: Continue using the current implementation
2. **Switch to Package**: Replace `AdBlockProvider` with `AdBlockDetectorPackage` in `_app.js`

## Recommendation

**For Production**: Use the **package implementation** (`adblock-detect-react`) because:

- It's maintained by the community
- Less code to maintain
- Well-tested across different browsers and ad blockers
- Regular updates

**For Learning/Custom Needs**: Keep the **custom implementation** if you need:

- Specific detection methods
- Highly customized UI
- Full control over the detection logic

## Migration Guide

To switch from custom to package implementation:

1. Replace in `_app.js`:

```jsx
// Remove
import { AdBlockProvider } from "@/components/common/AdBlockProvider";

// Add
import AdBlockDetectorPackage from "@/components/common/AdBlockDetectorPackage";

// Replace
<AdBlockProvider {...adBlockConfig}>
  <Component {...pageProps} />
</AdBlockProvider>

// With
<AdBlockDetectorPackage
  showWarning={true}
  warningMessage={adBlockConfig.warningMessage}
  onSubscribe={adBlockConfig.onSubscribe}
>
  <Component {...pageProps} />
</AdBlockDetectorPackage>
```

2. Update components that use `useAdBlock`:

```jsx
// Replace
import { useAdBlock } from "@/components/common/AdBlockProvider";

// With
import { useAdBlockDetector } from "adblock-detect-react";

// Replace
const { isAdBlocked } = useAdBlock();

// With
const { isAdBlocked } = useAdBlockDetector();
```

## Testing

Both implementations can be tested by:

1. Installing an ad blocker (uBlock Origin, AdBlock Plus, etc.)
2. Visiting the site
3. Checking if the warning modal/banner appears

The debug component (custom implementation) can help verify detection in development mode.
