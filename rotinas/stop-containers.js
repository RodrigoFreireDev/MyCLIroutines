import systemMenu from "../index.js";
import { exec } from "child_process";
import { promisify } from "util"; 

// Transforma o exec tradicional em uma função que aceita async/await
const execPromise = promisify(exec);

async function stopDockers() {
    console.clear();

    try {
        const { stdout, stderr } = await execPromise('docker stop $(docker ps -q)');
        // const { stdout, stderr } = await execPromise('docker ps');
        
        if (stderr) {
            console.warn('Avisos do Dockers: ', stderr);
        }
        
        console.log(' --- Parando os Containers --- ');
        console.log('Status do Dockers: ', stdout);

        setTimeout(() => {
            systemMenu();
        }, 3000);
    } catch (error) {
        console.clear();
        console.log('Erro ao executar o comando Docker', error.message);
        setTimeout(() => {
            systemMenu();
        }, 2000);
    }
};

export default stopDockers;
