import React, {useContext, useState} from 'react';
import {createContext} from 'react';
import {Colors} from '../../tools/colors';

export const colorContext = createContext<string>('');

const ColorContext = createContext('');
const ColorUpdateContext = createContext('');

export function useColor(): string {
  console.log('useColor -> context = ', useContext(ColorContext));
  return useContext(ColorContext);
}

export function useColorUpdate(): string {
  return useContext(ColorUpdateContext);
}

export function ColorProvider(props: {children: JSX.Element}) {
  const [color, setColor] = useState<React.CSSProperties>({});

  function toggleColor(color: React.CSSProperties): void {
    console.log('COLOR PROVIDER color = ', color);
    setColor(color);
    Colors.tabAccent = color as {light: string; dark: string};
  }

  return (
    <ColorContext.Provider value={color as string}>
      <ColorUpdateContext.Provider value={toggleColor as unknown as string}>
        {props.children}
      </ColorUpdateContext.Provider>
    </ColorContext.Provider>
  );
}
