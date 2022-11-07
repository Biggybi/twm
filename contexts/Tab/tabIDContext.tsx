import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const TabIDContext = createContext(0);
const TabIDUpdateContext = createContext<Dispatch<SetStateAction<number>>>(
  () => 0,
);

export function useTabID() {
  console.log('useTabID -> context = ', useContext(TabIDContext));
  return useContext(TabIDContext);
}

export function useTabIDUpdate() {
  return useContext(TabIDUpdateContext);
}

export function TabIDProvider(props: {children: JSX.Element}) {
  const [tabID, setTabID] = useState(2);

  return (
    <TabIDContext.Provider value={tabID}>
      <TabIDUpdateContext.Provider value={setTabID}>
        {props.children}
      </TabIDUpdateContext.Provider>
    </TabIDContext.Provider>
  );
}
