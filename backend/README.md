# Golden Raspberry Awards API

API RESTful para leitura de indicados e vencedores da categoria **Pior Filme** do Golden Raspberry Awards.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [API Endpoints](#api-endpoints)
- [Testes](#testes)
- [Docker](#docker)
- [Estrutura do Projeto](#estrutura-do-projeto)

## 🎯 Sobre o Projeto

Esta API foi desenvolvida para processar dados dos filmes indicados e vencedores do Golden Raspberry Awards, fornecendo informações sobre os produtores com maior e menor intervalo entre prêmios consecutivos.

### Funcionalidades

- ✅ Leitura automática de arquivo CSV na inicialização
- ✅ Banco de dados SQLite (em memória para testes, arquivo para desenvolvimento)
- ✅ API RESTful seguindo nível 2 de maturidade Richardson
- ✅ Testes de integração completos
- ✅ Arquitetura limpa (Clean Architecture)

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express.js** - Framework web minimalista
- **TypeORM** - ORM para TypeScript/JavaScript
- **SQLite** - Banco de dados (arquivo para desenvolvimento, memória para testes)
- **Jest** - Framework de testes
- **csv-parser** - Parser de arquivos CSV

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, organizado em camadas:

```
src/
├── domain/              # Regras de negócio
│   ├── entities/        # Entidades do domínio
│   └── interfaces/      # Contratos/Interfaces
├── application/         # Casos de uso
│   └── usecases/        # Lógica de aplicação
├── infrastructure/      # Implementações técnicas
│   ├── database/        # Configuração do banco
│   ├── repositories/    # Implementação dos repositórios
│   └── services/        # Serviços externos
└── presentation/        # Camada de apresentação
    ├── controllers/     # Controladores HTTP
    ├── routes/          # Definição de rotas
    └── middlewares/     # Middlewares Express
```

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

## 🔧 Instalação e Execução

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente (opcional)

O arquivo `.env` já está configurado com valores padrão. Você pode editá-lo se necessário:

```env
# Configurações do servidor
PORT=3000
NODE_ENV=development

# Configurações de logs
LOG_LEVEL=info
```

### 4. Execute a aplicação

```bash
# Desenvolvimento com hot-reload
npm run dev

# ou compilar e executar
npm run build
npm start
```

A API estará disponível em: `http://localhost:3000`

**Nota:** A aplicação usa SQLite automaticamente:
- **Testes**: Banco em memória (`:memory:`)
- **Desenvolvimento**: Arquivo `database.sqlite` na raiz do projeto

## 🌐 API Endpoints

### Health Check

```http
GET /health
```

**Resposta:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Obter Intervalos de Produtores

```http
GET /api/producers/intervals
```

**Descrição:** Retorna os produtores com maior e menor intervalo entre dois prêmios consecutivos.

**Resposta de Sucesso (200):**
```json
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    }
  ],
  "max": [
    {
      "producer": "Producer 2",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    }
  ]
}
```

**Resposta de Erro (500):**
```json
{
  "error": "Erro interno do servidor",
  "message": "Não foi possível obter os intervalos dos produtores"
}
```

## 🧪 Testes

### Executar todos os testes

```bash
npm test
```

### Executar apenas testes de integração

```bash
npm run test:integration
```

### Executar testes em modo watch

```bash
npm run test:watch
```

### Cobertura de testes

```bash
npm test -- --coverage
```

Os testes incluem:

- ✅ Validação do endpoint principal
- ✅ Processamento correto dos dados do CSV
- ✅ Cálculo de intervalos mín/máx
- ✅ Tratamento de múltiplos produtores
- ✅ Filtros de filmes vencedores
- ✅ Tratamento de erros
- ✅ Health check



## 📁 Estrutura do Projeto

```
backend/
├── data/                    # Arquivos de dados
│   └── movielist.csv        # CSV com dados dos filmes
├── src/                     # Código fonte
│   ├── domain/              # Camada de domínio
│   │   ├── entities/        # Entidades de negócio
│   │   └── interfaces/      # Contratos
│   ├── application/         # Casos de uso
│   │   └── usecases/        # Lógica de aplicação
│   ├── infrastructure/      # Infraestrutura
│   │   ├── database/        # Configuração DB
│   │   ├── repositories/    # Implementação repositórios
│   │   └── services/        # Serviços externos
│   ├── presentation/        # Apresentação
│   │   ├── controllers/     # Controladores
│   │   ├── routes/          # Rotas
│   │   └── middlewares/     # Middlewares
│   ├── App.ts              # Classe principal da aplicação
│   └── index.ts            # Ponto de entrada
├── tests/                   # Testes
│   ├── integration/         # Testes de integração
│   └── setup.ts            # Configuração dos testes
├── dist/                    # Arquivos compilados
├── coverage/                # Relatórios de cobertura
├── database.sqlite         # Banco SQLite (criado automaticamente)
├── .env                    # Variáveis de ambiente
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── jest.config.js          # Configuração Jest
└── README.md               # Documentação
```

## 🔍 Detalhes Técnicos

### Processamento do CSV

- O arquivo CSV é lido automaticamente na inicialização da aplicação
- Dados são inseridos em banco em memória (SQLite) ou MySQL
- Separadores suportados: vírgula (`,`) e `" and "`
- Filtros aplicados apenas para filmes vencedores (`winner = yes`)

### Cálculo de Intervalos

1. Busca todos os filmes vencedores
2. Agrupa por produtor (considerando múltiplos produtores por filme)
3. Para produtores com 2+ vitórias, calcula intervalos consecutivos
4. Identifica intervalos mínimos e máximos
5. Retorna resultados agrupados

### Banco de Dados

- **Testes:** SQLite em memória (`:memory:`)
- **Desenvolvimento:** SQLite em arquivo (`database.sqlite`)
- **ORM:** TypeORM com sincronização automática
- **Migrations:** Não utilizadas (sync automático ativo)

## 🛠️ Scripts Disponíveis

```bash
npm run build          # Compilar TypeScript
npm start             # Executar aplicação
npm run dev           # Desenvolvimento com hot-reload
npm test              # Executar todos os testes
npm run test:integration  # Testes de integração apenas
npm run test:watch    # Testes em modo watch
```

## 📝 Logs

A aplicação gera logs informativos sobre:
- Inicialização do banco de dados
- Carregamento de dados do CSV
- Erros de processamento
- Requests HTTP (em desenvolvimento)

## ⚡ Performance

- Banco SQLite leve e eficiente
- Processamento único do CSV na inicialização
- Queries otimizadas com TypeORM
- Compressão gzip habilitada

## 🔒 Segurança

- Headers de segurança via Helmet.js
- Validação de entrada
- Tratamento de erros sem exposição de informações sensíveis


## 📈 Monitoramento

- Health check endpoint (`/health`)
- Logs estruturados para debugging

---

**Desenvolvido seguindo as melhores práticas de Clean Architecture, SOLID e RESTful APIs.**
