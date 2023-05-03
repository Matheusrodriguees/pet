import React, { useEffect, useState } from "react";
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
  AccordionDetails,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Page from "src/components/Page";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import PaymentIcon from "@material-ui/icons/Payment";
import { FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
// ====================================================================
// ==================== Componentes Filhos ============================

// ====================================================================
// ========================= Estilo  ==================================
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  titulo: {
    fontWeight: "bold",
    textAlign: "center",
  },
  icone: {
    marginRight: 5,
  },
  divider: {
    marginTop: 10,
  },
}));
// ====================================================================

const Cartao = ({
  data,
  setData,
  index,
  setCartaoPrincipal,
  cartaoPrincipal,
  cliente,
}) => {
  const classes = useStyles();
  const [cartao, setCartao] = useState({
    numero: "",
    nome: "",
    bandeira_id: "",
    cvv: "",
    principal: false,
    status: true,
  });

  return (
    <Grid container spacing={3}>
      <Grid item lg={12} sm={12} xl={12} xs={12}>
        <Card>
          <CardContent>
            <Typography className={classes.titulo}>
              <PaymentIcon className={classes.icone} />
              Cartão
            </Typography>
            <Divider className={classes.divider} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  className={classes.divider}
                >
                  Número do cartão
                </InputLabel>
                <TextField
                  name="numero"
                  id="numero"
                  required={true}
                  fullWidth={true}
                  value={data.cartoes[index].numero}
                  onChange={(event) =>
                    setData({
                      ...data,
                      ...(data.cartoes[index].numero = event.target.value),
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  className={classes.divider}
                >
                  Nome impresso no cartão
                </InputLabel>
                <TextField
                  name="nome"
                  id="nome"
                  required={true}
                  fullWidth={true}
                  value={data.cartoes[index].nome}
                  onChange={(event) =>
                    setData({
                      ...data,
                      ...(data.cartoes[index].nome = event.target.value),
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  className={classes.divider}
                >
                  Bandeira
                </InputLabel>
                <Select
                  labelId="bandeira"
                  id="bandeira"
                  required={true}
                  value={data.cartoes[index].bandeira_id}
                  onChange={(event) =>
                    setData({
                      ...data,
                      ...(data.cartoes[index].bandeira_id = event.target.value),
                    })
                  }
                  fullWidth={true}
                >
                  <MenuItem value={1}>Mastercard</MenuItem>
                  <MenuItem value={2}>Visa</MenuItem>
                  <MenuItem value={3}>American Express</MenuItem>
                  <MenuItem value={4}>Hipercard</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={6}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  className={classes.divider}
                >
                  Código de segurança
                </InputLabel>
                <TextField
                  name="cod-seguranca"
                  id="cod-seguranca"
                  required={true}
                  fullWidth={true}
                  value={data.cartoes[index].cvv}
                  onChange={(event) =>
                    setData({
                      ...data,
                      ...(data.cartoes[index].cvv = event.target.value),
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Cartão principal"
                  value={data.cartoes[index].principal}
                  checked={data.cartoes[index].principal}
                  required={true}
                  onClick={(event) => {
                    setCartaoPrincipal(cartao.numero);
                    setData({
                      ...data,
                      ...(data.cartoes[index].principal = event.target.checked),
                    });
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cartao;
