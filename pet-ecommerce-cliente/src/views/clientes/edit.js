import React, { useEffect, useState } from "react";
import axios from "../../config/axios"
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
import clientes from "src/views/clientes/mokData";
import RemoveIcon from '@material-ui/icons/Remove';
import Cartao from 'src/components/Cartao'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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
        color: '#FFFc',
        backgroundColor: '#000'
    },
    buttonEndAdd: {
        color: '#F7C331',
        backgroundColor: '#FFF',
        "&:hover": {
            backgroundColor: "#FFF",
        },
    },
    buttonEndRemove: {
        color: '#F7882F',
        backgroundColor: '#FFF',
        "&:hover": {
            backgroundColor: "#FFF",
        },

    }
}));
// ====================================================================



const App = (props) => {
    const navigate = useNavigate();
    const classes = useStyles();
    let { id } = useParams();

    //State de confirmação de senha para validação
    const [confirmaSenha, setConfirmaSenha] = useState('')
    const [cartaoPrincipal, setCartaoPrincipal] = useState(null)
    const [mensagemErro, setMensagemErro] = useState("")
    const [alerta, setAlerta] = useState(false)
 
    //State de cliente - valores iniciais 
    const [cliente, setCliente] = useState();

    async function getCliente(){
        const data = axios.get(`/id= ${id}`)
        console.log('data', data)
    }

    async function validaCliente(){
        if(!cliente.nome || !cliente.genero || !cliente.dataNascimento || !cliente.cpf || !cliente.dddTelefone ||
            !cliente.telefone || !cliente.email || !cliente.senha ){
                setMensagemErro('Verifique os campos obrigatórios de cadastro')
                return false
        }

        if(cliente.senha != confirmaSenha){
            setMensagemErro('As senhas digitadas não coincidem')
            return false
        }

        //Expressão que verifica se existe letras maiusculas, minusculas, caracteres especial e 8 digitos no minimo 
        let regex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        //Verifica se a senha bate com a expressao
        if (!regex.test(cliente.senha)) {
            setMensagemErro('Senha deve conter pelo menos 8 caracteres, ter letra minúsculas, maiúsculas e caracter especial')
            return false;
        }

        return true
    }

   
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <Page title="Clientes">
            <Container maxWidth={true}>
                <Grid container spacing={3}>
                    <Grid item lg={12} sm={12} xs={12}>
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
                                            required={true}
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
                                            required={true}
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
                                            value={cliente.dataNascimento}
                                            required
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
                                            required={true}
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
                                                    required={true}
                                                    fullWidth={true}
                                                    value={cliente.dddTelefone}
                                                    onChange={(event) =>
                                                        setCliente({
                                                            ...cliente,
                                                            dddTelefone: event.target.value,
                                                        })
                                                    }
                                                    inputProps={{ maxLength: 2 }}
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
                                                    required={true}
                                                    fullWidth={true}
                                                    value={cliente.telefone}
                                                    onChange={(event) =>
                                                        setCliente({
                                                            ...cliente,
                                                            telefone: event.target.value,
                                                        })
                                                    }
                                                    inputProps={{ maxLength: 9 }}
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
                                            required={true}
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
                                            required={true}
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
                                            required={true}
                                            fullWidth={true}
                                            value={confirmaSenha}
                                            onChange={(event) =>
                                                setConfirmaSenha(event.target.value)
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={8} />
                                    <Grid item xs={2}>
                                        <Button
                                            className={classes.button}
                                            onClick={() => {
                                                if(true){
                                                    // mokData.push(cliente)
                                                    axios.post('/cliente', {cliente})
                                                    navigate('/app/clientes')
                                                }else{
                                                    setAlerta(true)
                                                }

                                                
                                            }}
                                        >
                                            Salvar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Snackbar
                                open={alerta}
                                autoHideDuration={6000}
                                onClose={() => {
                                setAlerta(false);
                                }}
                                ClickAwayListenerProps={{ mouseEvent: false }}
                            >
                                <Alert
                                onClose={() => {
                                    setAlerta(false);
                                }}
                                severity="warning"
                                >
                                    {mensagemErro}
                                </Alert>
                            </Snackbar>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};



export default App;
