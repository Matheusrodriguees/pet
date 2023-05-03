import React, { useEffect, useState, useContext } from 'react';
import axios from "../../config/axios"

// ==================== Componentes da pagina =========================
import {
    Container,
    Grid,
    makeStyles,
    Card,
    CardContent,
    Typography,
    Snackbar
} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Page from 'src/components/Page';
import { Button } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import PetsIcon from '@material-ui/icons/Pets';
import ItemCarrinho from 'src/components/ItemCarrinho'
import { Divider } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { PedidoContext } from "src/providers/PedidoProvider"
import MuiAlert from '@material-ui/lab/Alert';


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
    button: {
        borderWidth: 1,
        backgroundColor: '#F7C331',
        color: '#FFF',
        "&:hover": {
            backgroundColor: '#F7C331',
            color: '#FFF',
        }
    },
}));
// ====================================================================

const App = () => {
    const classes = useStyles();
    const pedidoContext = useContext(PedidoContext)
    const [cupom, setCupom] = useState(null)
    const [open, setOpen] = useState(false)
    //utilizado para navegação das paginas
    const navigate = useNavigate();

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    async function addCupom() {
        let retorno = await pedidoContext.adicionarCupom(cupom)
        console.log('retorno', retorno)
        if (!retorno) {
            setOpen(true)
        }
    }

    return (
        <Page title="Produtos">
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item lg={12} sm={12} xl={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography >
                                    Carrinho
                                </Typography>
                            </CardContent>
                            <CardContent>
                                {pedidoContext.carrinho.length > 0 ?
                                    <>
                                        {pedidoContext.carrinho?.map((item, index) => (
                                            <ItemCarrinho item={item} index={index} />
                                        ))}
                                        <Divider />
                                    </>
                                    :
                                    <Card>
                                        <CardContent>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <Typography style={{textAlign: 'center'}}>
                                                        Carrinho vazio :(
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                }
                            </CardContent>
                            {pedidoContext.itensCancelados?.length > 0 &&
                                <CardContent>
                                    Itens removidos do carrinho (tempo máximo)
                                    {pedidoContext.itensCancelados?.map((item, index) => (
                                        <ItemCarrinho item={item} index={index} disable={true}/>
                                    ))}
                                    <Divider />
                                </CardContent>
                            }
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={1}>
                                        Cupom:
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            name="cupom"
                                            id="cupom"
                                            fullWidth
                                            value={cupom}
                                            onChange={(event) => {
                                                setCupom(event.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            className={classes.button}
                                            onClick={() => {
                                                addCupom()
                                            }}
                                        >
                                            Adicionar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardContent>
                                <Grid container spacing={3}>
                                    {pedidoContext.pagamento?.map((item, index) => (
                                        <>
                                            {item.pagTipo == 'cupom' &&
                                                <Grid item xs={12}>
                                                    Cupom: {item.codigo} - R$ {item.valor}
                                                </Grid>
                                            }
                                        </>
                                    ))}
                                </Grid>
                            </CardContent>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={1}>
                                        Subtotal:
                                    </Grid>
                                    <Grid item xs={3}>
                                        R$ {(pedidoContext.subtotal)?.toFixed(2)}
                                    </Grid>
                                    {/* <Grid item xs={8} /> */}
                                    {/* <Grid item xs={1}>
                                        Frete:
                                    </Grid>
                                    <Grid item xs={3}>
                                        R$ {frete}
                                    </Grid> */}
                                    <Grid item xs={8} />
                                    <Grid item xs={1}>
                                        Descontos:
                                    </Grid>
                                    <Grid item xs={3}>
                                        R$ {(pedidoContext.desconto)?.toFixed(2)}
                                    </Grid>
                                    <Grid item xs={8} />
                                    <Grid item xs={1}>
                                        Total:
                                    </Grid>
                                    <Grid item xs={3}>
                                        R$ {(pedidoContext.total)?.toFixed(2)}
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} />
                                    <Grid item xs={3}>
                                        <Button
                                        className={classes.button} 
                                        onClick={() => navigate('/app/inicio')}>Continuar Comprando</Button>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button 
                                        className={classes.button}
                                        disabled={pedidoContext.carrinho?.length < 1}
                                        onClick={() => { navigate('/app/resumo-pedido') }}>Continuar</Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                        Não foi possível adicionar esse cupom
                    </Alert>
                </Snackbar>
            </Container>
        </Page>
    )
}

export default App