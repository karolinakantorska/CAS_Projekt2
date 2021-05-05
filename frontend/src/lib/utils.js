import React, { useState, useEffect } from 'react';
// permissions
export const permission = { admin: 'ADMIN', guide: 'GUIDE', user: 'USER' };
export const specialsations = [
  'Trail_Riding',
  'Singletrack',
  'Bikepark',
  'Downhill',
  'Cross_Country',
  'All_Mountain',
  'Enduro',
  'Dirt_Jumping',
  'Freeride',
  'MTB_Touring',
  'Fatbiking',
  'Ebikes',
];
export const difficulties = {
  S0: 'S0 (very easy)',
  S1: 'S1 (easy)',
  S2: 'S2 (intermediate)',
  S3: 'S3 (difficult)',
  S4: 'S4 (very difficult)',
  S5: 'S5 (extremely difficult)',
};
export function useHydratationFix() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}
export function callback() {
  console.log('it is me callback');
}
