export function backtracking(n, fichas) { 
    //let fichas = ['P','V',null,'V','P'];
    //-------------- DEFINICOES DAS PROPRIEDADES DO ALGORITMO -----------------
    let custo = 0; 
    let profundidade = 0; 
    let sucessFail = undefined;
    const caminho = [[]];
    const aberta = [[]]; //nos expandidos
    const fechada = [[]]; //nos visitados
    const estInicial = [[]]; 

    //define o estado inicial
    console.log(`ESTADO INICIAL: ${fichas}\n`);
    for(let i=0; i<n; i++) { 
        estInicial[i] = fichas[i];
        caminho[0][i] = fichas[i];
        aberta[0][i] = fichas[i];
        fechada[0][i] = fichas[i];
    }
    //------------------ ALGORTIMO ------------------

    //ESTADO INICIAL: RANDOMICO
    //ESTADO FINAL: PECAS DE UM COR PARA UM LADO E PECAS DA OUTRA COR PARA O OUTRO - ignora o espaco vazio
    //ESTRATÉGIA DE CONTROLE: Pula para direita(PD), Pula para esquerda(PE), Anda para direita(AD), Anda para esquerda(AE)

    const jogadas = ['PD','PE','AD','AE'];
    while(sucessFail !== true && sucessFail !== false) { 
        //verifica se eh o estado final
        const indVazio = fichas.indexOf(null);
        const somaSe = indVazio / (n/2) ? 0 : 1; 
        const primeiroEstado = fichas[0] === null ? fichas[1] : fichas[0]; //pega o primeiro estado para fazer a comparacao se ate a metade do vetor eh igual 
        let teste = true;
        console.log("\nCOMPARACAO: ");
        for(let i=0; i<fichas.length/2 + somaSe; i++) {
            if(fichas[i] !== null) {
                console.log(`${primeiroEstado} == ${fichas[i]} ???`) 
                if(primeiroEstado !== fichas[i]) { 
                    teste = false;
                    break;
                }
            }
        }

        if(teste) {
            sucessFail = true;
            console.log("SUCESSO");
            break;
        }


        //faz jogada 
        for(let i=0; i<jogadas.length; i++) {
            const indVazio = fichas.indexOf(null); //indice do espaco vazio

            //cria uma copia das fichas atuais
            const copiaFichas = []; 
            for(let j=0; j<fichas.length; j++) { 
                copiaFichas[j] = fichas[j];
            }

            //tenta primeira jogada
            if(i==0 && indVazio>=2) { //so da pra fazer o salto a direita, se o espaco vazio estiver no minimo 2 posicoes da borda esquerda, ou seja, posicao 2 
                console.log("JOGADA 1");
                const auxTrocaPeca = copiaFichas[indVazio-2]; 
                copiaFichas[indVazio] = auxTrocaPeca; 
                copiaFichas[indVazio-2] = null;

                if(!verificaRepeticaoEstados(caminho,copiaFichas, indVazio)) {
                    fichas = copiaFichas;
                    caminho.push(fichas);
                    break;
                }
            }

            //tenta a segunda jogada
            else if(i==1 && indVazio<=n-3) { //so da pra fazer o salto a esquerda, se o espaco vazio estiver no max 2 posicoes da borda da direita, ou seja, n-3(antepenultima)
                console.log("JOGADA 2");
                const auxTrocaPeca = copiaFichas[indVazio+2]; 
                copiaFichas[indVazio] = auxTrocaPeca; 
                copiaFichas[indVazio+2] = null;

                if(!verificaRepeticaoEstados(caminho,copiaFichas, indVazio)) {
                    fichas = copiaFichas;
                    caminho.push(fichas);
                    break;
                }
            }

            //tenta a terceira jogada
            else if(i==2 && indVazio>0) { //so da pra andar para esquerda se o espaco vazio nao for a borda esquerda
                console.log("JOGADA 3");
                const auxTrocaPeca = copiaFichas[indVazio-1]; 
                copiaFichas[indVazio] = auxTrocaPeca; 
                copiaFichas[indVazio-1] = null;

                if(!verificaRepeticaoEstados(caminho,copiaFichas, indVazio)) {
                    fichas = copiaFichas;
                    caminho.push(fichas);
                    break;
                }
            }

            //tenta a quarta jogada
            else if(i==3 && indVazio<n-1) { //so da pra andar para direita se o espaco vazio nao for a borda direita
                console.log("JOGADA 4");
                const auxTrocaPeca = copiaFichas[indVazio+1]; 
                copiaFichas[indVazio] = auxTrocaPeca; 
                copiaFichas[indVazio+1] = null;

                if(!verificaRepeticaoEstados(caminho,copiaFichas, indVazio)) {
                    fichas = copiaFichas;
                    caminho.push(fichas);
                    break;
                } 
            } 
            
            else { //backtracking, se nao da pra fazer nenhuma das anteriores
                console.log("BACKTRACKING");
                fichas = caminho.pop();
            }
            //console.log(copiaFichas);
        }

        //console.log(copiaFichas); 

        custo++;
        console.log("\n");
    }
}

function verificaRepeticaoEstados(caminho, fichas, indVazio) {
    console.log(caminho); 
    console.log(fichas);
    for(let i=0; i<caminho.length; i++) { 
        const repetiu = caminho[i].every((value, index) => value === fichas[index]);

        if(repetiu) return true; //achou um estado repetido
    }

    return false; //passou por todos estados do caminho e nenhum deles era repetido
}