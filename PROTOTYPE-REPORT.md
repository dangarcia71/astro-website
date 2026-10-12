# Relatório — Astro + Content Collections

Data da avaliação: 12 de outubro de 2026.

**APROVADO PARA CONTINUAR TESTES.** O protótipo demonstra publicação direta de Markdown validado e geração automática das páginas. Não demonstra ainda que substituir o website atual será melhor: o processo atual não foi inspecionado nem comparado neste teste.

## Estrutura criada

Projeto isolado em `D:\Projetos\astro-website`, criado a partir do template mínimo oficial. O workspace só continha o brief; por isso foram criados seis textos curtos e três SVG identificados como placeholders. Nenhum ficheiro do website atual foi modificado.

```text
astro-website/
├── public/images/blog/             # 3 SVG placeholders locais
├── src/
│   ├── content.config.ts           # loader e schema
│   ├── content/blog/
│   │   ├── pt/                     # 3 artigos Markdown
│   │   └── en/                     # 3 traduções Markdown
│   ├── components/PostList.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogLayout.astro
│   ├── lib/blog.ts                 # URLs, datas e validação entre artigos
│   ├── styles/global.css
│   └── pages/
│       ├── index.astro
│       ├── rss.xml.ts
│       └── blog/
│           ├── index.astro
│           ├── [lang]/index.astro
│           ├── [lang]/[slug].astro
│           ├── category/[category].astro
│           └── tag/[tag].astro
├── scripts/validate-content.mjs
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
├── HOW-TO-ADD-ARTICLE.md
├── PROTOTYPE-REPORT.md
└── README.md
```

`dist/` contém o resultado do build. `output/validation/` e `output/playwright/` guardam evidências locais e estão ignoradas pelo Git. A pasta temporária `.astro-scaffold/` também está ignorada: a revisão automática bloqueou a sua remoção depois de o template ter sido copiado para a raiz. Não integra as rotas, o conteúdo nem o build.

## Versões verificadas

| Ferramenta / dependência | Versão |
| --- | --- |
| Node | 22.22.3 |
| npm | 10.9.8 |
| Astro | 7.3.8 |
| create-astro | 5.2.6 |
| @astrojs/rss | 4.0.19 |
| @astrojs/sitemap | 3.7.4 |
| @astrojs/check | 0.9.10 |
| TypeScript | 6.0.3 |

Astro foi confirmado no registo npm como versão estável `latest` durante esta execução. O Node instalado cumpre o mínimo declarado pelo pacote: 22.12.0. TypeScript usa a configuração `strict` fornecida pelo template. Não há dependência Zod separada; usa-se a exportação do Astro. A instalação reportou zero vulnerabilidades conhecidas nessa consulta; isso não é uma garantia permanente.

## Convenção da API

A implementação segue a API atual documentada: `src/content.config.ts`, `defineCollection()`, loader `glob()` de `astro/loaders`, Zod de `astro/zod` e `render(post)` de `astro:content`.

Não usa a convenção antiga `src/content/config.ts`, `type: "content"` ou `post.render()`. O loader lê `{pt,en}/*.md`; cada ID contém o idioma e o nome do ficheiro. O slug público vem do frontmatter. Assim, ficheiros ou slugs iguais em idiomas diferentes não colidem.

Referência: [Content Collections — documentação oficial](https://docs.astro.build/en/guides/content-collections/).

## Funcionalidades testadas

| Requisito | Resultado |
| --- | --- |
| Markdown: headings, listas, links, código, tabelas, citações e imagens | OK, elementos confirmados no DOM |
| Content Collections e schema | OK |
| Campos obrigatórios e enumerações | Implementados no schema |
| PT / EN | OK, três artigos por idioma |
| Traduções | OK, links PT → EN e EN → PT exercitados no navegador |
| Categorias | OK, duas categorias públicas |
| Tags com espaços e acentos | OK, sete tags com URLs normalizados |
| Imagens locais com alt | OK, placeholders visíveis |
| Ordenação por data | OK, datas decrescentes nas listagens |
| Draft | OK, sem página, listagens, RSS, sitemap ou taxonomias exclusivas |
| Publicação de novo Markdown | OK, artigo apareceu sem alterar rotas/componentes |
| Frontmatter inválido | OK, `status: review` rejeitado pelo build |
| Data inválida entre aspas | OK, `"2026-02-30"` rejeitada |
| Slug duplicado no mesmo idioma | OK, build rejeitado |
| Tradução inexistente | OK, build rejeitado |
| Restaurar conteúdo válido | OK, fixture removida e build final válido |
| RSS | OK, seis entradas |
| Sitemap | OK, páginas públicas geradas |
| SEO básico | OK, title e description; canonical e alternates de idioma |
| Tema claro/escuro | Tema nativo do sistema; artigo revisto em modo escuro |
| Desktop/mobile | OK nas larguras verificadas |

Foram abertos homepage, blog, listagens PT/EN, seis artigos, duas categorias e três tags representativas. A verificação de produção cobriu 15 rotas a 375, 768 e 1440 px: **45 combinações**, sem overflow horizontal e sem erros de JavaScript/console durante essa execução. Outros 19 links internos da listagem responderam com HTTP 200. As capturas desktop e mobile foram inspecionadas visualmente.

Os testes de conteúdo são repetíveis com `npm run test:content`. Criam uma fixture nova, testam draft/publicação e erros, e restauram um build válido em `finally`. Os logs ficam em `output/validation/`. O draft usado no teste é temporário: os seis artigos entregues estão publicados.

## Build

```text
npm run check: OK — 0 erros, 0 avisos, 0 sugestões
npm run test:content: OK
npm run build: OK
```

Saída estática: 19 páginas HTML, feed RSS e sitemap. O servidor de desenvolvimento foi executado e as páginas foram verificadas; o resultado final foi também servido por `astro preview`. Não houve deploy de produção.

## Adicionar um novo artigo

O guia completo é [HOW-TO-ADD-ARTICLE.md](HOW-TO-ADD-ARTICLE.md).

Criar o `.md` na pasta do idioma, preencher frontmatter, guardar/reutilizar a imagem, executar `check` e `build`. As páginas, listagens, categorias, tags, RSS e sitemap são atualizados automaticamente. Guardar uma tradução exige criar o segundo ficheiro e estabelecer referências recíprocas.

## Pontos positivos

- O conteúdo editorial permanece em ficheiros Markdown autónomos, adequados a revisão e versionamento.
- Não é necessário editar um array de artigos ou criar uma página manual por publicação.
- Tipos, campos e relações inválidas interrompem o build, oferecendo erros verificáveis antes de publicar.
- Idiomas, categorias e tags derivam do conteúdo e usam URLs consistentes.
- O mesmo contrato pode ser produzido pelo AGENT-ED, sem transformação adicional quando respeitado e com a imagem disponível.
- O resultado é HTML/CSS estático, sem backend ou JavaScript de aplicação necessário para navegar. Isto reduz requisitos de alojamento e execução; não foi feito um benchmark de velocidade.

## Limitações encontradas

1. **Comparação com o processo atual ausente.** Não se pode afirmar uma melhoria relativa sem medir o workflow existente com os mesmos artigos.
2. **Escala não medida.** Foram usados seis placeholders. Tempo de build, paginação e organização com centenas/milhares de artigos não foram avaliados; a listagem atual apresenta todos os artigos.
3. **Datas YAML sem aspas podem ser normalizadas.** O teste com `date: 2026-02-30` foi aceite pelo parser como uma data normalizada antes do schema. Usar sempre ISO entre aspas no contrato editorial; o teste com `date: "2026-02-30"` foi rejeitado.
4. **Taxonomia partilhada em português.** As páginas EN apresentam categoria/tags do vocabulário comum PT. Traduzir etiquetas exige uma decisão editorial futura. Designações diferentes com o mesmo URL normalizado fazem o build falhar.
5. **Imagens simples em `public/`.** Não existe otimização automática destas imagens, gestão de formatos/tamanhos ou campo de alt editorial dedicado. O alt da capa deriva do título; imagens no corpo usam o alt escrito em Markdown. O build verifica a existência da capa, não todas as referências/links no corpo.
6. **Drafts não têm preview.** São validados mas excluídos de toda a saída pública. Uma tradução draft também não é ligada publicamente. Publicações com data futura não são agendadas.
7. **Domínio de teste.** RSS, canonical e sitemap apontam para localhost. Um domínio real exige definir `SITE_URL`. O protótipo está marcado `noindex, nofollow`.
8. **Contrato editorial controlado.** O schema não valida qualidade factual, revisão linguística, direitos das imagens ou HTML potencialmente escrito no Markdown. Conteúdo produzido por agentes continua a exigir revisão editorial.
9. **Deploy fora do âmbito.** Build concluído significa site gerado localmente; não significa artigo disponível no website público.

RSS foi acrescentado com [@astrojs/rss](https://docs.astro.build/en/recipes/rss/) e sitemap com [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/), ambos oficiais. Não foram adicionados CMS, Starlight, Tailwind, MDX, comentários, autenticação, base de dados, área de administração, pesquisa externa, portfolio ou integração automática com AGENT-ED.

## Fricção editorial

**Quantos passos existem entre receber um Markdown pronto do AGENT-ED e o artigo aparecer no site?**

- **Site gerado localmente: dois passos mínimos**, se Markdown/asset já cumprirem o contrato: guardar o `.md` na pasta correta; executar build.
- `npm run check` é uma verificação adicional recomendada antes do build.
- Uma imagem nova exige guardá-la; uma tradução exige o segundo ficheiro e duas referências recíprocas.
- **Site público: acrescentar deploy.** Não foi implementado nem avaliado, pelo que o protótipo não demonstra publicação automática em produção.

## Conclusão

**APROVADO PARA CONTINUAR TESTES.** Os critérios técnicos centrais foram satisfeitos e o workflow de ficheiro Markdown → build → página foi demonstrado, incluindo falhas e recuperação.

É uma base promissora para simplificar o blog, mas não sustenta ainda uma decisão de migração. O próximo teste útil é usar artigos e imagens reais, simular um lote representativo produzido pelo AGENT-ED e comparar passos, erros e esforço de publicação com o processo atual. Esse teste deve continuar isolado antes de qualquer alteração ao website existente.
