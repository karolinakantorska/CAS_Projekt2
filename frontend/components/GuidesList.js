import React from 'react';

import { gql, useQuery } from '@apollo/client';

import GuideCard from './GuideCard';
import User from './User'

// render props vs high order components
// render props:

const ALL_GUIDES_QUERY = gql`
  query ALL_GUIDES_QUERY($permissions: Permission) {
    users(where: { permissions: $permissions }) {
      name
      surname
      description
      id
      photo
    }
  }
`;


const GuidesList = (props) => {
    const { loading, error, data } = useQuery(ALL_GUIDES_QUERY, {
      variables: { permissions: 'GUIDE' },
    });

    //console.log('error: ', error);
    if (error) return <p>Error:{error}</p>
    if (loading) return <p>Loading...</p>;
    if (!data.users) return <p>No MTB Guide found</p>;

        return (
          <div>

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
          </div>
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
export { ALL_GUIDES_QUERY };

/*
          <div>
            <h4>Guides:</h4>
            <ul>
              {data.users.map((user) => (
                <GuideCard user={user} key={user.id} />
              ))}
            </ul>
          </div>;
          */