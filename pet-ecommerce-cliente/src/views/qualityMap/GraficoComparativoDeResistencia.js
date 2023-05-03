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


const useStyles = makeStyles((theme) => ({
    title :{
        color: theme.palette.colors.red,
    },
}));

const GraficoComparativoDeResistencia = ({ mapa }) => {
    const classes = useStyles();
    const theme = useTheme();
    console.log("mapa",mapa)

    //====================== Dados do grafico ==============================
    const data = {
        
        datasets: [
            {
                backgroundColor: '#79869E',
                data: mapa.chart.limites,
                label: 'Limites de norma'
            },
            {
                backgroundColor: '#D72B34',
                data: mapa.chart.media,
                label: 'Média do mês'
            }
        ],
        
        labels: mapa.chart.labels
    };
    //======================================================================
    //================== Configurações do Grafico ==========================
    const options = {
        animation: false,
        cornerRadius: 4,
        layout: { padding: 0 },
        legend: { display: true ,position: 'bottom', align: 'start'},
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    barThickness: 20,
                    maxBarThickness: 20,
                    ticks: {
                        fontColor: theme.palette.colors.grey
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: theme.palette.colors.grey,
                        beginAtZero: true,
                        min: 0
                    },
                    gridLines: {
                       
                        borderDashOffset: [2],
                        color: theme.palette.colors.lightGray,
                        drawBorder: false,
                        
                      
                        zeroLineColor: theme.palette.colors.lightGray,
                    }
                }
            ]
        },
        tooltips: {
            backgroundColor: theme.palette.background.default,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };
    //======================================================================

    return (
        <Bar
            data={data}
            options={options}
        />
    );
};



export default GraficoComparativoDeResistencia;
