export function handleAddGuide(
  e,
  password,
  email,
  name,
  surname,
  description,
  result,
  errors,
  addGuide,
) {
  e.preventDefault();
  if (errors) {
    return;
  }
  addGuide({
    variables: {
      password,
      email,
      name,
      surname,
      description,
      photo: result,
    },
  });
}
export function handleEditGuide(
  e,
  id,
  email,
  name,
  surname,
  description,
  result,
  errors,
  updateUser,
) {
  e.preventDefault();
  if (errors) {
    return;
  }
  updateUser({
    variables: {
      id,
      email,
      name,
      surname,
      description,
      photo: result,
    },
  });
}
