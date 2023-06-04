import React, { FC } from "react";
import { Field } from "../hooks/useQuickActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalHeading,
  ModalBody,
  Label,
  ModalFooter,
  ModalFooterActions,
  Input,
  Box,
} from "@twilio-paste/core";

interface QuickActionsModalProps {
  fields: Field[];
  isOpen: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  state: Record<string, string>;
  setState: (state: Record<string, string>) => void;
}

export const QuickActionsModal: FC<QuickActionsModalProps> = ({
  fields,
  handleClose,
  isOpen,
  state,
  setState,
  onConfirm,
}) => {
  const modalHeadingID = "quickActionsModal";

  return (
    <Modal
      ariaLabelledby={modalHeadingID}
      isOpen={isOpen}
      onDismiss={handleClose}
      size="default"
    >
      <ModalHeader>
        <ModalHeading as="h3" id={modalHeadingID}>
          Add the missing fields
        </ModalHeading>
      </ModalHeader>
      <ModalBody>
        {fields.map(({ name, field }) => {
          return (
            <Box marginY="space50">
              <Label htmlFor={field}>{name}</Label>
              <Input
                type="text"
                id={field}
                name={field}
                placeholder={`Add ${name}`}
                onChange={(e) => {
                  setState({
                    ...state,
                    [field]: e.target.value,
                  });
                }}
              />
            </Box>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};
