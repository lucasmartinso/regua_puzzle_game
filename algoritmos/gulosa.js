//IDEIA IGUAL DA BUSCA GULOSA
//SÓ QUE ESTADOS VÃO SER AVALIADOS COM SEUS CUSTOS
//F(N) = H(N)
//CUSTO += DISTANCIA DAS ARESTAS DO GRAFO PELA ESTRATEGIA DE CONTROLE
export function ordenada(n, fichas) { 

}

//A HEURÍSTICA ADOTADA EH:
//1) ACHAR PRIMEIRO SIMBOLO QUALQUER, MENOS O 'NULL'
//2) ACHA A POSICAO DO ULTIMO SIMBOLO IGUAL DO PASSO 1)
//3) POSICAO DO PASSO 2) - POSICAO DO PASSO 1)
//4) SOMA A QUANTIDADE DE SIMBOLOS DIFERENTE INCLUINDO O NULL ENTRE ELES
//5) H(N) = PASSO 3) + PASSO 4)
function heuristica(estadoAtual) { 
    let primeiroSimbolo = estadoAtual.estado[0] ? estadoAtual.estado[0] : estadoAtual.estado[1];
    let indice = estadoAtual.estado[0] ? 0 : 1; //indice do primeiro simbolo 

    for(let i=0; i<estadoAtual.length; i++) { 

    }
}