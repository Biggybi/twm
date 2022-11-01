export type color = {
  dark: string;
  light: string;
};

export interface IColors<Color> {
  [key: string]: Color;
}

export default interface IColor {
  dark: string;
  light: string;
}

// const black      :color = {dark : '#383a42', light : '#282c34'}
// const red        :color = {dark : '#e45649', light : '#e06c75'}
// const green      :color = {dark : '#50a14f', light : '#98c379'}
// const yellow     :color = {dark : '#c18401', light : '#e5c07b'}
// const blue       :color = {dark : '#0184bc', light : '#61afef'}
// const magenta    :color = {dark : '#a626a4', light : '#c678dd'}
// const cyan       :color = {dark : '#0997b3', light : '#56b6c2'}
// const white      :color = {dark : '#fafafa', light : '#dcdfe4'}
// const foreground :color = {dark : '#383a42', light : '#dcdfe4'}
// const background :color = {dark : '#fafafa', light : '#282c34'}

export const Colors: IColors<IColor> = {
  black: {dark: '#383a42', light: '#282c34'},
  // red: {dark: '#e45649', light: '#e06c75'},
  red: {dark: '#c12401', light: '#e06c75'},
  green: {dark: '#50a14f', light: '#98c379'},
  yellow: {dark: '#c18401', light: '#e5c07b'},
  // blue: {dark: '#0184bc', light: '#61afef'},
  blue: {dark: '#0076a9', light: '#61afef'},
  magenta: {dark: '#a626a4', light: '#c678dd'},
  cyan: {dark: '#0997b3', light: '#56b6c2'},
  white: {dark: '#fafafa', light: '#dcdfe4'},
  foreground: {dark: '#383a42', light: '#dcdfe4'},
  background: {dark: '#fafafa', light: '#282c34'},
  tabAccent: {dark: '', light: ''},
};

// export const Colors = new Map<string, {dark: string; light: string}>([
//   ['black     ', {dark: '#383a42', light: '#282c34'}],
//   ['red       ', {dark: '#c12401', light: '#e06c75'}],
//   ['green     ', {dark: '#50a14f', light: '#98c379'}],
//   ['yellow    ', {dark: '#c18401', light: '#e5c07b'}],
//   ['blue      ', {dark: '#0076a9', light: '#61afef'}],
//   ['magenta   ', {dark: '#a626a4', light: '#c678dd'}],
//   ['cyan      ', {dark: '#0997b3', light: '#56b6c2'}],
//   ['white     ', {dark: '#fafafa', light: '#dcdfe4'}],
//   ['foreground', {dark: '#383a42', light: '#dcdfe4'}],
//   ['background', {dark: '#fafafa', light: '#282c34'}],
//   ['tabAccent ', {dark: '#fafafa', light: '#282c34'}],
// ]);
