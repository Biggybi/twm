import React, {useContext, useState} from 'react';
import {createContext} from 'react';
import Login from '../../components/Login/Login';

export const userIDContext = createContext<string>('');

const UserIDContext = createContext('');
const UserIDUpdateContext = createContext('');

export function useUserID(): string {
  console.log('useUserID -> context = ', useContext(UserIDContext));
  return useContext(UserIDContext);
}

export function useUserIDUpdate(): string {
  return useContext(UserIDUpdateContext);
}

export function UserIDProvider(props: {children: JSX.Element}) {
  const [userID, setUserID] = useState('');

  function toggleUserID(userID: string): void {
    console.log('USERID PROVIDER userID = ', userID);
    setUserID(userID);
  }

  return (
    <UserIDContext.Provider value={userID as string}>
      <UserIDUpdateContext.Provider value={toggleUserID as unknown as string}>
        {userID?props.children:<Login/>}
      </UserIDUpdateContext.Provider>
    </UserIDContext.Provider>
  );
}
