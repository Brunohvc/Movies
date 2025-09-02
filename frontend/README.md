# Golden Raspberry Awards - Frontend

Uma aplicação React/TypeScript para visualizar dados dos indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

## 📋 Pré-requisitos para Executar o Teste

Antes de iniciar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (vem com Node.js) ou **yarn**
- **Git** - [Download aqui](https://git-scm.com/)

## 🚀 Passo a Passo para Executar o Teste

### 1. Clone ou navegue até o projeto
```bash
# Se estiver clonando
git clone <url-do-repositorio>
cd Outsera

# Se já tiver o projeto, navegue até a pasta
cd frontend
```

### 2. Instale as dependências
```bash
npm install
```
*Aguarde alguns minutos para que todas as dependências sejam baixadas.*

### 3. Execute o projeto em modo de desenvolvimento

#### Opção A - Script Automático (Recomendado):
```bash
./start.sh
```
*Este script verifica os pré-requisitos, instala dependências se necessário e inicia o servidor.*

#### Opção B - Manual:
```bash
npm run dev
```
*O comando irá iniciar o servidor de desenvolvimento. Aguarde até ver a mensagem com a URL local.*

### 4. Acesse a aplicação
Abra seu navegador e acesse: `http://localhost:5173`

### 5. Execute os testes (opcional)
```bash
# Para executar todos os testes
npm run test

# Para executar testes com interface visual
npm run test:ui

# Para executar testes com relatório de cobertura
npm run test:coverage
```

### 6. Faça o build para produção (opcional)
```bash
npm run build
```

### 7. Visualize o build de produção (opcional)
```bash
npm run preview
```

## 🧪 Como Testar a Aplicação

### Navegação
1. **Dashboard (Página Inicial)**: Acesse `http://localhost:5173/`
2. **Lista de Filmes**: Clique em "Lista de Filmes" no menu ou acesse `http://localhost:5173/movies`

### Testando as Funcionalidades

#### No Dashboard:
1. **Anos com múltiplos vencedores**: Visualize automaticamente na primeira tabela
2. **Estúdios com mais vitórias**: Veja os top 3 na segunda tabela
3. **Intervalos de produtores**: Observe os intervalos mínimos e máximos
4. **Busca por ano**: Digite um ano (ex: 2000) e clique em "Buscar"

#### Na Lista de Filmes:
1. **Visualização**: Veja todos os filmes com paginação
2. **Filtro por ano**: Digite um ano específico e clique em "Aplicar"
3. **Filtro por vencedor**: Selecione "Sim", "Não" ou "Todos"
4. **Paginação**: Navegue entre as páginas usando os controles na parte inferior
5. **Responsividade**: Teste redimensionando a janela do navegador

### Testando a Responsividade
1. Pressione F12 para abrir as ferramentas do desenvolvedor
2. Clique no ícone de dispositivo móvel
3. Teste diferentes resoluções (especialmente 768x1280)
4. Verifique se todos os elementos se adaptam corretamente

## 📋 Funcionalidades

### Dashboard
- **Anos com múltiplos vencedores**: Tabela mostrando anos que tiveram mais de um vencedor
- **Estúdios com mais vitórias**: Top 3 estúdios com maior número de vitórias
- **Intervalos de produtores**: Produtores com maior e menor intervalo entre vitórias
- **Vencedores por ano**: Busca de vencedores por ano específico

### Lista de Filmes
- **Listagem completa**: Todos os filmes com paginação
- **Filtros**: Por ano e por status de vencedor
- **Responsividade**: Interface adaptável para diferentes tamanhos de tela

## 🚀 Tecnologias Utilizadas

- **React 19** - Library para interface de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **Styled Components** - Estilização
- **Axios** - Cliente HTTP
- **Vitest** - Framework de testes
- **Testing Library** - Utilitários para testes de componentes

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**:

```
src/
├── domain/                 # Regras de negócio e entidades
│   ├── entities/          # Entidades do domínio
│   └── interfaces/        # Interfaces/contratos
├── application/           # Casos de uso e serviços
│   ├── services/         # Serviços da aplicação
│   └── usecases/         # Casos de uso
├── infrastructure/       # Implementações externas
│   ├── api/             # Repositórios que consomem APIs
│   └── http/            # Cliente HTTP
├── presentation/         # Camada de apresentação
│   ├── components/      # Componentes React
│   ├── pages/          # Páginas/Views
│   └── hooks/          # Custom hooks
├── shared/              # Código compartilhado
│   ├── types/          # Tipos TypeScript
│   ├── constants/      # Constantes
│   └── utils/          # Utilitários
└── tests/              # Testes unitários
```

## 📦 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação e Execução

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd frontend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### 4. Build para produção
```bash
npm run build
```

### 5. Execute os testes
```bash
# Executar todos os testes
npm run test

# Executar testes com interface
npm run test:ui

# Executar testes com coverage
npm run test:coverage
```

## 🧪 Testes

O projeto inclui testes unitários para:

- ✅ Componentes React (Header, MovieTable, Pagination)
- ✅ Casos de uso (GetMoviesUseCase)
- ✅ Entidades de domínio (Movie)
- ✅ Hooks customizados
- ✅ Serviços e repositórios

### Executar testes específicos
```bash
# Executar testes de componentes
npm test src/tests/components/

# Executar testes de casos de uso
npm test src/tests/usecases/

# Executar testes com watch mode
npm test --watch
```

## 📱 Responsividade

A aplicação é responsiva e suporta:
- **Desktop**: Telas grandes (1200px+)
- **Tablet**: Telas médias (768px - 1199px)
- **Mobile**: Telas pequenas (até 767px)

Testado especificamente para a resolução mínima de **768x1280**.

## 🌐 API

A aplicação consome dados da API:
- **Base URL**: `https://challenge.outsera.tech/api/movies`
- **Documentação**: [Swagger UI](https://challenge.outsera.tech/swagger-ui/index.html)

### Endpoints utilizados:
- `GET /` - Lista de filmes com paginação e filtros
- `GET /yearsWithMultipleWinners` - Anos com múltiplos vencedores
- `GET /studiosWithWinCount` - Estúdios com contagem de vitórias
- `GET /maxMinWinIntervalForProducers` - Intervalos de produtores
- `GET /winnersByYear?year={year}` - Vencedores por ano

## 🎨 Recursos de UI/UX

- **Design moderno e limpo**
- **Feedback visual para loading states**
- **Tratamento de erros com mensagens amigáveis**
- **Navegação intuitiva com menu responsivo**
- **Tabelas com scroll horizontal em telas pequenas**
- **Paginação com controles intuitivos**
- **Filtros com validação de entrada**

## 📚 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build de produção
npm run lint         # Executa linter
npm run test         # Executa testes
npm run test:ui      # Executa testes com interface
npm run test:coverage # Executa testes com coverage
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Desenvolvido por

**Seu Nome** - [GitHub](https://github.com/seuusuario)

---

Para mais informações sobre a API e especificações do projeto, consulte a documentação oficial.