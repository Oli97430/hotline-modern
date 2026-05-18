import { fireEvent, render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { describe, expect, it, vi } from "vitest";
import { E2EIndicator } from "../components/E2EIndicator";
import i18n from "../i18n";

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
}

describe("E2EIndicator", () => {
  it("shows not-encrypted state when disabled", () => {
    const { container } = renderWithI18n(<E2EIndicator enabled={false} />);
    const indicator = container.querySelector(".not-encrypted");
    expect(indicator).toBeInTheDocument();
  });

  it("shows encrypted state when enabled", () => {
    renderWithI18n(<E2EIndicator enabled={true} peerFingerprint="abcdef1234567890" />);
    expect(screen.getByText("E2E")).toBeInTheDocument();
  });

  it("shows details panel on click when encrypted", () => {
    renderWithI18n(
      <E2EIndicator
        enabled={true}
        peerFingerprint="abcdef1234567890abcdef1234567890"
        ownFingerprint="1234567890abcdef1234567890abcdef"
      />,
    );

    const btn = screen.getByText("E2E");
    fireEvent.click(btn);

    expect(screen.getByText("End-to-End Encryption")).toBeInTheDocument();
  });

  it("shows truncated fingerprints", () => {
    renderWithI18n(
      <E2EIndicator
        enabled={true}
        peerFingerprint="abcdef1234567890abcdef1234567890"
        ownFingerprint="1234567890abcdef1234567890abcdef"
      />,
    );

    fireEvent.click(screen.getByText("E2E"));

    expect(screen.getByText("abcdef1234567890...")).toBeInTheDocument();
    expect(screen.getByText("1234567890abcdef...")).toBeInTheDocument();
  });

  it("copies peer fingerprint to clipboard", () => {
    renderWithI18n(<E2EIndicator enabled={true} peerFingerprint="abcdef1234567890abcdef1234567890" />);

    fireEvent.click(screen.getByText("E2E"));

    const copyBtn = document.querySelector(".e2e-fp-copy") as HTMLElement;
    if (copyBtn) fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("abcdef1234567890abcdef1234567890");
  });

  it("toggles details panel on repeated clicks", () => {
    renderWithI18n(<E2EIndicator enabled={true} peerFingerprint="abc123" />);

    const btn = screen.getByText("E2E");
    fireEvent.click(btn);
    expect(document.querySelector(".e2e-details")).toBeInTheDocument();

    fireEvent.click(btn);
    expect(document.querySelector(".e2e-details")).not.toBeInTheDocument();
  });
});
