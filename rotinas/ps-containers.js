import systemMenu from "../index.js";
import interfaceInOut from "../interface-in-out.js";
import { exec } from "child_process";
import { promisify } from "util"; 

// Transforma o exec tradicional em uma função que aceita async/await
const execPromise = promisify(exec);

async function psDockers() {
    console.clear();

    try {
        const { stdout, stderr } = await execPromise('docker ps');
        
        if (stderr) {
            console.warn('Avisos do Dockers: ', stderr);
        }
        
        console.log(' --- Lista de Containers Ativos --- ');
        console.log('Status do Dockers: \n', stdout);
        backToMenu();
    } catch (error) {
        console.clear();
        console.log('Erro ao executar o comando Docker', error.message);
        backToMenu();
    }
};

function backToMenu() {
    interfaceInOut.question("\n\nAperte ENTER para voltar ao 'MENU Incial'\n", () => {
        systemMenu();
    });
}

export default psDockers;
