import React, { Component, Fragment, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { NavLink as RouterLink, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import axios from "../../config/axios";
import CreateIcon from "@material-ui/icons/Create";
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
      cupom: {
        codigo: null,
        valor: null,
        tipo: "Troca",
      },
      open: false,
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
    const handleOpen = (id, valor, novostatus) => {
      console.log("valoor handle open", valor);
      const newCode = uuidv4().toUpperCase();
      if (novostatus === status.TROCA_AUTORIZADA) {
        this.setState({
          ...this.state,
          open: true,
          pedido: { id, status: novostatus },
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
          cupom: {
            codigo: newCode,
            tipo: "Troca",
            valor: valor.toLocaleString("de-DE", { minimumFractionDigits: 2 }),
          },
        });
      } else {
        this.setState(
          { ...this.state, open: false, pedido: { id, status: novostatus } },
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
        };
      }

      console.log("state pedido", this.state.pedido);

      axios
        .patch(`/pedido/${this.state.pedido.id}`, {
          pedido: this.state.pedido,
          cupom: formatedCupom,
        })
        .then((response) => {
          const newDataList = this.state.data.map((pedido) => {
            if (this.state.pedido.id === pedido.id) {
              return { ...pedido, status: { name: this.state.pedido.status } };
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

    const columns = [
      {
        name: "id",
        label: "Número Pedido",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "Produto",
        options: {
          filter: false,
          sort: false,
          empty: true,
          //customBodyRenderLite é utilizado quando a informação da célula será customizada
          customBodyRenderLite: (dataIndex, rowIndex) => {
            let auxData = this.state.data;
            return auxData[dataIndex]?.items.map((item, index) => {
              if (auxData[dataIndex]?.items.length != index + 1) {
                return item.produto.nome + ",";
              } else {
                return item.produto.nome;
              }
            });
          },
        },
      },
      {
        name: "Qtd",
        options: {
          filter: false,
          sort: false,
          empty: true,
          //customBodyRenderLite é utilizado quando a informação da célula será customizada
          customBodyRenderLite: (dataIndex, rowIndex) => {
            let auxData = this.state.data;
            let soma = 0;
            for (
              let index = 0;
              index < auxData[dataIndex]?.items.length;
              index++
            ) {
              soma += auxData[dataIndex]?.items[index].quantidade;
            }

            return soma;
          },
        },
      },
      {
        name: "valor",
        label: "Valor",
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <div>
                {this.state.data[dataIndex].valor.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            );
          },
        },
      },
      {
        name: "data",
        label: "Data",
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <div>
                {moment(this.state.data[dataIndex].data).format(
                  "DD/MM/YYYY h:mm"
                )}
              </div>
            );
          },
        },
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            let options;
            switch (this.state.data[dataIndex].status.name) {
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

            return (
              <>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Selecionar"
                  value={this.state.data[dataIndex].status.name}
                  onChange={(event) => {
                    handleOpen(
                      this.state.data[dataIndex].id,
                      this.state.data[dataIndex].valor,
                      event.target.value
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
          },
        },
      },
    ];

    //Configurações da tabela
    const options = {
      textLabels: {
        body: {
          noMatch: "Nenhum dado encontrado",
          toolTip: "Ordernar",
          columnHeaderTooltip: (column) => `Ordernar por ${column.label}`,
        },
        pagination: {
          next: "Próxima página",
          previous: "Pagina Anterior",
          rowsPerPage: "Linhas por página",
          displayRows: "de",
        },
        toolbar: {
          search: "Pesquisar",
          downloadCsv: "Baixar CSV",
          print: "Imprimir",
          viewColumns: "Colunas",
          filterTable: "Filtrar",
        },
        filter: {
          all: "Todos",
          title: "Filtros",
          reset: "Limpar",
        },
        viewColumns: {
          title: "Mostrar colunas",
          titleAria: "Mostrar/Ocultar Colunas",
        },
      },
      filterType: "multiselect",
      selectableRows: false,
      onDownload: (buildHead, buildBody, columns, data) => {
        return "\uFEFF" + buildHead(columns) + buildBody(data);
      },
    };

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
        <MUIDataTable
          title={"Pedidos"}
          data={this.state.data}
          columns={columns}
          options={options}
        />
      </>
    );
  }
}
export default TabelaPedido;
