'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/check-session');
        const data = await response.json();
        
        if (!data.account && window.location.pathname !== '/login') {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
  
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <html lang="en">
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
