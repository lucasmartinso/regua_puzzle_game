//COMPORTAMENTO DE FILA
export function largura(n, fichas) { 
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

    while(sucessFail !== true || sucessFail !== false) { 
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

            }
        }
    }
}