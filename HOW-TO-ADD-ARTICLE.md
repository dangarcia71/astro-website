# Adicionar um artigo

Este é um protótipo estático. Não é necessário editar listas, rotas ou componentes para publicar um artigo.

## Workflow

1. Criar um ficheiro `.md` em `src/content/blog/pt/` ou `src/content/blog/en/`.
2. Preencher o frontmatter e escrever o conteúdo Markdown. O nome do ficheiro deve ser único na pasta; o campo `slug` define o URL público.
3. Guardar a imagem em `public/images/blog/` e referenciá-la em `image`. Se já existir, reutilizar o caminho.
4. Executar `npm run check` e `npm run build`. O artigo entra automaticamente nas páginas, categorias, tags, RSS e sitemap quando tem `status: "published"`.
5. Para ver o resultado do build, executar `npm run preview` e abrir o endereço indicado no terminal.

Publicar num domínio requer depois carregar `dist/` para o alojamento. Este protótipo não implementa deploy.

## Exemplo pronto para guardar

Guardar como `src/content/blog/pt/o-meu-novo-artigo.md`:

```markdown
---
title: "O meu novo artigo"
slug: "o-meu-novo-artigo"
date: "2026-10-12"
excerpt: "Uma descrição curta para a listagem, SEO e RSS."
category: "Desenvolvimento Web"
tags:
  - Astro
  - Markdown
image: "/images/blog/skill-placeholder.svg"
language: "pt-PT"
status: "published"
---

## Introdução

Conteúdo do artigo em Markdown.

> Uma citação.

- Primeiro ponto
- Segundo ponto
```

A imagem deste exemplo é um placeholder existente. Usar uma imagem adequada quando houver conteúdo real.

## Contrato editorial

| Campo | Regra |
| --- | --- |
| `title`, `excerpt`, `category` | Texto não vazio |
| `slug` | Minúsculas, números e hífen; único por idioma |
| `date` | Data ISO `AAAA-MM-DD`; usar aspas para validar o calendário |
| `tags` | Lista com pelo menos uma tag não vazia |
| `image` | Caminho existente em `/images/blog/`, nome sem espaços/acentos; SVG, PNG, JPG, JPEG, WebP ou AVIF |
| `language` | `pt-PT` na pasta `pt`; `en-GB` na pasta `en` |
| `translation` | Opcional: slug da versão no outro idioma |
| `status` | `draft` ou `published` |

O YAML também aceita datas sem aspas, como no brief, mas pode normalizar datas impossíveis antes da validação. Por isso o contrato recomendado para o AGENT-ED usa sempre aspas na data. Não há transformação adicional do ficheiro com este contrato.

## Traduções

Criar a versão inglesa em `src/content/blog/en/my-new-article.md`, com `language: "en-GB"` e um slug próprio.

- No artigo PT: `translation: "my-new-article"`.
- No artigo EN: `translation: "o-meu-novo-artigo"`.

Ambos os ficheiros têm de existir e apontar um para o outro. Guardar os dois antes do próximo build. Se uma tradução for draft, o seu link não aparece publicamente. Um artigo sem tradução pode omitir `translation`.

## Categorias, tags e drafts

- Usar a mesma designação para a mesma categoria/tag. O protótipo partilha o vocabulário PT entre os idiomas, para agrupar traduções; não traduz automaticamente as etiquetas.
- `Inteligência Artificial` gera `/blog/category/inteligencia-artificial/`.
- `IA local` gera `/blog/tag/ia-local/`; `Automação editorial` gera `/blog/tag/automacao-editorial/`.
- Designações diferentes que produzam o mesmo URL fazem o build falhar, evitando fusões silenciosas.
- `draft` é validado, mas não gera página pública, listagens, RSS, sitemap ou categorias/tags exclusivas do rascunho. Não existe preview editorial de drafts neste teste.
- Um `published` com data futura aparece imediatamente: não existe agendamento.

## Verificação e erros

```sh
npm run check
npm run build
```

`check` verifica tipos e o schema; o build verifica também as relações entre ficheiros, imagens e URLs. Corrigir os erros antes de publicar `dist/`.

Para repetir os testes de publicação e validação:

```sh
npm run test:content
```

Este comando cria um artigo temporário, executa builds com conteúdo válido/inválido e remove o ficheiro no fim, terminando com um build válido. Não executar em simultâneo com outro build. Logs em `output/validation/`.

## Endereço do site

RSS, canonical e sitemap usam `http://localhost:4321` neste protótipo. Para testar outro endereço em PowerShell:

```powershell
$env:SITE_URL = "https://dominio-de-teste.example"
npm run build
```

Os layouts contêm `noindex, nofollow` porque este é conteúdo de teste. Um lançamento real exige rever esta diretiva, o domínio, as imagens, os textos e o processo de deploy.

## Fricção do AGENT-ED

Recebendo Markdown válido e com imagem já disponível, há **dois passos operacionais** até ao site gerado: guardar o ficheiro na pasta certa e executar o build. Recomenda-se `check` antes do build; um novo asset acrescenta o passo de guardar a imagem. Até ao site público existe ainda o deploy, que está fora do protótipo.

Referências oficiais: [Content Collections](https://docs.astro.build/en/guides/content-collections/), [RSS](https://docs.astro.build/en/recipes/rss/) e [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/).
