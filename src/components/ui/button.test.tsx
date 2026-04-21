import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { Button } from '@/components/ui/button';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('renders button with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button', { name: /ghost/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    render(
      <>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </>
    );
    expect(screen.getByRole('button', { name: /small/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /large/i })).toBeInTheDocument();
  });

  it('renders as loading state', () => {
    render(<Button disabled>Loading...</Button>);
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
  });
});
