
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    makeStyles,
    withStyles
} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
    title :{
        // color: theme.palette.colors.red,
    },
    table :{
        borderCollapse: 'collapse',
        '& td,th':{
            border: '1px solid #ddd'
        }
       
    },
    tableTitle1: {
        // font: theme.typography.tableTitle1.font,
        // color: theme.typography.tableTitle1.color,
    },
    tableTitle2: {
        // font: theme.typography.tableTitle2.font,
        // color: theme.typography.tableTitle2.color,
    }
}));
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



function countColSpanTitle1(array) {
    let qtd = 0
    array.data.forEach(data => {
        data.headers.forEach(header =>{
            qtd++
        })
    });
    return qtd
}
function countColSpanTitle2(array) {
    let qtd = 0
    
    array.headers.forEach(header =>{
        qtd++
    })

    return qtd
}


const Exigencia = ({mapa}) => {
    const classes = useStyles();


    const categories = () => {
        return mapa.categories.map(categorie => {
            return (
                <TableCell colSpan={countColSpanTitle1(categorie) }>
                    <Typography className={classes.title}>
                        {categorie.name}
                    </Typography>
                </TableCell>
            )
        })
    }

    const data = () => {
        return mapa.categories.map(categorie => {
           return categorie.data.map(data => {
                return (
                    <TableCell colSpan={countColSpanTitle2(data) }>
                        <Typography className={classes.tableTitle1}>
                            {data.name}
                        </Typography>
                    </TableCell>
                )
           })
        })
    }
    const headers = () => {
        return mapa.categories.map(categorie => {
            return categorie.data.map(data => {
                return data.headers.map(header => {
                    return (
                        <TableCell>
                            <Typography className={classes.tableTitle2}>
                                {header}
                            </Typography>
                        </TableCell>
                    )
                })
            })
        })
    }

    const body = () => {

        let lista = []

        mapa.categories.forEach(categorie => {
            categorie.data.forEach(data => {
                data.values.forEach(value => {
                    if(lista[value[0]] === undefined){
                        lista[value[0]] = value.slice(1)
                    }else{
                        value.slice(1).forEach(i => {
                            lista[value[0]].push(i)
                        })
                    }
                })
            })
        })

        let listaAux = lista
        lista = []
        for (var key in listaAux) {
            lista.push([key,listaAux[key]])
        }

        return lista.map(valores => {
            return (
                <StyledTableRow>
                    <TableCell component="th" scope="row">
                        {valores[0]}
                    </TableCell>
                    {
                        valores[1].map(v =>{
                            return (
                                <TableCell>{v}</TableCell>
                            )
                        })
                    }
                </StyledTableRow>
            )
        }) 
         
    }




    
    return (
        // <TableContainer component={Paper}>
           
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {categories()}
                    </TableRow>
                    <TableRow>
                        <TableCell></TableCell>
                        {data()}
                    </TableRow>
                    <TableRow>
                        <TableCell></TableCell>
                        {headers()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {body()}
                </TableBody>
            </Table>
           
        // </TableContainer>
    );
};



export default Exigencia;
