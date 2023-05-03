import React from "react";
import axios from "../../config/axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button } from "@material-ui/core";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { Grid, Box, MenuItem, TextField, makeStyles } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
class TabelaPedido extends React.Component {
  //Construtor da classe da tabela
  //data: valores da tabela (clientes)
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      pedido: {
        id: null,
        status: null,
      },
      item: {
        id: null,
        status: null,
      },
      cupom: {
        codigo: null,
        valor: null,
        tipo: "Troca",
      },
      open: false,
      statusFilter: null,
    };
  }

  //Caso ocorra uma alteração na quantidade de linhas da tabela os dados são atualizados
  componentDidUpdate(prevProps) {
    if (this.props.data.length !== prevProps.data.length) {
      this.setState({ ...this.state, data: this.props.data });
    }
  }

  render() {
    const status = {
      EM_PROCESSAMENTO: "Em processamento",
      PAGAMENTO_REALIZADO: "Pagamento Realizado",
      EM_TRANSPORTE: "Em transporte",
      TROCA_SOLICITADA: "Troca solicitada",
      TROCA_AUTORIZADA: "Troca autorizada",
      TROCA_EFETUADA: "Troca efetuada",
      TROCA_REJEITADA: "Troca Rejeitada",
      CANCELAMENTO_SOLICITADO: "Cancelamento Solicitado",
      CANCELAMENTO_REJEITADO: "Cancelamento Rejeitado",
      CANCELAMENTO_AUTORIZADO: "Cancelamento autorizado",
      CANCELAMENTO_EFETUADO: "Cancelamento efetuado",
      ENTREGA_REALIZADA: "Entrega realizada",
    };
    const handleOpen = (id, valor, novostatus, item_id) => {
      console.log(item_id);
      console.log("valoor handle open", valor);
      const newCode = uuidv4().toUpperCase();
      if (novostatus === status.TROCA_AUTORIZADA) {
        this.setState({
          ...this.state,
          open: true,
          pedido: { id, status: novostatus },
          item: { item_id, status: novostatus },
          cupom: {
            codigo: newCode,
            tipo: "Troca",
            valor: valor.toLocaleString("de-DE", { minimumFractionDigits: 2 }),
          },
        });
      } else if (novostatus === status.CANCELAMENTO_EFETUADO) {
        this.setState({
          ...this.state,
          open: true,
          pedido: { id, status: novostatus },
          item: { item_id, status: novostatus },
          cupom: {
            codigo: newCode,
            tipo: "Troca",
            valor: valor.toLocaleString("de-DE", { minimumFractionDigits: 2 }),
          },
        });
      } else {
        this.setState(
          {
            ...this.state,
            open: false,
            pedido: { id, status: novostatus },
            item: { item_id, status: novostatus },
          },
          function() {
            handleUpdate(false);

            const newDataList = this.state.data.map((pedido) => {
              if (this.state.pedido.id === pedido.id) {
                return {
                  ...pedido,
                  status: { name: this.state.pedido.status },
                };
              } else {
                return pedido;
              }
            });
            this.setState({ ...this.state, data: newDataList });
          }
        );
      }
    };
    const handleClose = () => {
      this.setState({
        ...this.state,
        open: false,
        pedido: { id: null, status: null },
      });
    };

    const handleUpdate = (newCupom = true) => {
      let formatedCupom = null;
      if (newCupom) {
        formatedCupom = {
          ...this.state.cupom,
          valor: formatDouble(this.state.cupom.valor),
          pedido_origem_id: this.state.pedido.id,
          cliente_id: this.state.data.find(
            (pedido) => pedido.id === this.state.pedido.id
          ).cliente.id,
        };
      }

      console.log("state pedido", formatedCupom);

      axios
        .patch(`/pedido/atualiza-cria-cupom/${this.state.pedido.id}`, {
          pedido: this.state.pedido,
          item: this.state.item,
          cupom: formatedCupom,
        })
        .then((response) => {
          const newDataList = this.state.data.map((pedido) => {
            if (this.state.pedido.id === pedido.id) {
              let items = pedido.items;
              console.log("asda", this.state.item.status);
              items = items.map((itemaux) => {
                console.log("----------------------");
                console.log("state", this.state);
                console.log("itemaux", itemaux);
                console.log("----------------------");
                if (itemaux.id === this.state.item.item_id) {
                  console.log(
                    "testando this.state.item.status",
                    this.state.item.status
                  );
                  return { ...itemaux, status_nome: this.state.item.status };
                } else {
                  return itemaux;
                }
              });
              console.log("testando itens novo", items);
              console.log("testando", pedido);
              console.log("testando novo", {
                ...pedido,
                items: items,
                status: { name: this.state.pedido.status },
              });
              return {
                ...pedido,
                items: items,
                status: { name: this.state.pedido.status },
              };
            } else {
              return pedido;
            }
          });
          this.setState({ ...this.state, data: newDataList });
        })
        .catch((error) => {
          console.log("algum problema");
        })
        .finally(() => {
          this.setState({
            ...this.state,
            open: false,
            pedido: { id: null, status: null },
          });
        });
    };
    const formatReal = (i) => {
      var v = i.replace(/\D/g, "");
      v = (v / 100).toFixed(2) + "";
      v = v.replace(".", ",");
      v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
      v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
      return v;
    };
    const formatDouble = (i) => {
      i = i.replace(".", "");
      i = i.replace(",", ".");
      return i;
    };

    function StatusCollumn(row, item) {
      console.log("row", row);
      console.log("item", item);

      let options;
      switch (item.status_nome) {
        case status.EM_PROCESSAMENTO:
          options = [status.EM_PROCESSAMENTO, status.PAGAMENTO_REALIZADO];
          break;
        case status.PAGAMENTO_REALIZADO:
          options = [status.PAGAMENTO_REALIZADO, status.EM_TRANSPORTE];
          break;
        case status.EM_TRANSPORTE:
          options = [status.EM_TRANSPORTE, status.ENTREGA_REALIZADA];
          break;
        case status.TROCA_SOLICITADA:
          options = [
            status.TROCA_SOLICITADA,
            status.TROCA_AUTORIZADA,
            status.TROCA_REJEITADA,
          ];
          break;
        case status.TROCA_AUTORIZADA:
          options = [status.TROCA_AUTORIZADA, status.TROCA_EFETUADA];
          break;
        case status.TROCA_EFETUADA:
          options = [status.TROCA_EFETUADA];
          break;
        case status.TROCA_REJEITADA:
          options = [status.TROCA_REJEITADA];
          break;
        case status.CANCELAMENTO_SOLICITADO:
          options = [
            status.CANCELAMENTO_SOLICITADO,
            status.CANCELAMENTO_REJEITADO,
            status.CANCELAMENTO_AUTORIZADO,
          ];
          break;
        case status.CANCELAMENTO_REJEITADO:
          options = [status.CANCELAMENTO_REJEITADO];
          break;
        case status.CANCELAMENTO_AUTORIZADO:
          options = [
            status.CANCELAMENTO_AUTORIZADO,
            status.CANCELAMENTO_EFETUADO,
          ];
          break;
        case status.CANCELAMENTO_EFETUADO:
          options = [status.CANCELAMENTO_EFETUADO];
          break;
        case status.ENTREGA_REALIZADA:
          options = [status.ENTREGA_REALIZADA];
          break;

        default:
          options = [];
          break;
      }
      console.log(" (item.quantidade * item.produto.valor).toFixed(2)", {
        teste: parseFloat((item.quantidade * item.produto.valor).toFixed(2)),
      });
      return (
        <>
          <TextField
            id="outlined-select-currency"
            select
            label="Selecionar"
            value={item.status_nome}
            onChange={(event) => {
              handleOpen(
                row.id,
                parseFloat((item.quantidade * item.produto.valor).toFixed(2)),
                event.target.value,
                item.id
              );
            }}
            fullWidth
            variant="outlined"
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </>
      );
    }
    function Row(props) {
      const { row } = props;
      const [open, setOpen] = React.useState(false);
      const classes = useRowStyles();

      return (
        <React.Fragment>
          <TableRow className={classes.root}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell>
              {row.valor.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell>{moment(row.data).format("DD/MM/YYYY h:mm")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Produto</TableCell>
                        <TableCell>Qtd</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.items.map((item) => (
                        <TableRow key={row.id + "-" + item.id}>
                          <TableCell component="th" scope="row">
                            {item.produto.nome}
                          </TableCell>
                          <TableCell>{item.quantidade}</TableCell>
                          <TableCell>
                            {(
                              item.quantidade * item.produto.valor
                            ).toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </TableCell>
                          <TableCell>{StatusCollumn(row, item)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    }

    return (
      <>
        <Dialog
          open={this.state.open}
          onClose={() => handleClose()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Editar Pedido?</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DialogContentText>
                  Necessário gerar cupom de troca
                </DialogContentText>
              </Grid>
              <Grid item xs={12}>
                <Box
                  style={{
                    backgroundColor: "#F4F6F8",
                    minWidth: "500px",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  {this.state.cupom.codigo}
                </Box>
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  id="outlined-adornment-amount"
                  label="Valor"
                  value={this.state.cupom.valor}
                  onChange={(event) => {
                    this.setState({
                      ...this.state,
                      cupom: {
                        ...this.state.cupom,
                        valor: formatReal(event.target.value),
                      },
                    });
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Tipo"
                  disabled
                  value={this.state.cupom.tipo}
                  fullWidth
                  variant="outlined"
                >
                  {["Promocional", "Troca"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => handleUpdate()} color="primary">
              Editar
            </Button>
          </DialogActions>
        </Dialog>
        {/* Componente da tabela */}
        <TextField
          id="outlined-select-currency"
          select
          label="Selecionar Status"
          onChange={(event) => {
            this.setState({
              ...this.state,
              statusFilter: event.target.value,
            });
          }}
          fullWidth
          variant="outlined"
        >
          {[
            "Em processamento",
            "Pagamento Realizado",
            "Em transporte",
            "Troca solicitada",
            "Troca autorizada",
            "Troca efetuada",
            "Troca Rejeitada",
            "Cancelamento Solicitado",
            "Cancelamento Rejeitado",
            "Cancelamento autorizado",
            "Cancelamento efetuado",
            "Entrega realizada",
          ].map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Pedido</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.statusFilter
                ? this?.state?.data
                    ?.filter(
                      (row) =>
                        row.items.filter(
                          (item) => item.status_nome === this.state.statusFilter
                        ).length
                    )
                    .map((row) => <Row key={row.name} row={row} />)
                : this?.state?.data?.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export default TabelaPedido;
