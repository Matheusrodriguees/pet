import { findIndex } from 'lodash-es'
import React, { useState, useEffect, useDebugValue } from 'react'
import axiosDefault from 'src/config/axios'

const PedidoContext = React.createContext()

const PedidoProvider = ({children}) => {
    const [carrinho, setCarrinho] = useState([])
    const [subtotal, setSubtotal] = useState(null)
    const [total, setTotal] = useState(null)
    const [endereco, setEndereco] = useState(null)
    const [pagamento, setPagamento] = useState([])
    const [desconto, setDesconto] = useState(0)
    const [frete, setFrete] = useState(null)
    const [parcela, setParcela] = useState(null)
    const [itensCancelados, setItensCancelados] = useState([])
    const [gamb, setGamb]=useState(0)

    useEffect(() => {
        calculaProdutos()
    }, [carrinho]);

    useEffect(() => {
        calculaTotal()
        console.log('frete', frete)
    }, [subtotal, frete, desconto]);

    useEffect(() => {
        console.log('carrinho', carrinho)
        console.log('itensCancelados', itensCancelados)
    }, [carrinho, itensCancelados]);

    useEffect(() => {
        if(endereco?.estado){
            calculaFrete()
        }       
    }, [endereco?.estado]);

    useEffect(() => {
        validaTempoCarrinho()
    }, [gamb]);
    function calculaProdutos(){
        let valor = 0;
        if(carrinho && carrinho.length > 0)
        for (const item of carrinho) {
            valor += item.quantidade * item.valor
        }
        setSubtotal(valor)
    }

    function calculaTotal(){
        if(frete){
            setTotal(subtotal + frete?.valor - desconto)
        }else{
            setTotal(subtotal - desconto)
        }
        
    }

    function limpar(){
        setCarrinho([])
        setSubtotal(null)
        setTotal(null)
        setEndereco(null)
        setPagamento([])
        setDesconto(0)
        setFrete(null)
        setParcela(null)
    }

    function calculaDescontos(valor){
        let totalDesconto = valor + desconto 
        setDesconto(totalDesconto)
    }

    async function calculaFrete(){
        const {data} = await axiosDefault(`/frete`)
        let estado = data.find(item => item.estado == endereco.estado)
        setFrete(estado)
        console.log('estado', data)
    }

    function deletarItem(index){
        let auxCarrinho = [...carrinho]
        auxCarrinho.splice(index, 1);
        setCarrinho(auxCarrinho)
    }

    function adicionar(produto){
        let index = carrinho.findIndex(item => item.id == produto.id)
        console.log('carrinho index', index)
        if(index != -1){
            let auxCarrinho = [...carrinho]
            auxCarrinho[index].quantidade += 1 
            auxCarrinho[index].tempoCarrinho = Date.now()
            setCarrinho(auxCarrinho)
        }else{
            let auxCarrinho = [...carrinho]
            produto.quantidade = 1
            produto.tempoCarrinho = Date.now()
            auxCarrinho.push(produto) 
            setCarrinho(auxCarrinho)
        }
    }


    async function cancelarItem(item){
        let cloneCancelados = [...itensCancelados]
        cloneCancelados.push(item)
        setItensCancelados(cloneCancelados)
    }

    async function validaTempoCarrinho() {
        // console.log('validaTempoCarrinho')
        var tempoMaximo = 120000
        let indexsCancelados = []
        if(carrinho.length > 0){
            for(let i=0; i<=carrinho.length; i++){
                if((Date.now() - tempoMaximo) > carrinho[i]?.tempoCarrinho){
                    await cancelarItem(carrinho[i])
                    indexsCancelados.push(i)
                }
            }
            for (const index of indexsCancelados) {
                deletarItem(index)
            }
        }
    };
    

    setInterval(function(){
        setGamb(gamb+1)
    }, 60000);


    function adicionarCartao(cartao){
        let qtdeCartao = pagamento?.filter(item => item.pagTipo == 'cartao')
        if(qtdeCartao.length == 0 ){
            let auxPagamento = [...pagamento]
            cartao.pagTipo='cartao'
            auxPagamento.push(cartao)
            setPagamento(auxPagamento)
        }else if (qtdeCartao.length == 1) {
            if(!pagamento?.find(item => item.numero == cartao.numero && total > 10)){
                let auxPagamento = [...pagamento]
                cartao.pagTipo='cartao'
                auxPagamento.push(cartao)
                setPagamento(auxPagamento)
            }
        }else{
            return
        }
    }

    async function adicionarCupom(cupom){
        let result = await validaCupom(cupom)
        if(!result) return null
        let cuponsUtilizados = pagamento.filter(item => item.pagTipo == 'cupom')
        if(!cuponsUtilizados.find(item => item.codigo == cupom)){
            if(result){
                if(desconto < subtotal){
                    let auxPagamento = [...pagamento]
                    result.pagTipo='cupom'
                    auxPagamento.push(result)
                    setPagamento(auxPagamento)
                    calculaDescontos(result.valor)
                    return result
                }else{
                    return null
                }                
            }else{
                return null
            }
        }  
    }

    async function validaCupom(cupom){
        const {data} = await axiosDefault.get('/cupom/cliente/43')
        console.log('cupons', data)
        const result = data.find(item => item.codigo == cupom)
        let cuponsUtilizados = pagamento.filter(item => item.pagTipo == "cupom")
        let promo =  cuponsUtilizados?.filter(item => item.tipo == "Promocional")
        console.log('promo', promo)
        console.log('1 if', result && result.status != "Utilizado")
        if(result && result.status != "Utilizado"){
            if(result.tipo == 'Promocional' && promo.length < 1){
                return result
            }else if(result.tipo == 'Troca'){
                return result
            }
            else{
                return null
            }   
        }else{
            return null
        }
    }

    return <PedidoContext.Provider value = {{
        carrinho, 
        total, 
        subtotal,
        endereco,
        pagamento,
        frete,
        desconto,
        parcela,
        itensCancelados,
        setCarrinho, 
        deletarItem, 
        adicionar, 
        setEndereco,
        adicionarCartao,
        adicionarCupom,
        setParcela,
        limpar
    }}>
        {children}
    </PedidoContext.Provider>
}
export default PedidoProvider

export {PedidoContext}