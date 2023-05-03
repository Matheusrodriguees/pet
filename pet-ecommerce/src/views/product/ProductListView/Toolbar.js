import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../../../config/axios";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
}));

const initialProduto = {
  nome: "",
  descricao: "",
  valor: 0,
  categoria_id: null,
};

const Toolbar = ({ className, ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const [produto, setProduto] = React.useState(initialProduto);
  const [categorias, setCategorias] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  useEffect(() => {
    carregaCategorias();
  }, []);

  async function carregaCategorias() {
    const { data } = await axios.get("/produto/categoria");
    setCategorias(data);
  }

  const handleSave = () => {
    axios.post("/produto", produto);
    handleClose();
    // navigate("/app/clientes");
  };
  console.log(produto);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Novo Produto"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <InputLabel id="demo-simple-select-helper-label">Nome</InputLabel>
              <TextField
                name="nome"
                id="nome"
                fullWidth={true}
                required={true}
                value={produto.nome}
                onChange={(event) =>
                  setProduto({
                    ...produto,
                    nome: event.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <InputLabel id="demo-simple-select-helper-label">
                Categoria
              </InputLabel>
              <Select
                labelId="categoria"
                id="categoria"
                required={true}
                value={
                  categorias.find(
                    (categoria) => categoria.id === produto.categoria_id
                  )?.nome
                }
                onChange={(event) =>
                  setProduto({
                    ...produto,
                    categoria_id: event.target.value,
                  })
                }
                fullWidth={true}
              >
                {categorias.map((categoria) => {
                  return (
                    <MenuItem value={categoria.id}>{categoria.nome}</MenuItem>
                  );
                })}

                <MenuItem value={"Outro"}>Outro</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <InputLabel id="demo-simple-select-helper-label">
                Valor
              </InputLabel>
              <TextField
                name="valor"
                id="valor"
                fullWidth={true}
                required={true}
                value={produto.valor}
                onChange={(event) =>
                  setProduto({
                    ...produto,
                    valor: event.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="descricao"
                label="Descrição"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                value={produto.descricao}
                onChange={(event) =>
                  setProduto({
                    ...produto,
                    descricao: event.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
      <div className={clsx(classes.root, className)} {...rest}>
        <Box display="flex" justifyContent="flex-end">
          <Button color="primary" variant="contained" onClick={handleClickOpen}>
            Novo Produto
          </Button>
        </Box>
        {/* <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search product"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box> */}
      </div>
    </>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
