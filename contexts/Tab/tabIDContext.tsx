import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const TabIDContext = createContext(0);
const TabIDUpdateContext = createContext<
  Dispatch<SetStateAction<number>> | undefined
>(undefined);

export const useTabID = () => useContext(TabIDContext);
export const useTabIDUpdate = () => useContext(TabIDUpdateContext);

export const TabIDProvider = (props: {children: JSX.Element}) => {
  const [tabID, setTabID] = useState(2);
  return (
    <TabIDContext.Provider value={tabID}>
      <TabIDUpdateContext.Provider value={setTabID}>
        {props.children}
      </TabIDUpdateContext.Provider>
    </TabIDContext.Provider>
  );
};
