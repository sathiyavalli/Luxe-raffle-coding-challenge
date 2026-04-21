import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '@/components/error-boundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with custom fallback component', () => {
    const CustomFallback = () => <div>Custom Error</div>;

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <div>Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('accepts fallback prop', () => {
    const mockFallback = vi.fn(() => <div>Error UI</div>);

    render(
      <ErrorBoundary fallback={mockFallback}>
        <div>Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
