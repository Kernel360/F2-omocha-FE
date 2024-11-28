/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';

function useObjectURL(file: File | null) {
  const [objectURL, setObjectURL] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setObjectURL(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  return objectURL;
}

export default useObjectURL;
