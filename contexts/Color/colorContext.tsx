import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const ColorContext = createContext('');
const ColorUpdateContext = createContext<
  Dispatch<SetStateAction<string>> | undefined
>(undefined);

export const useColor = () => useContext(ColorContext);
export const useColorUpdate = () => useContext(ColorUpdateContext);

export const ColorProvider = (props: {children: JSX.Element}) => {
  const [color, setColor] = useState('');
  return (
    <ColorContext.Provider value={color}>
      <ColorUpdateContext.Provider value={setColor}>
        {props.children}
      </ColorUpdateContext.Provider>
    </ColorContext.Provider>
  );
};
