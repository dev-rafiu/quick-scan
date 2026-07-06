import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const {
  toastSuccessMock,
  toastErrorMock,
  scanFileV2Mock,
  startMock,
  stopMock,
  html5QrcodeConstructorMock,
} = vi.hoisted(() => ({
  toastSuccessMock: vi.fn(),
  toastErrorMock: vi.fn(),
  scanFileV2Mock: vi.fn(),
  startMock: vi.fn(),
  stopMock: vi.fn().mockResolvedValue(undefined),
  html5QrcodeConstructorMock: vi.fn(),
}));

let capturedCameraSuccess:
  | ((decodedText: string) => void)
  | undefined;

class MockFileReader {
  result: string | ArrayBuffer | null = null;
  onload: null | (() => void) = null;
  onerror: null | (() => void) = null;

  readAsDataURL() {
    this.result = 'data:image/png;base64,mock';
    queueMicrotask(() => {
      this.onload?.();
    });
  }
}

vi.mock('sonner', () => ({
  toast: {
    success: toastSuccessMock,
    error: toastErrorMock,
  },
}));

vi.mock('html5-qrcode', () => ({
  Html5Qrcode: function Html5QrcodeMock(this: unknown, elementId: string) {
    html5QrcodeConstructorMock(elementId);

    return {
      isScanning: false,
      start: startMock,
      stop: stopMock,
      scanFileV2: scanFileV2Mock,
    };
  },
}));

import { Scanner } from '../components/Scanner';

describe('Scanner', () => {
  beforeEach(() => {
    capturedCameraSuccess = undefined;
    toastSuccessMock.mockClear();
    toastErrorMock.mockClear();
    html5QrcodeConstructorMock.mockClear();
    startMock.mockReset();
    stopMock.mockClear();
    scanFileV2Mock.mockReset();
    scanFileV2Mock.mockResolvedValue({ decodedText: 'MOCK-BARCODE' });

    vi.stubGlobal('FileReader', MockFileReader);

    startMock.mockImplementation(
      async (
        _cameraConfig: unknown,
        _scannerConfig: unknown,
        onSuccess: (decodedText: string) => void,
      ) => {
        capturedCameraSuccess = onSuccess;
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('decodes an uploaded image file and opens the result drawer', async () => {
    render(<Scanner />);

    const fileInput = document.querySelectorAll<HTMLInputElement>(
      'input[type="file"]',
    )[0];
    const file = new File(['fake-image'], 'barcode.png', {
      type: 'image/png',
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(scanFileV2Mock).toHaveBeenCalledWith(file, false);
      expect(toastSuccessMock).toHaveBeenCalledWith('Barcode scanned: MOCK-BARCODE');
    });

    expect(screen.getByText('MOCK-BARCODE')).toBeInTheDocument();
  });

  it('starts the camera scanner and shows a scanned code when detection succeeds', async () => {
    render(<Scanner />);

    fireEvent.click(screen.getByRole('button', { name: /click to scan/i }));
    fireEvent.click(screen.getByRole('button', { name: /use camera/i }));

    await waitFor(() => {
      expect(startMock).toHaveBeenCalled();
      expect(html5QrcodeConstructorMock).toHaveBeenCalledWith(
        'scanner-container',
      );
    });

    await act(async () => {
      capturedCameraSuccess?.('CAMERA-123');
    });

    await waitFor(() => {
      expect(screen.getByText('CAMERA-123')).toBeInTheDocument();
      expect(toastSuccessMock).toHaveBeenCalledWith('Barcode scanned: CAMERA-123');
    });
  });
});
