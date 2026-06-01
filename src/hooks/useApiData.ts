"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useApiData<T = unknown>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let on = true;
    setLoading(true);
    api
      .get(path)
      .then((r) => { if (on) setData(r.data); })
      .catch(() => {})
      .finally(() => { if (on) setLoading(false); });
    return () => { on = false; };
  }, [path]);
  return { data, loading };
}
