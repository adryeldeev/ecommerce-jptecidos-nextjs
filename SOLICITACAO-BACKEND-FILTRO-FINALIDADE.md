# Solicitações Backend — Frontend Storefront

Pendências de backend levantadas durante o trabalho no frontend. Seguem cada uma com contexto, escopo e critério de aceite.

- **Solicitação 1** ✅ concluída: Campo "Finalidade" no Produto (filtro dos ícones da home)
- **Solicitação 2** ✅ concluída: Contagem de produtos por categoria (seção "Categorias" da home)
- **Solicitação 3** 🔴 urgente: CORS bloqueando o domínio de produção do frontend (Vercel) — catálogo está fora do ar em produção por causa disso agora mesmo

---

# Solicitação 1 — Campo "Finalidade" no Produto

## 1) Informações Básicas

- ID: FE-BACKEND-001
- Título: Adicionar campo `finalidades` ao Produto + filtro no endpoint de listagem
- Tipo: feature (backend)
- Solicitante: Frontend (storefront)
- Endpoint(s) relacionado(s): `GET /catalogo/produtos`, `GET /catalogo/produtos/:slug`, endpoints de criação/edição de produto (admin)

## 2) Motivação

Hoje a home tem duas seções que filtram por **categoria de material** (Jeans, Algodão, Linho, etc.) — os ícones logo abaixo do hero e a seção "Categorias" mais abaixo, ambos usando `GET /catalogo/categorias`. Isso é redundante: a mesma informação aparece duas vezes com visual diferente.

A ideia é transformar os ícones do topo em um filtro por **finalidade/uso do tecido** — uma dimensão diferente e cruzada com a categoria de material. Um mesmo tecido pode ser, por exemplo, categoria `"Jeans"` e ao mesmo tempo finalidade `"moda"` + `"premium"`. Isso não existe no modelo de dado hoje.

## 3) Escopo Funcional

### O que precisa mudar

**a) Novo campo no Produto:**

```
finalidades: string[]
```

- Tipo: array de strings (um produto pode ter **mais de uma** finalidade ao mesmo tempo)
- Opcional (nem todo produto precisa ter finalidade definida)
- Valores permitidos (enum fixo, não é texto livre):

| Valor           | Label exibido no front |
|-----------------|------------------------|
| `moda`          | Moda                   |
| `decoracao`     | Decoração              |
| `alfaiataria`   | Alfaiataria            |
| `infantil`      | Infantil               |
| `cama-banho`    | Cama & Banho           |
| `natural`       | Natural                |
| `premium`       | Premium                |
| `promocao`      | Promoção               |

**b) Filtro no endpoint de listagem:**

```
GET /catalogo/produtos?finalidade=moda
```

- Retorna produtos onde `finalidades` contém o valor informado.
- Mesmo padrão dos filtros que já existem (`categoriaSlug`, `cor`, `unidadeMedida` etc.) — um valor por vez é suficiente por enquanto, não precisa suportar múltiplos valores na mesma chamada.

**c) Campo precisa vir na resposta:**

- `GET /catalogo/produtos` (listagem) — cada item do array precisa incluir `finalidades`.
- `GET /catalogo/produtos/:slug` (detalhe) — precisa incluir `finalidades`.

**d) Cadastro/edição (admin):**

- Precisa existir algum jeito de definir `finalidades` ao criar/editar produto (multi-select, já que é array).
- Produtos existentes vão nascer com `finalidades: []` — alguém do time vai precisar tagear os produtos já cadastrados manualmente depois que o campo existir.

### Fora de escopo

- Não precisa de tela própria de gerenciamento de finalidades — a lista de valores é fixa (enum acima), não é um cadastro dinâmico como Categoria.
- Não precisa suportar filtro por múltiplas finalidades numa única requisição.

## 4) Critérios de Aceite (Given/When/Then)

1. Given um produto tem `finalidades: ["moda", "premium"]`, When eu busco `GET /catalogo/produtos/:slug` desse produto, Then a resposta inclui `"finalidades": ["moda", "premium"]`.
2. Given existem produtos com finalidades diferentes, When eu chamo `GET /catalogo/produtos?finalidade=infantil`, Then a resposta só traz produtos que têm `"infantil"` no array `finalidades`.
3. Given um produto não tem finalidade definida, When eu busco esse produto, Then `finalidades` vem como `[]` (nunca `null`/`undefined`).
4. Given eu envio um valor de finalidade fora do enum (ex: `?finalidade=chique`), When a API recebe essa query, Then retorna erro de validação (mesmo padrão do erro que já existe hoje pra `ordenacao`/`unidadeMedida` inválidos).

## 5) Exemplo de Resposta Esperada

```json
{
  "id": "...",
  "titulo": "Jeans Pesado 100%",
  "slug": "jeans-pesado-100",
  "categoria": { "nome": "Jeans", "slug": "jeans" },
  "finalidades": ["moda", "premium"],
  "precoBase": "44.90"
}
```

## 6) Definição de Pronto (DoD)

- [ ] Campo `finalidades` adicionado ao modelo de Produto.
- [ ] Migração de banco aplicada (campo novo, default `[]`).
- [ ] `GET /catalogo/produtos` aceita `?finalidade=<valor>` e filtra corretamente.
- [ ] `GET /catalogo/produtos` e `GET /catalogo/produtos/:slug` retornam `finalidades` no payload.
- [ ] Validação de enum implementada (rejeita valor fora da lista).
- [ ] Admin permite definir `finalidades` no cadastro/edição de produto.
- [ ] Time avisado de que produtos existentes precisam ser tageados manualmente.

## 7) Aviso para o Frontend (quando pronto)

Quando esse campo estiver disponível em produção/homologação, avisar o time de frontend para:
- Trocar os ícones abaixo do hero da home para usar as 8 finalidades fixas (com ícone próprio por valor).
- Ligar o clique de cada ícone ao filtro `?finalidade=<valor>` no catálogo.
- Remover a duplicidade atual entre os ícones e a seção "Categorias".

---

# Solicitação 2 — Contagem de Produtos por Categoria

## 1) Informações Básicas

- ID: FE-BACKEND-002
- Título: Adicionar contagem de produtos ao endpoint de categorias
- Tipo: feature (backend)
- Solicitante: Frontend (storefront)
- Endpoint(s) relacionado(s): `GET /catalogo/categorias`

## 2) Motivação

A seção "Categorias" da home mostra um card por categoria (foto + nome) e deveria mostrar também quantos produtos existem naquela categoria (ex: "23 produtos"), como referência visual pedida pelo time. Hoje `GET /catalogo/categorias` retorna só `id`, `nome`, `slug` e `imagemUrl` — sem contagem.

Dá pra calcular isso no frontend fazendo uma chamada extra por categoria (`GET /catalogo/produtos?categoriaSlug=X&limit=1` e lendo o campo `total`), mas isso significa 1 requisição a mais **por categoria exibida**, toda vez que a home carrega — e a API de produtos tem rate limit (120 requisições por janela, visto no header `X-RateLimit-Limit`). Calcular isso uma vez no banco (`COUNT` agrupado por categoria) é mais barato e evita consumir esse limite à toa.

## 3) Escopo Funcional

### O que precisa mudar

**Novo campo na resposta de `GET /catalogo/categorias`:**

```json
{
  "id": "...",
  "nome": "Jeans",
  "slug": "jeans",
  "imagemUrl": "https://...",
  "totalProdutos": 23
}
```

- Campo: `totalProdutos` (number)
- Deve refletir a quantidade de produtos ativos/disponíveis naquela categoria no momento da consulta.
- Se a categoria não tiver nenhum produto, retornar `0` (nunca `null`/`undefined`).

### Fora de escopo

- Não precisa ser filtro nem parâmetro de busca — é só um campo informativo a mais na resposta que já existe.

## 4) Critérios de Aceite (Given/When/Then)

1. Given uma categoria tem 23 produtos cadastrados, When eu chamo `GET /catalogo/categorias`, Then o item dessa categoria retorna `"totalProdutos": 23`.
2. Given uma categoria não tem nenhum produto, When eu chamo `GET /catalogo/categorias`, Then o item dessa categoria retorna `"totalProdutos": 0`.

## 5) Definição de Pronto (DoD)

- [ ] Campo `totalProdutos` adicionado à resposta de `GET /catalogo/categorias`.
- [ ] Contagem calculada no backend (não requer chamada extra do frontend).
- [ ] Testado com categoria vazia (retorna `0`, não `null`).

## 6) Aviso para o Frontend (quando pronto)

Quando esse campo estiver disponível, avisar o frontend para exibir "X produtos" em cada card da seção "Categorias" da home (`categories-section.tsx`), usando `category.totalProdutos`.

---

# Solicitação 3 — CORS bloqueando o domínio de produção (URGENTE)

## 1) Informações Básicas

- ID: FE-BACKEND-003
- Título: Adicionar domínio do Vercel na lista de origens CORS permitidas
- Tipo: bugfix (backend) — **bloqueando o site em produção agora**
- Solicitante: Frontend (storefront)
- Endpoint(s) relacionado(s): todos (configuração global de CORS da API)

## 2) Motivação

O frontend foi publicado no Vercel e a API já responde normalmente quando testada direto (via curl/Postman), mas o navegador bloqueia toda chamada feita pelo site em produção. Isso acontece porque o CORS da API só libera `http://localhost:3000` — qualquer outra origem (como o domínio do Vercel) recebe a resposta **sem** o header `Access-Control-Allow-Origin`, e o navegador descarta a resposta antes do JavaScript conseguir ler.

Confirmado comparando as duas chamadas:

```
Origin: http://localhost:3000
→ access-control-allow-origin: http://localhost:3000   (liberado)

Origin: https://<dominio-do-vercel>
→ (nenhum header access-control-allow-origin)            (bloqueado)
```

Resultado prático: a página de catálogo em produção mostra "Erro ao carregar produtos" — não é falha na API, é o navegador recusando a resposta por causa do CORS.

## 3) Escopo Funcional

### O que precisa mudar

Adicionar à lista de origens permitidas no CORS do backend:

```
https://<PREENCHER: domínio de produção do Vercel>
```

**Recomendação**: como o Vercel gera um subdomínio novo pra cada deploy de preview (ex: `projeto-git-branch-usuario.vercel.app`), também é útil liberar um padrão coringa pra esses domínios de preview, além do domínio de produção fixo. Se o framework de CORS usado (ex: `cors` do Express/Nest) suportar regex/função de validação, algo como:

```
/^https:\/\/ecommerce-jptecidos-nextjs.*\.vercel\.app$/
```

cobre produção + todos os previews automaticamente, sem precisar atualizar a lista toda vez que um novo preview for gerado.

Quando o domínio próprio (`jptecidos.com.br` ou o que for definido) for comprado e conectado, esse também precisa entrar na lista.

### Fora de escopo

- Não precisa liberar CORS pra `*` (todas as origens) — isso abriria a API pra qualquer site, sem necessidade.

## 4) Critérios de Aceite (Given/When/Then)

1. Given uma requisição vem com `Origin: https://<domínio de produção do Vercel>`, When a API responde, Then o header `Access-Control-Allow-Origin` reflete essa origem.
2. Given uma requisição vem de um domínio de preview do Vercel (se o padrão coringa for implementado), When a API responde, Then também é liberado.
3. Given uma requisição vem de uma origem não listada/fora do padrão, When a API responde, Then continua **sem** liberar (CORS não pode virar `*`).

## 5) Definição de Pronto (DoD)

- [ ] Domínio de produção do Vercel adicionado à lista de origens CORS.
- [ ] (Opcional, recomendado) Padrão coringa pra domínios de preview do Vercel.
- [ ] Testado: catálogo carrega normalmente no site publicado, sem erro no console do navegador.

## 6) Aviso para o Frontend (quando pronto)

Nenhuma mudança de código necessária do lado do frontend — assim que o CORS for ajustado, o site em produção passa a funcionar automaticamente.
