import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthorizationStatus } from '../store/user-process/selectors';
import { useAppSelector } from '.';
import { AuthorizationStatus } from '../constant';

export function useRedirectingIfNotAuth(link: string): void {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authorizationStatus === AuthorizationStatus.NoAuth &&
      link &&
      navigate &&
      true
    ) {
      navigate(link);
    }
  }, [authorizationStatus, link, navigate]);
}
