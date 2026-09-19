# MyCLIroutines

O **MyCLIroutines** é uma ferramenta de linha de comando (CLI) desenvolvida em **Node.js** criada para centralizar, gerenciar e automatizar suas rotinas e tarefas repetitivas do dia a dia diretamente pelo terminal.

Seja para configurar um novo ambiente de desenvolvimento, rodar scripts complexos de build, fazer backups ou consumir APIs rápidas, o MyCLIroutines transforma sequências longas de comandos em tarefas simples de um único termo.

Cada recurso(serviço) presente no programa deve ser armazenado em uma pasta especifica. E o programa deve olhar essa pasta e todos os serviços compativeis serão listados no menu. Como se fosse uma pasta de programas.

Esse prógrama deve ter uma versão para Linux e Windowns(O que muda são metodos de crebra de linha e mais...)

## 🚀 Funcionalidades

- **Centralização de Tarefas:** Reúna todos os seus scripts utilitários em um único lugar.
- **Execução Ágil:** Atalhos rápidos via terminal para substituir comandos longos e difíceis de lembrar.
- **Configuração Customizada:** Defina suas rotinas de forma simples através de arquivos de configuração ou scripts dedicados.
- **Leve e Veloz:** Construído sobre o ecossistema Node.js, garantindo execução rápida e compatibilidade multiplataforma.

### Dica para Iniciar automaticamente: No 'OS' Apps > Inicialização. Cadastre um comando como esse: 'io.elementary.terminal -e "node '/home/MyCLIroutines/index.js'".
'

## 🛠️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org) (Versão LTS recomendada)
- Um gerenciador de pacotes (`npm`, `yarn` ou `pnpm`)

## 📦 Instalação

1. Clone o repositório para a sua máquina local:
   ```bash
   git clone https://github.com
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd MyCLIroutines
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Link o comando globalmente no seu sistema (opcional, para usar o comando `mycli` de qualquer lugar):
   ```bash
   npm link
   ```

## 💻 Como Usar

Para listar todas as rotinas disponíveis no sistema, execute:
```bash
mycli --help
```

### Exemplo de Execução

Para rodar uma rotina específica (por exemplo, uma rotina chamada `backup`):
```bash
mycli run backup
```

## ⚙️ Configuração

*(Nota: Adapte esta seção dependendo de como você decidir estruturar o app)*

As rotinas podem ser configuradas no arquivo `routines.json` na raiz do projeto:

```json
{
  "routines": {
    "limpar-logs": "rm -rf ./logs/*.log",
    "setup-projeto": "git clone... && npm install"
  }
}
```

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript backend.
- *(Opcional)* **Commander.js** / **Inquirer.js** / **Yargs** - Para gerenciamento de argumentos e interface interativa no CLI.
- *(Opcional)* **Chalk** - Para estilização e cores no terminal.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


<!-- Com base no nome MyCLIroutines, o propósito principal do seu programa é automatizar e gerenciar rotinas, scripts ou tarefas repetitivas diretamente pela linha de comando (CLI).
   Dividindo o nome, a intenção fica bem clara:
      - My (Meu/Minha): Indica que é uma ferramenta de uso pessoal, altamente personalizada ou configurada para as suas necessidades (ou de um usuário específico).
      - CLI (Command Line Interface): Define o ambiente de execução. Vai rodar direto no terminal, focando em performance, rapidez e desenvolvedores.
      - Routines (Rotinas): Define a função do software. Serve para agrupar e executar sequências de comandos que você faz no dia a dia.
   Como ele está sendo desenvolvido em Node.js, é muito provável que o propósito prático inclua:
      - Automação de setups: Criar pastas, baixar repositórios e instalar dependências de novos projetos com um único comando.
      - Scripts de Build e Deploy: Agregação de comandos para rodar testes, buildar a aplicação e subir para um servidor.
      - Backup e Organização: Rotinas para compactar arquivos, mover logs ou limpar diretórios temporários do sistema.
      - Integração com APIs: Buscar dados de serviços externos rapidamente através do terminal (ex: cotar moedas, checar status de servidores, enviar mensagens). -->
