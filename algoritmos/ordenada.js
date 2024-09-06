//MELHOR CAMINHO = MAIS BARATO 
export function ordenada(n, fichas) { 
    //-------------- DEFINICOES DAS PROPRIEDADES DO ALGORITMO -----------------
    const abertos = [{estado: [], custo: 0, pai: -1}]; //vai sendo explorado como uma pilha
    const fechados = [];
    let propriedades = { custo: 0, profundidade: 0, expandidos: 1, explorados: 0};
    let sucessFail = undefined;

    for(let i=0; i<n; i++) { 
        abertos[0].estado[i] = fichas[i]; //primeiro estado que vai ser explorado
    }

    //------------------ ALGORTIMO ------------------

    //ESTADO INICIAL: RANDOMICO
    //ESTADO FINAL: MENOR CUSTO PARA QUE PECAS DE UM COR PARA UM LADO E PECAS DA OUTRA COR PARA O OUTRO
    //ESTRATÉGIA DE CONTROLE: Pula para direita(PD), Pula para esquerda(PE), Anda para direita(AD), Anda para esquerda(AE)
    //ARESTAS: PD e PE -> +2, AD e AE -> +1

    console.time('TEMPO DE EXECUCAO'); //comeca a marcar o tempo

    const jogadas = ['PD','PE','AD','AE'];
    while(sucessFail !== true && sucessFail !== false) {
        if(!abertos.length) { 
            console.log("FRACASSO"); 
            sucessFail = false;
            break;
        } else { 
            abertos.sort((a, b) => a.custo - b.custo); //organiza a lista de forma crescente
            const primeiroDaLista = abertos.shift(); //cabeca da lista vertice mais barato
            propriedades.explorados++; //mais um no explorado da lista de fechados

            if(!fechados.length) fechados.push(primeiroDaLista);//adiciona mais barato a lista de fechados p/ ser explorado
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
                        attJogada(propriedades, 2);
                    }

                    const auxTrocaPeca = copiaFichas[indVazio-2]; 
                    copiaFichas[indVazio] = auxTrocaPeca; 
                    copiaFichas[indVazio-2] = null;

                    if(!verificaRepeticaoEstados(fechados, abertos, copiaFichas, indVazio, possivelCusto + 2)) {
                        abertos.push({estado: copiaFichas, custo: possivelCusto + 2, pai: fechados.length-1});
                        attJogada(propriedades, 2);
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
                    
                    if(!verificaRepeticaoEstados(fechados, abertos, copiaFichas, indVazio, possivelCusto + 2)) {
                        abertos.push({estado: copiaFichas, custo: possivelCusto + 2, pai: fechados.length-1});
                        attJogada(propriedades, 1);
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
                    
                    if(!verificaRepeticaoEstados(fechados, abertos, copiaFichas, indVazio, possivelCusto + 1)) {
                        abertos.push({estado: copiaFichas, custo: possivelCusto + 1, pai: fechados.length-1});
                        attJogada(propriedades, 1);
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
                    
                    if(!verificaRepeticaoEstados(fechados, abertos, copiaFichas, indVazio, possivelCusto + 1)) {
                        abertos.push({estado: copiaFichas, custo: possivelCusto + 1, pai: fechados.length-1});
                    }
                }
            }
        }

        console.log("ABERTOS");
        console.log(abertos.sort((a, b) => a.custo - b.custo));

        console.log("FECHADOS");
        console.log(fechados);
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
        console.log(`PROFUNDIDADE ALCANCADA: ${propriedades.profundidade}`);
        console.log(`NOS VISITADOS ${propriedades.explorados}, NOS EXPANDIDOS ${propriedades.expandidos}`);
        console.log(`VALOR MEDIO DO FATOR DE RAMIFICACAO DA ARVORE DE BUSCA: ${propriedades.expandidos/propriedades.explorados}`);
        console.timeEnd('TEMPO DE EXECUCAO');
    }
}

function verificaRepeticaoEstados(fechados, abertos, fichas, indVazio, possivelCusto) {
    for(let i=0; i<fechados.length; i++) { 
        const repetiuFechado = fechados[i].estado.every((value, index) => value === fichas[index]);
        
        //achou um estado repetido, que tem custo maior do que o ja presente na lista de fechados, então poda 
        if(repetiuFechado && fechados[i].custo<=possivelCusto)
            return true; 
    } 

    return false; //passou por todos estados do caminho e nenhum deles era repetido
}

function attJogada(propriedades, custo) { 
    propriedades.custo += custo;
    propriedades.expandidos++;
}