# Checklist de Execucao por Sprint (Front Ecommerce)

Baseado no briefing oficial do projeto.

## Sprint 0 - Fundacao Tecnica

Objetivo: preparar arquitetura, qualidade e base de performance/SEO.

- [ ] Inicializar projeto com Next.js 15 + App Router + TypeScript + Tailwind.
- [ ] Definir estrutura feature-first por dominio.
- [ ] Criar camadas base:
  - [ ] presentation
  - [ ] application
  - [ ] infrastructure
- [ ] Configurar TanStack Query.
- [ ] Configurar React Hook Form + Zod.
- [ ] Criar cliente HTTP com tratamento padrao de erro.
- [ ] Criar BFF no Next (route handlers) para auth/cookies.
- [ ] Definir estrategia de cookies:
  - [ ] sessao HttpOnly + Secure + SameSite=Lax
  - [ ] carrinho anonimo com cartId
  - [ ] consentimento LGPD
- [ ] Configurar observabilidade inicial:
  - [ ] Sentry no front
  - [ ] logger de erro padrao
- [ ] Configurar baseline de SEO tecnico:
  - [ ] metadata global
  - [ ] robots.txt
  - [ ] sitemap dinamico

Criterio de pronto Sprint 0:
- [ ] Arquitetura e infra validas para inicio das features.
- [ ] Auth sem token em localStorage.

## Sprint 1 - Home + Catalogo (PLP)

Objetivo: entregar descoberta de produtos com SEO e filtros.

- [ ] Construir Home com secoes principais e links internos.
- [ ] Construir pagina de listagem de produtos (PLP).
- [ ] Integrar APIs de catalogo:
  - [ ] listagem de produtos
  - [ ] categorias
- [ ] Implementar filtros:
  - [ ] categoria
  - [ ] cor
  - [ ] preco
  - [ ] unidade
- [ ] Implementar paginacao.
- [ ] Criar componentes:
  - [ ] header com busca/conta/minicart
  - [ ] footer institucional + SEO interno
  - [ ] grid de produtos
  - [ ] card de produto com CTA
- [ ] Implementar estados de feedback:
  - [ ] loading
  - [ ] vazio
  - [ ] erro
  - [ ] sucesso
- [ ] SEO por pagina:
  - [ ] title/description/OG/Twitter
  - [ ] canonical
  - [ ] JSON-LD (Organization + WebSite)

Criterio de pronto Sprint 1:
- [ ] Home e PLP navegaveis e responsivas.
- [ ] Lighthouse: Perf > 85, SEO > 95 nas paginas entregues.

## Sprint 2 - PDP + Carrinho

Objetivo: fechar fluxo de selecao de produto e adicao ao carrinho.

- [ ] Construir pagina de detalhe do produto (PDP por slug).
- [ ] Integrar API de detalhe do produto.
- [ ] Implementar galeria de imagens com next/image.
- [ ] Implementar seletor de variacao (cor/largura).
- [ ] Implementar carrinho lateral (minicart) e carrinho completo.
- [ ] Implementar merge de carrinho anonimo apos login.
- [ ] Implementar resumo de pedido parcial.
- [ ] SEO PDP:
  - [ ] metadata dinamica
  - [ ] canonical
  - [ ] JSON-LD Product
  - [ ] BreadcrumbList

Criterio de pronto Sprint 2:
- [ ] Fluxo PLP -> PDP -> carrinho funcional.
- [ ] Imagens otimizadas e CLS baixo.

## Sprint 3 - Conta (Auth + Area do Cliente)

Objetivo: concluir jornada de autenticacao e area logada.

- [ ] Login.
- [ ] Cadastro.
- [ ] Esqueci senha.
- [ ] Redefinir senha.
- [ ] Meus pedidos (listagem).
- [ ] Detalhe do pedido.
- [ ] Meus enderecos.
- [ ] Integrar APIs de conta e pos-compra.
- [ ] Validacoes com RHF + Zod em todos os formularios.
- [ ] Tratar expiracao de sessao com relogin controlado.

Criterio de pronto Sprint 3:
- [ ] Fluxo de conta completo sem exposicao de token no browser.

## Sprint 4 - Checkout + Sucesso

Objetivo: finalizar conversao ponta a ponta.

- [ ] Construir pagina de checkout.
- [ ] Construir formulario de endereco.
- [ ] Integrar cotacao de frete.
- [ ] Integrar criacao de pedido.
- [ ] Construir pagina de sucesso do pedido.
- [ ] Implementar resumo final de pedido e frete.
- [ ] Ajustar feedbacks de erro/sucesso no checkout.

Criterio de pronto Sprint 4:
- [ ] Fluxo carrinho -> checkout -> sucesso operando com backend.

## Sprint 5 - Institucionais + Hardening

Objetivo: completar obrigatorios finais e elevar qualidade.

- [ ] Paginas institucionais:
  - [ ] sobre
  - [ ] contato
  - [ ] politica de privacidade
  - [ ] termos
- [ ] Revisao de acessibilidade AA basica:
  - [ ] contraste
  - [ ] foco visivel
  - [ ] labels corretos
- [ ] Revisao de performance (Core Web Vitals):
  - [ ] LCP bom
  - [ ] CLS baixo
  - [ ] INP controlado
- [ ] Revisao final de SEO tecnico e conteudo indexavel.
- [ ] Revisao final de logs e monitoramento de erros.

Criterio de pronto Sprint 5:
- [ ] Lighthouse alvo atingido nas paginas principais:
  - [ ] Performance > 85
  - [ ] SEO > 95
  - [ ] Best Practices > 90
  - [ ] Accessibility > 90

## Checklist Geral de Aceite do Projeto

- [ ] Todas as paginas obrigatorias entregues.
- [ ] Todos os componentes obrigatorios entregues.
- [ ] Sessao e carrinho via cookies conforme briefing.
- [ ] BFF funcionando para auth e cookies.
- [ ] Sem token em localStorage.
- [ ] Mobile-first validado.
- [ ] Erros tratados de forma amigavel.
- [ ] Sentry em producao.
