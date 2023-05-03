import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

// ==================== Componentes da pagina =========================
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  Box,
  MenuItem,
  TextField,
} from "@material-ui/core";
import Page from "src/components/Page";
import Table from "src/views/pedidos/Tabela";
import { Button } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

// ====================================================================
// ==================== Componentes Filhos ============================

// ====================================================================
// ========================= Estilo  ==================================
const useStyles = makeStyles((theme) => ({
  cupomCode: {
    backgroundColor: theme.palette.background.dark,
    minWidth: "500px",
    padding: "20px",
    textAlign: "center",
  },
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  titulo: {
    fontSize: "200%",
    color: "#40338C",
    fontweight: "bold",
    paddingBottom: 50,
  },
  icone: {
    height: 40,
    width: 40,
    color: "#40338C",
  },
}));
// ====================================================================

const App = () => {
  const [pedidos, setPedidos] = useState(null);

  useEffect(() => {
    console.log("--------");
    carregaPedidos();
  }, []);

  async function carregaPedidos() {
    const { data } = await axios.get("/pedido");
    console.log("pedidos", data);
    setPedidos(data);
  }

  return (
    <Page title="Endereços">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Card>
              <CardContent>
                {/* Só mostra a tabela quando existe pedidos  */}
                {pedidos && <Table data={pedidos} />}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default App;
