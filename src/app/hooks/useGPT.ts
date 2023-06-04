import { useState } from "react";
import axios from "axios";
import { apiBase } from "../constants/api";

export const useGPT = () => {
  const [query, setQuery] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const onSend = async (message: string) => {
    setAnswer("");
    setLoading(true);
    setQuery(message);
    const response = await axios.post(`${apiBase}/query`, {
      query: message,
    });
    setAnswer(response.data[0].message.content);
    setLoading(false);
  };

  return {
    onSend,
    query,
    loading,
    answer,
  };
};
