import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
//TODO updating photo
const ONE_USER_QUERRY = gql`
  query ONE_USER_QUERRY($id: ID!) {
    user(where: { id: $id }) {
      id
      email
      name
      surname
      description
      photo
    }
  }
`;
const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $id: ID!
    $email: String
    $name: String
    $surname: String
    $description: String
    $photo: String
  ) {
    updateUser(
      id: $id
      email: $email
      name: $name
      surname: $surname
      description: $description
      photo: $photo
    ) {
      email
      name
      surname
      description
      photo
    }
  }
`;

const UpdateGuide = (props) => {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const id = props.id;

  const [
    updateUser,
    { loadingMutation, errorMutation, calledMutation, dataMutation },
  ] = useMutation(UPDATE_USER);

  const { loading, errorQuery, data } = useQuery(ONE_USER_QUERRY, {
    variables: { id: id },
  });
    function handleNameChange(e) {
      setName(e.target.value);
    }

    function handleSurnameChange(e) {
      setSurname(e.target.value);
    }

    function handleEmailChange(e) {
      setEmail(e.target.value);
    }

    function handleDescriptionChange(e) {
      setDescription(e.target.value);
    }
    async function updateGuide(e, updateGuideMutation) {
      e.preventDefault();
      console.log("updating Guide");
      const res = await updateGuideMutation({
        variables: {
          id,
        },
      });
      console.log("Updated");
    }

  useEffect(() => {
    if (!loading && data) {
      console.log(data.user.name);
      setName(data.user.name);
      setEmail(data.user.email);
      setSurname(data.user.surname);
      setDescription(data.user.description);
      setPhoto(data.user.photo);
    }
  }, [loading, data]);
      async function handlePhotoUpload(e) {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("upload_preset", "MTBregistration");

        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/karolinauploads/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await cloudinaryRes.json();
        setPhoto(file.secure_url);
        //console.log('photo url: ', file.secure_url);
      }

  if (loading) {
    return <p>"Loading..." </p>;
  }
  if (errorQuery) return `Error! ${error.message}`;
  if (!data.user) return <p>No Guide Found</p>;

  return (
    <div>
      <p>id:{props.id} </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // IT IS NOT CHANGING DISPLAYED DATA UNTIL RELOAD
          // TODO catche updates
          // TODO displaying error
          // TODO optimistic updates
          // TODO maybe animation by loading

          updateUser({
            variables: {
              id,
              email,
              name,
              surname,
              description,
              photo,
            },
          });
          Router.push({
            pathname: "/guides",
          });
        }}
      >
        <fieldset disabled={loadingMutation} aria-busy={loadingMutation}>
          <img src={photo} alt="Mountainbiker photo" />
          <label htmlFor="photo">
            Photo:
            <input type="file" onChange={handlePhotoUpload} required />
          </label>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              onChange={handleNameChange}
              defaultValue={name}
              required
            />
            <p>{name}</p>
          </label>
          <label htmlFor="surname">
            Surname:
            <input
              type="text"
              onChange={handleSurnameChange}
              defaultValue={surname}
              required
            />
            <p>{surname}</p>
          </label>
          <label htmlFor="email">
            E-mail:
            <input
              type="email"
              onChange={handleEmailChange}
              defaultValue={email}
              required
            />
            <p>{email}</p>
          </label>
          <label htmlFor="description">
            Description:
            <input
              type="text"
              onChange={handleDescriptionChange}
              defaultValue={description}
              required
            />
            <p>{description}</p>
          </label>
          <button type="submit">Submitt</button>
        </fieldset>
      </form>
    </div>
  );
};;
// TODO use context use themes
/*
const StyledNav = styled.nav`
    background: white;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
`;
*/

  

export default UpdateGuide;
export { UPDATE_USER }
