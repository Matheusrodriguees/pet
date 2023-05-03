import React, { useEffect } from 'react';
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider, useDispatch,useSelector } from 'react-redux';
import reducer from './store/reducers'
import * as mapaActions from './store/actions';
// ==================== Componentes da pagina =========================
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent
} from '@material-ui/core';
import Page from 'src/components/Page';
// ====================================================================
// ==================== Componentes Filhos ============================
import Conteudo from './Conteudo'
import Filters from './Filters'
import Pdf from './Pdf'

// ====================================================================
// ========================= Estilo  ==================================
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
// ====================================================================




const AppWrapper = () => {
  const store = createStore(reducer,applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(null);
  const mapa = useSelector(( store ) => store.mapaReducer.mapa);
  



  const carregarMapa = async (ano,mes) => {
      console.log("vai carregar",ano,mes)
    //  setIsLoading(true);
      try {
        //await dispatch(mapaActions.carregarMapa(ano,mes));
      } catch (err) {
        console.log(err)
        //alert('Erro ao carregar Mapa. Tente novamente mais tarde.', 'error')
      } finally {
        //  setIsLoading(false);
      }
  }



 


  return (
    <Page className={classes.root} title="Dashboard"  >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Filters 
                    carregarMapa={carregarMapa}
                    mapa={mapa}


                    selectedDate = {selectedDate}
                    setSelectedDate = {setSelectedDate}
                  />
                  {
                    mapa.length > 0 || typeof mapa.categories !== 'undefined' &&  <Pdf mapa={mapa}/>
                  }
                 
                </Grid>
                <Conteudo 
                  mapa={mapa}

                  selectedDate = {selectedDate}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default AppWrapper