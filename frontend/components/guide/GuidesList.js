import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
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
        <span>
          <h4>Guides: </h4>

            <StyledDiv>
              {data.users.map((user) => (
                <GuideCard
                  currentUserPermission={currentUserPermission}
                  user={user}
                  key={user.id}
                />
              ))}
            </StyledDiv>

        </span>
      )}
    </User>
  );
};


const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 15px;
  justify-content: space-between;
`;


export default GuidesList;

