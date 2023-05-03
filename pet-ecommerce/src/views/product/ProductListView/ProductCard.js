import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GetAppIcon from "@material-ui/icons/GetApp";
import CreateIcon from "@material-ui/icons/Create";
import moment from "moment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import axios from "../../../config/axios";
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  statsItem: {
    alignItems: "center",
    display: "flex",
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ProductCard = ({ className, product, precificacoes, ...rest }) => {
  const initialEstoque = {
    produto: null,
    quantidade: 0,
    motivo: "",
    data: moment(),
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [estoque, setEstoque] = React.useState(initialEstoque);

  const handleClickOpen = (id) => {
    setEstoque({ ...estoque, produto: id });
    setOpen(true);
  };

  const handleClose = () => {
    setEstoque(initialEstoque);
    setOpen(false);
  };

  const handleSave = () => {
    setEstoque(initialEstoque);
    axios.patch(`/estoque/${estoque.produto}`, {
      estoque,
    });
    handleClose();
    // navigate("/app/clientes");
  };
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
        <DialogTitle id="alert-dialog-title">{"Gerenciar Estoque"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <DialogContentText id="alert-dialog-description">
                {product.nome}
              </DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-number"
                label={
                  estoque.quantidade > 0
                    ? "Adicionar"
                    : estoque.quantidade < 0
                    ? "Remover"
                    : "Escolher Quantidade"
                }
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) =>
                  setEstoque({
                    ...estoque,
                    quantidade: event.target.value,
                  })
                }
              />
            </Grid>
            {estoque.quantidade > 0 ? (
              <>
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Valor de custo
                  </InputLabel>
                  <TextField
                    name="custo"
                    id="custo"
                    fullWidth={true}
                    required={true}
                    onChange={(event) =>
                      setEstoque({
                        ...estoque,
                        custo: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Fornecedor
                  </InputLabel>
                  <TextField
                    name="fornecedor"
                    id="fornecedor"
                    fullWidth={true}
                    required={true}
                    onChange={(event) =>
                      setEstoque({
                        ...estoque,
                        fornecedor: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Precificacao
                  </InputLabel>
                  <Select
                    labelId="categoria"
                    id="categoria"
                    required={true}
                    onChange={(event) =>
                      setEstoque({
                        ...estoque,
                        precificacao: event.target.value,
                      })
                    }
                    fullWidth={true}
                  >
                    {precificacoes.map((precificacao) => {
                      return (
                        <MenuItem value={precificacao.id}>
                          {precificacao.nome}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="data-nascimento">Data Entrada</InputLabel>
                  <KeyboardDatePicker
                    clearable
                    onChange={(date) =>
                      setEstoque({
                        ...estoque,
                        data: date,
                      })
                    }
                    format="DD/MM/YYYY"
                    fullWidth={true}
                  />
                </Grid>
                {/* <Grid item xs={4}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Precificacao
                  </InputLabel>
                  <TextField
                    name="precificacao"
                    id="precificacao"
                    fullWidth={true}
                    required={true}
                    value={estoque.precificacao}
                    onChange={(event) =>
                      setEstoque({
                        ...estoque,
                        precificacao: event.target.value,
                      })
                    }
                  />
                </Grid> */}
              </>
            ) : estoque.quantidade < 0 ? (
              <>
                <Grid item xs={6}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Motivo
                  </InputLabel>
                  <TextField
                    name="motivo"
                    id="motivo"
                    fullWidth={true}
                    required={true}
                    onChange={(event) =>
                      setEstoque({
                        ...estoque,
                        motivo: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id="data-nascimento">Data Saida</InputLabel>
                  <KeyboardDatePicker
                    clearable
                    onChange={(date) =>
                      setEstoque({
                        ...estoque,
                        data: date,
                      })
                    }
                    format="DD/MM/YYYY"
                    fullWidth={true}
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          {estoque.quantidade > 0 &&
            estoque?.produto &&
            estoque?.custo &&
            estoque?.fornecedor && (
              <Button onClick={handleSave} color="primary" autoFocus>
                Salvar
              </Button>
            )}
          {estoque.quantidade < 0 && estoque?.produto && estoque?.motivo && (
            <Button onClick={handleSave} color="primary" autoFocus>
              Salvar
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardContent>
          {/* <Box display="flex" justifyContent="center" mb={3}>
            <Avatar alt="Product" src={product.media} variant="square" />
          </Box> */}
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h6"
          >
            {product.nome}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            style={{ color: "#6B7A8F" }}
          >
            {product.descricao.substring(0, 100) + "..."}
          </Typography>
        </CardContent>
        <Box flexGrow={1} />
        <Divider />
        <Box p={2}>
          <Grid container justify="space-between" spacing={2}>
            <Grid className={classes.statsItem} item xs={6}>
              <AccessTimeIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Atualizado:{" "}
                {product.estoque.atualizadoEm
                  ? moment(product.estoque.atualizadoEm).format(
                      "DD/MM/YYYY h:mm"
                    )
                  : ""}
              </Typography>
            </Grid>
            <Grid
              className={classes.statsItem}
              item
              style={{ cursor: "pointer" }}
              xs={6}
              onClick={() => handleClickOpen(product.id)}
            >
              <CreateIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Estoque: {product.estoque.quantidadeAtual ?? 0}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item xs={6}>
              <AttachMoneyIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Valor: {product.valor ?? 0}
              </Typography>
            </Grid>
            <Grid className={classes.statsItem} item xs={6}>
              <AttachMoneyIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Status:
                {product.estoque.quantidadeAtual > 0 ? "Ativo" : "Inativo"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
};

export default ProductCard;
