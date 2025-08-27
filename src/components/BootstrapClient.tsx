'use client';
import { useEffect } from 'react';

// Load Bootstrap JS on the client (typed import avoids the
// "Could not find a declaration file..." error)
export default function BootstrapClient() {
  useEffect(() => {
    import('bootstrap');
  }, []);
  return null;
}
