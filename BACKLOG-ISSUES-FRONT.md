# Backlog de Issues (Epicos + Tarefas)

Formato sugerido para importar no board (Jira/GitHub Projects/Linear).

## Epico FE-EPIC-01 - Fundacao Front e Arquitetura

- FE-001: Inicializar Next.js 15 + App Router + TypeScript + Tailwind
  - Tipo: chore
  - Prioridade: alta
  - Dependencias: nenhuma
  - Criterios de aceite:
    - Projeto sobe em dev e build sem erro.
    - Estrutura inicial de pastas pronta.

- FE-002: Definir arquitetura feature-first e camadas
  - Tipo: chore
  - Prioridade: alta
  - Dependencias: FE-001
  - Criterios de aceite:
    - Dominios separados por feature.
    - Camadas presentation/application/infrastructure documentadas.

- FE-003: Configurar TanStack Query + RHF + Zod
  - Tipo: chore
  - Prioridade: alta
  - Dependencias: FE-001

- FE-004: Implementar cliente HTTP padrao com mapeamento de erros
  - Tipo: tech
  - Prioridade: alta
  - Dependencias: FE-002

- FE-005: Criar BFF com route handlers para auth e sessao
  - Tipo: feature
  - Prioridade: critica
  - Dependencias: FE-004
  - Criterios de aceite:
    - Login via BFF.
    - Cookie HttpOnly configurado.

## Epico FE-EPIC-02 - Catalogo e Descoberta

- FE-010: Implementar Home publica
  - Tipo: feature
  - Prioridade: alta
  - Dependencias: FE-001

- FE-011: Implementar Header (busca, conta, minicart)
  - Tipo: feature
  - Prioridade: alta
  - Dependencias: FE-010

- FE-012: Implementar Footer (institucional + SEO interno)
  - Tipo: feature
  - Prioridade: media
  - Dependencias: FE-010

- FE-013: Implementar PLP com paginacao
  - Tipo: feature
  - Prioridade: alta
  - Dependencias: FE-004

- FE-014: Integrar API de categorias
  - Tipo: integration
  - Prioridade: alta
  - Dependencias: FE-004

- FE-015: Integrar API de listagem de produtos
  - Tipo: integration
  - Prioridade: alta
  - Dependencias: FE-004

- FE-016: Implementar filtros (categoria, cor, preco, unidade)
  - Tipo: feature
  - Prioridade: alta
  - Dependencias: FE-013, FE-014, FE-015

- FE-017: Implementar Product Card + Product Grid
  - Tipo: feature
  - Prioridade: alta
  - Dependencias: FE-013

## Epico FE-EPIC-03 - PDP e Carrinho

- FE-020: Implementar PDP por slug
  - Tipo: feature
  - Prioridade: alta
  - Dependencias: FE-015

- FE-021: Integrar API de detalhe do produto
  - Tipo: integration
  - Prioridade: alta
  - Dependencias: FE-004

- FE-022: Galeria de imagens com next/image
  - Tipo: feature
  - Prioridade: alta
  - Dependencias: FE-020, FE-021

- FE-023: Seletor de variacao (cor/largura)
  - Tipo: feature
  - Prioridade: alta
  - Dependencias: FE-020, FE-021

- FE-024: Carrinho lateral (minicart)
  - Tipo: feature
  - Prioridade: alta
  - Dependencias: FE-011

- FE-025: Carrinho completo
  - Tipo: feature
  - Prioridade: alta
  - Dependencias: FE-024

- FE-026: Carrinho anonimo via cartId em cookie
  - Tipo: feature
  - Prioridade: critica
  - Dependencias: FE-005

- FE-027: Merge de carrinho apos login
  - Tipo: feature
  - Prioridade: critica
  - Dependencias: FE-026

## Epico FE-EPIC-04 - Conta do Cliente

- FE-030: Tela de login
- FE-031: Tela de cadastro
- FE-032: Tela esqueci senha
- FE-033: Tela redefinir senha
- FE-034: Meus pedidos (listagem)
- FE-035: Detalhe do pedido
- FE-036: Meus enderecos

Notas do epico:
- Tipo: feature/integration
- Prioridade: alta
- Dependencias: FE-005
- Criterios de aceite comuns:
  - Formularios com RHF + Zod.
  - Feedback de erro amigavel.
  - Fluxo de sessao expirada com relogin.

## Epico FE-EPIC-05 - Checkout e Conversao

- FE-040: Implementar pagina de checkout
- FE-041: Formulario de endereco
- FE-042: Integrar cotacao de frete
- FE-043: Integrar criacao de pedido
- FE-044: Implementar resumo de pedido e frete
- FE-045: Implementar pagina de sucesso do pedido

Notas do epico:
- Prioridade: critica
- Dependencias: FE-025, FE-041

## Epico FE-EPIC-06 - SEO Profissional

- FE-050: Metadata por pagina (title/description/OG/Twitter)
- FE-051: Canonical em paginas indexaveis
- FE-052: Sitemap dinamico
- FE-053: Robots.txt
- FE-054: JSON-LD Organization e WebSite
- FE-055: JSON-LD Product no PDP
- FE-056: JSON-LD BreadcrumbList

## Epico FE-EPIC-07 - Institucionais e Compliance

- FE-060: Pagina sobre
- FE-061: Pagina contato
- FE-062: Pagina politica de privacidade
- FE-063: Pagina termos
- FE-064: Banner/cookie de consentimento LGPD

## Epico FE-EPIC-08 - Qualidade, Observabilidade e A11y

- FE-070: Implementar estados padrao (loading/vazio/erro/sucesso)
- FE-071: Integrar Sentry no front
- FE-072: Revisao de acessibilidade AA basica
- FE-073: Revisao de responsividade mobile-first
- FE-074: Otimizacao Core Web Vitals
- FE-075: Rodada Lighthouse final nas paginas principais

Criterio global de aceite:
- Performance > 85
- SEO > 95
- Best Practices > 90
- Accessibility > 90

## Sugestao de Labels

- area:catalogo
- area:pdp
- area:carrinho
- area:checkout
- area:conta
- area:seo
- area:infra
- area:a11y
- prioridade:critica
- prioridade:alta
- prioridade:media
