import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  BarChart as BarChartIcon,
  UserPlus as UserPlusIcon,
} from "react-feather";
import NavItem from "./NavItem";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
//import Inicio from '../../../icons/home.js';
//import home from '../../../components/Logo.js';
import { ToastContainer, toast } from "react-toastify";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Logo from "src/components/Logo";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import PetsIcon from "@material-ui/icons/Pets";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import PaymentIcon from "@material-ui/icons/Payment";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {ShowChart} from "@material-ui/icons";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
};

const items = [
  {
    href: "/app/clientes",
    icon: PeopleAltIcon,
    title: "Clientes",
  },
  // {
  //   href: '/app/enderecos',
  //   icon: PersonPinCircleIcon,
  //   title: 'Endereços'
  // },
  // {
  //   href: '/app/cartoes',
  //   icon: PaymentIcon,
  //   title: 'Cartões'
  // },
  {
    href: "/app/cupons",
    icon: ConfirmationNumberIcon,
    title: "Cupons",
  },
  {
    href: "/app/pedidos",
    icon: AttachMoneyIcon,
    title: "Pedidos",
  },
  {
    href: "/app/estoque",
    icon: AttachMoneyIcon,
    title: "Estoque",
  },
  {
    href: "/app/estatisticas",
    icon: ShowChart,
    title: "Estatísticas",
  },

];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  navitem: {
    // cursor: 'pointer',
    // width: '100%',
    // padding: 20,
    // height: 64,
    // color: '#fff'
  },
}));

const NavBar = ({ onMobileClose, openMobile, openMenu, setOpenMenu }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <List>
        {items.map((item) => (
          <NavItem
            href={item.href}
            key={item.title}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
