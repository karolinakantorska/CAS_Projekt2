import React, { useState, useEffect } from 'react';
export function useHydratationFix() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}
