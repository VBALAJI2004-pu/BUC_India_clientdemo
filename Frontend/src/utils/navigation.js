import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/** navigate(-1) when history exists; otherwise go home */
export function useSmartBack(fallback = "/") {
  const navigate = useNavigate();

  return useCallback(() => {
    const idx = window.history.state?.idx;
    if (typeof idx === "number" && idx > 0) {
      navigate(-1);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback, { replace: true });
    }
  }, [navigate, fallback]);
}
