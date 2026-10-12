# Skill / Prompt para Codex — Protótipo Astro + Content Collections

## Objetivo

Criar um **protótipo isolado** em **Astro + Content Collections** para avaliar se esta stack é adequada para substituir ou evoluir o atual website/blog.

O protótipo deve testar sobretudo:

- gestão de artigos em Markdown;
- organização por idioma;
- categorias e tags;
- imagens de destaque;
- ligação entre versões PT e EN do mesmo artigo;
- listagem de artigos;
- página individual de artigo;
- simplicidade de publicação;
- validação do frontmatter;
- build de produção;
- adequação futura à integração com um agente editorial que produza ficheiros Markdown prontos a publicar.

Este protótipo é apenas para avaliação.

**Não alterar, mover, apagar ou migrar o site atual.**

---

# 1. Local do projeto

Criar o projeto numa pasta isolada.

Se estiveres num diretório onde seja apropriado criar o protótipo, usar:

```text
astro-website
```

Se a localização não for clara, pergunta antes de criar o projeto.

Nunca usar nem modificar a pasta do website atual.

---

# 2. Regras de execução

Antes de alterar qualquer coisa:

1. verificar a pasta atual;
2. verificar se já existe um projeto com o mesmo nome;
3. confirmar a versão instalada do Node;
4. usar a versão estável atual do Astro;
5. ler a estrutura criada pelo Astro antes de modificar ficheiros;
6. não adicionar dependências sem necessidade;
7. manter a implementação simples;
8. não introduzir CMS, comentários, base de dados ou backend nesta fase;
9. não adicionar Starlight nesta fase;
10. não adicionar Tailwind apenas para este teste, salvo se já fizer parte do template criado.

Se surgir uma decisão estrutural com impacto relevante, parar e explicar as alternativas antes de continuar.

---

# 3. Inicialização

Criar um projeto Astro mínimo com TypeScript configurado de forma simples.

Preferir o template mínimo.

Objetivo aproximado:

```text
astro-website/
├── src/
│   ├── content/
│   │   └── blog/
│   │       ├── pt/
│   │       └── en/
│   ├── layouts/
│   ├── pages/
│   └── components/
├── public/
│   └── images/
├── astro.config.mjs
└── package.json
```

A estrutura concreta pode diferir ligeiramente se a versão atual do Astro usar outra convenção recomendada.

Seguir a convenção oficial da versão instalada.

---

# 4. Content Collection

Criar uma coleção para artigos do blog.

Cada artigo deve suportar e validar pelo menos:

```yaml
title:
slug:
date:
excerpt:
category:
tags:
image:
language:
translation:
status:
```

Tipos esperados:

```text
title       string
slug        string
date        date
excerpt     string
category    string
tags        array de strings
image       string
language    "pt-PT" | "en-GB"
translation string opcional
status      "draft" | "published"
```

Adicionar validação de schema segundo a API recomendada pela versão atual do Astro.

Se a API atual de Content Collections tiver mudado, usar a forma oficialmente recomendada e documentar a diferença.

---

# 5. Conteúdo de teste

Criar ou importar **3 artigos em português** e as respetivas versões em inglês.

Artigos:

1. `Anatomia de uma Skill`
2. `Do localhost ao telemóvel`
3. `IA local: quando faz sentido correr um modelo no nosso próprio computador?`

Se os ficheiros originais estiverem disponíveis no workspace, reutilizar o conteúdo existente.

Se não estiverem disponíveis:

- não inventar os artigos completos;
- criar conteúdo de teste curto claramente marcado como placeholder;
- manter títulos, frontmatter e estrutura suficientes para validar o sistema.

Organização esperada:

```text
src/content/blog/
├── pt/
│   ├── anatomia-de-uma-skill.md
│   ├── do-localhost-ao-telemovel.md
│   └── ia-local-quando-faz-sentido.md
└── en/
    ├── anatomy-of-a-skill.md
    ├── from-localhost-to-mobile.md
    └── local-ai-when-does-it-make-sense.md
```

Se a versão atual do Astro recomendar outra estrutura para coleções, adaptar sem perder a separação PT/EN.

---

# 6. Relação entre traduções

Cada artigo deve conseguir identificar a sua tradução equivalente.

Exemplo PT:

```yaml
language: pt-PT
translation: anatomy-of-a-skill
```

Exemplo EN:

```yaml
language: en-GB
translation: anatomia-de-uma-skill
```

Na página do artigo, mostrar um link discreto:

```text
English version
```

ou:

```text
Versão portuguesa
```

conforme o idioma atual.

---

# 7. Imagens

Cada artigo deve suportar uma imagem principal.

Guardar imagens de teste em:

```text
public/images/blog/
```

ou utilizar a abordagem recomendada pela versão atual do Astro se houver vantagem clara.

O frontmatter deve apontar para a imagem.

Na página individual do artigo:

- mostrar a imagem;
- usar `alt`;
- evitar dependências externas para gestão de imagens nesta fase.

Se não existirem imagens reais disponíveis, criar referências simples e claramente identificadas como placeholders.

---

# 8. Rotas

Criar pelo menos:

```text
/
/blog/
/blog/pt/
/blog/en/
/blog/pt/[slug]/
/blog/en/[slug]/
```

A implementação pode usar rotas dinâmicas.

---

# 9. Página inicial

Criar uma homepage mínima apenas para o protótipo.

Deve conter:

- título do teste;
- pequena descrição;
- link para o blog;
- indicação explícita de que é um protótipo.

Não investir tempo excessivo no design.

---

# 10. Listagem do blog

Criar uma página principal de blog que mostre:

- título;
- excerpt;
- data;
- categoria;
- tags;
- idioma;
- imagem;
- link para o artigo.

Separar ou filtrar PT e EN de forma clara.

---

# 11. Página individual do artigo

Cada artigo deve apresentar:

- imagem principal;
- título;
- data;
- categoria;
- tags;
- conteúdo Markdown;
- link para a tradução, se existir;
- link para voltar ao blog.

O Markdown deve suportar:

- headings;
- listas;
- links;
- blocos de código;
- tabelas;
- citações;
- imagens.

Não adicionar MDX nesta primeira fase, salvo se for estritamente necessário.

---

# 12. Categorias

Criar uma forma simples de listar artigos por categoria.

Exemplo:

```text
/blog/category/inteligencia-artificial/
/blog/category/desenvolvimento-web/
```

Não é necessário criar uma UI complexa.

---

# 13. Tags

Criar uma forma simples de listar artigos por tag.

Exemplo:

```text
/blog/tag/astro/
/blog/tag/ia-local/
```

Garantir que tags com espaços ou acentos geram URLs consistentes e previsíveis.

---

# 14. Ordenação

Na listagem principal:

- ordenar artigos por data;
- mais recentes primeiro;
- artigos `draft` não devem aparecer na listagem pública.

---

# 15. Layout e estilo

Criar apenas o CSS necessário para tornar o protótipo legível.

Objetivos:

- layout limpo;
- largura confortável para leitura;
- boa tipografia;
- blocos de código legíveis;
- imagens responsivas;
- funcionamento em desktop e mobile;
- suporte básico a tema claro/escuro apenas se for simples e nativo.

Não transformar esta fase num projeto de design.

---

# 16. RSS e sitemap

Verificar se a versão atual do Astro permite acrescentar RSS e sitemap de forma oficial e simples.

Se sim:

- adicionar apenas se exigir pouco código e dependências oficiais;
- documentar o que foi adicionado.

Se implicar complexidade desnecessária, deixar para uma fase posterior.

---

# 17. SEO básico

Cada artigo deve ter pelo menos:

```html
<title>
<meta name="description">
```

Usar:

```text
title
excerpt
```

do frontmatter.

Adicionar canonical ou Open Graph apenas se for simples e sem desviar o objetivo do protótipo.

---

# 18. Critério principal: publicação de um novo artigo

O teste deve demonstrar claramente este workflow:

```text
1. criar ficheiro .md
2. preencher frontmatter
3. guardar na pasta correta
4. executar build
5. artigo aparece automaticamente no site
```

Criar no final um pequeno documento:

```text
HOW-TO-ADD-ARTICLE.md
```

com instruções para adicionar um novo artigo.

Este documento é um dos resultados mais importantes do teste.

---

# 19. Integração futura com AGENT-ED

Não implementar integração automática nesta fase.

Apenas garantir que um futuro agente consiga produzir diretamente um ficheiro Markdown semelhante a:

```yaml
---
title: "..."
slug: "..."
date: 2026-10-12
excerpt: "..."
category: "..."
tags:
  - ...
image: "/images/blog/..."
language: "pt-PT"
translation: "..."
status: "published"
---
```

seguido do conteúdo do artigo.

Avaliar se este ficheiro pode ser colocado diretamente na coleção sem qualquer transformação adicional.

---

# 20. O que NÃO implementar

Nesta fase não adicionar:

- Decap CMS;
- TinaCMS;
- Sanity;
- Contentful;
- Starlight;
- comentários;
- Giscus;
- Artalk;
- autenticação;
- base de dados;
- área de administração;
- backend;
- pesquisa externa;
- migração do website atual;
- deploy para produção;
- funcionalidades de portfolio.

O objetivo é testar **Astro + Content Collections + Markdown**.

---

# 21. Validação técnica obrigatória

Depois da implementação:

1. executar o servidor de desenvolvimento;
2. confirmar que não existem erros;
3. abrir pelo menos:
   - homepage;
   - blog;
   - artigo PT;
   - artigo EN;
   - categoria;
   - tag;
4. testar o link entre traduções;
5. testar artigo `draft`;
6. testar um erro de frontmatter para confirmar que o schema o deteta;
7. restaurar depois o frontmatter válido;
8. executar:

```bash
npm run build
```

9. corrigir todos os erros;
10. executar novamente até o build terminar com sucesso.

Se existir comando oficial de verificação do Astro na versão instalada, executá-lo também.

---

# 22. Relatório final

No fim, não limitar a resposta a:

> Está feito.

Produzir um relatório com:

## Estrutura criada

Mostrar árvore resumida do projeto.

## Versões

Indicar:

- Node;
- npm;
- Astro;
- dependências relevantes.

## Funcionalidades testadas

Exemplo:

```text
✓ Markdown
✓ Content Collections
✓ schema de frontmatter
✓ PT / EN
✓ traduções relacionadas
✓ categorias
✓ tags
✓ imagens
✓ artigos draft
✓ build
```

## Build

Indicar explicitamente:

```text
npm run build: OK
```

ou explicar qualquer limitação.

## Adicionar novo artigo

Explicar em poucas linhas o workflow.

## Pontos positivos encontrados

Analisar:

- facilidade de trabalhar com Markdown;
- organização;
- simplicidade;
- performance;
- integração futura.

## Limitações encontradas

Não esconder problemas.

## Fricção editorial

Responder concretamente:

> Quantos passos existem entre receber um Markdown pronto do AGENT-ED e o artigo aparecer no site?

## Conclusão

Classificar o protótipo como:

```text
APROVADO PARA CONTINUAR TESTES
```

ou:

```text
NÃO RECOMENDADO
```

e explicar porquê.

---

# 23. Princípio de implementação

A prioridade não é demonstrar tudo o que Astro consegue fazer.

A prioridade é responder:

> **Astro + Content Collections torna a gestão do blog em Markdown mais simples, previsível e escalável do que o processo atual?**

Escolher sempre a implementação mais simples capaz de responder corretamente a essa pergunta.
