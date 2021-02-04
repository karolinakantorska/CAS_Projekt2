import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function UserStateProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    id: '',
    email: '',
    name: '',
    permissions: '',
  });

  function addCurrentUser(user) {
    setCurrentUser(user);
  }
  function removeCurrentUser() {
    setCurrentUser({ id: '', email: '', name: '', permissions: '' });
  }

  return (
    <LocalStateProvider value={{ currentUser, addCurrentUser, removeCurrentUser }}>
      {children}
    </LocalStateProvider>
  );
}
function useUser() {
  const all = useContext(LocalStateContext);
  return all;
}
export { UserStateProvider, useUser };
