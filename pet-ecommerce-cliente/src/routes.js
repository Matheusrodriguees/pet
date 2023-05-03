import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import NotFoundView from 'src/views/errors/NotFoundView';

//Páginas de cliente
import Clientes from 'src/views/clientes'
import NovoCliente from 'src/views/clientes/form'
import EditarCliente from 'src/views/clientes/edit'

//Paginas de endereço
import Enderecos from 'src/views/enderecos'
import NovoEndereco from 'src/views/enderecos/form'

//Paginas de cartões
import Cartoes from 'src/views/cartoes'
import NovoCartao from 'src/views/cartoes/Tabela'

//Paginas Produtos
import Produtos from 'src/views/produtos'
import DetalheProduto from 'src/views/produtos/detalhes'

//Paginas Pedido
import Carrinho from 'src/views/pedidos/carrinho'
import ResumoPedido from  'src/views/pedidos/resumoPedido'
import ConfimaPedido from 'src/views/pedidos/confirmacaoPedido'
import DetalhePedido from 'src/views/pedidos/detalhe'
import Pedidos from 'src/views/pedidos/index'

//Paginas Cupons 
import Cupons from 'src/views/cupons'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'inicio', element: <Produtos /> },
      { path: 'clientes', element: <Clientes /> },
      { path: 'novo-cliente', element: <NovoCliente /> },
      { path: 'editar-cliente/:id', element: <NovoCliente /> },
      { path: 'enderecos', element: <Enderecos /> },
      { path: 'novo-endereco', element: <NovoEndereco /> },
      { path: 'cartoes', element: <Cartoes /> },
      { path: 'novo-cartao', element: <NovoCartao /> },
      { path: 'detalhe-produto/:id', element: <DetalheProduto /> },
      { path: 'carrinho', element: <Carrinho /> },
      { path: 'resumo-pedido', element: <ResumoPedido /> },
      { path: 'confirma-pedido/:numero', element: <ConfimaPedido /> },
      { path: 'detalhe-pedido/:numero', element: <DetalhePedido /> },
      { path: 'pedidos', element: <Pedidos /> },
      { path: 'cupons', element: <Cupons /> },
    ]
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'login', element: <Navigate to="/404" /> },
      { path: 'register', element: <Navigate to="/404" /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/inicio" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
]
;

export default routes;
