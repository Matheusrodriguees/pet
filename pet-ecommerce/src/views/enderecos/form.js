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

    const [mensagemErro, setMensagemErro] = useState("")
    const [alerta, setAlerta] = useState(false)
    const [endereco, setEndereco] = useState({
        id: '',
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
        cobranca: false,
        entrega: false,
        status: true,
    })

    
    async function validaEndereco(){
            //Se algum campo obrigatório não for preenchido retorna false
            if(!endereco.tpResidencia || !endereco.tpLogradouro || !endereco.logradouro || !endereco.numero ||
                !endereco.nome || !endereco.bairro || !endereco.cep || !endereco.cidade || !endereco.estado || !endereco.pais){
                    setMensagemErro('Verifique os campos obrigatórios do endereço')
                    return false
            }

        return true
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <Page title="Endereço">
            <Container maxWidth={true}>
                <Grid container spacing={3}>
                    <Grid item lg={12} sm={12} xs={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Endereco
                                    data={endereco}
                                    setData={setEndereco}
                                />
                            </CardContent>
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
                                                    axios.post('/endereco', {endereco})
                                                    // navigate('/app/enderecos')
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
