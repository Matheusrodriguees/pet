import React, { useEffect } from 'react';
// ==================== Componentes da pagina =========================
import {
  Divider,
  Grid
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {
  makeStyles
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import LineStyle from '@material-ui/icons/LineStyle';
import Report from '@material-ui/icons/Report';
import CardMedia from '@material-ui/core/CardMedia';
// ====================================================================
// ==================== Componentes Filhos ============================
import ComparativoDeResistencia from './ComparativoDeResistencia'
import Exigencias from './Exigencias'
import StepsSelectFilter from './StepsSelectFilter'
// ====================================================================


const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.colors.red,
  },
  img: {
    maxWidth: "100px",
    float: 'right',
  }

}));






const Conteudo = ({ mapa,selectedDate }) => {
  const classes = useStyles();

  const defaultProps = {
    style: {
      height: '440px',
      padding: '20px'
    },
  };


  return (
    mapa.length > 0 || typeof mapa.categories !== 'undefined' ?
    <>
      <Grid container spacing={3} >
        <Grid item xs={12} >
          <Exigencias
            mapa={mapa}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} >
        <Grid item xs={6} >
          <ComparativoDeResistencia
            mapa={mapa}
          />
        </Grid>
        <Grid item xs={6} >
          <div className="mt-8" >
            <Typography className={classes.title} >Informações</Typography>
            <Box class="shadow-lg rounded w-full "  {...defaultProps}>

              <Grid container spacing={3} >
                <Grid item xs={8}  >
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LineStyle />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Norma:" secondary="Exemplo Norma" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Person />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Responsável técnico:" secondary="Exemplo responsavel" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <Report />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Observações:" secondary="Exemplo oBs" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={4}>
                  <img src="/static/images/seloDeQualidade.jpeg" className={classes.img} height="auto" ></img>
                </Grid>
              </Grid>




            </Box>
          </div>
        </Grid>

      </Grid>
    </>
    :
    <StepsSelectFilter 
      selectedDate={selectedDate}
    />
  )
}

export default Conteudo