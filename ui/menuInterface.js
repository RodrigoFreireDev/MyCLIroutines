import dados from '../rotinas/ambientes/ambientes.json' with { type: 'json' };

const menuInicial = "-------------------------------------------------------------------\n------------------------------ MENU -------------------------------\n\nComo funciona: Escolha uma das opções existente descritas a baixo.\n\na) Iniciar Ambientes(Dev/Escrita/Desenho/Edição)\nb) Lista Containers\nc) Stop Containers\nd) Verificação de Arquivos Suspeitos \ne) (Em Dev) - Gerador de Pastas de Sistema\nf) (Em Dev) - Rodar Script de Instalação Linux\ng) (Em Dev) - Formatar Pendrive\n\nhelp) Ajuda/Sobre\nclose) Sair\n\n";

// const menuAmbientes = "-------------------------------------------------------------------\n------------------------------ MENU -------------------------------\n\nComo funciona: Escolha uma das opções existente descritas a baixo.\n\n1) Dev 1\n2) Dev 2\n3) Ambiente Tech\n4) Escrita - Livros e Roteiros\n5) Site Nat\n6) Edita Imagens\n7) Edita Videos\n8) Edita Games\n9) Edita 3D\n\n";
function montaMenuAmbientes() {
    let menuAmbientes = "-------------------------------------------------------------------\n------------------------------ MENU -------------------------------\n\nComo funciona: Escolha uma das opções existente descritas a baixo.\n";

    const total = Object.keys(dados).length;

    for (let index = 0; index < total; index++) {
        menuAmbientes += `\n${index + 1}) ${dados[index]["nome"]}`;
    }

    return `${menuAmbientes}\n\n>`;
}

export { menuInicial, montaMenuAmbientes };
