import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  item: {
  //  display: 'flex',
  //  justifyContent: 'center',
 //   paddingTop: 0,
    backgroundColor: "#fff",
  },
  button: {
    color: '#000000',
 //   display: 'flex',
    justifyContent: 'flex-start',
    textTransform: 'none',
    "&:hover": {
      backgroundColor: "#f4f6f8",
      color:  '#000',
    }
  },
  icon:{
    color: '#000000',
    paddingRight: 5
  },
  title: {},
  active: {
    color: '#000000',
    backgroundColor: '#f4f6f8',
    '& $title': {
      // fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: '#000000'
    },
    "&:hover": {
      backgroundColor: "f4f6f8",
      color:  '#000'
    }

  }
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <ListItem
      button
      component={RouterLink}
      to={href}
      className={clsx(classes.item,classes.button)}
      //disableGutters
      {...rest}
    >

    {Icon && (
          <Icon
            className={classes.icon}
            size="20"

          />
        )}
      
      
    <Typography type="body2" style={{ color: '#000000' }}>{title}</Typography>

    
          
    
    </ListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
