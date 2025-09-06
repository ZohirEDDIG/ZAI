import { useEffect } from 'react';
import useWindowWidth from './useWindowWidth';

const useClickOutside = (label = null, ref, setterFunction) => {
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const handleClickOutside = (e)  => {
      if(label === 'sidebar') {
        if(ref.current && !ref.current.contains(e.target) && windowWidth < 1024) {
          setterFunction(false);
        }
      }  else {
        if(ref.current && !ref.current.contains(e.target)) {
          setterFunction(false);
        }
      }
      
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);

  }, [windowWidth]);
};

export default useClickOutside;