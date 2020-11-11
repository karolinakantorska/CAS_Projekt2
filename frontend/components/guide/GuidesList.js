import React from 'react';
import { useQuery } from '@apollo/client';
import GuideCard from './GuideCard';
import User from '../main/User';
import ALL_GUIDES_QUERY from '../../graphgl/queries/ALL_GUIDES_QUERY';

const GuidesList = (props) => {
  const { loading, error, data } = useQuery(ALL_GUIDES_QUERY, {
    variables: { permissions: 'GUIDE' },
  });

  if (error) return <p>Error:{error}</p>;
  if (loading) return <p>Loading...</p>;
  if (!data.users) return <p>No MTB Guide found</p>;

  return (
    <User>
      {(currentUserPermission) => (
        <div>
          <h4>Guides: </h4>
          <ul>
            {data.users.map((user) => (
              <GuideCard
                currentUserPermission={currentUserPermission}
                user={user}
                key={user.id}
              />
            ))}
          </ul>
        </div>
      )}
    </User>
  );
};

/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default GuidesList;

