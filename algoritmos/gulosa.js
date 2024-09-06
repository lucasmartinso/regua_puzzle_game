//IDEIA IGUAL DA BUSCA GULOSA
//SÓ QUE ESTADOS VÃO SER AVALIADOS COM SEUS CUSTOS
//F(N) = H(N)
//CUSTO += DISTANCIA DAS ARESTAS DO GRAFO PELA ESTRATEGIA DE CONTROLE
export function gulosa(n) { 
    let fichas = { estado: ['A',null,'P','P','A'], f: null, custo: 0 ,pai: -1};

    console.log(heuristica(fichas));
}

//A HEURÍSTICA ADOTADA EH:
//1) ACHAR PRIMEIRO SIMBOLO QUALQUER, MENOS O 'NULL'
//2) ACHA A POSICAO DO ULTIMO SIMBOLO IGUAL DO PASSO 1)
//3) POSICAO DO PASSO 2) - POSICAO DO PASSO 1) -1(POSICAO LADO A LADO) -nullIsHere(DESCONSIDERAR O NULL POIS ELE NAO INTERFERE SE EH SOLUCAO OU NN)
//4) SOMA A QUANTIDADE DE SIMBOLOS DIFERENTE INCLUINDO O NULL ENTRE ELES
//5) H(N) = PASSO 3) + PASSO 4)
function heuristica(estadoAtual) { 
    //PASSO 1)
    let primeiroSimbolo = estadoAtual.estado[0] ? estadoAtual.estado[0] : estadoAtual.estado[1]; //pega o primeiro simbolo ignorando o null
    let indicePrimeiro = estadoAtual.estado[0] ? 0 : 1; //indice do primeiro simbolo 

    //PASSO 2)
    let ultimoIndice = 0; //ultimo ocorrencia do mesmo simbolo do passo 1)
    let nullIsHere = false;
    for(let i=indicePrimeiro; i<estadoAtual.estado.length; i++) { 
        if(estadoAtual.estado[i] === primeiroSimbolo) ultimoIndice = i;
        else if(!estadoAtual.estado[i]) nullIsHere = true;
    }

    //PASSO 3) 
    const diffIndices = ultimoIndice - indicePrimeiro -1 -nullIsHere; //-1 pq tem que considerar a posicao lado a lado, nn tem como duas pecas estar na msm posicao
    
    //PASSO 4)
    let diffSimbolos = 0;
    for(let i=0; i<ultimoIndice; i++) { 
        if(estadoAtual.estado[i] !== primeiroSimbolo && estadoAtual.estado[i]) 
            diffSimbolos++;
    }

    //PASSO 5)  
    return diffIndices + diffSimbolos;
}