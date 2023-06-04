import axios from "axios";
import { useEffect, useState } from "react";
import { apiBase } from "../constants/api";

export interface Field {
  name: string;
  field: string;
}

export const useQuickActions = (code: string) => {
  const [matchedMethod, setMatchedMethod] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<Record<string, string>>({});
  const [erred, setErred] = useState<string>("");

  const getFields = async () => {
    const { data } = await axios.post(`${apiBase}/checkQuickAction`, {
      code: code,
    });
    if (data.matchedMethod && data.fields.length > 0) {
      setMatchedMethod(data.matchedMethod);
      setFields(data.fields);
    }
  };

  const runQuickAction = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${apiBase}/runQuickAction`, {
        action: matchedMethod,
        fields: state,
      });
      console.log(data);
    } catch (err) {
      setErred(JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      getFields();
    }
  }, []);

  return {
    fields,
    matchedMethod,
    runQuickAction,
    loading,
    state,
    setState,
    erred,
  };
};
