import { useRef, useEffect } from "react";

const useKey = (key, cb) => {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    const handle = (event) => {
      if (event.code === key) {
        callbackRef.current(event);
      }
    };

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  });
};

export default useKey;
