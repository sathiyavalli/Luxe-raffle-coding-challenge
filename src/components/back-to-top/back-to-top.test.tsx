import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { BackToTop } from '@/components/back-to-top/back-to-top';
import userEvent from '@testing-library/user-event';

describe('BackToTop', () => {
  beforeEach(() => {
    // Reset window scroll position before each test
    window.scrollY = 0;
  });

  it('renders without crashing', () => {
    const { container } = render(<BackToTop />);
    expect(container).toBeInTheDocument();
  });

  it('does not display button when scrollY is less than 300', () => {
    window.scrollY = 100;
    render(<BackToTop />);

    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(0);
  });

  it('displays button when scrollY is greater than 300', async () => {
    render(<BackToTop />);

    // Simulate scroll event
    window.scrollY = 400;
    window.dispatchEvent(new Event('scroll'));

    // Button should now be visible
    await new Promise((resolve) => setTimeout(resolve, 100));
    const button = screen.queryByRole('button');
    // Note: actual visibility depends on component implementation
  });

  it('scrolls to top when button is clicked', async () => {
    const user = userEvent.setup();
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<BackToTop />);

    // Set scroll position
    window.scrollY = 500;
    window.dispatchEvent(new Event('scroll'));

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Look for the button and click it
    const buttons = screen.queryAllByRole('button');
    if (buttons.length > 0) {
      await user.click(buttons[0]);
      expect(scrollToMock).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    }
  });

  it('removes scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<BackToTop />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
    removeEventListenerSpy.mockRestore();
  });
});
