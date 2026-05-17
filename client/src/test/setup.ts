import "@testing-library/jest-dom";
import { vi } from "vitest";

// Polyfill TextEncoder to return proper Uint8Array (jsdom can return Buffer)
const OriginalTextEncoder = globalThis.TextEncoder;
class SafeTextEncoder extends OriginalTextEncoder {
  encode(input?: string): Uint8Array {
    const result = super.encode(input);
    return new Uint8Array(result.buffer, result.byteOffset, result.byteLength);
  }
}
globalThis.TextEncoder = SafeTextEncoder as typeof TextEncoder;

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get length() { return Object.keys(store).length; },
    key: vi.fn((i: number) => Object.keys(store)[i] || null),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock clipboard (configurable so userEvent can also redefine it)
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(""),
  },
  writable: true,
  configurable: true,
});

// Mock AudioContext
class MockAudioContext {
  createOscillator() {
    return {
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      frequency: { value: 0 },
      type: "sine",
    };
  }
  createGain() {
    return {
      connect: vi.fn(),
      gain: { value: 0, exponentialRampToValueAtTime: vi.fn() },
    };
  }
  get destination() { return {}; }
  get currentTime() { return 0; }
}
(window as any).AudioContext = MockAudioContext;

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
(window as any).IntersectionObserver = MockIntersectionObserver;

// Mock matchMedia
window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock URL.createObjectURL / revokeObjectURL
URL.createObjectURL = vi.fn(() => "blob:mock-url");
URL.revokeObjectURL = vi.fn();

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
(window as any).ResizeObserver = MockResizeObserver;

// Clear storage between tests
beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});
