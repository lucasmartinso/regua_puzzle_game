import { backtracking } from "./algoritmos/backtracking.js";
import { profundidade } from "./algoritmos/profundidade.js";
import { largura } from "./algoritmos/largura.js";
import { ordenada } from "./algoritmos/ordenada.js";
import { gulosa } from "./algoritmos/gulosa.js";
import { a_estrela } from "./algoritmos/a_estrela.js";
import { ida_estrela } from "./algoritmos/ida_estrela.js";

function main(n) { 
    const tamSistema = 2*n + 1; //n blocos pretos e n blocos brancos + um espaço vazio
    const pecas = [];
    const copias = [];

    embaralhaSistema(tamSistema, pecas); //gera vetor aleatorio embaralhado

    console.log("\nBACKTRACKING");
    copiaVet(pecas, copias);
    backtracking(tamSistema, copias);

    console.log("\nLARGURA");
    copiaVet(pecas, copias);
    largura(tamSistema, copias);

    console.log("\nPROFUNDIDADE");
    copiaVet(pecas, copias);
    profundidade(tamSistema, copias);

    console.log("\nORDENADA");
    copiaVet(pecas, copias);
    ordenada(tamSistema, copias);

    console.log("\nGULOSA");
    copiaVet(pecas, copias);
    gulosa(tamSistema, copias);

    console.log("\nA*");
    copiaVet(pecas, copias);
    a_estrela(tamSistema, copias);

    console.log("\nIDA*");
    copiaVet(pecas, copias);
    ida_estrela(tamSistema, copias);
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

function copiaVet(fichas, copia) { 
    for(let i=0; i<fichas.length; i++) { 
        copia[i] = fichas[i];
    }
}

main(2);