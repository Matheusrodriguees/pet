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

const Endereco = ({ setData, data, index, cliente }) => {
  const classes = useStyles();
  const [cidades, setCidades] = useState(Cidades);
  const [estados, setEstados] = useState(Estados);
  const [endereco, setEndereco] = useState({
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
    pais: "",
    observacao: "",
    cobranca: false,
    entrega: false,
    status: true,
  });

  // useEffect(() => {
  //   if (endereco.estado) {
  //     const estadoSelecionado = Estados.find(
  //       (item) => item.nome == data.enderecos[index].estado
  //     );
  //     const cidadesFilter = Cidades.filter(
  //       (item) => item.estado == estadoSelecionado.id
  //     );
  //     setCidades(cidadesFilter);
  //   }
  // }, [data.enderecos[index].estado]);

  const filtredCidades = () => {
    if (data.enderecos[index].estado) {
      const estadoSelecionado = Estados.find(
        (item) => item.nome == data.enderecos[index].estado
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
                  value={data.enderecos[index].nome}
                  onChange={(event) =>
                    setData({
                      ...data,
                      ...(data.enderecos[index].nome = event.target.value),
                    })
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
                  value={data.enderecos[index].tpResidencia}
                  onChange={(event) =>
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].tpResidencia =
                        event.target.value),
                    })
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
                  value={data.enderecos[index].tpLogradouro}
                  onChange={(event) =>
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].tpLogradouro =
                        event.target.value),
                    })
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
                  value={data.enderecos[index].logradouro}
                  onChange={(event) =>
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].logradouro =
                        event.target.value),
                    })
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
                  value={data.enderecos[index].numero}
                  onChange={(event) =>
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].numero = event.target.value),
                    })
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
                  value={data.enderecos[index].bairro}
                  onChange={(event) =>
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].bairro = event.target.value),
                    })
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
                  value={data.enderecos[index].cep}
                  onChange={(event) =>
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].cep = event.target.value),
                    })
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
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].pais = event.target.value),
                    })
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
                  value={data.enderecos[index].estado}
                  onChange={(event) => {
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].estado = event.target.value),
                    });
                  }}
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
                  value={data.enderecos[index].cidade}
                  onChange={(event) =>
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].cidade = event.target.value),
                    })
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
                  value={data.enderecos[index].observacao}
                  onChange={(event) =>
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].observacao =
                        event.target.value),
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Endereço de cobrança"
                  value={data.enderecos[index].cobranca}
                  checked={data.enderecos[index].cobranca}
                  onClick={(event) => {
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].cobranca =
                        event.target.checked),
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Endereço de entrega"
                  value={data.enderecos[index].entrega}
                  checked={data.enderecos[index].entrega}
                  onClick={(event) => {
                    setEndereco({
                      ...data,
                      ...(data.enderecos[index].entrega = event.target.checked),
                    });
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Endereco;
