import React, { useEffect, useState } from 'react';
import axios from "../../config/axios"

// ==================== Componentes da pagina =========================
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import Table from 'src/views/cupons/tabela'
import { Button } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';

// ====================================================================
// ==================== Componentes Filhos ============================

// ====================================================================
// ========================= Estilo  ==================================
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  titulo: {
    fontSize: "200%",
    color:"#40338C",
    fontweight: "bold",
    paddingBottom: 50
    
    
  },
  icone: {
    height: 40,
    width: 40,
    color:"#40338C"   
  }
}));
// ====================================================================

const App = () =>{
const [cupons, setCupons] = useState(null)
const classes = useStyles();

//utilizado para navegação das paginas
const navigate = useNavigate();

  //Assim que a tela é iniciada carrega os dados. Caso não existe nada salvo antes cliente recebe o valor dos daddos mokados
  useEffect(() => {
    carregaCupons()
  }, []);

  async function carregaCupons(){
    const {data} = await axios.get('/cupom/cliente/43')
    setCupons(data)
    console.log('cupons', data)
  }



  return (
    <Page title="Meus Cupons">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card>
            <CardContent>
              {cupons && 
                <Table            
                    data={cupons}
                />
              }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default App