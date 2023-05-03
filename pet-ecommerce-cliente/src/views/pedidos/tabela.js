import React, { Component, Fragment, useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Chip from "@material-ui/core/Chip";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CreateIcon from "@material-ui/icons/Create";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Box } from "react-feather";
import { makeStyles, Typography } from "@material-ui/core";
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import moment from 'moment'
import axios from "../../config/axios"

class TabelaClientes extends React.Component {

  //Construtor da classe da tabela
  //data: valores da tabela (clientes)
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }

  //Caso ocorra uma alteração na quantidade de linhas da tabela os dados são atualizados
  componentDidUpdate(prevProps) {
    if (this.props.data.length !== prevProps.data.length) {
      this.setState({ data: this.props.data });
    }
  }
  render() {
   
    // Definição das colunas e valores da tabela
    // Name: nome no objeto 
    // Label: nome da coluna na tabela
    // Option: opções da coluna (se pode ser um filtro, ordernada etc)
    const columns = [
      {
        name: "id",
        label: "Pedido",
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
                <div>
                    <RouterLink to ={`/app/detalhe-pedido/${this.props.data[dataIndex].id}`}>
                        {this.props.data[dataIndex].id}
                    </RouterLink>
                </div>
            )
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
                    {moment(this.props.data[dataIndex].data).format('DD/MM/YYYY')}
                </div>
            )
           },
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
      // {
      //   name: "status",
      //   label: "Status",
      //   options: {
      //     filter: true,
      //     sort: true,
      //     customBodyRenderLite: (dataIndex, rowIndex) => {
      //       return (
      //           <div>
      //               {this.props.data[dataIndex].status.name}
      //           </div>
      //       )
      //      },
      //   },
      // },     
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
      //Componente da tabela
      <MUIDataTable
        title={"Pedidos"}
        data={this.props.data}
        columns={columns}
        options={options}
      />
    );
  }
}
export default TabelaClientes;
