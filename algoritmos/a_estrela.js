//FIXAR PESO DAS ARESTAS, TA DANDO PROBLEMA NA BUSCA

//IDEIA IGUAL DA BUSCA GULOSA
//SÓ QUE ESTADOS VÃO SER AVALIADOS COM BASE NA SUA HERISTICA + CAMINHO ATE ELES
//HEURISTICA: F(N) = H(N)+ G(N)
//CUSTO += DISTANCIA DAS ARESTAS DO GRAFO PELA ESTRATEGIA DE CONTROLE
export function a_estrela(n, fichas) { 
    // //-------------- DEFINICOES DAS PROPRIEDADES DO ALGORITMO -----------------
    const abertos = [{estado: [], f: heuristica(fichas,0), custo: 0 ,pai: -1}]; //vai sendo explorado como uma pilha
    const fechados = []; //lista de fechados
    let propriedades = { custo: 0, profundidade: 0, expandidos: 1, explorados: 0}; //propriedades do grafo
    let sucessFail = undefined; //sucesso ou fracasso da busca 
 
    for(let i=0; i<n; i++) { 
        abertos[0].estado[i] = fichas[i]; //primeiro estado que vai ser explorado
    }


    //------------------ ALGORTIMO ------------------

    //ESTADO INICIAL: RANDOMICO
    //ESTADO FINAL: MENOR CUSTO PARA QUE PECAS DE UM COR PARA UM LADO E PECAS DA OUTRA COR PARA O OUTRO
    //ESTRATÉGIA DE CONTROLE: Pula para direita(PD), Pula para esquerda(PE), Anda para direita(AD), Anda para esquerda(AE)
    //CUSTO DAS ARESTAS: PD e PE -> +2, AD e AE -> +1

    console.time('TEMPO DE EXECUCAO'); //comeca a marcar o tempo

    const jogadas = ['PD','PE','AD','AE'];
    let it = 0;
    while(it<1) { //sucessFail !== true && sucessFail !== false
        if(!abertos.length) { 
            console.log("FRACASSO"); 
            sucessFail = false;
            break;
        } else { 
            abertos.sort((a, b) => a.f - b.f); //organiza a lista de forma crescente de acordo c/ a heuristica
            const primeiroDaLista = abertos.shift(); //cabeca da lista vertice c/ menor heuristica
            propriedades.explorados++; //mais um no explorado da lista de fechados

            if(!fechados.length) fechados.push(primeiroDaLista);//adiciona c/ heuristica mais barata a lista de fechados p/ ser explorado
            else {
                fechados.push(primeiroDaLista);
            }

            //verifica se eh o estado final
            const indVazio = fechados[fechados.length-1].estado.indexOf(null);
            const somaSe = indVazio > Math.floor(n/2) ? 0 : 1; //se o espaco ta na metade pra frente faz apenas 2 comparacoes, se estiver antes disso faz 3 comparacoes
            const primeiroEstado = fechados[fechados.length-1].estado[0] === null ? fechados[fechados.length-1].estado[1] : fechados[fechados.length-1].estado[0]; //pega o primeiro estado para fazer a comparacao se ate a metade do vetor eh igual 
            let teste = true;
            
            console.log("\nCOMPARACAO: ");
            for(let i=0; i<Math.floor(n/2) + somaSe; i++) {
                if(fechados[fechados.length-1].estado[i] !== null) {
                    console.log(`${primeiroEstado} == ${fechados[fechados.length-1].estado[i]} ???`) 
                    if(primeiroEstado !== fechados[fechados.length-1].estado[i]) { 
                        teste = false;
                        break;
                    }
                }
            }

            if(teste) {
                sucessFail = true;
                console.log("SUCESSO");
                break;
            } else { 
                let possivelCusto = fechados[fechados.length-1].custo; //custo do pai + alguem

                //tenta primeira jogada
                if(indVazio>=2) { //so da pra fazer o salto a direita, se o espaco vazio estiver no minimo 2 posicoes da borda esquerda, ou seja, posicao 2 
                    const copiaFichas = []; 
                    for(let j=0; j<fichas.length; j++) { 
                        copiaFichas[j] = fechados[fechados.length-1].estado[j];
                    }

                    const auxTrocaPeca = copiaFichas[indVazio-2]; 
                    copiaFichas[indVazio] = auxTrocaPeca; 
                    copiaFichas[indVazio-2] = null;

                    const fn = heuristica(copiaFichas, possivelCusto + 2);

                    if(!verificaRepeticaoEstados(fechados, abertos, copiaFichas, indVazio, fn)) {
                        abertos.push({estado: copiaFichas, f: fn, custo: possivelCusto + 2, pai: fechados.length-1});
                        attJogada(propriedades, copiaFichas);
                    }
                }
                
                //tenta a segunda
                if(indVazio<=n-3) { //so da pra fazer o salto a esquerda, se o espaco vazio estiver no max 2 posicoes da borda da direita, ou seja, n-3(antepenultima)
                    const copiaFichas = []; 
                    for(let j=0; j<fichas.length; j++) { 
                        copiaFichas[j] = fechados[fechados.length-1].estado[j];
                    }
    
                    const auxTrocaPeca = copiaFichas[indVazio+2]; 
                    copiaFichas[indVazio] = auxTrocaPeca; 
                    copiaFichas[indVazio+2] = null;

                    const fn = heuristica(copiaFichas, possivelCusto + 2);
                    
                    if(!verificaRepeticaoEstados(fechados, abertos, copiaFichas, indVazio, fn)) {
                        abertos.push({estado: copiaFichas, f: fn, custo: possivelCusto + 2, pai: fechados.length-1});
                        attJogada(propriedades, copiaFichas);
                    }
                }
                
                //tenta a terceira
                if(indVazio>0) { //so da pra andar para esquerda se o espaco vazio nao for a borda esquerda
                    const copiaFichas = []; 
                    for(let j=0; j<fichas.length; j++) { 
                        copiaFichas[j] = fechados[fechados.length-1].estado[j];
                    }
    
                    const auxTrocaPeca = copiaFichas[indVazio-1]; 
                    copiaFichas[indVazio] = auxTrocaPeca; 
                    copiaFichas[indVazio-1] = null;

                    const fn = heuristica(copiaFichas, possivelCusto + 1);
                    
                    if(!verificaRepeticaoEstados(fechados, abertos, copiaFichas, indVazio, fn)) {
                        abertos.push({estado: copiaFichas, f: fn, custo: possivelCusto + 1, pai: fechados.length-1});
                        attJogada(propriedades, copiaFichas);
                    }
                }
    
                //tenta a quarta jogada
                if(indVazio<n-1) { //so da pra andar para direita se o espaco vazio nao for a borda direita
                    const copiaFichas = []; 
                    for(let j=0; j<fichas.length; j++) { 
                        copiaFichas[j] = fechados[fechados.length-1].estado[j];
                    }
    
                    const auxTrocaPeca = copiaFichas[indVazio+1]; 
                    copiaFichas[indVazio] = auxTrocaPeca; 
                    copiaFichas[indVazio+1] = null;

                    const fn = heuristica(copiaFichas, possivelCusto + 1);
                    
                    if(!verificaRepeticaoEstados(fechados, abertos, copiaFichas, indVazio, fn)) {
                        abertos.push({estado: copiaFichas, f: fn, custo: possivelCusto + 1, pai: fechados.length-1});
                        attJogada(propriedades, copiaFichas);
                    }
                }
            }
        }

        console.log("ABERTOS");
        console.log(abertos.sort((a, b) => a.f - b.f));

        console.log("FECHADOS");
        console.log(fechados);

        it++;
    }

    if(sucessFail) {
        const caminho = []; //armazena o caminho de sucesso

        let pais = fechados[fechados.length-1].pai; //pai do ultimo estado
        caminho.unshift(fechados[fechados.length-1]); //adiciona o estado final como primeiro elemento da lista do caminho
        //a ideia é que vai buscando o pai de cada estado e vai o adicionando como primeiro elemento da lista
        while(pais !== -1) { 
            caminho.unshift(fechados[pais]);
            pais = fechados[pais].pai;
            propriedades.profundidade++;
        }

        console.log("CAMINHO: ");
        for(let i=0; i<caminho.length; i++) { 
            console.log(caminho[i],"-->");
        }
        console.log(`\nCUSTO DA OPERACAO: ${propriedades.custo}`);
        console.log(`CUSTO DO CAMINHO: ${fechados[fechados.length-1].custo}`);
        console.log(`PROFUNDIDADE ALCANCADA: ${propriedades.profundidade}`);
        console.log(`NOS VISITADOS ${propriedades.explorados}, NOS EXPANDIDOS ${propriedades.expandidos}`);
        console.log(`VALOR MEDIO DO FATOR DE RAMIFICACAO DA ARVORE DE BUSCA: ${propriedades.expandidos/propriedades.explorados}`);
        console.timeEnd('TEMPO DE EXECUCAO');
    }
}

//A HEURÍSTICA ADOTADA EH:
//1) ACHAR PRIMEIRO SIMBOLO QUALQUER, MENOS O 'NULL'
//2) ACHA A POSICAO DO ULTIMO SIMBOLO IGUAL DO PASSO 1)
//3) SOMA A QUANTIDADE DE SIMBOLOS DIFERENTE INCLUINDO O NULL ENTRE ELES
//4) POSICAO DO PASSO 2) - POSICAO DO PASSO 1) -1(POSICAO LADO A LADO) -nullIsHere(DESCONSIDERAR O NULL POIS ELE NAO INTERFERE SE EH SOLUCAO OU NN)
//5) H(N) = PASSO 3) + PASSO 4)
//6) ADICIONA O CUSTO DA OPERACAO AO PASSO 5)
function heuristica(estadoAtual, possivelCusto) { 
    //PASSO 1)
    let primeiroSimbolo = estadoAtual[0] ? estadoAtual[0] : estadoAtual[1]; //pega o primeiro simbolo ignorando o null
    let indicePrimeiro = estadoAtual[0] ? 0 : 1; //indice do primeiro simbolo 

    //PASSO 2)
    let ultimoIndice = 0; //ultimo ocorrencia do mesmo simbolo do passo 1)
    let nullIsHere = false;
    for(let i=indicePrimeiro; i<estadoAtual.length; i++) { 
        if(estadoAtual[i] === primeiroSimbolo) ultimoIndice = i;
    }
    
    //PASSO 3)
    let diffSimbolos = 0;
    for(let i=indicePrimeiro; i<ultimoIndice; i++) { 
        if(estadoAtual[i] !== primeiroSimbolo && estadoAtual[i]) diffSimbolos++;
        else if(!estadoAtual[i]) nullIsHere = true;

    }

    //PASSO 4) 
    const diffIndices = ultimoIndice - indicePrimeiro -1 -nullIsHere; //-1 pq tem que considerar a posicao lado a lado, nn tem como duas pecas estar na msm posicao

    //PASSO 5)  
    return diffIndices + diffSimbolos + possivelCusto;
}

function verificaRepeticaoEstados(fechados, abertos, fichas, indVazio, fn) {
    for(let i=0; i<fechados.length; i++) { 
        const repetiuFechado = fechados[i].estado.every((value, index) => value === fichas[index]);
        
        //achou um estado repetido, que tem custo maior do que o ja presente na lista de fechados, então poda 
        if(repetiuFechado && fechados[i].f<=fn)
            return true; 
    } 

    return false; //passou por todos estados do caminho e nenhum deles era repetido
}

function attJogada(propriedades, proxEstado) { 
    propriedades.custo += calcCustos(proxEstado);
    propriedades.expandidos++;
}

function calcCustos(proxEstado) {
    const primeiroSimbolo = proxEstado[0] ? proxEstado[0] : proxEstado[1]; //pega o primeiro simbolo ignorando o null
    const indicePrimeiro = proxEstado[0] ? 0 : 1; //indice do primeiro simbolo 
    
    let ultOcorrencia = 0;
    for(let i=indicePrimeiro; i<proxEstado.length; i++) { 
        if(primeiroSimbolo === proxEstado[i])
            ultOcorrencia = i;
    }

    return ultOcorrencia - indicePrimeiro;
}