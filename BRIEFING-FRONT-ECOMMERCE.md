# Briefing Para O Front (Ecommerce Cliente Final)

Objetivo: construir o ecommerce publico com Next.js + Tailwind, integrado ao backend atual, com foco em performance, SEO profissional e conversao.

## 1) Stack e Direcao Tecnica

- Next.js 15 com App Router.
- TypeScript em todo o projeto.
- Tailwind CSS para UI.
- React Hook Form + Zod para formularios.
- TanStack Query para estado assincrono no cliente.
- Renderizacao hibrida:
  - Server Components para paginas SEO.
  - Client Components para interacoes (carrinho, filtros dinamicos, checkout).

## 2) Arquitetura Recomendada

- Estrutura por dominio (feature-first), nao por tipo generico.
- Camadas:
  - presentation: paginas e componentes.
  - application: hooks e casos de uso.
  - infrastructure: cliente HTTP e mapeamento de API.
- Criar camada BFF no proprio Next para autenticacao e cookies (route handlers), evitando expor token no browser.

## 3) Paginas Obrigatorias

- Home.
- Listagem de produtos (com filtros e paginacao).
- Detalhe do produto.
- Carrinho.
- Checkout.
- Sucesso do pedido.
- Minha conta:
  - login
  - cadastro
  - esqueci senha
  - redefinir senha
  - meus pedidos
  - meus enderecos
- Institucionais:
  - sobre
  - contato
  - politica de privacidade
  - termos

## 4) Componentes Obrigatorios

- Header com busca, conta e minicart.
- Footer com links institucionais e SEO interno.
- Grid de produtos.
- Card de produto com imagem, preco e CTA.
- Galeria de imagens no PDP.
- Seletor de variacao (cor/largura).
- Filtros de catalogo (categoria, cor, preco, unidade).
- Carrinho lateral e carrinho completo.
- Formulario de endereco.
- Resumo de pedido e frete.
- Feedback states:
  - loading
  - vazio
  - erro
  - sucesso

## 5) Cookies e Sessao (Muito Importante)

- Sim, usar cookies.
- Sessao do usuario em cookie HttpOnly, Secure, SameSite=Lax.
- Nao guardar token em localStorage.
- Carrinho de visitante:
  - cookie com cartId (ou sessao anonima).
  - merge com conta apos login.
- Cookie de consentimento LGPD para analytics/marketing.
- Se backend nao tiver refresh token ainda, manter sessao curta e fluxo de relogin controlado.

## 6) SEO Profissional (Obrigatorio)

- Metadata por pagina (title, description, OG, Twitter).
- Canonical em paginas indexaveis.
- Sitemap dinamico.
- Robots.txt correto.
- JSON-LD:
  - Organization
  - WebSite
  - Product
  - BreadcrumbList
- URL amigavel por slug.
- Imagens otimizadas com next/image.
- Core Web Vitals como criterio de aceite:
  - LCP bom
  - CLS baixo
  - INP controlado

## 7) Integracao Com Backend (Fluxo)

- Catalogo:
  - listagem de produtos
  - detalhe do produto
  - categorias
- Conta:
  - login
  - cadastro
  - recuperacao de senha
- Checkout:
  - cotacao de frete
  - criacao de pedido
- Pos-compra:
  - listagem de pedidos do usuario
  - detalhe do pedido

## 8) Qualidade e Entrega

- Responsivo completo (mobile-first).
- Acessibilidade AA basica:
  - contraste
  - foco visivel
  - labels corretos
- Tratamento de erro amigavel em todas as chamadas.
- Logs de erro no front (Sentry recomendado).
- Lighthouse alvo em paginas principais:
  - Performance acima de 85
  - SEO acima de 95
  - Best Practices acima de 90
  - Accessibility acima de 90
