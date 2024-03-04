import React, { useRef, useEffect } from 'react';

function useScrollToBottom<T>(
  dep: T,
): React.MutableRefObject<HTMLUListElement | null> {
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}

export default useScrollToBottom;
