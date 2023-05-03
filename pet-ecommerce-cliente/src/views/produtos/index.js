import React, { useEffect, useState, useContext } from 'react';
import axios from "../../config/axios"
import { GrFilter } from "react-icons/gr";
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
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { SvgIcon } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FilterAltOutlinedIcon from '@material-ui/icons/Filter1Outlined';
import {PedidoContext} from "src/providers/PedidoProvider"
import data from "../product/ProductListView/data";
import {StringUtil} from "../../utils/StringUtil";
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
    color: "#40338C"
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  descricao:{
    wordBreak: 'break-word'
  },
  card: {
    width: 350
  }
}));
// ====================================================================

const App = () => {
  const classes = useStyles();
  const [openFiltro, setOpenFiltro] = useState(false)
  const [produtos, setProdutos] = useState(null)
  const [textoFiltro,setTextoFiltro] = useState('')
  const [produtosFiltrados, setProdutosFiltrados] = useState(null)
  const pedidoContext = useContext(PedidoContext)
  //utilizado para navegação das paginas
  const navigate = useNavigate();

  const data = textoFiltro ? produtosFiltrados : produtos;
  const handleFiltro = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenFiltro({ ...openFiltro, [anchor]: open });
  };

  const onFilter = (filterText, currentRow, columns) => {
    if(!filterText) filterText = ''
    const produtosFiltrados = data.filter( item => {
      return StringUtil.softCompareString(item.nome, filterText) ||
          StringUtil.softCompareString(item.descricao, filterText) ||
          StringUtil.softCompareString(item.categoria.nome, filterText)
    })
    setProdutosFiltrados(produtosFiltrados)
  }
  
  // Assim que a tela é iniciada carrega os dados. Caso não existe nada salvo antes cliente recebe o valor dos daddos mokados
  useEffect(() => {
    carregaProdutos()
  }, []);

  useEffect(() => {
    console.log('Carrinho', pedidoContext)
  }, [pedidoContext.carrinho]);

  async function carregaProdutos(){
    const {data} = await axios.get('/produto')
    setProdutos(data)
    console.log('produtos', data)
  }


  const list = (anchor) => (
    <div
      // className={clsx(classes.list, {
      //   [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      // })}
      role="presentation"
      onClick={handleFiltro(anchor, false)}
      onKeyDown={handleFiltro(anchor, false)}
    >
      <List>
        {['Filtro 1', 'Filtro 2', 'Filtro 3', 'Filtro 4'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><GrFilter /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Filtro 5', 'Filtro 6', 'Filtro 7'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><GrFilter /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <Page title="Produtos">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card>
              <CardContent>
                <Box >
                  <TextField
                      fullWidth
                      value={textoFiltro}
                      onChange={ (event) => {
                        onFilter(event.target.value)
                        setTextoFiltro(event.target.value)
                      }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Procurar produtos"
                    variant="outlined"
                  />
                  <React.Fragment key={'left'}>
                    <Button onClick={handleFiltro('left', true)}>Filtrar Busca</Button>
                    <SwipeableDrawer
                      anchor={'left'}
                      open={openFiltro['left']}
                      onClose={handleFiltro('left', false)}
                      onOpen={handleFiltro('left', true)}
                    >
                      {list('left')}
                    </SwipeableDrawer>
                  </React.Fragment>
                </Box>
              </CardContent>
              <CardContent>
                <Grid container spacing={3}>
                  {data?.map((item) => (
                     <Grid item={3}>
                    <Card className={classes.card}>
                      <CardActionArea onClick={() => navigate(`/app/detalhe-produto/${item.id}`)}>
                        <CardMedia
                          className={classes.media}
                          image={`/static/images/produtos/${item.id}.jpg`}
                          title={item.nome}
                        />
                        <CardContent className={classes.card}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {item.nome}
                          </Typography>
                          <Typography gutterBottom variant="h6" component="h4">
                            R$ {item.valor}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => navigate(`/app/detalhe-produto/${item.id}`)}>
                          Mais informações
                        </Button>
                        <Button size="small" color="primary" onClick={() => {
                          pedidoContext.adicionar(item)
                           navigate('/app/carrinho')
                          }}>
                          Adicionar ao carrinho
                        </Button>
                      </CardActions>
                    </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div>
        </div>
      </Container>
    </Page>
  )
}

export default App