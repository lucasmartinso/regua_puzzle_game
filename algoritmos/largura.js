//COMPORTAMENTO DE FILA
export function largura(n) { 
    let fichas = ['P','V',null,'V','P'];
    //-------------- DEFINICOES DAS PROPRIEDADES DO ALGORITMO -----------------
    const abertos = [[]]; //vai sendo explorado como uma fila
    const fechados = [[]];
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
    while(j<1) { //
        if(!abertos.length) { 
            console.log("FRACASSO"); 
            sucessFail = false;
            break;
        } else { 
            const primeiroDaLista = abertos.shift(); //fila, firt in fist out
            fechados.push(primeiroDaLista);

            //verifica se eh o estado final
            const indVazio = abertos[abertos.length-1].indexOf(null);
            const somaSe = indVazio > Math.floor(n/2) ? 0 : 1; //se o espaco ta na metade pra frente faz apenas 2 comparacoes, se estiver antes disso faz 3 comparacoes
            const primeiroEstado = abertos[abertos.length-1][0] === null ? abertos[abertos.length-1][1] : abertos[abertos.length-1][0]; //pega o primeiro estado para fazer a comparacao se ate a metade do vetor eh igual 
            let teste = true;
            
            console.log("\nCOMPARACAO: ");
            for(let i=0; i<Math.floor(n/2) + somaSe; i++) {
                if(abertos[abertos.length-1][i] !== null) {
                    console.log(`${primeiroEstado} == ${abertos[abertos.length-1][i]} ???`) 
                    if(primeiroEstado !== abertos[abertos.length-1][i]) { 
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
                        copiaFichas[j] = fichas[j];
                    }

                    const auxTrocaPeca = copiaFichas[indVazio-2]; 
                    copiaFichas[indVazio] = auxTrocaPeca; 
                    copiaFichas[indVazio-2] = null;

                    if(!verificaRepeticaoEstados(caminho,copiaFichas, indVazio) && (!propriedades.backCond || !proibidos[proibidos.length-1].block.includes(0))) {
                        jogatinas.push(0);
                        fichas = copiaFichas;
                        caminho.push(fichas);
                        proibidos.push({estado: fichas, block: []});
                        propriedades.custo += 2;
                        propriedades.expandidos++;
                        propriedades.profundidade++;
                        propriedades.backCond = false;
                        break;
                    }
                }
            }
        }
        j++;
    }



    console.log("ACABOU AQUI");
}