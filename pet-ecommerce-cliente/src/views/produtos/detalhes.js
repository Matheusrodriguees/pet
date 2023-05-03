import React, { useEffect, useState, useContext } from 'react';
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
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Page from 'src/components/Page';
import { Button } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { NavLink as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import PetsIcon from '@material-ui/icons/Pets';
import {PedidoContext} from "src/providers/PedidoProvider"

// ====================================================================
// ==================== Componentes Filhos ============================

// ====================================================================
// ========================= Estilo  ==================================
const useStyles = makeStyles((theme) => ({
  root: {
        maxWidth: 345,
    },
  media: {
        height: 140,
      },
  icone: {
    height: 40,
    width: 40,
    color:"#40338C"   
  },
  imagem: {
    height: 220,
    width: 180, 
    justifyContent: 'center' 
  }
}));
// ====================================================================

const App = () => {
const [enderecos, setEnderecos] = useState(null)
const classes = useStyles();
const {id} = useParams();
const [produto, setProduto] = useState(null)
const pedidoContext = useContext(PedidoContext)

//utilizado para navegação das paginas
const navigate = useNavigate();

useEffect(() => {
  carregaProdutos()
}, []);

async function carregaProdutos(){
  const {data} = await axios.get('/produto')
  const prod = data.find(item => item.id == id)
  setProduto(prod)
  console.log('produtos', prod)
}


  return (
    <Page title="Produtos">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card>
              {produto &&
              <CardContent>
                <Grid container spacing={3}>
                    <Grid item={5}>
                      <Card className={classes.imagem}>
                        <img src={`/static/images/produtos/${produto.id}.jpg`}/>
                      </Card>
                    </Grid>
                    
                    <Grid item={6}>
                    <Typography variant="h5" component="h2">
                      {produto.nome}
                    </Typography>
                      <Rating
                        name="customized-empty"
                        defaultValue={4}
                        precision={0.5}
                      />
                      <Typography variant="body2" color="textSecondary" component="p">
                          {produto.descricao}
                      </Typography>
                      <Typography vvariant="h5" component="h2" q >
                          Valor: R$ {produto.valor}
                      </Typography>
                    </Grid>
                </Grid>
              </CardContent>
              }
              <CardContent>
                <Button onClick={() => {
                  pedidoContext.adicionar(produto)
                   navigate('/app/carrinho')
                }}>Adicionar ao Carrinho</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default App