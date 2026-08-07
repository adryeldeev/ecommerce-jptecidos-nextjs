# Arquitetura do Frontend

Este documento descreve o padrão de organização de código usado neste projeto, pra ser reaproveitado em outros projetos de e-commerce (ou qualquer sistema web com fluxos de negócio parecidos — CRM, ERP, etc.).

## Estrutura de pastas: feature-first (Screaming Architecture)

Não seguimos MVC nem a estrutura padrão do Next.js (componentes soltos dentro de `app/`). São duas responsabilidades separadas:

```
app/                          → só rotas, cada pasta é uma URL
  checkout/page.tsx           → /checkout
  produtos/[slug]/page.tsx    → /produtos/qualquer-coisa

features/                     → toda a lógica, organizada por domínio de negócio
  {dominio}/                  → ex: cart, checkout, catalog, account
    application/              → estado (hooks, stores) e regras
    infrastructure/           → chamadas de API daquele domínio
    presentation/
      components/             → componentes visuais daquele domínio
```

Os arquivos dentro de `app/` são finos de propósito: montam a página, buscam dados, chamam componentes de `features/`. Não é onde a lógica de negócio mora.

### Regra de decisão

Antes de criar um arquivo, pergunte: **"isso é sobre uma URL específica, ou sobre uma coisa que o sistema faz?"**

- URL específica (layout de uma página, título, ordem dos campos na tela) → `app/`
- Lógica de negócio, chamada de API, estado, componente reutilizável → `features/{domínio}/`

Teste rápido: se você apagasse `app/` inteira, `features/` ainda faria sentido sozinho (é só lógica e componentes, sem saber de rota nenhuma). Se apagasse `features/`, `app/` ficaria vazio, sem nada pra chamar.

### Regra de dependência

Só numa direção: `app/` importa de `features/`, nunca o contrário. `features/` pode importar de outra `features/` (ex: o checkout usa o carrinho e o endereço do usuário — `features/checkout` importa de `features/cart` e `features/account`), mas nada dentro de `features/` pode importar de `app/`.

Exemplo real do projeto — `app/checkout/page.tsx` orquestra duas features diferentes:

```tsx
import { useCart } from '@/features/cart/application/use-cart';
import { PaymentBrick } from '@/features/checkout/presentation/components/payment-brick';
import { freightApi } from '@/features/checkout/infrastructure/freight-api';
import { addressApi } from '@/features/account/infrastructure/address-api';
```

### Quando essa arquitetura vale a pena

A organização é a mesma pra e-commerce, CRM ou ERP — o que muda é o quão "gorda" fica cada feature por dentro:

- **E-commerce / CRM pequeno-médio**: feature-first dentro de um monolito, como este projeto. É o suficiente.
- **Regras de negócio muito complexas** (ex: sistema bancário, módulo fiscal de ERP): considerar Domain-Driven Design completo dentro de cada feature (`entities`, `aggregates`, `repositories` formalizados).
- **Muitos domínios que crescem de forma independente e precisam escalar times separados**: monolito modular ou microsserviços — só compensa quando a complexidade operacional de rodar vários serviços é menor que o custo de não escalar.

Não comece complexo — comece com feature-first simples (este padrão) e migre pra DDD/microsserviços só quando sentir a dor real de não ter feito isso.

## Gerenciamento de estado

- **Zustand com `persist`** pra estado do cliente que precisa sobreviver a reload (carrinho, sessão de login).
- **TanStack Query** (`useQuery`/`useMutation`) pra tudo que vem da API — nunca `useEffect` + `fetch` manual.

## Autenticação: JWT stateless, Bearer token

O backend devolve um JWT no login/cadastro: `{ accessToken, usuario }`. O frontend guarda esse token e manda em toda requisição autenticada.

```
1. Login/cadastro → POST /auth/login → recebe { accessToken, usuario }
2. accessToken vai pra um cookie (setAuthToken)
3. usuario (nome, email) vai pro Zustand com persist (useAuth)
4. Toda chamada autenticada passa por um wrapper único (fetchWithAuth)
   que lê o cookie e injeta "Authorization: Bearer <token>" no header
5. Logout → limpa o cookie + zera o Zustand
```

**Regra:** nenhuma chamada de API faz `fetch` direto — tudo passa pelo `api.get/post/put/delete` de `lib/api/client.ts`, que já cuida do header de auth sozinho. Ninguém escreve `Authorization: Bearer` manualmente em nenhum outro lugar do código.

### Ponto de atenção: cookie comum vs `HttpOnly`

Guardar o token num cookie comum (não `HttpOnly`) é o caminho mais simples e funciona, mas o token fica legível por JavaScript no navegador — se o site tiver qualquer XSS, o token pode ser roubado.

O ideal de segurança é um padrão **BFF (Backend for Frontend)**: o próprio servidor Next.js segura o token num cookie `HttpOnly` (inacessível a JS) e faz proxy das chamadas pra API real. É mais trabalho de implementar (toda chamada passa por uma rota própria do Next.js em vez de ir direto pra API) — vale avaliar caso a caso se o projeto justifica esse esforço desde o início, ou se começa simples (cookie comum) e migra depois. Neste projeto escolhemos a segunda opção.

## Segurança: conteúdo dinâmico como HTML

Qualquer campo vindo do backend/admin (descrição de produto, observações, nome, review, etc.) que for renderizado como HTML — `dangerouslySetInnerHTML`, JSON-LD em `<script>`, ou qualquer outro ponto onde texto vira marcação — deve ser tratado antes de ir pra tela:

- HTML de verdade (ex: descrição de produto): sanitizar com `isomorphic-dompurify` (`DOMPurify.sanitize(...)`) antes do `dangerouslySetInnerHTML`.
- Dados estruturados em `<script type="application/ld+json">`: escapar `<` (ex: `jsonLdToScript()`) em vez de usar `JSON.stringify()` cru — evita que um campo com `</script>` quebre a tag e injete JS.

Motivo: sem isso é XSS armazenado — qualquer string vinda do backend vira execução de JavaScript pro navegador de todo mundo que visitar a página.
