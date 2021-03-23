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
function callback() {
  console.log('it is me callback');
}
