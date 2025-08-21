'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuthStore, User } from '@/lib/store/authStore';
import { usePathname, useRouter } from 'next/navigation';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, setUser, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const userData: User = await res.json();
          setUser(userData);
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error('Session check failed:', error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [setUser, clearAuth]);

  useEffect(() => {
    if (!loading) {
      const privateRoutes = ['/profile', '/notes'];
      const authRoutes = ['/sign-in', '/sign-up'];
      
      const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
      const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
      
      if (!user && isPrivateRoute) {
        router.push('/sign-in');
      } else if (user && isAuthRoute) {
        router.push('/profile');
      }
    }
  }, [user, pathname, router, loading]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading }}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}