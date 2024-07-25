export function backtracking(n) { 
    let fichas = ['P','V','V',null,'P'];
    //-------------- DEFINICOES DAS PROPRIEDADES DO ALGORITMO -----------------
    let propriedades = { custo: 0, profundidade: 0, expandidos: 0, backCond: false };
    let sucessFail = undefined;
    const caminho = [[]];
    const estInicial = []; 
    const proibidos = [{estado: [], block: []}]; //nao repetir a jogada que resultou em backtracking, add em um objeto cada estado e um vetor de blockPlays 
    const jogatinas = [];
    let j = 0;

    //define o estado inicial
    console.log(`ESTADO INICIAL: ${fichas}\n`);
    for(let i=0; i<n; i++) { 
        estInicial[i] = fichas[i];
        caminho[0][i] = fichas[i];
        proibidos[0].estado[i] = fichas[i];
    }
    //------------------ ALGORTIMO ------------------

    //ESTADO INICIAL: RANDOMICO
    //ESTADO FINAL: PECAS DE UM COR PARA UM LADO E PECAS DA OUTRA COR PARA O OUTRO - ignora o espaco vazio
    //ESTRATÉGIA DE CONTROLE: Pula para direita(PD), Pula para esquerda(PE), Anda para direita(AD), Anda para esquerda(AE)

    console.time('TEMPO DE EXECUCAO'); //comeca a marcar o tempo

    const jogadas = ['PD','PE','AD','AE'];
    while(sucessFail !== true && sucessFail !== false) { // j<=10
        //verifica se eh o estado final
        const indVazio = fichas.indexOf(null);
        const somaSe = indVazio > Math.floor(n/2) ? 0 : 1; //se o espaco ta na metade pra frente faz apenas 2 comparacoes, se estiver antes disso faz 3 comparacoes
        const primeiroEstado = fichas[0] === null ? fichas[1] : fichas[0]; //pega o primeiro estado para fazer a comparacao se ate a metade do vetor eh igual 
        let teste = true;
        
        //console.log("\nCOMPARACAO: ");
        for(let i=0; i<Math.floor(fichas.length/2) + somaSe; i++) {
            if(fichas[i] !== null) {
                //console.log(`${primeiroEstado} == ${fichas[i]} ???`) 
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
        } else if(proibidos[0].block.length === jogadas.length) { 
            sucessFail = false; 
            console.log("FRACASSO");
            break;
        }


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

            //tenta a segunda jogada
            else if(i==1 && indVazio<=n-3) { //so da pra fazer o salto a esquerda, se o espaco vazio estiver no max 2 posicoes da borda da direita, ou seja, n-3(antepenultima)
                console.log("JOGADA 2");

                const auxTrocaPeca = copiaFichas[indVazio+2]; 
                copiaFichas[indVazio] = auxTrocaPeca; 
                copiaFichas[indVazio+2] = null;
                
                if(!verificaRepeticaoEstados(caminho,copiaFichas, indVazio) && (!propriedades.backCond || !proibidos[proibidos.length-1].block.includes(1))) { // && !proibidos[proibidos.length-1].block.includes(1)
                    jogatinas.push(1);
                    fichas = copiaFichas;
                    caminho.push(fichas);
                    proibidos.push({estado: fichas, block: [0]});
                    propriedades.custo += 2;
                    propriedades.expandidos++;
                    propriedades.profundidade++;
                    propriedades.backCond = false;
                    break;
                }
            }

            //tenta a terceira jogada
            else if(i==2 && indVazio>0) { //so da pra andar para esquerda se o espaco vazio nao for a borda esquerda
                console.log("JOGADA 3");

                const auxTrocaPeca = copiaFichas[indVazio-1]; 
                copiaFichas[indVazio] = auxTrocaPeca; 
                copiaFichas[indVazio-1] = null;
                
                if(!verificaRepeticaoEstados(caminho,copiaFichas, indVazio) && (!propriedades.backCond || !proibidos[proibidos.length-1].block.includes(2))) {
                    jogatinas.push(2);
                    fichas = copiaFichas;
                    caminho.push(fichas);
                    proibidos.push({estado: fichas, block: [0,1]});
                    propriedades.custo ++;
                    propriedades.expandidos++;
                    propriedades.profundidade++;
                    propriedades.backCond = false;
                    break;
                }
            }

            //tenta a quarta jogada
            else if(i==3 && indVazio<n-1) { //so da pra andar para direita se o espaco vazio nao for a borda direita
                console.log("JOGADA 4");

                const auxTrocaPeca = copiaFichas[indVazio+1]; 
                copiaFichas[indVazio] = auxTrocaPeca; 
                copiaFichas[indVazio+1] = null;
                
                if(!verificaRepeticaoEstados(caminho,copiaFichas, indVazio) && (!propriedades.backCond || !proibidos[proibidos.length-1].block.includes(3))) {
                    jogatinas.push(3);
                    fichas = copiaFichas;
                    caminho.push(fichas);
                    proibidos.push({estado: fichas, block: [0,1,2]});
                    propriedades.custo ++;
                    propriedades.expandidos++;
                    propriedades.profundidade++;
                    propriedades.backCond = false;
                    break;
                } else bt(caminho, fichas, propriedades, jogatinas, proibidos); //backtracking se resultar em estado repetido tb
            } 
            
            else if(i==3) bt(caminho, fichas, propriedades, jogatinas, proibidos); //backtracking se resultar em estado repetido tb
        }
        console.log("\n");
    }

    console.log(`\nCUSTO DA OPERACAO: ${propriedades.custo}`);
    console.log(`PROFUNDIDADE ALCANCADA: ${propriedades.profundidade}`);
    console.log(`NOS VISITADOS ${propriedades.expandidos+1}, NOS EXPANDIDOS ${propriedades.expandidos}`);
    console.log(`VALOR MEDIO DO FATOR DE RAMIFICACAO DA ARVORE DE BUSCA: 1`);
    console.timeEnd('TEMPO DE EXECUCAO');
    console.log("CAMINHO: ");
    for(let i=0; i<caminho.length; i++) {
        console.log(caminho[i],"-->");
    }
}

function bt(caminho, fichas, propriedades, jogatinas, proibidos) { 
    console.log("BACKTRACKING");
    caminho.pop();
    proibidos.pop();
    const indJogada = jogatinas.pop(); //jogada anterior que caiu no estado que foi um backtracking
    proibidos[proibidos.length-1].block.push(indJogada);
    propriedades.custo += 3;
    propriedades.profundidade--;
    propriedades.backCond = true;

    for(let k=0; k<fichas.length; k++) { 
        fichas[k] = caminho[caminho.length-1][k];
    }
}

function verifyBackState(proibidos, fichas, n) { 
    let ind = -1;

    for(let i=proibidos.length-1; i>=0; i--) { 
        ind = i;
        for(let j=0; j<n; j++) {
            if(proibidos[i].estado[j] !== fichas[j]) {
                ind = -1;
                break;
            }  
        }
        if(ind!==-1) return ind; //eh um estado de backtracking
    }

    return ind; //nao eh um estado de backtracking
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