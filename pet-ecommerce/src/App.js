
import 'react-perfect-scrollbar/dist/css/styles.css';


import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import 'src/styles/tailwind.css'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/pt-br'
const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>

      <GlobalStyles />
      {routing}
    </MuiPickersUtilsProvider>
      
      
    </ThemeProvider>
    
  );
};

export default App;
