import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Guide from './Guide';

// render props vs high order components
// render props:

const ALL_GUIDES_QUERY = gql`
    query ALL_GUIDES_QUERY {
        users {
            name
            surname
            description
            id
        }
    }
`;

const GuidesList = () => {
        return (
            <div>
                <h4>Guides:</h4>
                <Query query={ALL_GUIDES_QUERY}>
                    {({ data, error, loading}) => {
                        if (error) return <p>{error}</p>
                        if (loading) return <p>Loading...</p>;
                        if (!data.users) return <p>No MTB Guide found</p>;
                        console.log(data.users);
                        return (
                            <ul>
                                {data.users.map(user => (
                                    <Guide item={user} key={user.id}/>
                                ) 
                                )}
                            </ul>
                            )
                    }}
                </Query>
            </div>
        )
};

/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

export default GuidesList;