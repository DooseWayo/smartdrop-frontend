import { fireEvent, render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { describe, expect, it, vi } from "vitest";
import TransactionConfirmModal, {
  type TransactionConfirmModalProps,
} from "./TransactionConfirmModal";

function renderModal(overrides: Partial<TransactionConfirmModalProps> = {}) {
  const props: TransactionConfirmModalProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: "Confirm Deposit",
    details: [
      { label: "Pool", value: "XLM Pool" },
      { label: "Deposit amount", value: "25 XLM" },
    ],
    warning: "Funds stay locked for 7 days.",
    confirmLabel: "Confirm Deposit",
    ...overrides,
  };
  render(
    <ChakraProvider>
      <TransactionConfirmModal {...props} />
    </ChakraProvider>,
  );
  return props;
}

describe("TransactionConfirmModal", () => {
  it("renders the transaction details and warning", () => {
    renderModal();

    expect(screen.getByRole("alertdialog")).toBeTruthy();
    expect(screen.getByText("XLM Pool")).toBeTruthy();
    expect(screen.getByText("25 XLM")).toBeTruthy();
    expect(screen.getByText("Funds stay locked for 7 days.")).toBeTruthy();
  });

  it("calls onConfirm when the confirm button is clicked", () => {
    const props = renderModal();

    fireEvent.click(screen.getByRole("button", { name: "Confirm Deposit" }));

    expect(props.onConfirm).toHaveBeenCalledTimes(1);
    expect(props.onClose).not.toHaveBeenCalled();
  });

  it("calls onClose without confirming when cancelled", () => {
    const props = renderModal();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.onConfirm).not.toHaveBeenCalled();
  });

  it("renders nothing when closed", () => {
    renderModal({ isOpen: false });

    expect(screen.queryByRole("alertdialog")).toBeNull();
  });
});
