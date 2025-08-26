/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma: PrismaClient = new PrismaClient();

// Mock de autores como usuários
const authors = [
  {
    name: 'Ana Paula',
    username: 'anapaula_dev',
    email: 'ana@codeconnect.com',
    avatar:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png',
  },
  {
    name: 'Bruno Silva',
    username: 'brunodev',
    email: 'bruno@codeconnect.com',
    avatar:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png',
  },
  {
    name: 'Carla Souza',
    username: 'carlacodes',
    email: 'carla@codeconnect.com',
    avatar:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png',
  },
  {
    name: 'Diego Martins',
    username: 'diegomartins',
    email: 'diego@codeconnect.com',
    avatar:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png',
  },
];

// Função utilitária para gerar comentários mockados
function mockComments(authorIds: string[], count = 2) {
  const texts = [
    'Ótimo post! Muito esclarecedor.',
    'Parabéns pelo conteúdo!',
    'Me ajudou bastante, obrigado(a)!',
    'Tenho uma dúvida sobre esse ponto...',
    'Excelente explicação, continue assim.',
    'Gostei do exemplo prático.',
    'Muito bom, vou aplicar no meu projeto.',
    'Ficou alguma dúvida, mas vou pesquisar mais.',
    'Show! Compartilhando com amigos.',
    'Amei o post, ansioso(a) por mais!',
  ];

  const comments: { text: string; authorId: string }[] = [];
  for (let i = 0; i < count; i++) {
    const randomAuthorId =
      authorIds[Math.floor(Math.random() * authorIds.length)];
    comments.push({
      text: texts[Math.floor(Math.random() * texts.length)],
      authorId: randomAuthorId,
    });
  }
  return comments;
}

// Função utilitária para gerar likes aleatórios
function randomLikes() {
  return Math.floor(Math.random() * 100) + 1;
}

const posts = [
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-react.png',
    title: 'Introdução ao React',
    slug: 'introducao-ao-react',
    body: 'Neste post, vamos explorar os conceitos básicos do React, uma biblioteca JavaScript para construir interfaces de usuário. Vamos cobrir componentes, JSX e estados.',
    markdown:
      '```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```',
    authorIndex: 0,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/css-grid-na-pratica.png',
    title: 'CSS Grid na Prática',
    slug: 'css-grid-na-pratica',
    body: 'Aprenda a criar layouts responsivos com CSS Grid. Este post aborda desde a definição de grid até a criação de layouts complexos de forma simples e eficaz.',
    markdown:
      '```css\n.grid-container {\n  display: grid;\n  grid-template-columns: auto auto auto;\n}\n```',
    authorIndex: 1,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/vuejs-para-iniciantes.png',
    title: 'Vue.js para Iniciantes',
    slug: 'vuejs-para-iniciantes',
    body: 'Vue.js é um framework progressivo para a construção de interfaces de usuário. Este guia inicial cobre as funcionalidades essenciais do Vue.',
    markdown:
      "```javascript\nnew Vue({\n  el: '#app',\n  data: {\n    message: 'Olá Vue!'\n  }\n})\n```",
    authorIndex: 2,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/dicas-de-acessibilidade-web.png',
    title: 'Dicas de Acessibilidade Web',
    slug: 'dicas-de-acessibilidade-web',
    body: 'Explorando a importância da acessibilidade na web, este post oferece dicas práticas para tornar seus sites mais acessíveis a todos os usuários.',
    markdown:
      '```html\n<a href="#" aria-label="Saiba mais sobre acessibilidade">Saiba mais</a>\n```',
    authorIndex: 3,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-typescript.png',
    title: 'Introdução ao TypeScript',
    slug: 'introducao-ao-typescript',
    body: 'Este post é um guia introdutório ao TypeScript, explicando como ele aumenta a produtividade e melhora a manutenção do código JavaScript.',
    markdown:
      "```typescript\nfunction greeter(person: string) {\n  return 'Hello, ' + person;\n}\n```",
    authorIndex: 0,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/otimizacao-de-performance-no-react.png',
    title: 'Otimização de Performance no React',
    slug: 'otimizacao-de-performance-no-react',
    body: 'Discutindo técnicas avançadas para otimizar a performance de aplicações React, este post aborda conceitos como memoização e lazy loading.',
    markdown:
      '```javascript\nconst MemoizedComponent = React.memo(function MyComponent(props) {\n  /* render using props */\n});\n```',
    authorIndex: 1,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/explorando-flexbox-no-css.png',
    title: 'Explorando Flexbox no CSS',
    slug: 'explorando-flexbox-no-css',
    body: 'Este post detalha o uso do Flexbox para criar layouts responsivos e flexíveis no CSS, com exemplos práticos para um entendimento fácil.',
    markdown:
      '```css\n.flex-container {\n  display: flex;\n  justify-content: space-around;\n}\n```',
    authorIndex: 2,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/angular-primeiros-passos.png',
    title: 'Angular: Primeiros Passos',
    slug: 'angular-primeiros-passos',
    body: 'Ideal para iniciantes, este post introduz o Angular, um poderoso framework para desenvolvimento de aplicações web, com um exemplo básico.',
    markdown:
      "```typescript\n@Component({\n  selector: 'my-app',\n  template: '<h1>Olá Angular</h1>'\n})\nexport class AppComponent { }\n```",
    authorIndex: 3,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/gerenciamento-de-estado-com-redux.png',
    title: 'Gerenciamento de Estado com Redux',
    slug: 'gerenciamento-de-estado-com-redux',
    body: 'Abordando um dos aspectos cruciais no desenvolvimento de aplicações React, este post ensina como gerenciar o estado de forma eficiente com Redux.',
    markdown:
      "```javascript\nconst reducer = (state = initialState, action) => {\n  switch (action.type) {\n    case 'ACTION_TYPE':\n      return { ...state, ...action.payload };\n    default:\n      return state;\n  }\n};\n```",
    authorIndex: 0,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/sass-simplificando-o-css.png',
    title: 'Sass: Simplificando o CSS',
    slug: 'sass-simplificando-o-css',
    body: 'Este post explora como o pré-processador Sass pode simplificar e melhorar a escrita de CSS, através de variáveis, mixins e funções.',
    markdown:
      '```scss\n$primary-color: #333;\nbody {\n  color: $primary-color;\n}\n```',
    authorIndex: 1,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/webpack-um-guia-para-iniciantes.png',
    title: 'Webpack: Um Guia para Iniciantes',
    slug: 'webpack-um-guia-para-iniciantes',
    body: 'Aprenda a configurar o Webpack, uma poderosa ferramenta de empacotamento de módulos, neste guia passo a passo para iniciantes.',
    markdown:
      "```javascript\nmodule.exports = {\n  entry: './path/to/my/entry/file.js'\n};\n```",
    authorIndex: 2,
    likes: randomLikes(),
  },
  {
    cover:
      'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/construindo-spa-com-vuejs.png',
    title: 'Construindo SPA com Vue.js',
    slug: 'construindo-spa-com-vuejs',
    body: 'Este post oferece um tutorial detalhado sobre como construir uma Single Page Application (SPA) eficiente e interativa usando o framework Vue.js.',
    markdown:
      "```javascript\nnew Vue({\n  el: '#app',\n  data: {\n    message: 'Bem-vindo à sua SPA Vue.js!'\n  }\n});\n```",
    authorIndex: 3,
    likes: randomLikes(),
  },
];

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  // Limpar dados existentes
  console.log('🧹 Limpando dados existentes...');
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  // Criar usuários/autores
  console.log('👥 Criando autores...');
  const hashedPassword = await bcrypt.hash('123456', 10);

  const createdAuthors: User[] = [];
  for (const author of authors) {
    const createdAuthor = await prisma.user.create({
      data: {
        ...author,
        password: hashedPassword,
      },
    });
    createdAuthors.push(createdAuthor);
    console.log(
      `✅ Autor criado: ${createdAuthor.name} (${createdAuthor.username})`,
    );
  }

  const authorIds: string[] = createdAuthors.map((author) => author.id);

  // Criar posts
  console.log('📝 Criando posts...');
  for (const postData of posts) {
    const { authorIndex, ...postInfo } = postData;
    const author = createdAuthors[authorIndex];
    if (!author) {
      throw new Error(`Autor não encontrado no índice ${authorIndex}`);
    }
    const authorId = author.id;

    const createdPost = await prisma.post.create({
      data: {
        ...postInfo,
        authorId: authorId,
      },
    });

    console.log(`✅ Post criado: ${createdPost.title}`);

    // Criar comentários para cada post
    const comments = mockComments(authorIds, Math.floor(Math.random() * 4) + 1);
    for (const commentData of comments) {
      await prisma.comment.create({
        data: {
          ...commentData,
          postId: createdPost.id,
        },
      });
    }
    console.log(`💬 Comentários criados para: ${createdPost.title}`);
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e: Error) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
