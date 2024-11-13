import { useSearchParams } from 'next/navigation';

function deleteQueryParamsInUrl(...keys: string[]) {
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  keys.forEach(key => params.delete(key));

  const newUrl = `${window.location.pathname}?${params.toString()}`;

  return newUrl;
}

export default deleteQueryParamsInUrl;
