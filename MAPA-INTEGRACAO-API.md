# Mapa de Integração por Caso de Uso - Ecommerce Público

## Regras Críticas de Nomenclatura

### Padrão de Nomes
- **Usuario/Categoria**: usam `nome`
- **Produto**: usa `titulo` (não `nome`)
- **Senha**: usa `senha` (não `password`)
- **Preço/Quantidade decimais**: sempre `string` (ex: "39.90", "100.250"), nunca `number`

---

## Casos de Uso e Endpoints

### 1. Home / Catálogo

#### Listar Categorias
```
GET /catalogo/categorias
```

#### Listar Produtos
```
GET /catalogo/produtos?page=1&limit=20&busca=&categoriaSlug=&cor=&unidadeMedida=&precoMin=&precoMax=&somenteDisponiveis=&ordenacao=
```

**Filtros via query:**
- `page`: número da página
- `limit`: itens por página
- `busca`: termo de busca
- `categoriaSlug`: slug da categoria
- `cor`: filtro por cor
- `unidadeMedida`: filtro por unidade de medida
- `precoMin`: preço mínimo
- `precoMax`: preço máximo
- `somenteDisponiveis`: boolean para filtrar apenas disponíveis
- `ordenacao`: critério de ordenação

---

### 2. Autenticação Cliente

#### Registro
```
POST /auth/register
```
**Payload:**
```json
{
  "nome": "string",
  "email": "string",
  "senha": "string"
}
```

#### Login
```
POST /auth/login
```
**Payload:**
```json
{
  "email": "string",
  "senha": "string"
}
```
**Response:**
```json
{
  "token": "string",
  "usuario": {
    "nome": "string",
    "email": "string"
  }
}
```

#### Esqueci Senha
```
POST /auth/forgot-password
```
**Payload:**
```json
{
  "email": "string"
}
```

#### Resetar Senha
```
POST /auth/reset-password
```
**Payload:**
```json
{
  "token": "string",
  "novaSenha": "string"
}
```

---

### 3. Endereços (Autenticado com Bearer)

#### Criar Endereço
```
POST /enderecos
Authorization: Bearer {token}
```
**Payload:**
```json
{
  "cep": "string",
  "rua": "string",
  "numero": "string",
  "complemento": "string",
  "bairro": "string",
  "cidade": "string",
  "estado": "string"
}
```

#### Listar Endereços
```
GET /enderecos
Authorization: Bearer {token}
```

#### Buscar Endereço por ID
```
GET /enderecos/{id}
Authorization: Bearer {token}
```

#### Atualizar Endereço
```
PATCH /enderecos/{id}
Authorization: Bearer {token}
```
**Payload:**
```json
{
  "cep": "string",
  "rua": "string",
  "numero": "string",
  "complemento": "string",
  "bairro": "string",
  "cidade": "string",
  "estado": "string"
}
```

#### Deletar Endereço
```
DELETE /enderecos/{id}
Authorization: Bearer {token}
```

---

### 4. Frete

#### Cotação de Frete
```
POST /fretes/cotacao
```
**Payload:**
```json
{
  "cep": "string",
  "subtotal": "string",
  "metodo": "string (opcional)",
  "estado": "string (opcional)"
}
```

---

### 5. Checkout / Pedidos (Autenticado com Bearer)

#### Criar Pedido
```
POST /pedidos
Authorization: Bearer {token}
```
**Payload:**
```json
{
  "enderecoId": "string",
  "freteMetodo": "string",
  "metodoPagamento": "string",
  "paymentMethodId": "string (obrigatório quando cartão)",
  "paymentProvider": "stripe (obrigatório quando cartão)",
  "itens": [
    {
      "produtoVariacaoId": "string",
      "quantidade": "string"
    }
  ]
}
```

#### Listar Pedidos
```
GET /pedidos
Authorization: Bearer {token}
```

---

## Dicionário de Campos por Domínio

### Auth
- `email`: string
- `senha`: string
- `nome`: string
- `token`: string
- `novaSenha`: string

### Categoria
- `nome`: string
- `slug`: string

### Produto
- `titulo`: string (não `nome`)
- `descricao`: string
- `precoBase`: string (não number)
- `quantidadeEstoque`: string (não number)
- `unidadeMedida`: string
- `categoriaId`: string

### Variação
- `produtoId`: string
- `cor`: string
- `largura`: string (opcional)
- `estoque`: string (não number)
- `sku`: string

### Endereço
- `cep`: string
- `rua`: string
- `numero`: string
- `complemento`: string
- `bairro`: string
- `cidade`: string
- `estado`: string

### Frete
- `cep`: string
- `subtotal`: string
- `metodo`: string
- `estado`: string

### Pedido
- `enderecoId`: string
- `freteMetodo`: string
- `metodoPagamento`: string
- `paymentMethodId`: string (quando cartão)
- `paymentProvider`: string (stripe quando cartão)
- `itens`: array
  - `produtoVariacaoId`: string
  - `quantidade`: string

### Filtros de Listagem
- `page`: number
- `limit`: number
- `busca`: string
- `categoriaSlug`: string
- `cor`: string
- `unidadeMedida`: string
- `precoMin`: string
- `precoMax`: string
- `somenteDisponiveis`: boolean
- `ordenacao`: string

---

## Observações Importantes

1. **Autenticação**: Endpoints de endereços e pedidos requerem header `Authorization: Bearer {token}`
2. **Decimais**: Campos de preço e quantidade devem sempre ser strings no request
3. **Nomenclatura**: Seguir estritamente o dicionário de campos acima
4. **Paginação**: Usar query params `page` e `limit`
5. **Filtros**: Seguir exatamente os nomes definidos para filtros de listagem
