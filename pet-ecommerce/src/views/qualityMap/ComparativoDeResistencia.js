import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    useTheme,
    makeStyles,
    colors
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Typography from '@material-ui/core/Typography';

import GraficoComparativoDeResistencia from './GraficoComparativoDeResistencia'

const useStyles = makeStyles((theme) => ({
    title :{
        color: theme.palette.colors.red,
    },
}));

const ComparativoDeResistencia = ({ mapa }) => {
    const classes = useStyles();
    const theme = useTheme();
    console.log("mapa",mapa)



    return (
        
        <div className="mt-8"> 
            <Typography className={classes.title} >Comparativo de resistência do mês</Typography>
        
            <Card >
                <CardContent>
                    <Box height={400} position="relative">
                        {/*************** Grafico **************/}
                        <GraficoComparativoDeResistencia
                           mapa={mapa}
                        />
                        {/***************************************/}
                    </Box>
                </CardContent>
                
            </Card>
        </div>
     
    );
};



export default ComparativoDeResistencia;
