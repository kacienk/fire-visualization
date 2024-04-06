import { ReactNode, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider, ThemeOptions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import { Palette } from './palette';
import { Typography } from './typography';
import { componentsOverrides } from './overrides';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

type ThemeCustomizationProps = {
  children: ReactNode;
};

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const theme = Palette('light');
  const themeTypography = Typography(`'Public Sans', sans-serif`);

  const themeOptions = useMemo(
    () =>
      ({
        breakpoints: {
          values: {
            xs: 0,
            sm: 768,
            md: 1024,
            lg: 1266,
            xl: 1536,
          },
        },
        direction: 'ltr',
        mixins: {
          toolbar: {
            minHeight: 60,
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
        palette: theme.palette,
        typography: themeTypography,
      }) satisfies ThemeOptions,
    [theme, themeTypography],
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverrides(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
