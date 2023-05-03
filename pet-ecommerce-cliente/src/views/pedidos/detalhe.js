import React, { useEffect, useState } from 'react';
import axios from "../../config/axios"

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
import { NavLink as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import PetsIcon from '@material-ui/icons/Pets';
import ItemCarrinho from 'src/components/ItemCarrinho'
import { Divider } from '@material-ui/core';
import { TextField } from '@material-ui/core';
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
    const [enderecos, setEnderecos] = useState(null)
    const [pedido, setPedido] = useState(null)
    const [pagamento, setPagamento] = useState(null)
    const [desconto, setDesconto] = useState(null)
    const classes = useStyles();
    const {numero} = useParams()
    //utilizado para navegação das paginas
    const navigate = useNavigate();

    //Assim que a tela é iniciada carrega os dados. Caso não existe nada salvo antes cliente recebe o valor dos daddos mokados
    useEffect(() => {
        carregaPedido()
        carregaPagamento()
    }, []);

    async function carregaPedido() {
        const { data } = await axios.get('/pedido')
        let aux = data.find(item => item.id == numero)
        console.log('pedido: ', aux)
        setPedido(aux)
    }

    async function carregaPagamento() {
        const { data } = await axios.get(`/pagamento/${numero}`)
        console.log('pagamento: ', data)
        setPagamento(data)
        let valor = 0;
        for (const item of data.cupons) {
            valor += item.valor
        }
        setDesconto(valor)
    }

    async function solitarTroca(id) {
        let status = {
            status: "Troca solicitada",
        }
        let item ={
            item_id: id
        }
        const { data } = await axios.patch(`/pedido/${numero}`, {item: item, pedido:status})
        navigate(`/app/pedidos`)
    }

    async function solicitarDevolucao(id) {
        let status = {
            status: "Cancelamento Solicitado",
        }
        let item ={
            item_id: id
        }
        const { data } = await axios.patch(`/pedido/${numero}`, {item:item, pedido:status})
        navigate(`/app/pedidos`)
    }


    return (
        <Page title="Produtos">
            <Container maxWidth={false}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid xs={8}>
                                        <Typography >
                                            Pedido #{numero}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography >
                                            Status: {pedido?.status?.name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardContent>
                                <Typography >
                                    Itens do pedido
                                </Typography>
                            </CardContent>
                            {pedido?.items?.map((item, index) => (
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={1}>
                                        <img src={`/static/images/produtos/${item?.produto?.id}.jpg`}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {item.produto?.nome}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {item.status_nome}
                                        </Grid>
                                        {item.status_id == 12 && 
                                        <>
                                            <Grid item xs={1}>
                                                <Button
                                                className={classes.button}
                                                onClick={()=>{
                                                    solitarTroca(item.id)
                                                }}>Trocar</Button>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Button
                                                className={classes.button}
                                                onClick={()=>{
                                                    solicitarDevolucao(item.id)
                                                }}>Devolver</Button>
                                            </Grid>
                                        </>
                                        }
                                    </Grid>
                                </CardContent>
                            ))}
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                Pagamento
                                            </Grid>
                                            <Grid item xs={12}>
                                                R$ {pedido?.valor}
                                            </Grid>
                                            {pagamento?.cartoes?.map((item, index) => (
                                                <Grid item xs={12}>
                                                Cartão: {item?.numero}
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem/>
                                    <Grid item xs={4}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                Total Pago: R$ {pedido?.valor}
                                            </Grid>
                                            <Grid item xs={12}>
                                                Desconto: R$ {desconto}
                                            </Grid>
                                            <Grid item xs={12}>
                                                Frete: R$ {pedido?.frete?.valor}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider orientation="vertical" flexItem/>
                                    <Grid item xs={3}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                Endereço
                                            </Grid>
                                            <Grid item xs={12}>
                                                {pedido?.endereco?.tpLogradouro} {pedido?.endereco?.logradouro} - {pedido?.endereco?.numero}
                                            </Grid>
                                            <Grid item xs={12}>
                                                {pedido?.endereco?.bairro} - {pedido?.endereco?.cidade} - {pedido?.endereco?.estado}
                                            </Grid>
                                            <Grid item xs={12}>
                                                {pedido?.endereco?.cep}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default App