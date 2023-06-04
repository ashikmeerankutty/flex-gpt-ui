import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box, Button, Flex, Text } from "@twilio-paste/core";
import { useQuickActions } from "../hooks/useQuickActions";
import { QuickActionsModal } from "./QuickActionsModal";
import { useState } from "react";

export const CodeBlock = ({ inline, children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { matchedMethod, erred, fields, runQuickAction, loading, state, setState } = useQuickActions(
    !inline ? children : ""
  );
  if (inline) {
    return <Text as="strong">`{children}`</Text>;
  }

  console.log(matchedMethod, fields);
  return (
    <>
      {matchedMethod && (
        <Flex hAlignContent="right">
          {erred && <Box marginY="space50">{erred}</Box>}
          <Button
            loading={loading}
            onClick={() => {
              setIsOpen(true);
            }}
            variant="secondary"
          >
            Run {matchedMethod}
          </Button>
          <QuickActionsModal
            fields={fields}
            isOpen={isOpen}
            onConfirm={runQuickAction}
            state={state}
            setState={setState}
            handleClose={() => setIsOpen(false)}
          />
        </Flex>
      )}

      <SyntaxHighlighter style={dracula} language="js">
        {children}
      </SyntaxHighlighter>
    </>
  );
};
