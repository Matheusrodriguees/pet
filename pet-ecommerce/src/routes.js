import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import NotFoundView from "src/views/errors/NotFoundView";

//Páginas de cliente
import Clientes from "src/views/clientes";
import NovoCliente from "src/views/clientes/form";
import EditarCliente from "src/views/clientes/edit";

//Paginas de endereço
import Enderecos from "src/views/enderecos";
import NovoEndereco from "src/views/enderecos/form";

//Paginas de cartões
import Cartoes from "src/views/cartoes";
import NovoCartao from "src/views/cartoes/Tabela";

//Paginas de Cupons
import Cupons from "src/views/cupons";

//Paginas de Pedidos
import Pedidos from "src/views/pedidos";

import Estoque from "src/views/product/ProductListView";
import Estastisticas from "./views/statistics";

//Paginas Produtos

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "inicio", element: <Clientes /> },
      { path: "clientes", element: <Clientes /> },
      { path: "novo-cliente", element: <NovoCliente /> },
      { path: "editar-cliente/:id", element: <NovoCliente /> },
      { path: "enderecos", element: <Enderecos /> },
      { path: "novo-endereco", element: <NovoEndereco /> },
      { path: "cartoes", element: <Cartoes /> },
      { path: "novo-cartao", element: <NovoCartao /> },
      { path: "cupons", element: <Cupons /> },
      { path: "pedidos", element: <Pedidos /> },
      { path: "estoque", element: <Estoque /> },
      { path: "estatisticas", element: <Estastisticas /> },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "login", element: <Navigate to="/404" /> },
      { path: "register", element: <Navigate to="/404" /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/app/inicio" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];
export default routes;
