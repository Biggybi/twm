import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import Login from '../../components/Login/Login';

const UserIDContext = createContext('');
const UserIDUpdateContext = createContext<
  Dispatch<SetStateAction<string>> | undefined
>(undefined);

export const useUserID = () => useContext(UserIDContext);
export const useUserIDUpdate = () => useContext(UserIDUpdateContext);

export const UserIDProvider = (props: {children: JSX.Element}) => {
  const [userID, setUserID] = useState('');
  return (
    <UserIDContext.Provider value={userID}>
      <UserIDUpdateContext.Provider value={setUserID}>
        {userID ? props.children : <Login />}
      </UserIDUpdateContext.Provider>
    </UserIDContext.Provider>
  );
};
