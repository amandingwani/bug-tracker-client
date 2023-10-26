import {} from '@mui/material/styles';
import { CustomShadows } from './custom-shadows';

declare module '@mui/material/styles/createPalette.d.ts' {
  interface TypeBackground {
    neutral: string;
  }
}

declare module '@mui/material/styles/createTheme.d.ts' {
  interface Theme {
    customShadows: CustomShadows;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: CustomShadows;
  }
}
