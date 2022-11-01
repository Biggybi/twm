import React, {createContext, useContext, useState} from 'react';

export const tabIDContext = createContext<string>('');

const TabIDContext = createContext(0);
const TabIDUpdateContext = createContext(0);

export function useTabID() {
  console.log('useTabID -> context = ', useContext(TabIDContext));
  return useContext(TabIDContext);
}

export function useTabIDUpdate() {
  return useContext(TabIDUpdateContext);
}

export function TabIDProvider(props: {children: JSX.Element}) {
  const [tabID, setTabID] = useState(2);

  function toggleTabID(tabID: number): void {
    setTabID(tabID);
  }

  return (
    <TabIDContext.Provider value={tabID}>
      <TabIDUpdateContext.Provider value={toggleTabID as unknown as number}>
        {props.children}
      </TabIDUpdateContext.Provider>
    </TabIDContext.Provider>
  );
}
