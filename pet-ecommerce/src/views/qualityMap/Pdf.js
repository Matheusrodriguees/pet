import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
    Container,
    useTheme,
    makeStyles,
    Grid
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import GetApp from '@material-ui/icons/GetApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

// ==================== Componentes Filhos ============================
import GraficoComparativoDeResistencia from './GraficoComparativoDeResistencia'
import Exigencias from './Exigencias'
// ====================================================================




const useStyles = makeStyles((theme) => ({
    botao :{
        float: 'right',
        background: theme.palette.colors.red,
        color:  '#fff',
        "&:hover": {
            backgroundColor: theme.palette.colors.red,
            color:  '#fff',
        }
    },
    title :{
        color: theme.palette.colors.red,
    },
    img :{
        maxWidth: "100px",
        float : 'right',
    },
    img2 :{
        maxWidth: "250x",
        float : 'left',
        },
    teste :{
        position: 'absolute',
        left: '-999em',
    },
    pdf : {
        width: '410mm',
        height: '500mm'
        // minHeight: '297mm',
        // marginLeft: 'auto',
        // marginRight: 'auto'
    }
}));

const Pdf = ({
    mapa
}) => {
    const theme = useTheme();
    const classes = useStyles();

    const pdfDownload = () => {
       
    
      

        // let input = ""
        // input += exigenciaToPrint.outerHTML
        // input += comparativoToPrint.outerHTML
        // input += informacoesToPrint.outerHTML

        // console.log('--------------',input)

        const input = document.getElementById('pdf');

        const width = input.offsetWidth
        const height = input.offsetHeight
        console.log('width',width)

        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                unit: "mm",
                format: [430, 430]
            });
            pdf.addImage(imgData, 'JPEG',10, 10);
            // pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
          })
        ;
      }



        return (
            <>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        className={classes.botao}
                    
                        startIcon={<GetApp />}
                        onClick={pdfDownload}
                    >
                        PDF
                    </Button>
                </Grid>

                <div className={classes.teste} >
                    <div id="pdf" className={classes.pdf}>
                        <Container >
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <img src="/static/images/logo.png" className={classes.img2} height="auto" ></img>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <div className="w-full">
                                                <img src="/static/images/seloDeQualidade.jpeg" className={classes.img} height="auto" ></img>
                                            </div>
                                            
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} >
                                    <Exigencias 
                                        mapa={mapa} 
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <GraficoComparativoDeResistencia
                                        mapa={mapa}
                                    />
                                 </Grid>
                                 <Grid item xs={6}  >
                                    <div className="mt-8">
                                    <Typography className={classes.title} >Informações</Typography>
                                    <List>
                                    <ListItem>
                                        
                                        <ListItemText primary="Norma:" secondary="Exemplo Norma" />
                                    </ListItem>
                                    <ListItem>
                                        
                                        <ListItemText primary="Responsável técnico:" secondary="Exemplo responsavel" />
                                    </ListItem>
                                    <ListItem>
                                        
                                        <ListItemText primary="Observações:" secondary="Exemplo oBs" />
                                    </ListItem>
                                    </List>
                                    </div>
                                </Grid>
                            </Grid>
                       
                        </Container>
                    </div>
                </div>
                
           
                    
            </>
        );
   
};



export default Pdf;
