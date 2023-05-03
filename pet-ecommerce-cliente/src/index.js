import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import PedidoProvider from 'src/providers/PedidoProvider'

ReactDOM.render((
  <BrowserRouter>
  <PedidoProvider>
    <App />
  </PedidoProvider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
