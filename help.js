import interfaceInOut from "./interface-in-out.js";
import systemMenu from "./index.js";
import closeSystem from "./close.js";

function helpInfo() {
    console.clear();
    console.log('-------------------------------------------------------------------');
    console.log('----------------------- Central de Ajuda --------------------------');
    console.log('--- Obrigado por usar o MyCLIroutines(Micro Sistema de Rotinas) ---');
    console.log('');
    console.log('Micro-sistema de terminal que tem como OBJETIVO: Agilizar \ndemandasespecificas que costumam ser recorrentes!');
    console.log('    a) Lorem Ipsus café cfaé fcéa ... ');
    console.log('    b) Lorem Ipsus café cfaé fcéa ... ');
    console.log('    c) Lorem Ipsus café cfaé fcéa ... ');
    console.log('    d) Lorem Ipsus café cfaé fcéa ... ');
    console.log('    e) Lorem Ipsus café cfaé fcéa ... ');
    console.log('    f) Lorem Ipsus café cfaé fcéa ... ');
    console.log('-------------------------------------------------------------------');
 
    interfaceInOut.question('back) Voltar\nclose) Sair\n\n> ', (opcao) => {
        const acao = opcao.toLowerCase();
        
        if (acao === 'back') {
            console.clear();
            systemMenu();
        } else if (acao === 'close') {
            closeSystem();
        } else {
            console.log('\n --- ATENÇÃO: Escolha uma Opção Valida!!!! --- \n');
            setTimeout(() => {
                helpInfo();
            }, 2000);
        }
    });
};

export default helpInfo;
