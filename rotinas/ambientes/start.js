//  - Apresentar menu
//  - Ler comandos
//  - Receber parametros
//  - Concluir processo e voltar ao menu inicial do MyCLIroutines
import { exec } from "child_process";
import console from "console";
import interfaceInOut from "../../interface-in-out.js";
import systemMenu from "../../index.js";
import { menuAmbientes } from "../../ui/menuInterface.js";
import fs from 'fs';

const naveg = {
    chromer: "google-chrome --profile-directory=",
    firefox: "??? --??-???="
};

function ambientes() {
    console.clear();

    interfaceInOut.question(menuAmbientes, (opcao) => {
        const acao = Number(opcao);

        if (typeof acao !== 'number' || Number.isNaN(acao) || String(opcao).trim() === "") {
            console.log("Opção Inválida/Inexistente!\n\n -- ATENÇÃO: Digite apenas o número da opção que deseja -- ");

            setTimeout(() => {
                ambientes();
            }, 3000);
        } else {
            startAmbiente(acao);
        }
    });
};

function startAmbiente(acao) {
    fs.readFile('/home/rodrigo/Documentos/DEV/Estudos/Carreira-Node/MyCLIroutines/rotinas/ambientes/ambientes.json', 'utf-8', (erro, text) => {
        if (erro) {
            console.log('Erro ao ler arquivo JSON: ', erro.message);
            setTimeout(() => {
                return ambientes();
            }, 3000);
        }

        try {
            const dados = JSON.parse(text); // Converte o texto do arquivo em um objeto JavaScript
            const camadaDesejada = dados[acao - 1]; // Captura a camada desejada usando o número da acao (ex: dados[1] ou dados["1"])

            if (camadaDesejada === undefined) { // Valida se a opção realmente existe dentro do JSON
                console.log(`Opção ${acao} não cadastrada ou está em desenvolvimento!`);
                setTimeout(() => {
                    return ambientes();
                }, 3000);
            } else {
                // console.log('Dados da camada capturada:', camadaDesejada);
                // Aqui você pode usar os dados da camada (ex: camadaDesejada.nome, camadaDesejada.config)
                toStart(camadaDesejada);
            }
        } catch (erroParse) {
            console.log("O arquivo JSON está com formato corrompido:", erroParse.message);
            setTimeout(() => {
                return ambientes();
            }, 3000);
        }
    });
}

// Opção1 Rodrigo ;) :
// function toStart(dados) {
//     console.log(' --- ', dados["menssagem"], ' --- ');

//     const dockers = dados["instrucoes"]["dockers"];
//     const apps = dados["instrucoes"]["programas"];
//     const site = dados["instrucoes"]["navegador"];

//     Object.keys(dockers).length > 0 ? execDockers(dockers) : execDockers(false);
//     Object.keys(apps).length > 0 ? iniciarApps(apps) : iniciarApps(false);
//     Object.keys(site).length > 0 ? abrirSites(site) : abrirSites(false);
// }

// Opção2 :
function toStart(dados) {
    console.log(' --- ', dados["menssagem"], ' --- ');

    // Extrai as 3 variáveis diretamente do JSON de forma limpa
    const { dockers, programas: apps, web: site } = dados["instrucoes"];

    // OPÇÃO ULTRA ELEGANTE (Curto-circuito com &&)
    // "Se o objeto tiver chaves, ENTÃO chama a função passando os dados"
    Object.keys(dockers).length > 0 && execDockers(dockers);
    Object.keys(apps).length > 0 && iniciarApps(apps);
    Object.keys(site).length > 0 && abrirSites(site);
}

function execDockers(comandos) {
    const total = Object.keys(comandos).length;

    for (let index = total; index >= 0; index--) {
        if (index === 0) {
            setTimeout(() => {
                return systemMenu();
            }, 10000);
        } else {
            exec(comandos[index - 1], (error, stdout, stderr) => {
                if (error) {
                    console.log(`Erro ao rodar comando \'Docker\': ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`Aviso/Erro de execução: ${stderr}`);
                    return;
                }

                console.log(` - LOG: Comando \'${comandos[index - 1]}\', executado com sucesso:\n${stdout}`);
            });
        }
    }
}

function iniciarApps(comandos) {
    const total = Object.keys(comandos).length;

    for (let index = total; index >= 0; index--) {
        if (index === 0) {
            setTimeout(() => {
                return systemMenu();
            }, 10000);
        } else {
            exec(comandos[index - 1], (error, strout, stderr) => {
                if (error) {
                    console.log(`Erro ao tentar iniciar \'Appr\': ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`Aviso/Erro de execução: ${stderr}`);
                    return;
                }

                console.log(` - LOG: Comando \'${comandos[index - 1]}\', executado com sucesso:\n${strout}`);
            });
        }
    }
}

function abrirSites(comandos) {
    const total = Object.keys(comandos).length;

    for (let index = total; index >= 0; index--) {
        if (index === 0) {
            setTimeout(() => {
                return systemMenu();
            }, 10000);
        } else {
            const path = comandos[index - 1].navegador;
            const url = comandos[index - 1].url;
            const perfil = comandos[index - 1].perfil;

            exec(`${naveg[path]}"${perfil}" "${url}"`, (error, stdout, stderr) => {
                if (error) {
                    console.log(`Erro ao tentar abrir \'Site\': ${error}`);
                    return;
                }
                if (stderr) {
                    console.log(`Aviso/Erro de execução: ${stderr}`);
                    return;
                }

                console.log(` - LOG: Comando \'${comandos[index - 1]}\', executado com sucesso:\n${stdout}`);
            });
        }
    }
}

export default ambientes;
