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
import { Grid, Box, MenuItem, TextField, makeStyles } from "@material-ui/core";
class TabelaCupom extends React.Component {
  //Construtor da classe da tabela
  //data: valores da tabela (clientes)
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      cupom: {
        codigo: null,
        valor: null,
        tipo: null,
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
    const handleOpen = (data) => {
      this.setState({
        ...this.state,
        open: true,
        cupom: {
          codigo: data.codigo,
          valor: formatReal(removeFormat(data.valor)),
          tipo: data.tipo,
        },
      });
    };
    const handleClose = () => {
      this.setState({
        ...this.state,
        open: false,
        cupom: { codigo: null, valor: null, tipo: null },
      });
    };

    const handleUpdate = () => {
      const cupomToSaev = {
        ...this.state.cupom,
        valor: formatDouble(this.state.cupom.valor),
      };

      axios
        .put(`/cupom/${this.state.cupom.codigo}`, { cupom: cupomToSaev })
        .then((response) => {
          const newDataList = this.state.data.map((cupom) => {
            if (this.state.cupom.codigo === cupom.codigo) {
              return {
                ...this.state.cupom,
                valor: "R$ " + this.state.cupom.valor,
              };
            } else {
              return cupom;
            }
          });

          this.setState({});
        })
        .catch((error) => {
          console.log("algum problema");
        })
        .finally(() => {
          this.setState({
            ...this.state,
            open: false,
            cupom: { codigo: null, valor: null, tipo: null },
          });
        });
    };

    const formatDouble = (i) => {
      i = i.replace(".", "");
      i = i.replace(",", ".");
      return i;
    };
    const formatReal = (i) => {
      var v = i.replace(/\D/g, "");
      v = (v / 100).toFixed(2) + "";
      v = v.replace(".", ",");
      v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
      v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
      return v;
    };

    const removeFormat = (i) => {
      i = i.replace("", "");
      i = i.replace("$", "");
      i = i.replace("R", "");
      i = i.replace(".", "");
      i = i.replace(",", "");
      return i;
    };

    // Definição das colunas e valores da tabela
    // Name: nome no objeto
    // Label: nome da coluna na tabela
    // Option: opções da coluna (se pode ser um filtro, ordernada etc)
    const columns = [
      {
        name: "Ações",
        options: {
          filter: false,
          sort: false,
          empty: true,
          //customBodyRenderLite é utilizado quando a informação da célula será customizada
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <div>
                {/* Ao clicar no icone o usuário é redirecionado para tela de editar */}
                <CreateIcon
                  style={{ fill: "#000" }}
                  onClick={async () => {
                    let auxData = this.state.data;
                    handleOpen(auxData[dataIndex]);
                  }}
                />
                {/* Ao clicar no icone e confirmando mensagem o status do usuário é alterado para inativo */}
                <DeleteOutlineIcon
                  style={{ fill: "#000", marginRight: "10" }}
                  onClick={async () => {
                    let auxData = this.state.data;
                    axios.delete(`/cupom/${auxData[dataIndex].codigo}`);
                    this.setState({
                      ...this.state,
                      data: auxData.filter(
                        (e) => e.codigo !== auxData[dataIndex].codigo
                      ),
                    });
                  }}
                />
              </div>
            );
          },
        },
      },
      {
        name: "codigo",
        label: "Código",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "valor",
        label: "Valor",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "tipo",
        label: "Tipo",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "status",
        label: "Status",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "pedido_id",
        label: "Pedido Origem",
        options: {
          filter: true,
          sort: true,
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
          <DialogTitle id="form-dialog-title">Novo cupom</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DialogContentText>Editar cupom?</DialogContentText>
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
                  label="Select"
                  value={this.state.cupom.tipo}
                  onChange={(event) => {
                    this.setState({
                      ...this.state,
                      cupom: { ...this.state.cupom, tipo: event.target.value },
                    });
                  }}
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
          title={"Cupons"}
          data={this.state.data}
          columns={columns}
          options={options}
        />
      </>
    );
  }
}
export default TabelaCupom;
