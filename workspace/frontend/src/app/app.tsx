import { PaletteColor, ThemeOptions, ThemeProvider, createTheme } from '@mui/material'
import themeOptions from '../../mui.theme.json'
import { RouterProvider } from 'react-router-dom'
import router from '../router';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom: PaletteOptions['primary'];
    dark: PaletteOptions['primary'];
    light: PaletteOptions['primary'];
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    custom: PaletteColor;
    dark: PaletteColor;
    light: PaletteColor;
  }
}

interface ColorOverrides {
  custom: true;
  light: true;
  dark: true;
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends ColorOverrides {}
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides extends ColorOverrides {}
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides extends ColorOverrides {}
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides extends ColorOverrides {}
}

declare module '@mui/material/Paper' {
  interface PaperPropsColorOverrides extends ColorOverrides {}
}

export function App() {
  const theme = createTheme(themeOptions as ThemeOptions)

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
