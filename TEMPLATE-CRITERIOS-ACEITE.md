# Template de Criterios de Aceite (Paginas e Componentes)

Use este template para cada item de backlog.

## 1) Informacoes Basicas

- ID:
- Titulo:
- Tipo: feature | integration | chore | bugfix
- Responsavel:
- Dependencias:
- Endpoint(s) do backend relacionado(s):

## 2) Escopo Funcional

- Objetivo da entrega:
- Regra(s) de negocio principal(is):
- Entradas esperadas:
- Saidas esperadas:
- Fora de escopo:

## 3) Criterios Funcionais (Given/When/Then)

1. Given [contexto inicial], When [acao], Then [resultado esperado].
2. Given [contexto inicial], When [acao], Then [resultado esperado].
3. Given [contexto inicial], When [acao], Then [resultado esperado].

## 4) Criterios de UI/UX

- [ ] Responsivo mobile-first.
- [ ] Layout consistente com design system.
- [ ] Estados de interface implementados:
  - [ ] loading
  - [ ] vazio
  - [ ] erro
  - [ ] sucesso
- [ ] CTA principal claro e visivel.
- [ ] Mensagens de erro amigaveis.

## 5) Criterios de Formularios (se aplicavel)

- [ ] React Hook Form implementado.
- [ ] Schema Zod implementado.
- [ ] Validacao client-side.
- [ ] Validacao server-side refletida na UI.
- [ ] Labels corretos e mensagem por campo.

## 6) Criterios de Integracao com Backend

- [ ] Endpoint integrado via camada infrastructure.
- [ ] Mapeamento de request/response implementado.
- [ ] Tratamento de timeout/rede/erro HTTP.
- [ ] Retries/politica de cache avaliados (TanStack Query).
- [ ] Logs de erro enviados ao Sentry (quando erro inesperado).

## 7) Criterios de Cookies e Sessao (se aplicavel)

- [ ] Sem uso de token em localStorage.
- [ ] Sessao via cookie HttpOnly + Secure + SameSite=Lax.
- [ ] Fluxo de expiracao de sessao tratado.
- [ ] Carrinho anonimo com cartId em cookie.
- [ ] Merge carrinho anonimo + logado validado.
- [ ] Consentimento LGPD respeitado para analytics/marketing.

## 8) Criterios de SEO (se pagina indexavel)

- [ ] title e description definidos.
- [ ] Open Graph definido.
- [ ] Twitter Card definido.
- [ ] Canonical definido.
- [ ] URL amigavel por slug.
- [ ] JSON-LD aplicavel implementado:
  - [ ] Organization
  - [ ] WebSite
  - [ ] Product
  - [ ] BreadcrumbList

## 9) Criterios de Performance

- [ ] Imagens com next/image.
- [ ] Sem shift visual relevante (CLS baixo).
- [ ] Conteudo principal carrega com LCP bom.
- [ ] Interatividade sem travamento perceptivel (INP controlado).
- [ ] Evitar JS client desnecessario em paginas SEO.

## 10) Criterios de Acessibilidade (AA basica)

- [ ] Contraste adequado.
- [ ] Navegacao por teclado funcional.
- [ ] Foco visivel.
- [ ] Labels/aria corretos.
- [ ] Hierarquia semantica de headings.

## 11) Criterios de Teste e Validacao

- [ ] Cenarios principais testados manualmente.
- [ ] Cenarios de erro testados.
- [ ] Regressao critica validada.
- [ ] Lighthouse da pagina (quando aplicavel):
  - [ ] Performance > 85
  - [ ] SEO > 95
  - [ ] Best Practices > 90
  - [ ] Accessibility > 90

## 12) Definicao de Pronto (DoD)

- [ ] Codigo revisado.
- [ ] Sem erro bloqueante conhecido.
- [ ] Telemetria/erros monitoraveis em producao.
- [ ] Criterios acima atendidos e validados.

## 13) Evidencias

- Links de PR:
- Capturas de tela:
- Resultado Lighthouse:
- Observacoes finais:
