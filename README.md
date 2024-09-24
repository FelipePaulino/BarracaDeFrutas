# Fruit Store - CRUD de Frutas

Este é um projeto de **CRUD de frutas** desenvolvido utilizando **Next.js**, **Firebase Firestore** como banco de dados, **React Query** para gerenciar requisições, **React Hook Form** para gerenciar formulários, e **Zod** para validação de dados. O projeto simula uma loja de frutas onde é possível adicionar, listar, editar, e excluir frutas, além de gerenciar um carrinho de compras.

## 🚀 Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento de aplicações web.
- **Firebase Firestore**: Banco de dados NoSQL para armazenamento em tempo real.
- **React Query (TanStack Query)**: Biblioteca para gerenciar requisições e cache de dados.
- **React Hook Form**: Gerenciamento de formulários com foco em performance.
- **Zod**: Biblioteca para validação de formulários e schema.
- **Material-UI**: Componentes React para criar interfaces de usuário.

## 📦 Funcionalidades

- **Adicionar Frutas**: Permite adicionar frutas ao Firestore com nome, quantidade, valor e URL da imagem.
- **Listar Frutas**: Lista todas as frutas cadastradas com detalhes, como nome, preço e imagem.
- **Editar Frutas**: Permite editar os detalhes de uma fruta existente.
- **Excluir Frutas**: Permite excluir uma fruta cadastrada.
- **Carrinho de Compras**: Gerenciamento de itens no carrinho com opção de aumentar quantidade e gerar resumo da compra em PDF.

## 🛠 Instalação e Execução

### Pré-requisitos

Antes de rodar o projeto, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- Uma conta no [Firebase](https://firebase.google.com/) com um projeto criado.

### Passos

1. Clone o repositório:

   git clone https://github.com/FelipePaulino/BarracaDeFrutas

2. Instale as dependências:

   npm install

3. Configure o Firebase:

   Crie um projeto no Firebase Console.
   Habilite o Firestore no modo de teste.
   Crie um arquivo .env.local na raiz do projeto e adicione suas credenciais Firebase:

### env

    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

4. Rode o projeto localmente:

   npm run dev

   O projeto estará disponível em: http://localhost:3000.

### Estrutura do Projeto

    /components: Contém os componentes reutilizáveis, como o banner, lista de frutas, e botões de ação.
    /context: Gerenciamento de estados globais como o carrinho de compras e filtro de frutas.
    /services: Arquivos que tratam a comunicação com o Firebase Firestore, utilizando React Query.
    /pages: Páginas da aplicação, como a página principal, página do carrinho, e a página de cadastro/edição de frutas.
    /types: Tipagem TypeScript e schemas de validação Zod.

### Uso do React Hook Form e Zod

    O projeto utiliza React Hook Form em conjunto com Zod para validação de formulários de forma eficiente. O uso do useForm permite o gerenciamento de estados de formulário com alto desempenho, enquanto o Zod lida com a validação de dados através de schemas.

    Exemplo de uso:

    const { register, handleSubmit, formState: { errors } } = useForm<FruitFormInputs>({
    resolver: zodResolver(fruitSchema),
    });
