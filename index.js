import interfaceInOut from "./interface-in-out.js";
import menuTexts from "./menuInterface.js";

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
    interfaceInOut.question(menuTexts, (opcao) => {
        console.log("AQUI!!", opcao);
        interfaceInOut.close();
    });
};
