import React, { useEffect, useState } from "react";
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
  AccordionDetails,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Page from "src/components/Page";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel } from "@material-ui/core";
import Cidades from "src/constants/Cidades";
import Estados from "src/constants/Estados";
import TiposLogradouro from "src/constants/TiposLogradouro";
import axiosDefault from "src/config/axios";
import { SettingsPowerRounded } from "@material-ui/icons";
// ====================================================================
// ==================== Componentes Filhos ============================

// ====================================================================
// ========================= Estilo  ==================================
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  titulo: {
    fontWeight: "bold",
    textAlign: "center",
  },
  icone: {
    marginRight: 5,
  },
  divider: {
    marginTop: 10,
  },
}));

// ====================================================================

const Endereco = ({setEnd, setOpen}) => {
  const classes = useStyles();
  const [cidades, setCidades] = useState(Cidades);
  const [estados, setEstados] = useState(Estados);
  const [data, setData] = useState({
    id: "",
    tpResidencia: "",
    tpLogradouro: "",
    logradouro: "",
    numero: "",
    nome: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
    pais: "Brasil",
    observacao: "",
    cobranca: false,
    entrega: false,
    status: true,
    cliente_id: 43
  });

  async function salvarEndereco(){
    const result = await axiosDefault.post('/endereco', { endereco: data });
    console.log('cadastrou', result.data)
    setEnd(result.data)
  }

  const filtredCidades = () => {
    if (data?.estado) {
      const estadoSelecionado = Estados.find(
        (item) => item.nome == data?.estado
      );
      const cidadesFilter = Cidades.filter(
        (item) => item.estado == estadoSelecionado.id
      );
      return cidadesFilter;
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Card>
          <CardContent>
            <Typography className={classes.titulo}>
              <PersonPinCircleIcon className={classes.icone} />
              Endereço
            </Typography>
            <Divider className={classes.divider} />
            <Grid container spacing={1}>
              <Grid item xs={12} className={classes.divider}>
                <InputLabel id="demo-simple-select-helper-label">
                  Nome
                </InputLabel>
                <TextField
                  name="nome"
                  id="nome"
                  fullWidth={true}
                  value={data?.nome}
                  onChange={(event) =>
                    setData({...data,nome:event.target.value})
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">
                  Tipo de residência
                </InputLabel>
                <Select
                  labelId="tipo-residencia"
                  id="tipo-residencia"
                  required={true}
                  value={data?.tpResidencia}
                  onChange={(event) =>
                    setData({...data, tpResidencia:event.target.value})
                  }
                  fullWidth={true}
                >
                  <MenuItem value={"Casa"}>Casa</MenuItem>
                  <MenuItem value={"Apartamento"}>Apartamento</MenuItem>
                  <MenuItem value={"Outro"}>Outro</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">
                  Tipo Logradouro
                </InputLabel>
                <Select
                  labelId="tipo-logradouro"
                  id="tipo-logradouro"
                  required={true}
                  value={data?.tpLogradouro}
                  onChange={(event) =>
                    setData({...data, tpLogradouro:event.target.value})
                  }
                  fullWidth={true}
                >
                  <MenuItem value={null}>Selecione</MenuItem>
                  {TiposLogradouro.map((item, index) => (
                    <MenuItem value={item.nome}>{item.nome}</MenuItem>
                  ))}
                  <MenuItem value={"Avenida"}>Avenida</MenuItem>
                  <MenuItem value={"Alameda"}>Alameda</MenuItem>
                  <MenuItem value={"Estrada"}>Estrada</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={10}>
                <InputLabel id="demo-simple-select-helper-label">
                  Logradouro
                </InputLabel>
                <TextField
                  name="logradouro"
                  id="logradouro"
                  required={true}
                  fullWidth={true}
                  value={data?.logradouro}
                  onChange={(event) =>
                    setData({...data, logradouro:event.target.value})
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <InputLabel id="demo-simple-select-helper-label">
                  Número
                </InputLabel>
                <TextField
                  name="numero"
                  id="numero"
                  required={true}
                  fullWidth={true}
                  value={data?.numero}
                  onChange={(event) =>
                    setData({...data, numero:event.target.value})
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">
                  Bairro
                </InputLabel>
                <TextField
                  name="nome"
                  id="nome"
                  required={true}
                  fullWidth={true}
                  value={data?.bairro}
                  onChange={(event) =>
                    setData({...data, bairro:event.target.value})
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">
                  CEP
                </InputLabel>
                <TextField
                  name="nome"
                  id="nome"
                  required={true}
                  fullWidth={true}
                  value={data?.cep}
                  onChange={(event) =>
                    setData({...data, cep:event.target.value})
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">
                  País
                </InputLabel>
                <Select
                  labelId="pais"
                  id="pais"
                  required={true}
                  value={"Brasil"}
                  onChange={(event) =>
                    setData({...data, pais:event.target.value})
                  }
                  fullWidth={true}
                >
                  <MenuItem value={"Brasil"}>Brasil</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">
                  Estado
                </InputLabel>
                <Select
                  labelId="estado"
                  id="estado"
                  required={true}
                  value={data?.estado}
                  onChange={(event) =>
                    setData({...data, estado:event.target.value})
                  }
                  fullWidth={true}
                >
                  <MenuItem value={null}>Selecione</MenuItem>
                  {estados?.map((item, index) => (
                    <MenuItem value={item.nome}>{item.nome}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">
                  Cidade
                </InputLabel>
                <Select
                  labelId="cidade"
                  id="cidade"
                  required={true}
                  value={data?.cidade}
                  onChange={(event) =>
                    setData({...data, cidade:event.target.value})
                  }
                  fullWidth={true}
                >
                  <MenuItem value={null}>Selecione</MenuItem>
                  {filtredCidades()?.map((item, index) => (
                    <MenuItem value={item.nome}>{item.nome}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="demo-simple-select-helper-label">
                  Observação
                </InputLabel>
                <TextField
                  name="observacao"
                  id="observacao"
                  required={true}
                  fullWidth={true}
                  value={data?.observacao}
                  onChange={(event) =>
                    setData({...data, observacao:event.target.value})
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Endereço de cobrança"
                  value={data?.cobranca}
                  checked={data?.cobranca}
                  onClick={(event) => {
                    setData({...data, cobranca:event.target.checked})
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Endereço de entrega"
                  value={data?.entrega}
                  checked={data?.entrega}
                  onClick={(event) => {
                    setData({...data, entrega:event.target.checked})
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                  <Button 
                  fullWidth
                    onClick={()=>{
                        salvarEndereco()
                        setOpen(false)
                    }}>
                        Salvar
                    </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Endereco;
