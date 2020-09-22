import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client'
import Router from 'next/router'
import Link from 'next/link';
import styled from 'styled-components';
//import ALL_GUIDES_QUERY from './GuidesList'

const ALL_GUIDES_QUERY = gql`
  query ALL_GUIDES_QUERY {
    users {
      id
      email
      name
      surname
      description
      photo
    }
  }
`;

const ADD_GUIDE = gql`
  mutation ADD_GUIDE(
    $email: String!
    $name: String!
    $surname: String
    $description: String
    $photo: String
  ) {
    createUser(
      email: $email
      name: $name
      surname: $surname
      description: $description
      photo: $photo
    ) {
      id
      email
      name
      surname
      description
      photo
    }
  }
`;

const AddGuide = (props) => {
    const { loading: loadingAll, error: errorAll, data: dataAll } = useQuery(ALL_GUIDES_QUERY);
    console.log("dataAll ", dataAll);
    const name = useFormInput('');
    const surname = useFormInput('');
    const email = useFormInput('');
    const description = useFormInput('');
    const [photo, setPhoto] = useState('');
    const [bigPhoto, setBigPhoto] = useState('');

    const [add_guide, { loading, error,  data }] = useMutation(ADD_GUIDE, {
        update (cache,data) {
          console.log("DATA NEW USER ", data.data.createUser);
          // Get the current guide list
          const dataAll = cache.readQuery({ query: ALL_GUIDES_QUERY });
          // Create a new user
          const newUser = {
            ...data.data.createUser,
          };
          // Write back to the users list, appending the new user
          cache.writeQuery({
            query: ALL_GUIDES_QUERY,
            data: {
              users: [...dataAll.users, newUser],
            },
          });
        }     
    });


    async function handlePhotoUpload(e) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('upload_preset', 'MTBregistration');

        const cloudinaryRes = await fetch(
            'https://api.cloudinary.com/v1_1/karolinauploads/image/upload',
            {
                method: 'POST',
                body: data
            }
        );
        const file = await cloudinaryRes.json();
        setPhoto(file.secure_url);
        //setBigPhoto(file.eager[0].secure_url);
        //console.log('photo url: ', file.secure_url);
        //console.log('photo url: ', file.eager[0].secure_url);
    }

    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                // TODO catche updates
                // TODO displaying error
                // TODO optimistic updates
                // TODO maybe animation by loading

                add_guide({
                     variables: {
                          email: email.value,
                          name: name.value, 
                          surname: surname.value, 
                          description: description.value,
                          photo: photo,
                          //bigPhoto: bigPhoto,
                    }
                });
                Router.push({
                    pathname: '/guides'
                }) 
            }} 
            >
                <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="photo">
                        Photo:
                    <input
                            type="file"
                            onChange={handlePhotoUpload}
                            required
                        />
                        <p>{name.value}</p>
                        {photo && <img src={photo} width='200'alt= "upload previev" />}
                    </label>
                    <label htmlFor="name">
                        Name:
                    <input
                            {...name}
                            type="text"
                            placeholder="name"
                            required
                        />
                        <p>{name.value}</p>
                    </label>
                    <label htmlFor="surname">
                        Surname:
                    <input
                            {...surname}
                            type="text"
                            placeholder="surname"
                            required
                        />
                        <p>{surname.value}</p>
                    </label>
                    <label htmlFor="email">
                        E-mail:
                    <input
                            {...email}
                            type="email"
                            placeholder="e mail"
                            required
                        />
                        <p>{email.value}</p>
                    </label>
                    <label htmlFor="description">
                        Description:
                    <input
                            {...description}
                            type="text"
                            required
                        />
                        <p>{description.value}</p>
                    </label>
                    <button type="submit">Submitt</button>
                </fieldset>
            </form> 
            {/*console.log('error:', error)*/}
        </div>
    )
};
// TODO use context use themes
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/
function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    };
}
export default AddGuide;
export { ADD_GUIDE }

