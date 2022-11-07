import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

const ColorContext = createContext('');
const ColorUpdateContext = createContext<Dispatch<SetStateAction<string>>>(
  () => '',
);

export function useColor(): string {
  console.log('useColor -> context = ', useContext(ColorContext));
  return useContext(ColorContext);
}

export function useColorUpdate() {
  return useContext(ColorUpdateContext);
}

export function ColorProvider(props: {children: JSX.Element}) {
  const [color, setColor] = useState('');

  return (
    <ColorContext.Provider value={color}>
      <ColorUpdateContext.Provider value={setColor}>
        {props.children}
      </ColorUpdateContext.Provider>
    </ColorContext.Provider>
  );
}
