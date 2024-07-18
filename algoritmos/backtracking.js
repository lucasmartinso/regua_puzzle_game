export function backtracking(n) { 
    const fichas = [null,'P','V','V','P'];
    //-------------- DEFINICOES DAS PROPRIEDADES DO ALGORITMO -----------------
    let custo = 0; 
    let profundidade = 0; 
    let sucessFail = undefined;
    const caminho = [fichas];
    const aberta = [fichas]; //nos expandidos
    const fechada = [fichas]; //nos visitados
    const estInicial = []; 

    //define o estado inicial
    console.log(`ESTADO INICIAL: ${fichas}`);
    console.log(caminho);
    for(let i=0; i<n; i++) { 
        estInicial[i] = fichas[i];
    }

    //------------------ ALGORTIMO ------------------

    //ESTADO INICIAL: RANDOMICO
    //ESTADO FINAL: PECAS DE UM COR PARA UM LADO E PECAS DA OUTRA COR PARA O OUTRO - ignora o espaco vazio
    //ESTRATÉGIA DE CONTROLE: Pula para direita(PD), Pula para esquerda(PE), Anda para direita(AD), Anda para esquerda(AE)

    const jogadas = ['PD','PE','AD','AE'];

    //while(sucessFail !== true || sucessFail !== false) { 
        //faz jogada 
        for(let i=0; i<jogadas.length; i++) { 
            const indVazio = fichas.indexOf(null); //indice do espaco vazio

            //tenta primeira jogada
            if(i==0 && indVazio>=2) { //so da pra fazer o salto a direita, se o espaco vazio estiver no minimo na posicao 2 
                
            }
        }
    //}
}