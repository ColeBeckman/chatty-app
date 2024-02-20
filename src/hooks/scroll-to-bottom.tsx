import React from 'react';

function scrollToBottom<T>(
  dep: T,
): React.MutableRefObject<HTMLUListElement | null> {
  const ref = React.useRef<HTMLUListElement | null>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}

export default scrollToBottom;
