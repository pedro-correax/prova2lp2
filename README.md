# Implementação do Generic DAO com SQLite

Este projeto implementa um padrão Generic DAO (Data Access Object) para bancos de dados SQLite usando TypeScript. Ele fornece uma maneira reutilizável e segura de executar operações CRUD em qualquer tabela do banco de dados.

## Funcionalidades

- Implementação de DAO genérico suportando qualquer tipo de entidade
- Operações CRUD completas (Create, Read, Update, Delete)
- Consulta baseada em critérios
- Implementação segura com TypeScript
- Conjunto abrangente de testes
- Modelos de exemplo e scripts de inicialização do banco de dados

## Requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)

## Instalação

1. Clone o repositório:
git clone <repository-url>
cd generic-dao-sqlite

2. Instale as dependências:
npm install

3. Inicialize o banco de dados de teste:
npx ts-node scripts/initDb.ts


## Executando os Testes

Execute a suite de testes:
npm test


## Estrutura do Projeto

- src/dao/GenericDAO.ts: Implementação principal do DAO
- src/models/: Modelos de entidade de exemplo
- scripts/initDb.ts: Script de inicialização do banco de dados
- tests/: Conjunto de testes
- tsconfig.json: Configuração do TypeScript
- jest.config.js: Configuração do Jest

## Detalhes da Implementação

 ## Classe GenericDAO

A classe GenericDAO é implementada com generics do TypeScript para suportar qualquer tipo de entidade. Ela fornece os seguintes métodos:

- create(entity: T): Insere novos registros
- read(id: number): Recupera um registro pelo ID
- update(id: number, entity: T): Atualiza registros existentes
- delete(id: number): Remove registros
- findAll(): Recupera todos os registros
- findByCriteria(criteria: Criteria): Consulta registros com base em critérios


 ## Decisões de Design

1. Uso do SQLite: O SQLite foi escolhido por sua simplicidade e natureza sem configuração, tornando-o perfeito para demonstração e testes.

2. Generics: A implementação do DAO usa generics do TypeScript para garantir segurança de tipos mantendo a flexibilidade.

3. Async/Await: Todas as operações do banco de dados são implementadas como promessas para melhor manipulação assíncrona.

4. Padrão Criteria: O sistema de consulta baseado em critérios permite consultas flexíveis e seguras.

## Contribuição

1. Faça um fork do repositório
2. Crie sua branch para a funcionalidade
3. Commit suas alterações
4. Faça o push para a branch
5. Crie um novo Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT.

