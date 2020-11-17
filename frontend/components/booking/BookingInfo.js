import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import User from '../main/User';
import ONE_RESERVATION_QUERY from '../../graphgl/queries/ONE_RESERVATION_QUERY';
import DELETE_RESERVATION from '../../graphgl/mutations/DELETE_RESERVATION';

const BookingInfo = (props) => {
  const { id } = props.props;
  console.log('id: ', id);
  const { loading, error, data } = useQuery(ONE_RESERVATION_QUERY, {
    variables: {
      id,
    },
  });
  console.log('data: ', data);
  
  const [
    delete_reservation,
    { loading: loadingDelete, error: errorDelete, data: dataDelete },
  ] = useMutation(DELETE_RESERVATION, {});

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (data) {
    const {
      description,
      id,
      nrOfPeople,
      time,
      userEmail,
      userName,
    } = data.reservation;
const { day, month, year } = data.reservation.relatedDay;
const { id: guideId, name, surname } = data.reservation.guide;
  const router = useRouter();
  function handleDeleteReservation() {
    delete_reservation({
      variables: { id },
    });
    router.push({
      pathname: '/booking_guide',
      query: {
        guideId,
        guideName: name,
        guideSurname: surname,
      },
    });
  }
    return (
      <User>
        {(currentUserPermission, currentUserName) => (
          <span>
            <p>Booking:</p>
            <p>
              Day: {day}/{month}/{year}
            </p>
            <p>Id: {id}</p>
            <p>Time: {time}</p>
            <p>Gast: {userName}</p>
            <p>Gast email: {userEmail}</p>
            <p>Number of gests: {nrOfPeople}</p>
            <p>Desription: {nrOfPeople}</p>
            <textarea readOnly value={description}></textarea>
            <button onClick={handleDeleteReservation}>
              Delete Reservation
            </button>
          </span>
        )}
      </User>
    );
  }
};

BookingInfo.propTypes = {
  id: PropTypes.string,
};
export default BookingInfo;
