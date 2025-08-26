# Code Connect - Backend 🚀

**Code Connect** é uma API RESTful desenvolvida com **NestJS** e **TypeScript** para um sistema de blog com foco em tecnologia. A aplicação permite que usuários se registrem, façam login, criem posts sobre programação e interajam através de comentários.

## 📋 Sobre o Projeto

O Code Connect é uma plataforma de compartilhamento de conhecimento onde desenvolvedores podem:

- **👥 Autenticação completa**: Registro e login de usuários com JWT
- **📝 Gerenciamento de posts**: CRUD completo para posts de blog
- **💬 Sistema de comentários**: Interação entre usuários nos posts
- **👍 Sistema de likes**: Curtir posts favoritos
- **🔍 Busca avançada**: Buscar posts por ID ou slug
- **📚 Documentação automática**: Interface Swagger integrada

## 🛠️ Tecnologias Utilizadas

### Backend
- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado
- **[Prisma](https://www.prisma.io/)** - ORM moderno para banco de dados
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação via tokens
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de senhas
- **[Swagger](https://swagger.io/)** - Documentação da API

### Ferramentas de Desenvolvimento
- **[Docker](https://www.docker.com/)** - Containerização do banco
- **[ESLint](https://eslint.org/)** - Linter para código limpo
- **[Prettier](https://prettier.io/)** - Formatação automática de código
- **[Jest](https://jestjs.io/)** - Framework de testes

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** - Gerenciador de pacotes
- **Docker** e **Docker Compose** - [Download](https://www.docker.com/get-started)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Como Executar o Projeto

### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd code-connect-backend
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/code_connect"

# JWT
JWT_SECRET="seu-jwt-secret-super-secreto"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
```

### 4. Inicie o Banco de Dados (PostgreSQL)
```bash
# Subir o container PostgreSQL
docker-compose up -d

# Verificar se está rodando
docker-compose ps
```

### 5. Configure o Banco de Dados
```bash
# Executar migrations do Prisma
npx prisma migrate dev

# Gerar o Prisma Client
npx prisma generate
```

### 6. Popule o Banco com Dados de Exemplo (Opcional)
```bash
# Executar seed para criar usuários e posts de exemplo
npx prisma db seed
```

### 7. Execute a Aplicação
```bash
# Modo desenvolvimento (com hot reload)
npm run start:dev

# Modo produção
npm run start:prod
```

### 8. Acesse a Aplicação
- **API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api
- **Frontend** (se disponível): http://localhost:5173

## 📖 Endpoints da API

### 🔐 Autenticação (`/auth`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/register` | Registrar novo usuário | ❌ |
| POST | `/auth/login` | Fazer login | ❌ |
| GET | `/auth/me` | Dados do usuário logado | ✅ |
| POST | `/auth/logout` | Fazer logout | ❌ |

### 📝 Posts (`/blog-posts`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/blog-posts` | Listar todos os posts | ❌ |
| GET | `/blog-posts/:id` | Buscar post por ID | ❌ |
| GET | `/blog-posts/slug/:slug` | Buscar post por slug | ❌ |
| POST | `/blog-posts` | Criar novo post | ✅ |
| PATCH | `/blog-posts/:id` | Atualizar post (só o autor) | ✅ |
| DELETE | `/blog-posts/:id` | Deletar post (só o autor) | ✅ |
| POST | `/blog-posts/:id/like` | Curtir post | ✅ |

### 💬 Comentários (`/comments`)

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/comments/post/:postId` | Listar comentários de um post | ❌ |
| POST | `/comments` | Criar comentário | ✅ |
| PATCH | `/comments/:id` | Atualizar comentário (só o autor) | ✅ |
| DELETE | `/comments/:id` | Deletar comentário (só o autor) | ✅ |

## 🏗️ Estrutura do Projeto

```
src/
├── auth/                    # Módulo de autenticação
│   ├── auth.controller.ts   # Controller de auth
│   ├── auth.service.ts      # Service de auth
│   ├── auth.guard.ts        # Guard JWT
│   └── dto/                 # DTOs de auth
├── posts/                   # Módulo de posts
│   ├── posts.controller.ts  # Controller de posts
│   ├── posts.service.ts     # Service de posts
│   └── dto/                 # DTOs de posts
├── comments/                # Módulo de comentários
│   ├── comments.controller.ts
│   ├── comments.service.ts
│   └── dto/
├── users/                   # Módulo de usuários
│   ├── users.service.ts
│   └── users.module.ts
├── prisma/                  # Configuração Prisma
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── app.module.ts           # Módulo principal
└── main.ts                 # Ponto de entrada
```

## 🎯 Dados de Exemplo

O projeto inclui um seed que cria:

### 👥 **4 Usuários de Exemplo**
- Ana Paula (anapaula_dev)
- Bruno Silva (brunodev) 
- Carla Souza (carlacodes)
- Diego Martins (diegomartins)

**Senha para todos**: `123456`

### 📝 **12 Posts sobre Tecnologia**
- Introdução ao React
- CSS Grid na Prática
- Vue.js para Iniciantes
- Dicas de Acessibilidade Web
- TypeScript, Redux, Sass, Webpack, Angular...

### 💬 **Comentários Aleatórios**
Cada post recebe comentários automáticos dos usuários.

## 🧪 Executando Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Testes com coverage
npm run test:cov

# Testes e2e
npm run test:e2e
```

## 🛠️ Comandos Úteis

### Prisma
```bash
# Ver banco de dados no navegador
npx prisma studio

# Reset completo do banco
npx prisma migrate reset

# Aplicar mudanças no schema
npx prisma db push
```

### Docker
```bash
# Parar containers
docker-compose down

# Ver logs do PostgreSQL
docker-compose logs postgres

# Entrar no container do PostgreSQL
docker-compose exec postgres psql -U postgres -d code_connect
```

### Desenvolvimento
```bash
# Formatar código
npm run format

# Verificar linting
npm run lint

# Build para produção
npm run build
```

## 🔧 Configuração do Frontend

A API está configurada para aceitar requisições do frontend em:
```
http://localhost:5173
```

Para alterar, edite o arquivo `src/main.ts`:
```typescript
app.enableCors({
  origin: 'http://seu-frontend-url:porta',
  credentials: true,
});
```

## 📋 Exemplo de Uso da API

### 1. Registrar usuário
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@teste.com",
    "password": "123456",
    "username": "joaosilva"
  }'
```

### 2. Fazer login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@teste.com",
    "password": "123456"
  }'
```

### 3. Criar um post (com token)
```bash
curl -X POST http://localhost:3000/blog-posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "title": "Meu Primeiro Post",
    "slug": "meu-primeiro-post",
    "body": "Conteúdo do post...",
    "markdown": "# Título\nConteúdo em markdown",
    "cover": "https://exemplo.com/imagem.jpg"
  }'
```

## 🐛 Solução de Problemas

### Erro de conexão com banco
1. Verifique se o Docker está rodando: `docker ps`
2. Reinicie o container: `docker-compose restart`
3. Verifique a URL do banco no `.env`

### Erro de autenticação JWT
1. Verifique se o `JWT_SECRET` está definido no `.env`
2. Certifique-se de enviar o token no header: `Authorization: Bearer TOKEN`

### Erro no Prisma
1. Execute: `npx prisma generate`
2. Se persistir: `npx prisma migrate reset`

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se encontrou algum problema ou tem dúvidas:

1. Verifique a [documentação da API](http://localhost:3000/api) 
2. Procure por issues existentes
3. Abra uma nova issue descrevendo o problema

---

**Desenvolvido com ❤️ usando NestJS e TypeScript**