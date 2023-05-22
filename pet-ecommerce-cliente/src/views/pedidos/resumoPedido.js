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
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputLabel,
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
import HomeIcon from '@material-ui/icons/Home';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { PedidoContext } from "src/providers/PedidoProvider"
import moment from 'moment'
import Endereco from 'src/components/NovoEndereco'
import Cartao from 'src/components/Cartao'
import { BorderColor } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
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
        borderColor: '#F7C331',
        color: '#F7C331',
        "&:hover": {
            backgroundColor: "#F7C331",
            color: '#FFF',
        }
    },
    save: {
        color: '#fff',
        backgroundColor: "#F7C331",
        "&:hover": {
            backgroundColor: "#F7C331",
            color: '#FFF',
        }
    },
    divider: {
        marginBottom: 10
    }
}));
// ====================================================================

const App = () => {
    const [enderecos, setEnderecos] = useState(null)
    const [cartao, setCartao] = useState(null)
    const [openEnderecos, setOpenEnderecos] = useState(false)
    const [openNovoEndereco, setOpenNovoEndereco] = useState(false)
    const [openCartoes, setOpenCartoes] = useState(false)
    const [openNovoCartao, setOpenNovoCartao] = useState(false)
    const classes = useStyles();
    const pedidoContext = useContext(PedidoContext)
    const [open, setOpen] = useState(false)

    //utilizado para navegação das paginas
    const navigate = useNavigate();

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    //Assim que a tela é iniciada carrega os dados. Caso não existe nada salvo antes cliente recebe o valor dos daddos mokados
    useEffect(() => {
        carregaEnderecos()
        carregaCartao()
    }, []);

    // useEffect(() => {
    //     calculaProdutos()
    // }, []);

    // useEffect(() => {
    //     calculaProdutos()
    // }, [pedidoContext.carrinho]);

    // function calculaProdutos() {
    //     let valor = 0
    //     if (pedidoContext.carrinho && pedidoContext.carrinho.length > 0)
    //         for (const item of pedidoContext.carrinho) {
    //             valor += item.quantidade * item.valor
    //         }
    //     setSubtotal(valor)
    //     setTotal(frete + valor)
    // }


    function validaDados() {
        if (!pedidoContext.frete) {
            pedidoContext.frete = pedidoContext.valor*0.05;
            console.log(pedidoContext);
        }
        if (!pedidoContext.endereco ||
            //  pedidoContext.pagamento?.length < 0 ||
            !pedidoContext.frete)
            // !pedidoContext.parcela)
             {
            setOpen(true)
            return true;
        }else{
            return true
        }
    }

    async function save() {
        // dados.items, dados.cliente, dados.data, dados.valor, dados.status, dados.frete, dados.endereco, dados.cupom
        let itens = []
        for (const car of pedidoContext.carrinho) {
            let aux = {}
            aux.produto = {
                id: car.id,
                valor: car.valor,
                status: 1
            }
            aux.quantidade = car.quantidade
            itens.push(aux)
        }
        const pedido = {
            items: itens,
            data: moment().toDate(),
            valor: pedidoContext.total,
            status: {
                id: 1
            },
            frete: {
                id: pedidoContext.frete.id
            },
            endereco: {
                id: pedidoContext.endereco.id
            },
            cupom: null,
            pagamento: pedidoContext.pagamento,
            cliente: {
                id: 43
            }
        }
        const { data } = await axios.post('/pedido', { pedido: pedido });
        console.log('pedido', data)

        console.log('total: ', pedidoContext.total)
        if (pedidoContext.total < 0) {
            const cupom = {
                codigo: uuidv4().toUpperCase(),
                valor: pedidoContext.total.toFixed(2) * -1,
                tipo: 'Troco',
                pedido_origem_id: data.id,
                cliente_id: 43
            }
            console.log('cupom', cupom)
            await axios.post('/cupom', { cupom: cupom });
        }
        navigate(`/app/confirma-pedido/${data.id}`)
    }

    async function carregaEnderecos() {
        const { data } = await axios.get('/endereco')
        let end = data.filter(item => item.entrega == 1)
        setEnderecos(end)
    }

    async function carregaCartao() {
        const { data } = await axios.get('/cartao')
        setCartao(data)
    }



    return (
        <Page title="Produtos">
            <Container maxWidth={false}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Divider className={classes.divider} />
                        <Card>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography>
                                                <HomeIcon />  Endereço de Entrega
                                            </Typography>
                                        </Grid>
                                        <Divider />
                                        <Grid item xs={6}>
                                            <Button
                                                className={classes.button}
                                                fullWidth
                                                onClick={() => setOpenEnderecos(true)}
                                                variant="outlined"
                                            >
                                                Selecionar endereço de entrega
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                className={classes.button}
                                                fullWidth
                                                onClick={() => setOpenNovoEndereco(true)}
                                                variant="outlined"
                                            >
                                                Adicionar endereço de entrega
                                            </Button>
                                        </Grid>
                                        <Divider />
                                        {pedidoContext.endereco &&
                                            <>
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        {pedidoContext.endereco?.nome}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        {pedidoContext.endereco?.tpLogradouro} {pedidoContext.endereco?.logradouro} - {pedidoContext.endereco?.numero}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        {pedidoContext.endereco?.bairro} - {pedidoContext.endereco?.cidade} - {pedidoContext.endereco?.estado}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>
                                                        {pedidoContext.endereco?.observacao}
                                                    </Typography>
                                                </Grid>
                                            </>
                                        }
                                        <Divider />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Divider className={classes.divider} />
                        <Card>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            <CreditCardIcon />  Forma de Pagamento
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            className={classes.button}
                                            fullWidth
                                            onClick={() => setOpenCartoes(true)}
                                            variant="outlined"
                                        >
                                            Selecionar cartão
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            className={classes.button}
                                            fullWidth
                                            onClick={() => setOpenNovoCartao(true)}
                                            variant="outlined"
                                        >
                                            Adicionar novo cartão
                                        </Button>
                                    </Grid>
                                    {pedidoContext.pagamento?.map((item, index) => (
                                        <>
                                            {item.pagTipo == 'cartao' ?
                                                <>
                                                    <Grid item xs={12}>
                                                        <Typography>
                                                            Número cartão: {item?.numero}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <TextField
                                                            name="cvv"
                                                            id="cvv"
                                                            label="CVV"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <InputLabel id="demo-controlled-open-select-label">Parcelas</InputLabel>
                                                        <Select
                                                            label="Parcelas"
                                                            id="parcelas"
                                                            required={true}
                                                            value={pedidoContext.parcela}
                                                            fullWidth={true}
                                                            onChange={(event) => {
                                                                pedidoContext.setParcela(event.target.value)
                                                            }}
                                                            variant="outlined"
                                                        >
                                                            <MenuItem value={1}>
                                                                1x de {((pedidoContext.total) / pedidoContext.pagamento?.filter(item => item.pagTipo == 'cartao')?.length).toFixed(2)}
                                                            </MenuItem>
                                                            <MenuItem value={2}>
                                                                2x de {((pedidoContext.total) / pedidoContext.pagamento?.filter(item => item.pagTipo == 'cartao')?.length / 2).toFixed(2)}
                                                            </MenuItem>
                                                            <MenuItem value={3}>
                                                                3x de {((pedidoContext.total) / pedidoContext.pagamento?.filter(item => item.pagTipo == 'cartao')?.length / 3).toFixed(2)}
                                                            </MenuItem>
                                                        </Select>
                                                    </Grid>
                                                </> :
                                                <>
                                                    <Grid item xs={12}>
                                                        <Typography>
                                                            Cupom: {item.codigo}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <Typography>
                                                            Valor: {(item.valor).toFixed(2)}
                                                        </Typography>
                                                    </Grid>
                                                </>
                                            }

                                        </>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Divider className={classes.divider} />
                        <Card>
                            <CardContent>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            <ShoppingBasketIcon />  Resumo da compra
                                        </Typography>
                                    </Grid>
                                    <Divider />
                                    <Grid item xs={12}>
                                        <Typography>
                                            Produtos
                                        </Typography>
                                    </Grid>
                                    {pedidoContext.carrinho?.map((item, index) => (
                                        <>
                                            <Grid item xs={12}>
                                                <Typography>
                                                    {item.nome} - {item.quantidade}x - R$ {item.valor},00
                                                </Typography>
                                            </Grid>
                                        </>
                                    ))}
                                    <Divider />
                                    <Grid item xs={12}>
                                        <Typography>
                                            Frete: {(pedidoContext?.frete?.valor)?.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Descontos: - {(pedidoContext?.desconto)?.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            Total: {(pedidoContext?.total)?.toFixed(2)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            className={classes.save}
                                            fullWidth
                                            onClick={() => {
                                                let validacao = validaDados()
                                                if(validacao == true){
                                                    save()
                                                }
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
            {/* Lista de endereço */}
            <Dialog
                open={openEnderecos}
                onClose={() => setOpenEnderecos(false)}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
            >
                <DialogTitle id="scroll-dialog-title">Endereços</DialogTitle>
                <DialogContent dividers={true}>
                    {enderecos?.map((item, index) => (
                        <Card
                            onClick={() => {
                                pedidoContext.setEndereco(item)
                                setOpenEnderecos(false)
                            }
                            }>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {item?.nome}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {item?.tpLogradouro} {item?.logradouro} - {item?.numero}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {item?.bairro} - {item?.cidade} - {item?.estado}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {item?.observacao}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                </DialogContent>
                <DialogActions >
                    <Button onClick={() => setOpenEnderecos(false)}>Cancelar</Button>
                </DialogActions>
            </Dialog>
            {/* Novo endereço */}
            <Dialog
                open={openNovoEndereco}
                onClose={() => setOpenNovoEndereco(false)}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
            >
                <DialogTitle id="scroll-dialog-title">Endereços</DialogTitle>
                <DialogContent dividers={true}>
                    <Endereco
                        setEnd={pedidoContext.setEndereco}
                        setOpen={setOpenNovoEndereco}
                    />
                </DialogContent>
                <DialogActions >
                    <Button onClick={() => setOpenNovoEndereco(false)}>Cancelar</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openCartoes}
                onClose={() => setOpenCartoes(false)}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
            >
                <DialogTitle id="scroll-dialog-title">Cartões</DialogTitle>
                <DialogContent dividers={true}>
                    {cartao?.map((item, index) => (
                        <Card
                            onClick={() => {

                                pedidoContext.adicionarCartao(item)
                                setOpenCartoes(false)
                            }
                            }>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {item?.numero}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                </DialogContent>
                <DialogActions >
                    <Button onClick={() => setOpenCartoes(false)}>Cancelar</Button>
                </DialogActions>
            </Dialog>
            {/* Novo cartao */}
            <Dialog
                open={openNovoCartao}
                onClose={() => setOpenNovoCartao(false)}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
            >
                <DialogTitle id="scroll-dialog-title">Cartao</DialogTitle>
                <DialogContent dividers={true}>
                    <Cartao
                        setData={setCartao}
                        salvar={true}
                        setOpen={setOpenNovoCartao}
                    />
                </DialogContent>
                <DialogActions >
                    <Button onClick={() => setOpenNovoCartao(false)}>Cancelar</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="warning" sx={{ width: '100%' }}>
                    Verifique se todos campos foram preenchidos
                </Alert>
            </Snackbar>
        </Page >
    )
}

export default App