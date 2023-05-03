import ProdutoDAO from "../dao/ProdutoDAO.js";
import {Produto} from "../dominio/Produto.js";
import ProdutoCategoria from "../dominio/ProdutoCategoria.js";
import _ from "lodash";
import {format} from "date-fns";

class ProdutoController {
    constructor() {}

    async listar() {
        const produtoDAO = new ProdutoDAO();
        return await produtoDAO.listar();
    }

    async adicionar(dados) {
        const produtoDAO = new ProdutoDAO();
        console.log("dadosss", dados);
        const produto = new Produto(
          null,
          dados.nome,
          dados.descricao,
          dados.valor,
          new ProdutoCategoria(dados.categoria_id),
          0
        );
        await produtoDAO.adicionar(produto);
    }

    async obterResumoVendas(produtos,inicio,fim){
        const produtoDAO = new ProdutoDAO();
        let result = await produtoDAO.getQuantidadeVendidaPorProduto(produtos, inicio, fim);
    
    
        let dates = new Set();
        result = result.map( item => {
          let data = format(item.data,'MM/dd/yy')
          dates.add(data)
          return {
            ...item,
            data
          }
        })
        const dadoAgrupadoPorNomeDoProduto = Object.values(_.groupBy(result, 'nome'))
    
        const valores = [];
        dadoAgrupadoPorNomeDoProduto.forEach( (agrupamentoProduto,index) => {
          let valor = [];
          dates.forEach( date => {
            const produtoResumoPorDia = agrupamentoProduto.find( item => item.data === date )
            if(produtoResumoPorDia){
              valor.push(produtoResumoPorDia)
            } else {
              console.log(agrupamentoProduto);
              valor.push({quantidade: 0 , nome: agrupamentoProduto[0].nome, data: date, })
            }
          })
          valor.sort( (a,b) => new Date(a.data).getTime()-new Date(b.data).getTime())
          valores.push(valor);
        })
        return valores;
      }
}
export default ProdutoController