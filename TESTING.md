# Testing Documentation

## Overview

This project uses **Vitest** for unit and component testing with comprehensive coverage tracking.

### Key Architecture Components

- **Global Error Boundary**: `ErrorBoundary` component catches and handles React errors globally
- **Client Wrapper**: `ClientWrapper` wraps the app with `ErrorBoundary` and `QueryClientProvider`
- **Test Coverage Tracking**: Coverage metrics and reporting included

## Testing Setup

### Dependencies

- **vitest**: Fast unit test framework
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: DOM matchers for testing
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM simulation for tests
- **@vitest/ui**: Visual test runner UI
- **@vitest/coverage-v8**: Coverage reporting

### Configuration Files

- `vitest.config.ts`: Main Vitest configuration with coverage thresholds (80%)
- `vitest.setup.ts`: Test environment setup with mocks for `localStorage` and `matchMedia`
- `src/test/test-utils.tsx`: Custom render function with providers

## Running Tests

### Available Commands

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Open interactive test UI
npm run test:ui
```

### Coverage Reports

After running `npm run test:coverage`, coverage reports are generated in:
- `coverage/` directory with HTML report
- `coverage/lcov.info` for integration with tools like Codecov

## Test Structure

### Test Files Location

Tests are colocated with components using `.test.tsx` extension:

```
src/
├── components/
│   ├── error-boundary.tsx
│   ├── error-boundary.test.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   └── button.test.tsx
│   └── back-to-top/
│       ├── back-to-top.tsx
│       └── back-to-top.test.tsx
└── test/
    └── test-utils.tsx
```

### Test Examples

#### Error Boundary Test

```typescript
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/error-boundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('displays error UI when an error is thrown', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });
});
```

#### Component Test with Providers

```typescript
import { renderWithProviders, screen, userEvent } from '@/test/test-utils';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```





## Coverage Improvement Guide

### Checking Current Coverage

```bash
npm run test:coverage
# Open coverage/index.html in browser to see detailed report
```

### Files Excluded from Coverage

- `node_modules/`
- `dist/` and `.next/`
- Type definitions (`*.d.ts`)
- Configuration files
- Mock data

### Tips for Improving Coverage

1. **Identify uncovered lines** in coverage report
2. **Write tests for critical paths** first (error handling, user interactions)
3. **Test edge cases** (null, undefined, empty arrays)
4. **Test component variants** (different props, states)
5. **Test error scenarios** (network failures, invalid data)

### Example: Adding Tests

```typescript
describe('MyComponent', () => {
  // ✅ Happy path
  it('renders with default props', () => {});
  
  // ✅ User interactions
  it('handles user clicks', () => {});
  
  // ✅ Edge cases
  it('handles empty list', () => {});
  it('handles null values', () => {});
  
  // ✅ Error scenarios
  it('displays error message on failure', () => {});
});
```

## Troubleshooting

### Tests Failing Locally but Passing in CI

- Clear cache: `rm -rf .next/ && npm run test`
- Update dependencies: `npm update`
- Check Node version matches CI (18.x or 20.x)

### Coverage Report Missing

- Ensure `vitest` is installed: `npm install --save-dev vitest`
- Check coverage provider: `npm ls @vitest/coverage-v8`
- Run: `npm run test:coverage` (not just `npm test`)





## Best Practices

1. ✅ **Write tests as you code** (not after)
2. ✅ **Test user behavior** (not implementation details)
3. ✅ **Keep tests maintainable** (avoid brittle selectors)
4. ✅ **Use descriptive test names** (describe what fails)
5. ✅ **Mock external dependencies** (APIs, localStorage)
6. ✅ **Test error boundaries** (critical for reliability)
7. ✅ **Maintain high coverage** (80%+ minimum)

## Next Steps

1. Run `npm run test` to execute the test suite
2. Check coverage with `npm run test:coverage`
3. Improve coverage if needed
4. Commit changes and push to remote

---

For more information on testing best practices, see:
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Best Practices](https://testing-library.com/docs/)
