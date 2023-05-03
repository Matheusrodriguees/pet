import React, { useEffect, useState, useContext } from "react";
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
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import PaymentIcon from '@material-ui/icons/Payment';
import { FormControlLabel } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { PedidoContext } from "src/providers/PedidoProvider"

// ====================================================================
// ==================== Componentes Filhos ============================

// ====================================================================
// ========================= Estilo  ==================================
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    titulo: {
        fontWeight: "bold",
        textAlign: 'center'
    },
    icone: {
        marginRight: 5
    },
    divider: {
        marginTop: 10
    }
}));
// ====================================================================

const ItemCarrinho = ({ item, index, disable }) => {
    const classes = useStyles();
    const pedidoContext = useContext(PedidoContext)


    return (
        <Card>
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={1}>
                        <img height={50} width={50} src={`/static/images/produtos/${item?.id}.jpg`} />
                    </Grid>
                    <Grid item xs={7}>
                        <Typography>{item?.nome}</Typography>
                    </Grid>
                    {!disable &&
                        <>
                            <Grid item xs={1}>
                                <Typography>Qtde:</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <TextField
                                    name="qtde"
                                    type="number"
                                    id="qtde"
                                    value={item?.quantidade}
                                    onChange={(number) => {
                                        let auxCarrinho = [...pedidoContext.carrinho]
                                        auxCarrinho[index].quantidade = number.target.value
                                        pedidoContext.setCarrinho(auxCarrinho)
                                    }}
                                    InputProps={{
                                        inputProps: { 
                                            max: item?.quantidade_estoque, min: 0
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={1}>
                                <DeleteIcon
                                    onClick={() => {
                                        pedidoContext.deletarItem(index)
                                    }} />
                            </Grid>
                        </>
                    }
                </Grid>
            </CardContent>
        </Card>

    )
}

export default ItemCarrinho