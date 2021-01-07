export const fakeReservation = () => {
  return {
    __typename: 'Reservation',
    description: '',
    guide: {
      __typename: 'User',
      id: 'ckiemg0xj9qx70981qd281li5',
      name: 'Olaf',
      photo:
        'https://res.cloudinary.com/karolinauploads/image/upload/v1607349564/images/asxyln6ja3ahgfej1bci.jpg',
      surname: 'Olaf',
    },
    relatedDay: {
      __typename: 'Day',
      day: '19',
      month: 'December',
      year: '2020',
    },
    time: 'AM',
    userEmail: 'karolina@gmail.com',
    userName: 'karolina',
  };
};
export const fakeGuide = {
  __typename: 'User',
  description: 'Hallo',
  email: 'olaf@gmail.com',
  id: '123',
  name: 'Olaf',
  photo:
    'https://res.cloudinary.com/karolinauploads/image/upload/v1607349564/images/asxyln6ja3ahgfej1bci.jpg',
  surname: 'Olafski',
  permissions: 'GUIDE',
};
export const fakeUser = {
  __typename: 'User',
  email: 'magic@gmail.com',
  id: '123',
  name: 'Magic',
  surname: 'Michael',
  permissions: 'USER',
};
export const fakeAdmin = {
  __typename: 'User',
  email: 'karolina@gmail.com',
  id: '123',
  name: 'Karolina',
  permissions: 'ADMIN',
};
export const fakeGuides = [
  {
    __typename: 'User',
    description: '',
    email: 'speady@gmail.com',
    id: 'ckh3n7algb8r50946cpug61su',
    name: 'Speedy',
    photo:
      'https://res.cloudinary.com/karolinauploads/image/upload/v1604508914/images/g65d0lylojpsrqqqzpgu.jpg',
    surname: 'Gonzales',
  },
  {
    __typename: 'User',
    description: '',
    email: '<fdgt',
    id: 'ckiemg0xj9qx70981qd281li5',
    name: 'Olaf',
    photo:
      'https://res.cloudinary.com/karolinauploads/image/upload/v1607349564/images/asxyln6ja3ahgfej1bci.jpg',
    surname: 'Olaf',
  },
];
//days:
export const fakeMonthReservations = [
  {
    __typename: 'Day',
    day: '',
    month: 'December',
    year: '2020',
    reservations: [
      {
        __typename: 'Reservation',
        id: 'cki61cvx81i560952hc0jcwfh',
        time: 'AM',
        userEmail: 'karol@gmail.com',
        userName: 'karol',
      },
    ],
  },
  {
    __typename: 'Day',
    day: '18',
    month: 'December',
    year: '2020',
    reservations: [
      {
        __typename: 'Reservation',
        id: 'ckipt7r5a4q8l098109ma3e42',
        time: 'AM',
        userEmail: 'magda@gmail.com',
        userName: 'magda',
      },
      {
        __typename: 'Reservation',
        id: 'ckipvr76876jp09956jm1opk4',
        time: 'PM',
        userEmail: 'magda@gmail.com',
        userName: 'magda',
      },
    ],
  },
];
