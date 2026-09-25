import interfaceInOut from "../interface-in-out.js";
import fs from 'fs/promises';
import path from "path";
import crypto from "crypto";
import systemMenu from "../index.js";

function rodarVerificacao() {
    console.clear();
    interfaceInOut.question('Digite o caminho e nome do arquivo(Ex: \'home/donwloads/nomeArquivo.exe\')\n>', (inputCli) => {
        verificaArquivo(inputCli);
    });
};

async function verificaArquivo(pathFile) {
    console.log(' -- Iniciando ...');

    const extencoesSuspeitas = [
        '.exe',
        '.bat',
        '.cmd',
        '.scr',
        '.vbs',
        '.ps1',
        '.msi',
        '.com'
    ];
    
    try {
        const informacoes = await fs.stat(pathFile);
        
        const nomeArquivo = path.basename(pathFile);
        const extensao = path.extname(pathFile).toLowerCase();
        
        const suspeitos = [];
        
        console.log('Verificar extensão...');
        // Verificar extensão:
        if (extencoesSuspeitas.includes(extensao)) {
            suspeitos.push(`Extensão potencialmente perigosa: ${extensao}`);
        }

        // Verificar se arquivo é muito grande:
        const limit = 100 * 1024 * 1024; // 100MB

        if (informacoes.size > limit) {
            suspeitos.push('Arquivo maior que 100 MB');
        }

        console.log('Verificar nomes suspeitos...');
        // Verificar nomes suspeitos:
        const padroesSuspeitos = [
            'crack',
            'keygen',
            'hack',
            'payload',
            'malware',
            'virus',
            'trojan'
        ];

        const nomeMinusculo = nomeArquivo.toLowerCase();

        for (const padrao of padroesSuspeitos) {
             if (nomeMinusculo.includes(padrao)) {
                suspeitos.push(`Nome contém padrão suspeito: "${padrao}"`);
             }
        }

        console.log('Calcula SHA-256...');
        // Calcula SHA-256:
        const conteudo = await fs.readFile(pathFile);

        const hash = crypto
            .createHash('sha256')
            .update(conteudo)
            .digest('hex');

        console.log('Preparando o retorno...');
        const resut = {
            arquivo: nomeArquivo,
            caminho: pathFile,
            tamanho: informacoes.size,
            extensao,
            hash,
            suspeitos: suspeitos.length > 0,
            motivos: suspeitos
        };

        console.log(resut);

        ReturnToMenu();
    } catch (error) {
        const resut = {
            erro: `Não foi possível verificar o arquivo: ${erro.message}`
        };
        
        console.log(resut);

        ReturnToMenu();
    }
};

function ReturnToMenu() {

    interfaceInOut.question('\n\n-------------------------------------------------------------------\nDeseja fazer mais alguma verificação: \na) Sim\nb) Não\n>', (opcao) => {
        const acao = opcao.toLowerCase();

        if (acao === 'a') {
            rodarVerificacao();
        } else if (acao === 'b') {
            systemMenu();
        } else {
            console.log('\n --- ATENÇÃO: Escolha uma opção listadas na tela!!!! --- \n');
            setTimeout(() => {
                ReturnToMenu();
            }, 2000);
        }
    })
}

export default rodarVerificacao;
