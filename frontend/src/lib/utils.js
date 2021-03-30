import { routeToSignin, routeToCalendar } from '../lib/utilsRouts';
// permissions
export const permission = { admin: 'ADMIN', guide: 'GUIDE', user: 'USER' };
export const specialsations = [
  'Trail_riding',
  'Singletrack',
  'Bikepark',
  'Downhill',
  'Cross_country',
  'All_mountain',
  'Enduro',
  'Dirt_jumping',
  'Freeride',
  'MTB_touring',
  'Fatbiking',
  'Ebikes',
];
export const specialsations2 = {
  Trail_riding: 'Trail Riding',
  Singletrack: 'Singletrack',
  Bikepark: 'Bikepark',
  Downhill: 'Downhill',
  Cross_country: 'Cross Country',
  All_mountain: 'All Mountain',
  Enduro: 'Enduro',
  Dirt_jumping: 'Dirt Jumping',
  Freeride: 'Freeride',
  MTB_touring: 'MTB Touring',
  Fatbiking: 'Fatbiking',
  Ebikes: 'Ebikes',
};

export const difficulties = {
  S0: 'S0 (very easy)',
  S1: 'S1 (easy)',
  S2: 'S2 (intermediate)',
  S3: 'S3 (difficult)',
  S4: 'S4 (very difficult)',
  S5: 'S5 (extremely difficult)',
};

export const colors = [
  'Col1',
  'Col2',
  'Col3',
  'Col4',
  'Col5',
  'Col6',
  'Col7',
  'Col8',
  'Col9',
];
export function callback() {
  console.log('it is me callback');
}
