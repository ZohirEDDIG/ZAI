import { useRef, useEffect } from 'react';

const useTextareaRef = (dependency) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if(textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [dependency]);

  return textareaRef;
};

export default useTextareaRef;