import interfaceInOut from "./interface-in-out.js";
import menuTexts from "./menuInterface.js";
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

    interfaceInOut.question(menuTexts, (opcao) => {
        
        console.log("AQUI!!", opcao.toLowerCase());
        
        const acao = opcao.toLowerCase();

        if (acao.length === 1) {
            acao === 'a' ? console.log('AQUI A') :
                acao === 'b' ? console.log('AQUI B') :
                    acao === 'c' ? console.log('AQUI C') :
                        acao === 'd' ? console.log('AQUI D') :
                            acao === 'e' ? console.log('AQUI E') :
                                acao === 'f' ? console.log('AQUI F') :
                                console.log('\n --- ATENÇÃO: As opções validas são: a), b), c), d) e) e f) --- \n');
            setTimeout(() => {
                systemMenu();
            }, 3000);
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
