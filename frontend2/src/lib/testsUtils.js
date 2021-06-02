export const fakeMonthReservations = [
  {
    id: 'ckmvxkeyk0q760a321b6zo7yh',
    day: '1',
    reservations: [
      {
        guide: {
          id: 'ckmgerj54vizz0913pfe6uvu7',
        },
      },
    ],
  },
  {
    id: 'ckmvzh5ka8vec0913ympelsva',
    day: '2',
    reservations: [
      {
        guide: {
          id: 'ckmgerj54vizz0913pfe6uvu7',
        },
      },
      {
        guide: {
          id: 'ckmgerj54vizz0913pfe6uvu7',
        },
      },
      {
        guide: {
          id: 'ckmggry7i1mrm0a32w5e2wqld',
        },
      },
    ],
  },
  {
    id: 'ckmvzjn1m8vsz09133vg0ig2x',
    day: '3',
    reservations: [
      {
        guide: {
          id: 'ckmggry7i1mrm0a32w5e2wqld',
        },
      },
      {
        guide: {
          id: 'ckmgerj54vizz0913pfe6uvu7',
        },
      },
      {
        guide: null,
      },
    ],
  },
  {
    id: 'ckmw403gz1oxv0a329nvo6hyd',
    day: '10',
    reservations: [
      {
        guide: null,
      },
      {
        guide: {
          id: 'ckmggry7i1mrm0a32w5e2wqld',
        },
      },
      {
        guide: {
          id: 'ckmgerj54vizz0913pfe6uvu7',
        },
      },
    ],
  },
];

export const fakeMonthReservationsFilterResult = {
  1: [
    {
      guide: {
        id: 'ckmgerj54vizz0913pfe6uvu7',
      },
    },
  ],
  2: [
    {
      guide: {
        id: 'ckmgerj54vizz0913pfe6uvu7',
      },
    },
    {
      guide: {
        id: 'ckmgerj54vizz0913pfe6uvu7',
      },
    },
  ],
  3: [
    {
      guide: {
        id: 'ckmgerj54vizz0913pfe6uvu7',
      },
    },
  ],
  10: [
    {
      guide: {
        id: 'ckmgerj54vizz0913pfe6uvu7',
      },
    },
  ],
};
export const reservation = {
  id: '456',
  time: 'AM',
  userName: 'Bradley',
  userEmail: 'bradley@gmail.com',
  nrOfPeople: '5',
  description: "let's go",
  holiday: false,
  confirmed: false,
  guideId: '123',
  gastId: '567',
  relatedDay: {
    id: '88',
    year: '2021',
    month: 'August',
    day: '12',
  },
  guide: {
    id: '123',
    name: 'Mickey',
    surname: 'Mouse',
    phone: ' 076 223 332 11',
    email: 'mickey@gmail.com',
  },
};
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
