import interfaceInOut from "./interface-in-out.js";
import { menuInicial } from "./menuInterface.js";
import ambientes from "./rotinas/ambientes/start.js";
import stopDockers from "./rotinas/stop-containers.js";
import rodarVerificacao from "./rotinas/verifica-arquivos.js";
import helpInfo from "./help.js";
import closeSystem from "./close.js";

console.log('-------------------------------------------------------------------');
console.log('---------------- Bem-vindo ao MyCLIroutines 0.2.0 -----------------');
console.log('------------------------------ MENU -------------------------------');
console.log('-------------------------------------------------------------------');
console.log('------------------ Micro Sistema OS de Terminal -------------------');
console.log('');
console.log('Status: \'Pre-release\'');
console.log('');
console.log('                                                  By Rodrigo Freire');
console.log('-------------------------------------------------------------------');

interfaceInOut.question("Seu nome: ", (nome) => {
    console.log("Olá, ", nome);

    setTimeout(() => {
        console.clear();
        systemMenu()
    }, 2000);
});


function systemMenu() {
    console.clear();

    interfaceInOut.question(menuInicial, (opcao) => {
        
        console.log("AQUI!!", opcao.toLowerCase());
        
        const acao = opcao.toLowerCase();

        if (acao.length === 1) {
            switch (acao) {
                case 'a':
                    ambientes();
                    break;
                case 'b':
                    console.log('AQUI B');
                    break;
                case 'c':
                    rodarVerificacao() /*console.log('AQUI C')*/
                    break;
                case 'd':
                    console.log('AQUI D');
                    break;
                case 'e':
                    console.log('AQUI E');
                    break;
                case 'f':
                    stopDockers(); /*console.log('AQUI F')*/
                    break;
                default:
                    console.log('\n --- ATENÇÃO: As opções validas são: a), b), c), d) e) e f) --- \n');
                    setTimeout(() => {
                        systemMenu();
                    }, 3000);
                    break;
            }
            // acao === 'a' ? ambientes()/*console.log('AQUI A')*/ :
            //     acao === 'b' ? console.log('AQUI B') :
            //         acao === 'c' ? rodarVerificacao() /*console.log('AQUI C')*/ :
            //             acao === 'd' ? console.log('AQUI D') :
            //                 acao === 'e' ? console.log('AQUI E') :
            //                     acao === 'f' ? stopDockers() /*console.log('AQUI F')*/ :
            //                     console.log('\n --- ATENÇÃO: As opções validas são: a), b), c), d) e) e f) --- \n');
            // setTimeout(() => {
            //     systemMenu();
            // }, 3000);
        } else if (acao === 'help') {
            helpInfo();
        } else if (acao === 'close') {
            closeSystem();
        } else {
            console.log('\n --- ATENÇÃO: Escolha uma opção listadas na tela!!!! --- \n');
            setTimeout(() => {
                systemMenu();
            }, 2000);
        }
    });
};

export default systemMenu;
