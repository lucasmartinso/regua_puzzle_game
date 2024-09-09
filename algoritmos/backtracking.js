//concertar o fracasso, pq se ele voltar ao estado inicial ja eh fracasso, nn precisa fzr mais um monte de jogadas
//fracasso nao esta funcionando, concertar
export function backtracking(n, fichas) { 
    //-------------- DEFINICOES DAS PROPRIEDADES DO ALGORITMO -----------------
    let propriedades = { custo: 0, profundidade: 0, expandidos: 0, backCond: false };
    let sucessFail = undefined;
    const caminho = [{estado: [], block: []}];
    const estInicial = []; 
    const jogatinas = [];
    let contaBacktracks = 0;

    //define o estado inicial
    console.log(`ESTADO INICIAL: ${fichas}\n`);
    for(let i=0; i<n; i++) { 
        estInicial[i] = fichas[i];
        caminho[0].estado[i] = fichas[i];
    }

    //verifica se ja esta organizado
    const indVazio = fichas.indexOf(null);
    const somaSe = indVazio > Math.floor(n/2) ? 0 : 1; //se o espaco ta na metade pra frente faz apenas 2 comparacoes, se estiver antes disso faz 3 comparacoes
    const primeiroEstado = fichas[0] === null ? fichas[1] : fichas[0]; //pega o primeiro estado para fazer a comparacao se ate a metade do vetor eh igual 
    let teste = true;
    
    console.log("\nCOMPARACAO: ");
    for(let i=0; i<Math.floor(fichas.length/2) + somaSe; i++) {
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
    }


    //------------------ ALGORTIMO ------------------

    //ESTADO INICIAL: RANDOMICO
    //ESTADO FINAL: PECAS DE UM COR PARA UM LADO E PECAS DA OUTRA COR PARA O OUTRO - ignora o espaco vazio
    //ESTRATÉGIA DE CONTROLE: Pula para direita(PD), Pula para esquerda(PE), Anda para direita(AD), Anda para esquerda(AE)

    console.time('TEMPO DE EXECUCAO'); //comeca a marcar o tempo

    const jogadas = ['PD','PE','AD','AE'];

    let it = 0;
    while(sucessFail !== true && sucessFail !== false ) { ////
        //faz jogada 
        for(let i=0; i<jogadas.length; i++) {
            const indVazio = fichas.indexOf(null); //indice do espaco vazio

            //cria uma copia das fichas atuais para fazer os testes de estado
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

                if(!propriedades.backCond && !verificaRepeticaoEstados(caminho,copiaFichas, indVazio) || (propriedades.backCond && !caminho[caminho.length-1].block.includes(0))) {
                    attJogada(jogatinas, 0, propriedades, 2);
                    fichas = copiaFichas;
                    caminho.push({estado: fichas, block: []});
                    break;
                }
            }

            //tenta a segunda jogada
            else if(i==1 && indVazio<=n-3) { //so da pra fazer o salto a esquerda, se o espaco vazio estiver no max 2 posicoes da borda da direita, ou seja, n-3(antepenultima)
                console.log("JOGADA 2");

                const auxTrocaPeca = copiaFichas[indVazio+2]; 
                copiaFichas[indVazio] = auxTrocaPeca; 
                copiaFichas[indVazio+2] = null;
                
                if(!propriedades.backCond && !verificaRepeticaoEstados(caminho,copiaFichas, indVazio) || (propriedades.backCond && !caminho[caminho.length-1].block.includes(1))) { 
                    attJogada(jogatinas, 1, propriedades, 2);
                    fichas = copiaFichas;
                    caminho.push({estado: fichas, block: [0]});
                    break;
                }
            }

            //tenta a terceira jogada
            else if(i==2 && indVazio>0) { //so da pra andar para esquerda se o espaco vazio nao for a borda esquerda
                console.log("JOGADA 3");

                const auxTrocaPeca = copiaFichas[indVazio-1]; 
                copiaFichas[indVazio] = auxTrocaPeca; 
                copiaFichas[indVazio-1] = null;
                
                if(!propriedades.backCond && !verificaRepeticaoEstados(caminho,copiaFichas, indVazio) || (propriedades.backCond && !caminho[caminho.length-1].block.includes(2))) {
                    attJogada(jogatinas, 2, propriedades, 1);
                    fichas = copiaFichas;
                    caminho.push({estado: fichas, block: [0,1]});
                    break;
                }
            }

            //tenta a quarta jogada
            else if(i==3 && indVazio<n-1) { //so da pra andar para direita se o espaco vazio nao for a borda direita
                console.log("JOGADA 4");

                const auxTrocaPeca = copiaFichas[indVazio+1]; 
                copiaFichas[indVazio] = auxTrocaPeca; 
                copiaFichas[indVazio+1] = null;
                
                if(!propriedades.backCond && !verificaRepeticaoEstados(caminho,copiaFichas, indVazio) || (propriedades.backCond && !caminho[caminho.length-1].block.includes(3))) {
                    attJogada(jogatinas, 3, propriedades, 1);
                    fichas = copiaFichas;
                    caminho.push({estado: fichas, block: [0,1,2]});
                    break;
                } else {
                    contaBacktracks++;
                    bt(caminho, fichas, propriedades, jogatinas); //backtracking se resultar em estado repetido tb
                }
            } 
            
            else if(i==3){
                contaBacktracks++;
                bt(caminho, fichas, propriedades, jogatinas); //backtracking se resultar em estado repetido tb
            }
        }

        //verifica se eh o estado final
        const indVazio = fichas.indexOf(null);
        const somaSe = indVazio > Math.floor(n/2) ? 0 : 1; //se o espaco ta na metade pra frente faz apenas 2 comparacoes, se estiver antes disso faz 3 comparacoes
        const primeiroEstado = fichas[0] === null ? fichas[1] : fichas[0]; //pega o primeiro estado para fazer a comparacao se ate a metade do vetor eh igual 
        let teste = true;
        
        console.log("\nCOMPARACAO: ");
        for(let i=0; i<Math.floor(fichas.length/2) + somaSe; i++) {
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
        } else if(verifcaFracasso(estInicial, fichas)) {
            sucessFail = false; 
            console.log("FRACASSO");
            break;
        }
        console.log("\n");

        it++;
    }

    if(sucessFail) {
        console.log("CAMINHO: ");
        for(let i=0; i<caminho.length; i++) {
            console.log(caminho[i].estado,"-->");
        }
        console.log(`\nCUSTO DA OPERACAO: ${propriedades.custo}`);
        console.log(`PROFUNDIDADE ALCANCADA: ${propriedades.profundidade}`);
        console.log(`NOS VISITADOS ${propriedades.expandidos+1}, NOS EXPANDIDOS ${propriedades.expandidos}`);
        console.log(`VALOR MEDIO DO FATOR DE RAMIFICACAO DA ARVORE DE BUSCA: 1`);
        console.timeEnd('TEMPO DE EXECUCAO');
    }
}

function bt(caminho, fichas, propriedades, jogatinas) { 
    console.log("BACKTRACKING");
    console.log(caminho[caminho.length-1]);
    caminho.pop(); //retira do caminho o estado invalido que sofreu backtracking
    const indJogada = jogatinas.pop(); //jogada anterior que caiu no estado que foi um backtracking
    caminho[caminho.length-1].block.push(indJogada); //adiciona jogada bloqueada
    propriedades.custo += 3;
    propriedades.profundidade--;
    propriedades.backCond = true;
    //console.log(caminho[caminho.length-1]);
    //console.log(caminho);

    for(let k=0; k<fichas.length; k++) { 
        fichas[k] = caminho[caminho.length-1].estado[k];
    }
}

function attJogada(jogatinas, jogada, propriedades, custo) { 
    jogatinas.push(jogada);
    propriedades.custo += custo;
    propriedades.expandidos++;
    propriedades.profundidade++;
    propriedades.backCond = false;
}

function verificaRepeticaoEstados(caminho, fichas, indVazio) {
    console.log(caminho);
    console.log(fichas);
    for(let i=0; i<caminho.length; i++) { 
        const repetiu = caminho[i].estado.every((value, index) => value === fichas[index]);

        if(repetiu) return true; //achou um estado repetido
    }

    return false; //passou por todos estados do caminho e nenhum deles era repetido
}

function verifcaFracasso(estInicial, estAtual) {
    for(let i=0; i<estInicial.length; i++) { 
        if(estInicial[i] !== estAtual[i]) 
            return false; //estAtual != estInicial
    }

    return true; //estAtual == estInicial
}