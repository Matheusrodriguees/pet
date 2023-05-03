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
  AccordionDetails
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Page from "src/components/Page";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Endereco from 'src/components/Endereco'
import mokData from 'src/views/clientes/mokData'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';

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
    textAlign: 'center'
  },
  icone: {
    marginRight: 5
  },
  button: {
    color: '#FFF',
    backgroundColor: '#000'
  }
}));
// ====================================================================



const App = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  let { id } = useParams();

  const [cliente, setCliente] = useState({
    id: 1,
    nome: 'Usuário teste',
    genero: 'Feminino',
    dataNascimento: '11/09/2000',
    cpf: '123.456.789-0',
    dddTelefone: '11',
    telefone: '1234-5678',
    email: 'usuario@teste.com',
    senha: 'teste123',
    endereco: {
      tpResidencia: '',
      tpLogradouro: '',
      logradouro: '',
      numero: '',
      nome: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
      pais: '',
      observacao: '',
    },
    status: 'Ativo',
  });
  const [endereco, setEndereco] = useState({
    tpResidencia: 'Casa',
    tpLogradouro: 'Rua',
    logradouro: 'Rua abc',
    numero: '123',
    nome: 'completemento teste',
    bairro: 'Parque teste',
    cep: '00000-000',
    cidade: 'Poá',
    estado: 'São Paulo',
    pais: 'Brasil',
    observacao: '',
  })

  //Toda vez que o endereço e seus itens são alterados atualiza o cliente
  useEffect(() => {
    setCliente({ ...cliente, endereco: endereco })
  }, [endereco]);

  return (
    <Page title="Clientes">
      <Container maxWidth={true}>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xs={12} xs={12}>
            <Card>
              <CardContent>
                <Typography className={classes.titulo}>
                  <PersonAddIcon className={classes.icone} />
                  Cadastro de cliente
                </Typography>
              </CardContent>
              <Divider />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Nome
                    </InputLabel>
                    <TextField
                      name="nome"
                      id="nome"
                      fullWidth={true}
                      value={cliente.nome}
                      onChange={(event) =>
                        setCliente({
                          ...cliente,
                          nome: event.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Gênero
                    </InputLabel>
                    <Select
                      labelId="genero"
                      id="genero"
                      value={cliente.genero}
                      onChange={(event) =>
                        setCliente({
                          ...cliente,
                          genero: event.target.value,
                        })
                      }
                      fullWidth={true}
                    >
                      <MenuItem value={'Feminino'}>
                        Feminino
                      </MenuItem>
                      <MenuItem value={'Masculino'}>
                        Masculino
                      </MenuItem>
                      <MenuItem value={'Outro'}>
                        Outro
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="data-nascimento">
                      Data de nascimento
                    </InputLabel>
                    <KeyboardDatePicker
                      clearable
                      value={new Date(cliente.dataNascimento)}
                      onChange={date =>
                        setCliente({
                          ...cliente,
                          dataNascimento: date,
                        })}
                      format="DD/MM/YYYY"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="demo-simple-select-helper-label">
                      CPF
                    </InputLabel>
                    <TextField
                      name="cpf"
                      id="cpf"
                      fullWidth={true}
                      value={cliente.cpf}
                      onChange={(event) =>
                        setCliente({
                          ...cliente,
                          cpf: event.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={1}>
                        <InputLabel id="demo-simple-select-helper-label">
                          DDD
                        </InputLabel>
                        <TextField
                          name="ddd"
                          id="ddd"
                          fullWidth={true}
                          value={cliente.dddTelefone}
                          onChange={(event) =>
                            setCliente({
                              ...cliente,
                              dddTelefone: event.target.value,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={1}></Grid>
                      <Grid item xs={10}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Telefone
                        </InputLabel>
                        <TextField
                          name="telefone"
                          id="telefone"
                          fullWidth={true}
                          value={cliente.telefone}
                          onChange={(event) =>
                            setCliente({
                              ...cliente,
                              telefone: event.target.value,
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="demo-simple-select-helper-label">
                      E-mail
                    </InputLabel>
                    <TextField
                      name="email"
                      id="email"
                      fullWidth={true}
                      value={cliente.email}
                      onChange={(event) =>
                        setCliente({
                          ...cliente,
                          email: event.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="data_alarme">
                      Senha
                    </InputLabel>
                    <TextField
                      name="senha"
                      id="senha"
                      type="password"
                      fullWidth={true}
                      value={cliente.senha}
                      onChange={(event) =>
                        setCliente({
                          ...cliente,
                          senha: event.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="data_alarme">
                      Confirme sua senha
                    </InputLabel>
                    <TextField
                      name="confirme-senha"
                      id="confirme-senha"
                      type="password"
                      fullWidth={true}
                      value={cliente.senha}
                      onChange={(event) =>
                        setCliente({
                          ...cliente,
                          senha: event.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item lg={12} sm={12} xl={12} xs={12}>
                    <Card>
                      <CardContent>
                        <Typography className={classes.titulo}>
                          <PersonPinCircleIcon className={classes.icone} />
                          Endereço de cobrança
                        </Typography>
                        <Divider className={classes.divider} />
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <InputLabel id="demo-simple-select-helper-label" className={classes.divider}>
                              Tipo de residência
                            </InputLabel>
                            <Select
                              labelId="tipo-residencia"
                              id="tipo-residencia"
                              value={endereco.tpResidencia}
                              onChange={(event) =>
                                setEndereco({
                                  ...endereco,
                                  tpResidencia: event.target.value,
                                })
                              }
                              fullWidth={true}
                            >
                              <MenuItem value={'Casa'}>
                                Casa
                              </MenuItem>
                              <MenuItem value={'Apartamento'}>
                                Apartamento
                              </MenuItem>
                              <MenuItem value={'Outro'}>
                                Outro
                              </MenuItem>
                            </Select>
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel id="demo-simple-select-helper-label" className={classes.divider}>
                              Tipo Logradouro
                            </InputLabel>
                            <Select
                              labelId="tipo-logradouro"
                              id="tipo-logradouro"
                              value={endereco.tpLogradouro}
                              onChange={(event) =>
                                setEndereco({
                                  ...endereco,
                                  tpLogradouro: event.target.value,
                                })
                              }
                              fullWidth={true}
                            >
                              <MenuItem value={'Rua'}>
                                Rua
                              </MenuItem>
                              <MenuItem value={'Avenida'}>
                                Avenida
                              </MenuItem>
                              <MenuItem value={'Alameda'}>
                                Alameda
                              </MenuItem>
                              <MenuItem value={'Estrada'}>
                                Estrada
                              </MenuItem>
                            </Select>
                          </Grid>
                          <Grid item xs={10}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Logradouro
                            </InputLabel>
                            <TextField
                              name="logradouro"
                              id="logradouro"
                              fullWidth={true}
                              value={endereco.logradouro}
                              onChange={(event) =>
                                setEndereco({
                                  ...endereco,
                                  logradouro: event.target.value,
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
                              fullWidth={true}
                              value={endereco.numero}
                              onChange={(event) =>
                                setEndereco({
                                  ...endereco,
                                  numero: event.target.value,
                                })
                              }
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel id="demo-simple-select-helper-label">
                              nome
                            </InputLabel>
                            <TextField
                              name="nome"
                              id="nome"
                              fullWidth={true}
                              value={endereco.nome}
                              onChange={(event) =>
                                setEndereco({
                                  ...endereco,
                                  nome: event.target.value,
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
                              fullWidth={true}
                              value={endereco.bairro}
                              onChange={(event) =>
                                setEndereco({
                                  ...endereco,
                                  endereco: event.target.value,
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
                              fullWidth={true}
                              value={endereco.cep}
                              onChange={(event) =>
                                setEndereco({
                                  ...endereco,
                                  cep: event.target.value,
                                })
                              }
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Estado
                            </InputLabel>
                            <Select
                              labelId="estado"
                              id="estado"
                              value={endereco.estado}
                              onChange={(event) =>
                                setCliente({
                                  ...endereco,
                                  estado: event.target.value,
                                })
                              }
                              fullWidth={true}
                            >
                              <MenuItem value={'Minas Gerais'}>
                                Minas Gerais
                              </MenuItem>
                              <MenuItem value={'Rio de Janeiro'}>
                                Rio de Janeiro
                              </MenuItem>
                              <MenuItem value={'São Paulo'}>
                                São Paulo
                              </MenuItem>
                            </Select>
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Cidade
                            </InputLabel>
                            <Select
                              labelId="cidade"
                              id="cidade"
                              value={endereco.cidade}
                              onChange={(event) =>
                                setEndereco({
                                  ...endereco,
                                  cidade: event.target.value,
                                })
                              }
                              fullWidth={true}
                            >
                              <MenuItem value={'Mogi das Cruzes'}>
                                Mogi das Cruzes
                              </MenuItem>
                              <MenuItem value={'Suzano'}>
                                Suzano
                              </MenuItem>
                              <MenuItem value={'Poá'}>
                                Poá
                              </MenuItem>
                            </Select>
                          </Grid>
                          <Grid item xs={6}>
                            <InputLabel id="demo-simple-select-helper-label">
                              País
                            </InputLabel>
                            <Select
                              labelId="pais"
                              id="pais"
                              value={endereco.pais}
                              onChange={(event) =>
                                setEndereco({
                                  ...endereco,
                                  pais: event.target.value,
                                })
                              }
                              fullWidth={true}
                            >
                              <MenuItem value={'Brasil'}>
                                Brasil
                              </MenuItem>
                            </Select>
                          </Grid>
                          <Grid item xs={12}>
                            <InputLabel id="demo-simple-select-helper-label">
                              Observação
                            </InputLabel>
                            <TextField
                              name="observacao"
                              id="observacao"
                              fullWidth={true}
                              value={endereco.observacao}
                              onChange={(event) =>
                                setEndereco({
                                  ...endereco,
                                  observacao: event.target.value,
                                })
                              }
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
              <CardContent>
                <Grid container>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={1}>
                    <Button
                      className={classes.button}
                      onClick={() => {
                        navigate('/app/clientes')
                      }}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item xs={8} />
                  <Grid item xs={2}>
                    <Button
                      className={classes.button}
                      onClick={() => {
                        navigate('/app/clientes')
                      }}
                    >
                      Salvar
                    </Button>
                  </Grid>
                </Grid>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};



export default App;
