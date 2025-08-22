'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { fetchSession } from '@/lib/api/clientApi';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { user, setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const check = async () => {
      setLoading(true);
      const session = await fetchSession();
      if (session) setUser(session);
      else clearIsAuthenticated();
      setLoading(false);
    };
    check();
  }, [setUser, clearIsAuthenticated]);

  useEffect(() => {
    if (!loading) {
      const privateRoutes = ['/profile', '/notes'];
      const authRoutes = ['/sign-in', '/sign-up'];

      const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));
      const isAuth = authRoutes.some((r) => pathname.startsWith(r));

      if (!user && isPrivate) router.push('/sign-in');
      else if (user && isAuth) router.push('/profile');
    }
  }, [user, pathname, loading, router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}