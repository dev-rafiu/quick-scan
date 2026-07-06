import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import CopyButton from '../components/CopyButton';

const { writeTextMock, toastSuccessMock } = vi.hoisted(() => ({
  writeTextMock: vi.fn(),
  toastSuccessMock: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: toastSuccessMock,
  },
}));

describe('CopyButton', () => {
  beforeEach(() => {
    writeTextMock.mockResolvedValue(undefined);
    toastSuccessMock.mockClear();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      configurable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('copies text and temporarily updates the button state', async () => {
    vi.useFakeTimers();

    render(<CopyButton textToCopy="ABC123" />);

    const button = screen.getByRole('button', { name: 'Copy to clipboard' });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(writeTextMock).toHaveBeenCalledWith('ABC123');
    expect(toastSuccessMock).toHaveBeenCalledWith('Code copied');
    expect(
      screen.getByRole('button', { name: 'Copied' }),
    ).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(
      screen.getByRole('button', { name: 'Copy to clipboard' }),
    ).toBeInTheDocument();
  });
});
