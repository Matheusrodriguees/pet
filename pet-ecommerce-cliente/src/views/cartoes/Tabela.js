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

class TabelaCartao extends React.Component {

  //Construtor da classe da tabela
  //data: valores da tabela (cartoes)
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
                <RouterLink to={'/app/editar-cliente'}>
                  <CreateIcon
                    style={{ fill: "#000" }}                 
                  />
                </RouterLink>
                {/* Ao clicar no icone e confirmando mensagem o status do usuário é alterado para inativo */}
                <DeleteOutlineIcon
                  style={{ fill: "#000", marginRight: "10" }}
                  onClick={async () => {
                    if (window.confirm("Deseja realmente inativar este cliente?")) {
                      let auxData = this.props.data
                      axios.put('/cartao/inativar', {id: auxData[dataIndex].id} )                      
                    //seta usuario como inativo na linha escolhida
                      auxData[dataIndex].status = 'Inativo'
                    //atualiza dados da tabela
                      this.setState({ data: auxData });
                    }
                  }}
                />
              </div>
            );
          },
        },
      },
      {
        name: "id",
        label: "ID",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "numero",
        label: "Numero",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "nome",
        label: "Nome",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "bandeira_id",
        label: "Bandeira",
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
                <div>
                    Visa
                </div>
            )
           },
        },
      },
      {
        name: "cvv",
        label: "CVV",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "principal",
        label: "Principal",
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
                <div>
                    {this.props.data[dataIndex].princpal == 1 ? "Sim" : "Não"}
                </div>
            )
           },
        },
      },
      {
        name: "cliente",
        label: "Cliente",
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
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
                <div>
                    {this.props.data[dataIndex].status == 1 ? "Ativo" : "Inativo"}
                </div>
            )
           },
        },
      },
      {
        name: "criado_em",
        label: "Criado",
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
                <div>
                    {moment(this.props.data[dataIndex].criado_em).format('DD/MM/YYYY h:mm')}
                </div>
            )
           },
        },
      },
      {
        name: "atualizado_em",
        label: "Atualizado",
        options: {
          filter: true,
          sort: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
                <div>
                    {moment(this.props.data[dataIndex].atualizado_em).format('DD/MM/YYYY h:mm')}
                </div>
            )
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
      //Componente da tabela
      <MUIDataTable
        title={"Cartões"}
        data={this.props.data}
        columns={columns}
        options={options}
      />
    );
  }
}
export default TabelaCartao;
