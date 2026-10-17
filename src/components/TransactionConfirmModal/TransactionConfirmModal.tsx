"use client";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    Text,
} from "@chakra-ui/react";
import { useRef, type ReactNode } from "react";

export interface TransactionDetail {
    label: string;
    value: ReactNode;
}

export interface TransactionConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description?: ReactNode;
    details: TransactionDetail[];
    /** Extra caution shown above the actions, e.g. irreversibility notes. */
    warning?: ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
}

/**
 * Last-chance review step shown before a transaction is handed to Freighter.
 * Focus starts on Cancel so a stray Enter press can't submit by accident.
 */
export default function TransactionConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    details,
    warning,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
}: TransactionConfirmModalProps) {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
            isCentered
            lockScrollAcrossViewports
            returnFocusOnClose
        >
            <AlertDialogOverlay backdropFilter="blur(3px)" />
            <AlertDialogContent
                bg="app.surface"
                color="app.text"
                borderRadius="3xl"
                mx={{ base: 4, md: "auto" }}
            >
                <AlertDialogHeader textAlign="center">{title}</AlertDialogHeader>
                <AlertDialogBody>
                    <Flex direction="column" gap={4}>
                        {description && (
                            <Text fontSize="sm" color="app.muted">
                                {description}
                            </Text>
                        )}
                        <Box
                            as="dl"
                            border="1px solid"
                            borderColor="app.border"
                            borderRadius="2xl"
                            p={3}
                        >
                            {details.map((detail) => (
                                <Flex
                                    key={detail.label}
                                    justify="space-between"
                                    fontSize="sm"
                                    py={1}
                                    gap={4}
                                >
                                    <Text as="dt" color="app.muted">
                                        {detail.label}
                                    </Text>
                                    <Text as="dd" textAlign="right" fontWeight="semibold">
                                        {detail.value}
                                    </Text>
                                </Flex>
                            ))}
                        </Box>
                        {warning && (
                            <Box
                                borderRadius="2xl"
                                bg="app.warningBg"
                                color="app.warningFg"
                                fontSize="xs"
                                p={3}
                            >
                                {warning}
                            </Box>
                        )}
                    </Flex>
                </AlertDialogBody>
                <AlertDialogFooter gap={2}>
                    <Button
                        ref={cancelRef}
                        variant="ghost"
                        borderRadius="2xl"
                        onClick={onClose}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        borderRadius="2xl"
                        bg="app.accent"
                        color="app.onAccent"
                        _hover={{ opacity: 0.9 }}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
