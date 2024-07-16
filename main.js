
function embaralhaSistema(n, pecas) { 
    //primeiro aleatoriza a posicao que vai ficar vazia no vetor
    const indVazio = Math.floor(Math.random() * n);
    pecas[indVazio] = undefined;

    //aleatoriza as posicoes das duas cores 
    for(let i=0; i<n; i++) { 
        
    }
}

//n blocos pretos e n blocos brancos + um espaço vazio
function main(n) { 
    const tamSistema = 2*n + 1; 
    const pecas = [];

    embaralhaSistema(tamSistema, pecas);
}

main(5);