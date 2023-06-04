import { Box, Button, Flex, Input, Text } from "@twilio-paste/core";
import { useGPT } from "./hooks/useGPT";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./components/Codeblock";
import { DataLoader } from "./components/DataLoader";
import { SendIcon } from "@twilio-paste/icons/esm/SendIcon";

export const App = () => {
  const { query, loading, answer, onSend } = useGPT();
  const [messageInput, setMessageInput] = useState<string>("");

  const onMessageSend = () => {
    onSend(messageInput);
    setMessageInput("");
  };

  return (
    <Flex width="100%" marginY="space100" vertical hAlignContent={"center"}>
      <Box maxWidth="60%" minWidth="60%">
        <Box marginBottom="space100">
          <Text textAlign="center" as="p" fontSize="fontSize100">
            flex<strong>GPT</strong>
          </Text>
        </Box>
        <Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onMessageSend();
            }
          }}
          type="text"
          insertAfter={
            <Button
              disabled={!messageInput}
              onClick={onMessageSend}
              variant="primary"
            >
              <SendIcon decorative={false} size="sizeIcon20" title="Query" />
            </Button>
          }
          placeholder="Ask a question"
        />
        <Box marginTop="space100"></Box>
        <Box marginBottom="space100">
          <Text as="h3" fontSize="fontSize50">
            {query}
          </Text>
        </Box>
        {loading && <DataLoader />}
        <ReactMarkdown components={{ code: CodeBlock }}>{answer}</ReactMarkdown>
      </Box>
    </Flex>
  );
};
