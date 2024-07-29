//COMPORTAMENTO DE FILA
export function largura(n) { 
    let fichas = ['P','V',null,'V','P'];
    //-------------- DEFINICOES DAS PROPRIEDADES DO ALGORITMO -----------------
    const abertos = [[]]; //vai sendo explorado como uma fila
    const fechados = [];
    let sucessFail = undefined;

    for(let i=0; i<n; i++) { 
        abertos[0][i] = fichas[i]; //primeiro estado que vai ser explorado
    }

    //------------------ ALGORTIMO ------------------

    //ESTADO INICIAL: RANDOMICO
    //ESTADO FINAL: PECAS DE UM COR PARA UM LADO E PECAS DA OUTRA COR PARA O OUTRO - ignora o espaco vazio
    //ESTRATÉGIA DE CONTROLE: Pula para direita(PD), Pula para esquerda(PE), Anda para direita(AD), Anda para esquerda(AE)

    const jogadas = ['PD','PE','AD','AE'];
    let j = 0;
    while(j<=0) { //
        if(!abertos.length) { 
            console.log("FRACASSO"); 
            sucessFail = false;
            break;
        } else { 
            const primeiroDaLista = abertos.shift(); //fila, firt in fist out
            if(!fechados.length) fechados.push({estado: primeiroDaLista, pai: -1});
            else {
                const idPai = fechados.length-1;
                fechados.push({ estado: primeiroDaLista, pai: idPai });
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
                //tenta primeira jogada
                if(indVazio>=2) { //so da pra fazer o salto a direita, se o espaco vazio estiver no minimo 2 posicoes da borda esquerda, ou seja, posicao 2 
                    console.log("JOGADA 1");

                    const copiaFichas = []; 
                    for(let j=0; j<fichas.length; j++) { 
                        copiaFichas[j] = fechados[fechados.length-1].estado[j];
                    }

                    const auxTrocaPeca = copiaFichas[indVazio-2]; 
                    copiaFichas[indVazio] = auxTrocaPeca; 
                    copiaFichas[indVazio-2] = null;

                    if(!verificaRepeticaoEstados(fechados,copiaFichas, indVazio)) {
                        abertos.push(copiaFichas);
                    }
                }

                if(indVazio<=n-3) { //so da pra fazer o salto a esquerda, se o espaco vazio estiver no max 2 posicoes da borda da direita, ou seja, n-3(antepenultima)
                    console.log("JOGADA 2");

                    const copiaFichas = []; 
                    for(let j=0; j<fichas.length; j++) { 
                        copiaFichas[j] = fechados[fechados.length-1].estado[j];
                    }
    
                    const auxTrocaPeca = copiaFichas[indVazio+2]; 
                    copiaFichas[indVazio] = auxTrocaPeca; 
                    copiaFichas[indVazio+2] = null;
                    
                    if(!verificaRepeticaoEstados(fechados, copiaFichas, indVazio)) {
                        abertos.push(copiaFichas);
                    }
                }
            }
        }
        //FALTA A JOGADA 3 E 4
        j++;
        console.log(fechados);
        console.log(abertos);
    }



    console.log("ACABOU AQUI");
}

function attJogada(jogatinas, jogada, propriedades, custo) { 
    jogatinas.push(jogada);
    propriedades.custo += custo;
    propriedades.expandidos++;
    propriedades.profundidade++;
    propriedades.backCond = false;
}

function verificaRepeticaoEstados(fechados, fichas, indVazio) {
    for(let i=0; i<fechados.length; i++) { 
        const repetiu = fechados[i].estado.every((value, index) => value === fichas[index]);

        if(repetiu) return true; //achou um estado repetido
    }

    return false; //passou por todos estados do caminho e nenhum deles era repetido
}