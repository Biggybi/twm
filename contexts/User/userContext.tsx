import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import Login from '../../components/Login/Login';

const UserIDContext = createContext('');
const UserIDUpdateContext = createContext<Dispatch<SetStateAction<string>>>(
  () => '',
);

export function useUserID(): string {
  console.log('useUserID -> context = ', useContext(UserIDContext));
  return useContext(UserIDContext);
}

export function useUserIDUpdate() {
  return useContext(UserIDUpdateContext);
}

export function UserIDProvider(props: {children: JSX.Element}) {
  const [userID, setUserID] = useState('');

  return (
    <UserIDContext.Provider value={userID as string}>
      <UserIDUpdateContext.Provider value={setUserID}>
        {userID ? props.children : <Login />}
      </UserIDUpdateContext.Provider>
    </UserIDContext.Provider>
  );
}
