export const fakeReservation = () => ({
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
});