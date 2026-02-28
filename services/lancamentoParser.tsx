// Recebe string trata e retorna, tipo,valor, decricao


import {Lancamento} from '../src/types/Lancamento'


export function LancamentoParser(texto:string): Omit<Lancamento,'data'>{
     const partes=texto.trim().toLowerCase().split(' ')

     if(partes.length<3){
        throw new Error('Use: tipo valor descrição')
     }

     const tipo = partes[0] as 'saida'|'entrada';
     const valor=Number(partes[1])
     const descricao=partes.slice(2).join(' ')

     if(tipo!=='saida' && tipo!=='entrada'){
        throw new Error('Tipo deve ser entrada ou saída')
     }

     if(isNaN(valor)){
        throw new Error('Valor Inválido')
     }

     return{
        tipo,
        valor,
        descricao,
     }
}