/*
export const fakeReservation = {
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
*/
export const fakeReservation2 = {
  reservation: {
    __typename: 'Reservation',
    id: '456',
    time: 'AM',
    userName: 'Bradley',
    userEmail: 'bradley@gmail.com',
    nrOfPeople: '5',
    description: "let's go",
    relatedDay: {
      __typename: 'Day',
      year: '2021',
      month: 'Januar',
      day: '21',
    },
    guide: {
      __typename: 'User',
      id: '789',
      name: 'Maria',
      surname: 'Monroe',
      photo: 'maria.jpg',
    },
  },
};
export const fakeOneUser = {
  user: {
    __typename: 'User',
    id: '123',
    email: 'magic@gmail.com',
    name: 'Magic',
    surname: 'Michalski',
    description: 'hallo',
    photo: 'me.jpg',
  },
};
export const fakeGuide = {
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
  email: 'magic@gmail.com',
  id: '123',
  name: 'Magic',
  surname: 'Michael',
  permissions: 'USER',
};
export const fakeAdmin = {
  email: 'karolina@gmail.com',
  id: '123',
  name: 'Karolina',
  permissions: 'ADMIN',
};

export const fakeGuidesList = {
  users: [
    {
      __typename: 'User',
      description: 'Hallo...',
      email: 'speady@gmail.com',
      id: 'ckh3n7algb8r50946cpug61su',
      name: 'Speedy',
      photo:
        'https://res.cloudinary.com/karolinauploads/image/upload/v1604508914/images/g65d0lylojpsrqqqzpgu.jpg',
      surname: 'Gonzales',
    },
    {
      __typename: 'User',
      description: 'Hallo...',
      email: 'olaf@gmail.com',
      id: 'ckiemg0xj9qx70981qd281li5',
      name: 'Olaf',
      photo:
        'https://res.cloudinary.com/karolinauploads/image/upload/v1607349564/images/asxyln6ja3ahgfej1bci.jpg',
      surname: 'Olaf',
    },
  ],
};
//days:
export const fakeEmptyMonthReservations = {
  days: [],
};
export const fakeMonthReservations2 = {
  days: [
    {
      //__typename: 'Day',
      id: '123',
      year: '2021',
      month: 'Januar',
      reservations: [
        {
          // __typename: 'Reservation',
          id: 'ckhbttow935350959b63si625',
          time: 'AM',
          userName: 'adrian',
          userEmail: 'adrian@gmail.com',
          nrOfPeople: '1',
          description: '',
          guide: {
            //__typename: 'User',
            name: 'Filip',
          },
        },
      ],
    },
  ],
};
export const fakeMonthReservations3 = {
  days: [
    {
      year: '2020',
      month: 'December',
      day: '',
      reservations: [
        {
          userName: '',
          userEmail: '',
          time: 'AM',
          id: 'cki61cvx81i560952hc0jcwfh',
          guide: {
            name: 'Speedy',
          },
        },
      ],
    },
    {
      year: '2020',
      month: 'December',
      day: '15',
      reservations: [],
    },
    {
      year: '2020',
      month: 'December',
      day: '20',
      reservations: [],
    },
  ],
};
