import React from 'react';
import {
    Grid,
    makeStyles
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grow from '@material-ui/core/Grow';
const useStyles = makeStyles((theme) => ({
    img: {
        width: "250px",
        float: 'right'
    },

    
}));




const dataFormatada = (data) => {
    var data = new Date(data),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
    return mes+"/"+ano;
}
  

const StepsSelectFilter = ({
    mapa,
    selectedDate
}) => {
    const classes = useStyles();
    


    return (
        <div className="mt-8">
            <Grid container spacing={3} >
                {
                    selectedDate 
                        ?
                            <Grid item xs={5} >
                                <img src="/static/images/tioes/joinha.png" className={classes.img} height="auto" ></img>
                            </Grid> 
                        :
                            <Grid item xs={5} >
                                <img src="/static/images/tioes/bracoCruzado.png" className={classes.img} height="auto" ></img>
                                {/* <img src="/static/images/tioes/taFelizNao2.jpg" className={classes.img} height="auto" ></img> */}
                            </Grid> 
                }
                
                <Grid item xs={7} >
                    
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemAvatar>
                                { 
                                    selectedDate ? <CheckCircleOutlineIcon fontSize="large" color="action"/> :  <ErrorOutline fontSize="large" color="error"/>
                                }
                            </ListItemAvatar>
                            <ListItemText primary="Data" secondary={selectedDate ? dataFormatada(selectedDate) : 'Selecione...'}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <ErrorOutline fontSize="large" color="error"/>
                            </ListItemAvatar>
                            <ListItemText primary="Centro de distribuição" secondary="Selecione..." />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <ErrorOutline fontSize="large" color="error"/>
                            </ListItemAvatar>
                            <ListItemText primary="Produto" secondary="Selecione..." />
                        </ListItem>
                    </List>
                </Grid>
            
            </Grid>
        </div>
          
    );
};



export default StepsSelectFilter;
