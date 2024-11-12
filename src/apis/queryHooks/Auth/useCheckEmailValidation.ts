import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { getEmailValidation } from '@/apis/queryFunctions/Auth';

function useCheckEmailValidation() {
  const [canUseEmail, setCanUseEmail] = useState(false);

  const { mutate, error } = useMutation({
    mutationFn: (email: string) => getEmailValidation({ email }),
    onSuccess: () => {
      return setCanUseEmail(true);
    },
    onError: () => {
      return setCanUseEmail(false);
    },
  });

  return { mutate, error, canUseEmail, setCanUseEmail };
}

export default useCheckEmailValidation;
