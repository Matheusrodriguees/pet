import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
// ==================== Componentes da pagina =========================
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  TextField,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Divider,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Page from "src/components/Page";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import { FormControlLabel } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import axiosDefault from "src/config/axios";
import { PedidoContext } from "src/providers/PedidoProvider"

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
    fontWeight: "bold",
    textAlign: 'center'
  },
  icone: {
    marginRight: 5
  },
  divider: {
    marginTop: 10
  }
}));
// ====================================================================

const Cartao = ({
  data,
  setData, 
  index,
  setCartaoPrincipal,
  cartaoPrincipal,
  cliente, 
  salvar, 
  setOpen
}) => {
  const classes = useStyles();
  const [cartao, setCartao] = useState({
    numero: '', 
    nome: '',
    bandeira : '',
    cvv: '',
    principal: false,
    status: true,
    cliente_id: 43,
  })
  const [bandeiras, setBandeiras] = useState([])
  const pedidoContext = useContext(PedidoContext)
  async function salvarCartao(){
    const result = await axiosDefault.post('/cartao', { cartao: cartao });
    console.log('cadastrou', result.data) 
    if(salvar){
      pedidoContext.adicionarCartao(cartao)
    }else{
      setData(result.data)
    }
    
  }


  async function listarBandeiras(){
    const result = await axiosDefault.get('/cartao/bandeira');
    console.log('bandeiras', result)
    setBandeiras(result.data)
  }


  useEffect(() => {
    listarBandeiras()
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Card>
          <CardContent>
            <Typography className={classes.titulo}>
              <PaymentIcon className={classes.icone} />
              Cartão 
            </Typography>
            <Divider className={classes.divider} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label" className={classes.divider}>
                  Número do cartão
                </InputLabel>
                <TextField
                  name="numero"
                  id="numero"
                  required={true}
                  fullWidth={true}
                  value={cartao.numero}
                  onChange={(event) =>
                    setCartao({
                      ...cartao,
                      numero: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label" className={classes.divider}>
                  Nome impresso no cartão
                </InputLabel>
                <TextField
                  name="nome"
                  id="nome"
                  required={true}
                  fullWidth={true}
                  value={cartao.nome}
                  onChange={(event) =>
                    setCartao({
                      ...cartao,
                      nome: event.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label" className={classes.divider}>
                  Bandeira
                </InputLabel>
                <Select
                  labelId="bandeira"
                  id="bandeira"
                  required={true}
                  value={cartao.bandeira}
                  onChange={(event) =>
                    setCartao({
                      ...cartao,
                      bandeira: event.target.value,
                    })
                  }
                  fullWidth={true}
                >
                  {bandeiras?.map((item, index) => (
                    <MenuItem value={item.id}>{item.nome}</MenuItem>
                  ))}
                </Select>
              </Grid>
              
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label" className={classes.divider}>
                  Código de segurança
                </InputLabel>
                <TextField
                  name="cod-seguranca"
                  id="cod-seguranca"
                  required={true}
                  fullWidth={true}
                  value={cartao.cvv}
                  onChange={(event) =>
                    setCartao({
                      ...cartao,
                      cvv: event.target.value,
                    })
                  }
                />
              </Grid>
            {salvar &&
              <Grid item xs={12}>
                 <Button 
                  fullWidth
                    onClick={()=>{
                        salvarCartao()
                        setOpen(false)
                    }}>
                        Salvar
                  </Button>
              </Grid>
            }
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Cartao