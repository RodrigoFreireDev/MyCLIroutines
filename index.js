import interfaceInOut from "./interface-in-out.js";

console.log('-------------------------------------------------------------------');
console.log('---------------- Bem-vindo ao MyCLIroutines 0.1.0 -----------------');
console.log('-------------------------------------------------------------------');
console.log('------------------ Micro Sistema OS de Terminal -------------------');
console.log('');
console.log('                                                  By Rodrigo Freire');
console.log('-------------------------------------------------------------------');

interfaceInOut.question("Seu nome: ", (nome) => {
    console.log("Olá, ", nome);
    interfaceInOut.close();
});
