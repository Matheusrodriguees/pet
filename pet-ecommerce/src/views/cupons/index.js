import React, { useEffect, useState } from 'react';
import axios from "../../config/axios"

// ==================== Componentes da pagina =========================
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  Box,
  MenuItem,
  TextField
} from '@material-ui/core';
import Page from 'src/components/Page';
import Table from 'src/views/cupons/Tabela'
import { Button } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { v4 as uuidv4 } from 'uuid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

// ====================================================================
// ==================== Componentes Filhos ============================

// ====================================================================
// ========================= Estilo  ==================================
const useStyles = makeStyles((theme) => ({
  cupomCode: {
    backgroundColor: theme.palette.background.dark,
    minWidth: '500px',
    padding: '20px',
    textAlign: 'center',
  },
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  titulo: {
    fontSize: "200%",
    color: "#40338C",
    fontweight: "bold",
    paddingBottom: 50
  },
  icone: {
    height: 40,
    width: 40,
    color: "#40338C"
  }
}));
// ====================================================================

const App = () => {
  const classes = useStyles();
  const [cupons, setCupons] = useState(null)
  const [open, setOpen] = useState(false);


  const [newCupom, setNewCupom] = useState({
    codigo: null,
    valor: null,
    tipo: null,
  });

  //Assim que a tela é iniciada carrega os dados. Caso não existe nada salvo antes cliente recebe o valor dos daddos mokados
  useEffect(() => {
    carregaCupons()
  }, []);

  async function carregaCupons() {
    const { data } = await axios.get('/cupom')
    let convertedValues = data.map((cupom) => {
      if(cupom.valor){
        return {...cupom,valor: cupom.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
      }else{
        return {...cupom,valor: parseInt(0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
      }
    })

    setCupons(convertedValues)
  }

  const handleOpen = () => {
    const newCode = uuidv4().toUpperCase()
    setNewCupom({ ...newCupom, codigo: newCode })
    setOpen(true);
  };
  const handleClose = () => {
    setNewCupom({ ...newCupom, codigo: null, valor: null, tipo: null })
    setOpen(false);
  };
  const handleRegistration = () => {
    const cupomToSaev = {...newCupom, valor: formatDouble(newCupom.valor)}

    axios.post('/cupom', { cupom: cupomToSaev }).then((response) => {
      const newList = [...cupons, {...newCupom, valor: 'R$ '+ newCupom.valor }]
      setCupons(newList)
    }).catch((error) => {
      console.log('algum problema')
    }).finally(() => {
      setNewCupom({ ...newCupom, codigo: null, valor: null, tipo: null })
      setOpen(false);
    })
  };

  const formatReal = ( i ) =>{
    var v = i.replace(/\D/g,'');
    v = (v/100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    return v;
  }
  const formatDouble = ( i ) =>{
    i = i.replace(".", "");
    i = i.replace(",", ".");
    return i;
  }


  return (
    <Page title="Endereços">
      <Container maxWidth={false}>
        <Dialog open={open} onClose={() => handleClose()} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Novo Cupom</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DialogContentText>
                  Registrar Novo Cupom?
                </DialogContentText>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.cupomCode}>
                  {newCupom.codigo}
                </Box>
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  id="outlined-adornment-amount"
                  label="Valor"
                  value={newCupom.valor}
                  onChange={(event) => { setNewCupom({ ...newCupom, valor: formatReal(event.target.value) }) }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={newCupom.tipo}
                  onChange={(event) => { setNewCupom({ ...newCupom, tipo: event.target.value }) }}
                  fullWidth
                  variant="outlined"
                >
                  {['Promocional', 'Troca'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => handleRegistration()} color="primary">
              Registrar
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card>
              <CardContent>
                <Button
                  startIcon={<PersonAddIcon />}
                  onClick={() => handleOpen()}
                >
                  Novo Cupom
                </Button>
              </CardContent>
              <CardContent>
                {/* Só mostra a tabela quando existe clientes  */}
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