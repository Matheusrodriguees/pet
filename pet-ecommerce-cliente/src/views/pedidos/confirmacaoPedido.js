import React, { useEffect, useState, useContext} from 'react';
import axios from "../../config/axios"

// ==================== Componentes da pagina =========================
import {
    Container,
    Grid,
    makeStyles,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem
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
import ItemCarrinho from 'src/components/ItemCarrinho'
import { Divider } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Lottie from "react-lottie";
import PedidoFinalizado from "src/animacoes/pedidoFinalizado.json";
import { PedidoContext } from "src/providers/PedidoProvider"

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
    title:{
        textAlign: 'Center',
        color: '#42f5ad',
        fontWeight:'bold',
        fontSize: '22px',
    },
    text:{
        textAlign: 'Center',
        fontSize: '16',
    },
    button: {
        fontWeight:'bold',
        fontSize: '16',
        color: '#000',
        backgroundColor: '#F7C331',
        "&:hover": {
            backgroundColor: "#F7C331",
        },
    },
}));
// ====================================================================

const App = () => {
    const [enderecos, setEnderecos] = useState(null)
    const classes = useStyles();
    const {numero} = useParams()
    const pedidoContext = useContext(PedidoContext)

    //utilizado para navegação das paginas
    const navigate = useNavigate();

    useEffect(() => {
        pedidoContext.limpar()
    }, []);

    return (
        <Page title="Produtos">
            <Container maxWidth={false}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Lottie
                                            options={{
                                                loop: true,
                                                autoplay: true,
                                                animationData: PedidoFinalizado,
                                                rendererSettings: {
                                                    preserveAspectRatio: "xMidYMid slice",
                                                },
                                            }}
                                            height={200}
                                            width={200}
                                            speed={2}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                       <Typography className={classes.title}>
                                            Pedido concluído :)
                                       </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                       <Typography className={classes.text}>
                                            Numero do pedido: {numero}
                                       </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                       <Typography className={classes.text}>
                                        Confirmação do pedido enviado para e-mail do cadastro
                                       </Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign:'center'}}>
                                       <Button 
                                          className={classes.button}
                                          onClick={()=>{
                                              navigate('/app/pedidos')
                                          }}>
                                            <PetsIcon style={{marginRight: 5}}/> Acompanhar pedido
                                       </Button>
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page >
    )
}

export default App