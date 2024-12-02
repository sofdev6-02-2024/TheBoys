'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKeycloakProfile } from '../Profile/hooks/useUserProfile';
import RoutesNavigation from '../../routes';
import Search from './search';

export default function AdminChoachRequest() {
  const { user, isLoading } = useKeycloakProfile();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !isLoading && user && user.role !== 'Admin') {
      router.push(RoutesNavigation.AccessDenied);
    }
  }, [isClient, isLoading, user, router]);

  if (isLoading || !isClient) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Search />
    </div>
  );
}
