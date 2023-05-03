import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    colors: {
      red: '#3f51b5',
      grey: '#6B7A8F',
      lightGray: '#F6F7F8',
      yellow: '#F7C331',
      orange: '#F7882F'

    },
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#F7C331',
    },
    secondary: {
      main: '#F7882F'
    },
    text: {
      primary: '#000000',
      secondary: '#6B7A8F',
    }
  },
  shadows,
  typography,
  overrides: {
    MuiListItem: {
      root: {
        justifyContent: "center"
      }
    }
  }
});

export default theme;
