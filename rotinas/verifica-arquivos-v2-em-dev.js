import interfaceInOut from "../interface-in-out.js";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import systemMenu from "../index.js";

const VIRUSTOTAL_API_URL = "https://www.virustotal.com/api/v3";

const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;


// ============================================================
// INICIAR VERIFICAÇÃO
// ============================================================

function rodarVerificacao() {

    console.clear();

    interfaceInOut.question(
        "Digite o caminho e nome do arquivo (Ex: /home/downloads/nomeArquivo.exe)\n>",
        (inputCli) => {

            verificaArquivo(inputCli.trim());

        }
    );

}


// ============================================================
// VERIFICAR ARQUIVO
// ============================================================

async function verificaArquivo(pathFile) {

    console.clear();

    console.log("==============================================");
    console.log("        🔐 VERIFICAÇÃO DE ARQUIVO");
    console.log("==============================================\n");

    console.log("Iniciando...\n");


    // --------------------------------------------------------
    // EXTENSÕES CONSIDERADAS POTENCIALMENTE SUSPEITAS
    // --------------------------------------------------------

    const extensoesSuspeitas = [

        ".exe",
        ".bat",
        ".cmd",
        ".scr",
        ".vbs",
        ".ps1",
        ".msi",
        ".com"

    ];


    try {

        // ----------------------------------------------------
        // VERIFICAR SE O ARQUIVO EXISTE
        // ----------------------------------------------------

        console.log("Verificando arquivo...");

        const informacoes = await fs.stat(pathFile);


        if (!informacoes.isFile()) {

            throw new Error(
                "O caminho informado não corresponde a um arquivo."
            );

        }


        // ----------------------------------------------------
        // INFORMAÇÕES BÁSICAS
        // ----------------------------------------------------

        const nomeArquivo = path.basename(pathFile);

        const extensao = path
            .extname(pathFile)
            .toLowerCase();


        const suspeitos = [];


        // ----------------------------------------------------
        // VERIFICAR EXTENSÃO
        // ----------------------------------------------------

        console.log("Verificando extensão...");


        if (extensoesSuspeitas.includes(extensao)) {

            suspeitos.push(
                `Extensão potencialmente perigosa: ${extensao}`
            );

        }


        // ----------------------------------------------------
        // VERIFICAR TAMANHO
        // ----------------------------------------------------

        console.log("Verificando tamanho...");


        const limit = 100 * 1024 * 1024; // 100 MB


        if (informacoes.size > limit) {

            suspeitos.push(
                "Arquivo maior que 100 MB"
            );

        }


        // ----------------------------------------------------
        // VERIFICAR NOME SUSPEITO
        // ----------------------------------------------------

        console.log("Verificando nome suspeito...");


        const padroesSuspeitos = [

            "crack",
            "keygen",
            "hack",
            "payload",
            "malware",
            "virus",
            "trojan"

        ];


        const nomeMinusculo =
            nomeArquivo.toLowerCase();


        for (const padrao of padroesSuspeitos) {

            if (nomeMinusculo.includes(padrao)) {

                suspeitos.push(
                    `Nome contém padrão suspeito: "${padrao}"`
                );

            }

        }


        // ----------------------------------------------------
        // CALCULAR SHA-256
        // ----------------------------------------------------

        console.log("Calculando SHA-256...");


        const conteudo =
            await fs.readFile(pathFile);


        const hash = crypto
            .createHash("sha256")
            .update(conteudo)
            .digest("hex");


        console.log(`SHA-256: ${hash}\n`);


        // ----------------------------------------------------
        // RESULTADO DA ANÁLISE LOCAL
        // ----------------------------------------------------

        const result = {

            arquivo: nomeArquivo,

            caminho: pathFile,

            tamanho: informacoes.size,

            extensao,

            hash,

            suspeito: suspeitos.length > 0,

            motivos: suspeitos

        };


        console.log("==============================================");
        console.log("          🔎 ANÁLISE LOCAL");
        console.log("==============================================\n");


        console.log(result);


        // ----------------------------------------------------
        // CONSULTAR VIRUSTOTAL
        // ----------------------------------------------------

        console.log(
            "\n=============================================="
        );

        console.log(
            "          🌐 VIRUSTOTAL"
        );

        console.log(
            "==============================================\n"
        );


        const virusTotal =
            await consultarVirusTotal(hash);


        mostrarResultadoVirusTotal(virusTotal);


        // ----------------------------------------------------
        // RESULTADO FINAL
        // ----------------------------------------------------

        console.log(
            "\n=============================================="
        );

        console.log(
            "          📋 RESULTADO FINAL"
        );

        console.log(
            "==============================================\n"
        );


        if (result.suspeito) {

            console.log(
                "⚠️ A análise local encontrou características que merecem atenção."
            );

        } else {

            console.log(
                "✅ A análise local não encontrou características suspeitas."
            );

        }


        if (virusTotal.encontrado) {

            const estatisticas =
                virusTotal.estatisticas;


            if (estatisticas.malicioso > 0) {

                console.log(
                    `🔴 O VirusTotal registrou ${estatisticas.malicioso} detecção(ões) como maliciosa(s).`
                );

            } else {

                console.log(
                    "ℹ️ O relatório consultado não possui detecções classificadas como maliciosas."
                );

            }

        }


        console.log(
            "\n⚠️ IMPORTANTE: ausência de detecções não garante que um arquivo seja seguro."
        );


        ReturnToMenu();


    } catch (error) {

        const result = {

            erro:
                `Não foi possível verificar o arquivo: ${error.message}`

        };


        console.log(result);


        ReturnToMenu();

    }

}


// ============================================================
// CONSULTAR VIRUSTOTAL
// ============================================================

async function consultarVirusTotal(hash) {

    // --------------------------------------------------------
    // VERIFICAR SE A API KEY FOI CONFIGURADA
    // --------------------------------------------------------

    if (!VIRUSTOTAL_API_KEY) {

        return {

            encontrado: false,

            erro:
                "VIRUSTOTAL_API_KEY não foi configurada."

        };

    }


    // --------------------------------------------------------
    // CONSULTAR ARQUIVO PELO SHA-256
    // --------------------------------------------------------

    const response = await fetch(
        `${VIRUSTOTAL_API_URL}/files/${hash}`,
        {

            method: "GET",

            headers: {

                "x-apikey": VIRUSTOTAL_API_KEY,

                "accept": "application/json"

            }

        }
    );


    // --------------------------------------------------------
    // ARQUIVO NÃO ENCONTRADO
    // --------------------------------------------------------

    if (response.status === 404) {

        return {

            encontrado: false,

            mensagem:
                "Este SHA-256 ainda não possui um relatório no VirusTotal."

        };

    }


    // --------------------------------------------------------
    // API KEY INVÁLIDA
    // --------------------------------------------------------

    if (response.status === 401) {

        throw new Error(
            "A chave da API do VirusTotal é inválida ou não autorizada."
        );

    }


    // --------------------------------------------------------
    // ACESSO NEGADO
    // --------------------------------------------------------

    if (response.status === 403) {

        throw new Error(
            "O VirusTotal recusou o acesso à API."
        );

    }


    // --------------------------------------------------------
    // LIMITE DE REQUISIÇÕES
    // --------------------------------------------------------

    if (response.status === 429) {

        throw new Error(
            "O limite de requisições da API do VirusTotal foi atingido."
        );

    }


    // --------------------------------------------------------
    // OUTROS ERROS
    // --------------------------------------------------------

    if (!response.ok) {

        throw new Error(
            `Erro HTTP ${response.status} ao consultar o VirusTotal.`
        );

    }


    // --------------------------------------------------------
    // CONVERTER RESPOSTA PARA JSON
    // --------------------------------------------------------

    const data =
        await response.json();


    const attributes =
        data.data?.attributes ?? {};


    const statistics =
        attributes.last_analysis_stats ?? {};


    // --------------------------------------------------------
    // RETORNAR SOMENTE OS DADOS IMPORTANTES
    // --------------------------------------------------------

    return {

        encontrado: true,

        nome:
            attributes.meaningful_name ?? null,

        tipo:
            attributes.type_description ?? null,

        reputacao:
            attributes.reputation ?? null,

        tamanho:
            attributes.size ?? null,

        estatisticas: {

            malicioso:
                statistics.malicious ?? 0,

            suspeito:
                statistics.suspicious ?? 0,

            naoDetectado:
                statistics.undetected ?? 0,

            inofensivo:
                statistics.harmless ?? 0,

            timeout:
                statistics.timeout ?? 0

        }

    };

}


// ============================================================
// MOSTRAR RESULTADO DO VIRUSTOTAL
// ============================================================

function mostrarResultadoVirusTotal(resultado) {

    if (resultado.erro) {

        console.log(
            `❌ ${resultado.erro}`
        );

        return;

    }


    if (!resultado.encontrado) {

        console.log(
            `ℹ️ ${resultado.mensagem}`
        );

        return;

    }


    console.log(
        `📄 Nome conhecido: ${
            resultado.nome ?? "Não informado"
        }`
    );


    console.log(
        `📦 Tipo: ${
            resultado.tipo ?? "Não informado"
        }`
    );


    console.log(
        `⭐ Reputação: ${
            resultado.reputacao ?? "Não informada"
        }`
    );


    console.log("\nResultados da análise:\n");


    console.log(
        `🔴 Malicioso: ${resultado.estatisticas.malicioso}`
    );


    console.log(
        `🟠 Suspeito: ${resultado.estatisticas.suspeito}`
    );


    console.log(
        `🟢 Inofensivo: ${resultado.estatisticas.inofensivo}`
    );


    console.log(
        `⚪ Não detectado: ${resultado.estatisticas.naoDetectado}`
    );


    console.log(
        `⏱ Timeout: ${resultado.estatisticas.timeout}`
    );

}


// ============================================================
// VOLTAR AO MENU
// ============================================================

function ReturnToMenu() {

    interfaceInOut.question(
        `
        
-------------------------------------------------------------------
Deseja fazer mais alguma verificação:

a) Sim
b) Não

> `,
        (opcao) => {

            const acao =
                opcao.trim().toLowerCase();


            if (acao === "a") {

                rodarVerificacao();


            } else if (acao === "b") {

                systemMenu();


            } else {

                console.log(
                    "\n--- ATENÇÃO: Escolha uma opção listada na tela! ---\n"
                );


                setTimeout(() => {

                    ReturnToMenu();

                }, 2000);

            }

        }
    );

}


// ============================================================
// EXPORT
// ============================================================

export default rodarVerificacao;