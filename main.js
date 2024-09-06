import { backtracking } from "./algoritmos/backtracking.js";
import { profundidade } from "./algoritmos/profundidade.js";
import { largura } from "./algoritmos/largura.js";

function main(n) { 
    const tamSistema = 2*n + 1; //n blocos pretos e n blocos brancos + um espaço vazio
    const pecas = [];

    embaralhaSistema(tamSistema, pecas);
    //backtracking(tamSistema, pecas);
    //largura(tamSistema, pecas);
    profundidade(tamSistema, pecas);
}

function embaralhaSistema(n, pecas) { 
    //primeiro aleatoriza a posicao que vai ficar vazia no vetor
    const indVazio = Math.floor(Math.random() * n);
    pecas[indVazio] = null;

    //aleatoriza as posicoes das duas cores 
    for(let i=0; i<n-1; i++) { 
        let find = false; 
        
        while(!find) { 
            const ind = Math.floor(Math.random() * n);

            if(pecas[ind] === undefined) {
                pecas[ind] = i % 2 === 0 ? 'P' : 'V'; 
                find = true;       
            }
        }
    }
}

main(5);